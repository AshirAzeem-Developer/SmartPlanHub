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
    card: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      padding: 12,
      borderRadius: 10,
      marginVertical: 6,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 4,
      elevation: 2,
    },
    image: {
      width: 50,
      height: 50,
      borderRadius: 10,
      marginRight: 10,
    },
    content: {
      flex: 1,
    },
    comment: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 2,
    },
    reviewer: {
      fontSize: 12,
      color: '#555',
    },
    date: {
      fontSize: 12,
      color: '#777',
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};
export default useStyles;
