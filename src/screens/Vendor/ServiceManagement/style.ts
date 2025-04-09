import {StyleSheet} from 'react-native';
import {useSizes} from '../../../constants/size';
import {getGlobalStyles} from '../../../constants/globalStyles';
import {useColors} from '../../../constants/color';

const useStyles = () => {
  const colors = useColors();
  const sizes = useSizes();
  const globalStyles = getGlobalStyles(colors, sizes);

  const styles = StyleSheet.create({
    container: {
      padding: sizes.WIDTH * 0.05,
      backgroundColor: '#fff',
    },
    heading: {
      color: '#fff',
      fontSize: sizes.WIDTH * 0.055,
      fontWeight: '700',
    },
    subHeading: {
      color: '#fff',
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '600',
      marginTop: sizes.HEIGHT * 0.006,
    },
    description: {
      color: '#f4f4f4',
      marginBottom: sizes.HEIGHT * 0.025,
    },
    addButton: {
      backgroundColor: '#000',
      padding: sizes.HEIGHT * 0.015,
      borderRadius: sizes.WIDTH * 0.02,
      marginBottom: sizes.HEIGHT * 0.025,
    },
    addButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '600',
    },
    serviceContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: sizes.WIDTH * 0.025,
    },
    serviceCard: {
      width: '48%',
      backgroundColor: '#f4f4f4',
      padding: sizes.HEIGHT * 0.015,
      borderRadius: sizes.WIDTH * 0.025,
      marginBottom: sizes.HEIGHT * 0.02,
    },
    serviceTitle: {
      fontWeight: '700',
    },
    serviceRate: {
      fontWeight: '600',
    },
    serviceDescription: {
      fontSize: sizes.WIDTH * 0.033,
      marginTop: sizes.HEIGHT * 0.006,
      color: '#444',
    },
    serviceAvailability: {
      fontSize: sizes.WIDTH * 0.03,
      color: '#888',
      marginTop: sizes.HEIGHT * 0.005,
    },
    editText: {
      color: '#007bff',
      marginTop: sizes.HEIGHT * 0.01,
      textDecorationLine: 'underline',
    },
    deleteText: {
      color: '#ff4d4f',
      marginTop: sizes.HEIGHT * 0.01,
      textDecorationLine: 'underline',
    },
    portfolioHeading: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '700',
      marginVertical: sizes.HEIGHT * 0.012,
    },
    portfolioContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: sizes.WIDTH * 0.025,
    },
    portfolioBox: {
      width: sizes.WIDTH * 0.4,
      height: sizes.WIDTH * 0.4,
      backgroundColor: '#eaeaea',
      borderRadius: sizes.WIDTH * 0.025,
      justifyContent: 'center',
      alignItems: 'center',
    },
    plusText: {
      fontSize: sizes.WIDTH * 0.08,
      color: '#555',
    },
    portfolioImage: {
      width: sizes.WIDTH * 0.4,
      height: sizes.WIDTH * 0.4,
      borderRadius: sizes.WIDTH * 0.025,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: '#000000aa',
      justifyContent: 'center',
      padding: sizes.WIDTH * 0.05,
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: sizes.WIDTH * 0.025,
      padding: sizes.WIDTH * 0.05,
    },
    modalTitle: {
      fontSize: sizes.WIDTH * 0.045,
      fontWeight: '700',
      marginBottom: sizes.HEIGHT * 0.015,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: sizes.WIDTH * 0.015,
      marginBottom: sizes.HEIGHT * 0.015,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: sizes.WIDTH * 0.025,
    },
    saveBtn: {
      backgroundColor: '#000',
      padding: sizes.HEIGHT * 0.015,
      borderRadius: sizes.WIDTH * 0.015,
    },
    cancelBtn: {
      padding: sizes.HEIGHT * 0.015,
    },
    saveText: {
      color: '#fff',
      fontWeight: '600',
    },
    cancelText: {
      color: '#000',
      fontWeight: '500',
    },
    flatListContainer: {
      paddingBottom: sizes.HEIGHT * 0.025,
    },
    flatListRow: {
      justifyContent: 'space-between',
      marginBottom: sizes.HEIGHT * 0.015,
    },
  });

  return {
    sizes,
    styles,
    globalStyles,
  };
};

export default useStyles;
