import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RoleSelectionScreen from '../screens/RoleSelectionScreen';
import PatientChatScreen from '../screens/PatientChatScreen';
import DoctorDashboardScreen from '../screens/DoctorDashboardScreen';
import ReportReviewScreen from '../screens/ReportReviewScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="RoleSelection"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#2563EB',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="RoleSelection" 
        component={RoleSelectionScreen} 
        options={{ title: 'Doctor Patient Room', headerShown: false }}
      />
      <Stack.Screen 
        name="PatientChat" 
        component={PatientChatScreen} 
        options={{ title: 'AI Triage Assistant' }}
      />
      <Stack.Screen 
        name="DoctorDashboard" 
        component={DoctorDashboardScreen} 
        options={{ title: 'Doctor Dashboard' }}
      />
      <Stack.Screen 
        name="ReportReview" 
        component={ReportReviewScreen} 
        options={{ title: 'Review Report' }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
