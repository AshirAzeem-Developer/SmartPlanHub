import {createNativeStackNavigator} from '@react-navigation/native-stack';
import CreateBottomTabs from './CreateBottomTabs';
import VendorHome from '../screens/Vendor/VendorHome';
import icons from '../assets/icons';
import {AppStackParamsList} from './navigatorParams';
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
    dispatch(setIsLoggedIn(false));
  };

  return (
    <>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          style={{
            position: 'absolute',
            bottom: -screen.height * 0.8,
            left: 0,
            right: 0,
            backgroundColor: 'white',
          }}
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
function VendorStack() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'black',

        drawerInactiveTintColor: 'green',
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: 'normal',
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}
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

      {/* <Stack.Screen name="ProfileSettings" component={ProfileSettings} /> */}
      {/* <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen
        name="NotificationSettings"
        component={NotificationSetting}
      />
      <Stack.Screen name="Support" component={Support} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="WorkDetails" component={WorkDetails} />
      <Stack.Screen name="ProfileDetail" component={ProfileDetail} />
      <Stack.Screen name="OrderSummary" component={OrderSummary} />
      <Stack.Screen name="StartStopWorking" component={StartStopWorking} />
      <Stack.Screen name="ChatOpen" component={ChatOpen} />
      <Stack.Screen name="AllProviders" component={AllProviderCards} />
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Review" component={AddReviewScreen} />

      <Stack.Screen name="Language" component={Language} /> */}
    </Drawer.Navigator>
  );
}

export default VendorStack;
