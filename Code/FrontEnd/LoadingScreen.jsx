import React from 'react';
import { Text, Image, SafeAreaView, StyleSheet } from 'react-native';

const LoadingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('./Animations/Creating-Meal-Plan.gif')} // Path to your local gif file
        style={styles.image}
      />
       <Text style={styles.text}>Creating your meal plan...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#522398', // Set your preferred background color
  },
  image: {
    width: 150,  // Set the width of your gif
    height: 150, // Set the height of your gif
    // You might need to adjust these values depending on the dimensions of your GIF
  },
  text: {
    marginTop: 20, // Add space between the GIF and text
    fontSize: 20, // Set text size
    fontWeight: 'bold', // Make text bold
    color: '#ffffff', // Set text color
    textAlign: 'center', // Center text
  },
});

export default LoadingScreen;
