import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
  Alert,
  FlatList,
  ActivityIndicator,
  Platform,
  RefreshControl,
} from 'react-native';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import {screen} from '../../../utils/constants';
import useStyles from './style';
import InputComponent from '../../../components/global/InputComponent';
import api from '../../../utils/api';
import apiEndPoints from '../../../constants/apiEndPoints';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';

interface Availability {
  day: string;
  startTime: string;
  endTime: string;
}

interface Service {
  _id?: string;
  title: string;
  rate: string | number;
  description: string;
  availability: Availability[];
}

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: () => void;
  serviceData: Service;
  setServiceData: React.Dispatch<React.SetStateAction<Service>>;
  isEditing: boolean;
  loading: boolean;
}

const dummyImages = [
  {uri: 'https://picsum.photos/200/300?random=1'},
  {uri: 'https://picsum.photos/200/300?random=2'},
  {uri: 'https://picsum.photos/200/300?random=3'},
];

const VALID_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Monday-Friday',
];

const AddServiceModalView: React.FC<ModalProps> = ({
  visible,
  onClose,
  onSave,
  serviceData,
  setServiceData,
  isEditing,
  loading,
}) => {
  const {styles} = useStyles();
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);

  const availability = serviceData.availability?.[0] || {
    day: '',
    startTime: '',
    endTime: '',
  };

  const onStartTimeChange = (_: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') setShowStartTime(false);
    if (selectedTime) {
      const time = selectedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const availability = serviceData.availability?.[0] || {
        day: '',
        startTime: '',
        endTime: '',
      };

      setServiceData({
        ...serviceData,
        availability: [{...availability, startTime: time}],
      });
    }
  };

  const onEndTimeChange = (_: any, selectedTime?: Date) => {
    if (Platform.OS === 'android') setShowEndTime(false);
    if (selectedTime) {
      const time = selectedTime.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });

      const availability = serviceData.availability?.[0] || {
        day: '',
        startTime: '',
        endTime: '',
      };

      setServiceData({
        ...serviceData,
        availability: [{...availability, endTime: time}],
      });
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {isEditing ? 'Edit Service' : 'Add New Service'}
          </Text>

          <InputComponent
            style={styles.input}
            placeholder="Service Title"
            value={serviceData.title}
            onChangeText={text => setServiceData({...serviceData, title: text})}
          />
          <InputComponent
            style={styles.input}
            placeholder="Rate (e.g. 100)"
            keyboardType="numeric"
            value={String(serviceData.rate)}
            onChangeText={text => setServiceData({...serviceData, rate: text})}
          />
          <InputComponent
            style={styles.input}
            placeholder="Description"
            value={serviceData.description}
            onChangeText={text =>
              setServiceData({...serviceData, description: text})
            }
          />

          <View style={styles.input}>
            <Picker
              selectedValue={serviceData?.availability?.[0]?.day || ''}
              onValueChange={value =>
                setServiceData({
                  ...serviceData,
                  availability: [
                    {
                      ...(serviceData.availability?.[0] || {
                        startTime: '',
                        endTime: '',
                      }),
                      day: value,
                    },
                  ],
                })
              }>
              <Picker.Item label="Select Day(s)" value="" />
              {VALID_DAYS.map(day => (
                <Picker.Item key={day} label={day} value={day} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={[
              styles.input,
              {justifyContent: 'center', padding: screen.width * 0.04},
            ]}
            onPress={() => setShowStartTime(true)}>
            <Text
              style={{
                color: serviceData?.availability?.[0]?.startTime
                  ? '#000'
                  : '#999',
              }}>
              {serviceData?.availability?.[0]?.startTime
                ? `Start Time: ${serviceData.availability[0].startTime}`
                : 'Select Start Time'}
            </Text>
          </TouchableOpacity>
          {showStartTime && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour
              display="default"
              onChange={onStartTimeChange}
            />
          )}

          <TouchableOpacity
            style={[
              styles.input,
              {justifyContent: 'center', padding: screen.width * 0.04},
            ]}
            onPress={() => setShowEndTime(true)}>
            <Text
              style={{
                color: serviceData?.availability?.[0]?.startTime
                  ? '#000'
                  : '#999',
              }}>
              {serviceData?.availability?.[0]?.endTime
                ? `End Time: ${serviceData.availability[0].endTime}`
                : 'Select End Time'}
            </Text>
          </TouchableOpacity>
          {showEndTime && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              is24Hour
              display="default"
              onChange={onEndTimeChange}
            />
          )}

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onSave} style={styles.saveBtn}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.saveText}>
                  {isEditing ? 'Update' : 'Save'}
                </Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ServiceManagementScreen: React.FC = () => {
  const {styles} = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [serviceData, setServiceData] = useState<Service>({
    title: '',
    rate: '',
    description: '',
    availability: [{day: '', startTime: '', endTime: ''}],
  });

  const openAddModal = () => {
    setServiceData({
      title: '',
      rate: '',
      description: '',
      availability: [{day: '', startTime: '', endTime: ''}],
    });
    setIsEditing(false);
    setModalVisible(true);
  };

  const openEditModal = (index: number) => {
    const selectedService = services[index];
    const availability = selectedService.availability?.[0] || {
      day: '',
      startTime: '',
      endTime: '',
    };

    setEditingIndex(index);
    setServiceData({
      ...selectedService,
      availability: [availability], // ensure always valid array
    });
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleSave = () => {
    setLoading(true);

    const trimmedTitle = serviceData.title.trim();

    const avail = serviceData.availability?.[0] || {
      day: '',
      startTime: '',
      endTime: '',
    };

    const payload: any = {
      rate: Number(serviceData.rate),
      description: serviceData.description.trim(),
      availability: [
        {
          day: avail.day.trim(),
          startTime: avail.startTime,
          endTime: avail.endTime,
        },
      ],
    };

    if (
      !payload.rate ||
      !payload.description ||
      !payload.availability[0].day ||
      !payload.availability[0].startTime ||
      !payload.availability[0].endTime
    ) {
      Alert.alert(
        'Missing Fields',
        'Please fill all the fields before saving.',
      );
      setLoading(false);
      return;
    }

    if (!isEditing || serviceData.title !== services[editingIndex!]?.title) {
      payload.title = trimmedTitle;
    }

    const request = isEditing
      ? api.put(
          apiEndPoints.GET_VENDOR_SERVICE_BY_ID(serviceData._id!),
          payload,
        )
      : api.post(apiEndPoints.POST_NEW_SERVICE, {
          ...payload,
          title: trimmedTitle,
        });

    request
      .then(res => {
        setLoading(false);

        const service = res?.data?.service;

        if (!service) {
          // Just close modal and refresh everything
          setModalVisible(false);
          GetVendorAllServices(); // fetch updated services from backend
          setServiceData({
            title: '',
            rate: '',
            description: '',
            availability: [{day: '', startTime: '', endTime: ''}],
          });
          setEditingIndex(null);
          setIsEditing(false);
          return;
        }

        // Otherwise use updated service from response
        const safeService = {
          ...service,
          availability: Array.isArray(service.availability)
            ? service.availability
            : [{day: '', startTime: '', endTime: ''}],
        };

        if (isEditing && editingIndex !== null) {
          const updated = [...services];
          updated[editingIndex] = {...safeService, _id: serviceData?._id};
          setServices(updated);
        } else {
          setServices([...services, safeService]);
        }

        setModalVisible(false);
        setServiceData({
          title: '',
          rate: '',
          description: '',
          availability: [{day: '', startTime: '', endTime: ''}],
        });
        setEditingIndex(null);
        setIsEditing(false);
      })
      .catch(err => {
        setLoading(false);
        console.error('Server error:', err?.response?.data || err?.message);
        Alert.alert(
          'Error',
          err?.response?.data?.message || 'Something went wrong',
        );
      });
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this service?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            api
              .delete(apiEndPoints.DELETE_SERVICE_BY_ID(id))
              .then(res => {
                if (res.data) {
                  const updated = services.filter(
                    service => service._id !== id,
                  );
                  setServices(updated);
                } else {
                  console.error('Error deleting service:', res.data.message);
                }
              })
              .catch(err => {
                console.error(
                  'Server error:',
                  err?.response?.data || err?.message,
                );
                Alert.alert(
                  'Error',
                  err?.response?.data?.message || 'Something went wrong',
                );
              });
          },
        },
      ],
    );
  };

  const GetVendorAllServices = useCallback(() => {
    setRefreshing(true);
    api
      .get(apiEndPoints.GET_VENDOR_ALL_SERVICES)
      .then(res => {
        setRefreshing(false);
        if (res.data) {
          setServices(res.data.services);
        } else {
          console.error('Error fetching services:', res.data.message);
        }
      })
      .catch(err => {
        setRefreshing(false);
        console.error('Server error:', err?.response?.data || err?.message);
        Alert.alert(
          'Error',
          err?.response?.data?.message || 'Something went wrong',
        );
      });
  }, []);

  useEffect(() => {
    GetVendorAllServices();
  }, [GetVendorAllServices]);

  return (
    <>
      <CustomHeader showMenu />
      <View style={{padding: 20, backgroundColor: '#000'}}>
        <Text style={styles.heading}>Service Management</Text>
        <Text style={styles.subHeading}>Manage Your Services</Text>
        <Text style={styles.description}>
          Add and update your services, pricing, and portfolio
        </Text>
      </View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={GetVendorAllServices}
          />
        }>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Text style={styles.addButtonText}>+ Add New Service</Text>
        </TouchableOpacity>

        <View style={styles.serviceContainer}>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <Text style={styles.serviceTitle}>
                {service.title}{' '}
                <Text style={styles.serviceRate}>{`Rs ${service.rate}`}</Text>
              </Text>
              <Text style={styles.serviceDescription}>
                {service.description}
              </Text>
              <Text style={styles.serviceAvailability}>
                {service.availability && service.availability.length > 0
                  ? `Available: ${service.availability[0].day} | ${service.availability[0].startTime} - ${service.availability[0].endTime}`
                  : 'Availability: Not set'}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => openEditModal(index)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(service._id!)}>
                  <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <Text style={styles.portfolioHeading}>Portfolio</Text>
        <FlatList
          data={[{isAdd: true}, ...dummyImages]}
          numColumns={2}
          keyExtractor={(_, index) => index.toString()}
          columnWrapperStyle={styles.flatListRow}
          contentContainerStyle={styles.flatListContainer}
          renderItem={({item}: any) =>
            item?.isAdd ? (
              <TouchableOpacity style={styles.portfolioBox}>
                <Text style={styles.plusText}>+</Text>
              </TouchableOpacity>
            ) : item?.uri ? (
              <Image source={{uri: item.uri}} style={styles.portfolioImage} />
            ) : null
          }
        />

        <AddServiceModalView
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
          serviceData={serviceData}
          setServiceData={setServiceData}
          isEditing={isEditing}
          loading={loading}
        />
      </ScrollView>
    </>
  );
};

export default ServiceManagementScreen;
