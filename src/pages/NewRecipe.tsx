import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import Icon from '@react-native-vector-icons/ionicons';
import CHeader from '../components/molecules/CHeader';
import {RecipeStackParamList} from '../navigation/navigationData';


const NewRecipeScreen = () => {
  return (
    <View style={styles.container}>
      <CHeader<RecipeStackParamList>
        title={''}
        hasTitle={false}
        navigationName="RecipeList"
        navigationData={{
          screen: 'RecipeList',
        }}
      />
      <Text>New Recipe Screen!!</Text>
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
});

export default NewRecipeScreen;
