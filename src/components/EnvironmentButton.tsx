import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface EnvironmentButton extends TouchableOpacityProps {
  title: string;
  active?: boolean;
}

export function EnvironmentButton({
  title,
  active = false,
  ...props
}: EnvironmentButton) {
  return (
    <TouchableOpacity
      style={[styles.container, active && styles.containerActive]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[styles.text, active && styles.textActive]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    paddingHorizontal: 18,
    minWidth: 76,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginHorizontal: 5,
  },
  containerActive: {
    backgroundColor: colors.green_light,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  textActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
});
