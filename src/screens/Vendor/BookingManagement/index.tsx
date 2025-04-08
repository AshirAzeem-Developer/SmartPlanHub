import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
  RefreshControl,
  Alert,
} from 'react-native';
import useStyles from './style';
import icons from '../../../assets/icons';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import GenericModal from '../../../components/Modal';
import InputComponent from '../../../components/global/InputComponent';
import BookingDetailsModal from './BookingDetailsModal';
import DateTimePicker from '@react-native-community/datetimepicker';

const initialBookings = [
  {
    title: 'Wedding Photography',
    status: 'Pending',
    date: 'Aug 15, 2024 | 2:00 PM',
    client: 'John Smith',
    type: 'pending',
  },
  {
    title: 'Event Photography',
    status: 'Confirmed',
    date: 'Aug 20, 2024 | 3:00 PM',
    client: 'Sarah Johnson',
    type: 'confirmed',
  },
];

const initialAvailability = [
  {day: 'Monday - Friday', time: '9:00 AM - 5:00 PM'},
  {day: 'Saturday', time: '10:00 AM - 3:00 PM'},
  {day: 'Sunday', time: 'Not Available'},
];

const BookingManagementScreen = () => {
  const {styles} = useStyles();
  const [selectedBooking, setSelectedBooking] = useState<{
    title: string;
    status: string;
    date: string;
    client: string;
    type: string;
  } | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);

  const [bookings, setBookings] = useState(initialBookings);
  const [availability, setAvailability] = useState(initialAvailability);
  const [isModalVisible, setModalVisible] = useState(false);
  const [editedAvailability, setEditedAvailability] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const handleAccept = (index: number) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = 'Confirmed';
    updatedBookings[index].type = 'confirmed';
    setBookings(updatedBookings);
  };
  const onRefresh = () => {
    setRefreshing(true);

    // Simulate a network request (you can replace with your real data fetching)
    setTimeout(() => {
      setBookings(initialBookings); // Or fetch from API
      setAvailability(initialAvailability); // Or fetch from API
      setRefreshing(false);
    }, 1500);
  };

  const handleDecline = (index: number) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = 'Declined';
    updatedBookings[index].type = 'declined';
    setBookings(updatedBookings);
  };

  const handleEditAvailability = () => {
    if (!startTime || !endTime) {
      Alert.alert('Error', 'Please select both start and end times.');
      return;
    }

    const formatTime = (date: Date) =>
      date.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});

    const formatted = `${formatTime(startTime)} - ${formatTime(endTime)}`;

    const updatedAvailability = availability.map(slot =>
      slot.day === selectedDay ? {...slot, time: formatted} : slot,
    );

    setAvailability(updatedAvailability);
    setStartTime(null);
    setEndTime(null);
    setModalVisible(false);
  };

  const handleViewCalendar = () => {
    Alert.alert('Calendar', 'This will open the calendar integration');
  };
  return (
    <>
      <CustomHeader showMenu />
      <View
        style={{
          backgroundColor: '#000000',
          padding: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          marginBottom: 20,
        }}>
        <Text style={styles.heading}>Booking Management</Text>
        <Text style={styles.subHeading}>Manage Your Bookings</Text>
        <Text style={styles.description}>
          View and manage service requests and schedules
        </Text>
      </View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <TouchableOpacity
          style={styles.calendarButton}
          onPress={handleViewCalendar}>
          <Image
            source={icons.CALENDAR}
            tintColor={'#fff'}
            style={{
              width: 20,
              height: 20,
            }}
          />
          <Text style={styles.calendarText}>View Calendar</Text>
        </TouchableOpacity>

        <View style={styles.bookingsContainer}>
          {bookings.map((item, index) => (
            <View key={index} style={styles.bookingCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View
                  style={[
                    styles.statusTag,
                    item.type === 'pending'
                      ? styles.statusPending
                      : item.type === 'confirmed'
                      ? styles.statusConfirmed
                      : styles.statusDeclined,
                  ]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <Text style={styles.bookingInfo}>
                  <Text style={styles.label}>Date:</Text> {item.date}
                </Text>
                <Text style={styles.bookingInfo}>
                  <Text style={styles.label}>Client:</Text> {item.client}
                </Text>

                {item.type === 'pending' ? (
                  <View style={styles.buttonGroup}>
                    <TouchableOpacity
                      style={styles.acceptBtn}
                      onPress={() => handleAccept(index)}>
                      <Text style={styles.btnText}>Accept</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.declineBtn}
                      onPress={() => handleDecline(index)}>
                      <Text style={styles.btnText}>Decline</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedBooking(item);
                      setDetailsModalVisible(true);
                    }}>
                    <Text style={styles.viewDetails}>View Details</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.availabilityHeading}>Availability Schedule</Text>

        {availability.map((slot, idx) => (
          <View key={idx} style={styles.availabilityRow}>
            <Text style={styles.dayText}>{slot.day}</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{slot.time}</Text>
              <TouchableOpacity
                onPress={() => {
                  setSelectedDay(slot.day);
                  setEditedAvailability(slot.time);
                  setModalVisible(true);
                }}>
                <Image
                  source={icons.EDIT}
                  style={{
                    width: 20,
                    height: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <GenericModal
          visible={isModalVisible}
          closeButton={false}
          onClose={() => setModalVisible(false)}>
          <Text style={styles.availabilityModalTitle}>Edit Availability</Text>

          <TouchableOpacity
            style={styles.availabilityInput}
            onPress={() => setShowStartPicker(true)}>
            <Text>
              {startTime
                ? startTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Select Start Time'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.availabilityInput}
            onPress={() => setShowEndPicker(true)}>
            <Text>
              {endTime
                ? endTime.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                : 'Select End Time'}
            </Text>
          </TouchableOpacity>

          <View style={styles.availabilityBtnGroup}>
            <TouchableOpacity
              onPress={handleEditAvailability}
              style={styles.availabilitySaveBtn}>
              <Text style={styles.availabilitySaveText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.availabilityCancelBtn}>
              <Text style={styles.availabilityCancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </GenericModal>
      </ScrollView>
      <BookingDetailsModal
        visible={detailsModalVisible}
        onClose={() => setDetailsModalVisible(false)}
        booking={selectedBooking}
      />
      {showStartPicker && (
        <DateTimePicker
          value={startTime || new Date()}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={(event, selectedDate) => {
            setShowStartPicker(false);
            if (selectedDate) {
              setStartTime(selectedDate);
            }
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endTime || new Date()}
          mode="time"
          is24Hour={false}
          display="default"
          onChange={(event, selectedDate) => {
            setShowEndPicker(false);
            if (selectedDate) {
              setEndTime(selectedDate);
            }
          }}
        />
      )}
    </>
  );
};

export default BookingManagementScreen;
