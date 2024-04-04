import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAnswers } from './AnswersToQuestions';
import HomeScreen from './homeScreen.jsx';

const LoadingScreen = ({ navigation }) => {

  const { submitAnswers } = useAnswers();

  useEffect(() => 
    {
      const submitAnswersAndNavigate = async () => 
        {
          try 
            {
              const success = await submitAnswers(); // Expecting a boolean return value indicating success
              if (success) 
                {
                  // If the backend confirms success, navigate to the Home screen
                  navigation.replace('Home');
                } 
              else 
                {
                  // Stay on Loading screen
                  throw new Error();
                }
            } 
          catch (error) 
            {
              console.error('Error submitting answers:', error);
              Alert.alert(
                'Error',
                'An error occurred while submitting your answers. Please try again.',
                [{ text: 'OK', onPress: () => navigation.navigate('Question31') }]
              );
            }
        };
  
      submitAnswersAndNavigate();
    }, [navigation, submitAnswers]);


  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./Animations/Creating-Meal-Plan.gif')} // Path to your local gif file
        style={styles.image}
      />
       <Text style={styles.text}>Creating your meal plan...</Text>
    </SafeAreaView>
  );
};
  


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#522398', // Set your preferred background color
  },
  image: {
    width: 150,  // Set the width of your gif
    height: 150, // Set the height of your gif
    // You might need to adjust these values depending on the dimensions of your GIF
  },
  text: {
    marginTop: 20, // Add space between the GIF and text
    fontSize: 20, // Set text size
    fontWeight: 'bold', // Make text bold
    color: '#ffffff', // Set text color
    textAlign: 'center', // Center text
  },
});

export default LoadingScreen;
