import React from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  Touchable,
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
import {NavigationProp} from '@react-navigation/native';

interface VendorProfileScreenProps {
  navigation: NavigationProp<any>; // Define your navigation prop type here
}

const VendorProfileScreen: React.FC<VendorProfileScreenProps> = ({
  navigation,
}) => {
  const {styles} = useStyles();
  const pricingData = [
    {title: 'Basic Package', price: '$99', description: 'Standard service'},
    {title: 'Premium Package', price: '$199', description: 'Enhanced service'},
    {title: 'Custom Package', price: 'Contact for quote', description: ''},
  ];

  const portfolioData = [
    {
      id: 1,
      image: images.VENDOR,
      name: "John's Professional Services",
      rating: 5,
    },
    {
      id: 2,
      image: images.VENDOR,
      name: 'Vendor Name',
      rating: 4,
    },
    {
      id: 3,
      image: images.VENDOR,
      name: 'Vendor Name',
      rating: 4,
    },
    {
      id: 4,
      image: images.VENDOR,
      name: 'Vendor Name',
      rating: 4,
    },
  ];

  const reviewsData = [
    {
      id: 1,
      reviewer: 'Sarah Johnson',
      date: 'May 1, 2024',
      review: 'Amazing service! Very professional.',
      image: images.VENDOR,
    },
    {
      id: 2,
      reviewer: 'Michael Smith',
      date: 'April 30, 2024',
      review: 'Excellent work, highly recommend!',
      image: images.VENDOR,
    },
  ];

  return (
    <ScrollView style={{padding: 20}}>
      <SearchBar />
      <FilterButtons />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: 20,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold', marginVertical: 10}}>
          Vendor Profile
        </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AvailableBids');
          }}>
          <Text style={{fontSize: 15, fontWeight: 'bold', marginVertical: 10}}>
            See Available Bids
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 18, fontWeight: 'bold'}}>Pricing</Text>
      <FlatList
        contentContainerStyle={{paddingBottom: 20, marginTop: 10, gap: 10}}
        numColumns={3}
        data={pricingData}
        renderItem={({item}) => (
          <PricingCard
            title={item.title}
            price={item.price}
            description={item.description}
          />
        )}
        keyExtractor={item => item.title}
      />

      <VendorProfile />

      <Text
        style={{
          fontSize: screen.width * 0.05,
          fontWeight: 'bold',
          marginTop: screen.height * 0.04,
        }}>
        Portfolio
      </Text>
      <FlatList
        contentContainerStyle={{
          marginTop: 10,
          flexDirection: 'column',
          gap: 10,
          padding: 10,
          // marginHorizontal: 10,
          justifyContent: 'space-evenly',
          alignItems: 'center',
        }}
        data={portfolioData}
        renderItem={({item}) => (
          <PortfolioCard
            image={item.image}
            name={item.name}
            rating={item.rating}
          />
        )}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
      />

      <Text style={{fontSize: 18, fontWeight: 'bold', marginTop: 10}}>
        Reviews
      </Text>
      <FlatList
        contentContainerStyle={{paddingBottom: 40}}
        data={reviewsData}
        renderItem={({item}) => (
          <ReviewCard
            id={item.id}
            reviewer={item.reviewer}
            date={item.date}
            review={item.review}
            image={item.image}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </ScrollView>
  );
};

export default VendorProfileScreen;
