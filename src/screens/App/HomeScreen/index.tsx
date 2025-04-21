import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import SearchBar from '../../../components/SearchBar';
import VendorCard from '../../../components/VendorCard';
import BookingCard from '../../../components/BookingCard';
import images from '../../../assets/images';
import {screen} from '../../../utils/constants';
import useStyles from './style';
import {NavigationProp} from '@react-navigation/native';
import icons from '../../../assets/icons';
import {setIsLoggedIn} from '../../../store/reducer/user';
import {useDispatch} from 'react-redux';
import FilterDropdownButton from '../../../components/FilterButtons';
import api from '../../../utils/api';
import apiEndPoints from '../../../constants/apiEndPoints';
import CustomBidCard from '../../../components/CustomBidCard';
import GenericModal from '../../../components/Modal';
import CustomRequestModal from '../../../components/CustomServiceRequest';

const vendors = [
  {
    id: '1',
    image: images.DUMMY_VENDOR,
    name: 'Ali Decor & Events',
    rating: 4.8,
    onPress: () => {},
  },
  {
    id: '2',
    image: images.DUMMY_VENDOR,
    name: 'GreenLeaf Caterers',
    rating: 4.5,
    onPress: () => {},
  },
  {
    id: '3',
    image: images.DUMMY_VENDOR,
    name: 'PakTech Solutions',
    rating: 4.7,
    onPress: () => {},
  },
  {
    id: '4',
    image: images.DUMMY_VENDOR,
    name: 'Noor Wedding Planners',
    rating: 4.3,
    onPress: () => {},
  },
];

const bookings = [
  {
    id: '1',
    service: 'Stage Decoration',
    vendor: 'Ali Decor & Events',
    date: 'May 1, 2024',
    image: images.VENDOR,
  },
  {
    id: '2',
    service: 'Catering Services',
    vendor: 'GreenLeaf Caterers',
    date: 'April 30, 2024',
    image: images.VENDOR,
  },
];

interface HomeScreenProps {
  navigation: NavigationProp<any>;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedService, setSelectedService] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const {styles} = useStyles();
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
      <TouchableOpacity
        onPress={
          // () => {
          // dispatch(setIsLoggedIn(false));
          // }
          handleLogout
        }>
        <Image
          source={icons.LOGOUT}
          style={{
            width: 24,
            height: 24,
            marginLeft: screen.width * 0.05,
            marginTop: screen.height * 0.03,
            tintColor: '#000',
          }}
        />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <SearchBar />
        <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
          <FilterDropdownButton
            label="Service Type"
            selectedValue={selectedService}
            options={[
              'Birthday Party',
              'Wedding',
              'Corporate Event',
              'Baby Shower',
              'Anniversary',
            ]}
            onSelect={value => setSelectedService(value)}
          />
          <FilterDropdownButton
            label="Location"
            selectedValue={selectedLocation}
            options={['Karachi', 'Lahore', 'Islamabad']}
            onSelect={value => setSelectedLocation(value)}
          />
          <FilterDropdownButton
            label="Price Range"
            selectedValue={selectedPriceRange}
            options={[
              '$0 - $50',
              '$51 - $100',
              '$101 - $200',
              '$201 - $500',
              '$501+',
            ]}
            onSelect={value => setSelectedPriceRange(value)}
          />
          <FilterDropdownButton
            label="Rating"
            selectedValue={selectedRating}
            options={['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars']}
            onSelect={value => setSelectedRating(value)}
          />
        </View>
        <Text style={styles.heading}>Welcome</Text>
        <CustomBidCard
          type="Custom Bid"
          price="Start Bid"
          delivery=""
          isNegotiable={true}
          onPress={() => {
            setIsModalVisible(true);
          }}
        />

        <Text style={styles.subHeading}>Featured Vendors</Text>
        <FlatList
          data={vendors}
          renderItem={({item}) => (
            <VendorCard
              onPress={() => {
                navigation.navigate('VendorProfile');
              }}
              image={item.image}
              name={item.name}
              rating={item.rating}
            />
          )}
          keyExtractor={item => item.id}
          numColumns={2}
        />

        <Text style={styles.subHeading}>Recent Bookings</Text>
        <FlatList
          contentContainerStyle={{paddingBottom: screen.height * 0.15}}
          data={bookings}
          renderItem={({item}) => (
            <BookingCard
              service={item.service}
              vendor={item.vendor}
              date={item.date}
              image={item.image}
            />
          )}
          keyExtractor={item => item.id}
        />
      </ScrollView>
      <GenericModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <CustomRequestModal onClose={() => setIsModalVisible(false)} />
      </GenericModal>
    </>
  );
};

export default HomeScreen;
