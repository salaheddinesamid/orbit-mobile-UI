import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Pressable } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { Field, tokens } from '../../../components/FormKit';
import { PhotoSlot } from '../../../components/PhotoSlot';
import { Chips } from '../../../components/Chips';
import { Intro } from '../../../components/Intro';

const DOCUMENT_TYPES = [
  { value: 'NATIONAL_ID', label: 'National ID' },
  { value: 'PASSPORT', label: 'Passport' },
  { value: 'DRIVING_LICENCE', label: 'Driving licence' },
];


const styles = StyleSheet.create({
  groupLabel: { fontSize: 14, fontWeight: '600', color: tokens.ink, marginBottom: 10 },

})
export const IdentificationStep = ({ data, errors, update }) => {
  const i = data.identification;
  const [cameraError, setCameraError] = useState('');

  const capture = async (key, front) => {
    setCameraError('');
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      setCameraError('Allow camera access in your phone settings to continue.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      cameraType: front ? ImagePicker.CameraType.front : ImagePicker.CameraType.back,
    });
    if (!result.canceled) update('identification', { [key]: result.assets[0].uri });
  };

  return (
    <View>
      <Intro>Add your document and a selfie so we can confirm it is you.</Intro>
      <Text style={styles.groupLabel}>Document type</Text>
      <Chips options={DOCUMENT_TYPES} value={i.documentType}
        onChange={(v) => update('identification', { documentType: v })} />

      <PhotoSlot title="Photo of your document" hint="Place it on a flat surface in good light."
        uri={i.documentImage} error={errors.documentImage} onPress={() => capture('documentImage', false)} />
      <PhotoSlot title="Selfie" hint="Look at the camera with your face fully visible."
        uri={i.selfieImage} error={errors.selfieImage} onPress={() => capture('selfieImage', true)} />
      {!!cameraError && <Text style={styles.fieldError}>{cameraError}</Text>}

      <Pressable
        onPress={() => update('identification', { consent: !i.consent })}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: i.consent }}
        style={styles.consentRow}
      >
        <View style={[styles.checkbox, i.consent && styles.checkboxChecked]}>
          {i.consent && <Text style={styles.checkmark}>✓</Text>}
        </View>
        <Text style={styles.consentText}>I agree to the Terms and the Privacy Policy.</Text>
      </Pressable>
      {!!errors.consent && <Text style={styles.fieldError}>{errors.consent}</Text>}
    </View>
  );
};