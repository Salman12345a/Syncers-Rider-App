import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, Button, StyleSheet} from 'react-native';
import {StackNavigationProps} from '../types';
import {fetchOrderDetails, updateOrderStatus} from '../api/orderApi';
import {Order} from '../types';

const OrderDetailsScreen: React.FC<StackNavigationProps<'OrderDetails'>> = ({
  route,
  navigation,
}) => {
  const {orderId} = route.params; // Expects _id
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        const data = await fetchOrderDetails(orderId);
        setOrder(data);
      } catch (error) {
        console.error('Error in OrderDetailsScreen:', error);
        setError(error.message || 'Failed to load order details');
      } finally {
        setLoading(false);
      }
    };
    loadOrderDetails();
  }, [orderId]);

  const handleStatusUpdate = async (newStatus: 'arriving' | 'delivered') => {
    if (!order) return;
    setLoading(true);
    try {
      const updatedOrder = await updateOrderStatus(order._id!, newStatus);
      setOrder(updatedOrder);
      if (newStatus === 'delivered') {
        navigation.goBack(); // Go back to Dashboard after delivery
      }
    } catch (error) {
      console.error('Error updating status:', error);
      setError('Failed to update order status');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;
  if (error) return <Text style={styles.error}>Error: {error}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Order Details</Text>
      {order && (
        <>
          <Text style={styles.detail}>Order ID: {order.orderId}</Text>
          <Text style={styles.detail}>Total Price: ₹{order.totalPrice}</Text>
          <Text style={styles.detail}>Status: {order.status}</Text>
          <Text style={styles.detail}>Created At: {order.createdAt}</Text>
          <Text style={styles.detail}>
            Branch: {order.branch?.name || 'N/A'}
          </Text>
          <Text style={styles.detail}>
            Customer Phone: {order.customer?.phone || 'N/A'}
          </Text>
          <Text style={styles.detail}>
            Delivery Partner: {order.deliveryPartner?.name || 'N/A'}
          </Text>
          <Text style={styles.subtitle}>Items:</Text>
          {order.items.map((item, index) => (
            <Text key={index} style={styles.item}>
              {item.item.name} - {item.count} x ₹{item.price}
            </Text>
          ))}
          {/* Status Update Buttons */}
          {order.status === 'assigned' && (
            <Button
              title="Mark as Arriving"
              onPress={() => handleStatusUpdate('arriving')}
            />
          )}
          {order.status === 'arriving' && (
            <Button
              title="Mark as Delivered"
              onPress={() => handleStatusUpdate('delivered')}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  item: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 5,
  },
  error: {
    padding: 20,
    color: 'red',
  },
});

export default OrderDetailsScreen;
