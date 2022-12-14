import { useState } from 'react';
import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import { useRoute, useNavigation } from '@react-navigation/core';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { Button } from '../components/Button';
import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

import { PlantProps, savePlant } from '../libs/storage';
import type { ScreenProps } from '../routes/stack.routes';

interface Params {
  plant: PlantProps;
}

export function PlantSave() {
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === 'ios');
  const navigation = useNavigation<ScreenProps>();
  const route = useRoute();
  const { plant } = route.params as Params;

  function handleChangeTime(
    event: DateTimePickerEvent,
    dateTime: Date | undefined
  ) {
    if (Platform.OS === 'android') setShowDatePicker((oldState) => !oldState);
    if (dateTime && isBefore(dateTime, new Date())) {
      dateTime.setDate(dateTime.getDate() + 1);
      setSelectedDateTime(dateTime);
      /* return Alert.alert('Select a time in the future! ⏰'); */
    }
    if (dateTime) setSelectedDateTime(dateTime);
  }

  async function handleSave() {
    try {
      await savePlant({ ...plant, dateTimeNotification: selectedDateTime });
      navigation.navigate('Confirmation', {
        title: 'All done!',
        subtitle:
          "Now, it's time to relax. We will always remind you to take care of your plant with lots of love.",
        icon: 'hug',
        buttonTitle: 'Oh, cool! :D',
        nextScreen: 'MyPlants',
      });
    } catch (error) {
      Alert.alert('Failed to save plant!');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} height={150} width={150} />
          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantAbout}>{plant.about}</Text>
        </View>
        <View style={styles.controller}>
          <View style={styles.tipContainer}>
            <Image source={waterdrop} style={styles.tipImage} />
            <Text style={styles.tipText}>{plant.water_tips}</Text>
          </View>
          <Text style={styles.alertLabel}>
            Choose the best time to remember:
          </Text>
          {showDatePicker && (
            <DateTimePicker
              value={selectedDateTime}
              mode='time'
              onChange={handleChangeTime}
            />
          )}
          {Platform.OS === 'android' && (
            <TouchableOpacity
              style={styles.dateTimePickerButton}
              onPress={() => setShowDatePicker((oldState) => !oldState)}
            >
              <Text style={styles.dateTimePickerText}>{`Change ${format(
                selectedDateTime,
                'HH:mm'
              )}`}</Text>
            </TouchableOpacity>
          )}
          <Button title='Register plant' onPress={handleSave} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: colors.shape,
  },
  plantInfo: {
    flex: 1,
    paddingHorizontal: 30,
    paddingVertical: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.shape,
  },
  plantName: {
    fontFamily: fonts.heading,
    fontSize: 24,
    color: colors.heading,
    marginTop: 15,
  },
  plantAbout: {
    textAlign: 'center',
    fontFamily: fonts.text,
    color: colors.heading,
    fontSize: 17,
    marginTop: 10,
  },
  controller: {
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: getBottomSpace() || 20,
  },
  tipContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.blue_light,
    padding: 20,
    borderRadius: 20,
    position: 'relative',
    bottom: 60,
  },
  tipImage: {
    width: 56,
    height: 56,
  },
  tipText: {
    flex: 1,
    marginLeft: 20,
    fontFamily: fonts.text,
    color: colors.blue,
    fontSize: 17,
    textAlign: 'justify',
  },
  alertLabel: {
    textAlign: 'center',
    fontFamily: fonts.complement,
    color: colors.heading,
    fontSize: 12,
    marginBottom: 5,
  },
  dateTimePickerButton: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: 40,
  },
  dateTimePickerText: {
    color: colors.heading,
    fontSize: 24,
    fontFamily: fonts.text,
  },
});
