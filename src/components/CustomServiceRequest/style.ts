import {StyleSheet, Dimensions} from 'react-native';
// local
import {useColors} from '../../constants/color';
import {useSizes} from '../../constants/size';
import {getGlobalStyles} from '../../constants/globalStyles';
// dimenstion
const {width, height} = Dimensions.get('window');
const useStyles = () => {
  const colors = useColors();
  const sizes = useSizes();
  const globalStyles = getGlobalStyles(colors, sizes);
  const styles = StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 6,
      textAlign: 'center',
    },
    subTitle: {
      fontSize: 16,
      marginBottom: 12,
      textAlign: 'center',
    },
    inputBox: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
      textAlignVertical: 'top',
    },
    label: {
      fontWeight: '600',
      marginVertical: 8,
    },
    picker: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      marginBottom: 12,
      overflow: 'hidden',
      color: '#000',
    },
    datePicker: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      padding: 12,
      marginBottom: 12,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderWidth: 1,
      borderColor: '#888',
      marginRight: 10,
      borderRadius: 4,
    },
    checked: {
      backgroundColor: '#007BFF',
    },
    submitButton: {
      backgroundColor: '#007BFF',
      padding: 14,
      borderRadius: 10,
      marginTop: 20,
      alignItems: 'center',
    },
    submitText: {
      color: 'white',
      fontWeight: 'bold',
    },
    cancelText: {
      textAlign: 'center',
      color: '#555',
      marginTop: 12,
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};
export default useStyles;
