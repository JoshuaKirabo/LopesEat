//
//  Question6.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 02/08/24
//

import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { useAnswers } from '../AnswersToQuestions'; 

const Question6 = ({ navigation }) => {
  const [selectedSchedule, setselectedSchedule] = useState(null);
  const [userGender, setUserGender] = useState(''); // Initialize userGender state
  const [scheduleOptions, setScheduleOptions] = useState([]); // Use state for dynamic schedule options
  const { saveAnswer } = useAnswers();
  const totalQuestions = 31;
  const currentQuestion = 6;

    // Retrieve user gender from AsyncStorage
    useEffect(() => {
      const getGender = async () => {
        const gender = await AsyncStorage.getItem('userGender');
        setUserGender(gender);
      };
  
      getGender();
    }, []);

useEffect(() => {
    if (userGender === 'Male') 
      {
        setScheduleOptions([
          { label: 'Actively Moving', value: 'active', image: require('../Images/men/active.png') },
          { label: 'Moderately Active', value: 'moderately_active', image: require('../Images/men/moderately-active.png') },
          { label: 'Not Very Active', value: 'not_very_active', image: require('../Images/men/not-active.png') },
          { label: 'Not Active at All', value: 'not_active', image: require('../Images/men/not-active.png') },
        ]);
      } 
    else if (userGender === 'Female') 
      {
        setScheduleOptions([
          // Replace the paths according to your project structure and image availability
          { label: 'Actively Moving', value: 'active', image: require('../Images/women/active.png') },
          { label: 'Moderately Active', value: 'moderately_active', image: require('../Images/women/moderately-active.png') },
          { label: 'Not Very Active', value: 'not_very_active', image: require('../Images/women/not-active.png') },
          { label: 'Not Active at All', value: 'not_active', image: require('../Images/women/not-active.png') },
        ]);
      }
  }, [userGender]); // Dependency array includes userGender


  const handleSubmit = () => 
    {
        if (selectedSchedule) 
            {
              saveAnswer(6, selectedSchedule);
              navigation.navigate('Question7'); // Replace with the actual next question route name
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
          <Text style={styles.questionText}>How active are you during the day?</Text>
    
          {/* Options */}
          {scheduleOptions.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.option, selectedSchedule === option.value ? styles.selectedOption : {}]}
              onPress={() => setselectedSchedule(option.value)}
            >
              <Image source={option.image} style={styles.image}  resizeMode='contain'/>
              <Text style={styles.optionText} numberOfLines={3}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
    
          {/* Next Button */}
          <TouchableOpacity
            style={[styles.nextButton, !selectedSchedule ? styles.disabledButton : {}]}
            onPress={handleSubmit}
            disabled={!selectedSchedule}
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
      //height: 70,
      marginBottom: 10,
      paddingHorizontal: 10,

      },
    optionText: 
      {
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
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
  

export default Question6;
