import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {selectToken, selectUserId} from '../../../store/reducer/user';
import api from '../../../utils/api';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';

export default function MessagedUsersScreen({navigation, route}: any) {
  const userId = useSelector(selectUserId);
  const token = useSelector(selectToken);

  console.log('This is the token', token);
  console.log('This is the userId', userId);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('http://192.168.18.80:3000/api/v1/chat/messaged-users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        console.log('Response from messaged users:', res.data.users);
        setUsers(res.data.users);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, []);

  const renderItem = ({item}: any) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() =>
        navigation.navigate('ChatScreen', {
          userId,
          receiverId: item._id,
          token,
          receiverName: item.name || item.email,
        })
      }>
      <Text style={styles.userName}>{item.name || item.email}</Text>
    </TouchableOpacity>
  );

  if (loading)
    return <ActivityIndicator size="large" style={{marginTop: 50}} />;

  return (
    <>
      <CustomHeader showMenu barStyle="dark-content" />
      <View style={styles.container}>
        <FlatList
          data={users}
          keyExtractor={(item: any) => item._id}
          renderItem={renderItem}
          ListEmptyComponent={<Text>No messaged users yet.</Text>}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, padding: 16},
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
  },
});
