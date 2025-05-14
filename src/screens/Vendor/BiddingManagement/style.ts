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
      flex: 1,
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#000',
      padding: sizes.HEIGHT * 0.025,
      borderBottomLeftRadius: sizes.WIDTH * 0.05,
      borderBottomRightRadius: sizes.WIDTH * 0.05,
    },
    heading: {
      fontSize: sizes.WIDTH * 0.055,
      fontWeight: '700',
      color: '#fff',
    },
    subHeading: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '600',
      marginTop: sizes.HEIGHT * 0.005,
      color: '#fff',
    },
    description: {
      color: '#bbb',
      marginTop: sizes.HEIGHT * 0.004,
    },
    viewAllButton: {
      flexDirection: 'row',
      backgroundColor: '#000',
      padding: sizes.HEIGHT * 0.015,
      margin: sizes.WIDTH * 0.05,
      borderRadius: sizes.WIDTH * 0.03,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 8,
    },
    viewAllText: {
      color: '#fff',
      fontWeight: '600',
    },
    bidCardsContainer: {
      paddingHorizontal: sizes.WIDTH * 0.05,
      marginTop: sizes.HEIGHT * 0.02,
    },
    bidCard: {
      backgroundColor: '#fff',
      borderRadius: sizes.WIDTH * 0.03,
      padding: sizes.HEIGHT * 0.02,
      marginBottom: sizes.HEIGHT * 0.02,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.08,
      shadowRadius: 6,
      elevation: 3,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: sizes.HEIGHT * 0.012,
    },
    cardTitle: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '700',
    },
    statusTag: {
      paddingHorizontal: sizes.WIDTH * 0.025,
      paddingVertical: sizes.HEIGHT * 0.005,
      borderRadius: sizes.WIDTH * 0.06,
      width: sizes.WIDTH * 0.2,
      alignSelf: 'flex-end',
      textAlign: 'center',
      marginBottom: sizes.HEIGHT * 0.015,
    },
    statusText: {
      fontSize: sizes.WIDTH * 0.03,
      fontWeight: '600',
      color: '#fff',
      textAlign: 'center',
    },
    statusOpen: {
      backgroundColor: '#4a90e2',
    },
    statusPlaced: {
      backgroundColor: '#4CAF50',
    },
    cardBody: {
      gap: sizes.HEIGHT * 0.008,
    },
    bidInfo: {
      fontSize: sizes.WIDTH * 0.033,
      color: '#333',
    },
    label: {
      fontWeight: '600',
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: sizes.HEIGHT * 0.015,
    },
    acceptBtn: {
      backgroundColor: '#000',
      paddingVertical: sizes.HEIGHT * 0.01,
      paddingHorizontal: sizes.WIDTH * 0.04,
      borderRadius: sizes.WIDTH * 0.025,
    },
    declineBtn: {
      backgroundColor: '#f44336',
      paddingVertical: sizes.HEIGHT * 0.01,
      paddingHorizontal: sizes.WIDTH * 0.04,
      borderRadius: sizes.WIDTH * 0.025,
    },
    btnText: {
      color: '#fff',
      fontWeight: '600',
    },
    viewDetails: {
      color: '#000',
      fontWeight: '600',
      marginTop: sizes.HEIGHT * 0.015,
      textDecorationLine: 'underline',
    },
    notificationHeading: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '700',
      marginHorizontal: sizes.WIDTH * 0.05,
      marginTop: sizes.HEIGHT * 0.025,
      marginBottom: sizes.HEIGHT * 0.012,
    },
    notificationCard: {
      backgroundColor: '#f9f9f9',
      marginHorizontal: sizes.WIDTH * 0.05,
      padding: sizes.HEIGHT * 0.015,
      borderRadius: sizes.WIDTH * 0.025,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: sizes.HEIGHT * 0.015,
      gap: sizes.WIDTH * 0.02,
    },
    notificationTitle: {
      fontWeight: '600',
      fontSize: sizes.WIDTH * 0.035,
    },
    notificationMessage: {
      flex: 1,
      fontSize: sizes.WIDTH * 0.033,
      color: '#555',
    },
    modalOverlay: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      backgroundColor: '#00000088',
      justifyContent: 'center',
      alignItems: 'center',
      padding: sizes.WIDTH * 0.05,
      zIndex: 10,
    },
    modalCard: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: sizes.WIDTH * 0.03,
      padding: sizes.HEIGHT * 0.025,
      elevation: 5,
    },
    modalTitle: {
      fontSize: sizes.WIDTH * 0.045,
      fontWeight: '700',
      marginBottom: sizes.HEIGHT * 0.02,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: sizes.WIDTH * 0.025,

      marginBottom: sizes.HEIGHT * 0.025,
      fontSize: sizes.WIDTH * 0.035,
    },
    modalButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalSaveBtn: {
      backgroundColor: '#000',
      paddingVertical: sizes.HEIGHT * 0.015,
      paddingHorizontal: sizes.WIDTH * 0.05,
      borderRadius: sizes.WIDTH * 0.025,
    },
    modalCancelBtn: {
      backgroundColor: '#f2f2f2',
      paddingVertical: sizes.HEIGHT * 0.015,
      paddingHorizontal: sizes.WIDTH * 0.05,
      borderRadius: sizes.WIDTH * 0.025,
    },
    modalSaveText: {
      color: '#fff',
      fontWeight: '600',
    },
    modalCancelText: {
      color: '#000',
      fontWeight: '600',
    },
    noBidsText: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: sizes.HEIGHT * 0.05,
    },
  });

  return {
    sizes,
    styles,
    globalStyles,
  };
};

export default useStyles;
