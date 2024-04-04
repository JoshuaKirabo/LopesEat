//
//  Question12.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 02/09/24
//

import React, { useState } from 'react';
import { TextInput, SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAnswers } from '../AnswersToQuestions';

const Question12 = ({ navigation }) => {
const [selectedDietaryRestrictions, setSelectedDietaryRestrictions] = useState({});
const { saveAnswer } = useAnswers();
const [searchQuery, setSearchQuery] = useState('');
  const totalQuestions = 31; 
  const currentQuestion = 12;

  const dietOptions = [
    { id: "1", label: "Vegetarian Diet 🥦", value: "vegetarian", description: "A diet that excludes meat and fish, but includes dairy products and eggs." },
    { id: "2", label: "Vegan Diet 🌱", value: "vegan", description: "A plant-based diet that excludes all animal products, including dairy, eggs, and honey." },
    { id: "3", label: "Pescatarian Diet 🐟", value: "pescatarian", description: "A diet that includes fish as the only source of meat, alongside vegetables, fruits, nuts, grains, and legumes." },
    { id: "4", label: "Flexitarian Diet 🥗", value: "flexitarian", description: "A flexible vegetarian diet that occasionally includes meat or fish." },
    { id: "5", label: "Ketogenic Diet 🥑", value: "ketogenic", description: "A high-fat, adequate-protein, low-carbohydrate diet that helps to burn fats better." },
    { id: "6", label: "Paleolithic Diet 🍖", value: "paleolithic", description: "A dietary plan based on foods similar to what might have been eaten during the Paleolithic era." },
    { id: "7", label: "Mediterranean Diet 🍇", value: "mediterranean", description: "A heart-healthy diet inspired by the eating habits of Greece, Southern Italy, and Spain." },
    { id: "8", label: "Whole30 Diet 🚫🍞", value: "whole30", description: "A 30-day diet that emphasizes whole foods and the elimination of sugar, alcohol, grains, legumes, soy, and dairy." },
    { id: "9", label: "Low-Carb Diet 🥩", value: "low_carb", description: "A diet that restricts carbohydrates, such as those found in sugary foods, pasta, and bread." },
    { id: "10", label: "DASH Diet 🍎", value: "dash", description: "Dietary Approaches to Stop Hypertension (DASH) diet is rich in fruits, vegetables, whole grains, and low-fat dairy foods." },
    { id: "11", label: "Intermittent Fasting ⏲️", value: "intermittent_fasting", description: "An eating pattern that cycles between periods of fasting and eating." },
    { id: "12", label: "Gluten-Free Diet 🚫🌾", value: "gluten_free", description: "A diet that strictly excludes gluten, which is a mixture of proteins found in wheat and related grains." },
    { id: "13", label: "Low-FODMAP Diet 🍏", value: "low_fodmap", description: "A diet that restricts high FODMAP foods to improve symptoms of digestive disorders." },
    { id: "14", label: "Raw Food Diet 🥑🥒", value: "raw_food", description: "A diet consisting mostly or entirely of unprocessed and uncooked foods." },
    { id: "15", label: "Zone Diet 🍽️", value: "zone", description: "A diet aimed to reduce inflammation in the body by balancing macronutrient intake." },
    { id: "16", label: "Atkins Diet 🍗", value: "atkins", description: "A low-carbohydrate diet, usually recommended for weight loss." },
    { id: "17", label: "Volumetrics Diet 🥗", value: "volumetrics", description: "Focuses on foods that are low in calories but high in volume to help you feel full." },
    { id: "18", label: "Macrobiotic Diet 🍚", value: "macrobiotic", description: "A diet that focuses on whole grains, vegetables, and beans with the goal of balancing the spiritual and physical wellness." },
    { id: "19", label: "Blood Type Diet 💉", value: "blood_type", description: "A diet that makes food choices based on your blood type." },
    { id: '20', label: 'Alkaline Diet💧', value: 'alkaline', description: 'A diet based on the idea that certain foods can affect the acidity and pH of bodily fluids.' },
    { id: 'none', label: 'None', value: 'none', description: 'No specific dietary restrictions.' },
];

  const handleSubmit = () => 
    {
      const selectedRestrictions = Object.entries(selectedDietaryRestrictions).filter(([key, value]) => value).map(([key]) => key);

      // Check if at least one key in the selectedDietaryRestrictions object is true
      if (Object.values(selectedDietaryRestrictions).some((id) => id)) 
          {
              saveAnswer(12, selectedRestrictions);
              navigation.navigate('Question13'); 
          } 
      else 
          {
            Alert.alert("Selection Required", "Please select a diet type before proceeding.");
          }
    };

    const handleSelection = (value) => 
      {
        setSelectedDietaryRestrictions((currentselectedDietaryRestrictions) => 
          {
            // Copy the current selected allergies
            const newselectedDietaryRestrictions = { ...currentselectedDietaryRestrictions };
    
            if (value === 'none') 
              {
                // If 'None' is selected, clear all other selections or unselect if already selected
                return newselectedDietaryRestrictions[value] ? {} : { [value]: true };
              } 
            else 
              {
                // Toggle the selected allergy
                newselectedDietaryRestrictions[value] = !newselectedDietaryRestrictions[value];
    
                // Make sure 'none' is not selected when other options are selected
                delete newselectedDietaryRestrictions['none'];
              }

          return newselectedDietaryRestrictions;
        });
      };

      const filteredOptions = searchQuery.length > 0? dietOptions.filter(option =>option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||option.description.toLowerCase().includes(searchQuery.toLowerCase())): dietOptions

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
            Do you have any dietary restrictions?
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
        If you follow a particular diet such as keto, vegan, gluten-free, or any other specific dietary regimen, kindly indicate it here. Your input will help us tailor our offerings to better suit your needs and preferences."
        </Text>

    {/* Options ScrollView */}
    <ScrollView style={styles.optionsScrollView} contentContainerStyle={styles.optionsContentContainer}>
      {filteredOptions.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.option, selectedDietaryRestrictions[option.value] ? styles.selectedOption : {}]}
          onPress={() => handleSelection(option.value)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* Fixed Next Button */}
    <View style={styles.nextButtonContainer}>
      <TouchableOpacity
        style={[styles.nextButton, !Object.values(selectedDietaryRestrictions).some(value => value) ? styles.disabledButton : {}]}
        onPress={handleSubmit}
        disabled={!Object.values(selectedDietaryRestrictions).some(value => value)}
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
        right: 10, 
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
      },
    content: 
      {
        flex: 1,
        alignItems: 'center',
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
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 30,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        margin: 5,
      },
    optionsContainer: 
      {
        flexDirection: 'row',  
        flexWrap: 'wrap',  
        flexGrow: 0,
        maxWidth: '90%',  
        maxHeight: 300,  
        marginHorizontal: 10,  
        alignSelf: 'stretch',  
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
        padding: 10,  
        backgroundColor: '#FDF5EE',  
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
        flexDirection: 'row',  
        flexWrap: 'wrap',  
        justifyContent: 'center',  
        alignItems: 'flex-start',  
        padding: 10,  
      },
      instructionText: 
      {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        paddingHorizontal: 20,  
        marginBottom: 10, 
      },

  });
  

export default Question12;
