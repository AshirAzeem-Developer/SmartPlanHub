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
      backgroundColor: '#f2f2f2',
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
      color: '#666666',
      marginBottom: sizes.HEIGHT * 0.02,
    },
    calendarButton: {
      flexDirection: 'row',
      backgroundColor: '#000',
      padding: sizes.HEIGHT * 0.015,
      borderRadius: sizes.WIDTH * 0.02,
      alignItems: 'center',
      justifyContent: 'center',
      gap: sizes.WIDTH * 0.015,
      marginBottom: sizes.HEIGHT * 0.025,
    },
    calendarText: {
      color: '#fff',
      fontWeight: '600',
    },
    bookingsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: sizes.WIDTH * 0.025,
      marginBottom: sizes.HEIGHT * 0.03,
    },
    bookingCard: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: sizes.WIDTH * 0.03,
      padding: sizes.HEIGHT * 0.02,
      marginBottom: sizes.HEIGHT * 0.02,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 4,
    },
    cardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: sizes.HEIGHT * 0.01,
    },
    cardTitle: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '700',
    },
    statusTag: {
      paddingVertical: sizes.HEIGHT * 0.005,
      paddingHorizontal: sizes.WIDTH * 0.025,
      borderRadius: sizes.WIDTH * 0.05,
    },
    statusText: {
      fontSize: sizes.WIDTH * 0.03,
      fontWeight: '600',
      color: '#fff',
    },
    statusPending: {
      backgroundColor: '#f4c430',
    },
    statusConfirmed: {
      backgroundColor: '#4CAF50',
    },
    statusDeclined: {
      backgroundColor: '#f44336',
    },
    cardBody: {
      gap: sizes.HEIGHT * 0.01,
    },
    label: {
      fontWeight: '600',
    },
    bookingInfo: {
      fontSize: sizes.WIDTH * 0.032,
      color: '#333',
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: sizes.HEIGHT * 0.015,
    },
    acceptBtn: {
      backgroundColor: '#4CAF50',
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
    availabilityHeading: {
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: '700',
      marginBottom: sizes.HEIGHT * 0.015,
    },
    availabilityRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: sizes.HEIGHT * 0.015,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    dayText: {
      fontSize: sizes.WIDTH * 0.035,
      fontWeight: '500',
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: sizes.WIDTH * 0.015,
    },
    timeText: {
      fontSize: sizes.WIDTH * 0.035,
      marginRight: sizes.WIDTH * 0.01,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: '#000000aa',
      justifyContent: 'center',
      padding: sizes.WIDTH * 0.05,
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: sizes.WIDTH * 0.03,
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
      padding: sizes.WIDTH * 0.03,
      borderRadius: sizes.WIDTH * 0.02,
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
      borderRadius: sizes.WIDTH * 0.02,
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
    availabilityModalOverlay: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: sizes.WIDTH * 0.05,
    },
    availabilityModalCard: {
      backgroundColor: '#fff',
      borderRadius: sizes.WIDTH * 0.03,
      padding: sizes.WIDTH * 0.05,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    availabilityModalTitle: {
      fontSize: sizes.WIDTH * 0.045,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: sizes.HEIGHT * 0.02,
    },
    availabilityInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: sizes.WIDTH * 0.025,
      paddingHorizontal: sizes.WIDTH * 0.03,
      paddingVertical: sizes.HEIGHT * 0.015,
      fontSize: sizes.WIDTH * 0.035,
      marginBottom: sizes.HEIGHT * 0.025,
    },
    availabilityBtnGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    availabilitySaveBtn: {
      backgroundColor: '#000',
      paddingVertical: sizes.HEIGHT * 0.015,
      paddingHorizontal: sizes.WIDTH * 0.05,
      borderRadius: sizes.WIDTH * 0.025,
    },
    availabilityCancelBtn: {
      backgroundColor: '#f2f2f2',
      paddingVertical: sizes.HEIGHT * 0.015,
      paddingHorizontal: sizes.WIDTH * 0.05,
      borderRadius: sizes.WIDTH * 0.025,
    },
    availabilitySaveText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: sizes.WIDTH * 0.035,
    },
    availabilityCancelText: {
      color: '#333',
      fontWeight: '600',
      fontSize: sizes.WIDTH * 0.035,
    },
  });

  return {sizes, styles, globalStyles};
};

export default useStyles;
