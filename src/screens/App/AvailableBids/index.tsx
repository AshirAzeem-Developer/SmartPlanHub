import React, {useEffect, useState} from 'react';
import {
  FlatList,
  ScrollView,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import SearchBar from '../../../components/SearchBar';

import PortfolioList from '../../../components/PortfolioCard';
import ReviewsList from '../../../components/ReviewsCard';
import PortfolioCard from '../../../components/PortfolioCard';
import images from '../../../assets/images';
import BidCard from '../../../components/BidCard';
import ReviewCard from '../../../components/ReviewsCard';
import FilterButtons from '../../../components/FilterButtons';
import VendorProfile from '../../../components/VendorProfileCard';
import GenericModal from '../../../components/Modal';
import CustomRequestModal from '../../../components/CustomServiceRequest';
import ServiceReviewForm from '../../../components/Review';
import FilterDropdownButton from '../../../components/FilterButtons';
import api from '../../../utils/api';
import apiEndPoints from '../../../constants/apiEndPoints';
import {useSelector} from 'react-redux';
import {selectToken, selectUserId} from '../../../store/reducer/user';
import {screen} from '../../../utils/constants';
interface Bid {
  _id: string;
  requestDetails: string;
  timeline: string;
  preferredStartDate: string;
  budgetRange: {
    min: number;
    max: number;
  };
  category: string;
  filters: {
    localVendorsOnly: boolean;
    verifiedProvidersOnly: boolean;
    minExperienceYears: number;
  };
}
const AvailableBids = ({navigation}: any) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReviewModal, setIsReviewModal] = useState(false);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(
    null,
  );
  const [selectedRating, setSelectedRating] = useState<string | null>(null);
  const [bids, setBids] = useState<Bid[]>([]);
  const [onSubmit, setOnSubmit] = useState();
  const token = useSelector(selectToken);
  const userId = useSelector(selectUserId);
  const {vendorId, vendorName} = navigation
    .getState()
    .routes.find((route: any) => route.name === 'VendorProfile')?.params || {
    vendorId: null,
    vendorName: null,
  };

  const portfolios = [
    {
      id: '1',
      image: images.KHAN_PHOTOGRAPHY_PORTFOLIO_IMAGE,
      name: 'Khan’s Photography & Events',
      rating: 5,
    },
    {
      id: '2',
      image: images.LAHORE_WEDDING_PLANNERS_PORTFOLIO_IMAGE,
      name: 'Lahore Wedding Planners',
      rating: 4,
    },
    {
      id: '3',
      image: images.KARACHI_MOMENTS_PORTFOLIO_IMAGE,
      name: 'Karachi Moments Studio',
      rating: 4,
    },
    {
      id: '4',
      image: images.ISLAMABAD_EVENT_EXPERTS_PORTFOLIO_IMAGE,
      name: 'Islamabad Event Experts',
      rating: 4,
    },
  ];

  const reviewsData = [
    {
      id: 1,
      reviewer: 'Areeba Sajid',
      date: 'May 1, 2024',
      review: 'Amazing service! Very professional.',
      image: images.AREEBA_REVIEWS,
    },
    {
      id: 2,
      reviewer: 'Mustafa Khan',
      date: 'April 30, 2024',
      review: 'Excellent work, highly recommend!',
      image: images.JAVED_REVIEWS,
    },
  ];

  function getAllBids() {
    api
      .get(apiEndPoints.GET_ALL_BIDS_OF_VENDOR(vendorId), {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        if (response.data.status !== 'success') {
          console.error('Error fetching bids:', response.data);
          return;
        }
        console.log('Bids fetched successfully:', response.data.data.bids);
        setBids(response.data.data.bids);
      })
      .catch(error => {
        console.error('Error fetching bids:', error);
      });
  }
  const filteredBids = bids.filter(bid => {
    // Service Type Filter
    if (selectedService && bid.category !== selectedService) return false;

    // Location Filter — currently mocked, you can enhance this when backend provides location
    if (selectedLocation) {
      const mockLocationMap: {[key: string]: string[]} = {
        Karachi: ['Event Photography', 'Cleaning'],
        Lahore: ['Birthday Party Planning'],
        Islamabad: ['Wedding Decor', 'Stage Decoration'],
      };
      const allowedCategories = mockLocationMap[selectedLocation] || [];
      if (!allowedCategories.includes(bid.category)) return false;
    }

    // Price Range Filter
    if (selectedPriceRange) {
      const cleaned = selectedPriceRange.replace(/[₨,]/g, '');
      const [minStr, maxStr] = cleaned.includes('+')
        ? [cleaned.replace('+', ''), 'Infinity']
        : cleaned.split(' - ');

      const min = parseInt(minStr);
      const max = maxStr === 'Infinity' ? Infinity : parseInt(maxStr);

      const bidMin = bid.budgetRange.min;
      const bidMax = bid.budgetRange.max;

      if (bidMax < min || bidMin > max) return false;
    }

    // Rating Filter — mock logic until API supports actual ratings
    if (selectedRating) {
      const mockRatingMap: {[key: string]: number} = {
        'Event Photography': 5,
        'Birthday Party Planning': 4,
        'Wedding Decor': 3,
        'Stage Decoration': 2,
        General: 1,
      };
      const requiredRating = parseInt(selectedRating[0]);
      const bidRating = mockRatingMap[bid.category] || 1;
      if (bidRating < requiredRating) return false;
    }

    return true;
  });
  const categories = Array.from(new Set(bids.map(b => b.category)));

  useEffect(() => {
    getAllBids();
  }, []);
  return (
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#f5f5f5', padding: 10}}>
        {/* <SearchBar /> */}
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: 10,
            marginTop: screen.height * 0.04,
          }}>
          <FilterDropdownButton
            label="Service Type"
            selectedValue={selectedService}
            options={categories}
            onSelect={value => setSelectedService(value)}
            onClear={() => setSelectedService(null)}
          />
          <FilterDropdownButton
            label="Location"
            selectedValue={selectedLocation}
            options={['Karachi', 'Lahore', 'Islamabad']}
            onSelect={value => setSelectedLocation(value)}
            onClear={() => setSelectedLocation(null)}
          />
          <FilterDropdownButton
            label="Price Range"
            selectedValue={selectedPriceRange}
            options={[
              '₨0 - ₨1000',
              '₨1001 - ₨2000',
              '₨2001 - ₨3000',
              '₨3001 - ₨5000',
              '₨5001+',
            ]}
            onSelect={value => setSelectedPriceRange(value)}
            onClear={() => setSelectedPriceRange(null)}
          />
          <FilterDropdownButton
            label="Rating"
            selectedValue={selectedRating}
            options={['1 Star', '2 Stars', '3 Stars', '4 Stars', '5 Stars']}
            onSelect={value => setSelectedRating(value)}
            onClear={() => setSelectedRating(null)}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginVertical: 10,
            textAlign: 'center',
          }}>
          Available Bids
        </Text>

        {filteredBids.length === 0 && (
          <Text style={{textAlign: 'center', marginTop: 20}}>
            This vendor has currently no matching data found.
          </Text>
        )}

        {/* <View style={{padding: 10}}>
          <View>
            {/* <Text
              style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>
              Current Bids
            </Text> 
            <FlatList
              data={filteredBids}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <BidCard
                  bid={{
                    ...item,
                    isNegotiable: item.budgetRange.max > 3000, // Example logic
                    onPress: () => {
                      console.log('Bid selected:', item);
                      // Optionally navigate, open modal, etc.
                      navigation.navigate('ChatScreen', {
                        userId: userId,
                        receiverId: item?.assignedTo as any,
                        token: token,
                        userName: item?.assignedTo as any,
                      });
                    },
                  }}
                />
              )}
            />
          </View>
          <View>
            <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 30}}>
              About
            </Text>
            <VendorProfile />
          </View>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 30,
              marginVertical: 10,
            }}>
            Portfolio
          </Text>
          <FlatList
            horizontal
            data={portfolios}
            keyExtractor={item => item.id}
            renderItem={({item}) => (
              <PortfolioCard
                image={item.image}
                name={item.name}
                rating={item.rating}
              />
            )}
          />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 10}}>
              Reviews
            </Text>
            <TouchableOpacity
              style={{
                backgroundColor: '#000',
                padding: 10,
                borderRadius: 5,
                // marginVertical: 10,
              }}
              onPress={() => setIsReviewModal(true)}>
              <Text style={{color: '#fff', textAlign: 'center'}}>
                Write a Review
              </Text>
            </TouchableOpacity>
          </View>
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
        </View> */}
      </ScrollView>
      {/* ============= >> Custom Request Modal << ================== */}
      <GenericModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}>
        <CustomRequestModal onClose={() => setIsModalVisible(false)} />
      </GenericModal>
      {/* ============= >> Submit  Review Modal << ================== */}
      <GenericModal
        visible={isReviewModal}
        onClose={() => setIsReviewModal(false)}>
        <ServiceReviewForm onClose={() => setIsReviewModal(false)} />
      </GenericModal>
    </>
  );
};

export default AvailableBids;
