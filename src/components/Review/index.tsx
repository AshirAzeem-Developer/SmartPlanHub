import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import useStyles from './style';

interface Props {
  onClose: () => void;
}

const ServiceReviewForm: React.FC<Props> = ({onClose}) => {
  const {styles} = useStyles();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [serviceType, setServiceType] = useState('');
  const [date, setDate] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = () => {
    const data = {
      rating,
      reviewText,
      serviceType,
      date: date?.toISOString(),
    };
    console.log('Review Submitted:', data);
    onClose();
  };

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <TouchableOpacity key={i} onPress={() => setRating(i + 1)}>
        <Text
          style={[
            styles.star,
            i < rating ? styles.filledStar : styles.emptyStar,
          ]}>
          ★
        </Text>
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
      <Text style={styles.title}>Service Ratings & Reviews</Text>

      <Text style={styles.subTitle}>Submit Your Review</Text>

      <Text style={styles.label}>Overall Rating</Text>
      <View style={styles.starContainer}>{renderStars()}</View>

      <TextInput
        style={styles.textInput}
        placeholder="Share your experience..."
        value={reviewText}
        onChangeText={setReviewText}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Service Type</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={serviceType}
          onValueChange={value => setServiceType(value)}>
          <Picker.Item label="Select" value="" />
          <Picker.Item label="Plumbing" value="Plumbing" />
          <Picker.Item label="Cleaning" value="Cleaning" />
          <Picker.Item label="Electrical" value="Electrical" />
        </Picker>
      </View>

      <Text style={styles.label}>Date of Service</Text>
      <Pressable
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}>
        <Text>{date ? date.toDateString() : 'Select date'}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Review</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ServiceReviewForm;
