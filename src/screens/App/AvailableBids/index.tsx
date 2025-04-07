import React, {useState} from 'react';
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

const AvailableBids = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReviewModal, setIsReviewModal] = useState(false);
  const [onSubmit, setOnSubmit] = useState();

  const portfolios = [
    {
      id: '1',
      image: images.DUMMY_VENDOR,
      name: 'John’s Professional Services',
      rating: 5,
    },
    {id: '2', image: images.DUMMY_VENDOR, name: 'Vendor Name', rating: 4},
  ];
  const bids = [
    {
      id: '1',
      type: 'Express Bid',
      price: '$89',
      delivery: '24hrs',
      onPress: () => {},
    },
    {
      id: '2',
      type: 'Standard Bid',
      price: '$149',
      delivery: '48hrs',
      onPress: () => {},
    },
    {
      id: '3',
      type: 'Premium Bid',
      price: '$249',
      delivery: '72hrs',
      onPress: () => {},
    },
    {
      id: '4',
      type: 'Custom Bid',
      price: 'Negotiable',
      delivery: '',
      isNegotiable: true,
      onPress: () => setIsModalVisible(true),
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
    <>
      <ScrollView style={{flex: 1, backgroundColor: '#f5f5f5', padding: 10}}>
        <SearchBar />
        <FilterButtons />
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            marginVertical: 10,
            textAlign: 'center',
          }}>
          Available Bids
        </Text>

        <View style={{padding: 10}}>
          <View>
            <Text
              style={{fontSize: 20, fontWeight: 'bold', marginVertical: 10}}>
              Current Bids
            </Text>
            <FlatList
              data={bids}
              keyExtractor={item => item.id}
              renderItem={({item}) => <BidCard bid={item} />}
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
        </View>
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
