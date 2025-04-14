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
    wrapper: {
      width: '48%',
      marginBottom: 12,
      position: 'relative',
    },
    button: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: '#fff',
    },
    buttonContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    label: {
      fontSize: 14,
      color: '#333',
    },
    dropdownIcon: {
      fontSize: 12,
      marginLeft: 8,
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      backgroundColor: '#fff',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 6,
      zIndex: 999,
      paddingVertical: 4,
    },
    dropdownItem: {
      paddingVertical: 10,
      paddingHorizontal: 16,
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};
export default useStyles;
