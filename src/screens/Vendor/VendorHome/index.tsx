import React from 'react';
import StatusBarComponent from '../../../components/global/StatusBarComponent';
import useStyles from './style';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import icons from '../../../assets/icons';
const VendorHome = ({naviagtion}: any) => {
  const {styles, colors} = useStyles();

  return (
    <>
      <CustomHeader showMenu textColor="white" />
      <View
        style={{
          backgroundColor: '#000',
          padding: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <Text style={styles.heading}>Dashboard</Text>
        <Text style={styles.subHeading}>Vendor Dashboard</Text>
        <Text style={styles.description}>
          View your bookings, inquiries and earnings
        </Text>
      </View>
      <ScrollView style={styles.container}>
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Bookings</Text>
            <Text style={styles.cardValue}>12</Text>
            <Text style={styles.cardSubText}>Active bookings</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Messages</Text>
            <Text style={styles.cardValue}>3</Text>
            <Text style={styles.link}>Unread messages</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Inquiries</Text>
            <Text style={styles.cardValue}>5</Text>
            <Text style={styles.cardSubText}>New inquiries</Text>
          </View>
        </View>

        <Text style={styles.quickActionsTitle}>Quick Actions</Text>

        <View style={styles.quickActionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <Image
              source={icons.CALENDAR}
              style={{
                width: 24,
                height: 24,
                marginRight: 10,
              }}
            />
            <Text style={styles.actionText}>Update Availability</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => {
              // Navigate to Service Management Screen
              naviagtion.navigate('ServiceManagement');
            }}>
            <Image
              source={icons.SETTINGS}
              style={{
                width: 24,
                height: 24,
                marginRight: 10,
              }}
            />
            <Text style={styles.actionText}>Service Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Image
              source={icons.DOLLAR}
              style={{
                width: 24,
                height: 24,
                marginRight: 10,
              }}
            />
            <Text style={styles.actionText}>Pricing</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Image
              source={icons.NOTIFICATION}
              style={{
                width: 24,
                height: 24,
                marginRight: 10,
              }}
            />
            <Text style={styles.actionText}>Notifications</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default VendorHome;
