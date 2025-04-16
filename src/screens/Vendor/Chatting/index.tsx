import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import useStyles from './style';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'other';
}

const Chat: React.FC = () => {
  const {styles} = useStyles();
  const [messages, setMessages] = useState<Message[]>([
    {id: '1', text: 'Hello there!', sender: 'other'},
    {id: '2', text: 'Hi! How are you?', sender: 'user'},
  ]);
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
      };
      setMessages(prev => [...prev, newMessage]);
      setInputText('');
    }
  };

  useEffect(() => {
    flatListRef.current?.scrollToEnd({animated: true});
  }, [messages]);

  const renderItem = ({item}: {item: Message}) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.otherMessage,
      ]}>
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        {/* <CustomHeader
          showBackButton
          title="Adnan"
          titleStyles={{
            textAlign: 'left',
            fontSize: 25,
          }}
        /> */}

        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <FlatList
            ref={flatListRef}
            data={messages}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={{padding: 10}}
          />
          <View style={styles.inputContainer}>
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Type a message"
              style={styles.input}
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
              <Text style={{color: '#fff'}}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Chat;
