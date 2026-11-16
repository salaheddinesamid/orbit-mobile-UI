import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Field, tokens } from '../../../components/FormKit';
import { OptionCard } from '../../../components/OptionCard';
import { Chips } from '../../../components/Chips';
import { Intro } from '../../../components/Intro';

const ACCOUNT_TYPES = [
  { value: 'CURRENT', title: 'Current account', hint: 'For everyday spending and payments.' },
  { value: 'SAVINGS', title: 'Savings account', hint: 'For setting money aside.' },
];
const SOURCES_OF_FUNDS = ['Salary', 'Savings', 'Business income', 'Pension', 'Other'].map((s) => ({
  value: s,
  label: s,
}));

const styles = StyleSheet.create({
  fieldBlock: { marginBottom: 18 },
  groupLabel: { fontSize: 14, fontWeight: '600', color: tokens.ink, marginBottom: 10 },
})

export const AccountDetailsStep = ({ data, errors, update }) => {
  const a = data.account;
  const set = (patch) => update('account', patch);
  return (
    <View>
      <Intro>Choose the account you want to open.</Intro>
      {ACCOUNT_TYPES.map((t) => (
        <OptionCard key={t.value} title={t.title} hint={t.hint}
          selected={a.accountType === t.value} onPress={() => set({ accountType: t.value })} />
      ))}
      <View style={styles.fieldBlock}>
        <Field label="What will you use it for?" value={a.purpose} maxLength={200}
          onChangeText={(t) => set({ purpose: t })} error={errors.purpose} />
      </View>
      <Text style={styles.groupLabel}>Where does your money come from?</Text>
      <Chips options={SOURCES_OF_FUNDS} value={a.sourceOfFunds} onChange={(v) => set({ sourceOfFunds: v })} />
      {!!errors.sourceOfFunds && <Text style={styles.fieldError}>{errors.sourceOfFunds}</Text>}
    </View>
  );
};