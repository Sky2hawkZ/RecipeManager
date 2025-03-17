import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, GestureResponderEvent } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Using Expo icons for the pencil icon

interface CustomButtonProps {
    label: string;
    onPress: (event: GestureResponderEvent) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ label = 'Label', onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.content}>
        <MaterialIcons name="add-circle" size={20} color="#4B3F6B" style={styles.icon} />
        <Text style={styles.label}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EDE4F2', // Light purple background
    borderRadius: 16, // Rounded corners
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignSelf: 'center', // Centers the button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4, // Shadow for Android
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 6, // Space between icon and label
  },
  label: {
    fontSize: 14,
    color: '#4B3F6B', // Dark purple text
    fontWeight: '600',
  },
});

export default CustomButton;
