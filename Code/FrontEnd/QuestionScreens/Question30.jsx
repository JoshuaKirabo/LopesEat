import React, { useState, useEffect, useRef } from 'react';
import { Alert, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Animated, Keyboard } from 'react-native';
import { useAnswers } from '../AnswersToQuestions';

const Question30 = ({ navigation }) => 
  {
    const [weight, setWeight] = useState('');
    const opacityAnim = useRef(new Animated.Value(0)).current;
    const { getAnswer, saveAnswer } = useAnswers(); // Assuming useAnswers returns getAnswer and saveAnswer
    const totalQuestions = 31;
    const currentQuestion = 30;
    const MAX_WEIGHT = 999;

    const [bmi, setBmi] = useState(null);
    const [bmiDetails, setBmiStatus] = useState({ status: '', color: 'transparent', message: '' });



    useEffect(() => 
      {
        if (weight) 
          {
            calculateAndShowBMI();
          }
      }, [weight]); // Re-calculate BMI when weight changes

      const calculateAndShowBMI = () => 
      {
          const heightData = getAnswer(29); // Assuming this method exists and returns [feet, inches]
          if (!heightData || !weight) return;
      
          const [feet, inches] = heightData;
          const totalInches = feet * 12 + inches;
          const heightInMeters = totalInches * 0.0254;
          const weightInKg = weight * 0.453592;
          const bmi = weightInKg / (heightInMeters ** 2);

          setBmi(bmi.toFixed(2)); // Set the state for bmi
          setBmiStatus(getBmiStatus(bmi)); // Set the state for bmiStatus
      
          // Fade in BMI info
          Animated.timing(opacityAnim, {toValue: 1, duration: 500, useNativeDriver: true}).start();
        };

        const getBmiStatus = (bmi) => {
          if (bmi < 16) {
            return { status: 'Seriously Underweight', color: '#164aff', message: 'Its important to eat a balanced diet.' };
          } else if (bmi >= 16 && bmi < 18.5) {
            return { status: 'Underweight', color: 'blue', message: 'Consider adding more calories to your diet.' };
          } else if (bmi >= 18.5 && bmi < 25) {
            return { status: 'Normal', color: 'green', message: 'Youre on the right track, keep it up!' };
          } else if (bmi >= 25 && bmi < 30) {
            return { status: 'Overweight', color: 'yellow', message: 'A healthier diet and more exercise could help.' };
          } else if (bmi >= 30 && bmi < 35) {
            return { status: 'Obese Class 1', color: 'orange', message: 'Consider consulting with a healthcare provider.' };
          } else {
            return { status: 'Obese Class 2', color: '#F94449', message: 'Seek advice from a healthcare provider for guidance.' };
          }
        };
        






      const handleWeightChange = (text) => {
        let numericText = text.replace(/[^0-9]/g, '');
        let numericValue = parseInt(numericText, 10);
        
        if (!isNaN(numericValue) && numericValue <= MAX_WEIGHT) {
          setWeight(numericValue.toString());
        } else if (numericValue > MAX_WEIGHT) {
          // Handle the case where the value is greater than the maximum allowed weight
          setWeight(MAX_WEIGHT.toString());
          Alert.alert("Weight Limit Reached", "Please enter a valid weight.");
        } else {
          setWeight('');
        }
        if (numericText) {
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }
      };


  const handleSubmit = () => 
    {
      if (weight) 
          {
            // Using a timeout to allow state updates to complete
            setTimeout(() => 
              {
                const bmiDataArray = [bmi, weight, bmiDetails.status]; 
                saveAnswer(30, bmiDataArray); 
                navigation.navigate('Question31');  
              }, 500);

               // Perform BMI Calculation or navigate to the next screen
               navigation.navigate('Question31');
          } 
      else 
          {
              Alert.alert("Input Required", "Please enter your height before proceeding.");
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
      <Text style={styles.questionText}>What is your weight?</Text>


      <View style={styles.weightInputContainer}>
      <TextInput
        style={styles.weightInput}
        keyboardType="numeric"
        onChangeText={handleWeightChange} // Make sure to call handleWeightChange on text change
        value={weight}
        maxLength={3} // Adjust if needed for your maximum weight limit
      />
          <Text style={styles.unitText}>lbs</Text>
          {/* Add kg button if needed */}
        </View>

        {/* BMI Info Box, initially hidden and to be animated */}
        <Animated.View style={[styles.bmiInfo, { backgroundColor: bmiDetails.color, opacity: opacityAnim }]}>
          <Text style={styles.bmiText}>Your BMI is {bmi}</Text>
          <Text style={styles.bmiDescription}>This is considered {bmiDetails.status}</Text>
          <Text style={styles.bmiMessage}>{bmiDetails.message}</Text>
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
    weightInputContainer: 
      {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        justifyContent: 'center',
        padding: 20,
      },
    weightInput: {
        borderBottomWidth: 2,
        marginRight: 10,
        fontSize: 48,
        textAlign: 'center',
        color: '#000',
        width: 150,
      },
    unitText: 
      {
        fontSize: 24,
        color: '#000',
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
        //backgroundColor: '#ECF8F8',
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

export default Question30;
