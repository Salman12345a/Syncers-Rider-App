import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {removeToken} from '../utils/auth';

const DrawerContent: React.FC<DrawerContentComponentProps> = ({
  navigation,
  state,
  descriptors,
}) => {
  const handleLogout = async () => {
    await removeToken();
    navigation.reset({index: 0, routes: [{name: 'Login'}]});
  };

  return (
    <DrawerContentScrollView>
      <View style={{padding: 20, alignItems: 'center'}}>
        <Image
          source={{uri: 'https://via.placeholder.com/100'}}
          style={{width: 100, height: 100, borderRadius: 50, marginBottom: 10}}
        />
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>John Doe</Text>
      </View>
      {state.routes.map((route, index) => (
        <TouchableOpacity
          key={route.key}
          onPress={() => navigation.navigate(route.name)}
          style={{padding: 10}}>
          <Text>{descriptors[route.key].options.title || route.name}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={handleLogout} style={{padding: 10}}>
        <Text>Logout</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
