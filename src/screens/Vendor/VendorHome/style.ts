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
      flex: 1,
    },
    heading: {
      color: '#fff',
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 10,
    },
    subHeading: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '600',
    },
    description: {
      fontSize: 14,
      color: '#f4f4f4',
      marginBottom: 20,
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 20,
    },
    card: {
      width: '48%',
      backgroundColor: '#f5f5f5',
      padding: 15,
      borderRadius: 10,
      marginBottom: 10,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '600',
    },
    cardValue: {
      fontSize: 22,
      fontWeight: '700',
      marginVertical: 5,
    },
    cardSubText: {
      color: '#777',
    },
    link: {
      color: '#0066cc',
      textDecorationLine: 'underline',
    },
    quickActionsTitle: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 10,
    },
    quickActionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
    },
    actionButton: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 10,
      backgroundColor: '#f5f5f5',
      padding: 12,
      borderRadius: 10,
      marginBottom: 10,
    },
    actionText: {
      fontSize: 14,
      fontWeight: '500',
    },
  });

  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
