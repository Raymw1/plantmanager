import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';

import wateringImg from '../assets/watering.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';

export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Manage your{'\n'}plants easily!</Text>
      <Image source={wateringImg} style={styles.image} />
      <Text style={styles.subtitle}>
        Don't forget to water your plants anymore. We help you to remember
        always you need.
      </Text>
      <Button title='>' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
  },
  image: {
    width: 292,
    height: 284,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 24,
    color: colors.heading,
  },
});
