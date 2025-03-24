import {FlatList, StyleSheet, Text, View} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import React from 'react';

interface Ingredient {
  id: number;
  ingredient: string;
  amount: number;
  measurement: string;
  inStock: boolean;
}

interface CIngredientListProps {
  ingredients: Ingredient[];
}

const CIngredientList: React.FC<CIngredientListProps> = ({ingredients}) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.content}
        showsVerticalScrollIndicator={false}
        data={ingredients}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.item}>
            <View style={styles.ingredientInfo}>
              <Text style={styles.ingredientName}>{item.ingredient}</Text>
              <View style={styles.amountContainer}>
                <Text style={styles.amount}>{item.amount}</Text>
                <Text style={styles.measurement}> {item.measurement}</Text>
              </View>
            </View>
            <BouncyCheckbox text={`${item.amount} ${item.measurement} - ${item.ingredient}`} isChecked={item.inStock} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyList}>
            <Text>No ingredients found</Text>
          </View>
        }
      />
    </View>
  );
};

export default CIngredientList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  content: {
    flex: 1,
  },
  item: {
    minHeight: 50,
    backgroundColor: '#f9f9f9',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ingredientInfo: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '500',
  },
  amountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    fontSize: 14,
    color: '#666',
  },
  measurement: {
    fontSize: 14,
    color: '#666',
  },
  statusIndicator: {
    width: 12,
    height: 12,
    marginLeft: 0,
  },
  inStock: {
    backgroundColor: '#4CAF50', // Green for in stock
  },
  outOfStock: {
    backgroundColor: '#F44336', // Red for out of stock
  },
  emptyList: {
    padding: 20,
    alignItems: 'center',
  },
});
