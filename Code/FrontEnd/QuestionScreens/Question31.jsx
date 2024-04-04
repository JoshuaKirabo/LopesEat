import React, { useEffect, useState, useRef } from 'react';
import { Alert, SafeAreaView, View, Text, TouchableOpacity, StyleSheet, TextInput, Animated, Keyboard } from 'react-native';
import { useAnswers } from '../AnswersToQuestions';

const Question31 = ({ navigation }) => 
  {
    const [goalWeight, setGoalWeight] = useState('');
    const opacityAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0
    const { getAnswer, saveAnswer } = useAnswers();

    const currentWeightArray = getAnswer(30);
    const currentWeight = currentWeightArray ? currentWeightArray[1] : null; // Because weight is at the [1] index of the Question30 array
    const healthyWeightLossPerWeek = 1; 

    const [feedback, setFeedback] = useState({ message: '', color: 'transparent', minWeight: 0, maxWeight: 0 });



    const totalQuestions = 31; 
    const currentQuestion = 31;

    useEffect(() => {if (goalWeight) {showBMIInfo();}}, [goalWeight, currentWeight]);

    useEffect(() => {if (goalWeight) showGoalWeightFeedback();}, [goalWeight]);

    const showGoalWeightFeedback = () => 
      {
        Animated.timing(opacityAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
        // You might calculate the BMI and determine the feedback here
      };
    
      const calculateHealthyWeightRange = () => {
        const heightData = getAnswer(29); // Retrieve height data
        
        if (!heightData || heightData.length !== 2) {
          // Handle error appropriately
          return { minWeight: 0, maxWeight: 0 };
        }
      
        const [feet, inches] = heightData;
        const heightInMeters = feet * 0.3048 + inches * 0.0254;
      
        const minWeightKg = 18.5 * (heightInMeters ** 2);
        const maxWeightKg = 24.9 * (heightInMeters ** 2);
      
        // Convert kilograms to pounds and round to nearest whole number
        const minWeightLbs = Math.round(minWeightKg * 2.20462);
        const maxWeightLbs = Math.round(maxWeightKg * 2.20462);
      
        return { minWeight: minWeightLbs, maxWeight: maxWeightLbs };
      };
      

      const updateFeedbackBasedOnGoalWeight = (goalWeight) => {
        const { minWeight, maxWeight } = calculateHealthyWeightRange();
        
        let message = '';
        let color = 'green'; // Default to a positive color
        
        if (goalWeight < minWeight) {
            message = `This goal weight is too low. Consider setting a goal between ${minWeight} lbs and ${maxWeight} lbs.`;
            color = 'red';
        } else if (goalWeight > maxWeight) {
            message = `For a healthy BMI, Consider setting a goal between ${minWeight} lbs and ${maxWeight} lbs.`;
            color = 'orange';
        } else {
            message = "Perfect! This goal weight is within the recommended range.";
            color = 'green';
        }
        
        setFeedback({ message, color });
        
        // Trigger the fade-in animation
        Animated.timing(opacityAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
    };
    

      const handleGoalWeightChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, '');
        const numericGoalWeight = parseInt(numericText, 10);
        setGoalWeight(numericText);
        
        // Immediately show feedback as user types
        if (numericText) {
            const numericGoalWeight = parseFloat(numericText);
            updateFeedbackBasedOnGoalWeight(numericGoalWeight);
        } else {
            // Hide feedback if input is cleared
            setFeedback({ message: '', color: 'transparent' });
        }
    };
    

    const showBMIInfo = () => {Animated.timing(opacityAnim, {toValue: 1,duration: 500,useNativeDriver: true,}).start();};

    

      const handleGoalWeightCheck = () => {
        const numericGoalWeight = parseFloat(goalWeight);
        // Assuming minHealthyWeightLbs and maxHealthyWeightLbs have been calculated based on user's height
        if (numericGoalWeight > maxHealthyWeightLbs) {
          Alert.alert(
            "Are you sure?",
            `Consider aiming for a goal weight between ${minHealthyWeightLbs} lbs and ${maxHealthyWeightLbs} lbs for a healthy BMI. Do you want to proceed with ${numericGoalWeight} lbs as your goal weight?`,
            [
              { text: "Revise Goal", style: "cancel" },
              { text: "Proceed", onPress: () => proceedWithSubmit() }
            ]
          );
        } else if (numericGoalWeight < minHealthyWeightLbs) {
          Alert.alert("Goal Weight Too Low", "This goal weight is too low and could lead to unhealthy weight loss. Please choose a goal weight within the healthy range.");
        } else {
          // If the goal weight is within the range, or there are no issues, proceed with the original submit logic
          proceedWithSubmit();
        }
      };

      const handleSubmit = () => {
        const { minWeight, maxWeight } = calculateHealthyWeightRange();
        const numericGoalWeight = parseFloat(goalWeight);
        if (numericGoalWeight < minWeight) {
            Alert.alert("Goal Weight Too Low", "This goal weight is too low for your height. Please choose a higher goal weight.");
            return;
        }
        if (numericGoalWeight > maxWeight) {
            Alert.alert(
                "Goal Weight High",
                "Your goal weight is above the recommended range based on your height. Consider setting a lower goal weight for better health.",
                [{ text: "OK" }]
            );
            return; // Depending on your app's flow, you might still allow submission here
        }
        // Proceed with saving the goal weight
        saveAnswer(31, goalWeight);
        navigation.navigate('LoadingScreen');
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
      <Text style={styles.questionText}>What is your goal weight?</Text>


      {/* Weight Input Section */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          onChangeText={handleGoalWeightChange}
          value={goalWeight}
          maxLength={4}
        />
        <Text style={styles.unitText}>lbs</Text>
      </View>

      <Animated.View style={[styles.feedbackContainer, { opacity: opacityAnim }]}>
    <Text style={{ color: feedback.color }}>{feedback.message}</Text>
</Animated.View>


      {/* Next Button */}
      <View style={styles.fixedFooter}>
        <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
          <Text style={styles.nextButtonText}>Generate Meal Plan</Text>
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
        right: 10, 
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
        padding: 10, 
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
        flexDirection: 'row', 
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
        borderBottomWidth: 5,
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

      feedbackContainer: {
        marginTop: 20,
        padding: 10,
        paddingRight: 50,
        paddingLeft: 50,
        borderRadius: 5,
        // Set a background color or keep it transparent based on your design
        backgroundColor: '#f8f8f8',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
    },
    
});

export default Question31;
