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
      backgroundColor: '#fff',
      padding: sizes.WIDTH * 0.05,
    },
    header: {
      width: sizes.WIDTH,
      backgroundColor: '#000',
      padding: sizes.HEIGHT * 0.025,
      borderBottomEndRadius: sizes.WIDTH * 0.04,
      borderBottomLeftRadius: sizes.WIDTH * 0.04,
      marginBottom: sizes.HEIGHT * 0.025,
    },
    heading: {
      fontSize: sizes.WIDTH * 0.055,
      fontWeight: '700',
      color: '#fff',
    },
    subHeading: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '600',
      color: '#fff',
      marginTop: sizes.HEIGHT * 0.006,
    },
    description: {
      color: '#bbb',
      marginTop: sizes.HEIGHT * 0.003,
    },
    overallRatingBtn: {
      flexDirection: 'row',
      backgroundColor: '#000',
      padding: sizes.HEIGHT * 0.015,
      borderRadius: sizes.WIDTH * 0.03,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: sizes.HEIGHT * 0.025,
      gap: sizes.WIDTH * 0.02,
    },
    overallRatingText: {
      color: '#fff',
      fontWeight: '600',
    },
    metricsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: sizes.HEIGHT * 0.03,
    },
    metricBox: {
      backgroundColor: '#f6f6f6',
      borderRadius: sizes.WIDTH * 0.03,
      padding: sizes.HEIGHT * 0.02,
      flex: 1,
      marginHorizontal: sizes.WIDTH * 0.01,
      alignItems: 'center',
    },
    metricValue: {
      fontSize: sizes.WIDTH * 0.05,
      fontWeight: '700',
    },
    metricLabel: {
      fontSize: sizes.WIDTH * 0.03,
      color: '#777',
      marginTop: sizes.HEIGHT * 0.006,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '700',
      marginBottom: sizes.HEIGHT * 0.015,
    },
    reviewCard: {
      backgroundColor: '#f9f9f9',
      padding: sizes.HEIGHT * 0.02,
      borderRadius: sizes.WIDTH * 0.03,
      marginBottom: sizes.HEIGHT * 0.015,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
    reviewHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: sizes.HEIGHT * 0.01,
    },
    reviewerName: {
      fontWeight: '600',
      fontSize: sizes.WIDTH * 0.035,
    },
    starsRow: {
      flexDirection: 'row',
    },
    reviewText: {
      fontSize: sizes.WIDTH * 0.035,
      color: '#333',
      marginBottom: sizes.HEIGHT * 0.008,
    },
    reviewTime: {
      fontSize: sizes.WIDTH * 0.03,
      color: '#999',
    },
  });

  return {
    sizes,
    styles,
    globalStyles,
  };
};

export default useStyles;
