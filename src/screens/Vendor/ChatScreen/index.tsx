import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  GiftedChat,
  IMessage,
  InputToolbar,
  Composer,
  Send,
  Bubble,
} from 'react-native-gifted-chat';

import io from 'socket.io-client';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerParamList} from '../../../navigators/navigatorParams';
import icons from '../../../assets/icons';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';

type ChatScreenProps = NativeStackScreenProps<DrawerParamList, 'ChatScreen'>;

const socket = io('http://192.168.0.102:3000', {
  transports: ['websocket'],
  forceNew: true,
  reconnection: true,
});

export default function ChatScreen({route, navigation}: ChatScreenProps) {
  const {userId, receiverId, token, userName} = route.params;

  console.log(
    'User ID from route params:',
    userId,
    'Receiver ID from route params:',
    receiverId,
    'User Name from route params:',
    userName,
  );

  const [messages, setMessages] = useState<IMessage[]>([]);
  const [receiverName, setReceiverName] = useState(
    route.params.userName as any,
  );
  console.log('thisis the receiver name', receiverName);

  // useEffect(() => {
  //   // Fetch receiver info
  //   axios
  //     .get(`http://192.168.0.102:3000/api/users/${receiverId}`, {
  //       headers: {Authorization: `Bearer ${token}`},
  //     })
  //     .then(res => {
  //       setReceiverName(res.data.user.name || res.data.user.email);
  //       console.log('Response from receiver info:', res);
  //     });

  //   socket.emit('register_user', userId);

  //   socket.on('chat_message', message => {
  //     const msg: IMessage = {
  //       _id: message._id || new Date().getTime(),
  //       text: message.message,
  //       createdAt: message.createdAt || new Date(),
  //       user: {
  //         _id: message.sender === userId ? userId : receiverId, // ensure correct alignment
  //       },
  //     };
  //     setMessages(prevMessages => GiftedChat.append(prevMessages, [msg]));
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  useEffect(() => {
    axios
      .get(
        `http://192.168.0.102:3000/api/v1/chat/messages/${userId}/${receiverId}`,
        {
          headers: {Authorization: `Bearer ${token}`},
        },
      )
      .then(res => {
        const fetchedMessages: IMessage[] = res.data.messages.map(
          (msg: any) => ({
            _id: msg._id,
            text: msg.message,
            createdAt: msg.createdAt,
            user: {
              _id: msg.sender === userId ? userId : receiverId,
            },
          }),
        );

        setMessages(fetchedMessages.reverse());
      });
  }, []);

  const onSend = useCallback((messages: IMessage[] = []) => {
    const message = messages[0];
    const msgToSend = {
      sender: userId,
      receiver: receiverId,
      message: message.text,
    };

    socket.emit('chat_message', msgToSend);
    setMessages(prevMessages => GiftedChat.append(prevMessages, messages));

    axios.post('http://192.168.0.102:3000/api/v1/chat/send', msgToSend, {
      headers: {Authorization: `Bearer ${token}`},
    });
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <CustomHeader
        title={receiverName}
        showBackButton
        titleStyles={{
          color: 'white',
          textAlign: 'left',
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={onSend}
        user={{_id: userId}}
        renderInputToolbar={props => (
          <InputToolbar
            {...props}
            containerStyle={styles.inputToolbar}
            primaryStyle={{alignItems: 'center'}}
          />
        )}
        renderComposer={props => (
          <Composer
            {...props}
            textInputStyle={styles.composer}
            placeholder="Type a message..."
          />
        )}
        renderSend={props => (
          <Send {...props}>
            <View style={styles.sendButton}>
              <Image
                source={icons.SEND}
                width={20}
                height={20}
                style={{
                  width: 20,
                  height: 20,
                  tintColor: 'white',
                }}
              />
            </View>
          </Send>
        )}
        renderBubble={props => (
          <Bubble
            {...props}
            wrapperStyle={{
              right: {
                backgroundColor: '#007bff',
                padding: 6,
                borderRadius: 10,
              },
              left: {
                backgroundColor: '#e4e6eb',
                padding: 6,
                borderRadius: 10,
              },
            }}
            textStyle={{
              right: {color: 'white'},
              left: {color: 'black'},
            }}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 55,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 0.6,
    borderBottomColor: '#ccc',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#f5f5f5',
  },
  composer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingTop: 6,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sendButton: {
    backgroundColor: '#007bff',
    borderRadius: 20,
    padding: 10,
    marginRight: 6,
    marginBottom: 4,
  },
});
