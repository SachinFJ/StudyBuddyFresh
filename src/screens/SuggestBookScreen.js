// SuggestBookScreen.js - पुस्तक सुझाव स्क्रीन

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// कंपोनेंट्स
import Header from '../components/common/Header';
import CustomInput from '../components/common/CustomInput';
import CustomButton from '../components/common/CustomButton';

// थीम
import Theme from '../utils/Theme';

/**
 * पुस्तक सुझाव स्क्रीन कंपोनेंट
 * यूजर्स द्वारा नई पुस्तकों के सुझाव के लिए फॉर्म
 */
const SuggestBookScreen = () => {
  const navigation = useNavigation();
  
  // रेडक्स स्टेट से डेटा प्राप्त करें
  const { current: currentLanguage } = useSelector((state) => state.language);
  
  // फॉर्म स्टेट
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  // वैलिडेशन स्टेट
  const [errors, setErrors] = useState({
    bookName: '',
    authorName: '',
    category: '',
    description: '',
  });
  
  // फॉर्म सबमिट हैंडलर
  const handleSubmit = () => {
    // फॉर्म वैलिडेशन
    const newErrors = {};
    
    if (!bookName.trim()) {
      newErrors.bookName =
        currentLanguage === 'hindi'
          ? 'पुस्तक का नाम आवश्यक है'
          : 'Book name is required';
    }
    
    if (!authorName.trim()) {
      newErrors.authorName =
        currentLanguage === 'hindi'
          ? 'लेखक का नाम आवश्यक है'
          : 'Author name is required';
    }
    
    if (!category.trim()) {
      newErrors.category =
        currentLanguage === 'hindi'
          ? 'श्रेणी आवश्यक है'
          : 'Category is required';
    }
    
    if (!description.trim()) {
      newErrors.description =
        currentLanguage === 'hindi'
          ? 'विवरण आवश्यक है'
          : 'Description is required';
    }
    
    setErrors(newErrors);
    
    // यदि कोई एरर नहीं है, तो फॉर्म सबमिट करें
    if (Object.keys(newErrors).length === 0) {
      // यहाँ एपीआई कॉल या डेटा स्टोरेज कोड होगा
      // अभी के लिए, हम केवल एक अलर्ट दिखाएंगे
      
      Alert.alert(
        currentLanguage === 'hindi'
          ? 'सुझाव प्राप्त हुआ'
          : 'Suggestion Received',
        currentLanguage === 'hindi'
          ? 'आपका पुस्तक सुझाव सफलतापूर्वक प्राप्त हो गया है। हम जल्द ही इसकी समीक्षा करेंगे।'
          : 'Your book suggestion has been successfully received. We will review it soon.',
        [
          {
            text: 'OK',
            onPress: () => {
              // फॉर्म रीसेट करें
              setBookName('');
              setAuthorName('');
              setCategory('');
              setDescription('');
              setAdditionalInfo('');
              setErrors({});
              
              // होम स्क्रीन पर वापस जाएँ
              navigation.navigate('Home');
            },
          },
        ]
      );
    }
  };
  
  // फॉर्म रीसेट हैंडलर
  const handleReset = () => {
    setBookName('');
    setAuthorName('');
    setCategory('');
    setDescription('');
    setAdditionalInfo('');
    setErrors({});
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={
          currentLanguage === 'hindi' ? 'पुस्तक सुझाएँ' : 'Suggest Book'
        }
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerContainer}>
            <Ionicons
              name="book-outline"
              size={48}
              color={Theme.COLORS.PRIMARY}
              style={styles.headerIcon}
            />
            
            <Text style={styles.headerTitle}>
              {currentLanguage === 'hindi'
                ? 'नई पुस्तक सुझाएँ'
                : 'Suggest a New Book'}
            </Text>
            
            <Text style={styles.headerSubtitle}>
              {currentLanguage === 'hindi'
                ? 'हम आपके सुझावों का स्वागत करते हैं! कृपया नीचे दिए गए फॉर्म को भरें।'
                : 'We welcome your suggestions! Please fill in the form below.'}
            </Text>
          </View>
          
          <View style={styles.formContainer}>
            <CustomInput
              label={currentLanguage === 'hindi' ? 'पुस्तक का नाम *' : 'Book Name *'}
              value={bookName}
              onChangeText={setBookName}
              placeholder={
                currentLanguage === 'hindi'
                  ? 'पुस्तक का नाम दर्ज करें'
                  : 'Enter book name'
              }
              error={errors.bookName}
            />
            
            <CustomInput
              label={currentLanguage === 'hindi' ? 'लेखक का नाम *' : 'Author Name *'}
              value={authorName}
              onChangeText={setAuthorName}
              placeholder={
                currentLanguage === 'hindi'
                  ? 'लेखक का नाम दर्ज करें'
                  : 'Enter author name'
              }
              error={errors.authorName}
            />
            
            <CustomInput
              label={currentLanguage === 'hindi' ? 'श्रेणी *' : 'Category *'}
              value={category}
              onChangeText={setCategory}
              placeholder={
                currentLanguage === 'hindi'
                  ? 'श्रेणी दर्ज करें (उदा. इतिहास, विज्ञान)'
                  : 'Enter category (e.g., History, Science)'
              }
              error={errors.category}
            />
            
            <CustomInput
              label={currentLanguage === 'hindi' ? 'विवरण *' : 'Description *'}
              value={description}
              onChangeText={setDescription}
              placeholder={
                currentLanguage === 'hindi'
                  ? 'पुस्तक का संक्षिप्त विवरण दर्ज करें'
                  : 'Enter a brief description of the book'
              }
              multiline={true}
              error={errors.description}
            />
            
            <CustomInput
              label={
                currentLanguage === 'hindi'
                  ? 'अतिरिक्त जानकारी (वैकल्पिक)'
                  : 'Additional Information (Optional)'
              }
              value={additionalInfo}
              onChangeText={setAdditionalInfo}
              placeholder={
                currentLanguage === 'hindi'
                  ? 'कोई अतिरिक्त जानकारी या सुझाव'
                  : 'Any additional information or suggestions'
              }
              multiline={true}
            />
            
            <View style={styles.requiredFieldsNote}>
              <Text style={styles.requiredFieldsText}>
                * {currentLanguage === 'hindi' ? 'आवश्यक फील्ड' : 'Required fields'}
              </Text>
            </View>
            
            <View style={styles.buttonContainer}>
              <CustomButton
                title={currentLanguage === 'hindi' ? 'सबमिट करें' : 'Submit'}
                onPress={handleSubmit}
                style={styles.submitButton}
              />
              
              <CustomButton
                title={currentLanguage === 'hindi' ? 'रीसेट करें' : 'Reset'}
                onPress={handleReset}
                type="outline"
                style={styles.resetButton}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.COLORS.BACKGROUND,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Theme.SPACING.REGULAR,
    paddingBottom: Theme.SPACING.XXLARGE,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: Theme.SPACING.LARGE,
  },
  headerIcon: {
    marginBottom: Theme.SPACING.REGULAR,
  },
  headerTitle: {
    fontSize: Theme.FONT_SIZES.XLARGE,
    fontWeight: 'bold',
    color: Theme.COLORS.SECONDARY,
    marginBottom: Theme.SPACING.SMALL,
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: Theme.FONT_SIZES.REGULAR,
    color: Theme.COLORS.TEXT,
    textAlign: 'center',
  },
  formContainer: {
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: Theme.BORDER_RADIUS.REGULAR,
    padding: Theme.SPACING.LARGE,
    ...Theme.COMPONENT_STYLES.SHADOW,
  },
  requiredFieldsNote: {
    marginTop: Theme.SPACING.SMALL,
    marginBottom: Theme.SPACING.REGULAR,
  },
  requiredFieldsText: {
    fontSize: Theme.FONT_SIZES.SMALL,
    color: Theme.COLORS.MEDIUM_GRAY,
    fontStyle: 'italic',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Theme.SPACING.REGULAR,
  },
  submitButton: {
    flex: 1,
    marginRight: Theme.SPACING.SMALL,
  },
  resetButton: {
    flex: 1,
    marginLeft: Theme.SPACING.SMALL,
  },
});

export default SuggestBookScreen;
