import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; 

import getProfilePicture from './Images/profile_pictures/profilePictures';

const settingsOptions = [
    { title: 'Account', icon: 'user' },
    { title: 'Notifications', icon: 'bell' },
    { title: 'Appearence', icon: 'paint-brush' },
    { title: 'Support', icon: 'question-circle' },
    { title: 'Feedback', icon: 'star' },
    // Add more options as necessary
  ];

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null);
    const userName = userData ? `${userData.first_name} ${userData.last_name}` : '';
    const [profilePicture, setProfilePicture] = useState(require('./Images/profile_pictures/default.jpeg')); // Set default image initially
    

    //console.log(userData.profile_picture);


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userId = await AsyncStorage.getItem('userId');
                if (!userId) throw new Error('No user ID found');

                // Set the profile picture
                const profilePic = getProfilePicture(userId);
                setProfilePicture(profilePic);
    
                // Fetch user data from your backend
                //console.log(userId);
                
    
                const response = await axios.get(`http://localhost:3000/profile/${userId}`);
                if (response.status !== 200) throw new Error(`HTTP error! status: ${response.status}`);
                
                // Set user data state
                setUserData({
                    ...response.data.data,
                    profilePicture: profilePic,
                  });


            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };
    
        fetchUserData();
    }, [userData]); // Add userData as a dependency
    

    


    const handleLogout = async () => {
        try 
            {
                const userId = await AsyncStorage.getItem('userId');

                // Call the logout endpoint
                await axios.post('http://localhost:3000/logout', { userId });

                // Remove the user's session data from storage
                await AsyncStorage.removeItem('userId'); 

                // Reset the navigation stack and navigate to the Welcome screen
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Welcome' }],
                });
            } 
        catch (error) 
            {
                console.error('Logout error:', error);
            }
    };

    return (
        <ImageBackground 
        source={require('./Images/Sign-In-Background.png')} // replace with your image path
        style={styles.headerBackground}
    >
        <ScrollView style={styles.container}>
               <ImageBackground 
                source={require('./Images/Sign-In-Background.png')} // replace with your image path
                style={styles.headerBackground}
            >
            <View style={styles.headerContainer}>

         

                {/* Display the profile image from the userData state */}
                <Image
                    source={profilePicture}
                    style={styles.profileImage}
                />
                {/* Display the first and last name from the userData state */}
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>{userName}</Text>
                    <Text style={styles.email}>{"email goes here"}</Text>
                </View>
            </View>
            </ImageBackground>
            {settingsOptions.map((item, index) => (
  <View key={index} style={styles.optionContainer}>
    <TouchableOpacity style={styles.optionButton} onPress={() => { /* Handle your click */ }}>
      <FontAwesome name={item.icon} size={20} color={item.color} style={styles.icon} />
      <Text style={styles.optionText}>{item.title}</Text>
      <FontAwesome name="angle-right" size={20} color="#C0C0C0" style={styles.arrowIcon} />
    </TouchableOpacity>
  </View>
))}

          {/* Logout Button */}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>


        </ScrollView>
        </ImageBackground>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF5EE',
        marginTop:50,
    },
    headerContainer: {
        backgroundColor: 'transparent',
        paddingBottom: 20,
        alignItems: 'center',
    },
    headerBackground: {

        flex:1,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#FFF',
        marginTop: 100,
    },
    name: {
        fontSize: 22,
        color: '#FFF',
        fontWeight: 'bold',
        marginTop: 10,
    },
    email: {
        fontSize: 14,
        color: '#FFF',
        marginTop: 2,
    },
    optionsContainer: {
        paddingHorizontal: 20,
        borderBottomWidth: 10, 
        borderBottomColor: '#D3D3D3',
        
    },
    optionText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 100,
    },
    optionButton: {
        backgroundColor: '#FDF5EE',
        paddingVertical: 15,
        paddingHorizontal: 20,
        //borderRadius: 25,

        //marginBottom: 10, // Space between buttons
   
        borderBottomColor: 'black',
        
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // This will push the arrow icon to the end



        
      },
    logoutButton: {
        marginTop: 20,
        backgroundColor: '#522398',
        padding: 10,
        borderRadius: 30,
        alignItems: 'center',
        marginHorizontal: 30,
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#FFF',
        fontWeight: 'bold',
    },
    icon: {
        width: 30, // Ensuring the icon container is the same width for alignment
        marginLeft: 70, // Space between the icon and text
        textAlign: 'center', // Center the icon if it's not filling the width
        color: '#522398',
        position: 'absolute',
        zIndex: 1,
      },
    // ... other styles ...
});


export default ProfileScreen;