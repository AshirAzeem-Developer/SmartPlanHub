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
      width: sizes.WIDTH * 0.42,
      height: sizes.HEIGHT * 0.28,

      marginBottom: 10,
      marginHorizontal: sizes.WIDTH * 0.02,
      marginTop: sizes.WIDTH * 0.02,
      backgroundColor: '#fff',
      borderRadius: sizes.WIDTH * 0.03,
      padding: sizes.WIDTH * 0.015,

      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      // width: sizes.WIDTH * 0.88,
    },
    image: {
      width: sizes.WIDTH * 0.35,
      height: sizes.HEIGHT * 0.2,
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};
export default useStyles;
