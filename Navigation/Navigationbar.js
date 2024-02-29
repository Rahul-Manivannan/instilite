
// export default Navigationbar;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import screens correctly
import CalendarScreen from './Screens/Calender'; // Corrected import name
import PersonalProfileScreen from './Screens/PersonalProfile'; // Corrected import name
import ClubsScreen from './Screens/Clubs'; // Corrected import name

const Tab = createBottomTabNavigator();

const Navigationbar = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Calendar" // Use string directly
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Calender') {
              iconName = focused ? 'calendar' : 'calendar-outline';
            } else if (route.name === 'PersonalProfile') {
              iconName = focused ? 'person' : 'person-outline';
            } else if (route.name === 'Clubs') {
              iconName = focused ? 'search' : 'search-outline';
              // Use the imported image for the "Clubs" tab
              return <Ionicons name={iconName} size={size} color={color} />;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: '#36454F', // Darker color for active tab
          inactiveTintColor: '#A3B1A7', // Lighter color for inactive tab
          labelStyle: { fontSize: 12, marginBottom: 5 }, // Adjusted label style
          style: { backgroundColor: '#E2ECD6', height: 70, borderTopWidth: 1, borderTopColor: '#BBC7AC' }, // Background color and height
        }}
      >
        <Tab.Screen name="Calendar" component={CalendarScreen} />
        <Tab.Screen name="PersonalProfile" component={PersonalProfileScreen} />
        <Tab.Screen name="Clubs" component={ClubsScreen} />

      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default Navigationbar;
