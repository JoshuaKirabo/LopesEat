import React, { useState, useEffect, useRef } from 'react';
import { TextInput, SafeAreaView, View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, StatusBar, Dimensions, FlatList, ImageBackground  } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import ProfileScreen from './profileScreen'; 
import loginScreen from './loginScreen.jsx';

import { useNavigation } from '@react-navigation/native';
import ChatScreen from './chatScreen';

//import { CircularProgress } from 'react-native-svg-circular-progress';
import * as Progress from 'react-native-progress'; 




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

        const [customIntakeOz, setCustomIntakeOz] = useState('');
        const [inputIntakeOz, setInputIntakeOz] = useState(''); // User input or adjusted by buttons
        const [overallHydrationOz, setOverallHydrationOz] = useState(0); // Overall daily hydration in oz


        const CARD_WIDTH = width * 0.8; // 80% of the screen width for the card
        const CARD_OUTER_WIDTH = CARD_WIDTH + 20; // The total width including some margin

        const CARD_MARGIN = 20;
        //const CARD_WIDTH = width - (CARD_MARGIN * 2); // Width of the card including the margins

        const scrollViewRef = useRef(null); // Initialize the ref for the ScrollView

        const [steps, setSteps] = useState(67);
        const [userWeight, setUserWeight] = useState(0); // State to store user weight
        const stepGoal = 15000;

        const [heartRate, setHeartRate] = useState(72); // Initial heart rate set to 60 BPM as an example



        const navigation = useNavigation();

        const handleCustomLogWaterIntake = () => {
            const intakeAmount = parseFloat(customIntakeOz);
            if (!isNaN(intakeAmount) && intakeAmount > 0) {
                setHydration(prevState => ({
                    ...prevState,
                    current: Math.min(prevState.current + intakeAmount, prevState.goal)
                }));
            }
            setCustomIntakeOz(''); // Reset custom input field
        };

        const [progress, setProgress] = useState({
            carbs: 78,
            protein: 100,
            fat: 40,
            caloriesConsumed: 1750,
            caloriesBurned: 500,
          });

          const [carouselItems, setCarouselItems] = useState([
            {
              title: "Make better dieting decisions",
              subtitle: "Dr. Deborah K",
              image: require('./Images/carousel/debz.png'),
            },
            {
              title: "Top 10 meal combinations",
              subtitle: "Chef Jerry I",
              image: require('./Images/carousel/chef.png'),
            },
            {
                title: "Sleep Hygiene for Better Rest",
                subtitle: "Coach Mark. M",
                image: require('./Images/carousel/mark.png'),
            },
            {
                title: "Dieting Dad Jokes",
                subtitle: "Prof. Bill Hughes",
                image: require('./Images/carousel/prof.png'),
            },
            {
                title: "Stress Management Techniques",
                subtitle: "Ms. Christen N",
                image: require('./Images/carousel/christen.png'),
            },
            {
                title: "The Power of Hydration",
                subtitle: "Dr. Jessica L",
                image: require('./Images/carousel/yt-doc.png'),
            },
            {
                title: "Home Workouts for Busy Schedules",
                subtitle: "Coach Kisaku D",
                image: require('./Images/carousel/ben.png'),
            },
            
            
            // Add more items as needed
          ]);
        
          const [activeIndex, setActiveIndex] = useState(0);
        
          useEffect(() => {
            const interval = setInterval(() => {
              let nextIndex = activeIndex + 1 === carouselItems.length ? 0 : activeIndex + 1;
              scrollViewRef.current.scrollTo({x: width * nextIndex, animated: true});
              setActiveIndex(nextIndex);
            }, 5000); // Change item every 5 seconds
        
            return () => clearInterval(interval);
          }, [activeIndex, carouselItems.length]); 

          

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

              useEffect(() => {
                // Increment steps by 43 every 20 minutes
                const interval = setInterval(() => {
                  setSteps((prevSteps) => prevSteps + 43);
                }, 1200000); // 1200000 ms = 20 minutes
              
                // Cleanup function to clear the interval when the component unmounts
                return () => clearInterval(interval);
              }, []);
        

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

              useEffect(() => {
                // Function to fetch user weight
                const fetchUserWeight = async () => {
                    try {
                        // Assuming the userId is stored and accessible
                        const userId = await AsyncStorage.getItem('userId');
                        if (!userId) {
                            console.error('No user ID found, unable to fetch weight');
                            return;
                        }
        
                        const response = await fetch(`http://172.25.74.19:3000/getUserWeight/${userId}`);
                        if (!response.ok) {
                            throw new Error('Failed to fetch user weight');
                        }
                        
                        const data = await response.json();
                        // Assuming the response has a weight field
                        setUserWeight(data.weight);
                    } catch (error) {
                        console.error('Error fetching user weight:', error);
                    }
                };
        
                fetchUserWeight();
            }, []);

            useEffect(() => {
                const calculateNewHeartRate = (currentHeartRate) => {
                    const heartRateChange = Math.floor(Math.random() * 7) - 3; // Random change between -3 and +3
                    let newHeartRate = currentHeartRate + heartRateChange;

                    // Ensure the new heart rate is within the 60-100 range
                    newHeartRate = Math.max(60, Math.min(100, newHeartRate));
                    return newHeartRate;
                };
                

                  // Function to simulate heart rate changes
                    const simulateHeartRate = () => {
                        setHeartRate((currentHeartRate) => calculateNewHeartRate(currentHeartRate));
                    };
            
                  // Set an interval for simulating heart rate changes
                    const interval = setInterval(simulateHeartRate, Math.random() * (10000 - 1000) + 1500); // Randomized

                    // Cleanup function to clear the interval when the component unmounts
                    return () => clearInterval(interval);
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
                
                    <View style={styles.mealCardTextContainer}>
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
    current: 0, // Starting value
    goal: 128, // Daily goal
});

