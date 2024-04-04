//
//  Question12.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 02/09/24
//

import React, { useState } from 'react';
import { TextInput, SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAnswers } from '../AnswersToQuestions';

const Question16 = ({ navigation }) => 
  {
    const [selectedAllergies, setSelectedAllergies] = useState({});
    const { saveAnswer } = useAnswers();
    const [searchQuery, setSearchQuery] = useState('');
    const totalQuestions = 31; 
    const currentQuestion = 16;

    const allergyOptions = [
      { "id": "1", "label": "Chicken🍗", "value": "chicken", "description": "Poultry meat that is widely consumed for its versatility and protein content." },
      { "id": "2", "label": "Beef🥩", "value": "beef", "description": "Meat from cattle, known for its rich flavor and various cuts like steaks and roasts." },
      { "id": "3", "label": "Pork🥓", "value": "pork", "description": "Meat from pigs, used in various cuisines and can be prepared in many forms like chops and ham." },
      { "id": "4", "label": "Turkey🦃", "value": "turkey", "description": "Poultry meat that's a staple in holiday feasts, also enjoyed year-round as a lean protein." },
      { "id": "5", "label": "Duck🦆", "value": "duck", "description": "Poultry meat with a rich, bold flavor and a higher fat content, especially valued for its skin." },
      { "id": "6", "label": "Goat🐐", "value": "goat", "description": "Meat known for its strong flavor and commonly consumed in various global cuisines." },
      { "id": "7", "label": "Fish", "value": "fish", "description": "Meat known for its strong flavor and commonly consumed in various global cuisines." },
      { "id": "8", "label": "None🚫", "value": "none", "description": "No meat preference or a vegetarian/vegan option." }
    ];

    const handleSubmit = () => 
      {
          // Check if at least one key in the selectedAllergies object is true
          if (Object.values(selectedAllergies).some((id) => id)) 
              {
                saveAnswer(16, selectedAllergies);
                navigation.navigate('Question17'); 
              } 
          else 
              {
                  Alert.alert("Selection Required", "Please select a body goal before proceeding.");
              }
      };

      const handleSelection = (value) => 
      {
          setSelectedAllergies((currentSelectedAllergies) => 
          {
            // Copy the current selected allergies
            const newSelectedAllergies = { ...currentSelectedAllergies };
      
            if (value === 'none') 
              {
                // If 'None' is selected, clear all other selections or unselect if already selected
                return newSelectedAllergies[value] ? {} : { [value]: true };
              } 
            else
              {
                // Toggle the selected allergy
                newSelectedAllergies[value] = !newSelectedAllergies[value];
        
                // Make sure 'none' is not selected when other options are selected
                delete newSelectedAllergies['none'];
              }
      
            return newSelectedAllergies;
          });
        };

      const filteredOptions = searchQuery.length > 0? allergyOptions.filter(option =>option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||option.description.toLowerCase().includes(searchQuery.toLowerCase())): allergyOptions

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

       {/* Question Text */}
       <Text style={styles.questionText}>
       Select the meats you would like to exclude from your meal plan
    </Text>

    {/* Search Bar */}
    <TextInput
      style={styles.searchBar}
      placeholder="Search meat..."
      value={searchQuery}
      onChangeText={setSearchQuery}
    />

       {/* Instructional Text */}
       <Text style={styles.instructionText}>
        Select the meats you would like to exclude from your meal plan
      </Text>

    {/* Options ScrollView */}
    <ScrollView style={styles.optionsScrollView} contentContainerStyle={styles.optionsContentContainer}>
      {filteredOptions.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.option, selectedAllergies[option.value] ? styles.selectedOption : {}]}
          onPress={() => handleSelection(option.value)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* Fixed Next Button */}
    <View style={styles.nextButtonContainer}>
      <TouchableOpacity
        style={[styles.nextButton, !Object.values(selectedAllergies).some(value => value) ? styles.disabledButton : {}]}
        onPress={handleSubmit}
        disabled={!Object.values(selectedAllergies).some(value => value)}
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
       // justifyContent: 'center',
        flexDirection: 'row', 
      },
      backArrow: 
      {
        left: 18,
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
        //justifyContent: 'center',
        paddingVertical: 20,
      },
    questionText: 
      {
        fontWeight: 'bold',
        fontSize: 25,
        marginHorizontal: 20,
        marginTop: 20,
        textAlign: 'center',
      },
    option: 
      {
        backgroundColor: '#f0f0f0',
        width: 'auto',
        alignItems: 'center', 
        //width: '80%',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 30,
        //height: 70,
        //marginBottom: 10,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        margin: 5,
      },
    optionsContainer: 
      {
        flexDirection: 'row', // Arrange items in a row
        flexWrap: 'wrap', // Allow items to wrap to the next line
        flexGrow: 0,
        maxWidth: '90%', // Limit the width of the container
        maxHeight: 300, // Adjust this value as needed
        marginHorizontal: 10, // Add horizontal margin if needed
        alignSelf: 'stretch', // Stretch to fill the width of the containe
      },
    optionText: 
      {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
      },
    optionsWrapper: 
      {
        flex: 1, 
        marginHorizontal: 20, 
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
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        borderRadius: 30
      },
    nextButtonText: 
      {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
    nextButtonContainer: 
      {
        padding: 10, // Padding inside the container
        backgroundColor: '#FDF5EE', // Same as the outer container to blend in
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
    searchBar: 
      {
        height: 40,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,
        borderRadius: 20,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FDF5EE',
      },
      optionsContentContainer: 
      {
        flexDirection: 'row', // Arrange items in a row
        flexWrap: 'wrap', // Allow items to wrap to the next line
        justifyContent: 'center', // Center items horizontally
        alignItems: 'flex-start', // Align items to the start of the cross axis
        padding: 10, // Add padding for the ScrollView content
      },
      instructionText: 
      {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        paddingHorizontal: 20, // Add padding for left and right
        marginBottom: 10, // Space before the options list starts
      },

  });
  

export default Question16;
