import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

interface Ingredient {
  ingredient: string;
  amount: string;
  measurement: string;
  inStock?: boolean;
}

interface CIngredientInputRowProps {
  ingredients: Ingredient[];
  onChange: (ingredients: Ingredient[]) => void;
}

const CIngredientInputRow: React.FC<CIngredientInputRowProps> = ({
  ingredients,
  onChange,
}) => {

  const handleIngredientChange = (
    index: number,
    field: string,
    value: string,
  ) => {
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index ? {...ingredient, [field]: value} : ingredient,
    );
    onChange(newIngredients);
  };

  const dropDownData = [
    {label: 'pcs', value: 'pcs'},
    {label: 'krm', value: 'krm'},
    {label: 'tsp', value: 'tsp'},
    {label: 'tbsp', value: 'tbsp'},
    {label: 'ml', value: 'ml'},
    {label: 'cl', value: 'cl'},
    {label: 'dl', value: 'dl'},
  ];

  return (
    <View style={styles.container}>
      {ingredients.map((ingredient, index) => (
        <View
          key={index}
          style={styles.row}>
          <View style={styles.rowContainer}>
            <Text>{index + 1}: </Text>
            <TextInput
              style={styles.nameInput}
              placeholder="Ingredient"
              value={ingredient.ingredient}
              onChangeText={text =>
                handleIngredientChange(index, 'ingredient', text)
              }
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
            <Dropdown
              style={{width: '20%'}}
              onChange={item => {
                handleIngredientChange(index, 'measurement', item.value);
              }}
              placeholder="pcs"
              data={dropDownData}
              labelField={'label'}
              valueField={'value'}
              value={ingredient.measurement}
            />
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 60,
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
  checkBoxInput: {},
});

export default CIngredientInputRow;
