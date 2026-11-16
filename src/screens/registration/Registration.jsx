import { useEffect, useState } from 'react';
import {
  BackHandler,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { PrimaryButton, tokens } from '../../components/FormKit';
import { CustomerDetailsStep } from './ui/CustomerDetails';
import { AccountDetailsStep } from './ui/AccountDetails';
import { IdentificationStep } from './ui/Identification';
import { Intro } from '../../components/Intro';

const DEFAULT_CURRENCY = 'MAD'; 


const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^\+[1-9]\d{7,14}$/;
const NATIONAL_ID_RE = /^[A-Za-z0-9]{5,20}$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const isAdult = (iso) => {
  const dob = new Date(iso);
  if (Number.isNaN(dob.getTime())) return false;
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age -= 1;
  return age >= 18 && age < 120;
};

const validateCustomer = ({ customer: c }) => {
  const e = {};
  if (!c.firstName.trim()) e.firstName = 'Enter your first name.';
  if (!c.lastName.trim()) e.lastName = 'Enter your last name.';
  if (!EMAIL_RE.test(c.email.trim())) e.email = 'Enter a valid email address.';
  if (!PHONE_RE.test(c.phone.trim())) e.phone = 'Use international format, for example +33612345678.';
  if (!DATE_RE.test(c.dateOfBirth) || !isAdult(c.dateOfBirth))
    e.dateOfBirth = 'Enter a valid date (YYYY-MM-DD). You must be 18 or older.';
  if (!c.street.trim()) e.street = 'Enter your street address.';
  if (!c.city.trim()) e.city = 'Enter your city.';
  if (!c.postalCode.trim()) e.postalCode = 'Enter your postal code.';
  if (!/^[A-Za-z]{2}$/.test(c.country)) e.country = 'Enter the 2-letter country code.';
  if (!NATIONAL_ID_RE.test(c.nationalId.trim())) e.nationalId = 'Enter 5 to 20 letters or numbers.';
  return e;
};

const validateAccount = ({ account: a }) => {
  const e = {};
  if (!a.purpose.trim()) e.purpose = 'Tell us what you will use the account for.';
  if (!a.sourceOfFunds) e.sourceOfFunds = 'Choose where your money comes from.';
  return e;
};

const validateIdentification = ({ identification: i }) => {
  const e = {};
  //if (!i.documentImage) e.documentImage = 'Add a photo of your document.';
  //if (!i.selfieImage) e.selfieImage = 'Take a selfie so we can match it to your document.';
  //if (!i.consent) e.consent = 'Accept the terms to continue.';
  return e;
};


const WelcomeStep = () => (
  <View>
    <Intro>Open your account. It is free, secure and easy to use.</Intro>
    <View style={styles.needs}>
      <Text style={styles.needsTitle}>Before you start</Text>
      <Text style={styles.needsItem}>Have your ID document or passport with you.</Text>
      <Text style={styles.needsItem}>Allow camera access for a photo of your document and a selfie.</Text>
      <Text style={styles.needsItem}>Set aside about five minutes.</Text>
    </View>
  </View>
);


// Defined after the components so they exist when the array is built.
const STEPS = [
  { id: 'welcome', title: 'Open your account', Component: WelcomeStep, action: 'Get started' },
  { id: 'customer', title: 'About you', Component: CustomerDetailsStep, validate: validateCustomer, action: 'Continue' },
  { id: 'account', title: 'Your account', Component: AccountDetailsStep, validate: validateAccount, action: 'Continue' },
  { id: 'identification', title: 'Verify your identity', Component: IdentificationStep, validate: validateIdentification, action: 'Submit application' },
];

const initialData = {
  customer: {
    firstName: 'Salaheddine', lastName: '', email: '', phone: '', dateOfBirth: '',
    street: '', city: '', postalCode: '', country: '', nationalId: '',
  },
  account: { accountType: 'CURRENT', currency: DEFAULT_CURRENCY, purpose: '', sourceOfFunds: '' },
  identification: { documentType: 'NATIONAL_ID', documentImage: null, selfieImage: null, consent: false },
};


export const RegistrationScreen = ({ onSubmit, onBackToLogin, onDone }) => {
  const insets = useSafeAreaInsets();

  const [stepIndex, setStepIndex] = useState(0); // Keep tracking the current STEP INDEX
  const [data, setData] = useState(initialData); // Initialize data including (customer details, account details, and ID)
  const [errors, setErrors] = useState({}); // Handle errors
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const step = STEPS[stepIndex]; // Current step object based on the current index
  const StepComponent = step.Component; // Current step UI component to be rendered
  const isLast = stepIndex === STEPS.length - 1; // Check if the it's the last step

  // Handle update details of the application request (customer details, account details, and ID)
  /**
   * 
   * @param {*} section specifies which section to be updated (customer details, account details, or ID)
   * @param {*} patch 
   */
  const update = (section, patch) => {
    setData((prev) => ({ ...prev, [section]: { ...prev[section], ...patch } }));
    setErrors((prev) => {
      const next = { ...prev };
      Object.keys(patch).forEach((k) => delete next[k]);
      return next;
    });
  };

  /**
   * 
   */
  const goBack = () => {
    setErrors({});
    setSubmitError('');
    if (stepIndex === 0) onBackToLogin?.();
    else setStepIndex((i) => i - 1);
  };

  // Android hardware back button moves one step back instead of leaving the flow.
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (submitted) return false;
      goBack();
      return true;
    });
    return () => sub.remove();
  }, [stepIndex, submitted]);

  useEffect(()=> {
    console.log("Updated data:", data.customer)
  },[data])

  /**
   * 
   * @returns 
   */
  const goNext = async () => {
    const found = step.validate ? step.validate(data) : {};
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }
    setErrors({});
    if (!isLast) {
      setStepIndex((i) => i + 1);
      return;
    }
    setSubmitting(true);
    setSubmitError('');
    console.log(data)
    try {
      await onSubmit?.(data);
      setSubmitted(true);
    } catch (e) {
      setSubmitError(e?.message || 'We could not send your application. Check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <SafeAreaView style={styles.root} edges={['top']}>
        <StatusBar barStyle="light-content" backgroundColor={tokens.ink} />
        <View style={styles.header}>
          <Text style={styles.title} accessibilityRole="header">Application received</Text>
        </View>
        <View style={[styles.sheet, styles.doneSheet, { paddingBottom: insets.bottom + 24 }]}>
          <Text style={styles.intro}>
            We are checking your details. We will notify you as soon as your application has been reviewed.
          </Text>
          <PrimaryButton title="Back to sign in" onPress={onDone} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={tokens.ink} />

      <View style={styles.header}>
        <Pressable onPress={goBack} hitSlop={12} accessibilityRole="button" accessibilityLabel="Go back">
          <Text style={styles.backText}>Back</Text>
        </Pressable>
        <Text style={styles.title} accessibilityRole="header">{step.title}</Text>
        <View
          style={styles.progress}
          accessibilityRole="progressbar"
          accessibilityLabel={`Step ${stepIndex + 1} of ${STEPS.length}`}
        >
          {STEPS.map((s, i) => (
            <View key={s.id} style={[styles.segment, i <= stepIndex && styles.segmentDone]} />
          ))}
        </View>
      </View>

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.sheet}>
          <ScrollView
            contentContainerStyle={styles.stepScroll}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <StepComponent data={data} errors={errors} update={update} />
            {!!submitError && (
              <View style={styles.errorBox} accessibilityRole="alert">
                <Text style={styles.errorBoxText}>{submitError}</Text>
              </View>
            )}
          </ScrollView>

          <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
            <PrimaryButton title={step.action} onPress={goNext} loading={submitting} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: { flex: 1, backgroundColor: tokens.ink },

  // Header
  header: { paddingHorizontal: 24, paddingTop: 12, paddingBottom: 28 },
  backText: { fontSize: 15, fontWeight: '600', color: 'rgba(255,255,255,0.8)', marginBottom: 16 },
  title: { fontSize: 30, lineHeight: 36, fontWeight: '700', color: '#FFFFFF', letterSpacing: -0.4 },
  progress: { flexDirection: 'row', gap: 6, marginTop: 20 },
  segment: { flex: 1, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.22)' },
  segmentDone: { backgroundColor: tokens.mint },

  // Sheet
  sheet: { flex: 1, backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28 },
  doneSheet: { paddingHorizontal: 24, paddingTop: 32, gap: 28 },
  stepScroll: { paddingHorizontal: 24, paddingTop: 28, paddingBottom: 24 },
  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: tokens.border,
    backgroundColor: '#FFFFFF',
  },

  
  fieldBlock: { marginBottom: 18 },
  groupLabel: { fontSize: 14, fontWeight: '600', color: tokens.ink, marginBottom: 10 },
  fieldError: { marginTop: 6, fontSize: 13, lineHeight: 18, color: tokens.error },

  // Welcome
  needs: { backgroundColor: tokens.fieldBg, borderRadius: 16, padding: 20, gap: 10 },
  needsTitle: { fontSize: 15, fontWeight: '700', color: tokens.ink },
  needsItem: { fontSize: 15, lineHeight: 22, color: tokens.textMuted },


  // Option cards
  optionCard: {
    flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16, marginBottom: 12,
    borderRadius: 14, borderWidth: 1.5, borderColor: tokens.border, backgroundColor: '#FFFFFF',
  },
  optionCardSelected: { borderColor: tokens.ink, backgroundColor: tokens.fieldBg },
  optionTitle: { fontSize: 16, fontWeight: '700', color: tokens.ink },
  optionHint: { marginTop: 2, fontSize: 14, lineHeight: 20, color: tokens.textMuted },
  radio: {
    width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: tokens.border,
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: tokens.ink },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: tokens.ink },

  // Photos
  photoSlot: {
    flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14,
    borderRadius: 14, borderWidth: 1.5, borderStyle: 'dashed', borderColor: tokens.border,
  },
  photoSlotError: { borderColor: tokens.error },
  photoThumb: { width: 64, height: 64, borderRadius: 10, backgroundColor: tokens.fieldBg },
  photoEmpty: { width: 64, height: 64, borderRadius: 10, backgroundColor: tokens.fieldBg },

  // Consent
  consentRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginTop: 8 },
  checkbox: {
    width: 24, height: 24, borderRadius: 6, borderWidth: 2, borderColor: tokens.border,
    alignItems: 'center', justifyContent: 'center',
  },
  checkboxChecked: { backgroundColor: tokens.ink, borderColor: tokens.ink },
  checkmark: { color: tokens.mint, fontSize: 14, fontWeight: '700' },
  consentText: { flex: 1, fontSize: 15, lineHeight: 22, color: tokens.ink },

  // Submit error
  errorBox: { backgroundColor: tokens.errorBg, borderRadius: 12, padding: 14, marginTop: 8 },
  errorBoxText: { color: tokens.error, fontSize: 14, lineHeight: 20 },
});