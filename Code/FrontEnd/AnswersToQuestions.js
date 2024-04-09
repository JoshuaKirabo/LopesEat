import React, { useMemo, createContext, useContext, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AnswersContext = createContext();

export const useAnswers = () => useContext(AnswersContext);

export const AnswersProvider = ({ children }) => 
    {
        const [answers, setAnswers] = useState([]);

        const saveAnswer = (questionNumber, answer) => 
            {
                setAnswers((currentAnswers) => 
                    {
                        const index = currentAnswers.findIndex(item => item.questionNumber === questionNumber);
                        
                        if (index !== -1) 
                            {
                                // Question already has an answer, update it
                                const updatedAnswers = [...currentAnswers];
                                updatedAnswers[index] = { ...updatedAnswers[index], answer };
                                return updatedAnswers;
                            } 
                        else 
                            {
                                // New answer for a question
                                return [...currentAnswers, { questionNumber, answer }];
                            }
                    });
            };
        
        const getAnswer = (questionNumber) => 
            {
                const answerObject = answers.find(item => item.questionNumber === questionNumber);
                return answerObject ? answerObject.answer : null;
            };

        const submitAnswers = async () => 
            {
                const userId = await AsyncStorage.getItem('userId'); // Assuming user ID is stored in AsyncStorage
                //const answers = getAnswers(); // Assuming you have a method to retrieve all answers stored in the context
                
                try 
                    {
                       // Retrieve the userId from AsyncStorage or similar storage solution
                       const userId = await AsyncStorage.getItem('userId');

                        // Use Axios to post the data, including userId if required
                        const response = await axios.post('http://172.25.74.19:3000/submitAnswers', {userId, answers});
                        return response.data.success;

                        // Handle successful submission here
                        console.log('Submission successful', response.data);
                        // Navigate to a success page or show a message, etc.
                        console.log('Submission successful', data);
                    }
                catch (error) 
                    {
                        console.error('Error submitting answers:', error);
                    }
            };

        const getNextQuestionNumber = () => 
            {
                const highestAnswered = answers.reduce((max, answer) => Math.max(max, answer.questionNumber), 0);
                return highestAnswered + 1; // Assuming next question number is the highest + 1
            };
        
        const value = useMemo(() => (
            {
                answers,
                saveAnswer,
                getAnswer,
                submitAnswers,
                getNextQuestionNumber, 
            }), [answers]);
        

        return (
            <AnswersContext.Provider value={{ answers, saveAnswer, getAnswer, submitAnswers }}>
                {children}
            </AnswersContext.Provider>
        );
    };
