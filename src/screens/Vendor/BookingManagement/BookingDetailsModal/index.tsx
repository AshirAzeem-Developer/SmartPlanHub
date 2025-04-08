import React from 'react';
import {Modal, View, Text, TouchableOpacity, StyleSheet} from 'react-native';

const BookingDetailsModal = ({visible, onClose, booking}: any) => {
  if (!booking) return null;

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>Booking Details</Text>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Title:</Text>
            <Text style={styles.value}>{booking.title}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Date:</Text>
            <Text style={styles.value}>{booking.date}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Client:</Text>
            <Text style={styles.value}>{booking.client}</Text>
          </View>

          <View style={styles.detailRow}>
            <Text style={styles.label}>Status:</Text>
            <Text style={styles.value}>{booking.status}</Text>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default BookingDetailsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  label: {
    fontWeight: '600',
    width: 80,
  },
  value: {
    flex: 1,
  },
  closeBtn: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
  },
});
