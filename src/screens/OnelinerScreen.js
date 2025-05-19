import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import onelinerData from '../data/onelinerData';
import Header from '../components/common/Header';
import CustomButton from '../components/common/CustomButton';
import Theme from '../utils/Theme';

const OnelinerScreen = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewedCount, setViewedCount] = useState(0);
  
  const { selectedBook } = useSelector(state => state.books);
  const { selectedTopic } = useSelector(state => state.topics);
  const { current: language } = useSelector(state => state.language);
  
  const getOneliners = () => {
    try {
      if (!language || !selectedBook || !selectedBook.id || !selectedTopic || !selectedTopic.id) {
        console.log('Missing required selection:', { language, selectedBook, selectedTopic });
        return [];
      }
      
      console.log('Attempting to fetch oneliner data for:', {
        language,
        bookId: selectedBook.id,
        topicId: selectedTopic.id
      });
      
      if (!onelinerData) {
        console.log('onelinerData is undefined');
        return [];
      }
      
      const languageData = onelinerData[language];
      if (!languageData) {
        console.log(`No data for language: ${language}`);
        return [];
      }
      
      const bookData = languageData[selectedBook.id];
      if (!bookData) {
        console.log(`No data for book: ${selectedBook.id}`);
        return [];
      }
      
      const topicData = bookData[selectedTopic.id];
      if (!topicData) {
        console.log(`No data for topic: ${selectedTopic.id}`);
        return [];
      }
      
      return topicData;
    } catch (error) {
      console.error('Error getting oneliners:', error);
      return [];
    }
  };
  
  const oneliners = getOneliners();
  
  useEffect(() => {
    if (!oneliners || oneliners.length === 0) {
      Alert.alert(
        'डेटा उपलब्ध नहीं है',
        'चयनित पुस्तक और टॉपिक के लिए कोई वनलाइनर उपलब्ध नहीं हैं। कृपया अन्य पुस्तक या टॉपिक चुनें।',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  }, [oneliners, navigation]);
  
  const handleNext = () => {
    if (oneliners && oneliners.length > 0 && currentIndex < oneliners.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setViewedCount(viewedCount + 1);
    }
  };
  
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  const goBack = () => {
    navigation.goBack();
  };
  
  if (!oneliners || oneliners.length === 0) {
    return (
      <View style={styles.container}>
        <Header 
          title={selectedTopic && selectedTopic.name ? selectedTopic.name : (language === 'hindi' ? 'वनलाइनर' : 'Oneliners')} 
          showBackButton 
          onBackPress={goBack} 
        />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>
            {language === 'hindi' ? 'लोड हो रहा है...' : 'Loading...'}
          </Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Header 
        title={selectedTopic && selectedTopic.name ? selectedTopic.name : (language === 'hindi' ? 'वनलाइनर' : 'Oneliners')}
        showBackButton 
        onBackPress={goBack} 
      />
      
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>
          {currentIndex + 1}/{oneliners.length}
        </Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardText}>
            {oneliners[currentIndex].text}
          </Text>
          
          <Text style={styles.categoryText}>
            {language === 'hindi' ? 'श्रेणी' : 'Category'}: {oneliners[currentIndex].category}
          </Text>
        </View>
        
        <View style={styles.navigationContainer}>
          <CustomButton 
            title={language === 'hindi' ? 'पिछला' : 'Previous'} 
            onPress={handlePrevious} 
            style={[styles.navButton, currentIndex === 0 && styles.disabledButton]}
            disabled={currentIndex === 0}
          />
          <CustomButton 
            title={language === 'hindi' ? 'अगला' : 'Next'} 
            onPress={handleNext} 
            style={[styles.navButton, currentIndex === oneliners.length - 1 && styles.disabledButton]}
            disabled={currentIndex === oneliners.length - 1}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
    flexGrow: 1,
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    color: Theme.colors.secondary,
    fontWeight: 'bold',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginVertical: 20,
    elevation: 2,
    flex: 1,
    justifyContent: 'center',
    minHeight: 200,
  },
  cardText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#000',
    textAlign: 'center',
  },
  categoryText: {
    marginTop: 20,
    fontSize: 14,
    color: Theme.colors.primary,
    textAlign: 'right',
    fontStyle: 'italic',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    flex: 0.48,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: Theme.colors.primary,
  },
});

export default OnelinerScreen;