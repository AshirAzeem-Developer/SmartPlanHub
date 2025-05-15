import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import useStyles from './style';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import InputComponent from '../../../components/global/InputComponent';
import {screen} from '../../../utils/constants';
import api from '../../../utils/api';
import apiEndPoints from '../../../constants/apiEndPoints';
import {useSelector} from 'react-redux';
import {selectUserId} from '../../../store/reducer/user';

const BiddingManagementScreen = () => {
  const {styles} = useStyles();
  const [isBidModalVisible, setBidModalVisible] = useState(false);
  const [selectedBidIndex, setSelectedBidIndex] = useState<number | null>(null);
  const [bidAmount, setBidAmount] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [bids, setBids] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingSaveBid, setLoadingSaveBid] = useState(false);
  const currentVendorId = useSelector(selectUserId);
  // Skip bid functionality (local only)
  const handleSkipBid = (index: number) => {
    const updatedBids = [...bids];
    updatedBids[index].status = 'skipped';
    setBids(updatedBids);
    Alert.alert(
      'Bid Skipped',
      `You skipped bidding for ${updatedBids[index].title}`,
    );
  };

  // Open modal to place a new bid
  const handlePlaceBid = (index: number) => {
    setSelectedBidIndex(index);
    setBidAmount('');
    setIsEditing(false);
    setBidModalVisible(true);
  };

  // Open modal to edit an existing bid
  const handleEditBid = (index: number) => {
    setSelectedBidIndex(index);
    setBidAmount(bids[index].amount?.toString() || '');
    setIsEditing(true);
    setBidModalVisible(true);
  };

  // Fetch all bids from API
  const fetchAllBids = async () => {
    setIsLoading(true);

    try {
      const response = await api.get(apiEndPoints.GET_ALL_BIDS);
      const bidsData = response.data.data.bids;

      // Extract unique client IDs
      const uniqueClientIds = [
        ...new Set(bidsData.map((bid: any) => bid.requester)),
      ];

      // console.log('Unique Client IDs:', uniqueClientIds);

      // Fetch client names for all unique IDs
      const clientsMap: Record<string, string> = {};

      await Promise.all(
        uniqueClientIds.map(async (clientId: any) => {
          try {
            const res = await api.get(apiEndPoints.GET_USER_BY_ID(clientId));
            // console.log('Clients Map:', res);
            clientsMap[clientId] =
              res?.data?.data?.data?.name || 'Unknown Client';
          } catch (e) {
            clientsMap[clientId] = 'Unknown Client';
          }
        }),
      );

      // Map bids and replace client id with client name
      const fetchedBids = bidsData.map((bid: any) => {
        const vendorQuote = bid.quotes.find(
          (quote: any) => quote.vendor === currentVendorId,
        );

        return {
          id: bid._id,
          title: bid.requestDetails,
          status: vendorQuote ? 'placed' : 'open',
          date: new Date(bid.preferredStartDate).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
          client: clientsMap[bid.requester] || 'Unknown Client', // Use fetched name
          amount: vendorQuote ? vendorQuote.amount.toString() : '',
          category: bid.category,
          minBudget: bid.budgetRange.min,
          maxBudget: bid.budgetRange.max,
          quotes: bid.quotes,
        };
      });

      setBids(fetchedBids);
    } catch (error) {
      console.error('Error fetching all bids:', error);
      Alert.alert('Error', 'Failed to load bids. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBids();
  }, []);

  // Save bid (place new or edit existing)
  const handleSaveBid = async () => {
    if (!bidAmount || isNaN(Number(bidAmount))) {
      Alert.alert('Error', 'Please enter a valid bid amount');
      return;
    }

    if (selectedBidIndex === null) {
      Alert.alert('Error', 'No bid selected');
      return;
    }

    setLoadingSaveBid(true);

    try {
      const bidId = bids[selectedBidIndex].id;
      const payload = {amount: Number(bidAmount)};

      if (isEditing) {
        await api.patch(apiEndPoints.EDIT_BID(bidId), payload);
      } else {
        await api.post(apiEndPoints.PLACE_BID(bidId), payload);
      }

      // Update bids state locally after success
      const updatedBids = [...bids];
      updatedBids[selectedBidIndex] = {
        ...updatedBids[selectedBidIndex],
        status: 'placed',
        amount: bidAmount,
      };
      setBids(updatedBids);

      Alert.alert(
        'Success',
        isEditing ? 'Bid updated successfully' : 'Bid placed successfully',
      );
      setBidModalVisible(false);
      setBidAmount('');
      setSelectedBidIndex(null);
      setIsEditing(false);
    } catch (error: any) {
      console.error('Error saving bid:', error);

      // Check for your specific error message
      if (
        error?.response?.data?.message ===
        'You have already submitted a quote for this bid'
      ) {
        Alert.alert(
          'Bid Exists',
          'You have already submitted a quote for this bid.',
        );
      } else {
        Alert.alert('Error', 'Failed to save bid. Please try again.');
      }
    } finally {
      setLoadingSaveBid(false);
    }
  };

  useEffect(() => {
    if (
      isBidModalVisible &&
      selectedBidIndex !== null &&
      bids[selectedBidIndex]
    ) {
      setBidAmount(bids[selectedBidIndex].amount?.toString() || '');
    }
  }, [bids, isBidModalVisible, selectedBidIndex]);

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
          <RefreshControl refreshing={isLoading} onRefresh={fetchAllBids} />
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
            {bids.map((item, index) => (
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
                      {/* Uncomment if you want skip functionality */}
                      {/* <TouchableOpacity style={styles.declineBtn} onPress={() => handleSkipBid(index)}>
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
                onPress={handleSaveBid}
                disabled={loadingSaveBid}>
                {loadingSaveBid ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.modalSaveText}>Save</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelBtn}
                onPress={() => setBidModalVisible(false)}
                disabled={loadingSaveBid}>
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
