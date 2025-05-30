import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthStackParamList} from './navigatorParams';
import Home from '../screens/App/Home';
import Login from '../screens/Auth/Login';
import Signup from '../screens/Auth/Signup';
import HomeScreen from '../screens/App/HomeScreen';
import VendorProfileScreen from '../screens/App/VendorProfile';
import AvailableBids from '../screens/App/AvailableBids';

//Screens

//bottom tab

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}
export default AuthStack;
