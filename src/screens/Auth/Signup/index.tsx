import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import useStyles from './style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import icons from '../../../assets/icons';
import InputComponent from '../../../components/global/InputComponent';
import {validateEmail} from '../../../utils/validator';
import {NavigationProp} from '@react-navigation/native';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';

interface SignupProps {
  navigation: NavigationProp<any>;
}

const Signup: React.FC<SignupProps> = ({navigation}) => {
  const {styles, colors} = useStyles();
  const [selectedRole, setSelectedRole] = useState('User');
  const [isChecked, setIsChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleCreateAccount() {
    if (!isChecked || !phoneNumber || !fullName || !email || !password) {
      return;
    }
    let data = {
      role: selectedRole,
      phoneNumber: phoneNumber,
      fullName: fullName,
      email: email,
      password: password,
    };

    navigation.navigate('Login');
    console.log('Register Data ->', JSON.stringify(data, null, 2));
  }

  return (
    <>
      <CustomHeader showBackButton backgroundColor="#fff" textColor="#000" />
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up </Text>

        {/* Role Selection */}
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === 'User' && styles.selectedRole,
            ]}
            onPress={() => setSelectedRole('User')}>
            <Text
              style={[
                styles.roleText,
                selectedRole === 'User' && styles.selectedRoleText,
              ]}>
              User
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.roleButton,
              selectedRole === 'Vendor' && styles.selectedRole,
            ]}
            onPress={() => setSelectedRole('Vendor')}>
            <Text
              style={[
                styles.roleText,
                selectedRole === 'Vendor' && styles.selectedRoleText,
              ]}>
              Vendor
            </Text>
          </TouchableOpacity>
        </View>

        {/* Input Fields */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number</Text>
          <InputComponent
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            style={styles.input}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            maxLength={11}
          />

          <Text style={styles.label}>Full Name</Text>
          <InputComponent
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            placeholder="Enter your full name"
          />

          <Text style={styles.label}>Email Address</Text>
          <InputComponent
            onChangeText={setEmail}
            value={email}
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
            errorHandler={[
              {
                errorText: 'Enter a valid email address',
                validator: validateEmail,
              },
            ]}
          />

          <Text style={styles.label}>Password</Text>
          <InputComponent
            onChangeText={setPassword}
            value={password}
            style={styles.input}
            placeholder="Create password"
            secureTextEntry
          />
        </View>

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
            I agree to the{' '}
            <Text style={styles.boldText}>Terms & Conditions</Text>
          </Text>
        </View>

        {/* Create Account Button */}
        <TouchableOpacity
          onPress={handleCreateAccount}
          disabled={
            !isChecked || !phoneNumber || !fullName || !email || !password
          }
          style={[styles.createAccountButton, !isChecked && {opacity: 0.5}]}>
          <Text style={styles.createAccountText}>Create Account</Text>
        </TouchableOpacity>

        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        {/* Login Link */}
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginLink}>Login here</Text>
          </TouchableOpacity>
        </View>

        {/* Social Login */}
        <Text style={styles.orText}>Or sign up with</Text>
        <View style={styles.socialIcons}>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={icons.GOOGLE} style={styles.socialIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Image source={icons.FACEBOOK} style={styles.socialIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Signup;
