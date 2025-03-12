import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {RootStackParamList} from '../types';
import DashboardScreen from '../screens/DashboardScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import OrdersDeliveredScreen from '../screens/OrdersDeliveredScreen';
import EarningsScreen from '../screens/EarningsScreen';
import HelpScreen from '../screens/HelpScreen';
import LoginScreen from '../screens/LoginScreen';
import DetailsScreen from '../screens/DetailsScreen';
import DrawerContent from '../components/DrawerContent';
import ToggleSwitch from '../components/ToggleSwitch';
import {isAuthenticated} from '../utils/auth';

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();

const DrawerNavigator = () => (
  <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
    <Drawer.Screen name="Dashboard" component={DashboardScreen} />
    <Drawer.Screen name="OrdersDelivered" component={OrdersDeliveredScreen} />
    <Drawer.Screen name="Earnings" component={EarningsScreen} />
    <Drawer.Screen name="Help" component={HelpScreen} />
  </Drawer.Navigator>
);

const AppNavigator: React.FC = () => {
  const [authState, setAuthState] = React.useState<
    'checking' | 'unauthenticated' | 'loggedIn' | 'verified'
  >('checking');

  React.useEffect(() => {
    isAuthenticated().then(isVerified => {
      setAuthState(isVerified ? 'verified' : 'unauthenticated');
    });
  }, []);

  if (authState === 'checking') return null;

  return (
    <Stack.Navigator
      initialRouteName={authState === 'verified' ? 'Main' : 'Login'}
      screenOptions={{headerRight: () => <ToggleSwitch />}}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{headerShown: false}}
        listeners={{
          blur: () => setAuthState('loggedIn'),
        }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        listeners={{
          blur: () => {
            isAuthenticated().then(isVerified => {
              if (isVerified) setAuthState('verified');
            });
          },
        }}
      />
      <Stack.Screen
        name="Main"
        component={DrawerNavigator}
        options={{headerShown: false}}
      />
      <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
