import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, FlatList } from 'react-native';
import Theme from '../../utils/Theme';

/**
 * SearchComponent - खोज फंक्शनैलिटी प्रदान करता है
 * प्रश्नों, टॉपिक्स और पुस्तकों की खोज के लिए
 * 
 * Props:
 * @param {String} placeholder - खोज बार का प्लेसहोल्डर
 * @param {Function} onSearch - खोज क्वेरी हैंडलर
 * @param {Function} onResultSelect - परिणाम चयन हैंडलर
 * @param {Object} style - कस्टम स्टाइल
 */
const SearchComponent = ({
  placeholder = "खोजें...",
  onSearch,
  onResultSelect,
  style = {}
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // डेमो सर्च रिजल्ट्स - वास्तविक ऐप में API कॉल या डेटा फिल्टरिंग का उपयोग होगा
  const demoResults = [
    { id: 'r1', type: 'question', text: 'भारत का राष्ट्रीय पक्षी कौन सा है?' },
    { id: 'r2', type: 'topic', text: 'भारतीय इतिहास' },
    { id: 'r3', type: 'book', text: 'सामान्य ज्ञान' },
    { id: 'r4', type: 'question', text: 'सूर्य से पृथ्वी की औसत दूरी कितनी है?' },
    { id: 'r5', type: 'topic', text: 'भूगोल' },
  ];
  
  // खोज हैंडलर
  const handleSearch = (text) => {
    setQuery(text);
    
    if (text.trim()) {
      setIsSearching(true);
      
      // वास्तविक ऐप में API कॉल या फिल्टरिंग यहां होगी
      // अभी के लिए डेमो डेटा का उपयोग करते हैं
      setTimeout(() => {
        const filtered = demoResults.filter(item => 
          item.text.toLowerCase().includes(text.toLowerCase())
        );
        setResults(filtered);
        setIsSearching(false);
        
        if (onSearch) {
          onSearch(text, filtered);
        }
      }, 300);
    } else {
      setResults([]);
    }
  };
  
  // खोज साफ करें
  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };
  
  // खोज परिणाम टाइप के अनुसार आइकन
  const getTypeIcon = (type) => {
    switch (type) {
      case 'question': return '📝';
      case 'topic': return '📚';
      case 'book': return '📖';
      default: return '🔍';
    }
  };
  
  // परिणाम चयन हैंडलर
  const handleResultPress = (item) => {
    if (onResultSelect) {
      onResultSelect(item);
    }
    clearSearch();
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={query}
          onChangeText={handleSearch}
          placeholderTextColor="#999"
        />
        
        {query.length > 0 && (
          <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>✕</Text>
          </TouchableOpacity>
        )}
      </View>
      
      {isSearching && (
        <Text style={styles.searchingText}>खोज हो रही है...</Text>
      )}
      
      {results.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={results}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.resultItem}
                onPress={() => handleResultPress(item)}
              >
                <Text style={styles.resultTypeIcon}>{getTypeIcon(item.type)}</Text>
                <View style={styles.resultContent}>
                  <Text style={styles.resultText}>{item.text}</Text>
                  <Text style={styles.resultType}>
                    {item.type === 'question' ? 'प्रश्न' : 
                     item.type === 'topic' ? 'विषय' : 'पुस्तक'}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.resultSeparator} />}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: Theme.COLORS.SECONDARY,
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    fontSize: 16,
    color: '#999',
    fontWeight: 'bold',
  },
  searchingText: {
    marginTop: 8,
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  resultsContainer: {
    marginTop: 8,
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    maxHeight: 200,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  resultTypeIcon: {
    fontSize: 16,
    marginRight: 12,
  },
  resultContent: {
    flex: 1,
  },
  resultText: {
    fontSize: 14,
    color: Theme.COLORS.SECONDARY,
    marginBottom: 4,
  },
  resultType: {
    fontSize: 12,
    color: '#999',
  },
  resultSeparator: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 12,
  },
});

export default SearchComponent;