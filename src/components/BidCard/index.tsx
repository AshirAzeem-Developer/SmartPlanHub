import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface BidCardProps {
  bid: {
    id: string;
    type: string;
    price: string;
    delivery: string;
    isNegotiable?: boolean;
  };
}

const BidCard: React.FC<BidCardProps> = ({bid}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{bid.type}</Text>
      <Text style={styles.price}>{bid.price}</Text>
      {bid.delivery && (
        <Text style={styles.delivery}>Delivery: {bid.delivery}</Text>
      )}
      <TouchableOpacity style={styles.acceptButton}>
        <Text style={styles.buttonText}>Accept</Text>
      </TouchableOpacity>
      {bid.isNegotiable ? (
        <TouchableOpacity style={styles.discussButton}>
          <Text style={styles.buttonText}>Start Discussion</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.negotiateButton}>
          <Text style={styles.negotiateText}>Negotiate</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {fontSize: 16, fontWeight: 'bold'},
  price: {fontSize: 18, color: '#333'},
  delivery: {fontSize: 14, color: '#777'},
  acceptButton: {
    backgroundColor: '#2ecc71',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  discussButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  negotiateButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {color: '#fff', textAlign: 'center'},
  negotiateText: {color: '#333', textAlign: 'center'},
});

export default BidCard;
