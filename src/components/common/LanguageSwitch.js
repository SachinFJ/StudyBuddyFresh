import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import Theme from '../../utils/Theme';

/**
 * LanguageSwitch - भाषा स्विच टॉगल कंपोनेंट
 * हिंदी और अंग्रेजी के बीच स्विच करने के लिए बटन
 * 
 * Props:
 * @param {Function} onToggle - भाषा स्विच होने पर कॉलबैक
 * @param {Object} style - कस्टम स्टाइल
 */
const LanguageSwitch = ({ onToggle, style = {} }) => {
  const { current: currentLanguage } = useSelector(state => state.language);
  
  return (
    <TouchableOpacity 
      style={[styles.container, style]} 
      onPress={onToggle}
      activeOpacity={0.7}
    >
      <View style={styles.switchInner}>
        <Text style={styles.labelText}>
          {currentLanguage === 'hindi' ? 'ENG' : 'हिंदी'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.COLORS.SECONDARY,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  switchInner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelText: {
    color: Theme.COLORS.WHITE,
    fontSize: 14,
    fontWeight: '500',
  },
});

export default LanguageSwitch;