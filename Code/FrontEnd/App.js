import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import LoginScreen from './loginScreen.jsx';
import { AnswersProvider } from './AnswersToQuestions.js'; 

import HomeScreen from './homeScreen.jsx';
import WelcomeScreen from './welcomeScreen.jsx';
import Question1 from './QuestionScreens/Question1.jsx';
import Question2 from './QuestionScreens/Question2.jsx';
import Question3 from './QuestionScreens/Question3.jsx';
import Question4 from './QuestionScreens/Question4.jsx';
import Question5 from './QuestionScreens/Question5.jsx';
import Question6 from './QuestionScreens/Question6.jsx';
import Question7 from './QuestionScreens/Question7.jsx';
import Question8 from './QuestionScreens/Question8.jsx';
import Question9 from './QuestionScreens/Question9.jsx';
import Question10 from './QuestionScreens/Question10.jsx';
import Question11 from './QuestionScreens/Question11.jsx';
import Question12 from './QuestionScreens/Question12.jsx';
import Question13 from './QuestionScreens/Question13.jsx';
import Question14 from './QuestionScreens/Question14.jsx';
import Question15 from './QuestionScreens/Question15.jsx';
import Question16 from './QuestionScreens/Question16.jsx';
import Question17 from './QuestionScreens/Question17.jsx';
import Question18 from './QuestionScreens/Question18.jsx';
import Question19 from './QuestionScreens/Question19.jsx';
import Question20 from './QuestionScreens/Question20.jsx';
import Question21 from './QuestionScreens/Question21.jsx';
import Question22 from './QuestionScreens/Question22.jsx';
import Question23 from './QuestionScreens/Question23.jsx';
import Question24 from './QuestionScreens/Question24.jsx';
import Question25 from './QuestionScreens/Question25.jsx';
import Question26 from './QuestionScreens/Question26.jsx';
import Question27 from './QuestionScreens/Question27.jsx';
import Question28 from './QuestionScreens/Question28.jsx';
import Question29 from './QuestionScreens/Question29.jsx';
import Question30 from './QuestionScreens/Question30.jsx';
import Question31 from './QuestionScreens/Question31.jsx';

import LoadingScreen from './LoadingScreenQuestion31';
import LoadingScreenUserLogin from './LoadingScreenUserLogIn.jsx';

import IntroScreen from './IntroScreen.jsx';
import ChatScreen from './chatScreen.jsx';


const Stack = createStackNavigator();

function QuestionsStackNavigator({ route }) 
  {
    const initialRouteName = route.params?.initialRouteName || 'Question1'; // Default to 'Question1'

    return (
    <AnswersProvider>
      <Stack.Navigator initialRouteName={initialRouteName}>
            <Stack.Screen name="IntroScreen" component={IntroScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Question1" component={Question1} options={{ headerShown: false }} />
            <Stack.Screen name="Question2" component={Question2} options={{ headerShown: false }} />
            <Stack.Screen name="Question3" component={Question3} options={{ headerShown: false }} />
            <Stack.Screen name="Question4" component={Question4} options={{ headerShown: false }} />
            <Stack.Screen name="Question5" component={Question5} options={{ headerShown: false }} />
            <Stack.Screen name="Question6" component={Question6} options={{ headerShown: false }} />
            <Stack.Screen name="Question7" component={Question7} options={{ headerShown: false }} />
            <Stack.Screen name="Question8" component={Question8} options={{ headerShown: false }} />
            <Stack.Screen name="Question9" component={Question9} options={{ headerShown: false }} />
            <Stack.Screen name="Question10" component={Question10} options={{ headerShown: false }} />
            <Stack.Screen name="Question11" component={Question11} options={{ headerShown: false }} />
            <Stack.Screen name="Question12" component={Question12} options={{ headerShown: false }} />
            <Stack.Screen name="Question13" component={Question13} options={{ headerShown: false }} />
            <Stack.Screen name="Question14" component={Question14} options={{ headerShown: false }} />
            <Stack.Screen name="Question15" component={Question15} options={{ headerShown: false }} />
            <Stack.Screen name="Question16" component={Question16} options={{ headerShown: false }} />
            <Stack.Screen name="Question17" component={Question17} options={{ headerShown: false }} />
            <Stack.Screen name="Question18" component={Question18} options={{ headerShown: false }} />
            <Stack.Screen name="Question19" component={Question19} options={{ headerShown: false }} />
            <Stack.Screen name="Question20" component={Question20} options={{ headerShown: false }} />
            <Stack.Screen name="Question21" component={Question21} options={{ headerShown: false }} />
            <Stack.Screen name="Question22" component={Question22} options={{ headerShown: false }} />
            <Stack.Screen name="Question23" component={Question23} options={{ headerShown: false }} />
            <Stack.Screen name="Question24" component={Question24} options={{ headerShown: false }} />
            <Stack.Screen name="Question25" component={Question25} options={{ headerShown: false }} />
            <Stack.Screen name="Question26" component={Question26} options={{ headerShown: false }} />
            <Stack.Screen name="Question27" component={Question27} options={{ headerShown: false }} />
            <Stack.Screen name="Question28" component={Question28} options={{ headerShown: false }} />
            <Stack.Screen name="Question29" component={Question29} options={{ headerShown: false }} />
            <Stack.Screen name="Question30" component={Question30} options={{ headerShown: false }} />
            <Stack.Screen name="Question31" component={Question31} options={{ headerShown: false }} />
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      </AnswersProvider>
    );
  }

export default function App()
{
  const [initialRouteName, setInitialRouteName] = useState('Home'); // Default to 'Home'

  useEffect(() => {
    async function checkLoginStatus() 
      {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) 
          {
            setInitialRouteName('Login');
          } 
        else 
          {
            try 
              {
                const response = await axios.get('http://172.25.74.19:3000/checkLoggedIn', { params: { userId } });
                if (!response.data.isLoggedIn) 
                  {
                    setInitialRouteName('Login');
                  }
              } 
            catch (error) 
              {
                console.error('Error checking login status:', error);
                setInitialRouteName('Login'); // If error, default to 'Login'
              }
          }
      }
    checkLoginStatus();
  }, []);

  useEffect(() => 
    {
      async function loadInitialRoute() 
        {
          const redirectTo = await AsyncStorage.getItem('redirectTo'); // Retrieve redirectTo value
          if (redirectTo) 
            {
              setInitialRouteName('Questions');
            }
        }
      loadInitialRoute();
    }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRouteName}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ChatBot" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="LoadingScreenUserLogin" component={LoadingScreenUserLogin} options={{ headerShown: false }} />
        <Stack.Screen name="Questions" component={QuestionsStackNavigator} initialParams={{ initialRouteName }} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
