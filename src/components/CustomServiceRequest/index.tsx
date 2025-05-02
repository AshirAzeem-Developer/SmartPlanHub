import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import useStyles from './style';
import api from '../../utils/api';
import apiEndPoints from '../../constants/apiEndPoints';
import {useSelector} from 'react-redux';

interface Props {
  onClose: () => void;
}

const CustomServiceForm: React.FC<Props> = ({onClose}) => {
  const {styles} = useStyles();
  const [description, setDescription] = useState('');
  const [timeline, setTimeline] = useState('Urgent (24h)');
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [budgetRange, setBudgetRange] = useState('Under $100');
  const [customBudget, setCustomBudget] = useState('');
  const [preferences, setPreferences] = useState({
    localOnly: false,
    verified: false,
    experience: false,
  });
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const userToken = useSelector((state: any) => state?.user?.token);
  console.log('This is the user token', userToken);
  const isFormValid = () => {
    return (
      description.trim() !== '' &&
      startDate !== undefined &&
      minBudget.trim() !== '' &&
      maxBudget.trim() !== '' &&
      !isNaN(Number(minBudget)) &&
      !isNaN(Number(maxBudget)) &&
      Number(minBudget) > 0 &&
      Number(maxBudget) >= Number(minBudget)
    );
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const data = {
      requestDetails: description,
      timeline,
      preferredStartDate: startDate?.toISOString().split('T')[0] ?? null,
      budgetRange: {
        min: Number(minBudget),
        max: Number(maxBudget),
      },
      filters: {
        localVendorsOnly: preferences.localOnly,
        verifiedProvidersOnly: preferences.verified,
        minExperienceYears: preferences.experience ? 5 : 0,
      },
    };

    api
      .post(apiEndPoints.POST_BID, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
      })
      .then(response => {
        setIsLoading(false);
        if (response.data.status !== 'success') {
          console.error('Error submitting request:', response.data);
          return;
        }
        console.log('Request submitted successfully:', response.data);
        onClose();
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error submitting request:', error);
      });
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({...prev, [key]: !prev[key]}));
  };

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
      <Text style={styles.title}>Custom Service Requests</Text>
      <Text style={styles.subTitle}>Request Details</Text>

      {/* Project Details */}
      <Text style={styles.label}>Project Details</Text>
      <TextInput
        style={styles.inputBox}
        multiline
        numberOfLines={4}
        placeholder="Describe your service requirements in detail..."
        value={description}
        onChangeText={setDescription}
      />

      {/* Timeline */}
      <Text style={styles.label}>Timeline</Text>
      <View style={styles.picker}>
        <Picker
          selectedValue={timeline}
          onValueChange={setTimeline}
          style={{color: '#000'}}>
          <Picker.Item label="Urgent (24h)" value="Urgent (24h)" />
          <Picker.Item label="Within 3 days" value="3 days" />
          <Picker.Item label="Within a week" value="1 week" />
        </Picker>
      </View>

      {/* Preferred Start Date */}
      <Text style={styles.label}>Preferred Start Date</Text>
      <Pressable
        style={styles.datePicker}
        onPress={() => setShowDatePicker(true)}>
        <Text>{startDate ? startDate.toDateString() : 'Select a date'}</Text>
      </Pressable>
      {showDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setStartDate(selectedDate);
          }}
        />
      )}

      {/* Budget Range */}
      <Text style={styles.label}>Budget Range (in PKR)</Text>

      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TextInput
          style={[styles.inputBox, {width: '48%'}]}
          placeholderTextColor={'#888'}
          placeholder="Min (₨)"
          keyboardType="numeric"
          value={minBudget}
          onChangeText={setMinBudget}
        />
        <TextInput
          style={[styles.inputBox, {width: '48%'}]}
          placeholder="Max (₨)"
          keyboardType="numeric"
          placeholderTextColor={'#888'}
          value={maxBudget}
          onChangeText={setMaxBudget}
        />
      </View>

      {/* Additional Preferences */}
      <Text style={styles.label}>Additional Preferences</Text>
      {[
        {key: 'localOnly', label: 'Local vendors only'},
        {key: 'verified', label: 'Verified providers'},
        {key: 'experience', label: 'Experience > 5 years'},
      ].map(item => (
        <TouchableOpacity
          key={item.key}
          style={styles.checkboxContainer}
          onPress={() =>
            togglePreference(item.key as keyof typeof preferences)
          }>
          <View
            style={[
              styles.checkbox,
              preferences[item.key as keyof typeof preferences] &&
                styles.checked,
            ]}
          />
          <Text>{item.label}</Text>
        </TouchableOpacity>
      ))}

      {/* Submit Button */}
      <TouchableOpacity
        style={[styles.submitButton, !isFormValid() && {opacity: 0.6}]}
        onPress={handleSubmit}
        disabled={!isFormValid() || isLoading}>
        {!isLoading ? (
          <Text style={styles.submitText}>Submit Request</Text>
        ) : (
          <ActivityIndicator color="#fff" />
        )}
      </TouchableOpacity>

      {/* Cancel */}
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomServiceForm;
