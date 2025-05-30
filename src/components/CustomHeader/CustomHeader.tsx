import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StatusBar,
  Platform,
  StyleProp,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import images from '../../assets/images';
import icons from '../../assets/icons';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../navigators/navigatorParams';
import useStyles from './Style';

interface CustomHeaderProps {
  title?: string;
  showBackButton?: boolean;
  showMenu?: boolean;
  onRightIconPress?: () => void;
  rightIcon?: any;
  backgroundColor?: string;
  textColor?: string;
  barStyle?: 'light-content' | 'dark-content';
  translucent?: boolean;
  titleStyles?: StyleProp<any>;
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title = '',
  showBackButton = false,
  showMenu = false,
  onRightIconPress,
  rightIcon,
  backgroundColor = '#000000',
  textColor = '#fff',
  barStyle = 'light-content',
  translucent = false,
  titleStyles,
}) => {
  const navigation = useNavigation<DrawerNavigationProp<DrawerParamList>>();

  const {styles, sizes, colors} = useStyles();

  return (
    <>
      {/* Status Bar */}
      <StatusBar
        backgroundColor={translucent ? 'transparent' : backgroundColor}
        barStyle={barStyle}
        translucent={translucent}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          {
            backgroundColor,
            paddingTop:
              Platform.OS === 'android' && !translucent
                ? StatusBar.currentHeight
                : 0,
          },
        ]}>
        {/* Back Button */}
        {showBackButton ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.sideButton}>
            <Image
              source={icons.BACK_ARROW}
              style={[styles.icon]}
              tintColor={textColor}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.sideButton} />
        )}

        {/* Title or Logo */}
        {title && <Text style={[styles.title, titleStyles]}>{title}</Text>}

        {/* Right Icon */}
        {showMenu ? (
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.sideButton}>
            <Image source={icons.MENU} style={styles.icon} tintColor={'#fff'} />
          </TouchableOpacity>
        ) : rightIcon ? (
          <TouchableOpacity
            onPress={onRightIconPress}
            style={styles.sideButton}>
            <Image source={rightIcon} style={styles.icon} />
          </TouchableOpacity>
        ) : (
          <View style={styles.sideButton} />
        )}
      </View>
    </>
  );
};

export default CustomHeader;
