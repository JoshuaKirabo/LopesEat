import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Question1 from './QuestionScreens/Question1';
import Question2 from './QuestionScreens/Question2';
import Question3 from './QuestionScreens/Question3';
import Question4 from './QuestionScreens/Question4';
import Question5 from './QuestionScreens/Question5';
import Question6 from './QuestionScreens/Question6';
import Question7 from './QuestionScreens/Question7';
import Question8 from './QuestionScreens/Question8';
import Question9 from './QuestionScreens/Question9';
import Question10 from './QuestionScreens/Question10';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question1">
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
