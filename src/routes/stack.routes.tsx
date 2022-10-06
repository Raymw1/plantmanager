import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import { Welcome } from '../pages/Welcome';
import { UserIdentification } from '../pages/UserIdentification';
import { Confirmation } from '../pages/Confirmation';
import { PlantSelect } from '../pages/PlantSelect';
import { PlantSave } from '../pages/PlantSave';

import colors from '../styles/colors';

import type { PlantProps } from '../libs/storage';

type RootStackParamList = {
  Welcome: undefined;
  UserIdentification: undefined;
  Confirmation: undefined;
  PlantSelect: undefined;
  PlantSave: { plant: PlantProps };
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
    <stackRoutes.Screen name='PlantSelect' component={PlantSelect} />
    <stackRoutes.Screen name='PlantSave' component={PlantSave} />
  </stackRoutes.Navigator>
);

export default AppRoutes;
