import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

interface MultiSelectDropdownProps {
  items: string[];
  selectedItems: string[];
  setSelectedItems: (items: string[]) => void;
  placeholder?: string;
}

const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
  items,
  selectedItems,
  setSelectedItems,
  placeholder = 'Select Service Categories',
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const handleSelectItem = (item: string) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(
        selectedItems.filter(selectedItem => selectedItem !== item),
      );
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
        <Text style={styles.placeholder}>
          {selectedItems.length > 0 ? selectedItems.join(', ') : placeholder}
        </Text>
        <Text style={styles.arrow}>{isDropdownOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {isDropdownOpen && (
        <ScrollView style={styles.dropdownList} nestedScrollEnabled={true}>
          {items.map(item => (
            <TouchableOpacity
              key={item}
              onPress={() => handleSelectItem(item)}
              style={styles.dropdownItem}>
              <Text
                style={[
                  styles.itemText,
                  selectedItems.includes(item) && styles.selectedItem,
                ]}>
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  placeholder: {
    color: '#555',
    fontSize: 16,
    flex: 1,
  },
  arrow: {
    fontSize: 18,
    color: '#333',
  },
  dropdownList: {
    maxHeight: 200,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 5,
  },
  dropdownItem: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedItem: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
});

export default MultiSelectDropdown;