// Functions to increment and decrement hydration level
const handleIncrement = () => 
    {
        setInputIntakeOz(`${Math.max(0, parseInt(inputIntakeOz || '0') + 8)}`); // Prevent negative values and ensure input is treated as a number
    };

const handleDecrement = () => 
    {
        setInputIntakeOz(`${Math.max(0, parseInt(inputIntakeOz || '0') - 8)}`); // Ensure value doesn't go below 0
    };

    const handleLogWaterIntake = () => 
        {
            const intakeAmountOz = parseFloat(inputIntakeOz);
            if (!isNaN(intakeAmountOz) && intakeAmountOz > 0) 
                {
                    setHydration(prevHydration => ({
                        ...prevHydration,
                        current: Math.min(prevHydration.current + intakeAmountOz, prevHydration.goal)
                    }));
                    setInputIntakeOz(''); // Reset input field after logging
                }
        };


          
    
  
  const TodaysActivity = () => 
    {
    
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
                        <ImageBackground
                         source={require('./Animations/hydration.gif')} // The path to your .gif file
                         resizeMode="stretch" // or "stretch"
                        style={styles.gifBackground}
                        >
                        <Text style={styles.hydrationTitle}>Hydration Tracker</Text>

                        <View style={styles.hydrationTrackerContainer}>
                            <View style={styles.circularProgressContainer}>
                                <Progress.Circle
                                     size={100}
                                     progress={hydration.current / hydration.goal}
                                     thickness={10}
                                     color="#6200ee"
                                     unfilledColor="#ddd"
                                     borderWidth={0}

                                    >
                                    
                            
                                        <Text style={styles.circularProgressText}>
                                            {Math.round((hydration.current / hydration.goal) * 100)}%
                                        </Text>


                                    <Text style={styles.circularProgressSubText}>
                                        {hydration.current} / {hydration.goal} oz
                                    </Text>
                                </Progress.Circle>
                            </View>

                            <View style={styles.hydrationControlContainer}>
                                <View style={styles.plusMinusContainer}>
                                    {/* - Button */}
                                    <TouchableOpacity style={styles.hydrationButton} onPress={handleDecrement}>
                                        <AntDesign name="minus" size={24} color="white" />
                                    </TouchableOpacity>

                                <View style={styles.waterIntakeInputContainer}>
                                    <TextInput
                                        style={styles.waterIntakeInput}
                                        onChangeText={setCustomIntakeOz}
                                        value={inputIntakeOz}
                                        keyboardType="numeric"
                                        placeholder="oz"
                                        placeholderTextColor="white"
                                    />
                                </View>

                                    {/* + Button */}
                                    <TouchableOpacity style={styles.hydrationButton} onPress={handleIncrement}>
                                        <AntDesign name="plus" size={24} color="white" />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={styles.logWaterIntakeButton} onPress={handleLogWaterIntake}>
                                    <Text style={styles.logWaterIntakeButtonText}>Log</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        </ImageBackground>
                    </View>



            
                    {/* Health Metrics Section - PT 1 */}
                    
                    <View style={styles.healthMetricsContainer}>
                         {/* Steps */}
                         <View style={styles.stepsCard}>
                            <ImageBackground source={require('./Animations/stepsbg.jpg')} resizeMode="stretch" style={styles.stepsBackground}>
                                <Text style={styles.weightTitle}>Steps</Text>
                                <Image source={require('./Animations/steps.gif')} style={styles.weightIcon}/>
                                <Text style={styles.currentWeightValue}>{steps} / {stepGoal.toLocaleString()}</Text>
                            </ImageBackground>
                        </View>

                        {/* Weight */}
                        <View style={styles.weightCard}>
                            <ImageBackground source={require('./Animations/weightbg.png')} resizeMode="stretch" style={styles.weightBackground}>
                                <Text style={styles.weightTitle}>Weight</Text>
                                <Image source={require('./Animations/weight.gif')} style={styles.weightIcon}/>
                                <Text style={styles.currentWeightValue}>{userWeight ? `${userWeight} lbs` : "Loading..."}</Text>
                            </ImageBackground>
                        </View>
                    </View>

                    {/* Health Metrics Section - PT 2 */}
                    <View style={styles.healthMetricsContainer2}>
                         {/* Heart Rate */}
                         <View style={styles.heartRateCard}>
                            <ImageBackground source={require('./Animations/heartbeatbg.gif')} resizeMode="stretch" style={styles.heartRateBackground}>
                                <Text style={styles.heartRateTitle}>Heart Rate</Text>
                                <Image source={require('./Animations/heartbeat.gif')} style={styles.heartRateIcon}/>
                                <Text style={styles.heartRateValue}>{heartRate} BPM</Text>
                            </ImageBackground>
                        </View>

                        {/* Sleep*/}
                        <View style={styles.heartRateCard}>
                            <ImageBackground source={require('./Animations/sleepbg.gif')} resizeMode="stretch" style={styles.heartRateBackground}>
                                <Text style={styles.heartRateTitle}>Sleep</Text>
                                <Image source={require('./Animations/sleep.gif')} style={styles.heartRateIcon}/>
                                <Text style={styles.heartRateValue}>6.5 hrs</Text>
                            </ImageBackground>
                        </View>
                    </View>

                {/* Carousel */}
                <View style={styles.carouselAreaGen}>
                <Text style={styles.blog}>Blog</Text>
                <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={{width: '100%', height: 200}}
                >
                    <View style={styles.carouselArea}>
                    {carouselItems.map((item, index) => (
                        <View key={index} style={styles.carouselCard}>
                            <View style={styles.imageContainer}>
                                <Image source={item.image} style={styles.carouselImage} />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.carouselTitle}>{item.title}</Text>
                                <Text style={styles.carouselSubtitle}>{item.subtitle}</Text>
                            </View>
                        </View>
                ))}
                    </View>
                </ScrollView>
                </View>
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
    mealCardTextContainer: 
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

    gifBackground: 
        {
            flex: 1, // or width and height to fill the space of the card
            alignItems: 'center', // if you want to center the content
            borderRadius: 30,
            height: 200
        },
    hydrationTitle:
        {
            fontSize: 25,
            fontWeight: 'bold',
            color: 'white',
        },
    hydrationCardContainer: 
        {
            backgroundColor: '#19A8DB',
            borderRadius: 20,
            
            marginRight: 20,
            marginLeft: 20,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
            
           // alignItems: 'center', // Center align items for Android
          },
    hydrationTrackerContainer: 
        {
            flexDirection: 'row', // Align circle and buttons horizontally
            alignItems: 'center', // Center items vertically
            justifyContent: 'space-between', // Use available space between circle and buttons
            marginTop: 10, // Add some space between title and content
          },
    circularProgressContainer: 
        {
            //flex: 3, 
            marginRight: 70,
        },
    circularProgressText: 
        {
            textAlign: 'center',
            fontSize: 16,
            color: 'black',
            fontWeight: 'bold',
            
        },
    plusMinusContainer: 
        {
            flex: 1, // Limit the space for + and - buttons
            justifyContent: 'space-around', // Distribute space around buttons
            alignItems: 'center', // Center buttons vertically
            flexDirection: 'row', // Align circle and buttons horizontally
            
          },
    hydrationButton: 
        {
            marginBottom: 10, // Add space between buttons if needed
            color: 'black',
        },
    waterIntakeInput: 
        {
            backgroundColor: 'rgba(255, 255, 255, 0.2)', // Semi-transparent background
            color: 'black', // Text color
            paddingHorizontal: 10, // Horizontal padding
            paddingVertical: 5, // Vertical padding
            borderRadius: 5, // Rounded corners
            textAlign: 'center', // Center the text
            marginHorizontal: 10, // Space between minus button, input, and plus button
            width: 60, // Set a fixed width for the input box
        },
    logWaterIntakeButton:
        {
            borderRadius: 20,
            backgroundColor: 'white',
            padding: 10,
            alignItems: 'center'
        },
    logWaterIntakeButtonText:
        {
            fontWeight: 'bold',
        },
    healthMetricsContainer: 
        {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 20,
            alignItems: 'center',
        },
    stepsCard:
        {
            padding: 10,
            alignItems: 'center', // This ensures vertical centering within the stepsCard
            justifyContent: 'center',
            overflow: 'hidden', 
            
        },
    stepsTitle:
        {
            marginTop: 10,
            fontWeight: 'bold',
            color: 'white',
            fontSize: 30,
            textAlign: 'center',
        },
    numberOfSteps:
        {
            color: 'white',
            fontSize: 30,
            textAlign: 'center',
            marginBottom: 10,
            fontWeight: 'bold'
        },
    stepsBackground:
        {
            borderRadius: 30,
            overflow: 'hidden', 
            
        },
    stepsIcon:
        {
            height: 120,
            width: 150,
        },
    weightCard:
        {
            //borderRadius: 30,
            padding: 10,
            alignItems: 'center', // This ensures vertical centering within the stepsCard
            justifyContent: 'center',
            overflow: 'hidden', 
        },
    weightTitle:
        {
            marginTop: 10,
            fontWeight: 'bold',
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
        },
    currentWeightValue:
        {
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 10,
        },
    weightIcon:
        {
            height: 120,
            width: 150,
        },
    weightBackground:
        {
            borderRadius: 30,
            overflow: 'hidden', 
            
        },
    healthMetricsContainer2: 
        {
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 2,
            alignItems: 'center',

            
        },
    heartRateCard:
        {
            //borderRadius: 30,
            padding: 10,
            alignItems: 'center', // This ensures vertical centering within the stepsCard
            justifyContent: 'center',
            overflow: 'hidden', 
        },
    heartRateTitle:
        {
            marginTop: 10,
            fontWeight: 'bold',
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
        },
    heartRateValue:
        {
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
            marginBottom: 10,
        },
    heartRateIcon:
        {
            height: 120,
            width: 150,
        },
    heartRateBackground:
        {
            borderRadius: 30,
            overflow: 'hidden', 
            
        },
    blog:
        {
            fontWeight: 'bold',
            fontSize: 30,
            textAlign: 'left',
            marginLeft: 80,
            marginTop: 40,
            marginBottom: 20
        },
    carouselArea: 
        {
            flex: 1,
            flexDirection: 'row', // Lay out the cards in a row

        },
    carouselCard: 
        {
            flexDirection: 'row', // Lay out the children (image and text container) in a row
            backgroundColor: '#FFF',
            borderRadius: 10,
            width: width - 40, // Adjust the width as necessary
            margin: 20,
            padding: 10,
            alignItems: 'center', // Center items vertically within the card
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          },
    carouselImage: 
        {
            width: 150, // Adjust width as necessary
            height: 200, // Adjust height as necessary, maintaining aspect ratio
            resizeMode: 'cover',
            borderRadius: 8, // Optional: if you want rounded corners for the images
            marginRight: 10, // Space between the image and the text
            resizeMode: 'cover'
          },
    textContainer: 
          {
            flex: 1, // Take up the remaining space
            alignItems: 'flex-start', // Align text to the start (left) side
          },
    carouselTitle: 
        {
            color: '#000', // Text color
            fontWeight: 'bold', // Bold font weight
            marginTop: 10, // Margin top for spacing
        },
    carouselSubtitle: 
        {
            color: '#667', // Subtitle text color
            marginTop: 5, // Margin top for spacing
        },

            
    });
  

export default HomeScreen;
