import { View } from 'react-native';

import { Field } from '../../../components/FormKit';
import { Intro } from '../../../components/Intro';

export const CustomerDetailsStep = ({ data, errors, update }) => {
  const c = data.customer;
  const set = (patch) => update('customer', patch);
  return (
    <View>
      <Intro>Use the details on your ID document.</Intro>
      <Field label="First name" value={c.firstName} onChangeText={(t) => set({ firstName: t })}
        autoComplete="given-name" textContentType="givenName" error={errors.firstName} />
      <Field label="Last name" value={c.lastName} onChangeText={(t) => set({ lastName: t })}
        autoComplete="family-name" textContentType="familyName" error={errors.lastName} />
      <Field label="Email" value={c.email} onChangeText={(t) => set({ email: t })}
        keyboardType="email-address" autoCapitalize="none" autoCorrect={false}
        autoComplete="email" textContentType="emailAddress" error={errors.email} />
      <Field label="Phone number" value={c.phone} onChangeText={(t) => set({ phone: t })}
        placeholder="+33612345678" keyboardType="phone-pad"
        autoComplete="tel" textContentType="telephoneNumber" error={errors.phone} />
      <Field label="Date of birth" value={c.dateOfBirth} onChangeText={(t) => set({ dateOfBirth: t })}
        placeholder="YYYY-MM-DD" keyboardType="numbers-and-punctuation" maxLength={10}
        error={errors.dateOfBirth} />
      <Field label="Street address" value={c.street} onChangeText={(t) => set({ street: t })}
        autoComplete="street-address" textContentType="streetAddressLine1" error={errors.street} />
      <Field label="City" value={c.city} onChangeText={(t) => set({ city: t })}
        textContentType="addressCity" error={errors.city} />
      <Field label="Postal code" value={c.postalCode} onChangeText={(t) => set({ postalCode: t })}
        autoComplete="postal-code" textContentType="postalCode" error={errors.postalCode} />
      <Field label="Country (2-letter code)" value={c.country}
        onChangeText={(t) => set({ country: t.toUpperCase() })}
        maxLength={2} autoCapitalize="characters" autoCorrect={false} error={errors.country} />
      <Field label="National ID number" value={c.nationalId} onChangeText={(t) => set({ nationalId: t })}
        autoCapitalize="characters" autoCorrect={false} error={errors.nationalId} />
    </View>
  );
};