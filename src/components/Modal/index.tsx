import React from 'react';
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from 'react-native';

interface GenericModalProps {
  visible: boolean;
  onClose: (e?: GestureResponderEvent) => void;
  children: React.ReactNode;
  closeButton?: boolean;
}

const GenericModal: React.FC<GenericModalProps> = ({
  visible,
  onClose,
  children,
  closeButton = true,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.content}>
          {closeButton && (
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          )}
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default GenericModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    maxHeight: '90%',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 20,
    color: '#333',
  },
});
