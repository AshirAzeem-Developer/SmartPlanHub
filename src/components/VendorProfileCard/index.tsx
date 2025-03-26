import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import useStyles from './style';
import {screen} from '../../utils/constants';

const VendorProfile = () => {
  const {styles} = useStyles();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginHorizontal: 10,
        marginTop: 10,
      }}>
      <View style={{width: screen.width * 0.55, paddingRight: 10}}>
        <Text
          style={{
            fontSize: screen.width * 0.035,
            fontWeight: 'bold',
          }}>
          Professional service provider with over 10 years of experience.
        </Text>
      </View>
      <View style={{width: screen.width * 0.3}}>
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.buttonText}>Contact Vendor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.buttonText}>Request Quote</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VendorProfile;
