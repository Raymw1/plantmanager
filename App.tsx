import { StatusBar } from 'expo-status-bar';
import { Welcome } from './src/pages/Welcome';
import { UserIdentification } from './src/pages/UserIdentification';
import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold,
} from '@expo-google-fonts/jost';
import AppLoading from 'expo-app-loading';
import { Confirmation } from './src/pages/Confirmation';

export default function App() {
  const [fontsLoaded] = useFonts({ Jost_400Regular, Jost_600SemiBold });
  if (!fontsLoaded) return <AppLoading />;

  return (
    <>
      {/* <Welcome /> */}
      {/* <UserIdentification /> */}
      <Confirmation />
      <StatusBar
        translucent={false}
        backgroundColor='transparent'
        style='auto'
      />
    </>
  );
}
