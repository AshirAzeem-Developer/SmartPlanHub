import React from 'react';
import {Text} from 'react-native';
import StatusBarComponent from '../../../components/global/StatusBarComponent';
import useStyles from './style';

const VendorHome = ({}) => {
  const {styles, colors} = useStyles();

  return (
    <>
      <StatusBarComponent backgroundColor={colors.BACKGROUND} />
      <Text style={styles.txt1}>This is the Screen from Vendor </Text>
    </>
  );
};

export default VendorHome;
