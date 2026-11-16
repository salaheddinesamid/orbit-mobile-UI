import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors } from '../themes/colors';
import { tokens } from './FormKit';


const styles = StyleSheet.create({
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
    }
})
export const OptionCard = ({ title, hint, selected, onPress }) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="radio"
    accessibilityState={{ selected }}
    style={[styles.optionCard, selected && styles.optionCardSelected]}
  >
    <View style={[styles.radio, selected && styles.radioSelected]}>
      {selected && <View style={styles.radioDot} />}
    </View>
    <View style={styles.flex}>
      <Text style={styles.optionTitle}>{title}</Text>
      <Text style={styles.optionHint}>{hint}</Text>
    </View>
  </Pressable>
);