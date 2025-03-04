import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Button, View } from 'react-native';
import { HomeScreen } from '../../App';
import { FavoritesScreen } from '../pages/Favorites';
import { TabBarItem } from './components/TabBarItem';
import RecipeStack from './RecipeStack';
import { useNavigation } from '@react-navigation/native';

interface CustomTabNavigationOptions extends Omit<BottomTabNavigationOptions, 'tabBarIcon'> {
  iconName?: string;
}

export type BottomTabParamList = {
  Home: undefined;
  Recipes: { screen: string, name: string };
  newRecipes: undefined;
  Favorites: undefined;
};

const MyTabBar = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', height: 75, paddingHorizontal: 10 }}>
      {state.routes.map((route, index) => (
        <TabBarItem
          key={route.key}
          route={route}
          index={index}
          state={state}
          descriptors={descriptors}
          navigation={navigation}
        />
      ))}
    </View>
  );
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const navigationButton = (navigation: any) => {
  return (
    <Button onPress={() => {
      navigation.navigate('Recipes', {
        screen: 'RecipeList',
        name: 'Recipes',
      });
    }}
      title="Back"
      color="#000"
    />
  );
};

const MyTabs = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />}
      screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ iconName: 'home-outline' } as CustomTabNavigationOptions}
      />
      <Tab.Screen
        name="Recipes"
        component={RecipeStack}
        options={({ route }) => {
          const { name, screen } = route.params || { name: 'Recipes' };
          return {
            headerTitle: name,
            headerLeft: name !== 'Recipes' || screen === 'Recipe' ? () => navigationButton(navigation) : undefined,
            iconName: 'book-outline',
          } as CustomTabNavigationOptions;
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ iconName: 'heart-outline' } as CustomTabNavigationOptions} />
    </Tab.Navigator>
  );
};

export default MyTabs;
