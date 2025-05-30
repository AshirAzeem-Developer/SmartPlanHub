import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import useStyles from './style';
import {screen} from '../../utils/constants';

type VendorProfileProps = {
  onPress?: () => void;
};

const VendorProfile: React.FC<VendorProfileProps> = ({onPress}) => {
  const {styles} = useStyles();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        // padding: 10,
        marginHorizontal: 5,
        marginTop: 10,
      }}>
      <View style={{width: screen.width * 0.58, paddingRight: 10}}>
        <Text
          style={{
            fontSize: screen.width * 0.035,
            // fontWeight: 'bold',
          }}>
          Professional service provider with over 10 years of experience.
        </Text>
      </View>
      <View style={{width: screen.width * 0.3}}>
        <TouchableOpacity style={styles.contactButton} onPress={onPress}>
          <Text style={styles.buttonText}>Contact Vendor</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VendorProfile;
