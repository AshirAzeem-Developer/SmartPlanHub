import React, {useState} from 'react';
import {TouchableOpacity, Text, View, StyleSheet} from 'react-native';
import useStyles from './style';

type FilterDropdownButtonProps = {
  label: string;
  options: string[];
  selectedValue: string | null;
  onSelect: (value: string) => void;
  onClear?: () => void; // ✅ Added clear prop
};

const FilterDropdownButton: React.FC<FilterDropdownButtonProps> = ({
  label,
  options = [],
  selectedValue,
  onSelect,
  onClear,
}) => {
  const {styles} = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (value: string) => {
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
        <View style={styles.buttonContent}>
          <Text style={styles.label}>{selectedValue || label}</Text>

          {/* Clear Button */}
          {selectedValue && onClear && (
            <TouchableOpacity onPress={onClear} style={styles.clearBtn}>
              <Text style={styles.clearText}>✕</Text>
            </TouchableOpacity>
          )}

          {/* Dropdown Arrow */}
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
