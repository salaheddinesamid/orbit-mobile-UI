import { StyleSheet, Text } from 'react-native';
import { tokens } from './FormKit';

const styles = StyleSheet.create({
    intro: { fontSize: 16, lineHeight: 24, color: tokens.textMuted, marginBottom: 24 }
})

export const Intro = ({ children }) => <Text style={styles.intro}>{children}</Text>;
