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
import {saveImageToDocuments} from '../utils/fs/handleImages';
import {
  validateRecipeForm,
  validateIngredientRows,
} from '../utils/validations/newRecipeFormValidation';

interface Ingredient {
  ingredient: string;
  amount: string;
  measurement: string;
  inStock: boolean;
}

interface FormErrors {
  recipeName?: string;
  recipeImage?: string;
  recipeDescription?: string;
  numberOfServings?: string;
  prepTime?: string;
  cookTime?: string;
  calories?: string;
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
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [ingredientErrors, setIngredientErrors] = useState({});

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      {ingredient: '', amount: '', measurement: 'pcs', inStock: false},
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

    // Validate ingredients first
    let ingredientsValid = true;
    let validatedIngredients = null;

    const formData = {
      recipeName,
      recipeImage,
      recipeDescription,
      numberOfServings,
      prepTime,
      cookTime,
      favorite,
      calories,
      ingredients,
    };

    // Validate the form data
    const validationResult = validateRecipeForm(formData);

    if (!validationResult.success) {
      setFormErrors(validationResult.errors || {});
    }

    if (ingredients.length > 0) {
      const ingredientValidationResult = validateIngredientRows(ingredients);
      ingredientsValid = ingredientValidationResult.success;
      if (!ingredientsValid) {
        setIngredientErrors(ingredientValidationResult);
      } else {
        validatedIngredients = ingredientValidationResult;
      }
    }

    if (!ingredientsValid) {
      return;
    } else if (!validationResult.success) {
      return;
    }

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
      setFormErrors({});
      setIngredientErrors({});

      // Use validatedIngredients if available, otherwise use ingredients
      const ingredientsToSave = validatedIngredients?.data || ingredients;

      const newIngredients = await Promise.all(
        ingredientsToSave.map(ingredient =>
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
      // Clear previous errors
      setFormErrors({});
      setIngredientErrors({});
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
        <View>
          <TextInput
            style={[styles.input, formErrors.recipeName && styles.inputError]}
            placeholder="Recipe Name"
            value={recipeName}
            onChangeText={setRecipeName}
            onFocus={() => setFormErrors({})}
          />
          {formErrors.recipeName && (
            <Text style={styles.errorText}>{formErrors.recipeName}</Text>
          )}
        </View>
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
        <View>
          <TextInput
            style={[styles.input, formErrors.numberOfServings && styles.inputError]}
            placeholder="Number of Servings"
            value={numberOfServings}
            onChangeText={setNumberOfServings}
          />
          {formErrors.numberOfServings && (
            <Text style={styles.errorText}>{formErrors.numberOfServings}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={[styles.input, formErrors.prepTime && styles.inputError]}
            placeholder="Prep Time"
            value={prepTime}
            onChangeText={setPrepTime}
          />
          {formErrors.prepTime && (
            <Text style={styles.errorText}>{formErrors.prepTime}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={[styles.input, formErrors.cookTime && styles.inputError]}
            placeholder="Cook Time"
            value={cookTime}
            onChangeText={setCookTime}
          />
          {formErrors.cookTime && (
            <Text style={styles.errorText}>{formErrors.cookTime}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={[styles.input, formErrors.calories && styles.inputError]}
            placeholder="Calories"
            value={calories}
            onChangeText={setCalories}
          />
          {formErrors.calories && (
            <Text style={styles.errorText}>{formErrors.calories}</Text>
          )}
        </View>
        <View>
          <TextInput
            style={[
              styles.input,
              formErrors.recipeDescription && styles.inputError,
              {height: 100},
            ]}
            placeholder="Cook Time"
            value={recipeDescription}
            onChangeText={setRecipeDescription}
            multiline
          />
          {formErrors.recipeDescription && (
            <Text style={styles.errorText}>{formErrors.recipeDescription}</Text>
          )}
        </View>
        <CIngredientInputRow
          onChange={setIngredients}
          ingredients={ingredients}
          errors={ingredientErrors}
        />
        <View style={styles.buttonContainer}>
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
  inputError: {
    borderColor: 'red',
    backgroundColor: '#ffcccc66',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 4,
    marginTop: -4,
    marginBottom: 8,
  },
});

export default NewRecipeScreen;
