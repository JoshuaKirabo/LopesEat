import React, { useState, useRef } from 'react';
import { Alert, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Animated, Keyboard } from 'react-native';
import { useAnswers } from '../AnswersToQuestions';

const Question29 = ({ navigation }) => 
  {
    const [heightFeet, setHeightFeet] = useState('');
    const [heightInches, setHeightInches] = useState('');
    const opacityAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const { saveAnswer } = useAnswers();

    const totalQuestions = 31; 
    const currentQuestion = 29;

  const showBMIInfo = () => 
    {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(opacityAnim, {toValue: 1,duration: 500,useNativeDriver: true, }).start();
    };

  const handleHeightFeetChange = (text) => 
    {
      const numericText = text.replace(/[^0-9]/g, '');
      setHeightFeet(numericText);
      showBMIInfo();
    };
  
    const handleHeightInchesChange = (text) => 
    {
      const numericText = text.replace(/[^0-9]/g, '');
      let numericValue = parseInt(numericText, 10);
    
      // Check if numericValue is a number and not greater than 11
      if (!isNaN(numericValue)) 
        {
          numericValue = Math.min(numericValue, 11); // Ensure value does not exceed 11
          setHeightInches(numericValue.toString());
        } 
      else 
        {
          // If numericValue is not a number, reset to empty string
          setHeightInches('');
        }
      
      showBMIInfo();
    };
    

  const handleSubmit = () => 
    {
        const feet = parseInt(heightFeet, 10);
        const inches = parseInt(heightInches, 10);
      
        // Check if feet and inches are valid numbers and inches do not exceed 11
        if (!isNaN(feet) && !isNaN(inches) && inches <= 11) 
          {
            // Proceed with valid input
            const heightArray = [feet, inches];

            // Assuming saveAnswer can handle an array
            saveAnswer(29, heightArray);
            navigation.navigate('Question30');
          } 
        else
          {
            // Handle invalid input
            Alert.alert("Invalid Input", "Please enter a valid height. Note: Inches should be between 0 and 11.");
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


      
      {/* Question Text */}
      <Text style={styles.questionText}>How tall are you?</Text>


      {/* Height Input Section */}
<View style={styles.inputSection}>
  <TextInput
    style={styles.input}
    placeholder="ft"
    keyboardType="numeric"
    onChangeText={handleHeightFeetChange}
    value={heightFeet}
    maxLength={1} // For feet, typically a single digit is enough
  />
  <Text style={styles.unitText}>ft</Text>
  <TextInput
    style={styles.input}
    placeholder="in"
    keyboardType="numeric"
    onChangeText={handleHeightInchesChange}
    value={heightInches}
    maxLength={2} // Inches can be two digits
  />
  <Text style={styles.unitText}>in</Text>
</View>

      {/* BMI Info Box */}
      <Animated.View style={[styles.bmiInfo, { opacity: opacityAnim }]}>
        <Text style={styles.bmiText}>🔥Calculating your BMI</Text>
        <Text style={styles.bmiDescription}>
          Body mass index (BMI) is a metric of body fat percentage commonly used to estimate risk levels of potential health problems.
        </Text>
      </Animated.View>

      {/* Next Button */}
      <View style={styles.fixedFooter}>
        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
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
        flexGrow: 1,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'center', 
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
        borderRadius: 30,
        marginTop: 20,
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
      inputSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
      },
      input: {
        borderBottomWidth: 2,
        borderColor: '#000',
        marginHorizontal: 10,
        textAlign: 'center',
        fontSize: 22,
        width: 60,
      },
      unitText: {
        fontSize: 22,
      },
      bmiInfo: {
        marginTop: 20,
        marginHorizontal: 40,
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#ECF8F8',
        alignItems: 'center',
      },
      bmiText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00bfa5',
      },
      bmiDescription: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
        marginTop: 10,
      },
      fixedFooter: {
        padding: 20, // Add padding if needed
        backgroundColor: '#FDF5EE', // Match the background color of the container
      },
});

export default Question29;
