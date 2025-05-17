import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';

/**
 * CustomButton - कस्टम बटन कंपोनेंट
 * प्राइमरी, सेकेंडरी या आउटलाइन स्टाइल में बटन प्रदान करता है
 * 
 * उपयोग:
 * <CustomButton 
 *   title="जारी रखें"
 *   onPress={() => handleContinue()}
 *   type="primary"
 * />
 */
const CustomButton = ({
  title,
  onPress,
  type = 'primary', // 'primary', 'secondary', 'outline'
  disabled = false,
  loading = false,
  style = {},
  textStyle = {},
}) => {
  // Button styles based on type
  const getButtonStyle = () => {
    switch (type) {
      case 'primary':
        return styles.primaryButton;
      case 'secondary':
        return styles.secondaryButton;
      case 'outline':
        return styles.outlineButton;
      default:
        return styles.primaryButton;
    }
  };

  // Text styles based on type
  const getTextStyle = () => {
    switch (type) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      default:
        return styles.primaryText;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={type === 'outline' ? '#FE7743' : '#EFEEEA'} 
        />
      ) : (
        <Text style={[getTextStyle(), disabled && styles.disabledText, textStyle]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  primaryButton: {
    backgroundColor: '#FE7743',
  },
  secondaryButton: {
    backgroundColor: '#273F4F',
  },
  outlineButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FE7743',
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
  },
  primaryText: {
    color: '#EFEEEA',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Noto Sans',
  },
  secondaryText: {
    color: '#EFEEEA',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Noto Sans',
  },
  outlineText: {
    color: '#FE7743',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Noto Sans',
  },
  disabledText: {
    color: '#888888',
  },
});

export default CustomButton;