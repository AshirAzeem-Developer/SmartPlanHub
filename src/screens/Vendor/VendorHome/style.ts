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
      flex: 1,
    },
    heading: {
      color: '#fff',
      fontSize: sizes.WIDTH * 0.06,
      fontWeight: '700',
      marginBottom: sizes.HEIGHT * 0.015,
    },
    subHeading: {
      color: '#fff',
      fontSize: sizes.WIDTH * 0.045,
      fontWeight: '600',
    },
    description: {
      fontSize: sizes.WIDTH * 0.035,
      color: '#f4f4f4',
      marginBottom: sizes.HEIGHT * 0.025,
    },
    cardContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: sizes.WIDTH * 0.025,
      marginBottom: sizes.HEIGHT * 0.025,
    },
    card: {
      width: '48%',
      backgroundColor: '#f5f5f5',
      padding: sizes.WIDTH * 0.04,
      borderRadius: sizes.WIDTH * 0.025,
      marginBottom: sizes.HEIGHT * 0.015,
    },
    cardTitle: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '600',
    },
    cardValue: {
      fontSize: sizes.WIDTH * 0.055,
      fontWeight: '700',
      marginVertical: sizes.HEIGHT * 0.007,
    },
    cardSubText: {
      color: '#777',
    },
    link: {
      color: '#0066cc',
      textDecorationLine: 'underline',
    },
    quickActionsTitle: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '700',
      marginBottom: sizes.HEIGHT * 0.015,
    },
    quickActionsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: sizes.WIDTH * 0.025,
    },
    actionButton: {
      width: '48%',
      flexDirection: 'row',
      alignItems: 'center',
      gap: sizes.WIDTH * 0.025,
      backgroundColor: '#f5f5f5',
      padding: sizes.WIDTH * 0.035,
      borderRadius: sizes.WIDTH * 0.025,
      marginBottom: sizes.HEIGHT * 0.015,
    },
    actionText: {
      fontSize: sizes.WIDTH * 0.035,
      fontWeight: '500',
    },
  });

  return {
    sizes,
    styles,
    globalStyles,
  };
};

export default useStyles;
