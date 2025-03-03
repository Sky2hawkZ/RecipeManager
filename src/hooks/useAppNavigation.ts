// useAppNavitgation.ts
import { NavigationProp, useNavigation } from '@react-navigation/native';

// Define the type for your navigation stack
export type RootStackParamList = {
    Home: undefined; // Undefined if the screen does not take any params
    Details: undefined; // Undefined if the screen does not take any params
};

export const useAppNavigation = useNavigation<NavigationProp<RootStackParamList>>;
