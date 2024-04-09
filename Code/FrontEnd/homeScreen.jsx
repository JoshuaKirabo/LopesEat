import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, Dimensions, FlatList, ImageBackground  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import ProfileScreen from './profileScreen'; 
import loginScreen from './loginScreen.jsx';

import { useNavigation } from '@react-navigation/native';
import ChatScreen from './chatScreen';

import { CircularProgress } from 'react-native-svg-circular-progress'; 




const Tab = createBottomTabNavigator();




const { width } = Dimensions.get('window'); // We will need this to format the meal cards

const FavoritesTab = () => {
    return (
        <View style={styles.container}>
            <Text>Favorites Screen</Text>
        </View>
    );
};

const ChatTab = () => {
    return (
        <View style={styles.container}>
            <Text>Chat Screen</Text>
        </View>
    );
};

const ProfileTab = () => 
{
    return (
        <View style={styles.container}>
            <Text>Profile Screen</Text>
        </View>
    );
};

const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };



const HomeScreen = () => {
    const navigation = useNavigation(); // Assuming you've set up React Navigation correctly
    
    useEffect(() => {
        const checkUserId = async () => {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
                //console.error('No user ID found, navigating to login screen');
                navigation.navigate('Welcome'); // Make sure 'Login' matches the name of your login screen in the navigator
                return; // This halts further execution of this effect if no user ID is found
            }
            // Any additional setup can go here, if the user ID is found
        };
      
        checkUserId();
    }, []);

    return (
        <Tab.Navigator screenOptions={{ headerShown: false,  tabBarActiveTintColor: '#522398' }} >
            <Tab.Screen 
                name="Home" 
                component={HomeTab}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Favorites" 
                component={FavoritesTab}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="heart" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Chat" 
                component={ChatScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="comment" color={color} size={size} />
                    ),
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} // Use ProfileScreen here
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" color={color} size={size} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const HomeTab = () => 
    {
        const [meals, setMeals] = useState([]);
        const [numberOfMeals, setNumberOfMeals] = useState(3); // Default to 3 meals
        const [activeMeal, setActiveMeal] = useState('Breakfast');
        const [mealOptions, setMealOptions] = useState(['Breakfast', 'Lunch', 'Dinner']); // Default meal options

        const CARD_WIDTH = width * 0.8; // 80% of the screen width for the card
        const CARD_OUTER_WIDTH = CARD_WIDTH + 20; // The total width including some margin

        const CARD_MARGIN = 20;
        //const CARD_WIDTH = width - (CARD_MARGIN * 2); // Width of the card including the margins

        const scrollViewRef = useRef(null); // Initialize the ref for the ScrollView

        const navigation = useNavigation();

        const [progress, setProgress] = useState({
            carbs: 78,
            protein: 100,
            fat: 40,
            caloriesConsumed: 1750,
            caloriesBurned: 500,
          });
          

        useEffect(() => {
          const checkUserId = async () => {
            const userId = await AsyncStorage.getItem('userId');
            if (!userId) {
              // If no userId is found, navigate to the Welcome screen
              // Replace 'Welcome' with the actual name of your welcome screen as defined in your navigator
              navigation.navigate('welcomeScreen');
            }
          };
      
          checkUserId();
        }, [navigation]);

        // New function to scroll to a meal card
    const scrollToMeal = (index) => {
        // Calculate the x position based on the card width and margin
        const xPosition = index * (CARD_WIDTH + (2 * CARD_MARGIN));
        scrollViewRef.current.scrollTo({ x: xPosition, animated: true });
    };

    
        
        useEffect(() => 
            {
                // Define meal options based on the number of meals per day

                const mealOptionsByCount = 
                    {
                        2: ['Breakfast', 'Dinner'],
                        3: ['Breakfast', 'Lunch', 'Dinner'],
                        4: ['Breakfast', 'Lunch', 'Afternooon Snack', 'Dinner'],
                        5: ['Breakfast', 'Morning Snack', 'Lunch', 'Afternoon Snack', 'Dinner'],
                    };

                setMealOptions(mealOptionsByCount[numberOfMeals] || ['Breakfast', 'Lunch', 'Dinner']);
            }, [numberOfMeals]);

            const handleMealSelect = (meal, index) => {
                setActiveMeal(meal); // Set the active meal to the one that's selected
                const xPosition = index * (CARD_WIDTH + (CARD_MARGIN * 2));
                scrollViewRef.current.scrollTo({ x: xPosition, animated: true });
              };


        

        useEffect(() => 
            {
                const fetchMeals = async () => 
                    {
                        try 
                            {
                                // Retrieve the userId from AsyncStorage
                                const userId = await AsyncStorage.getItem('userId');
                                if (!userId) throw new Error('No user ID found');
                              
                                // Fetching the number of meals the user picked from the backend
                                const response = await fetch(`http://172.25.74.19:3000/meals-count/${userId}`);
                                
                                if (!response.ok) 
                                    {
                                      throw new Error(`HTTP error! status: ${response.status}`);
                                    }
                                
                                    const data = await response.json();
                              
                                // Now you can use the number of meals
                                setNumberOfMeals(data.meals_a_day);
                                

                            }
                        catch (error) 
                            {
                                console.error("Failed to fetch the number of meals:", error);
                            }
                    };//
                              
                fetchMeals();
            }, []); // The dependency array is empty, so this effect will only run once when the component mounts

            useEffect(() => {
                const fetchMealsData = async () => {
                  // logic to fetch meals data and store it in `meals` state
                  // for example:
                  const fetchedMeals = [
                    {
                      type: "Breakfast",
                      name: "Pepperoni Chicken Sandwich",
                      restaurant: "Einstein Bros. Bagels",
                      image: require('./Images/Food Pictures/Einsteins/Pepperoni-Chicken-Sandwich.jpeg'),
                     //image: require('./Images/profile_pictures/jenna.JPG'),
                    },
                    {
                        type: "Morning Snack",
                        name: "Avocado Toast",
                        restaurant: "Pita Jungle",
                        image: require('./Images/Food Pictures/Pita/avocado-toast.jpeg'),
                    },
                    {
                        type: "Lunch",
                        name: "Chicken Caesar Salad",
                        restaurant: "Panera Bread",
                        image: require('./Images/Food Pictures/Panera/chicken-ceasar-salad.png'),
                    },
                    {
                        type: "Afternoon Snack",
                        name: "Greek Yogurt with Honey",
                        restaurant: "Herdstop",
                        image: require('./Images/Food Pictures/Herdstop/greeek-yogurt.jpeg'),
                    },
                    {
                        type: "Dinner",
                        name: "Broccoli Beef",
                        restaurant: "Panda Express",
                        image: require('./Images/Food Pictures/Panda/Broccoli-Beef.jpeg'),
                    }
                  ];
                  setMeals(fetchedMeals);
                };
              
                fetchMealsData();
              }, []);

  const screenWidth = Dimensions.get('window').width;

// ==================== Meals Section  ============================= //
const renderMealOption = (option, index) => {
    const isActive = activeMeal === option;
    return (
      <TouchableOpacity 
        key={option} 
        onPress={() => handleMealSelect(option, index)} 
        style={styles.mealOption}
      >
        <Text style={isActive ? styles.activeMealText : styles.inactiveMealText}>
          {option}
        </Text>
      </TouchableOpacity>
    );
  };
// ==================== End of Meals Section  ========================== //


const updateActiveMeal = (mealType) => {
    setActiveMeal(mealType);
  };

// ==================== Meal Cards Section  ============================= //
const MealCard = ({ mealName, restaurantName, imageUri, index }) => 
    {        
        const [backgroundColor, setBackgroundColor] = useState('#D6DFFF');

        return (

            
            
            <View key={index} style={styles.card}>
                {/* Blurred background image */}
                <ImageBackground source={imageUri} style={styles.fullSize} imageStyle={styles.blurredImage}  blurRadius={10} >
                
                    <View style={styles.textContainer}>
                        <Text style={styles.mealName}>{mealName}</Text>
                        <Text style={styles.restaurantName}>{restaurantName}</Text>
                        
                        
                        
                    </View>

                    <Image source={imageUri} style={styles.mealImage} />
                </ImageBackground>
            </View>
        );
  };
// ==================== End of Meal Cards Section  ========================== //

const ProgressBar = ({progress, goal, color}) => (
    <View style={styles.progressBarContainer}>
      <View style={[styles.progressBar, {width: `${(progress / goal) * 100}%`, backgroundColor: color}]} />
    </View>
  );

  const ProgressCard = ({ title, progress, goal, color }) => {
    return (
      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>{title}</Text>
        <ProgressBar progress={progress} goal={goal} color={color} />
        <Text style={styles.progressText}>{progress} / {goal} g</Text>
      </View>
    );
  };

  const [hydration, setHydration] = useState({
    current: 3000, // Starting value
    goal: 4000, // Daily goal
});

// Functions to increment and decrement hydration level
const handleIncrement = () => {
    setHydration(prevState => ({
        ...prevState,
        current: prevState.current + 250 > prevState.goal ? prevState.goal : prevState.current + 250
    }));
};

const handleDecrement = () => {
    setHydration(prevState => ({
        ...prevState,
        current: prevState.current - 250 < 0 ? 0 : prevState.current - 250
    }));
};
  
  const TodaysActivity = () => {
    // Add your state and functions for today's activity here
  
    return (
      <View style={styles.todaysActivityContainer}>
        <Text style={styles.todaysActivityTitle}>Today's Activity</Text>
        {/* Implement the activity rings and progress bars here */}
      </View>
    );
  };
  
  const Overview = () => {
    // Add your state and functions for the overview here
  
    return (
      <View style={styles.overviewContainer}>
        <Text style={styles.overviewTitle}>Overview</Text>
        {/* Implement the overview UI elements here */}
      </View>
    );
  };

  const HealthMetrics = ({ iconName, title, value, status }) => {
    return (
      <View style={styles.metricCard}>
        <FontAwesome name={iconName} size={24} color="#000" />
        <Text style={styles.metricTitle}>{title}</Text>
        <Text style={styles.metricValue}>{value}</Text>
        <Text style={styles.metricStatus}>{status}</Text>
      </View>
    );
  };

  

const scrollViewContent = {
    paddingHorizontal: CARD_MARGIN, // Use CARD_MARGIN for padding
    // Add any additional styles if necessary
  };



    return (


            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.container}>


                    {/* Purple Dots */}
                    <View style={styles.dotsContainer}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>

                    {/* Greeting */}
                    <Text style={styles.greeting}>{getGreeting()}</Text>

                    {/* Horizontal scroll for meal options */}
                    <View style={styles.mealOptionsContainer}>
                        {mealOptions.map(renderMealOption)}
                    </View>
                    
                    {/* Meal card */}
                    <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    //snapToAlignment="center" // Snap to the center of the view
                    //snapToInterval={CARD_WIDTH} // The entire width of a card plus margins
                    decelerationRate="fast"
                    contentContainerStyle={scrollViewContent}
                    >
                        {meals.map((meal, index) => (
                            <View key={index}>
                                <MealCard 
                                    mealName={meal.name}
                                    restaurantName={meal.restaurant}
                                    imageUri={meal.image}
                                />
                            </View>
                        ))}
                    </ScrollView>
            
                    {/* Progress Section */}
                    <View style={styles.progressCardContainer}>
                        <Text style={styles.sectionTitle}>Today's Progress</Text>
                        <ProgressCard title="Carbs" progress={progress.carbs} goal={183} color="#FFA726" />
                        <ProgressCard title="Protein" progress={progress.protein} goal={160} color="#FB8C00" />
                        <ProgressCard title="Fat" progress={progress.fat} goal={51} color="#FF7043" />
                        <Text style={styles.caloriesText}>
                            Calories Consumed: {progress.caloriesConsumed} / 2500
                        </Text>

                        <Text style={styles.caloriesText}>
                            Calories Burned: {progress.caloriesBurned}
                        </Text>
                    </View>

                    {/* Hydration Tracker Section */}
                    <View style={styles.hydrationCardContainer}>
                        <Text style={styles.hydrationTitle}>Hydration Tracker</Text>

                        <View style={styles.circularProgressContainer}>
                            <CircularProgress
                            value={hydration.current}
                            maxValue={hydration.goal}
                            radius={100}
                            activeStrokeWidth={10}
                            inActiveStrokeWidth={10}
                            inActiveStrokeColor="#ddd"
                            activeStrokeColor="#6200ee"
                            childrenContainerStyle={styles.circularProgressChildrenContainer}
                            >
                            <Text style={styles.circularProgressText}>
                                {Math.round((hydration.current / hydration.goal) * 100)}%
                            </Text>
                            <Text style={styles.circularProgressSubText}>
                                {hydration.current} / {hydration.goal} ml
                            </Text>
                            </CircularProgress>
                        </View>

                        <View style={styles.hydrationControlContainer}>
                            <TouchableOpacity style={styles.hydrationButton} onPress={handleDecrement}>
                            <AntDesign name="minus" size={24} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.hydrationButton} onPress={handleIncrement}>
                            <AntDesign name="plus" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>

            
                    {/* Health Metrics Section */}
                    <View style={styles.healthMetricsContainer}>
                        <HealthMetrics
                            title="Current Weight"
                            icon="heartbeat"
                            value="72 bpm"
                            status="Normal"
                        />

                        <HealthMetrics
                            title="Steps"
                            icon="heartbeat"
                            value="72 bpm"
                            status="Normal"
                        />

                        <HealthMetrics
                            title="Water Intake"
                            icon="heartbeat"
                            value="72 bpm"
                            status="Normal"
                        />

                        <HealthMetrics
                            title="Calories"
                            icon="heartbeat"
                            value="72 bpm"
                            status="Normal"
                        />
  {/* Other metrics... */}
