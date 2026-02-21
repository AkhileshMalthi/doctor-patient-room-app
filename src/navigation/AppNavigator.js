import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/LandingScreen';
import PatientHomeScreen from '../screens/PatientHomeScreen';
import PatientChatScreen from '../screens/PatientChatScreen';
import DoctorDashboardScreen from '../screens/DoctorDashboardScreen';
import DoctorDetailScreen from '../screens/DoctorDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Landing"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Landing"
        component={LandingScreen}
      />
      <Stack.Screen
        name="PatientHome"
        component={PatientHomeScreen}
      />
      <Stack.Screen
        name="PatientChat"
        component={PatientChatScreen}
      />
      <Stack.Screen
        name="DoctorDashboard"
        component={DoctorDashboardScreen}
      />
      <Stack.Screen
        name="DoctorDetail"
        component={DoctorDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
