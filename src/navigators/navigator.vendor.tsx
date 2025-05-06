import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import CreateBottomTabs from './CreateBottomTabs';
import VendorHome from '../screens/Vendor/VendorHome';
import icons from '../assets/icons';
import {AppStackParamsList, DrawerParamList} from './navigatorParams';
import Settings from '../screens/Vendor/Settings';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {Image} from 'react-native';
import {useDispatch} from 'react-redux';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {screen} from '../utils/constants';
import {setIsLoggedIn} from '../store/reducer/user';
import ServiceManagementScreen from '../screens/Vendor/ServiceManagement';
import BookingManagementScreen from '../screens/Vendor/BookingManagement';
import BiddingManagementScreen from '../screens/Vendor/BiddingManagement';
import RatingsAndReviewsScreen from '../screens/Vendor/RatingsAndReviews';
import AdminDashboardScreen from '../screens/Vendor/AdminDashboard';
import Chat from '../screens/Vendor/Chatting';
import ChatList from '../screens/Vendor/ChatList';
import CustomHeader from '../components/CustomHeader/CustomHeader';
import api from '../utils/api';
import apiEndPoints from '../constants/apiEndPoints';
import ChatScreen from '../screens/Vendor/ChatScreen';
import MessagedUsersScreen from '../screens/Vendor/MessagedUserScreen';

const Stack = createNativeStackNavigator<AppStackParamsList>();
const Drawer = createDrawerNavigator();
const BottomTabs = () => {
  return (
    <CreateBottomTabs
      initialRouteName="VendorHome"
      screens={[
        {
          name: 'VendorHome',
          Component: VendorHome,
          icon: icons.SMART_PLAN_HUB_LOGO,
          selectedIcon: icons.SMART_PLAN_HUB_LOGO,
          label: 'VendorHome',
        },
        {
          name: 'Settings',
          Component: Settings,
          icon: icons.SMART_PLAN_HUB_LOGO,
          selectedIcon: icons.SMART_PLAN_HUB_LOGO,
          label: 'Settings',
        },
      ]}
    />
  );
};
function CustomDrawerContent(props: DrawerContentComponentProps) {
  const navigation = useNavigation<NavigationProp<any>>();

  const dispatch = useDispatch();

  const handleLogout = async () => {
    api
      .get(apiEndPoints.LOGOUT)
      .then(res => {
        console.log('Logout Response:', res.data);
        if (res.data.status === 'success') {
          dispatch(setIsLoggedIn(false));
        } else {
          console.log('Logout Failed:', res.data.message);
        }
      })
      .catch(error => {
        console.log('Logout Error:', error);
      });
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Logout"
          icon={() => (
            <Image
              tintColor={'black'}
              source={icons.LOGOUT}
              width={20}
              height={20}
              style={{
                width: 24,
                height: 24,
              }}
            />
          )}
          onPress={handleLogout}
          labelStyle={{color: 'black', fontSize: 16}}
        />
      </DrawerContentScrollView>
    </>
  );
}
const MessageStack = createNativeStackNavigator();

const MessagesStack = () => {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen
        name="ChatList"
        component={ChatList}
        options={{
          header: () => <CustomHeader title="Messages" showMenu />,
        }}
      />
      <MessageStack.Screen
        name="Chat"
        component={Chat}
        options={({route}: any) => ({
          header: () => (
            <CustomHeader
              showBackButton
              titleStyles={{
                textAlign: 'left',
              }}
              title={route.params?.userName || 'Chat'}
            />
          ),
        })}
      />
    </MessageStack.Navigator>
  );
};
type ChatScreenProps = NativeStackScreenProps<DrawerParamList, 'ChatScreen'>;
const ChatStack = () => {
  return (
    <MessageStack.Navigator>
      <MessageStack.Screen
        name="MessagedUserScreen"
        component={MessagedUsersScreen}
        options={{
          headerShown: false,
        }}
      />
      <MessageStack.Screen
        name="ChatScreen"
        component={ChatScreen as any} // ✅ now typed correctly
        options={{
          headerShown: false,
        }}
      />
    </MessageStack.Navigator>
  );
};

function VendorStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'grey',

        drawerInactiveTintColor: 'Black',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'normal',
        },
      }}
      drawerContent={(props: any) => <CustomDrawerContent {...props} />}
      initialRouteName="Home">
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={icons.HOME}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          drawerLabel: 'Home',
        }}
        name="Home"
        component={VendorHome}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={icons.SETTINGS}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          drawerLabel: 'Service Management',
        }}
        name="ServiceManagement"
        component={ServiceManagementScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={icons.CALENDAR}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          drawerLabel: 'Booking Management',
        }}
        name="BookingManagement"
        component={BookingManagementScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={icons.BOLT}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          drawerLabel: 'Bidding Management',
        }}
        name="BiddingManagement"
        component={BiddingManagementScreen}
      />
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={icons.CUSTOMER_REVIEW}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          drawerLabel: 'Ratings and Review Management',
        }}
        name="RatingsAndReviewManagement"
        component={RatingsAndReviewsScreen}
      />
      {/* <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={icons.ADMIN}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          drawerLabel: 'Admin Dashboard',
        }}
        name="AdminDashboard"
        component={AdminDashboardScreen}
      /> */}
      <Drawer.Screen
        options={{
          drawerIcon: () => (
            <Image
              source={icons.CHAT}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
          drawerLabel: 'Messages',
        }}
        name="Messages"
        component={() => <ChatStack />}
      />
    </Drawer.Navigator>
  );
}

export default VendorStack;
