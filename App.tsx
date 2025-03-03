/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { CompositeNavigationProp, NavigationContainer, useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MyTabs, { BottomTabParamList } from './src/navigation/MyTabs';
import Animated, { ReduceMotion, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated';
import Icon from '@react-native-vector-icons/ionicons';
import { RecipeStackParamList } from './src/hooks/useAppNavigation';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  NativeStackNavigationProp<RecipeStackParamList>
>;

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const width = useSharedValue(60);
  const height = useSharedValue(60);
  const radius = useSharedValue(30);

  const animateButton = async () => {
    width.value = withRepeat(
      withTiming(70, { duration: 300 }),
      2,
      true,
      () => { },
      ReduceMotion.System);
    height.value = withRepeat(
      withTiming(70, { duration: 300 }),
      2,
      true,
      () => { },
      ReduceMotion.System);
    radius.value = withRepeat(
      withTiming(35, { duration: 300 }),
      2,
      true,
      () => { },
      ReduceMotion.System);
  };

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Text>Home Screen</Text>
      </View>
      <TouchableWithoutFeedback onPress={async () => {
        await animateButton();
        console.log('Navigate to New Recipe');
        navigation.navigate('Recipes', {
          screen: 'NewRecipe',
          name: 'New Recipe',
        });
      }}>
        <Animated.View style={{
          ...styles.newRecipeButton,
          width: width,
          height: height,
          borderRadius: radius,
        }}>
          <Icon style={styles.RecipeIcon} name="add" size={30} color="#fff" />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  newRecipeButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  RecipeIcon: {},
});
