import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View, FlatList} from 'react-native';
import useStyles from './style';

type FilterDropdownButtonProps = {
  label: string;
  options: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
};

const FilterDropdownButton: React.FC<FilterDropdownButtonProps> = ({
  label,
  options = [],
  selectedValue,
  onSelect,
}) => {
  const {styles} = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: any) => {
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <View style={styles.buttonContent}>
          <Text style={styles.label}>{selectedValue || label}</Text>
          <Text style={styles.dropdownIcon}>{isOpen ? '▲' : '▼'}</Text>
        </View>
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.dropdownItem}
              onPress={() => handleSelect(option)}>
              <Text>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

export default FilterDropdownButton;
