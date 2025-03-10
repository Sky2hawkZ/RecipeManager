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
import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
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
import {drizzle, useLiveQuery} from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import { eq } from 'drizzle-orm';
import {user} from './db/schema';
import migrations from './drizzle/migrations';
import { getActiveUser } from './src/utils/db/userData';

export type HomeScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<BottomTabParamList>,
  NativeStackNavigationProp<RecipeStackParamList>
>;

const database = SQLite.openDatabaseSync('db.db', {enableChangeListener: true});
const db = drizzle(database);

export function HomeScreen(): React.JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const buttonWidth = useSharedValue(60);
  const buttonHeight = useSharedValue(60);
  const buttonRadius = useSharedValue(30);
  const [userId, setUserId] = useState<number>(0);


  console.log('activeUserRecord: ', userId);

  const {data} = useLiveQuery(db.select().from(user).where(eq(user.userId, userId)), [userId]);

  console.log(data);
  useEffect(() => {
    const fetchUserId = async () => {
      const activeUser = await getActiveUser();
      if (activeUser && activeUser[0]) {
        setUserId(activeUser[0].userId);
      }
    };

    fetchUserId();
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
        <Text>Home Screen</Text>
        {data?.map(person => (
          <Text key={person.userId}>
            {person.userName}, {person.userPreferences}
          </Text>
        ))}
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

  const { success, error } = useMigrations(db, migrations);
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
