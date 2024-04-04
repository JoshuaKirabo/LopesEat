//
//  Question18.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 02/08/24
//

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAnswers } from '../AnswersToQuestions';

const Question18 = ({ navigation }) => 
{
  const [selectedGoal, setEnergyLevels] = useState(null);
  const [userGender, setUserGender] = useState('');
  const [energyLevelOptions, setEnergyLevelOptions] = useState([]);
  const { saveAnswer } = useAnswers();
  const totalQuestions = 31;
  const currentQuestion = 18;

  useEffect(() => {
    const getGenderAndSetOptions = async () => {
      const gender = await AsyncStorage.getItem('userGender');
      setUserGender(gender);

      const options = gender === 'Female' ? [
        // Assuming you have corresponding images for females in your project
        { label: 'My energy levels do not fluctuate', value: 'yes', image: require('../Images/women/energy-levels-do-not-flucturate.png') },
        { label: 'I drag before meals', value: 'drag_before_meals', image: require('../Images/women/drag-before-meals.png') },
        { label: 'I feel sleepy after lunch.', value: 'sleepy_after_lunch', image: require('../Images/sleepy-after-lunch.png') },
      ] : [
        { label: 'My energy levels do not flucturate', value: 'yes', image: require('../Images/men/energy-levels-do-not-flucturate.png') },
        { label: 'I drag before meals', value: 'drag_before_meals', image: require('../Images/men/drag-before-meals.png') },
        { label: 'I feel sleepy after lunch.', value: 'sleepy_after_lunch', image: require('../Images/sleepy-after-lunch.png') },
      ];

      setEnergyLevelOptions(options);
    };

    getGenderAndSetOptions();
  }, []);

  const handleSubmit = () => 
    {
        if (selectedGoal) 
            {
              saveAnswer(18, selectedGoal);
              navigation.navigate('Question19'); // Replace with the actual next question route name
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
          <Text style={styles.questionText}>Are you able to maintain your energy during the day?</Text>
    
          {/* Options */}
          {energyLevelOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, selectedGoal === option.value ? styles.selectedOption : {}]}
              onPress={() => setEnergyLevels(option.value)}
            >
              <Image source={option.image} style={styles.image}  resizeMode='contain'/>
              <Text style={styles.optionText} numberOfLines={3}>
                {option.label}
              </Text>
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
        marginHorizontal: 20,
        marginTop: 20,
        textAlign: 'center',
        marginBottom: 20,
      },
    option: 
      {
        backgroundColor: '#f0f0f0',
      flexDirection: 'row', 
      alignItems: 'center', 
      width: '80%',
      padding: 20,
      borderRadius: 30,
      //height: 70,
      marginBottom: 10,
      paddingHorizontal: 10,

      },
    optionText: 
      {
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'left',
        paddingHorizontal: 20,
        flexShrink: 1,
        maxWidth: '100%',
        flexWrap: 'wrap',
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
        marginRight: 5,
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
        flex: 1, 
        backgroundColor: '#e0e0e0',
        borderRadius: 10,
        marginHorizontal: 10, 
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
  

export default Question18;
