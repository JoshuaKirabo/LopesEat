// loginScreen.jsx

import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ImageBackground, Image, SafeAreaView, TouchableOpacity, View, Text, TextInput, Button, StyleSheet, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const logo = require('./Images/GCU-Transparent-Logo.png');
    const backgroundImage = require('./Images/Sign-In-Background.png');

    const checkUserQuestionnaireCompletion = async (userId) => 
        {
            try 
                {
                    const response = await axios.get(`http://localhost:3000/checkIfUserHasCompletedQuestions/${userId}`);
                    return response.data.hasCompletedQuestions;
                } 
            catch (error) 
                {
                    console.error('Error checking questionnaire completion:', error);
                    return false; // Default to false if there's an error
                }
        };


    const handleLogin = async () => {
        try 
            {
                // Connecting to the Node Server
                const response = await axios.post('http://localhost:3000/login',
                
                {
                    email: email,
                    password: password       
                });

                if (response.data.success) 
                    {
                        const userId = response.data.userId;
                        console.log("Login response data:", response.data);

                        // Save user ID for future use
                        await AsyncStorage.setItem('userId', userId.toString());

                        navigation.navigate('LoadingScreenUserLogin');

                        //Alert.alert("Login Success", "You have been successfully logged in!");            
                    } 
                else 
                    {
                        // Display specific error message from the server
                        Alert.alert("Login Failed", response.data.message);
                    }
            }
         catch (error) 
            {
                console.error('Login error:', error);

                // Remove user from logged in users so that they can be logged in again
                const userId = await AsyncStorage.getItem('userId');
                if (userId) 
                    {
                        await axios.post('http://localhost:3000/removeUserFromLoggedIn', { userId });
                    }
            
                Alert.alert("Error", "An error occurred while attempting to log in.");
            }
    };

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
            <SafeAreaView style={styles.safeAreaContainer}>

                {/* Back Arrow and Sign In Text */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Icon name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Sign in</Text>
                </View>

                <View style={styles.contentContainer}>
                    {/* Logo image */}
                    <View style={styles.logoContainer}>
                        <Image source={logo} style={styles.logo} resizeMode="contain" />
                    </View>

                    {/* Email Input Field */}
                    <TextInput
                        style={styles.input}
                        placeholder="username@my.gcu.edu"
                        placeholderTextColor="#666" // Placeholder color
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    
                    {/* Password Input Field */}
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#666" 
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true} // This hides the password
                    />

                    {/* Next Button */}
                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Next</Text>
                    </TouchableOpacity>

                    {/* Help Field */}
                    <Text style={styles.helpText}>
                        Can't access your account?
                    </Text>

                    {/* Footer with help and options */}
                    <View style={styles.helpBox}>
                        <Text style={styles.footerText}>Need Help? Contact Help Desk at 1-877-428-8447 or go to support.gcu.edu. This site is operated by Microsoft on behalf of Grand Canyon University and is for the exclusive use of prospective students. Visit gcu.edu for details.</Text>
                        <TouchableOpacity>
                            <Text style={styles.signinOptions}>Sign-in options</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: 
        {
            flex: 1,
            backgroundColor: '#fff', // Set your preferred background color
        },
    headerContainer: 
        {
            backgroundColor: '#8A2BE2', // Header background color
            //padding: 20,
        },
    headerTitle: 
        {
            color: '#fff',
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom:10,
        },
    headerSubtitle: 
        {
            color: '#fff',
            fontSize: 16,
            textAlign: 'center',
        },
    title: 
        {
            fontSize: 28,
            color: 'white',
            fontWeight: 'bold',
            alignSelf: 'flex-start',
            marginLeft: '10%', // Adjust as needed
            justifyContent: 'center',
            marginBottom: 45,
        },
    input: 
        {
            width: '80%',
            padding: 15,
            marginVertical: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            alignSelf: 'center',
        },
    button: 
        {
            backgroundColor: '#522398',
            padding: 15,
            marginHorizontal: 20,
            marginBottom: 20,
            alignItems: 'center',
            borderRadius: 30,
            marginTop: 20,
        },
    buttonText: 
        {
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
        },
    helpText: 
        {
            color: '#6a1b9a', // Text color
            textAlign: 'center',
            marginTop: 20,
            marginBottom: 20,
        },
    footerContainer: 
        {
            position: 'absolute',
            bottom: 10,
            left: 0,
            right: 0,
            padding: 20,
        },
    footerText: 
        {
            color: '#333',
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 10,
        },
    signinOptions: 
        {
            color: '#6a1b9a', // Link text color
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
        },
    logo: 
        {
            height: 40, // Adjust the size as needed
            width: '100%', // This will make the logo responsive to the container width
            paddingTop: 50,
            marginBottom:70,
            
        },
    backgroundContainer: 
        {
            flex: 1,
        },
    safeAreaContainer: 
        {
            flex: 1,
            backgroundColor: 'transparent', 
        },
    contentContainer: 
        {
            flex: 1,
            padding: 16,
            paddingTop: 60, 
            paddingBottom: 60, 
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // white with opacity
            borderTopLeftRadius: 30, 
            borderTopRightRadius: 30, 
            borderBottomLeftRadius: 30, 
            borderBottomRightRadius: 30, 
        },
    backButton: 
        {
            //position: 'absolute', 
            left: 30, 
            top: 5, 
        },
});

export default LoginScreen;