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
      width: sizes.WIDTH * 0.28,
      padding: sizes.WIDTH * 0.02,
      borderWidth: sizes.WIDTH * 0.002,
      borderColor: '#ddd',
      borderRadius: sizes.WIDTH * 0.02,
      marginBottom: sizes.WIDTH * 0.02,
      marginHorizontal: sizes.WIDTH * 0.01,
    },
    title: {fontWeight: 'bold'},
    price: {fontSize: sizes.WIDTH * 0.045, fontWeight: 'bold'},
    description: {
      color: 'gray',
      textAlign: 'left',
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};
export default useStyles;
