import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import SearchBar from '../../../components/SearchBar';
import FilterButtons from '../../../components/FilterButtons';
import VendorProfile from '../../../components/VendorProfileCard';
import PortfolioCard from '../../../components/PortfolioCard';
import ReviewCard from '../../../components/ReviewsCard';
import useStyles from './style';
import images from '../../../assets/images';
import {screen} from '../../../utils/constants';
import {NavigationProp} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {selectToken, selectUserId} from '../../../store/reducer/user';
import api from '../../../utils/api';
import apiEndPoints from '../../../constants/apiEndPoints';

interface VendorProfileScreenProps {
  navigation: NavigationProp<any>;
}

interface VendorData {
  _id: string;
  name: string;
  phoneNum: string;
  email: string;
  role: string;
  categories: string[];
  photo?: string;
}

interface Service {
  _id: string;
  vendor: string;
  title: string;
  rate: number;
  description: string;
  availability: {
    day: string;
    startTime: string;
    endTime: string;
    _id: string;
  }[];
}

interface GalleryItem {
  _id: string;
  vendor: string;
  filename: string;
  url: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  _id: string;
  vendor: string;
  user: string;
  rating: number;
  response: string;
  createdAt: string;
  updatedAt: string;
}

const VendorProfileScreen: React.FC<VendorProfileScreenProps> = ({
  navigation,
}) => {
  const {styles} = useStyles();
  const [vendorData, setVendorData] = useState<VendorData | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [reviewsData, setReviewsData] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const {vendorId, vendorName} = navigation
    .getState()
    .routes.find(route => route.name === 'VendorProfile')?.params || {
    vendorId: null,
    vendorName: null,
  };

  const userToken = useSelector(selectToken);
  const userId = useSelector(selectUserId);

  useEffect(() => {
    if (vendorId) {
      fetchVendorProfile();
      fetchVendorReviews();
    }
  }, [vendorId]);

  const fetchVendorProfile = async () => {
    try {
      const response = await api.get(apiEndPoints.GET_VENDOR_PROFILE(vendorId));
      const {vendor, services, gallery} = response.data;
      setVendorData(vendor);
      setServices(services);
      setGallery(gallery);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching vendor profile data:', error);
      setLoading(false);
    }
  };

  const fetchVendorReviews = async () => {
    try {
      const response = await api.get(apiEndPoints.GET_VENDOR_REVIEWS(vendorId));

      setReviewsData(response?.data?.data?.reviews);
      console.log('Review Data', response?.data?.data.reviews);
    } catch (error) {
      console.error('Error fetching vendor reviews:', error);
    }
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={{padding: 20}}>
      {/* Vendor Profile Title Section */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: screen.height * 0.05,
        }}>
        <Text style={{fontSize: 25, fontWeight: 'bold', marginVertical: 10}}>
          Vendor Profile
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AvailableBids', {
              vendorId: vendorId,
              vendorName: vendorName,
            });
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', marginVertical: 10}}>
            See Available Bids
          </Text>
        </TouchableOpacity>
      </View>

      {/* Vendor Profile Section */}
      {vendorData && (
        <View style={{marginBottom: 20}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              marginBottom: 10,
              marginTop: 20,
            }}>
            {vendorData.name}
          </Text>
          <Text style={{fontSize: 16, marginBottom: 5}}>
            {vendorData.phoneNum} | {vendorData.email}
          </Text>
          {/* <Text style={{fontSize: 14, color: 'gray'}}>{vendorData.role}</Text> */}
          <TouchableOpacity
            style={{
              backgroundColor: '#007bff',
              padding: 10,
              borderRadius: 5,
              marginTop: 15,
            }}>
            <Text
              style={{color: 'white', textAlign: 'center', fontWeight: 'bold'}}>
              Contact Vendor
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Services Section */}
      <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>
        Services
      </Text>
      <FlatList
        contentContainerStyle={{paddingBottom: 20, marginTop: 10, gap: 10}}
        numColumns={1}
        data={services}
        renderItem={({item}) => (
          <View
            style={{
              borderWidth: 1,
              borderColor: '#ddd',
              borderRadius: 8,
              padding: 15,
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{item.title}</Text>
            <Text style={{fontSize: 14, color: 'gray'}}>
              {item.description}
            </Text>
            <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 5}}>
              ₨{item.rate}
            </Text>
          </View>
        )}
        keyExtractor={item => item._id}
      />

      {/* Gallery Section */}
      <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>
        Gallery
      </Text>
      <FlatList
        contentContainerStyle={{padding: 10, gap: 10}}
        data={gallery}
        renderItem={({item}) => (
          <PortfolioCard
            image={{uri: `http://192.168.18.80:3000${item.url}`}}
            name={item?.filename || ''}
            rating={5}
          />
        )}
        numColumns={2}
        keyExtractor={item => item._id}
      />

      {/* Reviews Section */}

      <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 20}}>
        Reviews
      </Text>
      <FlatList
        contentContainerStyle={{paddingBottom: 40}}
        data={reviewsData}
        renderItem={({item}) => (
          <ReviewCard
            id={item._id}
            reviewer={item.user}
            date={item.createdAt}
            review={item.response === '' ? 'No review given' : item.response}
            image={images.AREEBA_REVIEWS} // Placeholder image, replace with actual image if available
          />
        )}
        keyExtractor={item => item?._id}
      />
    </ScrollView>
  );
};

export default VendorProfileScreen;
