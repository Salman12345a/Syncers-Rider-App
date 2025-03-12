import React, {useEffect, useState} from 'react';
import {View, FlatList, ActivityIndicator, Text} from 'react-native';
import {StackNavigationProps} from '../types';
import OrderCard from '../components/OrderCard';
import {fetchAssignedOrders} from '../api/orderApi';
import {Order} from '../types';
import {useSocket} from '../../App';

const DashboardScreen: React.FC<StackNavigationProps<'Dashboard'>> = ({
  navigation,
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const {socket} = useSocket();

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const data = await fetchAssignedOrders();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching assigned orders:', error);
        setError(error.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();

    socket?.on('newAssignment', (data: Order) => {
      setOrders(prev => [...prev, data]);
    });

    socket?.on('statusUpdate', (updatedOrder: Order) => {
      setOrders(prev =>
        prev
          .map(o => (o.orderId === updatedOrder.orderId ? updatedOrder : o))
          .filter(o => o.status !== 'delivered'),
      );
    });

    return () => {
      socket?.off('newAssignment');
      socket?.off('statusUpdate');
    };
  }, [socket]);

  const handleOrderPress = (orderId: string) => {
    // Find the order by orderId and pass its _id
    const order = orders.find(o => o.orderId === orderId);
    const id = order?._id || orderId; // Fallback to orderId if _id is missing
    console.log('Navigating to OrderDetails with _id:', id);
    navigation.navigate('OrderDetails', {orderId: id});
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={{padding: 20}}>Error: {error}</Text>;

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

export default DashboardScreen;
