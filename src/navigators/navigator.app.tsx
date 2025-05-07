import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateBottomTabs from './CreateBottomTabs';
import Home from '../screens/App/Home';
import icons from '../assets/icons';
import {AppStackParamsList} from './navigatorParams';
import AvailableBids from '../screens/App/AvailableBids';
import Settings from '../screens/App/Settings';
import HomeScreen from '../screens/App/HomeScreen';
import VendorProfileScreen from '../screens/App/VendorProfile';
import ChatScreen from '../screens/Vendor/ChatScreen';

const Stack = createNativeStackNavigator<AppStackParamsList>();

// function ProfileStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//       initialRouteName="Profile">
//       <Stack.Screen name="Profile" component={Profile} />
//       <Stack.Screen name="EditProfile" component={EditProfile} />
//     </Stack.Navigator>
//   );
// }
// function BookingStack() {
//   const userType = useSelector(
//     (state: any) => state?.user?.user?.user?.roleType,
//   );
//   return (
//     <>
//       <CreateTopTabs
//         initialRouteName="Approved"
//         screens={[
//           {
//             name: userType !== 'seeker' ? 'All Bookings' : 'Approved',
//             Component: Approved,
//             label: userType !== 'seeker' ? 'All Bookings' : 'Approved',
//           },
//           {
//             name: userType !== 'seeker' ? 'Accepted ' : 'Pending',
//             Component: Pending,
//             label: userType !== 'seeker' ? 'Accepted ' : 'Pending',
//           },
//           {
//             name: userType !== 'seeker' ? 'Rejected' : 'Cancelled',
//             Component: Cancel,
//             label: userType !== 'seeker' ? 'Rejected' : 'Cancelled',
//           },
//         ]}
//         key={'BookingStack'}
//       />
//     </>
//   );
// }
// function ChatStack() {
//   return (
//     <>
//       <Stack.Navigator
//         screenOptions={{
//           headerShown: false,
//         }}
//         initialRouteName="Chat">
//         <Stack.Screen name="Chat" component={Chat} />
//         <Stack.Screen name="Chatlist" component={Chatlist} />
//       </Stack.Navigator>
//     </>
//   );
// }

// const BottomTabs = () => {
//   return (
//     <CreateBottomTabs
//       initialRouteName="Home"
//       screens={[
//         {
//           name: 'Home',
//           Component: Home,
//           icon: icons.HOME_TAB,
//           selectedIcon: icons.HOME_TAB_ACTIVE,
//           label: 'Home',
//         },
//         {
//           name: 'Bookings',
//           Component: BookingStack,
//           icon: icons.BOOKINGS_TAB,
//           selectedIcon: icons.BOOKINGS_TAB_ACTIVE,
//           label: 'Bookings',
//         },
//         {
//           name: 'Messages',
//           Component: ChatStack,
//           icon: icons.MESSAGE_TAB,
//           selectedIcon: icons.MESSAGE_TAB_ACTIVE,
//           label: 'Messages',
//         },
//         {
//           name: 'Profile',
//           Component: ProfileStack,
//           icon: icons.PROFILE_TAB,
//           selectedIcon: icons.PROFILE_TAB_ACTIVE,
//           label: 'Profile',
//         },
//       ]}
//     />
//   );
// };

const BottomTabs = () => {
  return (
    <CreateBottomTabs
      initialRouteName="Home"
      screens={[
        {
          name: 'Home',
          Component: Home,
          icon: icons.SMART_PLAN_HUB_LOGO,
          selectedIcon: icons.SMART_PLAN_HUB_LOGO,
          label: 'Home',
        },
        {
          name: 'Settings',
          Component: Settings,
          icon: icons.LOGOUT,
          selectedIcon: icons.SMART_PLAN_HUB_LOGO,
          label: 'Settings',
        },
      ]}
    />
  );
};

function AppStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HomeScreen">
      {/* <Stack.Screen name="HomeTabs" component={BottomTabs} /> */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="AvailableBids" component={AvailableBids} />
      <Stack.Screen name="VendorProfile" component={VendorProfileScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default AppStack;
