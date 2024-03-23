import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 


const ProfileScreen = () => {
    const navigation = useNavigation();

    const handleLogout = async () => {
        try 
            {
                const userId = await AsyncStorage.getItem('userId');

                // Call the logout endpoint
                await axios.post('http://localhost:3000/logout', { userId });

                // Remove the user's session data from storage
                await AsyncStorage.removeItem('userId'); 

                // Reset the navigation stack and navigate to the Welcome screen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Welcome' }],
                });
            } 
        catch (error) 
            {
                console.error('Logout error:', error);
            }
    };

    return (
        <View style={styles.container}>
            <Text>User Profile</Text>
            {/* Add more profile details here */}

            <Button 
                title="Logout" 
                onPress={handleLogout} 
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    // ... other styles ...
});

export default ProfileScreen;