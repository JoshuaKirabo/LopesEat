//
//  Question12.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 02/09/24
//

import React, { useState } from 'react';
import { TextInput, SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAnswers } from '../AnswersToQuestions';

const Question13 = ({ navigation }) => 
  {
    const [selectedAllergies, setSelectedAllergies] = useState({});
    const { saveAnswer } = useAnswers();
    const [searchQuery, setSearchQuery] = useState('');
    const totalQuestions = 31; 
    const currentQuestion = 13;

    const allergyOptions = [
      { id: '1', label: 'Milk 🥛', value: 'milk', description: 'dairy lactose' },
      { id: '2', label: 'Eggs 🥚', value: 'eggs', description: 'protein' },
      { id: '3', label: 'Peanuts 🥜', value: 'peanuts', description: 'nuts legume' },
      { id: '4', label: 'Tree Nuts 🌰', value: 'tree_nuts', description: 'nuts' },
      { id: '5', label: 'Soy 🌱', value: 'soy', description: 'legume' },
      { id: '6', label: 'Wheat 🌾', value: 'wheat', description: 'grain gluten' },
      { id: '7', label: 'Fish 🐟', value: 'fish', description: 'seafood protein' },
      { id: '8', label: 'Shellfish 🦐', value: 'shellfish', description: 'seafood' },
      { id: '9', label: 'Sesame Seeds 🌱', value: 'sesame_seeds', description: 'seeds' },
      { id: '10', label: 'Mustard 🟨', value: 'mustard', description: 'condiment spice' },
      { id: '11', label: 'Celery 🌿', value: 'celery', description: 'vegetable' },
      { id: '12', label: 'Sulfites 🍷', value: 'sulfites', description: 'preservative' },
      { id: '13', label: 'Lupin 🌼', value: 'lupin', description: 'legume' },
      { id: '14', label: 'Mollusks 🐚', value: 'mollusks', description: 'seafood' },
      { id: '15', label: 'Coconut 🥥', value: 'coconut', description: 'fruit nut' },
      { id: '16', label: 'Kiwi 🥝', value: 'kiwi', description: 'fruit' },
      { id: '17', label: 'Pineapple 🍍', value: 'pineapple', description: 'fruit' },
      { id: '18', label: 'Avocado 🥑', value: 'avocado', description: 'fruit' },
      { id: '19', label: 'Banana 🍌', value: 'banana', description: 'fruit' },
      { id: '20', label: 'Papaya 🧡', value: 'papaya', description: 'fruit' },
      { id: '21', label: 'Mango 🥭', value: 'mango', description: 'fruit' },
      { id: '22', label: 'Tomato 🍅', value: 'tomato', description: 'fruit vegetable' },
      { id: '23', label: 'Strawberry 🍓', value: 'strawberry', description: 'fruit' },
      { id: '24', label: 'Peach 🍑', value: 'peach', description: 'fruit' },
      { id: '25', label: 'Apricot 🍑', value: 'apricot', description: 'fruit' },
      { id: '26', label: 'Cherry 🍒', value: 'cherry', description: 'fruit' },
      { id: '27', label: 'Plum 🟣', value: 'plum', description: 'fruit' },
      { id: '28', label: 'Watermelon 🍉', value: 'watermelon', description: 'fruit' },
      { id: '29', label: 'Cucumber 🥒', value: 'cucumber', description: 'vegetable' },
      { id: '30', label: 'Corn 🌽', value: 'corn', description: 'vegetable grain' },
      { id: '31', label: 'Potato 🥔', value: 'potato', description: 'vegetable nightshade' },
      { id: '32', label: 'Carrot 🥕', value: 'carrot', description: 'vegetable' },
      { id: '33', label: 'Cabbage 🥬', value: 'cabbage', description: 'vegetable' },
      { id: '34', label: 'Spinach 🍃', value: 'spinach', description: 'vegetable leafy green' },
      { id: '35', label: 'Lettuce 🥬', value: 'lettuce', description: 'vegetable leafy green' },
      { id: '36', label: 'Radish 🔴', value: 'radish', description: 'vegetable' },
      { id: '37', label: 'Onions 🧅', value: 'onions', description: 'vegetable' },
      { id: '38', label: 'Garlic 🧄', value: 'garlic', description: 'vegetable' },
      { id: '39', label: 'Beets 🟣', value: 'beets', description: 'vegetable' },
      { id: '40', label: 'Brussels Sprouts 🌱', value: 'brussels_sprouts', description: 'vegetable' },
      { id: '41', label: 'Asparagus 🌱', value: 'asparagus', description: 'vegetable' },
      { id: '42', label: 'Peas 🫛', value: 'peas', description: 'vegetable legume' },
      { id: '43', label: 'Green Beans 🟢', value: 'green_beans', description: 'vegetable legume' },
      { id: '44', label: 'Lentils 🌱', value: 'lentils', description: 'legume' },
      { id: '45', label: 'Chickpeas 🟡', value: 'chickpeas', description: 'legume' },
      { id: '46', label: 'Pinto Beans 🟤', value: 'pinto_beans', description: 'legume' },
      { id: '47', label: 'Kidney Beans 🫘', value: 'kidney_beans', description: 'legume' },
      { id: '48', label: 'Black Beans 🖤', value: 'black_beans', description: 'legume' },
      { id: '49', label: 'Lima Beans 🟢', value: 'lima_beans', description: 'legume' },
      { id: '50', label: 'Fava Beans 🟢', value: 'fava_beans', description: 'legume' },
      { id: '51', label: 'Quinoa 🌱', value: 'quinoa', description: 'grain gluten-free' },
      { id: '52', label: 'Oats 🌾', value: 'oats', description: 'grain gluten-free' },
      { id: '53', label: 'Barley 🌾', value: 'barley', description: 'grain gluten' },
      { id: '54', label: 'Rye 🌾', value: 'rye', description: 'grain gluten' },
      { id: '55', label: 'Sorghum 🌾', value: 'sorghum', description: 'grain gluten-free' },
      { id: '56', label: 'Buckwheat 🌾', value: 'buckwheat', description: 'grain gluten-free' },
      { id: '57', label: 'Teff 🌾', value: 'teff', description: 'grain gluten-free' },
      { id: '58', label: 'Millet 🌾', value: 'millet', description: 'grain gluten-free' },
      { id: '59', label: 'Amaranth 🌾', value: 'amaranth', description: 'grain gluten-free' },
      { id: '60', label: 'Spelt 🌾', value: 'spelt', description: 'grain gluten' },
      { id: '61', label: 'None ❌', value: 'none', description: 'no allergies' },
    ];

  const handleSubmit = () => 
    {
        // Check if at least one key in the selectedAllergies object is true
        if (Object.values(selectedAllergies).some((id) => id)) 
            {
                saveAnswer(13, selectedAllergies);
                navigation.navigate('Question14'); 
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
      Are you allergic to any of these?
    </Text>

    {/* Search Bar */}
    <TextInput
      style={styles.searchBar}
      placeholder="Search allergies..."
      value={searchQuery}
      onChangeText={setSearchQuery}
    />

       {/* Instructional Text */}
       <Text style={styles.instructionText}>
        Select all foods you are allergic to, this will help us tailor your diet to your needs. If you are not allergic to any of these, then select 'None'.
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
  

export default Question13;
