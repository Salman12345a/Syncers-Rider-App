import React, {createContext, useContext, useEffect, useState} from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import io, {Socket} from 'socket.io-client';
import AppNavigator from './src/navigation/AppNavigator';
import {API_BASE_URL} from './src/utils/constants';

interface SocketContextType {
  socket: Socket | null;
}

const SocketContext = createContext<SocketContextType>({socket: null});

export const useSocket = () => useContext(SocketContext);

const App: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance = io(`${API_BASE_URL}:3000`, {
      transports: ['websocket'],
      reconnection: true,
    });

    socketInstance.on('connect', () => {
      console.log('Socket.IO Connected');
    });

    socketInstance.on('disconnect', () => {
      console.log('Socket.IO Disconnected');
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{socket}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </SocketContext.Provider>
  );
};

export default App;
