import React from 'react';
import { Platform, View, Text, TouchableOpacity, Image, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Make sure you have this installed

const WelcomeScreen = ({ navigation }) => {
    const backgroundImage = require('./Images/Sign-In-Background.png');
    const logo = require('./Images/welcome-logo.png');

    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
            <View style={styles.header}>

            </View>

            <View style={styles.contentContainer}>
                <Text style={styles.welcomeText}>Welcome to LopesEat</Text>
                <Text style={styles.signInText}>Sign in using your student credentials</Text>
                
                <TouchableOpacity 
                    style={styles.signInButton} 
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <Image source={logo} style={styles.logo} resizeMode="contain" />
                <Text style={styles.logoText}>© GCU 2024</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundContainer: 
        {
            flex: 1,
            justifyContent: 'flex-end', 
        },
    header: 
        {
            marginTop: Platform.OS === 'ios' ? 60 : 30, 
        },
    contentContainer: 
        {
            alignItems: 'center', 
            padding: 20,
            paddingTop: 100, 
            marginTop: 200, 
            backgroundColor: 'white',
            borderTopLeftRadius: 90,
            borderBottomLeftRadius: 30, 
            borderBottomRightRadius: 30,
            paddingBottom: '10%', 
            minHeight: '60%', 
            width: '100%', 
            bottom: 0, 
        },
    welcomeText: 
        {
            fontSize: 40,
            fontWeight: 'bold',
            marginBottom: 20,
            alignItems: 'center',
            color: 'black', 
        },
    signInText: 
        {
            fontSize: 16,
            color: '#4a4a4a', 
            marginBottom: 16,
        },
    signInButton: 
        {
            backgroundColor: 'black', 
            paddingVertical: 12,
            paddingHorizontal: 30,
            borderRadius: 10,
            marginBottom: 16,
        },
    buttonText: 
        {
            color: 'white',
            fontSize: 18,
            fontWeight: 'bold',
        },
    logo: 
        {
            height: 100,
            width: 200, 
            marginTop: 50,
        },
    footerText: 
        {
            fontSize: 14,
            color: '#4a4a4a', 
            marginTop: 10,
        },
});

export default WelcomeScreen;
