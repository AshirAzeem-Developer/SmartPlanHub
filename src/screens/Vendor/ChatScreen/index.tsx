import React, {useEffect, useState, useCallback} from 'react';
import {GiftedChat, IMessage} from 'react-native-gifted-chat';
import io from 'socket.io-client';
import axios from 'axios';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {DrawerParamList} from '../../../navigators/navigatorParams';

type ChatScreenProps = NativeStackScreenProps<DrawerParamList, 'ChatScreen'>;
const socket = io('http://192.168.18.80:3000', {
  transports: ['websocket'],
  forceNew: true,
  reconnection: true,
});

export default function ChatScreen({route}: ChatScreenProps) {
  const {userId, receiverId, token} = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    socket.emit('register_user', userId);

    socket.on('chat_message', message => {
      const msg: IMessage = {
        _id: message._id || new Date().getTime(),
        text: message.message,
        createdAt: message.createdAt || new Date(),
        user: {_id: message.sender},
      };
      setMessages(prevMessages => GiftedChat.append(prevMessages, [msg]));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    axios
      .get(
        `http://192.168.18.80:3000/api/v1/chat/messages/${userId}/${receiverId}`,
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
            user: {_id: msg.sender},
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

    axios.post('http://192.168.18.80:3000/api/v1/chat/send', msgToSend, {
      headers: {Authorization: `Bearer ${token}`},
    });
  }, []);

  return (
    <GiftedChat messages={messages} onSend={onSend} user={{_id: userId}} />
  );
}
