import React, { useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');
const SWIPE_THRESHOLD = 120;

// Dummy user data
const users = [
  { id: 1, name: 'Sarah', age: 28, location: 'New York', image: 'https://images.unsplash.com/photo-1542596594-649edbc13630?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 2, name: 'Mike', age: 32, location: 'Los Angeles', image: 'https://images.unsplash.com/photo-1623140922112-9cfc0e71b8fc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 3, name: 'Emma', age: 24, location: 'Chicago', image: 'https://images.unsplash.com/photo-1525186402429-b4ff38bedec6?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 4, name: 'Malin', age: 34, location: 'Washington', image: 'https://images.unsplash.com/photo-1541271696563-3be2f555fc4e?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 5, name: 'Josefin', age: 19, location: 'Stockholm', image: 'https://images.unsplash.com/photo-1482849297070-f4fae2173efe?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 6, name: 'Lili', age: 29, location: 'Malmö', image: 'https://plus.unsplash.com/premium_photo-1681484107381-808444daec7e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 7, name: 'Albert', age: 26, location: 'Täby', image: 'https://images.unsplash.com/photo-1581843046438-8a502f9719fc?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 8, name: 'Robert', age: 35, location: 'Solna', image: 'https://images.unsplash.com/photo-1529068755536-a5ade0dcb4e8?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: 9, name: 'Jenni', age: 22, location: 'Köping', image: 'https://plus.unsplash.com/premium_photo-1664464230004-9b2aeb86d6b4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
];

const MatchingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const translateX = useSharedValue(0);

  // Function to handle swipe direction
  const handleSwipe = useCallback((direction) => {
    if (currentIndex < users.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      Alert.alert("No more users to show!");
    }
    translateX.value = withSpring(0);
  }, [currentIndex]);

  // Gesture handler function
  const gestureHandler = (event) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      translateX.value = event.nativeEvent.translationX;
    } else if (event.nativeEvent.state === State.END) {
      if (translateX.value < -SWIPE_THRESHOLD) {
        translateX.value = withSpring(-width);
        runOnJS(handleSwipe)('left');
      } else if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withSpring(width);
        runOnJS(handleSwipe)('right');
      } else {
        translateX.value = withSpring(0);
      }
    }
  };

  // Animated style for card
  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  // Render the current user card
  const renderCard = () => {
    const user = users[currentIndex];
    return (
      <Animated.View style={[styles.card, cardStyle]}>
        <Image source={{ uri: user.image }} style={styles.image} />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{user.name}, {user.age}</Text>
          <Text style={styles.location}>{user.location}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with logo and profile image */}
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} />
        <Image source={require('../../assets/profile.jpg')} style={styles.profileImage} />
      </View>

      <PanGestureHandler onGestureEvent={gestureHandler} onHandlerStateChange={gestureHandler}>
        {renderCard()}
      </PanGestureHandler>
      <View style={styles.buttonsContainer}>
        <View style={[styles.button, styles.passButton]}>
          <Ionicons name="close" size={30} color="white" />
        </View>
        <View style={[styles.button, styles.likeButton]}>
          <Ionicons name="heart" size={30} color="white" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10, // Increased vertical padding
    paddingHorizontal: 10,
    backgroundColor: 'white',
    position: 'absolute', // Fixed position at the top
    top: 0,
  },
  logo: {
    width: 50, // Adjust width as necessary
    height: 50,  // Adjust height as necessary
    resizeMode: 'contain',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  card: {
    width: width * 0.9,
    height: height * 0.7,
    borderRadius: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'absolute',
    bottom:60,
  },
  image: {
    width: '100%',
    height: '80%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  userInfo: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    position: 'absolute',
    bottom: 150,
  },
  button: {
    width: 70, // Increased width for larger buttons
    height: 70, // Increased height for larger buttons
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  passButton: {
    backgroundColor: '#999',
  },
  likeButton: {
    backgroundColor: '#FF1493',
  },
});

export default MatchingScreen;
