import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import useStyles from './style';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import icons from '../../../assets/icons';
import InputComponent from '../../../components/global/InputComponent';
import {validateEmail, validatePassword} from '../../../utils/validator';
import {NavigationProp} from '@react-navigation/native';
import CustomHeader from '../../../components/CustomHeader/CustomHeader';
import api from '../../../utils/api';
import apiEndPoints from '../../../constants/apiEndPoints';
import MultiSelectDropdown from '../../../components/MultiSelect';

interface SignupProps {
  navigation: NavigationProp<any>;
}
const SERVICE_CATEGORIES = [
  'Wedding Planning',
  'Birthday Party Planning',
  'Baby Shower Planning',
  'Engagement Party Planning',
  'Bridal Shower Planning',
  'Anniversary Party Planning',
  'Corporate Event Planning',
  'Product Launch Events',
  'Gala Dinners',
  'Award Ceremonies',
  'Charity Fundraisers',
  'Graduation Parties',
  'Farewell Parties',
  'Housewarming Parties',
  'Holiday Parties (Christmas, Halloween, Eid, etc.)',
  'Religious Ceremonies',
  'Festivals and Fairs',
  'Bachelor / Bachelorette Parties',
  'Sweet 16 / Quinceañera',
  'Retirement Parties',
  'Cultural Events (Mehndi, Sangeet, etc.)',
  'Full-Service Catering',
  'Buffet Catering',
  'Cocktail Reception Catering',
  'Dessert Table Catering',
  'Live Food Stations (BBQ, Tandoor, Pasta Stations, etc.)',
  'Food Truck Catering',
  'Cake and Bakery Services',
  'Bartending Services',
  'Beverage Stations (Tea, Coffee, Mocktails, Juices)',
  'Live Bands',
  'DJs',
  'Stand-up Comedians',
  'Emcees / Hosts',
  'Magicians',
  'Dancers (Cultural, Hip-Hop, Ballet)',
  'Fire Shows',
  'Kids’ Entertainment (Clowns, Face Painting, Puppet Shows)',
  'Celebrity Appearances',
  'Motivational Speakers',
  'Wedding Decor',
  'Themed Birthday Decor',
  'Stage Decoration',
  'Floral Arrangements',
  'Balloon Decoration',
  'Lighting and Effects (LEDs, Chandeliers, Fairy Lights)',
  'Photo Booth Setup',
  'Table Settings and Centerpieces',
  'Backdrop Design',
  'Lounge Furniture Rentals',
  'Event Photography',
  'Wedding Films',
  'Live Streaming Services',
  'Drone Videography',
  'Instant Photo Printing',
  '360-Degree Photo Booths',
  'Event Rentals (Tents, Chairs, Tables)',
  'Sound and Lighting Equipment Rental',
  'Stage Setup and AV Management',
  'Transportation (Guest Shuttles, Limos, Vintage Cars)',
  'Security Services',
  'Valet Parking',
  'Cleaning Services',
  'Power Backup (Generators)',
  'Permit and License Handling',
  'Makeup Artists',
  'Hair Stylists',
  'Mehndi / Henna Artists',
  'Styling Services',
  'Personal Shoppers',
  'Custom Invitation Cards',
  'Return Gifts',
  'Event Souvenirs',
  'Wedding Favors',
  'Digital Invitations (E-invites)',
];
const Signup: React.FC<SignupProps> = ({navigation}) => {
  const {styles, colors} = useStyles();
  const [selectedRole, setSelectedRole] = useState('User');
  const [isChecked, setIsChecked] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  function handleCreateAccount() {
    setIsLoading(true);
    if (
      !isChecked ||
      !phoneNumber ||
      !fullName ||
      !email ||
      !password ||
      (selectedRole === 'Vendor' && categories.length === 0)
    ) {
      Alert.alert('Please fill in all fields and agree to the terms.');
      setIsLoading(false);
      return;
    }

    const data = {
      name: fullName,
      email: email,
      password: password,
      phoneNum: phoneNumber,
      role: selectedRole.toLowerCase(),
      ...(selectedRole === 'Vendor' && {categories}),
    };

    console.log('Register Data ->', JSON.stringify(data, null, 2));

    api
      .post(apiEndPoints.SIGNUP, data)
      .then(res => {
        setIsLoading(false);
        if (res.data.status === 'success') {
          navigation.navigate('Login');
        } else {
          Alert.alert(res.data.message);
        }
      })
      .catch(error => {
        setIsLoading(false);
        Alert.alert(error.response.data.message || 'Signup failed');
      });
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
            onPress={() => {
              setSelectedRole('User');
              setCategories([]); // Clear categories when switching to user
            }}>
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
            maxLength={13}
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
          {selectedRole === 'Vendor' && (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Service Categories</Text>
              <MultiSelectDropdown
                items={SERVICE_CATEGORIES}
                selectedItems={categories}
                setSelectedItems={setCategories}
                placeholder="Select Service Categories"
              />
            </View>
          )}

          <Text style={styles.label}>Password</Text>
          <InputComponent
            onChangeText={setPassword}
            value={password}
            style={styles.input}
            placeholder="Create password"
            secureTextEntry
            errorHandler={[
              {
                errorText:
                  'Password must be at least 8 characters long and contain at least one number Or special character',
                validator: validatePassword,
              },
            ]}
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
            !isChecked &&
            !phoneNumber &&
            !fullName &&
            !email &&
            !password &&
            isLoading
          }
          style={[styles.createAccountButton, !isChecked && {opacity: 0.5}]}>
          {isLoading ? (
            <ActivityIndicator color={'#ffffff'} />
          ) : (
            <Text style={styles.createAccountText}>Create Account</Text>
          )}
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
