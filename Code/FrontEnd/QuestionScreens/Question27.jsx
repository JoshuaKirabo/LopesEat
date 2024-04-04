//
//  Question12.jsx
//  LopesEat
//  Front End
//  Created by Joshua Kirabo on 02/09/24
//

import React, { useState } from 'react';
import { TextInput, SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { useAnswers } from '../AnswersToQuestions';

const Question27 = ({ navigation }) => 
  {
    const [selectedAllergies, setSelectedAllergies] = useState({});
    const { saveAnswer } = useAnswers();
    const [searchQuery, setSearchQuery] = useState('');
    const totalQuestions = 31; 
    const currentQuestion = 27;

    const allergyOptions = [
          { id: "1", label: "Arena Café🥣", value: "Arena Cafe", description: "Featuring an updated menu and the best bang-for-your-buck value on campus, we offer large hamburgers, a great pancake breakfast, and more! Visit the mobile app for healthier options!", location: "Arena" },
          { id: "2", label: "Cañón 49🫔", value: "Cañón 49", description: "Cañón 49 is serving delicious Mexican-style favorites with daily specials and house-made tortilla chips. Located off Campus via Building 71", location: "Building 71" },
          { id: "3", label: "Canyon Pizza Company🍕", value: "Canyon Pizza Company", description: "Your official campus pizzeria serves restaurant-quality, full-size pies and slices, with quality ingredients.", location: "Student Union" },
          { id: "4", label: "Chick-fil-A🐮", value: "Chick-fil-A", description: "One of America's favorite fast food restaurants offers its original chicken sandwich as well as great-tasting fare: salads, waffle fries and hand spun milkshakes. It\’s our pleasure to serve you!", location: "Lopes Way, Diamondback" },
          { id: "5", label: "Einstein Bros. Bagels🥯", value: "Einstein Bros. Bagels", description: "Einstein's offers a large menu with made-to-order sandwiches, a vast variety of bagels, fresh premade salads, sides and desserts!", location: "Student Union" },
          { id: "6", label: "Fresh Fusion🥗", value: "Fresh Fusion", description: "This GCU original restaurant offers flatbread sandwiches (both hot and cold), wraps, soups and fresh salads tossed-to-order, making this a great healthy choice.", location: "Student Union" },
          { id: "7", label: "Grand Canyon Beverage Company🥂", value: "Grand Canyon Beverage Company", description: "This exciting coffee shop offers a wide variety of cold brewed coffees, local tea selections and much more!", location: "Student Union, Roadrunner, Diamondback, Agua Fria" },
          { id: "8", label: "Havoc House🥘", value: "Havoc House", description: "Feel the GCU spirit at Lope Nation’\s new favorite stomping grounds and dine-in destination featuring brick oven pizza. Havoc House serves modern American fare with an Italian flare and a twist on classic favorites.", location: "Arena" },
          { id: "9", label: "Herd Stop🛒", value: "Herd Stop", description: "Our go-to campus community market has an array of fresh foods and grocery items. Swing by for the large produce selection, choice gluten-free and vegan products, fresh sushi and much more!", location: "Antelope" },
          { id: "10", label: "Jimmy John's🥪", value: "Jimmy John's", description: "Freaky Fast® sandwiches using quality ingredients built onto freshly baked bread using premium meats and fresh veggies, sliced daily by hand.", location: "Agua Fria" },
          { id: "11", label: "Kaminari", value: "Kaminari", description: "This vibrant new poke bar offers build-your-own poke bowls. With an energetic menu packed with clean ingredients and a boba selection, Kaminari is a hit!", location: "Lopes Way" },
          { id: "12", label: "Lopes Training Table🍴", value: "Lopes Training Table", description: "Visit the Lopes Training Table for healthy food options that fuel you all day long. An eatery serving all you can eat (one-pass) breakfast and lunch daily.", location: "Student Union" },
          { id: "13", label: "Lopacellis Pasta🍝", value: "Lopacellis Pasta", description: "Fast, affordable pasta bowls are what Lopacellis is all about! Breadsticks come with all bowls.", location: "Student Union" },
          { id: "14", label: "Nekter Juice Bar🍹", value: "Nekter Juice Bar", description: "At Nekter Juice Bar, we believe that healthy should taste good and feel good, too. Our handcrafted juices, smoothies and acai bowls are natural, clean and always buzzing with the most energizing nutrient-rich ingredients.", location: "Verde River" },
          { id: "15", label: "Panda Express🐼", value: "Panda Express", description: "The pioneer of quick-serve Mandarin- and Szechuan-flavored Chinese dishes brings its popular orange chicken and full assortment of other entrees and sides to GCU!", location: "Lopes Way" },
          { id: "16", label: "Panera Bread🥖", value: "Panera Bread", description: "At Panera, it began with a simple commitment: to bake bread fresh every day in our bakery-cafes. No short cuts, just bakers with simple ingredients and hot ovens. That tradition continues today as we strive to find ways to be an ally for wellness to our guests.", location: "Verde River" },
          { id: "17", label: "Pita Jungle🫓", value: "Pita Jungle", description: "We offer a large variety of Mediterranean-inspired cuisine with fresh, vegan and gluten friendly ingredients. Pita Jungle is now open for breakfast, lunch and dinner.", location: "Lopes Way" },
          { id: "18", label: "Purple Greens🥕", value: "Purple Greens", description: "Grab a fresh pressed juice, or build a bowl with a variety of proteins, including salmon, steak and tofu.", location: "Arena" },
          { id: "19", label: "Purple Greens and More🥬", value: "Purple Greens and More", description: "Purple Greens and More has expanded! Stop by the Turquoise Apartments to grab a fresh built rice or noodle bowl with a focus on healthy eating.", location: "Turquoise" },
          { id: "20", label: "Quad Kitchen🍖", value: "Quad Kitchen", description: "The outside dining option that serves up BBQ, links, sandwiches and more!", location: "The Quad Lawn" },
          { id: "21", label: "Qdoba Mexican Eats", value: "Qdoba Mexican Eats", description: "Qdoba is famous for its queso and hearty meals. Whether you order a salad, bowl, tacos, or burritos, you will receive a quality meal, hand-crafted from fresh ingredients.", location: "Student Union" },
          { id: "22", label: "Subway🥪", value: "Subway", description: "The largest subway sandwich franchise brings its full made-to-order menu, with fresh meats, veggies and bread options.", location: "Lopes Way" },
          { id: "23", label: "Sweet Disciple🍬", value: "Sweet Disciple", description: "This candy and yogurt shop is the sweetest new location on campus", location: "Thunderground" },
          { id: "24", label: "Taco Bell🔔", value: "Taco Bell", description: "The eatery provides fast, inexpensive Mexican-inspired cuisine to Thunderground. We are now open late to satisfy your after-hours cravings, and also feature a breakfast menu for early risers.", location: "Thunderground" },
          { id: "25", label: "Taco Thunder🌮", value: "Taco Thunder", description: "Back by popular demand! Taco Thunder’s specialty is simple: serving up quality street tacos with flare.", location: "Lopes Way" },
          { id: "26", label: "The Habit Burger Grill🍔", value: "The Habit Burger Grill", description: "Sink your teeth into a juicy Charburger, grilled chicken sandwich, fresh salad or dessert, or try a hand-spindled shake or malt. Fried green beans make an excellent addition to any meal!", location: "Student Union" },
          { id: "27", label: "None🚫", value: "none", description: "No Preference/ Option.", location: "N/A" }
    ];

    const handleSubmit = () => 
      {
          // Check if at least one key in the selectedAllergies object is true
          if (Object.values(selectedAllergies).some((value) => value)) 
              {
                saveAnswer(27, selectedAllergies);
                navigation.navigate('Question28'); 
              } 
          else 
              {
                  Alert.alert("Selection Required", "Please select a body goal before proceeding.");
              }
      };

      const handleSelection = (value) => {
        setSelectedAllergies((currentSelectedAllergies) => {
            const newSelectedAllergies = { ...currentSelectedAllergies };
    
            // If 'None' is selected
            if (value === 'none') {
                // Check if 'None' is already selected, if so, unselect it. Otherwise, make it the only selection.
                return newSelectedAllergies[value] ? {} : { 'none': true };
            } else {
                // For any selection other than 'None'
                if (newSelectedAllergies['none']) {
                    // If 'None' is currently selected, remove it and select the current value
                    return { [value]: true };
                } else {
                    // Toggle the current selection
                    newSelectedAllergies[value] = !newSelectedAllergies[value];
                }
            }
    
            return newSelectedAllergies;
        });
    };
    

      const filteredOptions = searchQuery.length > 0 ? allergyOptions.filter(option =>option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||option.description.toLowerCase().includes(searchQuery.toLowerCase()) ||option.location.toLowerCase().includes(searchQuery.toLowerCase())) : allergyOptions;

      return (
        <SafeAreaView style={styles.container}>
          
          {/* Progress Bar Container */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${(currentQuestion / totalQuestions) * 100}%` }]} />
            </View>
            </View>
      
          {/* Header for Back Arrow and Progress Text */}
          <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backArrow}>
                    <Text style={styles.backArrowText}>←</Text>
                </TouchableOpacity>
                <Text style={styles.progressNumber}>{`${currentQuestion}/${totalQuestions}`}</Text>
                </View>

       {/* Question Text */}
       <Text style={styles.questionText}>
       Which of the following restaurants on campus would you like to exclude from your meal plan?
    </Text>

    {/* Search Bar */}
    <TextInput
      style={styles.searchBar}
      placeholder="Search restaurants..."
      value={searchQuery}
      onChangeText={setSearchQuery}
    />

       {/* Instructional Text */}
       <Text style={styles.instructionText}>
        Select the meats you would like to exclude from your meal plan
      </Text>

    {/* Options ScrollView */}
    <ScrollView style={styles.optionsScrollView} contentContainerStyle={styles.optionsContentContainer}>
      {filteredOptions.map((option, index) => (
        <TouchableOpacity
          key={option.id}
          style={[styles.option, selectedAllergies[option.value] ? styles.selectedOption : {}]}
          onPress={() => handleSelection(option.value)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>

    {/* Fixed Next Button */}
    <View style={styles.nextButtonContainer}>
      <TouchableOpacity
        style={[styles.nextButton, !Object.values(selectedAllergies).some(value => value) ? styles.disabledButton : {}]}
        onPress={handleSubmit}
        disabled={!Object.values(selectedAllergies).some(value => value)}
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
       // justifyContent: 'center',
        flexDirection: 'row', 
      },
      backArrow: 
      {
        left: 18,
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
        //justifyContent: 'center',
        paddingVertical: 20,
      },
    questionText: 
      {
        fontWeight: 'bold',
        fontSize: 25,
        marginHorizontal: 20,
        marginTop: 20,
        textAlign: 'center',
      },
    option: 
      {
        backgroundColor: '#f0f0f0',
        width: 'auto',
        alignItems: 'center', 
        //width: '80%',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 30,
        //height: 70,
        //marginBottom: 10,
        justifyContent: 'center',
        alignSelf: 'flex-start',
        margin: 5,
      },
    optionsContainer: 
      {
        flexDirection: 'row', // Arrange items in a row
        flexWrap: 'wrap', // Allow items to wrap to the next line
        flexGrow: 0,
        maxWidth: '90%', // Limit the width of the container
        maxHeight: 300, // Adjust this value as needed
        marginHorizontal: 10, // Add horizontal margin if needed
        alignSelf: 'stretch', // Stretch to fill the width of the containe
      },
    optionText: 
      {
        fontSize: 20,
        fontWeight: '600',
        textAlign: 'center',
      },
    optionsWrapper: 
      {
        flex: 1, 
        marginHorizontal: 20, 
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
    image: 
      {
        width: 50,
        height: 50,
        marginRight: 10,
      },
    nextButton: 
      {
        backgroundColor: '#522398',
        padding: 15,
        marginHorizontal: 20,
        marginBottom: 20,
        alignItems: 'center',
        borderRadius: 30
      },
    nextButtonText: 
      {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
      },
    nextButtonContainer: 
      {
        padding: 10, // Padding inside the container
        backgroundColor: '#FDF5EE', // Same as the outer container to blend in
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
    checkmark: 
      {
        position: 'absolute',
        right: 20,
        top: '150%',
        transform: [{ translateY: -10 }],
        fontSize: 20,
        color: '#522398',
      },
    searchBar: 
      {
        height: 40,
        marginHorizontal: 20,
        borderWidth: 1,
        borderColor: 'black',
        paddingLeft: 10,
        borderRadius: 20,
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: '#FDF5EE',
      },
      optionsContentContainer: 
      {
        flexDirection: 'row', // Arrange items in a row
        flexWrap: 'wrap', // Allow items to wrap to the next line
        justifyContent: 'center', // Center items horizontally
        alignItems: 'flex-start', // Align items to the start of the cross axis
        padding: 10, // Add padding for the ScrollView content
      },
      instructionText: 
      {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
        paddingHorizontal: 20, // Add padding for left and right
        marginBottom: 10, // Space before the options list starts
      },

  });
  

export default Question27;
