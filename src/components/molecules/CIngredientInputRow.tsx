import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  ScrollView,
  Text,
} from 'react-native';

interface Ingredient {
  ingredient: string;
  amount: string;
  measurement: string;
  inStock?: string;
}

const CIngredientInputRow = ({onChange}) => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    {ingredient: '', amount: '', measurement: ''},
  ]);

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      {ingredient: '', amount: '', measurement: ''},
    ]);
  };

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index ? {...ingredient, [field]: value} : ingredient,
    );
    setIngredients(newIngredients);
    onChange(newIngredients);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {ingredients.map((ingredient, index) => (
        <View
          key={index}
          style={styles.row}>
          <View style={styles.rowContainer}>
            <Text>{index + 1}: </Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Name"
              value={ingredient.ingredient}
              onChangeText={text => handleIngredientChange(index, 'name', text)}
            />
            <TextInput
              style={styles.amountInput}
              placeholder="Amount"
              value={ingredient.amount}
              onChangeText={text =>
                handleIngredientChange(index, 'amount', text)
              }
              keyboardType="numeric"
            />
            <TextInput
              style={styles.volumeInput}
              placeholder="Volume"
              value={ingredient.measurement}
              onChangeText={text =>
                handleIngredientChange(index, 'volume', text)
              }
              keyboardType="numeric"
            />
          </View>
        </View>
      ))}
      <Button
        title="Add Ingredient"
        onPress={handleAddIngredient}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    // backgroundColor: 'red',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  rowContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 0.5,
    padding: 5,
  },
  nameInput: {
    width: '50%',
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    borderRadius: 4,
  },
  volumeInput: {
    flex: 1,
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    borderRadius: 4,
  },
  amountInput: {
    flex: 1,
    padding: 8,
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    borderRadius: 4,
  },
  checkBoxInput: {

  },
});

export default CIngredientInputRow;
