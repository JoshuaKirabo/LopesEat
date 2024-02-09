//
//  Question3.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 01/20/24
//

import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';

const Question10 = ({ navigation }) => {
const [selectedPain, setSelectedPain] = useState({});
  const totalQuestions = 34; // Adjust if the total number of questions changes
  const currentQuestion = 10;

  const bodyPainOptions = 
    [
        { label: 'Sensitive Back', value: 'back', image: require('../Images/men/sensitive-back.png') },
        { label: 'Sensitive Knees', value: 'knees', image: require('../Images/men/sensitive-knees.png') },
        { label: 'Neither', value: 'neither', image: require('../Images/men/no-knee-or-back-pain.png') },
    ];

  const handleSubmit = () => 
    {
        // Check if at least one key in the selectedPain object is true
        if (Object.values(selectedPain).some((value) => value)) 
            {
                navigation.navigate('Question11'); 
            } 
        else 
            {
                Alert.alert("Selection Required", "Please select a body goal before proceeding.");
            }
    };

  const handleSelection = (value) => 
    {
        setSelectedPain((currentSelectedPain) => 
            {
                const newSelectedPain = { ...currentSelectedPain };

                if (value === 'neither') 
                    {
                        // If 'Neither' is selected, clear all other selections
                        return { 'neither': !newSelectedPain['neither'] };
                    } 
                else 
                    {
                        // Toggle the selected option
                        newSelectedPain[value] = !newSelectedPain[value];

                        // Make sure 'neither' is not selected when other options are selected
                        delete newSelectedPain['neither'];
                    }

                return newSelectedPain;
        });
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
          <Text style={styles.questionText}>Do you struggle with any of the following?</Text>
    
          {/* Options */}
          {bodyPainOptions.map((option, index) => (
  <TouchableOpacity
    key={index}
    style={[styles.option, selectedPain[option.value] ? styles.selectedOption : {}]}
    onPress={() => handleSelection(option.value)}
  >
    <Image source={option.image} style={styles.image} resizeMode='contain' />
    <Text style={styles.optionText}>{option.label}</Text>
  </TouchableOpacity>
))}

    
          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextButton, !selectedPain ? styles.disabledButton : {}]}
            onPress={handleSubmit}
            disabled={!selectedPain}
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
  

export default Question10;
