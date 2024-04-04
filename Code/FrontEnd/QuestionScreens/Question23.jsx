import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAnswers } from '../AnswersToQuestions';

const Question23 = ({ navigation }) => 
{
  const [selectedValue, setSelectedValue] = useState(null);
  const { saveAnswer } = useAnswers();
  const totalQuestions = 31;
  const currentQuestion = 23;

  const handleSelect = (value) => 
    {
      setSelectedValue(value);
    };

  const handleSubmit = () => 
    {
      if (selectedValue !== null) 
        {
          saveAnswer(23, selectedValue);
          navigation.navigate('Question24'); 
        }
      else
        {
          alert('Please select an option.');
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


      {/* Question */}
      <View style={styles.content}>
        <Text style={styles.questionText}>
        I only manage to eat healthy and exercise for a couple of weeks before returning to my old habits
        </Text>

        {/* Likert Scale Options */}
        <View style={styles.optionsContainer}>
          {Array.from({ length: 5 }, (_, i) => (
            <TouchableOpacity
              key={i + 1}
              style={[
                styles.option,
                selectedValue === i + 1 ? styles.selectedOption : {}
              ]}
              onPress={() => handleSelect(i + 1)}
            >
              <Text style={styles.optionText}>{i + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Next Button */}
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleSubmit}
        >
          <Text style={styles.nextButtonText}>Next Step</Text>
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
    questionText: 
      {
        fontWeight: 'bold',
        fontSize: 25,
        marginBottom: 20,
        textAlign: 'center',
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
    content: 
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#FDF5EE', // Your background color
      },
    questionText: 
      {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
      },
     optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  option: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    
  },
  optionText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },

  nextButton: {
    backgroundColor: '#522398', // Your button color
    padding: 15,
    borderRadius: 30,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Question23;
