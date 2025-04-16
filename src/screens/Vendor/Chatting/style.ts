import {StyleSheet} from 'react-native';
import {useSizes} from '../../../constants/size';
import {getGlobalStyles} from '../../../constants/globalStyles';
import {useColors} from '../../../constants/color';

const useStyles = () => {
  const colors = useColors();
  const sizes = useSizes();
  const globalStyles = getGlobalStyles(colors, sizes);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f9f9f9',
    },
    messageContainer: {
      padding: 10,
      borderRadius: 10,
      marginVertical: 5,
      maxWidth: '80%',
    },
    userMessage: {
      backgroundColor: '#000000',
      alignSelf: 'flex-end',
    },
    otherMessage: {
      backgroundColor: 'gray',
      alignSelf: 'flex-start',
    },
    messageText: {
      color: '#ffffff',
    },
    messageHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
    },
    avatar: {
      width: 24,
      height: 24,
      borderRadius: 12,
      marginRight: 8,
    },
    timestamp: {
      fontSize: 12,
      color: '#ccc',
    },
    imageAttachment: {
      width: 150,
      height: 150,
      marginTop: 8,
      borderRadius: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      padding: 20,
      alignItems: 'center',
      borderTopWidth: 1,
      borderColor: '#ddd',
      backgroundColor: '#fff',
    },
    input: {
      flex: 1,
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 12,
      borderRadius: 20,
      height: 40,
      marginHorizontal: 8,
    },
    sendButton: {
      backgroundColor: '#000000',
      paddingHorizontal: 15,
      paddingVertical: 8,
      borderRadius: 20,
    },
    emojiButton: {
      fontSize: 22,
    },
    attachButton: {
      fontSize: 20,
      marginHorizontal: 5,
    },
  });

  return {sizes, styles, globalStyles};
};

export default useStyles;
