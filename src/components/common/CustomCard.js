import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Theme from '../../utils/Theme';

/**
 * CustomCard - कस्टम कार्ड कंपोनेंट
 * विभिन्न ऐप सेक्शन्स के लिए टैप करने योग्य कार्ड प्रदान करता है
 * 
 * Props:
 * @param {String} title - कार्ड का शीर्षक
 * @param {String} description - कार्ड का विवरण
 * @param {String} icon - आइकन नाम (वैकल्पिक)
 * @param {Function} onPress - टैप होने पर कॉलबैक
 * @param {String} color - कार्ड का प्राइमरी कलर
 * @param {Boolean} disabled - कार्ड अक्षम है या नहीं
 * @param {Object} style - कस्टम स्टाइल
 */
const CustomCard = ({
  title,
  description,
  icon,
  onPress,
  color = Theme.COLORS.PRIMARY,
  disabled = false,
  style = {}
}) => {
  // डिसेबल्ड कलर्स
  const disabledColor = Theme.COLORS.DISABLED;
  const actualColor = disabled ? disabledColor : color;
  
  // आइकन कंपोनेंट (वास्तविक ऐप में आप React Native Vector Icons का उपयोग कर सकते हैं)
  const renderIcon = () => {
    // यहां आइकन रेंडर लॉजिक होगा
    // अभी के लिए, आइकन की जगह एक सर्कल दिखाते हैं
    return (
      <View style={[styles.iconCircle, { backgroundColor: actualColor }]}>
        <Text style={styles.iconText}>{title.charAt(0)}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        { borderLeftColor: actualColor },
        style
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={disabled ? 1 : 0.7}
    >
      {renderIcon()}
      
      <View style={styles.content}>
        <Text style={[styles.title, disabled && styles.disabledText]}>
          {title}
        </Text>
        
        {description && (
          <Text style={[styles.description, disabled && styles.disabledText]}>
            {description}
          </Text>
        )}
      </View>
      
      <View style={styles.arrowContainer}>
        <Text style={[styles.arrow, { color: actualColor }]}>→</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    color: Theme.COLORS.WHITE,
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginLeft: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Theme.COLORS.SECONDARY,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
  },
  disabledText: {
    color: '#999',
  },
  arrowContainer: {
    padding: 4,
  },
  arrow: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomCard;