/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  CompositeNavigationProp,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import React, {useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import MyTabs from './src/navigation/MyTabs';
import Animated, {
  ReduceMotion,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import Icon from '@react-native-vector-icons/ionicons';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import LandingStack from './src/navigation/LandingStack';
import CHeader from './src/components/molecules/CHeader';
import {
  BottomTabParamList,
  RecipeStackParamList,
} from './src/navigation/navigationData';

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList, 'Home'>,
  NativeStackNavigationProp<RecipeStackParamList>
>;

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const buttonWidth = useSharedValue(60);
  const buttonHeight = useSharedValue(60);
  const buttonRadius = useSharedValue(30);

  const animateButton = async () => {
    buttonWidth.value = withRepeat(
      withTiming(70, {duration: 300}),
      2,
      true,
      () => {},
      ReduceMotion.System,
    );
    buttonHeight.value = withRepeat(
      withTiming(70, {duration: 300}),
      2,
      true,
      () => {},
      ReduceMotion.System,
    );
    buttonRadius.value = withRepeat(
      withTiming(35, {duration: 300}),
      2,
      true,
      () => {},
      ReduceMotion.System,
    );
  };

  return (
    <View style={styles.container}>
      <CHeader<BottomTabParamList>
        title="Home"
        hasTitle
      />
      <View style={styles.content}>
        <Text>Home Screen</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={async () => {
          await animateButton();
          navigation.navigate('Recipes', {
            screen: 'NewRecipe',
            name: 'New Recipe',
          });
        }}>
        <Animated.View
          style={{
            ...styles.newRecipeButton,
            width: buttonWidth,
            height: buttonHeight,
            borderRadius: buttonRadius,
          }}>
          <Icon
            style={styles.RecipeIcon}
            name="add"
            size={30}
            color="#fff"
          />
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default function App() {
  const [isLandingCompleted, setIsLandingCompleted] = useState<boolean>(true);

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        {isLandingCompleted ? <MyTabs /> : <LandingStack />}
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
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
