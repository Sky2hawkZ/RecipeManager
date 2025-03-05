import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Icon from '@react-native-vector-icons/ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';

interface CHeaderProps<T> {
    title: string;
    hasTitle: boolean;
    navigationName?: keyof T;
    navigationData?: T[keyof T];
    backgroundColor?: string;
}


/**
 * CHeader component renders a header with an optional back button and title.
 *
 * @Template T - The type of the navigation parameter list.
 * @param {CHeaderProps<T>} props - The props for the CHeader component.
 * @param {string} props.title - The title to display in the header.
 * @param {boolean} props.hasTitle - Whether to display the title.
 * @param {keyof T} [props.navigationName] - The name of the navigation route.
 * @param {T[keyof T]} [props.navigationData] - The data to pass to the navigation route.
 * @returns {React.JSX.Element} The rendered CHeader component.
 */
const CHeader = <T extends {},>({
    title,
    navigationName,
    navigationData,
    hasTitle,
}: CHeaderProps<T>): React.JSX.Element => {
    const navigation = useNavigation<NavigationProp<T>>();
    return (
        <View style={styles.container}>
            {navigationName && navigationData && (
                <TouchableOpacity style={styles.backIcon} onPress={() => {
                    navigation.navigate(navigationName, navigationData);
                }}>
                    <Icon name="arrow-back" size={30} color="#000" style={styles.backIcon} />
                </TouchableOpacity>
            )}
            {hasTitle && (
                <Text style={styles.titleStyles}>{title}</Text>
            )}
        </View>
    );
};

export default CHeader;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: 60,
        position: 'absolute',
        top: 60,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },
    titleStyles: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 18, // TODO: Make Compatible with Android
        zIndex: 1,
    },
    backIcon: {
        position: 'absolute',
        top: 8,
        left: 15,
        zIndex: 1,
    },
});
