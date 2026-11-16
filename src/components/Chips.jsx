import { Pressable, StyleSheet, Text, View } from "react-native";
import { tokens } from "./FormKit";


const styles = StyleSheet.create({
  // Chips
    chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 18 },
    chip: {
      paddingVertical: 10, paddingHorizontal: 16, borderRadius: 999,
      borderWidth: 1.5, borderColor: tokens.border, backgroundColor: '#FFFFFF',
    },
    chipSelected: { backgroundColor: tokens.ink, borderColor: tokens.ink },
    chipText: { fontSize: 14, fontWeight: '600', color: tokens.ink },
    chipTextSelected: { color: tokens.mint },
})
export const Chips = ({ options, value, onChange }) => (
  <View style={styles.chips}>
    {options.map((o) => {
      const selected = value === o.value;
      return (
        <Pressable
          key={o.value}
          onPress={() => onChange(o.value)}
          accessibilityRole="radio"
          accessibilityState={{ selected }}
          style={[styles.chip, selected && styles.chipSelected]}
        >
          <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{o.label}</Text>
        </Pressable>
      );
    })}
  </View>
);