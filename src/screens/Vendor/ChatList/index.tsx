import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {useNavigation} from '@react-navigation/native';
import useStyles from './style';
import {
  AppStackParamsList,
  DrawerParamList,
} from '../../../navigators/navigatorParams';

type ChatListItem = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
};

const mockChatList: ChatListItem[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    avatar: 'https://i.pravatar.cc/150?img=1',
    lastMessage: 'See you tomorrow!',
  },
  {
    id: '2',
    name: 'Bob Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    lastMessage: 'Got the files, thanks!',
  },
  {
    id: '3',
    name: 'Charlie Brown',
    avatar: 'https://i.pravatar.cc/150?img=3',
    lastMessage: 'Are we still meeting?',
  },
];

const ChatList = () => {
  const {styles} = useStyles();
  const navigation =
    useNavigation<NativeStackNavigationProp<DrawerParamList>>();

  const renderItem = ({item}: {item: ChatListItem}) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() =>
        navigation.navigate('Chat', {
          userId: item.id,
          userName: item.name,
          userAvatar: item.avatar,
        })
      }>
      <Image source={{uri: item.avatar}} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={mockChatList}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{padding: 10}}
      />
    </View>
  );
};

export default ChatList;
