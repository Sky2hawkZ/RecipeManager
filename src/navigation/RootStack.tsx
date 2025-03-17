import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LandingScreen from '../pages/Introduction/LandingScreen';
import MyTabs from './MyTabs';
import {getActiveUser} from '../utils/db/userData';

export type RootStackParamLists = {
  LandingScreen: undefined;
  HomeScreen: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamLists>();

const getInitialRouteName = async (): Promise<
  keyof RootStackParamLists | undefined
> => {
  const activeUser = await getActiveUser();
  return activeUser && activeUser[0]?.userId ? 'HomeScreen' : 'LandingScreen';
};

const RootStack = () => {
  const [initialRouteName, setInitialRouteName] = React.useState<
    keyof RootStackParamLists | undefined
  >(undefined);

  React.useEffect(() => {
    const fetchInitialRouteName = async () => {
      const routeName = await getInitialRouteName();
      setInitialRouteName(routeName);
    };

    fetchInitialRouteName();
  }, [initialRouteName]);

  if (initialRouteName === undefined) {
    // Optionally, you can render a loading screen or null while determining the initial route
    return null;
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {initialRouteName === 'LandingScreen' ? (
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
      ) : (
        <Stack.Screen name="HomeScreen" component={MyTabs} />
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
