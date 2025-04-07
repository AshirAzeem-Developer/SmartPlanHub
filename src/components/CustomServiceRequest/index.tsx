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
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import useStyles from './style';

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

  const handleSubmit = () => {
    const data = {
      description,
      timeline,
      startDate: startDate?.toISOString() ?? null,
      budgetRange,
      customBudget,
      preferences,
    };

    console.log('Form Submitted:', data);

    // You can pass data to backend here
    onClose();
  };

  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({...prev, [key]: !prev[key]}));
  };

  return (
    <ScrollView contentContainerStyle={{paddingBottom: 20}}>
      <Text style={styles.title}>Custom Service Requests</Text>
      <Text style={styles.subTitle}>Request Details</Text>

      {/* Project Details */}
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
        <Picker selectedValue={timeline} onValueChange={setTimeline}>
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
      <Text style={styles.label}>Budget Range</Text>
      <View style={styles.picker}>
        <Picker selectedValue={budgetRange} onValueChange={setBudgetRange}>
          <Picker.Item label="Under $100" value="Under $100" />
          <Picker.Item label="$100 - $500" value="$100 - $500" />
          <Picker.Item label="$500+" value="$500+" />
        </Picker>
      </View>

      {/* Custom Budget */}
      <TextInput
        style={styles.inputBox}
        placeholder="Custom budget (optional)"
        keyboardType="numeric"
        value={customBudget}
        onChangeText={setCustomBudget}
      />

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
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Submit Request</Text>
      </TouchableOpacity>

      {/* Cancel */}
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomServiceForm;
