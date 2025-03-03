import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';
import { HomeScreen } from '../../App';
import { RecipeScreen } from '../pages/Recipe';
import { FavoritesScreen } from '../pages/Favorites';
import { TabBarItem } from './components/TabBarItem';

interface CustomTabNavigationOptions extends Omit<BottomTabNavigationOptions, 'tabBarIcon'> {
  iconName?: string;
}

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

const Tab = createBottomTabNavigator();

const MyTabs = () => {
  return (
    <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ iconName: 'home-outline' } as CustomTabNavigationOptions}
      />
      <Tab.Screen
        name="Recipe"
        component={RecipeScreen}
        options={{ iconName: 'book-outline' } as CustomTabNavigationOptions}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ iconName: 'heart-outline' } as CustomTabNavigationOptions} />
    </Tab.Navigator>
  );
};

export default MyTabs;
