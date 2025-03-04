/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { CompositeNavigationProp, NavigationContainer, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Dimensions,
  LayoutChangeEvent,
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
  const buttonWidth = useSharedValue(60);
  const buttonHeight = useSharedValue(60);
  const buttonRadius = useSharedValue(30);
  const [left, setLeft] = useState(10);

  const animateButton = async () => {
    buttonWidth.value = withRepeat(
      withTiming(70, { duration: 300 }),
      2,
      true,
      () => { },
      ReduceMotion.System);
    buttonHeight.value = withRepeat(
      withTiming(70, { duration: 300 }),
      2,
      true,
      () => { },
      ReduceMotion.System);
    buttonRadius.value = withRepeat(
      withTiming(35, { duration: 300 }),
      2,
      true,
      () => { },
      ReduceMotion.System);
  };

  const onTitleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    const screenWidth = Dimensions.get('window').width;
    const calculatedLeft = (screenWidth - width) / 2;
    setLeft(calculatedLeft);
    console.log('Title width:', width);
    console.log('Screen width:', screenWidth);
    console.log('Calculated left:', calculatedLeft);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.titleStyles, { left }]} onLayout={onTitleLayout}>Title!</Text>
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
          width: buttonWidth,
          height: buttonHeight,
          borderRadius: buttonRadius,
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
  titleStyles: {
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 60, // TODO: Make Compatible with Android
  },
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
