import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Alert,
} from 'react-native';

/**
 * SuggestBookScreen - नई पुस्तक सुझाव फॉर्म
 * यूज़र्स नई पुस्तकें जोड़ने का सुझाव दे सकते हैं
 * @param {Object} navigation - नेविगेशन प्रॉप
 */
const SuggestBookScreen = ({ navigation }) => {
  // स्टेट वेरिएबल्स
  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('hindi'); // 'hindi' or 'english'
  
  // भाषा टॉगल हैंडलर
  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'hindi' ? 'english' : 'hindi');
  };

  // फॉर्म सबमिट हैंडलर
  const handleSubmit = () => {
    // बेसिक वैलिडेशन
    if (!bookName.trim()) {
      Alert.alert(
        currentLanguage === 'hindi' ? 'त्रुटि' : 'Error',
        currentLanguage === 'hindi' 
          ? 'कृपया पुस्तक का नाम दर्ज करें' 
          : 'Please enter the book name'
      );
      return;
    }
    
    // यहां API कॉल या डेटा सेविंग लॉजिक आएगा
    // डेमो के लिए अभी सिर्फ सक्सेस दिखाएंगे
    Alert.alert(
      currentLanguage === 'hindi' ? 'सफलता' : 'Success',
      currentLanguage === 'hindi'
        ? 'आपका सुझाव सफलतापूर्वक जमा किया गया है।'
        : 'Your suggestion has been submitted successfully.',
      [
        { 
          text: currentLanguage === 'hindi' ? 'ठीक है' : 'OK', 
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
  };

  // वापस जाने का हैंडलर
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FE7743" barStyle="light-content" />
      
      {/* हेडर */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {currentLanguage === 'hindi' ? 'नई पुस्तक सुझाएं' : 'Suggest a New Book'}
        </Text>
        <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
          <Text style={styles.langButtonText}>
            {currentLanguage === 'hindi' ? 'EN' : 'हिं'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* फॉर्म इंट्रो */}
        <View style={styles.formIntro}>
          <Text style={styles.formIntroText}>
            {currentLanguage === 'hindi' 
              ? 'हमें उन पुस्तकों के बारे में बताएं जो आप ऐप पर जोड़ना चाहते हैं। आपके सुझाव हमारे लिए महत्वपूर्ण हैं।' 
              : 'Tell us about books you would like to see added to the app. Your suggestions are valuable to us.'}
          </Text>
        </View>
        
        {/* फॉर्म */}
        <View style={styles.formContainer}>
          {/* पुस्तक का नाम */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {currentLanguage === 'hindi' ? 'पुस्तक का नाम *' : 'Book Name *'}
            </Text>
            <TextInput
              style={styles.textInput}
              value={bookName}
              onChangeText={setBookName}
              placeholder={currentLanguage === 'hindi' ? 'पुस्तक का नाम दर्ज करें' : 'Enter book name'}
              placeholderTextColor="#999"
            />
          </View>
          
          {/* लेखक का नाम */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {currentLanguage === 'hindi' ? 'लेखक का नाम' : 'Author Name'}
            </Text>
            <TextInput
              style={styles.textInput}
              value={authorName}
              onChangeText={setAuthorName}
              placeholder={currentLanguage === 'hindi' ? 'लेखक का नाम दर्ज करें' : 'Enter author name'}
              placeholderTextColor="#999"
            />
          </View>
          
          {/* श्रेणी */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {currentLanguage === 'hindi' ? 'श्रेणी' : 'Category'}
            </Text>
            <TextInput
              style={styles.textInput}
              value={category}
              onChangeText={setCategory}
              placeholder={currentLanguage === 'hindi' ? 'उदाहरण: इतिहास, विज्ञान, आदि' : 'Example: History, Science, etc.'}
              placeholderTextColor="#999"
            />
          </View>
          
          {/* विवरण */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>
              {currentLanguage === 'hindi' ? 'विवरण' : 'Description'}
            </Text>
            <TextInput
              style={[styles.textInput, styles.textAreaInput]}
              value={description}
              onChangeText={setDescription}
              placeholder={currentLanguage === 'hindi' 
                ? 'पुस्तक के बारे में संक्षिप्त विवरण दें'
                : 'Provide a brief description about the book'}
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          {/* नोट */}
          <Text style={styles.noteText}>
            {currentLanguage === 'hindi' 
              ? '* अनिवार्य फील्ड्स'
              : '* Required fields'}
          </Text>
          
          {/* सबमिट बटन */}
          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>
              {currentLanguage === 'hindi' ? 'सुझाव जमा करें' : 'Submit Suggestion'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* नोट */}
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            {currentLanguage === 'hindi' 
              ? 'नोट: सभी सुझाव समीक्षा के अधीन हैं। हम आपकी पुस्तक की उपलब्धता और प्रासंगिकता के आधार पर इसे जोड़ने का प्रयास करेंगे।'
              : 'Note: All suggestions are subject to review. We will try to add your book based on availability and relevance.'}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEEEA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FE7743',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 5,
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  langButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  langButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  formIntro: {
    padding: 20,
    paddingTop: 25,
  },
  formIntroText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 22,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#273F4F',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#000000',
  },
  textAreaInput: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  noteText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 20,
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#FE7743',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disclaimerContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  disclaimerText: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default SuggestBookScreen;