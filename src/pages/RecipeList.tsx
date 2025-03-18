import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useMemo} from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RecipeStackParamList} from '../navigation/navigationData';
import {FlatList} from 'react-native-gesture-handler';
import {RecipeActions} from '../utils/db/recipeActions';
import {RecipeData} from '../utils/dataTypes';
import Icon from '@react-native-vector-icons/ionicons';
import { getImageSource } from '../utils/fs/addImages';

function RecipeListScreen() {
  const navigation = useNavigation<NavigationProp<RecipeStackParamList>>();

  const [data, setData] = React.useState<RecipeData[]>([]);

  useEffect(() => {
    const fetchUserId = async () => {
      const recipeData = await RecipeActions.getAllRecipes();
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
      <Text
      style={{fontSize: 20, fontWeight: 'bold'}}
      onPress={() => navigation.navigate('Recipe', {})}>
        Recipes
      </Text>
      {/* Refactor RenderItem into a custom card component */}
      <FlatList
        style={styles.listWrapper}
        data={memoizedData}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => navigation.navigate('Recipe', {recipeId: item.id})}>
            <View style={styles.listContent}>
              <Text style={{marginBottom: 5, fontSize: 20, fontWeight: 'bold'}}>{item.name}</Text>
              <Text>Cooking Time: {item.cookTime} min</Text>
              <Text>Preparation Time: {item.prepTime} min</Text>
              <Text>
                Servings: {item.numberOfServings} - Calories: {item.calories}
              </Text>
              {item.favorite ? (
                <Icon
                  style={styles.favoriteStyle}
                  name="star"
                  size={30}
                  color="red"
                />
              ) : (
                <Icon
                  style={styles.favoriteStyle}
                  name="star-outline"
                  size={30}
                  color="black"
                />
              )}
            </View>

            {item.image && (
              <Image
                source={{uri: getImageSource(item.image)}}
                style={styles.listImage}
              />
            )}
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
    width: '80%',
  },

  // Card Styles
  listItem: {
    borderRadius: 15,
    height: 100,
    width: '100%',
    marginVertical: 5,
    paddingLeft: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4, // Shadow for Android
  },
  listContent: {
    width: '68%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingTop: 10,
  },
  listImage: {
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: 'grey',
    width: 100,
    height: 100,
  },
  favoriteStyle: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default RecipeListScreen;
