import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LandingScreen from '../pages/Introduction/LandingScreen';
import PreferencesScreen from '../pages/Introduction/PreferencesScreen';

export type LandingStackParamList = {
  Landing: undefined;
  Preferences: undefined;
};

const Stack = createNativeStackNavigator<LandingStackParamList>();

const LandingStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Landing" component={LandingScreen} />
      <Stack.Screen name="Preferences" component={PreferencesScreen} />
    </Stack.Navigator>
  );
};

export default LandingStack;
