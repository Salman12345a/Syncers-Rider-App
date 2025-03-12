import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {StackNavigationProps} from '../types';
import {storeAuthData} from '../utils/auth';

const DetailsScreen: React.FC<StackNavigationProps<'Details'>> = ({
  route,
  navigation,
}) => {
  const {accessToken, partnerId, details} = route.params;

  const handleVerify = async () => {
    try {
      await storeAuthData({accessToken, partnerId});
      // Navigate to Dashboard within the Main drawer navigator
      navigation.navigate('Main', {screen: 'Dashboard'});
    } catch (error) {
      console.error('Error storing auth data:', error);
      alert('Verification failed. Please try again.');
    }
  };

  if (!details) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Error: No details available</Text>
        <Button title="Go Back" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Details</Text>
      <Text style={styles.detail}>Name: {details.name}</Text>
      <Text style={styles.detail}>Age: {details.age}</Text>
      <Text style={styles.detail}>Gender: {details.gender}</Text>
      <Text style={styles.detail}>Phone: {details.phone}</Text>
      <Text style={styles.detail}>License Number: {details.licenseNumber}</Text>
      <Text style={styles.detail}>RC Number: {details.rcNumber}</Text>
      <Text style={styles.detail}>Status: {details.status}</Text>
      <Text style={styles.detail}>Documents:</Text>
      {details.documents && details.documents.length > 0 ? (
        details.documents.map((doc, index) => (
          <Text key={index} style={styles.document}>
            {doc.type}: {doc.url}
          </Text>
        ))
      ) : (
        <Text style={styles.document}>No documents available</Text>
      )}
      <Button title="Verify Details" onPress={handleVerify} />
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
    textAlign: 'center',
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  document: {
    fontSize: 14,
    marginLeft: 10,
    marginBottom: 5,
  },
});

export default DetailsScreen;
