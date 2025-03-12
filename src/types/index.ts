import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CompositeNavigationProp} from '@react-navigation/native';

// Define the Order type that's used across multiple files
export interface Order {
  orderId: string;
  totalPrice: number;
  items: {item: string; count: number; price: number}[];
  status: string;
  createdAt: string;
}

// Define the navigation param list for type safety
export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  Dashboard: undefined;
  OrderDetails: {orderId: string};
  OrdersDelivered: undefined;
  Earnings: undefined;
  Help: undefined;
  DashboardStack: undefined;
  OrdersDeliveredStack: undefined;
  EarningsStack: undefined;
  HelpStack: undefined;
};

// Define types for navigation props
export type StackNavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: RouteProp<RootStackParamList, T>;
};

// Type for screens that need drawer functionality
export type DrawerScreenProps<T extends keyof RootStackParamList> = {
  navigation: CompositeNavigationProp<
    DrawerNavigationProp<RootStackParamList, T>,
    StackNavigationProp<RootStackParamList>
  >;
  route: RouteProp<RootStackParamList, T>;
};

// Simplified DrawerNavigationProps
export type DrawerNavigationProps = {
  navigation: DrawerNavigationProp<RootStackParamList>;
};
