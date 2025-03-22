import React from 'react';
import {Text} from 'react-native';
import StatusBarComponent from '../../../components/global/StatusBarComponent';
import useStyles from './style';

const Home = ({}) => {
  const {styles, colors} = useStyles();

  return (
    <>
      <StatusBarComponent backgroundColor={colors.BACKGROUND} />
      <Text style={styles.txt1}>Home</Text>
    </>
  );
};

export default Home;
