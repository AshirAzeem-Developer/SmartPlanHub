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
import AdminDashboardScreen from '../screens/Vendor/AdminDashboard';

const Stack = createNativeStackNavigator<AppStackParamsList>();

function AdminStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="AdminDashboard">
      <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
    </Stack.Navigator>
  );
}

export default AdminStack;
