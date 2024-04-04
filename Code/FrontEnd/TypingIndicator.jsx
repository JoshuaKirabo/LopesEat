import React from 'react';
import { View, Text, Animated, Easing, StyleSheet } from 'react-native';

class TypingIndicator extends React.Component {
  dot1 = new Animated.Value(0);
  dot2 = new Animated.Value(0);
  dot3 = new Animated.Value(0);

  componentDidMount() {
    this.animateDots();
  }

  animateDots = () => {
    const createAnimation = (value) => {
      return Animated.timing(value, {
        toValue: 1,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      });
    };

    const createSequence = (value) => {
      return Animated.sequence([
        Animated.delay(200),
        createAnimation(value),
        Animated.delay(200),
        Animated.timing(value, {
          toValue: 0,
          duration: 300,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ]);
    };

    Animated.loop(
      Animated.stagger(300, [
        createSequence(this.dot1),
        createSequence(this.dot2),
        createSequence(this.dot3),
      ])
    ).start();
  };

  renderDot = (animValue) => {
    // Use the animValue to create an animated style for the dot
    const animatedStyle = {
      opacity: animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 1],
      }),
      transform: [
        {
          scale: animValue.interpolate({
            inputRange: [0, 1],
            outputRange: [0.7, 1],
          }),
        },
      ],
    };

    return <Animated.View style={[styles.dot, animatedStyle]} />;
  };

  render() {
    return (
      <View style={styles.typingIndicatorContainer}>
        <View style={styles.messageBubble}>
          {this.renderDot(this.dot1)}
          {this.renderDot(this.dot2)}
          {this.renderDot(this.dot3)}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    margin: 2,
  },
  messageBubble: {


    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin:20,
    alignSelf: 'flex-start',
    backgroundColor: '#848884',
    borderRadius: 30,
    paddingLeft: 20,
  },
  typingIndicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
  },
});

export default TypingIndicator;
