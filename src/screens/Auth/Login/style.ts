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
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.BACKGROUND,
      paddingHorizontal: sizes.WIDTH * 0.1,
    },
    title: {
      fontSize: sizes.WIDTH * 0.06, // Responsive font size
      fontWeight: 'bold',
      color: colors.TEXT,
      marginBottom: sizes.HEIGHT * 0.05,
    },
    toggleContainer: {
      flexDirection: 'row',
      marginBottom: sizes.HEIGHT * 0.02,
    },
    toggleButton: {
      paddingVertical: sizes.HEIGHT * 0.015,
      paddingHorizontal: sizes.WIDTH * 0.05,
      borderRadius: sizes.WIDTH * 0.02,
      borderWidth: 1,
      borderColor: colors.GRAY, // Use a defined color instead of fallback
      marginHorizontal: sizes.WIDTH * 0.02,
      alignItems: 'center',
    },
    selectedButton: {
      backgroundColor: colors.PRIMARY,
    },
    toggleText: {
      fontSize: sizes.WIDTH * 0.04,
      color: colors.TEXT,
    },
    selectedText: {
      color: colors.PRIMARY_TEXT,
    },
    label: {
      alignSelf: 'flex-start',
      fontSize: sizes.WIDTH * 0.035,
      fontWeight: '600',
      marginBottom: sizes.HEIGHT * 0.01,
      color: colors.TEXT,
    },
    input: {
      width: '100%',
      padding: sizes.HEIGHT * 0.015,
      borderWidth: 1,
      borderColor: colors.INPUT_BORDER,
      borderRadius: sizes.WIDTH * 0.02,
      marginBottom: sizes.HEIGHT * 0.02,
      fontSize: sizes.WIDTH * 0.04,
      color: colors.TEXT,
      backgroundColor: colors.BACKGROUND,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: sizes.HEIGHT * 0.02,
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
    },
    checkbox: {
      width: sizes.WIDTH * 0.05,
      height: sizes.WIDTH * 0.05,
      borderRadius: sizes.WIDTH * 0.01,
      borderWidth: 1,
      borderColor: colors.CHECKBOX_BORDER,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: sizes.WIDTH * 0.02,
    },
    checkboxChecked: {
      backgroundColor: colors.CHECKBOX_CHECKED,
    },
    termsText: {
      fontSize: sizes.WIDTH * 0.035,
      color: colors.TEXT,
    },
    boldText: {
      fontWeight: 'bold',
    },
    createAccountButton: {
      backgroundColor: colors.PRIMARY,
      paddingVertical: sizes.HEIGHT * 0.02,
      paddingHorizontal: sizes.WIDTH * 0.05,
      borderRadius: sizes.WIDTH * 0.02,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: colors.PRIMARY_TEXT,
      fontSize: sizes.WIDTH * 0.04,
      fontWeight: 'bold',
    },
  });

  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
