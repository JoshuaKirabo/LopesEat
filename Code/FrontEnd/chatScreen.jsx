import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ImageBackground, UIManager, LayoutAnimation, Platform, ActivityIndicator } from 'react-native';
import TypingIndicator from './TypingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';



if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

const ChatScreen = () => {
  const [messages, setMessages] = useState([]); // State to store chat messages
  const [inputMessage, setInputMessage] = useState(''); // State to handle user input
  const flatListRef = useRef();
  const [isTyping, setIsTyping] = useState(false);
  const [chatPartner, setChatPartner] = useState('Gym Bro Thunder');
  const [isLoading, setIsLoading] = useState(false);
  const backgroundImage = require('./Images/Sign-In-Background.png');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId');
        if (storedUserId !== null) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error('AsyncStorage error: ', error);
      }
    };
    fetchUserId();
  }, []);


  // For Debugging purposes
  const saveUserId = async () => {
    try {
      await AsyncStorage.setItem('userId', '66'); // '66' is stored as a string
      console.log('UserId has been saved to AsyncStorage');
    } catch (error) {
      console.error('Error saving UserId to AsyncStorage:', error);
    }
  };



    useEffect(() => 
        {
            const welcomeMessage = {text: "Hi! I'm Gym Bro Thunder! Ask me which exercises you can do to compliment your diet!", isUser: false};
            setMessages([welcomeMessage]);
        }, []);

    const scrollToBottom = () => 
        {
            flatListRef.current?.scrollToEnd({ animated: true });
        };

  // Function to handle sending messages
  const sendMessage = async () => 
    {
        if (inputMessage.trim() === '') return;

         

        const userMessage = { text: inputMessage, isUser: true };

         // Slide effect for sending a message
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputMessage('');
        
        scrollToBottom(); // Scroll to bottom when a new message is sent
        setIsTyping(true);

        // Sending the message to the back end 
        try 
            {
                setTimeout(async () => 
                    {
                        const response = await fetch('http://172.25.74.19:3000/sendMessage/', {method: 'POST',headers: {'Content-Type': 'application/json',},body: JSON.stringify({ message: inputMessage, userId: userId }),});
                        const data = await response.json();
                        setIsTyping(false); // Stop showing typing indicator
                        //saveUserId();
                        handleBotResponse(data.message); 
                    }, 2000);
            } 
        catch (error) 
            {
                setIsTyping(false); // Ensure typing indicator is hidden on error
                console.error('Error sending message:', error);
            }
  };

    const simulateTyping = () => 
        {
            setIsTyping(true);
            // Set a timeout for how long the typing indicator should be shown
            setTimeout(() => 
                {
                setIsTyping(false);
                }, 2000); // For example, show typing indicator for 2 seconds
        };

    const handleBotResponse = (botMessage) => 
        {
            const botReply = { text: botMessage, isUser: false };
            setMessages(prevMessages => [...prevMessages, botReply]);
        };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundContainer}>
         <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>{chatPartner}</Text>
        {/* You can add more elements to the header if needed */}
      </View>
    <SafeAreaView style={styles.container}>
      {/* Display chat messages */}
     
    {/* Rest of your component */}

      {/* Chat header */}
     

      <FlatList
       ref={flatListRef}
        data={messages}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.isUser ? styles.userMessage : styles.botMessage]}>
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()} 
        ListFooterComponent={isTyping ? <TypingIndicator /> : null}
        contentContainerStyle={{ paddingBottom: 50 }}

      />
      {/* Input field for typing messages */}
{/* Input field and send button */}
<View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message..."
          value={inputMessage}
          onChangeText={setInputMessage}
          onSubmitEditing={sendMessage}

        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: 
    {
        flex: 1,
        backgroundColor: '#FDF5EE',
        paddingHorizontal: 16,
        paddingTop: 30,
        paddingBottom: 100,
    },
  messageContainer: 
    {
        maxWidth: '80%',
        marginVertical: 8,
        padding: 12,
        borderRadius: 8,
        margin:20,
    },
  userMessage: 
    {
        alignSelf: 'flex-end',
        backgroundColor: '#522398',
        borderRadius: 30,
    },
  botMessage: 
    {
        alignSelf: 'flex-start',
        backgroundColor: '#848884',
        borderRadius: 30,
        paddingLeft: 20,
    },
  messageText: 
    {
        fontSize: 16,
        color: 'white',
        
        
    },
  inputContainer: 
    {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginRight: 8,
        marginLeft: 20,
        paddingHorizontal: 8, // Add some horizontal padding within the container
        backgroundColor: '#FFFFFF', // Make the background color same as input field
        borderRadius: 30, // Same border radius as the input field for rounded corners
        borderBlockColor: 'black',
        marginBottom: Platform.select({ ios: 20, android: 0 })
    },
  input: 
    {
        flex: 1,
        backgroundColor: '#FFFFFF', // Keeping the input field white
        borderTopLeftRadius: 30, // Only round the left corners for the input
        borderBottomLeftRadius: 30,
        paddingVertical: 15,
        paddingLeft: 16,
        paddingRight: 0, // Removin
    },
  sendButton: 
    {
        backgroundColor: '#522398',
        borderTopRightRadius: 30, // Only round the right corners for the send button
        borderBottomRightRadius: 30,
        borderRadius: 30,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
  sendButtonText: 
    {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    typingIndicatorContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
      },
      headerContainer: {
        width: '100%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 5,
        borderBottomColor: '#ccc',
        backgroundColor: 'transparent',
        marginTop: 60,
      },
      headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
      },
      backgroundContainer: {
        flex: 1,
      },
});

export default ChatScreen;
