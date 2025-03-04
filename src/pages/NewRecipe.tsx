import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RecipeStackParamList } from '../hooks/useAppNavigation';

const NewRecipeScreen = () => {
    const navigation = useNavigation<NavigationProp<RecipeStackParamList>>();
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIcon} onPress={() => {
                navigation.navigate('RecipeList');
            }}>
                <Icon name="arrow-back" size={30} color="#000" style={styles.backIcon} />
            </TouchableOpacity>
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
