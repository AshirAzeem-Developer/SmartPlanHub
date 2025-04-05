import React, {useState} from 'react';

// react navigation
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './navigator.auth';
import AppStack from './navigator.app';
import {useSelector} from 'react-redux';
import VendorStack from './navigator.vendor';

// navigation imports
// import ServiceProvider from './navigator.provider';
// import {AuthStack} from './navigator.auth';
// import {useUserSelector} from '../store/reducer/user';

// import ServiceSeeker from './navigator.seeker';
// import {Role} from '../constants/enums/applicationRoleEnums';
// import CustomSplash from './CustomSplash';

function RootNav() {
  const isAuthenticated = false;

  const user = useSelector((state: any) => state.user);
  console.log('This is the user type =>', user);
  const [isSplashVisible, setIsSplashVisible] = useState(true);
  return (
    <>
      {user.isLoggedIn ? (
        user?.userType === 'user' ? (
          <AppStack />
        ) : (
          <VendorStack />
        )
      ) : (
        <AuthStack />
      )}
    </>
  );
}

export default RootNav;
