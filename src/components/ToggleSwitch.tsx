import React, {useState} from 'react';
import {View, Text, Switch} from 'react-native';
import {useSocket} from '../../App';

const ToggleSwitch: React.FC = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const {socket} = useSocket();

  const handleToggle = () => {
    const newValue = !isAvailable;
    setIsAvailable(newValue);
    socket?.emit('syncmart:delivery-service-available', {
      partnerId: 'mock-delivery-partner-id',
      available: newValue,
    });
  };

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginRight: 10}}>
      <Text style={{marginRight: 8}}>Available</Text>
      <Switch value={isAvailable} onValueChange={handleToggle} />
    </View>
  );
};

export default ToggleSwitch;
