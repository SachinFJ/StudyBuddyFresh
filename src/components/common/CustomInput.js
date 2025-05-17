import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

/**
 * CustomInput - कस्टम इनपुट फील्ड कंपोनेंट
 * लेबल, एरर स्टेट और विभिन्न इनपुट टाइप्स के साथ टेक्स्ट इनपुट प्रदान करता है
 * 
 * उपयोग:
 * <CustomInput 
 *   label="नाम"
 *   placeholder="अपना नाम दर्ज करें"
 *   value={name}
 *   onChangeText={setName}
 *   error="नाम आवश्यक है"
 * />
 */
const CustomInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  disabled = false,
  maxLength,
  multiline = false,
  numberOfLines = 1,
  style = {},
  inputStyle = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <TextInput
        style={[
          styles.input,
          multiline && styles.multilineInput,
          error && styles.inputError,
          disabled && styles.disabledInput,
          inputStyle,
        ]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        editable={!disabled}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={multiline ? numberOfLines : 1}
      />
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    color: '#273F4F',
    fontWeight: 'bold',
    fontFamily: 'Noto Sans',
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#273F4F',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#273F4F',
    width: '100%',
    fontFamily: 'Noto Sans',
  },
  multilineInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  disabledInput: {
    backgroundColor: '#F0F0F0',
    color: '#888',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Noto Sans',
  },
});

export default CustomInput;