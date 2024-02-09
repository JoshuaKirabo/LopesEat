//
//  Question4.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 01/20/24
//

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Question4 = ({ navigation }) => 
{
  const [selectedExperience, setSelectedExperience] = useState(null);
  const totalQuestions = 30; 
  const currentQuestion = 4;

  const fitnessExperienceOptions = [
    { label: 'I have trouble gaining muscle or body fat 🪨', value: 'hard_gainer' },
    { label: 'I gain and lose weight without effort 🌟', value: 'effortless_change' },
    { label: 'I gain weight easily but find it hard to lose 🎲', value: 'easy_gain_hard_lose' },
  ];

  const handleSubmit = () => 
    {
      if (selectedExperience) 
        {
          navigation.navigate('Question5'); // Replace with the actual next question route name
        } 
      else 
        {
          Alert.alert("Selection Required", "Please select a fitness experience before proceeding.");
        }
    };

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
      </View>

              {/* Back Arrow and Progress Text */}
          <View style={styles.header}>

            <Text style={styles.progressNumber}>{`${currentQuestion}/${totalQuestions}`}</Text>
          </View>


         {/* Centered Content */}
        <View style={styles.content}>
            <Text style={styles.questionText}>What best describes your experience with fitness?</Text>
            {fitnessExperienceOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.option, selectedExperience === option.value ? styles.selectedOption : {}]}
                onPress={() => setSelectedExperience(option.value)}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.nextButton, !selectedExperience ? styles.disabledButton : {}]}
              onPress={handleSubmit}
              disabled={!selectedExperience}
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

  });

export default Question4;
