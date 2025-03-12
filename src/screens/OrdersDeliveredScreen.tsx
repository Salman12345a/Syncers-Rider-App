import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator} from 'react-native';
import {StackNavigationProps} from '../types';
import OrderCard from '../components/OrderCard';
import {fetchDeliveredOrders} from '../api/orderApi';
import {Order} from '../types';

const OrdersDeliveredScreen: React.FC<
  StackNavigationProps<'OrdersDelivered'>
> = ({navigation}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await fetchDeliveredOrders();
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  const handleOrderPress = (orderId: string) => {
    navigation.navigate('OrderDetails', {orderId});
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <FlatList
        data={orders}
        renderItem={({item}) => (
          <OrderCard
            order={item}
            onPress={() => handleOrderPress(item.orderId)}
          />
        )}
        keyExtractor={item => item.orderId}
      />
    </View>
  );
};

export default OrdersDeliveredScreen;
