import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import Routes from './src/routes';
import * as Notifications from 'expo-notifications';
import type { PlantProps } from './src/libs/storage';

export default function App() {
  const [fontsLoaded] = useFonts({ Jost_400Regular, Jost_600SemiBold });

  useEffect(() => {
    async function listenNotifications() {
      const subscription = Notifications.addNotificationReceivedListener(
        async (notification) => {
          const data = notification.request.content.data.plant as PlantProps;
          console.log(data);
        }
      );
      return () => subscription.remove();
    }
    async function deleteAllNotifications() {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
    /* deleteAllNotifications(); */
    /* listenNotifications(); */
  }, []);

  if (!fontsLoaded) return <AppLoading />;

  return (
    <>
      <Routes />
      <StatusBar
        translucent={false}
        backgroundColor='transparent'
        style='auto'
      />
    </>
  );
}
