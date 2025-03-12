const LOGIN_API_URL = 'http://10.0.2.2:3000/api/auth/delivery/login';

export const loginDeliveryPartner = async (
  phone: string,
): Promise<{accessToken: string; partnerId: string; details: object}> => {
  console.log('Attempting login with phone:', phone);
  try {
    const response = await fetch(LOGIN_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({phone}),
    });
    console.log('Response status:', response.status);
    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      throw new Error(`Login failed with status: ${response.status}`);
    }
    const data = await response.json();
    console.log('Response data:', data);
    // Map the response to the expected structure
    return {
      accessToken: data.accessToken,
      partnerId: data.deliveryPartner._id,
      details: data.deliveryPartner,
    };
  } catch (error) {
    console.error('Network error details:', error);
    throw error;
  }
};
