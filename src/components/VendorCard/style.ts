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
      flex: 1,
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 10,
      margin: 5,
      alignItems: 'center',
      elevation: 3,
    },
    image: {
      width: sizes.WIDTH * 0.35,
      height: sizes.HEIGHT * 0.25,
      borderRadius: 10,
    },
    name: {
      fontSize: sizes.WIDTH * 0.032,
      fontWeight: 'bold',
      marginTop: sizes.HEIGHT * 0.01,
    },
    rating: {
      position: 'absolute',
      top: sizes.HEIGHT * 0.018,
      right: sizes.WIDTH * 0.08,
      flexDirection: 'row',
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: 5,
      borderRadius: 5,
      fontSize: sizes.WIDTH * 0.035,
      color: 'white',
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};
export default useStyles;
