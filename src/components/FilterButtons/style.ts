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
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: sizes.HEIGHT * 0.02,
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: sizes.WIDTH * 0.015,
    },
    button: {
      backgroundColor: '#ffffff',
      padding: sizes.WIDTH * 0.02,
      borderRadius: sizes.WIDTH * 0.05,
      marginRight: sizes.WIDTH * 0.025,
      marginBottom: sizes.WIDTH * 0.025,
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};
export default useStyles;
