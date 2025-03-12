import AsyncStorage from '@react-native-async-storage/async-storage';
import {STORAGE_KEYS} from './constants';

interface AuthData {
  accessToken: string;
  partnerId: string;
}

export const storeAuthData = async (authData: AuthData): Promise<void> => {
  try {
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.JWT_TOKEN, authData.accessToken],
      [STORAGE_KEYS.PARTNER_ID, authData.partnerId],
    ]);
  } catch (error) {
    console.error('Failed to store auth data:', error);
    throw error;
  }
};

export const getAuthData = async (): Promise<AuthData | null> => {
  try {
    const [accessToken, partnerId] = await AsyncStorage.multiGet([
      STORAGE_KEYS.JWT_TOKEN,
      STORAGE_KEYS.PARTNER_ID,
    ]);
    if (accessToken[1] && partnerId[1]) {
      return {accessToken: accessToken[1], partnerId: partnerId[1]};
    }
    return null;
  } catch (error) {
    console.error('Failed to get auth data:', error);
    return null;
  }
};

export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem(STORAGE_KEYS.JWT_TOKEN);
    console.log('Retrieved token:', token); // Log token for debugging
    return token;
  } catch (error) {
    console.error('Failed to get token:', error);
    return null;
  }
};

export const getUserId = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.PARTNER_ID);
  } catch (error) {
    console.error('Failed to get user ID:', error);
    return null;
  }
};

export const clearAuthData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      STORAGE_KEYS.JWT_TOKEN,
      STORAGE_KEYS.PARTNER_ID,
    ]);
  } catch (error) {
    console.error('Failed to clear auth data:', error);
    throw error;
  }
};

export const isAuthenticated = async (): Promise<boolean> => {
  const authData = await getAuthData();
  return !!authData;
};
