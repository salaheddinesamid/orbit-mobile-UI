import { forwardRef, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { setUser, useAuth } from '../../contexts/AuthContext';

import { colors } from '../../themes/colors';
import { authenticate } from '../../services/AuthService';
import {useNavigation} from '@react-navigation/native';
import { AuthStorageService } from '../../services/AuthStorageService';

// Brand colors come from your theme; neutrals are local so the screen is self-contained.
const INK = colors.ink;
const MINT = colors.mint;
const TEXT_MUTED = '#5B6770';
const PLACEHOLDER = '#8A949B';
const BORDER = '#D9DEE2';
const FIELD_BG = '#F5F7F8';
const ERROR = '#B3261E';
const ERROR_BG = '#FDECEA';
const DISABLED = '#B8BEC2';

const Field = forwardRef(function Field({ label, hasError, right, ...inputProps }, ref) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputRow,
          focused && styles.inputRowFocused,
          hasError && styles.inputRowError,
        ]}
      >
        <TextInput
          ref={ref}
          style={styles.input}
          placeholderTextColor={PLACEHOLDER}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessibilityLabel={label}
          {...inputProps}
        />
        {right}
      </View>
    </View>
  );
});

export const LoginScreen = ({ onLoginSuccess, onRegisterPress, onForgotPress }) => {
  const insets = useSafeAreaInsets();
  const passwordRef = useRef(null);

  const navigate = useNavigation();
  const { login } = useAuth();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const canSubmit = username.trim().length > 0 && password.length > 0 && !loading;

  const handleLogin = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setError('');
    try {
      login(username, password);
      //console.log('Login successful:', response.data);
      handlePostLogin(null);
    } catch (e) {
      setError(e?.message || 'We could not sign you in. Check your details and try again.');
      setPassword(''); // never keep a rejected password in memory or on screen
    } finally {
      setLoading(false);
    }
  };

  const handlePostLogin = (response) => {
    // Store JWT token and user data securely

    // Store authenticated user in authentication context

    navigate.replace('Dashboard');
  }

  const clearError = () => error && setError('');

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor={INK} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Hero: the dark area carries the brand and the greeting */}
          <View style={styles.hero}>
            <Image
              source={require('../../../assets/orbit_logo.png')}
              style={styles.logo}
              resizeMode="contain"
              accessibilityLabel="Orbit logo"
            />
            <Text style={styles.greeting} accessibilityRole="header">
              Welcome back
            </Text>
            <Text style={styles.subGreeting}>
              Sign in to see your accounts and payments.
            </Text>
          </View>

          {/* Sheet: the form sits on white and rises over the hero */}
          <View style={[styles.sheet, { paddingBottom: insets.bottom + 24 }]}>
            {!!error && (
              <View style={styles.errorBox} accessibilityRole="alert">
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <Field
              label="Username"
              value={username}
              onChangeText={(t) => {
                setUsername(t);
                clearError();
              }}
              placeholder="Enter your username"
              keyboardType="default"
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="username"
              textContentType="username"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current?.focus()}
              hasError={!!error}
            />

            <Field
              ref={passwordRef}
              label="Password"
              value={password}
              onChangeText={(t) => {
                setPassword(t);
                clearError();
              }}
              placeholder="Enter your password"
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              autoComplete="password"
              textContentType="password"
              returnKeyType="go"
              onSubmitEditing={handleLogin}
              hasError={!!error}
              right={
                <Pressable
                  onPress={() => setShowPassword((v) => !v)}
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel={showPassword ? 'Hide password' : 'Show password'}
                >
                  <Text style={styles.toggleText}>{showPassword ? 'Hide' : 'Show'}</Text>
                </Pressable>
              }
            />

            <Pressable
              onPress={onForgotPress}
              hitSlop={8}
              style={styles.forgot}
              accessibilityRole="link"
            >
              <Text style={styles.forgotText}>Forgot password?</Text>
            </Pressable>

            <Pressable
              onPress={handleLogin}
              disabled={!canSubmit}
              accessibilityRole="button"
              accessibilityLabel="Sign in"
              accessibilityState={{ disabled: !canSubmit, busy: loading }}
              style={({ pressed }) => [
                styles.button,
                !canSubmit && styles.buttonDisabled,
                pressed && canSubmit && styles.buttonPressed,
              ]}
            >
              {loading ? (
                <ActivityIndicator color={MINT} />
              ) : (
                <Text style={styles.buttonText}>Sign in</Text>
              )}
            </Pressable>

            <View style={styles.footer}>
              <Text style={styles.footerText}>New to Orbit?</Text>
              <Pressable onPress={() => navigate.replace('Registration')} hitSlop={8} accessibilityRole="link">
                <Text style={styles.footerLink}>Open an account</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1 },
  root: { flex: 1, backgroundColor: INK },
  scroll: { flexGrow: 1 },

  // Hero
  hero: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 44,
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 28,
  },
  greeting: {
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subGreeting: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
    color: 'rgba(255,255,255,0.72)',
  },

  // Sheet
  sheet: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  // Error
  errorBox: {
    backgroundColor: ERROR_BG,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 20,
  },
  errorText: {
    color: ERROR,
    fontSize: 14,
    lineHeight: 20,
  },

  // Fields
  fieldWrap: { marginBottom: 18 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: INK,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: FIELD_BG,
    borderWidth: 1.5,
    borderColor: BORDER,
    borderRadius: 14,
    paddingHorizontal: 16,
    minHeight: 54,
  },
  inputRowFocused: {
    borderColor: INK,
    backgroundColor: '#FFFFFF',
  },
  inputRowError: {
    borderColor: ERROR,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: INK,
    paddingVertical: 14,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: INK,
    paddingLeft: 12,
  },

  // Links
  forgot: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotText: {
    fontSize: 14,
    fontWeight: '600',
    color: INK,
    textDecorationLine: 'underline',
  },

  // Primary button
  button: {
    backgroundColor: INK,
    borderRadius: 14,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: { opacity: 0.88 },
  buttonDisabled: { backgroundColor: DISABLED },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: MINT,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    marginTop: 28,
  },
  footerText: {
    fontSize: 15,
    color: TEXT_MUTED,
  },
  footerLink: {
    fontSize: 15,
    fontWeight: '700',
    color: INK,
    textDecorationLine: 'underline',
  },
});