import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import useStyles from './style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import InputComponent from '../../../components/global/InputComponent';
import {validateEmail, validatePassword} from '../../../utils/validator';

import {NavigationProp} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {
  setIsLoggedIn,
  setToken,
  setUserType,
} from '../../../store/reducer/user';
import api from '../../../utils/api';
import apiEndPoints from '../../../constants/apiEndPoints';

interface LoginProps {
  navigation: NavigationProp<any>;
}

const Login: React.FC<LoginProps> = ({navigation}) => {
  const {styles, sizes, colors} = useStyles();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [selectedRole, setSelectedRole] = useState<'User' | 'Vendor'>('User');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState(false);

  const validateInputs = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPasswordValid = password.length >= 6;

    setEmailError(isEmailValid ? '' : 'Invalid email format.');
    setPasswordError(!isPasswordValid);

    // if (isEmailValid && isPasswordValid && isChecked) {
    //   console.log('Form Data:', {
    //     email: email,
    //     password: password,
    //     role: selectedRole.toLowerCase(),
    //     termsAccepted: isChecked,
    //   });
    //   dispatch(setUserType(selectedRole.toLowerCase()));
    //   dispatch(setIsLoggedIn(true));
    //   // navigation.navigate('HomeScreen');
    // } else {
    //   console.log('Validation Failed. Please check your inputs.');
    // }
    setIsLoading(true);

    api
      .post(apiEndPoints.LOGIN, {
        email: email,
        password: password,
      })
      .then(res => {
        console.log('Response:', res.data);
        if (res.data.status === 'success') {
          setIsLoading(false);
          dispatch(setUserType(selectedRole.toLowerCase()));
          dispatch(setIsLoggedIn(true));
          dispatch(setToken(res.data.token));
          navigation.navigate('HomeScreen');
        } else {
          setIsLoading(false);
          Alert.alert(res.data.message);
        }
      })
      .catch(error => {
        setIsLoading(false);
        console.error('Error:', error.response.data.message);
      });
  };

  // Validate email while typing
  const handleEmailChange = (text: string) => {
    setEmail(text);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(
      !text
        ? 'Email is required.'
        : !emailRegex.test(text)
        ? 'Invalid email format.'
        : '',
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* User/Vendor Toggle */}
      {/* <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedRole === 'User' && styles.selectedButton,
          ]}
          onPress={() => setSelectedRole('User')}>
          <Text
            style={[
              styles.toggleText,
              selectedRole === 'User' && styles.selectedText,
            ]}>
            User
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedRole === 'Vendor' && styles.selectedButton,
          ]}
          onPress={() => setSelectedRole('Vendor')}>
          <Text
            style={[
              styles.toggleText,
              selectedRole === 'Vendor' && styles.selectedText,
            ]}>
            Vendor
          </Text>
        </TouchableOpacity>
      </View> */}

      {/* Email Input */}
      <Text style={styles.label}>Email Address</Text>
      <InputComponent
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
        keyboardType="email-address"
        // icon={require('../../../assets/icons/mail.png')}
        errorHandler={[
          {
            validator: validateEmail,
            errorText: 'Email is required.',
          },
        ]}
      />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <InputComponent
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        // icon={require('../../../assets/icons/lock.png')}
        errorHandler={[
          {
            validator: validatePassword,
            errorText:
              ' Password must be at least 8 characters long and contain at least one number Or special character ',
          },
        ]}
      />

      {/* Terms & Conditions */}
      <View style={styles.checkboxContainer}>
        <View>
          <BouncyCheckbox
            size={25}
            fillColor="red"
            unFillColor="#FFFFFF"
            style={{marginVertical: 10}}
            iconStyle={{borderColor: 'red'}}
            innerIconStyle={{borderWidth: 2}}
            textStyle={{fontFamily: 'JosefinSans-Regular'}}
            onPress={setIsChecked}
            isChecked={isChecked}
          />
        </View>
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.boldText}>Terms & Conditions</Text>
        </Text>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        onPress={validateInputs}
        disabled={!isChecked || !!emailError || passwordError}
        style={[
          styles.createAccountButton,
          (!isChecked || !!emailError || passwordError) && {opacity: 0.7},
        ]}>
        {!isLoading ? (
          <Text style={styles.createAccountText}>Login</Text>
        ) : (
          <ActivityIndicator color="#fff" />
        )}
      </TouchableOpacity>
      <View style={styles.createAccountContainer}>
        <Text
          style={{
            fontSize: sizes.WIDTH * 0.035,
          }}>
          Don't Have an Account ?
        </Text>
        <TouchableOpacity
          style={styles.signupButton}
          onPress={() => {
            navigation.navigate('Signup');
          }}>
          <Text style={styles.signupText}>Signup </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
