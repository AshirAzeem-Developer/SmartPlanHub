import React from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../../../components/SearchBar';
import FilterButtons from '../../../components/FilterButtons';
import PricingCard from '../../../components/PricingCard';
import VendorProfile from '../../../components/VendorProfileCard';
import PortfolioCard from '../../../components/PortfolioCard';
import ReviewCard from '../../../components/ReviewsCard';
import useStyles from './style';
import images from '../../../assets/images';
import {screen} from '../../../utils/constants';
import icons from '../../../assets/icons';
import {useDispatch} from 'react-redux';
import {setIsLoggedIn, setUserType} from '../../../store/reducer/user';

const Settings: React.FC = ({navigation}: any) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    // Perform logout logic here
    dispatch(setIsLoggedIn(false));
    console.log('Logout button pressed');
  };

  return (
    <>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This is the Settings Screen</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Image
            alt="Logout"
            source={icons.LOGOUT}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default Settings;
