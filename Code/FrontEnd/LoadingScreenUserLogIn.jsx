import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Image, SafeAreaView } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoadingScreenUserLogin = ({ navigation }) => 
    {

        useEffect(() => {
            const checkUserProgressAndNavigate = async () => {
                try {
                    // Retrieve the user ID stored in AsyncStorage
                    const userId = await AsyncStorage.getItem('userId');
                    if (!userId) {
                        console.error('No user ID found');
                        // If no user ID is found, navigate back to the Login screen
                        navigation.replace('Login');
                        return;
                    }
    
                    // Check if the user has completed the questionnaire
                    const response = await axios.get(`http://localhost:3000/checkIfUserHasCompletedQuestions/${userId}`);
                    // Create a delay of 3 seconds before navigating
                    setTimeout(() => {
                        if (response.data.hasCompletedQuestions) {
                            // If the questionnaire is completed, navigate to the Home screen
                            navigation.replace('Home');
                        } else {
                            // If the questionnaire is not completed, navigate to the IntroScreen within the Questions navigator
                            navigation.replace('Questions', { screen: 'IntroScreen' });
                        }
                    }, 3000); // 3 seconds delay
                } catch (error) {
                    console.error('Failed to fetch user progress:', error);
                }
            };
    
            checkUserProgressAndNavigate();
        }, [navigation]);

        return (
            <SafeAreaView style={styles.container}>
                <Image
                    source={require('./Animations/Creating-Meal-Plan.gif')} // Path to your local gif file
                    style={styles.image}
                />  
            </SafeAreaView>
        );
    };

const styles = StyleSheet.create({
  container: 
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#522398', // Set your preferred background color
    },
  text: 
    {
        marginTop: 20, 
        fontSize: 20, 
        fontWeight: 'bold', 
        color: '#ffffff', 
        textAlign: 'center', 
    },
});

export default LoadingScreenUserLogin;
