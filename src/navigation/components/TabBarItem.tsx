import React from 'react';
import { BottomTabNavigationEventMap, BottomTabNavigationOptions as OriginalBottomTabNavigationOptions, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { PlatformPressable, Text } from '@react-navigation/elements';
import { Descriptor, NavigationHelpers, ParamListBase, RouteProp, TabNavigationState, useLinkBuilder, useTheme } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/ionicons';



// Extend BottomTabNavigationOptions to include iconName
interface BottomTabNavigationOptions extends OriginalBottomTabNavigationOptions {
    iconName?: string;
}

// Define a new custom interface based on BottomTabBarProps that adds route and index
export type BottomTabDescriptor = Descriptor<
    BottomTabNavigationOptions,
    BottomTabNavigationProp<ParamListBase>,
    RouteProp<ParamListBase>
>;

export type BottomTabDescriptorMap = Record<string, BottomTabDescriptor>;
interface CustomBottomTabBarProps {
    state: TabNavigationState<ParamListBase>;
    descriptors: BottomTabDescriptorMap;
    navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
    route: any; // Adjust the type as needed
    index: number;
}

export const TabBarItem = ({ route, index, state, descriptors, navigation }: CustomBottomTabBarProps) => {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();
    const { options } = descriptors[route.key];
    const label =
        typeof options.tabBarLabel === 'string'
            ? options.tabBarLabel
            : options.title !== undefined
                ? options.title
                : route.name;

    const isFocused = state.index === index;

    const onPress = () => {
        const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
        }
    };

    const onLongPress = () => {
        navigation.emit({
            type: 'tabLongPress',
            target: route.key,
        });
    };

    const renderIcon = (iconName: string | undefined, size: number, color: string) => {
        switch (iconName) {
            case 'book-outline':
                return <Icon name={'book-outline'} size={size} color={color} />;
            case 'heart-outline':
                return <Icon name={'heart-outline'} size={size} color={color} />;
            // Add other cases as needed
            default:
                return <Icon name={'home-outline'} size={size} color={color} />;
        }
    };

    return (
        <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ alignSelf: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
            {renderIcon(options.iconName, 20, isFocused ? colors.primary : colors.text)}
            <Text style={{ color: isFocused ? colors.primary : colors.text }}>
                {label}
            </Text>
        </PlatformPressable>
    );
};
