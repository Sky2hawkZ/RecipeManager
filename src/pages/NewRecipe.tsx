import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from '@react-native-vector-icons/ionicons';

import CHeader from '../components/molecules/CHeader';
import {RecipeStackParamList} from '../navigation/navigationData';
import {RecipeActions} from '../utils/db/recipeActions';
import CIngredientInputRow from '../components/molecules/CIngredientInputRow';

interface Ingredient {
  ingredient: string;
  amount: string;
  measurement: string;
  inStock: boolean;
}

const NewRecipeScreen = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [numberOfServings, setNumberOfServings] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [calories, setCalories] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleCreateRecipe = async () => {
    try {
      const newRecipe = await RecipeActions.createRecipe({
        name: recipeName,
        image: recipeImage,
        description: recipeDescription,
        numberOfServings: parseInt(numberOfServings, 10),
        prepTime: parseInt(prepTime, 10),
        cookTime: parseInt(cookTime, 10),
        favorite: favorite,
        calories: parseInt(calories, 10),
        userId: 1, // Placeholder, update as needed
      });

      const newIngredients = await Promise.all(
        ingredients.map(ingredient =>
          RecipeActions.createIngredient({
            recipe: 0, // TODO: FIX
            amount: parseFloat(ingredient.amount),
            inStock: ingredient.inStock,
            ingredient: ingredient.ingredient,
            measurement: ingredient.measurement,
          }),
        ),
      );

      console.log('Recipe and Ingredient created:', newRecipe, newIngredients);
    } catch (error) {
      console.error('Error creating recipe and ingredient:', error);
    }
  };

  const renderFavorite = () => {
    if (favorite) {
      return (
        <TouchableOpacity onPress={() => setFavorite(!favorite)}>
          <Icon
            name="star"
            size={30}
            color="red"
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => setFavorite(!favorite)}>
          <Icon
            name="star-outline"
            size={30}
            color="black"
          />
          ;
        </TouchableOpacity>
      );
    }
  };

  return (
    <View style={styles.container}>
      <CHeader<RecipeStackParamList>
        title={'New Recipe'}
        hasTitle={true}
        navigationName="RecipeList"
        navigationData={{
          screen: 'RecipeList',
        }}
      />
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text>New Recipe</Text>
          {renderFavorite()}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Recipe Name"
          value={recipeName}
          onChangeText={setRecipeName}
        />
        <TextInput
          style={styles.input}
          placeholder="Recipe Image URL"
          value={recipeImage}
          onChangeText={setRecipeImage}
        />
        <TextInput
          style={styles.input}
          placeholder="Recipe Description"
          value={recipeDescription}
          onChangeText={setRecipeDescription}
        />
        <TextInput
          style={styles.input}
          placeholder="Number of Servings"
          value={numberOfServings}
          onChangeText={setNumberOfServings}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Prep Time"
          value={prepTime}
          onChangeText={setPrepTime}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Cook Time"
          value={cookTime}
          onChangeText={setCookTime}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Calories"
          value={calories}
          onChangeText={setCalories}
          keyboardType="numeric"
        />
        <CIngredientInputRow onChange={setIngredients} />
        <Button
          title="Create Recipe"
          onPress={handleCreateRecipe}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  formContainer: {
    flex: 1,
    marginTop: 120,
    width: 350,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
  },
});

export default NewRecipeScreen;
