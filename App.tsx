/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RootStackParamList, useAppNavigation } from './src/hooks/useAppNavigation';
import { DetailsScreen } from './src/Details';


export function HomeScreen(): React.JSX.Element {
  const navigation = useAppNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Text>Home Screen</Text>
        <Button title="Go to Details" onPress={() => navigation.navigate('Details')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
  },
});

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
    <RootStack.Navigator initialRouteName="Home">
      <RootStack.Screen name="Home" component={HomeScreen}/>
      <RootStack.Screen name="Details" component={DetailsScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
  );
}
