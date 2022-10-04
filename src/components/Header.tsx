import { Image, StyleSheet, Text, View } from 'react-native';
/* import { getStatusBarHeight } from 'react-native-iphone-x-helper'; */

import colors from '../styles/colors';
import fonts from '../styles/fonts';

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Hello,</Text>
        <Text style={styles.username}>Rayan</Text>
      </View>
      <Image source={{ uri: 'https://github.com/Raymw1.png' }} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    /* marginTop: getStatusBarHeight(), */
    padding: 20,
  },
  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },
  username: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
});
