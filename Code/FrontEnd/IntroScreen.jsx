import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const IntroScreen = ({ navigation }) => 
    {
    const [step, setStep] = useState(0);
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => 
        {
            // Fade in the current step
            Animated.timing(fadeAnim, {toValue: 1,duration: 1,useNativeDriver: true,}).start(() => 
                {
                    // After the text fades in, wait for a while before fading out and going to the next step
                    if (step < 4) 
                        {
                            setTimeout(() => 
                                {
                                Animated.timing(fadeAnim,
                                    {
                                        toValue: 0,
                                        duration: 3000,
                                        useNativeDriver: true,
                                    }).start(() => setStep(step + 1)); // Proceed to next step
                                }, 2); // wait for 2 seconds
                        }
                    if (step === 4) 
                        { 
                            navigation.replace('Question1'); 
                            return;
                        }
                });
        }, [step, fadeAnim]);

    const getMessage = () => 
        {
            switch (step) 
                {
                case 0:
                    return "Hello There!";
                case 1:
                    return "We're thrilled to have you join us.";
                case 2:
                    return "Let's embark on a journey towards healthy eating together.";
                case 3:
                    return "But first, we'd appreciate it if you could answer 31 questions to personalize your experience.";
                default:
                    return "Thank you!"; // Final message or navigate away from intro screen
                }
        };

    return (
        <View style={styles.container}>
        <Animated.Text style={{...styles.message, opacity: fadeAnim}}>
            {getMessage()}
        </Animated.Text>
        </View>
    );
    };

const styles = StyleSheet.create({
  container: 
    {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff', // Adjust the background color as needed
    },
  message: 
    {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333', // Adjust the text color as needed
    },
});

export default IntroScreen;
