import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface CustomBidCardProps {
  type: string;
  price: string;
  delivery: string;
  isNegotiable?: boolean;
  onPress: () => void;
}

const CustomBidCard: React.FC<CustomBidCardProps> = ({
  type,
  price,
  delivery,
  isNegotiable,
  onPress,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{type}</Text>
      <Text style={styles.price}>{price}</Text>
      {delivery ? (
        <Text style={styles.delivery}>Delivery: {delivery}</Text>
      ) : null}
      {isNegotiable && <Text style={styles.delivery}>Flexible Timeline</Text>}
      {isNegotiable ? (
        <TouchableOpacity style={styles.discussButton} onPress={onPress}>
          <Text style={styles.buttonText}>Start Discussion</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.acceptButton} onPress={onPress}>
          <Text style={styles.buttonText}>Accept</Text>
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
    marginVertical: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {fontSize: 14, fontWeight: 'bold'},
  price: {fontSize: 22, color: '#333', fontWeight: 'bold'},
  delivery: {fontSize: 14, color: '#777', marginTop: 4},
  acceptButton: {
    backgroundColor: '#2ecc71',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  discussButton: {
    backgroundColor: '#3498db',
    padding: 12,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {color: '#fff', textAlign: 'center', fontWeight: '600'},
});

export default CustomBidCard;
