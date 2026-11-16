import { forwardRef, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { colors } from '../themes/colors';

// Brand colors come from your theme; neutrals live here so every screen shares them.
export const tokens = {
  ink: colors.ink,
  mint: colors.mint,
  textMuted: '#5B6770',
  placeholder: '#8A949B',
  border: '#D9DEE2',
  fieldBg: '#F5F7F8',
  error: '#B3261E',
  errorBg: '#FDECEA',
  disabled: '#B8BEC2',
};

/**
 * Labeled text field with focus and error states.
 * `error` can be a string (shown under the field) or a boolean (red border only).
 */
export const Field = forwardRef(function Field({ label, error, right, ...inputProps }, ref) {
  const [focused, setFocused] = useState(false);
  const hasError = !!error;

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
          placeholderTextColor={tokens.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          accessibilityLabel={label}
          {...inputProps}
        />
        {right}
      </View>
      {typeof error === 'string' && error.length > 0 && (
        <Text style={styles.fieldError} accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
});

/** Full-width ink button with a mint label and a loading state. */
export const PrimaryButton = ({ title, onPress, disabled, loading }) => {
  const inactive = disabled || loading;
  return (
    <Pressable
      onPress={onPress}
      disabled={inactive}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ disabled: !!inactive, busy: !!loading }}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.buttonDisabled,
        pressed && !inactive && styles.buttonPressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={tokens.mint} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  fieldWrap: { marginBottom: 18 },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: tokens.ink,
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: tokens.fieldBg,
    borderWidth: 1.5,
    borderColor: tokens.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    minHeight: 54,
  },
  inputRowFocused: { borderColor: tokens.ink, backgroundColor: '#FFFFFF' },
  inputRowError: { borderColor: tokens.error },
  input: {
    flex: 1,
    fontSize: 16,
    color: tokens.ink,
    paddingVertical: 14,
  },
  fieldError: {
    marginTop: 6,
    fontSize: 13,
    lineHeight: 18,
    color: tokens.error,
  },
  button: {
    backgroundColor: tokens.ink,
    borderRadius: 14,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: { opacity: 0.88 },
  buttonDisabled: { backgroundColor: tokens.disabled },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    color: tokens.mint,
  },
});