import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../pages/Introduction/LandingScreen';

export type LandingStackParamList = {
  Landing: undefined;
};

const Stack = createNativeStackNavigator<LandingStackParamList>();

const LandingStack = () => {
  return (
    <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
    </Stack.Navigator>
  );
};

export default LandingStack;
