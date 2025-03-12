import axios from 'axios';
import {API_BASE_URL} from '../utils/constants';
import {getToken, getUserId} from '../utils/auth';
import {Order} from '../types';

const api = axios.create({baseURL: API_BASE_URL});

api.interceptors.request.use(async config => {
  const token = await getToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
    console.log('Request URL:', config.baseURL + config.url);
    console.log('Request Headers:', config.headers);
  } else {
    console.log('No token found for request');
  }
  return config;
});

export const fetchAssignedOrders = async (): Promise<Order[]> => {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error('User ID not found');
    const response = await api.get(
      `/orders?deliveryPartner=${userId}&status=assigned`,
    );
    console.log('Assigned orders response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching assigned orders:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        response: error.response?.data,
      });
    }
    throw error;
  }
};

export const fetchDeliveredOrders = async (): Promise<Order[]> => {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error('User ID not found');
    const response = await api.get(
      `/orders?deliveryPartner=${userId}&status=delivered`,
    );
    console.log('Delivered orders response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching delivered orders:', error);
    throw error;
  }
};

export const fetchOrderDetails = async (orderId: string): Promise<Order> => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    console.log('Order details response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    if (axios.isAxiosError(error)) {
      console.error('Axios error details:', {
        message: error.message,
        code: error.code,
        status: error.response?.status,
        response: error.response?.data,
      });
    }
    throw error;
  }
};

export const updateOrderStatus = async (
  orderId: string,
  status: string,
): Promise<Order> => {
  try {
    const response = await api.patch(`/orders/${orderId}/status`, {status});
    console.log('Updated order status response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
