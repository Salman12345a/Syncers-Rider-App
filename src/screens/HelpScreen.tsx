import React from 'react';
import {View, Text} from 'react-native';

const HelpScreen: React.FC = () => (
  <View style={{flex: 1, padding: 20, backgroundColor: '#f5f5f5'}}>
    <Text style={{fontSize: 18, fontWeight: 'bold'}}>Help</Text>
    <Text>Contact: support@syncersapp.com</Text>
  </View>
);

export default HelpScreen;
