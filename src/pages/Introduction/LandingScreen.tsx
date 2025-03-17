import {Button, StyleSheet, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';

import {createUser} from '../../utils/db/dbActions';
import { setActiveUser } from '../../utils/db/userData';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from '../../navigation/navigationData';
import { LandingStackParamList } from '../../navigation/LandingStack';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type LandingScreenNavProp = CompositeNavigationProp<
BottomTabNavigationProp<BottomTabParamList, 'HomeScreen'>,
NativeStackNavigationProp<LandingStackParamList>
>;

const LandingScreen = () => {
  const [username, setUsername] = useState('');
  const [userPreferences, setUserPreferences] = useState('omnivorous');

  const navigation = useNavigation<LandingScreenNavProp>();

  const handleCreateUser = async () => {
    try {
      const newUser = await createUser(username, userPreferences, true);
      if (newUser[0].userName) {
        await setActiveUser({
          userId: newUser[0].userId,
        });
        navigation.navigate('HomeScreen', { screen: 'HomeScreen'});
      } else {
        console.error('Error: userName is null');
      }
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder="Enter your name"
      />
      <View style={styles.pickerInput}>
        <Picker
          selectedValue={userPreferences}
          onValueChange={(itemValue) =>
            setUserPreferences(itemValue)
          }>
          <Picker.Item
            label="Omnivorous"
            value="omnivorous"
          />
          <Picker.Item
            label="Vegetarian"
            value="vegetarian"
          />
          <Picker.Item
            label="Vegan"
            value="vegan"
          />
        </Picker>
      </View>
      <Button
        title="Create User"
        onPress={handleCreateUser}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 10,
  },
  input: {
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  pickerInput: {
    height: 220,
    width: 200,
  },
});

export default LandingScreen;

