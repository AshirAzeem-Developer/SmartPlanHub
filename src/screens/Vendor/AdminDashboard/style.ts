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
      backgroundColor: '#000',
      padding: sizes.HEIGHT * 0.025,
      borderBottomEndRadius: sizes.WIDTH * 0.04,
      borderBottomLeftRadius: sizes.WIDTH * 0.04,
      marginBottom: sizes.HEIGHT * 0.02,
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
      marginTop: sizes.HEIGHT * 0.005,
    },
    description: {
      color: '#bbb',
      marginTop: sizes.HEIGHT * 0.004,
    },
    analyticsButton: {
      flexDirection: 'row',
      backgroundColor: '#000',
      padding: sizes.HEIGHT * 0.015,
      borderRadius: sizes.WIDTH * 0.03,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: sizes.HEIGHT * 0.025,
      gap: 8,
    },
    analyticsText: {
      color: '#fff',
      fontWeight: '600',
    },
    summaryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: sizes.HEIGHT * 0.03,
    },
    summaryCard: {
      flex: 1,
      backgroundColor: '#f6f6f6',
      borderRadius: sizes.WIDTH * 0.03,
      padding: sizes.HEIGHT * 0.02,
      marginHorizontal: sizes.WIDTH * 0.01,
      alignItems: 'center',
    },
    summaryValue: {
      fontSize: sizes.WIDTH * 0.05,
      fontWeight: '700',
    },
    summaryLabel: {
      fontSize: sizes.WIDTH * 0.033,
      color: '#777',
      marginTop: sizes.HEIGHT * 0.007,
      textAlign: 'center',
    },
    sectionTitle: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '700',
      marginBottom: sizes.HEIGHT * 0.015,
    },
    activityCard: {
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
    activityHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: sizes.HEIGHT * 0.01,
      alignItems: 'center',
    },
    activityTitle: {
      fontWeight: '600',
      fontSize: sizes.WIDTH * 0.036,
    },
    activityDesc: {
      fontSize: sizes.WIDTH * 0.033,
      color: '#333',
      marginBottom: sizes.HEIGHT * 0.008,
    },
    activityTime: {
      fontSize: sizes.WIDTH * 0.032,
      color: '#999',
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#00000088',
      justifyContent: 'center',
      alignItems: 'center',
      padding: sizes.WIDTH * 0.05,
      zIndex: 10,
    },
    modalCard: {
      backgroundColor: '#fff',
      borderRadius: sizes.WIDTH * 0.03,
      padding: sizes.HEIGHT * 0.025,
      width: '100%',
      maxWidth: 350,
      elevation: 5,
    },
    modalTitle: {
      fontSize: sizes.WIDTH * 0.045,
      fontWeight: '700',
      marginBottom: sizes.HEIGHT * 0.015,
      textAlign: 'center',
    },
    modalInfo: {
      fontSize: sizes.WIDTH * 0.035,
      color: '#333',
      marginBottom: sizes.HEIGHT * 0.012,
    },
    closeBtn: {
      marginTop: sizes.HEIGHT * 0.02,
      alignSelf: 'center',
      backgroundColor: '#000',
      paddingHorizontal: sizes.WIDTH * 0.06,
      paddingVertical: sizes.HEIGHT * 0.015,
      borderRadius: sizes.WIDTH * 0.03,
    },
    closeBtnText: {
      color: '#fff',
      fontWeight: '600',
    },
    seeMoreButton: {
      alignItems: 'center',
      marginTop: sizes.HEIGHT * 0.015,
    },
    seeMoreText: {
      color: '#007bff',
      fontWeight: '600',
      fontSize: sizes.WIDTH * 0.035,
    },
  });

  return {
    sizes,
    styles,
    globalStyles,
  };
};

export default useStyles;
