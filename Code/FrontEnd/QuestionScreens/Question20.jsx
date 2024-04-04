import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useAnswers } from '../AnswersToQuestions';

const Question20 = ({ navigation }) => 
{
  const { saveAnswer } = useAnswers();
  const [glasses, setGlasses] = useState(0);
  const [ounces, setOunces] = useState(32); 
  const [isValid, setIsValid] = useState(false);
  const totalQuestions = 31;
  const currentQuestion = 20;
  const MAX_OUNCES = 135; // The maximum number of ounces recommended to take in one day

  const handleIncrement = () => 
    {
      setGlasses(prevGlasses => 
          {
            const newGlasses = prevGlasses + 1;
            setOunces(newGlasses * 16); // Keep ounces in sync with glasses
            return newGlasses;
          });
    };

const handleDecrement = () => 
  {
      setGlasses(prevGlasses => 
        {
          const newGlasses = prevGlasses > 0 ? prevGlasses - 1 : 0;
          setOunces(newGlasses * 16); // Keep ounces in sync with glasses
          return newGlasses;
        });
  };

  const handleChangeText = (text) => 
    {
      // Parse the text input to a number
      const newValue = parseInt(text, 10);

      // Check if the number is valid and greater than or equal to 0
      const isValidInput = !_isNaN(newValue) && newValue >= 0;
      setIsValid(isValidInput); // Update the validity state

      // If the input is valid, update the state
      if (isValidInput) 
        {
          setGlasses(newValue);
          setOunces(newValue * 16); // Assuming 1 glass = 16 oz
        }
    };

    const handleChangeOunces = (text) => {
      // Handle the case where the input field is emptied
      if (text === '') {
        setOunces(0); // Set ounces to 0 or any default value you prefer
        setGlasses(0); // Set glasses to 0 or synchronize it accordingly
        setIsValid(false); // Update validity state to false as the field is empty
        return; // Exit the function early
      }
    
      // Continue with the existing logic for non-empty inputs
      let newOunces = parseInt(text, 10);
    
      if (!isNaN(newOunces)) {
        newOunces = Math.min(newOunces, MAX_OUNCES); // Ensure the value does not exceed the maximum
        setOunces(newOunces);
        setGlasses(Math.ceil(newOunces / 16)); // Update glasses based on the new ounces value
        setIsValid(true); // Since the input is not empty and is a valid number, set isValid to true
      }
    };

    const handleSubmit = async () => 
      {
          if (glasses>0) 
            {
                try 
                  {
                      //const userId = await AsyncStorage.getItem('userId');
                      //await axios.post('http://localhost:3000/submitAnswer', {
                      //  userId,
                      // questionId: 1,
                      //  answer: selectedOption
                  // });
                  const waterIntakeArray = [glasses, ounces];
                  saveAnswer(20, waterIntakeArray);
                  navigation.navigate('Question21');
                  } 
                catch (error) 
                  {
                      console.error('Error submitting answer:', error);
                      Alert.alert("Error", "An issue occurred while submitting your answer.");
                  }
            } 
          else 
            {
                Alert.alert("Selection Required", "Please select an option before proceeding.");
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
        <Text style={styles.progressNumber}>{`${currentQuestion}/${totalQuestions}`}</Text>
    </View>




            {/* Centered Content */}
            <View style={styles.content}>
        <Text style={styles.questionText}>How many glasses of water do you take in a day?</Text>

        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={handleDecrement} style={styles.button}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            onChangeText={handleChangeOunces} // Call the new handler function
            value={ounces.toString()}
            keyboardType="numeric"
          />

          <TouchableOpacity onPress={handleIncrement} style={styles.button}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.infoText}>
          {glasses} glasses ({ounces} oz)
        </Text>

        <TouchableOpacity
                style={styles.nextButton}
                onPress={handleSubmit}
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
    counterContainer: 
      {
        flexDirection: 'row', // Arrange items in a row
        alignItems: 'center', // Center items vertically
        justifyContent: 'center', // Center items horizontally
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
      questionText: 
        {
          fontWeight: 'bold',
          fontSize: 25,
          marginHorizontal: 20,
          marginTop: 20,
          textAlign: 'center',
          marginBottom: 20,
        },
    button: 
        {
            backgroundColor: '#522398',
            padding: 10,
            margin: 10,
            borderRadius: 50,
            
        },
    buttonText: 
        {
            fontSize: 24,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    input: 
        {
            borderWidth: 1,
            borderRadius: 30,
            borderColor: '#ddd',
            padding: 10,
            margin: 10,
            width: 60,
            textAlign: 'center',
            backgroundColor: 'white',
        },
    infoText: 
        {
            fontSize: 18,
            fontWeight:'bold',
            margin: 10,
        },

  });
  

export default Question20;
