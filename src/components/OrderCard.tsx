import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Order} from '../types';
import {CURRENCY_SYMBOL} from '../utils/constants';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({order, onPress}) => {
  const formattedDate = order.createdAt
    ? new Date(order.createdAt).toLocaleString()
    : 'N/A';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 8,
      }}>
      <Text style={{fontWeight: 'bold'}}>Order ID: {order.orderId}</Text>
      <Text>
        Total: {CURRENCY_SYMBOL}
        {order.totalPrice}
      </Text>
      <Text>Items: {order.items.length}</Text>
      <Text>Status: {order.status}</Text>
      <Text>Date: {formattedDate}</Text>
    </TouchableOpacity>
  );
};

export default OrderCard;
