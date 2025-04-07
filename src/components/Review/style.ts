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
      fontSize: sizes.WIDTH * 0.05,
      fontWeight: 'bold',
      marginBottom: sizes.HEIGHT * 0.02,
      textAlign: 'center',
    },
    subTitle: {
      fontSize: sizes.WIDTH * 0.04,
      marginBottom: sizes.HEIGHT * 0.01,
      textAlign: 'center',
    },
    label: {
      ...globalStyles.TEXT_STYLE,
      fontWeight: '600',
      marginTop: sizes.HEIGHT * 0.02,
      marginBottom: sizes.HEIGHT * 0.01,
    },
    starContainer: {
      flexDirection: 'row',
      marginBottom: sizes.HEIGHT * 0.02,
    },
    star: {
      ...globalStyles.TEXT_STYLE,
      fontSize: sizes.WIDTH * 0.07,
      marginHorizontal: sizes.WIDTH * 0.01,
    },
    filledStar: {
      color: '#FFD700',
    },
    emptyStar: {
      color: '#ccc',
    },
    textInput: {
      borderWidth: sizes.WIDTH * 0.002,
      borderColor: '#ccc',
      borderRadius: sizes.WIDTH * 0.02,
      padding: sizes.WIDTH * 0.03,
      marginBottom: sizes.HEIGHT * 0.005,
      textAlignVertical: 'top',
    },
    picker: {
      borderWidth: sizes.WIDTH * 0.002,
      borderColor: '#ccc',
      borderRadius: sizes.WIDTH * 0.02,
      marginBottom: sizes.HEIGHT * 0.01,
      overflow: 'hidden',
    },
    datePicker: {
      borderWidth: sizes.WIDTH * 0.002,
      borderColor: '#ccc',
      borderRadius: sizes.WIDTH * 0.02,
      padding: sizes.WIDTH * 0.03,
      marginBottom: sizes.HEIGHT * 0.005,
    },
    submitButton: {
      backgroundColor: '#007BFF',
      padding: sizes.WIDTH * 0.03,
      borderRadius: sizes.WIDTH * 0.02,
      marginTop: sizes.HEIGHT * 0.02,
      alignItems: 'center',
    },
    submitText: {
      color: 'white',
      fontWeight: 'bold',
    },
    cancelText: {
      textAlign: 'center',
      color: '#555',
      marginTop: sizes.HEIGHT * 0.01,
    },
  });
  return {
    colors,
    sizes,
    styles,
  };
};
export default useStyles;
