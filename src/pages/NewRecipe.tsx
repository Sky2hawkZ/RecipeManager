import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';

import CHeader from '../components/molecules/CHeader';
import {RecipeStackParamList} from '../navigation/navigationData';
import {RecipeActions} from '../utils/db/recipeActions';
import CIngredientInputRow from '../components/molecules/CIngredientInputRow';
import CustomButton from '../components/atoms/CButton';
import {saveImageToDocuments} from '../utils/fs/addImages';

interface Ingredient {
  ingredient: string;
  amount: string;
  measurement: string;
  inStock?: boolean;
}

const NewRecipeScreen = () => {
  const [recipeName, setRecipeName] = useState('');
  const [recipeImage, setRecipeImage] = useState('');
  const [recipeImagePreview, setRecipeImagePreview] = useState('');
  const [recipeDescription, setRecipeDescription] = useState('');
  const [numberOfServings, setNumberOfServings] = useState('');
  const [prepTime, setPrepTime] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [favorite, setFavorite] = useState(false);
  const [calories, setCalories] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      {ingredient: '', amount: '', measurement: ''},
    ]);
  };

  const handleSelectImage = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      quality: 0.8, // Good quality but not too large
      maxWidth: 800,
      maxHeight: 800,
    };

    launchImageLibrary(options, async response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const imageUri = response.assets[0].uri;

        if (imageUri) {
          // Set preview immediately for UX
          setRecipeImagePreview(imageUri);

          // Save to documents in background
          const savedPath = await saveImageToDocuments(recipeName, imageUri);
          if (savedPath.relativePath) {
            // Store the permanent path
            setRecipeImage(savedPath.relativePath);
          } else {
            // Fallback to temporary path if saving fails
            setRecipeImage(imageUri);
          }
        }
      }
    });
  };

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
        user: 28, // Placeholder, update as needed
      });

      setRecipeName('');
      setRecipeImage('');
      setRecipeDescription('');
      setNumberOfServings('');
      setPrepTime('');
      setCookTime('');
      setFavorite(false);
      setCalories('');
      setIngredients([]);

      const newIngredients = await Promise.all(
        ingredients.map(ingredient =>
          RecipeActions.createIngredient({
            recipe: newRecipe[0].id, // TODO: FIX
            amount: parseFloat(ingredient.amount),
            ingredient: ingredient.ingredient,
            measurement: ingredient.measurement,
            inStock: ingredient.inStock ? ingredient.inStock : false,
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
    <ScrollView contentContainerStyle={styles.container}>
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
        <View style={styles.imagePickerContainer}>
          {recipeImagePreview ? (
            <Image
              source={{uri: recipeImagePreview}}
              style={styles.imagePreview}
            />
          ) : (
            <TouchableOpacity
              style={styles.imagePickerButton}
              onPress={handleSelectImage}>
              <Icon
                name="camera-outline"
                size={24}
                color="#555"
              />
              <Text style={styles.imagePickerText}>Select Recipe Image</Text>
            </TouchableOpacity>
          )}
        </View>
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
        <TextInput
          style={[styles.input, {height: 100}]}
          placeholder="Description"
          value={recipeDescription}
          onChangeText={setRecipeDescription}
          multiline
          numberOfLines={4}
        />
        <CIngredientInputRow
          onChange={setIngredients}
          ingredients={ingredients}
        />
        <View
          style={styles.buttonContainer}>
          <CustomButton
            label="Add Ingredient"
            onPress={handleAddIngredient}
          />
          <CustomButton
            label="Create Recipe"
            onPress={handleCreateRecipe}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
  imagePickerContainer: {
    marginVertical: 8,
    alignItems: 'center',
  },
  imagePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 4,
    padding: 12,
    width: '100%',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  imagePickerText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginTop: 12,
    borderRadius: 4,
    resizeMode: 'cover',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    width: 350,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default NewRecipeScreen;
