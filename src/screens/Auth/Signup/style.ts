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
      backgroundColor: '#fff',
      padding: 20,
      justifyContent: 'center',
    },
    title: {
      fontSize: 22,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    roleContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 20,
    },
    roleButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: '#000',
      borderRadius: 8,
      marginHorizontal: 5,
    },
    selectedRole: {
      backgroundColor: '#000',
    },
    roleText: {
      fontSize: 16,
      color: '#000',
    },
    selectedRoleText: {
      color: '#fff',
    },
    inputContainer: {
      marginBottom: 10,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 10,
    },
    input: {
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      paddingHorizontal: 10,
      backgroundColor: '#fff',
      marginTop: 5,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 10,
    },
    termsText: {
      fontSize: 14,
      marginLeft: 5,
    },
    termsLink: {
      color: '#007bff',
      fontWeight: 'bold',
    },
    createAccountButton: {
      backgroundColor: '#000',
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    createAccountText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
    forgotPassword: {
      textAlign: 'center',
      color: '#666',
      marginVertical: 10,
    },
    loginText: {
      textAlign: 'center',
      fontSize: sizes.WIDTH * 0.032,
    },
    loginLink: {
      fontWeight: 'bold',
      color: '#000',
    },
    orText: {
      textAlign: 'center',
      marginVertical: 15,
      fontSize: 14,
      color: '#666',
    },
    boldText: {
      fontWeight: 'bold',
      color: '#000',
    },
    socialIcons: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    socialButton: {
      marginHorizontal: 10,
    },
    socialIcon: {
      width: 40,
      height: 40,
      resizeMode: 'contain',
    },
    loginContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: sizes.HEIGHT * 0.02,
      marginBottom: sizes.HEIGHT * 0.02,
    },
  });

  return {
    colors,
    sizes,
    styles,
  };
};

export default useStyles;
