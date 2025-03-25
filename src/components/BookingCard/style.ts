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
      backgroundColor: 'white',
      padding: sizes.WIDTH * 0.03,
      borderRadius: sizes.WIDTH * 0.025,
      marginVertical: sizes.HEIGHT * 0.01,
      alignItems: 'center',
      elevation: 3,
    },
    image: {
      width: sizes.WIDTH * 0.2,
      height: sizes.WIDTH * 0.2,
      borderRadius: sizes.WIDTH * 0.025,
      marginRight: sizes.WIDTH * 0.03,
    },
    service: {fontSize: sizes.WIDTH * 0.038, fontWeight: 'bold'},
    vendor: {fontSize: sizes.WIDTH * 0.03, color: 'gray'},
    date: {fontSize: sizes.WIDTH * 0.028, color: 'gray'},
  });
  return {
    colors,
    sizes,
    styles,
  };
};
export default useStyles;
