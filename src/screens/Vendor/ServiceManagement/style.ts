import {StyleSheet} from 'react-native';
import {useColors} from '../../../constants/color';
import {useSizes} from '../../../constants/size';
import {getGlobalStyles} from '../../../constants/globalStyles';

const useStyles = () => {
  const colors = useColors();
  const sizes = useSizes();
  const globalStyles = getGlobalStyles(colors, sizes);

  const styles = StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: '#fff',
    },
    heading: {
      color: '#fff',
      fontSize: 22,
      fontWeight: '700',
    },
    subHeading: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      marginTop: 5,
    },
    description: {
      color: '#f4f4f4',
      marginBottom: 20,
    },
    addButton: {
      backgroundColor: '#000',
      padding: 12,
      borderRadius: 8,
      marginBottom: 20,
    },
    addButtonText: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '600',
    },
    serviceContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    serviceCard: {
      width: '48%',
      backgroundColor: '#f4f4f4',
      padding: 12,
      borderRadius: 10,
      marginBottom: 15,
    },
    serviceTitle: {
      fontWeight: '700',
    },
    serviceRate: {
      fontWeight: '600',
    },
    serviceDescription: {
      fontSize: 13,
      marginTop: 5,
      color: '#444',
    },
    serviceAvailability: {
      fontSize: 12,
      color: '#888',
      marginTop: 4,
    },
    editText: {
      color: '#007bff',
      marginTop: 8,
      textDecorationLine: 'underline',
    },
    deleteText: {
      color: '#ff4d4f',
      marginTop: 8,
      textDecorationLine: 'underline',
    },
    portfolioHeading: {
      fontSize: 16,
      fontWeight: '700',
      marginVertical: 10,
    },
    portfolioContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    portfolioBox: {
      width: sizes.WIDTH * 0.4,
      height: sizes.WIDTH * 0.4,
      backgroundColor: '#eaeaea',
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    plusText: {
      fontSize: 32,
      color: '#555',
    },
    portfolioImage: {
      width: sizes.WIDTH * 0.4,
      height: sizes.WIDTH * 0.4,
      borderRadius: 10,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: '#000000aa',
      justifyContent: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '700',
      marginBottom: 10,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 6,
      marginBottom: 10,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },
    saveBtn: {
      backgroundColor: '#000',
      padding: 10,
      borderRadius: 6,
    },
    cancelBtn: {
      padding: 10,
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
      paddingBottom: 20,
    },
    flatListRow: {
      justifyContent: 'space-between',
      marginBottom: 10,
    },
  });

  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
