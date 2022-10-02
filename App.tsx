import { StatusBar } from 'expo-status-bar';

import { Welcome } from './src/pages/Welcome';

export default function App() {
  return (
    <>
      <Welcome />
      <StatusBar
        translucent={false}
        backgroundColor='transparent'
        style='auto'
      />
    </>
  );
}
