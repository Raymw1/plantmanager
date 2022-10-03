import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';

import colors from '../styles/colors';

type RootStackParamList = {
  Welcome: undefined;
  UserIdentification: undefined;
  Confirmation: undefined;
};

export type ScreenProps = StackNavigationProp<RootStackParamList>;

const stackRoutes = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
  <stackRoutes.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: { backgroundColor: colors.white },
    }}
  >
    <stackRoutes.Screen name='Welcome' component={Welcome} />
    <stackRoutes.Screen
      name='UserIdentification'
      component={UserIdentification}
    />
    <stackRoutes.Screen name='Confirmation' component={Confirmation} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
