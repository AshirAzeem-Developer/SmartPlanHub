import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import useStyles from './style';
import icons from '../../../assets/icons';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import InputComponent from '../../../components/global/InputComponent';
import {screen} from '../../../utils/constants';
import api from '../../../utils/api';
import apiEndPoints from '../../../constants/apiEndPoints';

const BiddingManagementScreen = () => {
  const {styles} = useStyles();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isBidModalVisible, setBidModalVisible] = useState(false);
  const [selectedBidIndex, setSelectedBidIndex] = useState<number | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [bids, setBids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [notifications, setNotifications] = useState([
    {
      title: 'Wedding Photoshoot Bid',
      message: 'Your bid was outbid',
    },
    {
      title: 'Corporate Event Bid',
      message: 'Bid accepted by client',
    },
    {
      title: 'Portrait Session Bid',
      message: 'Awaiting client response',
    },
  ]);
  // ================ >> SKIP BID FUNCTIONALITY << ===================
  const handleSkipBid = (index: number) => {
    const updatedBids = [...bids];
    updatedBids[index].status = 'skipped';
    setBids(updatedBids);
    Alert.alert(
      'Bid Skipped',
      `You skipped bidding for ${updatedBids[index].title}`,
    );
  };
  // ================ >> PLACE BID FUNCTIONALITY << ===================
  const handlePlaceBid = (index: number) => {
    setSelectedBidIndex(index);
    setBidAmount('');
    setIsEditing(false);
    setBidModalVisible(true);
  };

  // ================ >> BID MODAL FUNCTIONALITY << ===================
  const handleEditBid = (index: number) => {
    setSelectedBidIndex(index);
    setBidAmount(bids[index].amount);
    setIsEditing(true);
    setBidModalVisible(true);
  };

  const handleViewAllBids = () => {
    Alert.alert('Navigation', 'Navigate to all bids page');
  };
  const onRefresh = () => {
    setRefreshing(true);

    // Simulate a network request (you can replace with your real data fetching)
    setTimeout(() => {
      setRefreshing(false);
      setBids([
        {
          title: 'Walima Photography',
          status: 'open',
          date: 'May 10, 2024 | 7:00 PM',
          client: 'Ahmed Khan',
          amount: '',
        },
        {
          title: 'Corporate Seminar Coverage',
          status: 'placed',
          date: 'May 18, 2024 | 12:00 PM',
          client: 'Fatima Sheikh',
          amount: '25000',
        },
        {
          title: 'Birthday Event Photoshoot',
          status: 'open',
          date: 'May 22, 2024 | 4:00 PM',
          client: 'Hassan Ali',
          amount: '',
        },
      ]);
    }, 1500);
  };
  // =================>> SAVE BID FUNCTIONALITY << ===================
  const handleSaveBid = () => {
    if (!bidAmount) {
      Alert.alert('Error', 'Please enter a bid amount');
      return;
    }

    const updatedBids = [...bids];
    if (selectedBidIndex !== null) {
      updatedBids[selectedBidIndex] = {
        ...updatedBids[selectedBidIndex],
        status: 'placed',
        amount: bidAmount,
      };
    }

    setBids(updatedBids);
    setBidModalVisible(false);
  };

  function FetchAllBids() {
    setIsLoading(true);
    api
      .get(apiEndPoints.GET_ALL_BIDS)
      .then(response => {
        const fetchedBids = response.data.data.bids.map((bid: any) => ({
          id: bid._id,
          title: bid.requestDetails,
          status: bid.status === 'pending' ? 'open' : 'placed',
          date: new Date(bid.preferredStartDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          client: bid.requester, // Replace with actual client name if available
          amount: '',
          category: bid.category,
          minBudget: bid.budgetRange.min,
          maxBudget: bid.budgetRange.max,
        }));

        setBids(fetchedBids);
      })
      .catch(error => {
        console.error('Error fetching all bids:', error);
        Alert.alert('Error', 'Failed to load bids. Please try again.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    FetchAllBids();
  }, []);
  return (
    <>
      <CustomHeader showMenu />
      <View style={styles.header}>
        <Text style={styles.heading}>Bidding Management</Text>
        <Text style={styles.subHeading}>Active Customer Requests</Text>
        <Text style={styles.description}>
          View requests and place your bids
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          paddingBottom: screen.height * 0.1,
        }}
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={FetchAllBids} />
        }>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color="#0000ff"
            style={{marginTop: 20}}
          />
        ) : bids.length === 0 ? (
          <Text style={styles.noBidsText}>No Bids Available</Text>
        ) : (
          <View style={styles.bidCardsContainer}>
            {bids.map((item: any, index) => (
              <View key={item.id} style={styles.bidCard}>
                <View
                  style={[
                    styles.statusTag,
                    item.status === 'open'
                      ? styles.statusOpen
                      : styles.statusPlaced,
                  ]}>
                  <Text style={styles.statusText}>
                    {item.status === 'open' ? 'Open' : 'Placed'}
                  </Text>
                </View>
                <View style={styles.cardHeader}>
                  <Text style={styles.cardTitle}>{item.title}</Text>
                </View>

                <View style={styles.cardBody}>
                  <Text style={styles.bidInfo}>
                    <Text style={styles.label}>Date:</Text> {item.date}
                  </Text>
                  <Text style={styles.bidInfo}>
                    <Text style={styles.label}>Client:</Text> {item.client}
                  </Text>
                  <Text style={styles.bidInfo}>
                    <Text style={styles.label}>Category:</Text>{' '}
                    {item.category || 'N/A'}
                  </Text>
                  <Text style={styles.bidInfo}>
                    <Text style={styles.label}>Budget:</Text>{' '}
                    {item.minBudget || 'N/A'} - {item.maxBudget || 'N/A'}
                  </Text>
                  <Text style={styles.bidInfo}>
                    <Text style={styles.label}>Price:</Text>{' '}
                    {item.amount || 'N/A'}
                  </Text>

                  {item.status === 'open' ? (
                    <View style={styles.buttonGroup}>
                      <TouchableOpacity
                        style={styles.acceptBtn}
                        onPress={() => handlePlaceBid(index)}>
                        <Text style={styles.btnText}>Place Bid</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity
                        style={styles.declineBtn}
                        onPress={() => handleSkipBid(index)}>
                        <Text style={styles.btnText}>Skip</Text>
                      </TouchableOpacity> */}
                    </View>
                  ) : item.status === 'placed' ? (
                    <TouchableOpacity onPress={() => handleEditBid(index)}>
                      <Text style={styles.viewDetails}>Edit Bid</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.statusText}>Bid Skipped</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      {isBidModalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {isEditing ? 'Edit Your Bid' : 'Place Your Bid'}
            </Text>
            <InputComponent
              style={styles.input}
              placeholder="Enter bid amount"
              value={bidAmount}
              onChangeText={setBidAmount}
              keyboardType="numeric"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalSaveBtn}
                onPress={handleSaveBid}>
                <Text style={styles.modalSaveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setBidModalVisible(false)}>
                <Text style={styles.modalCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

export default BiddingManagementScreen;
