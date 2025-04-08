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
      color: '#666666',
      marginBottom: 20,
    },
    calendarButton: {
      flexDirection: 'row',
      backgroundColor: '#000',
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
      marginBottom: 20,
    },
    calendarText: {
      color: '#fff',
      fontWeight: '600',
    },
    bookingsContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 10,
      marginBottom: 25,
    },
    bookingCard: {
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 16,
      marginBottom: 16,
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
      marginBottom: 8,
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: '700',
    },
    statusTag: {
      paddingVertical: 4,
      paddingHorizontal: 10,
      borderRadius: 20,
    },
    statusText: {
      fontSize: 12,
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
      gap: 8,
    },
    label: {
      fontWeight: '600',
    },
    bookingInfo: {
      fontSize: 13,
      color: '#333',
    },
    buttonGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 12,
    },
    acceptBtn: {
      backgroundColor: '#4CAF50',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    declineBtn: {
      backgroundColor: '#f44336',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    },
    btnText: {
      color: '#fff',
      fontWeight: '600',
    },
    viewDetails: {
      color: '#000',
      fontWeight: '600',
      marginTop: 12,
      textDecorationLine: 'underline',
    },
    availabilityHeading: {
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 10,
    },
    availabilityRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    dayText: {
      fontSize: 14,
      fontWeight: '500',
    },
    timeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
    },
    timeText: {
      fontSize: 14,
      marginRight: 4,
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
    availabilityModalOverlay: {
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    availabilityModalCard: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 2},
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    availabilityModalTitle: {
      fontSize: 18,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 15,
    },
    availabilityInput: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 14,
      marginBottom: 20,
    },
    availabilityBtnGroup: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    availabilitySaveBtn: {
      backgroundColor: '#000',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    availabilityCancelBtn: {
      backgroundColor: '#f2f2f2',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    availabilitySaveText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 14,
    },
    availabilityCancelText: {
      color: '#333',
      fontWeight: '600',
      fontSize: 14,
    },
  });

  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
