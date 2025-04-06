import React from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import SearchBar from '../../../components/SearchBar';

import PortfolioList from '../../../components/PortfolioCard';
import ReviewsList from '../../../components/ReviewsCard';
import PortfolioCard from '../../../components/PortfolioCard';
import images from '../../../assets/images';
import BidCard from '../../../components/BidCard';
import ReviewCard from '../../../components/ReviewsCard';

const AvailableBids = () => {
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
    {id: '1', type: 'Express Bid', price: '$89', delivery: '24hrs'},
    {id: '2', type: 'Standard Bid', price: '$149', delivery: '48hrs'},
    {id: '3', type: 'Premium Bid', price: '$249', delivery: '72hrs'},
    {
      id: '4',
      type: 'Custom Bid',
      price: 'Negotiable',
      delivery: '',
      isNegotiable: true,
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
    <ScrollView style={{flex: 1, backgroundColor: '#f5f5f5'}}>
      <SearchBar />
      <View style={{padding: 10}}>
        <View>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginVertical: 10}}>
            Current Bids
          </Text>
          <FlatList
            data={bids}
            keyExtractor={item => item.id}
            renderItem={({item}) => <BidCard bid={item} />}
          />
        </View>
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
      </View>
    </ScrollView>
  );
};

export default AvailableBids;
