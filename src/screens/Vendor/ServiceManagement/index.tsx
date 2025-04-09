import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Image,
  Alert,
  FlatList,
} from 'react-native';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import {screen} from '../../../utils/constants';
import useStyles from './style';
import InputComponent from '../../../components/global/InputComponent';

const dummyImages = [
  {uri: 'https://picsum.photos/200/300?random=1'},
  {uri: 'https://picsum.photos/200/300?random=2'},
  {uri: 'https://picsum.photos/200/300?random=3'},
];

const AddServiceModalView = ({
  visible,
  onClose,
  onSave,
  serviceData,
  setServiceData,
  isEditing,
}: any) => {
  const {styles} = useStyles();
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
            placeholder="Rate (e.g. $150/hr)"
            value={serviceData.rate}
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
          <InputComponent
            style={styles.input}
            placeholder="Availability (e.g. Mon-Fri)"
            value={serviceData.availability}
            onChangeText={text =>
              setServiceData({...serviceData, availability: text})
            }
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onSave} style={styles.saveBtn}>
              <Text style={styles.saveText}>
                {isEditing ? 'Update' : 'Save'}
              </Text>
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

const ServiceManagementScreen = () => {
  const {styles} = useStyles();
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const [services, setServices] = useState([
    {
      title: 'Photography Service',
      rate: '$150/hr',
      description: 'Professional event photography services',
      availability: 'Mon-Sat',
    },
    {
      title: 'Videography',
      rate: '$200/hr',
      description: 'Professional video recording and editing',
      availability: 'Mon-Fri',
    },
  ]);

  const [serviceData, setServiceData] = useState({
    title: '',
    rate: '',
    description: '',
    availability: '',
  });

  const openAddModal = () => {
    setServiceData({title: '', rate: '', description: '', availability: ''});
    setIsEditing(false);
    setModalVisible(true);
  };

  const openEditModal = (index: number) => {
    setEditingIndex(index);
    setServiceData(services[index]);
    setIsEditing(true);
    setModalVisible(true);
  };

  const handleSave = () => {
    if (
      serviceData.title &&
      serviceData.rate &&
      serviceData.description &&
      serviceData.availability
    ) {
      if (isEditing && editingIndex !== null) {
        const updated = [...services];
        updated[editingIndex] = serviceData;
        setServices(updated);
      } else {
        setServices([...services, serviceData]);
      }
      setModalVisible(false);
      setServiceData({title: '', rate: '', description: '', availability: ''});
      setEditingIndex(null);
      setIsEditing(false);
    }
  };

  const handleDelete = (index: number) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this service?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updated = services.filter((_, i) => i !== index);
            setServices(updated);
          },
        },
      ],
    );
  };

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
      <ScrollView style={styles.container}>
        <TouchableOpacity style={styles.addButton} onPress={openAddModal}>
          <Text style={styles.addButtonText}>+ Add New Service</Text>
        </TouchableOpacity>

        <View style={styles.serviceContainer}>
          {services.map((service, index) => (
            <View key={index} style={styles.serviceCard}>
              <Text style={styles.serviceTitle}>
                {service.title}{' '}
                <Text style={styles.serviceRate}>{service.rate}</Text>
              </Text>
              <Text style={styles.serviceDescription}>
                {service.description}
              </Text>
              <Text style={styles.serviceAvailability}>
                Available: {service.availability}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={() => openEditModal(index)}>
                  <Text style={styles.editText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(index)}>
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
            ) : (
              <Image source={item} style={styles.portfolioImage} />
            )
          }
        />

        <AddServiceModalView
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSave={handleSave}
          serviceData={serviceData}
          setServiceData={setServiceData}
          isEditing={isEditing}
        />
      </ScrollView>
    </>
  );
};

export default ServiceManagementScreen;
