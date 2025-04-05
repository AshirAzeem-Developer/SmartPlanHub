import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import useStyles from './style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import InputComponent from '../../../components/global/InputComponent';
import {validateEmail} from '../../../utils/validator';

import {NavigationProp} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setIsLoggedIn, setUserType} from '../../../store/reducer/user';

interface LoginProps {
  navigation: NavigationProp<any>;
}

const Login: React.FC<LoginProps> = ({navigation}) => {
  const {styles, sizes, colors} = useStyles();
  const dispatch = useDispatch();

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

    if (isEmailValid && isPasswordValid && isChecked) {
      console.log('Form Data:', {
        email: email,
        password: password,
        role: selectedRole.toLowerCase(),
        termsAccepted: isChecked,
      });
      dispatch(setUserType(selectedRole.toLowerCase()));
      dispatch(setIsLoggedIn(true));
      // navigation.navigate('HomeScreen');
    } else {
      console.log('Validation Failed. Please check your inputs.');
    }
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
      <View style={styles.toggleContainer}>
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
      </View>

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
            validator: (text: string) => text.length >= 6,
            errorText: 'Password must be at least 6 characters long.',
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
        disabled={!isChecked || !!emailError || passwordError}
        style={[styles.createAccountButton, !isChecked && {opacity: 0.5}]}
        onPress={validateInputs}>
        <Text style={styles.buttonText}>Login</Text>
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
          <Text style={styles.createAccountText}>Signup </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
