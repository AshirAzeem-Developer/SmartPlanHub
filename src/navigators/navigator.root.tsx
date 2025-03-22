import React, {useState} from 'react';

// react navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {AuthStack} from './navigator.auth';
import AppStack from './navigator.app';

// navigation imports
// import ServiceProvider from './navigator.provider';
// import {AuthStack} from './navigator.auth';
// import {useUserSelector} from '../store/reducer/user';

// import ServiceSeeker from './navigator.seeker';
// import {Role} from '../constants/enums/applicationRoleEnums';
// import CustomSplash from './CustomSplash';

function RootNav() {
  const isAuthenticated = true;
  //   const user = useUserSelector();
  //   const [isSplashVisible, setIsSplashVisible] = useState(true);
  return <>{isAuthenticated ? <AppStack /> : <AuthStack />}</>;
}

export default RootNav;
