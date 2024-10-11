import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // For icons

// Import your screens
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = 'heart-outline'; // Change to outline version
            } else if (route.name === 'Chat') {
              iconName = 'chatbubble-outline'; // Change to outline version
            } else if (route.name === 'Profile') {
              iconName = 'person-outline'; // Change to outline version
            } else if (route.name === 'Settings') {
              iconName = 'settings-outline'; // Change to outline version
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#e91e63',  // Active tab color (pink)
          tabBarInactiveTintColor: 'gray',   // Inactive tab color
          headerShown: false,  // Hide the header
        })}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ tabBarLabel: () => null }} 
        />
        <Tab.Screen 
          name="Chat" 
          component={ChatScreen} 
          options={{ tabBarLabel: () => null }} 
        />
        <Tab.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ tabBarLabel: () => null }} 
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ tabBarLabel: () => null }} 
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
