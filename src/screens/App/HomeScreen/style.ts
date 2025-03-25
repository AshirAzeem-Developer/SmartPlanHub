import {StyleSheet, Dimensions} from 'react-native';
// local
import {useColors} from '../../../constants/color';
import {useSizes} from '../../../constants/size';
import {getGlobalStyles} from '../../../constants/globalStyles';
// dimenstion
const {width, height} = Dimensions.get('window');
const useStyles = () => {
  const colors = useColors();
  const sizes = useSizes();
  const globalStyles = getGlobalStyles(colors, sizes);
  const styles = StyleSheet.create({
    container: {
      padding: sizes.WIDTH * 0.05,
      backgroundColor: '#f4f4f4',
      paddingBottom: sizes.HEIGHT * 0.4,
    },

    heading: {
      fontSize: sizes.WIDTH * 0.065,
      fontWeight: 'bold',
      marginVertical: sizes.HEIGHT * 0.01,
    },
    subHeading: {
      fontSize: sizes.WIDTH * 0.05,
      fontWeight: 'bold',
      marginTop: sizes.HEIGHT * 0.02,
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};
export default useStyles;
