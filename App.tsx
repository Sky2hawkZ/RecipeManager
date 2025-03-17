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
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, useWindowDimensions, View} from 'react-native';
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
import {useDrizzleStudio} from 'expo-drizzle-studio-plugin';
import CHeader from './src/components/molecules/CHeader';
import {
  BottomTabParamList,
  RecipeStackParamList,
} from './src/navigation/navigationData';
import RootStack from './src/navigation/RootStack';

import * as SQLite from 'expo-sqlite';
import {drizzle} from 'drizzle-orm/expo-sqlite';
import {useMigrations} from 'drizzle-orm/expo-sqlite/migrator';
import migrations from './drizzle/migrations';
import {getActiveUser} from './src/utils/db/userData';
import {getUserById} from './src/utils/db/dbActions';
import {User} from './src/utils/dataTypes';

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList>,
  NativeStackNavigationProp<RecipeStackParamList>
>;

const database = SQLite.openDatabaseSync('db.db', {enableChangeListener: true});
const db = drizzle(database);

export function HomeScreen(): React.JSX.Element {
  const { width: screenWidth } = useWindowDimensions();
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const buttonWidth = useSharedValue(60);
  const buttonHeight = useSharedValue(60);
  const buttonRadius = useSharedValue(30);
  const [userId, setUserId] = useState<number>(0);
  const [LoggedInUser, setLoggedInUser] = useState<User>({
    userId: 0,
    userName: '',
    userPreferences: '',
    isOnboarded: false,
  });

  useEffect(() => {
    const fetchUserId = async () => {
      const activeUser = await getActiveUser();
      if (activeUser && activeUser[0]) {
        setUserId(activeUser[0].userId);
      }
    };

    fetchUserId();
  }, [userId]);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUser = await getUserById(userId);
      if (fetchedUser) {
        setLoggedInUser(fetchedUser);
      }
    };

    fetchUser();
  }, [userId]);

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
        <View style={[styles.contentContainer, { left: (screenWidth - 350) / 2 }]}>
          <Text style={styles.heading}>Welcome, {LoggedInUser.userName} </Text>
          <Text>This is your Home Screen</Text>
          <Text>It's a work in progress! 🚧 </Text>
        </View>
        <View style={[styles.contentContainer, {top: 140, height: 200, left: (screenWidth - 350) / 2}]}>
          <Text>There will be a favorite carousel here! 🚧</Text>
        </View>
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
  useDrizzleStudio(database);

  const {success, error} = useMigrations(db, migrations);
  if (error) {
    return (
      <View>
        <Text>Migration error: {error.message}</Text>
      </View>
    );
  }
  if (!success) {
    return (
      <View>
        <Text>Migration is in progress...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <RootStack />
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
    marginTop: 120,
    zIndex: 0,
  },
  contentContainer: {
    backgroundColor: '#A9A9A9',
    padding: 10,
    width: 350,
    height: 100,
    position: 'absolute',
    top: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    fontSize: 30,
    fontWeight: 700,
  },
  newRecipeButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    left: 20,
    zIndex: 1,
  },
  RecipeIcon: {},
});
