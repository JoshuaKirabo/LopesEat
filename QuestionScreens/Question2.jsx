//
//  Question2.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 01/20/24
//

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

const Question2 = ({ navigation }) =>   
  {
    const [selectedBuild, setSelectedBuild] = useState(null);
    const totalQuestions = 30; // Total number of questions
    const currentQuestion = 2; // Current question number


    const physicalBuildOptions = 
      [
        { label: 'Slender', value: 'slender', image: require('../Images/men/slender.png') },
        { label: 'Medium build', value: 'medium', image: require('../Images/men/medium-build.png') },
        { label: 'Stocky', value: 'stocky', image: require('../Images/men/stocky.png') },
        { label: 'Obese', value: 'obese', image: require('../Images/men/obese.png') },
      ];

    const handleSubmit = () => 
      {
        if (selectedBuild) 
          {
            navigation.navigate('Question3'); 
          } 
        else 
          {
            Alert.alert("Selection Required", "Please select a physical build type before proceeding.");
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
            <Text style={styles.questionText}>How would you describe your physical build?</Text>
      
            {/* Options */}
            {physicalBuildOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.option, selectedBuild === option.value ? styles.selectedOption : {}]}
                onPress={() => setSelectedBuild(option.value)}
              >
                <Image source={option.image} style={styles.image} />
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableOpacity>
            ))}
      
            {/* Next Button */}
            <TouchableOpacity
              style={[styles.nextButton, !selectedBuild ? styles.disabledButton : {}]}
              onPress={handleSubmit}
              disabled={!selectedBuild}
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
      position: 'absolute',
      left: 10, 
      top: 50, 
    },
  progressNumber: 
    {
     position: 'absolute',
    right: 10, // Align with the right edge of the progress bar
     // top: 30, // Position under the progress bar
     fontSize: 16,
     fontWeight: 'bold',
     // color: '#000',
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
      padding: 15,
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
  progressBarContainer: 
    {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 5,
      backgroundColor: '#e0e0e0',
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
      paddingVertical:30
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

});

export default Question2;
