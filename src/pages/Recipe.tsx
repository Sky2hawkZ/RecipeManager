import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {RecipeStackParamList} from '../navigation/navigationData';
import {RecipeData} from '../utils/dataTypes';
import {RecipeActions} from '../utils/db/recipeActions';
import {getImageSource} from '../utils/fs/handleImages';
import CIngredientList from '../components/organsims/CIngredientList';

interface Ingredient {
  id: number;
  ingredient: string;
  amount: number;
  measurement: string;
  inStock: boolean;
}

const RecipeScreen = () => {
  const navigation = useNavigation<NavigationProp<RecipeStackParamList>>();
  const route = useRoute<RouteProp<RecipeStackParamList, 'Recipe'>>();
  const {width: screenWidth} = useWindowDimensions();
  const {recipeId} = route.params;

  const [data, setData] = useState<RecipeData>();
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [descriptionHeight, setDescriptionHeight] = useState(200);

  useEffect(() => {
    const fetchUserId = async () => {
      if (!recipeId) {
        return;
      }
      const recipeData = await RecipeActions.getRecipeById(recipeId);
      if (recipeData) {
        const typedData = {
          id: recipeData.id,
          name: recipeData.name || '', // Convert null to empty string
          image: recipeData.image || '',
          description: recipeData.description || '',
          numberOfServings: recipeData.numberOfServings || 0,
          prepTime: recipeData.prepTime || 0,
          cookTime: recipeData.cookTime || 0,
          calories: recipeData.calories || 0,
          favorite: recipeData.favorite || false,
          user: recipeData.user || 0,
        };
        setData(typedData);

        // Fetch ingredients for this recipe
        const recipeIngredients = await RecipeActions.getIngredientsForRecipe(
          recipeId,
        );
        if (recipeIngredients) {
          const typedIngredients = recipeIngredients.map(ingredient => ({
            id: ingredient.id,
            ingredient: ingredient.ingredient || '',
            amount: ingredient.amount || 0,
            measurement: ingredient.measurement || '',
            inStock: ingredient.inStock || false,
            recipe: ingredient.recipe || 0,
          }));
          setIngredients(typedIngredients);
        }
      }
    };

    fetchUserId();
  }, [recipeId]);

  // Use useMemo to memoize the FlatList data
  const memoizedData = useMemo(() => data, [data]);
  const memoizedIngredients = useMemo(() => ingredients, [ingredients]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon
          name="arrow-back"
          size={30}
          color="#000"
          style={styles.backIcon}
        />
      </TouchableOpacity>
      <View style={styles.RecipeWrapper}>
        <Image
          source={{uri: getImageSource(memoizedData?.image || '')}}
          style={{width: screenWidth, height: 300}}
        />
        <View
          style={{
            flexDirection: 'row',
            borderBottomColor: '#ddd',
            borderBottomWidth: 2,
            borderTopColor: '#ddd',
            borderTopWidth: 2,
            justifyContent: 'space-between',
            paddingVertical: 5,
            paddingHorizontal: 20,
          }}>
          <View style={{justifyContent: 'space-evenly'}}>
            <Text style={{fontSize: 20, fontWeight: 700}}>
              {memoizedData?.name}
            </Text>
            <Text>Servings: {memoizedData?.numberOfServings}</Text>
          </View>
          <View style={{justifyContent: 'flex-end'}}>
            <Text>Prep Time: {memoizedData?.prepTime} min</Text>
            <Text>Cooking Time: {memoizedData?.cookTime} min</Text>
            <Text>Calories: {memoizedData?.calories}</Text>
          </View>
        </View>
        <View
          style={[styles.descriptionContainer, {height: descriptionHeight}]}>
          <Text
            onLayout={event => {
              const {height} = event.nativeEvent.layout;
              // Add some padding to the measured height
              setDescriptionHeight(Math.max(200, height + 40));
              console.log('height:', height);
              console.log('descriptionHeight:', descriptionHeight);
            }}>
            {memoizedData?.description}
          </Text>
        </View>
        <View style={styles.ingredientsSection}>
          <Text style={styles.sectionTitle}>Ingredients</Text>
          <CIngredientList ingredients={memoizedIngredients} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  RecipeWrapper: {
    flex: 1,
    zIndex: 0,
  },
  descriptionContainer: {
    padding: 20,
    backgroundColor: '#fff',
    minHeight: 200,
  },
  ingredientsSection: {
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  backIcon: {
    position: 'absolute',
    color: '#fff',
    top: 40,
    left: 10,
    zIndex: 10,
  },
});

export default RecipeScreen;
