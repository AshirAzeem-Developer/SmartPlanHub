import {useColorScheme} from 'react-native';

const defaultColors = {
  PRIMARY: '#000000', // Black (Primary color for buttons, toggles, text)
  PRIMARY_TEXT: '#FFFFFF', // White (Text on primary backgrounds)
  SKY_BLUE: '#3db6fc', // Not used in current UI but kept for future use
  RED: '#ff1605', // Error messages, alerts
  GREEN: '#18c900', // Success messages
  LIGHT_GRAY100: '#e6e6e6', // Light gray for backgrounds
  LIGHT_GRAY200: '#c1c7c2', // Slightly darker gray (for borders, dividers)
  INPUT_BORDER: '#CCCCCC', // Light gray for input borders
  CHECKBOX_BORDER: '#000000', // Black for checkbox border
  CHECKBOX_CHECKED: '#000000', // Black for checked state
  LINK: '#0000FF', // Blue for Terms & Conditions link
  BLACK: '#000000',
  WHITE: '#FFFFFF',
};

const colorsDark = {
  ...defaultColors,
  isDark: true,
  BACKGROUND: '#000000', // Dark background
  TEXT: '#FFFFFF', // White text on dark background
  PRIMARY_BACKGROUND: '#1C1C1C', // Dark Gray for sections
  LIGHT_GRAY: '#5c5e5c', // Gray for borders and dividers
  GRAY: 'grey',
};

const colorsLight = {
  ...defaultColors,
  isDark: false,
  BACKGROUND: '#FFFFFF', // White background
  PRIMARY_BACKGROUND: '#F6F9FE', // Soft blue-gray background (if needed)
  TEXT: '#000000', // Black text
  LIGHT_GRAY: '#C1C7C2', // Light gray for borders, separators
  GRAY: 'grey',
};

export type Colors = typeof colorsDark;

export const useColors = () => {
  const color = useColorScheme();
  return color === 'dark' ? colorsDark : colorsLight;
};
