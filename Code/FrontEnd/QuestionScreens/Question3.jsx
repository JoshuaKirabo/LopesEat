//
//  Question3.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 01/20/24
//

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useAnswers } from '../AnswersToQuestions'; 
import AsyncStorage from '@react-native-async-storage/async-storage';

const Question3 = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [userGender, setUserGender] = useState(''); // Initialize userGender state
  const [bodyGoalOptions, setBodyGoalOptions] = useState([]); // Use state for dynamic body goal options
  const { saveAnswer } = useAnswers();
  const totalQuestions = 31;
  const currentQuestion = 3;

  // Retrieve user gender from AsyncStorage
  useEffect(() => {const getGender = async () => {const gender = await AsyncStorage.getItem('userGender');setUserGender(gender);}; getGender();}, []);

  useEffect(() => {
    if (userGender === 'Male') 
      {
        setBodyGoalOptions([
          { label: 'A few sizes smaller', value: 'smaller', image: require('../Images/men/a-few-sizes-smaller.png') },
          { label: 'Athletic', value: 'athletic', image: require('../Images/men/athletic.png') },
          { label: 'Shredded', value: 'shredded', image: require('../Images/men/shredded.png') },
          { label: 'Swole', value: 'swole', image: require('../Images/men/swole.png') },
        ]);
      } 
    else if (userGender === 'Female') 
      {
        setBodyGoalOptions([
          { label: 'Thin', value: 'thin', image: require('../Images/women/thin.png') },
          { label: 'Toned', value: 'toned', image: require('../Images/women/toned.png') },
          { label: 'Curvy', value: 'curvy', image: require('../Images/women/curvy.png') },
          { label: 'Just a few sizes smaller', value: 'few-sizes-smaller', image: require('../Images/women/just-a-few-sizes-smaller.png') },
        ]);
      }
  }, [userGender]);

  const handleSubmit = () => 
    {
        if (selectedGoal) 
            {
              saveAnswer(3, selectedGoal);
              navigation.navigate('Question4'); // Replace with the actual next question route name
            } 
        else 
            {
            Alert.alert("Selection Required", "Please select a body goal before proceeding.");
            }
    };

    return (
      <SafeAreaView style={styles.container}>
    
        {/* Progress Bar Container */}
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${(currentQuestion / totalQuestions) * 100}%` }]} />
          </View>
        </View>
    
        {/* Header for Back Arrow and Progress Text */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
            <Text style={styles.backArrowText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.progressNumber}>{`${currentQuestion}/${totalQuestions}`}</Text>
        </View>
    
        {/* Centered Content */}
        <View style={styles.content}>
          <Text style={styles.questionText}>How would you describe your goal physical build?</Text>
    
          {/* Options */}
          {bodyGoalOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, selectedGoal === option.value ? styles.selectedOption : {}]}
              onPress={() => setSelectedGoal(option.value)}
            >
              <Image source={option.image} style={styles.image} />
              <Text style={styles.optionText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
    
          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextButton, !selectedGoal ? styles.disabledButton : {}]}
            onPress={handleSubmit}
            disabled={!selectedGoal}
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
        right: 10, 
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
      flexDirection: 'row', 
      alignItems: 'center', 
      width: '80%',
      padding: 20,
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

  });
  

export default Question3;
