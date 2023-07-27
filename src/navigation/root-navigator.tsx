import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { GlobalFlowScreen } from '../global-flow/global-flow-screen';
import { HomeScreen } from '../home-screen';
import { PlaygroundScreen } from '../playground/playground-screen';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          gestureEnabled: true,
        }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Playground" component={PlaygroundScreen} />
        <Stack.Screen name="GlobalFlow" component={GlobalFlowScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
