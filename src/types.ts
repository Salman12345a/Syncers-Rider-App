import {StackNavigationProp} from '@react-navigation/stack';
import {DrawerNavigationProp} from '@react-navigation/drawer';

export interface Item {
  _id: string;
  name: string;
  image?: string;
  price: number;
  discountPrice?: number;
  quantity?: number;
  Category?: string;
  __v?: number;
}

export interface Order {
  _id?: string;
  orderId: string;
  totalPrice: number;
  items: {item: Item; count: number; price: number; _id?: string}[];
  status: 'assigned' | 'arriving' | 'delivered';
  createdAt: string;
  deliveryPartner?: {
    _id: string;
    name: string;
    phone: number;
    // Add other fields if needed
  };
  branch?: {
    _id: string;
    name: string;
    address: string;
    // Add other fields if needed
  };
  customer?: {
    _id: string;
    phone: number;
    // Add other fields if needed
  };
}

export type RootStackParamList = {
  Login: undefined;
  Details: {
    accessToken: string;
    partnerId: string;
    details: {
      _id: string;
      name: string;
      age: number;
      gender: string;
      phone: number;
      licenseNumber: string;
      rcNumber: string;
      documents: {type: string; url: string}[];
      status: string;
      isActivated: boolean;
      availability: boolean;
      branch: string;
      currentOrder: string | null;
      rejectionMessage: string | null;
      role: string;
      __v: number;
    };
  };
  Main: undefined;
  Dashboard: undefined;
  OrderDetails: {orderId: string};
  OrdersDelivered: undefined;
  Earnings: undefined;
  Help: undefined;
};
export type StackNavigationProps<T extends keyof RootStackParamList> = {
  navigation: StackNavigationProp<RootStackParamList, T>;
  route: {params?: RootStackParamList[T]};
};

export type DrawerNavigationProps = {
  navigation: DrawerNavigationProp<RootStackParamList>;
};