</View>
            
                    {/* Add bottom tab navigation components if necessary */}
        </ScrollView>
        </SafeAreaView>

    );
  };
  
  
  const styles = StyleSheet.create({

    safeArea: 
        {
            flex: 1,
            backgroundColor: '#FFF', // or the color of your page
        },
    container: 
        {
            backgroundColor: '#FDF5EE',
        },
    greeting: 
        {
            fontSize: 30,
            fontWeight: 'bold',
            paddingLeft: 50,
            paddingTop: 15,
        },
    
    dotsContainer: 
        {
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex',
            paddingVertical: 10,
            paddingLeft: 70,
        },
      dot: 
        {
            width: 15,
            height: 15,
            borderRadius: 20,
            backgroundColor: 'purple',
            marginHorizontal: 4,
            opacity: 0.3, // inactive dots are less visible
        },
      activeDot: 
        {
            opacity: 1, // active dot has full opacity
        },
    mealOptionsContainer: 
        {
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 10,
            paddingTop:30,
            paddingHorizontal:30,
            
        },
    mealOption: 
        {
            flex: 1, // This will make each option take up equal space
            justifyContent: 'center', // This centers text vertically
            alignItems: 'center', // This centers text horizontally
        },
    activeMealText: 
        {
            fontSize: 19,
            fontWeight: 'bold',
            color: 'black', // Active state color
        },
    inactiveMealText: 
        {
            fontSize: 15,
            color: 'grey', // Inactive state color
        },
    mealsScrollView: 
        {
            flexDirection: 'row',
        },
    cardContainer: 
        {

        },
    card: 
        {
            borderRadius: 20,
            width: width * 0.9, 
            alignSelf: 'center',
            height: 200,
            margin: 20,
            flexDirection: 'row', 
            alignItems: 'center', 
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: 30,
            marginHorizontal: 20,
            marginRight: 10,
            //marginVertical: 10,

            // Apply shadow for iOS
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,

            // Apply elevation for Android
            elevation: 3,
        },
    mealImage: 
        {
            width: 150,
            height: 200,
            marginLeft: 'auto',
            borderRadius: 30,
        },
    textContainer: 
        {
            zIndex: 1, // Ensure text container is above the blurred background
            position: 'absolute',
            top: 15,
            left: 15,
            right: 165,
        },
    mealName: 
        {
            fontSize: 24,
            fontWeight: 'bold',
            color: '#FFF', // Chosen color that works well on expected backgrounds
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -1, height: 1 },
            textShadowRadius: 10
        },
    restaurantName: 
        {
            fontSize: 18,
            color: '#FFF',
            paddingTop: 20,
            fontWeight: 'bold',
        },
    overlay: 
        {
            backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent background for text
            padding: 10,
            borderRadius: 10,
        },
    blurredImage: 
        {
            borderRadius: 20, // Apply the same borderRadius as your card for consistency
            height: 200,
            width: width - 40,
        },
    fullSize: 
        {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          },
    progressSection: 
        {
            margin: 20,
        },
    progressBarContainer: 
        {
            height: 20,
            width: '100%',
            backgroundColor: '#e0e0e0',
            borderRadius: 10,
        },
    progressBar: 
        {
            height: '100%',
            borderRadius: 10,
        },
    sectionTitle: 
        {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 10,
        },
    progressCardContainer: 
        {
            borderRadius: 20,
            backgroundColor: '#FFF',
            padding: 20,
            margin: 20,
            // Apply shadow for iOS
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            // Apply elevation for Android
            elevation: 3,
        },
    progressCard: 
        {
            marginBottom: 10,
        },
    progressTitle: 
        {
            fontSize: 18,
            fontWeight: 'bold',
            color: '#333',
        },
    progressText: 
        {
            fontSize: 16,
            color: '#666',
            textAlign: 'right',
        },
    caloriesText: 
        {
            fontSize: 16,
            color: '#666',
            marginTop: 10,
        },
    hydrationCardContainer: {
            backgroundColor: '#FFF',
            borderRadius: 20,
            padding: 20,
            marginRight: 20,
            marginLeft: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            alignItems: 'center', // Center align items for Android
          },
    healthMetricsContainer: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            padding: 10,
            // Add more styling as needed
          },
    metricCard: 
        {
            backgroundColor: '#FFF',
            borderRadius: 10,
            padding: 10,
            alignItems: 'center',
            // Add more styling as needed
          },
    metricTitle: 
        {
            // Styling for the metric title
        },
    metricValue: 
        {
            // Styling for the metric value
        },
    metricStatus: 
        {
            // Styling for the metric status
        },  
    });
  

export default HomeScreen;
