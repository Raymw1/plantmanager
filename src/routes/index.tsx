import { NavigationContainer } from '@react-navigation/native';

import StackRoutes from './stack.routes';

const Routes: React.FC = () => (
  <NavigationContainer>
    <StackRoutes />
  </NavigationContainer>
);

export default Routes;
