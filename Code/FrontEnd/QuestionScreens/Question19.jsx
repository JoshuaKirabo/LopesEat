//
//  Question11.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 02/09/24
//

import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import axios from 'axios';
//import { useFonts, Raleway_400Regular } from '@expo-google-fonts/raleway';
import * as SplashScreen from 'expo-splash-screen';
import { useAnswers } from '../AnswersToQuestions';

const Question19 = ({ navigation }) => 
    {
        const [selectedOption, setSelectedOption] = useState(null);
        const { saveAnswer } = useAnswers();
        const [fontsLoaded] = useFonts({ Raleway_400Regular });
        const totalQuestions = 31;
        const currentQuestion = 19;

        useEffect(() => 
            {
                async function prepare() 
                    {
                    await SplashScreen.preventAutoHideAsync();
                    }
            
                prepare();
            }, []);

        useEffect(() => 
            {
                if (fontsLoaded) 
                    {
                    SplashScreen.hideAsync();
                    }
            }, [fontsLoaded]);

        const options = 
            [
                { label: 'Less than 5 hours 🥱', value: 'less-than-5-hours' },
                { label: '5 - 6 Hours 😌', value: '5-6-hours' },
                { label: '7 - 8 Hours 😴', value: '7-8-hours' },
                { label: 'More than 8 Hours 💤', value: 'more-than-8-hours' },
            ];

        const handleSubmit = async () => 
            {
                if (selectedOption) 
                {
                    try 
                    {
                        //const userId = await AsyncStorage.getItem('userId');
                        //await axios.post('http://localhost:3000/submitAnswer', {
                        //  userId,
                        // questionId: 1,
                        //  answer: selectedOption
                    // });
                      saveAnswer(19, selectedOption);
                      navigation.navigate('Question20');
                    } 
                    catch (error) 
                    {
                        console.error('Error submitting answer:', error);
                        Alert.alert("Error", "An issue occurred while submitting your answer.");
                    }
                } 
                else 
                {
                    Alert.alert("Selection Required", "Please select an option before proceeding.");
                }
            };

        if (!fontsLoaded) 
            {
                // Return a view or a loading indicator while the app is loading
                return (
                <View style={styles.loadingContainer}>
                    <Text>Loading...</Text>
                </View>
                );
            }

        return (
            <SafeAreaView style={styles.container}>

            <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${(currentQuestion / totalQuestions) * 100}%` }]} />
            </View>
            </View>

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                    <Text style={styles.backArrowText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.progressNumber}>{`${currentQuestion}/${totalQuestions}`}</Text>
                </View>


            {/* Centered Content */}
            <View style={styles.content}>
                    <Text style={styles.questionText}>How much do you sleep per night?</Text>
                {options.map((option, index) => (
                    <TouchableOpacity
                    key={index}
                    style={[styles.option, selectedOption === option.value ? styles.selectedOption : {}]}
                    onPress={() => setSelectedOption(option.value)}
                    >
                    <Text style={styles.optionText}>{option.label}</Text>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity
                    style={[styles.nextButton, !selectedOption ? styles.disabledButton : {}]}
                    onPress={handleSubmit}
                    disabled={!selectedOption}
                >
                    <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
            </SafeAreaView>
        );
    };


const styles = StyleSheet.create({
  container: 
    {
      flex: 1,
      backgroundColor: '#FDF5EE',
    },
  header: 
    {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row', 
    },
  backArrow: 
    {
      right: 170,
      color: '#522398',
    },
  backArrowText: 
    {
      fontSize: 20,
      fontWeight: 'bold',

    },
  backArrowContainer: 
    {
     // position: 'absolute',
      //left: 10, 
      //top: 30, 
    },
  progressNumber: 
    {
      position: 'absolute',
      right: 10, // Align with the right edge of the progress bar
      //top: 30, // Position under the progress bar
      fontSize: 16,
      fontWeight: 'bold',
      color: '#000',
    },
  content: 
    {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 20,
    },
  questionText: 
    {
      fontWeight: 'bold',
      fontSize: 25,
      marginBottom: 20,
      textAlign: 'center',
    },
  option: 
    {
      backgroundColor: '#f0f0f0',
      width: '80%',
      alignItems: 'center', // Center text horizontally
      justifyContent: 'center', // Center text vertically
      borderRadius: 30,
      height: 70,
      marginBottom: 10,

    },
  optionText: 
    {
      fontSize: 20,
      fontWeight: '600',
      textAlign: 'center',
      paddingHorizontal: 20,
    },
  selectedOption: 
    {
      backgroundColor: '#DFF0F1',
      borderColor: '#B2E4E6',
    },
  optionContent: 
    {
      flexDirection: 'row',
      alignItems: 'center',
    },
  image: 
    {
      width: 50,
      height: 50,
      marginRight: 10,
    },
  nextButton: 
    {
      backgroundColor: '#522398',
      padding: 15,
      width: '80%',
      alignItems: 'center',
      borderRadius: 30,
      marginTop: 20,
    },
  nextButtonText: 
    {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },
  disabledButton: 
    {
      backgroundColor: '#cccccc',
    },

  progressBar: 
    {
      height: '100%',
      backgroundColor: '#00bfa5',
    },
  progressBarContainer: 
    {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 10,
      paddingVertical: 30,
    },
  progressBarBackground: 
    {
      height: 20,
      flex: 1, // Take up all available space between arrow and text
      backgroundColor: '#e0e0e0',
      borderRadius: 10,
      marginHorizontal: 10, // Add space around the progress bar
      overflow: 'hidden',
    },
  progressBarFill: 
    {
      height: '100%',
      backgroundColor: '#522398',
      borderRadius: 10,
    },
  checkmark: 
    {
      position: 'absolute',
      right: 20,
      top: '150%',
      transform: [{ translateY: -10 }],
      fontSize: 20,
      color: '#522398',
    },
    questionText: 
      {
        fontWeight: 'bold',
        fontSize: 25,
        marginHorizontal: 20,
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 20,
      },

});


export default Question19;
