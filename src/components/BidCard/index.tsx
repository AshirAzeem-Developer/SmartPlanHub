import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

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
  isNegotiable?: boolean;
  onPress?: () => void;
}

interface BidCardProps {
  bid: Bid;
}

const BidCard: React.FC<BidCardProps> = ({bid}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{bid.category}</Text>
      <Text style={styles.details}>{bid.requestDetails}</Text>

      <Text style={styles.infoText}>
        📅 Start: {new Date(bid.preferredStartDate).toDateString()}
      </Text>
      <Text style={styles.infoText}>⏱ Timeline: {bid.timeline}</Text>
      <Text style={styles.infoText}>
        💰 Budget: ₨{bid.budgetRange.min} - ₨{bid.budgetRange.max}
      </Text>
      <Text style={styles.infoText}>
        🎓 Experience: {bid.filters.minExperienceYears}+ yrs
      </Text>
      <Text style={styles.infoText}>
        🏠 Local Vendors Only: {bid.filters.localVendorsOnly ? 'Yes' : 'No'}
      </Text>
      <Text style={styles.infoText}>
        ✅ Verified Providers:{' '}
        {bid.filters.verifiedProvidersOnly ? 'Yes' : 'No'}
      </Text>

      {/* Action Buttons */}
      <View style={styles.buttonGroup}>
        {/* {!bid.isNegotiable && (
          <TouchableOpacity style={styles.acceptButton} onPress={bid.onPress}>
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        )} */}

        {bid.isNegotiable ? (
          <TouchableOpacity style={styles.discussButton} onPress={bid.onPress}>
            <Text style={styles.buttonText}>Start Discussion</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.negotiateButton}
            onPress={bid.onPress}>
            <Text style={styles.negotiateText}>Negotiate</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 6,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 14,
    color: '#555',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  buttonGroup: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  acceptButton: {
    backgroundColor: '#27ae60',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  discussButton: {
    backgroundColor: '#2980b9',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  negotiateButton: {
    backgroundColor: '#ecf0f1',
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  negotiateText: {
    color: '#333',
    textAlign: 'center',
  },
});

export default BidCard;
