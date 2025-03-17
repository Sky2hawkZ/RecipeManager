import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RecipeStackParamList} from '../navigation/navigationData';
import {FlatList} from 'react-native-gesture-handler';
import {RecipeActions} from '../utils/db/recipeActions';
import {RecipeData} from '../utils/dataTypes';

function RecipeListScreen() {
  const navigation = useNavigation<NavigationProp<RecipeStackParamList>>();

  const [data, setData] = React.useState<RecipeData[]>([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const recipeData = await RecipeActions.getAllRecipes();
      console.log('Recipe Data:', recipeData);
      if (recipeData) {

        const typedData = recipeData.map(recipe => ({
          id: recipe.id,
          name: recipe.name || '', // Convert null to empty string
          image: recipe.image || '',
          description: recipe.description || '',
          numberOfServings: recipe.numberOfServings || 0,
          prepTime: recipe.prepTime || 0,
          cookTime: recipe.cookTime || 0,
          calories: recipe.calories || 0,
          favorite: recipe.favorite || false,
          user: recipe.user || 0,
        })) as RecipeData[];

        setData(typedData);
      }
    };

    fetchUserId();
  }, []);

  // Use useMemo to memoize the FlatList data
  const memoizedData = useMemo(() => data, [data]);

  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate('Recipe', {})}>Recipe Screen</Text>
      <Text>We have the best Recipes!</Text>
      <Text>You should come back and try a few!</Text>
      <Text>When This page has been built!</Text>
      <FlatList
        style={styles.listWrapper}
        data={memoizedData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
            <TouchableOpacity onPress={() => navigation.navigate('Recipe', {recipeId: item.id})}>
                <Text>{item.name}, {item.cookTime} min</Text>
            </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,
  },
  listWrapper: {
    backgroundColor: 'grey',
    width: '80%',
  },
});

export default RecipeListScreen;
