import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import { colors } from '../themes/colors';
import { tokens } from './FormKit';


const styles = StyleSheet.create({
  fieldBlock: { marginBottom: 18 },
  photoSlot: {
      flexDirection: 'row', alignItems: 'center', gap: 14, padding: 14,
      borderRadius: 14, borderWidth: 1.5, borderStyle: 'dashed', borderColor: tokens.border,
    },
    photoSlotError: { borderColor: tokens.error },
    photoThumb: { width: 64, height: 64, borderRadius: 10, backgroundColor: tokens.fieldBg },
    photoEmpty: { width: 64, height: 64, borderRadius: 10, backgroundColor: tokens.fieldBg },
})
export const PhotoSlot = ({ title, hint, uri, error, onPress }) => (
  <View style={styles.fieldBlock}>
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={uri ? `Retake ${title}` : `Add ${title}`}
      style={[styles.photoSlot, !!error && styles.photoSlotError]}
    >
      {uri ? (
        <Image source={{ uri }} style={styles.photoThumb} />
      ) : (
        <View style={styles.photoEmpty} />
      )}
      <View style={styles.flex}>
        <Text style={styles.optionTitle}>{title}</Text>
        <Text style={styles.optionHint}>{uri ? 'Tap to retake' : hint}</Text>
      </View>
    </Pressable>
    {!!error && <Text style={styles.fieldError}>{error}</Text>}
  </View>
);