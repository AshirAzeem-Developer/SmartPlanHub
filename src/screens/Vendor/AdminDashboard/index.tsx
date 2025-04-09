import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import useStyles from './style';
import icons from '../../../assets/icons';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';

const AdminDashboardScreen = () => {
  const {styles} = useStyles();
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [showAllActivities, setShowAllActivities] = useState(false);

  const recentActivities = [
    {
      title: 'New User Registration',
      description: '15 new users registered in the last 24 hours',
      time: '2 days ago',
      icon: (
        <Image
          source={icons.PEOPLE}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
            tintColor: '#3b82f6',
          }}
        />
      ),
    },
    {
      title: 'Vendor Applications',
      description: '8 new vendor applications pending review',
      time: '1 week ago',
      icon: (
        <Image
          source={icons.STORE}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
            tintColor: '#10b981',
          }}
        />
      ),
    },
    {
      title: 'Support Tickets',
      description: '3 urgent support tickets require attention',
      time: '2 weeks ago',
      icon: (
        <Image
          source={icons.TICKET}
          style={{
            width: 20,
            height: 20,
            marginRight: 10,
            tintColor: '#ef4444',
          }}
        />
      ),
    },
  ];

  return (
    <>
      <CustomHeader showMenu />
      <View style={styles.header}>
        <Text style={styles.heading}>Admin Dashboard</Text>
        <Text style={styles.subHeading}>Platform Overview</Text>
        <Text style={styles.description}>
          Monitor and manage platform activity
        </Text>
      </View>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          style={styles.analyticsButton}
          onPress={() => setShowAnalyticsModal(true)}>
          <Image
            source={icons.ANALYTICS}
            style={{
              width: 20,
              height: 20,
              marginRight: 10,
              tintColor: '#fff',
            }}
          />
          <Text style={styles.analyticsText}>Platform Analytics</Text>
        </TouchableOpacity>

        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>2,547</Text>
            <Text style={styles.summaryLabel}>Active accounts</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={[styles.summaryValue, {color: '#10b981'}]}>00pkr</Text>
            <Text style={styles.summaryLabel}>This month</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Recent Activities</Text>

        {(showAllActivities
          ? recentActivities
          : recentActivities.slice(0, 2)
        ).map((activity, index) => (
          <View key={index} style={styles.activityCard}>
            <View style={styles.activityHeader}>
              <Text style={styles.activityTitle}>{activity.title}</Text>
              {activity.icon}
            </View>
            <Text style={styles.activityDesc}>{activity.description}</Text>
            <Text style={styles.activityTime}>{activity.time}</Text>
          </View>
        ))}
        {!showAllActivities && (
          <TouchableOpacity
            style={styles.seeMoreButton}
            onPress={() => setShowAllActivities(true)}>
            <Text style={styles.seeMoreText}>See More</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      {showAnalyticsModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Analytics Overview</Text>
            <Text style={styles.modalInfo}>
              📈 User Growth: +12% this month
            </Text>
            <Text style={styles.modalInfo}>💬 Response Rate: 92%</Text>
            <Text style={styles.modalInfo}>💰 Revenue Trend: Stable</Text>

            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setShowAnalyticsModal(false)}>
              <Text style={styles.closeBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default AdminDashboardScreen;
