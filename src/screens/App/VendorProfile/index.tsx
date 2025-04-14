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
import FilterDropdownButton from '../../../components/FilterButtons';

interface VendorProfileScreenProps {
  navigation: NavigationProp<any>; // Define your navigation prop type here
}

const VendorProfileScreen: React.FC<VendorProfileScreenProps> = ({
  navigation,
}) => {
  const {styles} = useStyles();
  const [selectedService, setSelectedService] = React.useState<string | null>(
    null,
  );
  const [selectedLocation, setSelectedLocation] = React.useState<string | null>(
    null,
  );
  const [selectedPriceRange, setSelectedPriceRange] = React.useState<
    string | null
  >(null);
  const [selectedRating, setSelectedRating] = React.useState<string | null>(
    null,
  );
  const pricingData = [
    {title: 'Basic Package', price: '$99', description: 'Standard service'},
    {title: 'Premium Package', price: '$199', description: 'Enhanced service'},
    {title: 'Custom Package', price: 'Contact for quote', description: ''},
  ];

  const portfolioData = [
    {
      id: 1,
      image: images.VENDOR,
      name: "Khan's Photography & Events",
      rating: 5,
    },
    {
      id: 2,
      image: images.VENDOR,
      name: 'Lahore Wedding Planners',
      rating: 4,
    },
    {
      id: 3,
      image: images.VENDOR,
      name: 'Karachi Moments Studio',
      rating: 4,
    },
    {
      id: 4,
      image: images.VENDOR,
      name: 'Islamabad Event Experts',
      rating: 4,
    },
  ];

  const reviewsData = [
    {
      id: 1,
      reviewer: 'Areeba Siddiqui',
      date: 'April 1, 2025',
      review: 'Bohat zabardast service thi! Highly recommended.',
      image: images.VENDOR,
    },
    {
      id: 2,
      reviewer: 'Usman Javed',
      date: 'March 28, 2025',
      review: 'Time pe kaam deliver kia, great experience!',
      image: images.VENDOR,
    },
  ];

  return (
    <ScrollView style={{padding: 20}}>
      <SearchBar />
      <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 10}}>
        <FilterDropdownButton
          label="Service Type"
          selectedValue={selectedService}
          options={['Plumbing', 'Cleaning', 'Electrician']}
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
