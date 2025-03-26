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
    contactButton: {
      backgroundColor: 'blue',
      padding: 10,
      borderRadius: 5,
      marginTop: 5,
    },
    requestButton: {
      backgroundColor: 'green',
      padding: 10,
      borderRadius: 5,
      marginTop: 5,
    },
    buttonText: {color: 'white', textAlign: 'center'},
  });
  return {
    colors,
    sizes,
    styles,
  };
};
export default useStyles;
