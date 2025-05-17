import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Modal, 
  StyleSheet, 
  FlatList, 
  TouchableWithoutFeedback
} from 'react-native';
import Theme from '../../utils/Theme';

/**
 * BookDropdown - पुस्तक चयन ड्रॉपडाउन कंपोनेंट
 * यूजर्स को उपलब्ध पुस्तकों की सूची से चयन करने की अनुमति देता है
 * 
 * Props:
 * @param {Array} books - पुस्तकों की सूची
 * @param {Object} selectedBook - वर्तमान चयनित पुस्तक
 * @param {Function} onSelect - चयन पर कॉलबैक
 * @param {String} placeholder - कोई पुस्तक चयनित न होने पर प्लेसहोल्डर टेक्स्ट
 */
const BookDropdown = ({ 
  books = [], 
  selectedBook, 
  onSelect, 
  placeholder = "पुस्तक चुनें",
  style = {}
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // ड्रॉपडाउन टॉगल
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // पुस्तक चयन हैंडलर
  const handleSelectBook = (bookId) => {
    if (onSelect) {
      onSelect(bookId);
    }
    setIsOpen(false);
  };

  return (
    <View style={[styles.container, style]}>
      {/* ड्रॉपडाउन ट्रिगर */}
      <TouchableOpacity 
        style={styles.dropdownTrigger} 
        onPress={toggleDropdown}
        activeOpacity={0.7}
      >
        <Text style={styles.selectedText}>
          {selectedBook ? selectedBook.name : placeholder}
        </Text>
        <Text style={styles.dropdownIcon}>▼</Text>
      </TouchableOpacity>

      {/* ड्रॉपडाउन मोडल */}
      <Modal
        visible={isOpen}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdownContainer}>
              <FlatList
                data={books}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.option,
                      selectedBook && selectedBook.id === item.id && styles.selectedOption
                    ]}
                    onPress={() => handleSelectBook(item.id)}
                  >
                    <Text 
                      style={[
                        styles.optionText,
                        selectedBook && selectedBook.id === item.id && styles.selectedOptionText
                      ]}
                    >
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                showsVerticalScrollIndicator={false}
                bounces={false}
                contentContainerStyle={styles.listContent}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdownTrigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Theme.COLORS.SECONDARY,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedText: {
    color: Theme.COLORS.SECONDARY,
    fontSize: 16,
  },
  dropdownIcon: {
    color: Theme.COLORS.SECONDARY,
    fontSize: 12,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownContainer: {
    width: '80%',
    maxHeight: '70%',
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  listContent: {
    paddingVertical: 8,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  selectedOption: {
    backgroundColor: `${Theme.COLORS.PRIMARY}20`, // 20% opacity primary color
  },
  optionText: {
    color: Theme.COLORS.SECONDARY,
    fontSize: 16,
  },
  selectedOptionText: {
    color: Theme.COLORS.PRIMARY,
    fontWeight: 'bold',
  },
  separator: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginHorizontal: 16,
  },
});

export default BookDropdown;