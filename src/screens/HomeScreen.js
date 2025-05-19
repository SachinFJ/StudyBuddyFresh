import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';

const HomeScreen = ({ navigation }) => {
  // स्टेट वेरिएबल्स
  const [currentLanguage, setCurrentLanguage] = useState('hindi');
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  
  // डेमो डेटा
  const bookList = [
    { id: 'book1', name: 'सामान्य ज्ञान', color: '#003049', icon: '🧠' },
    { id: 'book2', name: 'भारतीय इतिहास', color: '#C1121F', icon: '🏛️' },
    { id: 'book3', name: 'भूगोल', color: '#669BBC', icon: '🌍' },
    { id: 'book4', name: 'विज्ञान', color: '#780000', icon: '🔬' },
  ];
  
  const subjectList = [
    { id: 'subject1', bookId: 'book1', name: 'राष्ट्रीय', icon: '🏆' },
    { id: 'subject2', bookId: 'book1', name: 'अंतर्राष्ट्रीय', icon: '🌐' },
    { id: 'subject3', bookId: 'book2', name: 'प्राचीन काल', icon: '🗿' },
    { id: 'subject4', bookId: 'book3', name: 'भारतीय भूगोल', icon: '🗺️' },
    { id: 'subject5', bookId: 'book4', name: 'भौतिक विज्ञान', icon: '⚛️' },
  ];
  
  const topicList = [
    { id: 'topic1', subjectId: 'subject1', name: 'राष्ट्रीय प्रतीक', icon: '🏛️' },
    { id: 'topic2', subjectId: 'subject1', name: 'संविधान', icon: '📜' },
    { id: 'topic3', subjectId: 'subject2', name: 'संयुक्त राष्ट्र', icon: '🇺🇳' },
    { id: 'topic4', subjectId: 'subject3', name: 'सिंधु घाटी सभ्यता', icon: '🏺' },
  ];
  
  // फिल्टर फंक्शन्स
  const getFilteredSubjects = () => {
    if (!selectedBook) return [];
    return subjectList.filter(subject => subject.bookId === selectedBook.id);
  };
  
  const getFilteredTopics = () => {
    if (!selectedSubject) return [];
    return topicList.filter(topic => topic.subjectId === selectedSubject.id);
  };
  
  // हैंडलर्स
  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setSelectedSubject(null);
    setSelectedTopic(null);
  };
  
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
  };
  
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
  };
  
  const handleAllTopicsSelect = () => {
    setSelectedTopic(null);
  };
  
  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'hindi' ? 'english' : 'hindi');
  };
  
  // नेविगेशन हैंडलर्स
  const navigateToQuiz = () => {
    if (!selectedBook || !selectedSubject) return;
    
    navigation.navigate('Quiz', {
      bookId: selectedBook.id,
      bookName: selectedBook.name,
      subjectId: selectedSubject.id,
      subjectName: selectedSubject.name,
      topicId: selectedTopic?.id,
      topicName: selectedTopic?.name,
    });
  };
  
  const navigateToOneliner = () => {
    if (!selectedBook || !selectedSubject) return;
    
    navigation.navigate('Oneliner', {
      bookId: selectedBook.id,
      bookName: selectedBook.name,
      subjectId: selectedSubject.id,
      subjectName: selectedSubject.name,
      topicId: selectedTopic?.id,
      topicName: selectedTopic?.name,
    });
  };
  
  const navigateToMiscQuestions = () => {
    navigation.navigate('MiscQuestions');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#003049" barStyle="light-content" />
      
      {/* हेडर */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>StudyBuddy</Text>
        <TouchableOpacity 
          style={styles.langButton}
          onPress={toggleLanguage}
        >
          <Text style={styles.langButtonText}>
            {currentLanguage === 'hindi' ? 'ENG' : 'हिं'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* पुस्तक वाला कार्ड */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {currentLanguage === 'hindi' ? '1. पुस्तक चुनें' : '1. Select Book'}
          </Text>
          
          <FlatList
            data={bookList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.bookItem,
                  { backgroundColor: item.color },
                  selectedBook?.id === item.id && styles.selectedItem
                ]}
                onPress={() => handleBookSelect(item)}
              >
                <Text style={styles.bookItemIcon}>{item.icon}</Text>
                <Text style={styles.bookItemText}>{item.name}</Text>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.bookList}
          />
        </View>
        
        {/* विषय वाला कार्ड */}
        <View style={[
          styles.card,
          !selectedBook && styles.disabledCard
        ]}>
          <Text style={styles.cardTitle}>
            {currentLanguage === 'hindi' ? '2. विषय चुनें' : '2. Select Subject'}
          </Text>
          
          {selectedBook ? (
            <FlatList
              data={getFilteredSubjects()}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.subjectItem,
                    selectedSubject?.id === item.id && styles.selectedSubjectItem
                  ]}
                  onPress={() => handleSubjectSelect(item)}
                >
                  <Text style={styles.subjectItemIcon}>{item.icon}</Text>
                  <Text style={styles.subjectItemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              contentContainerStyle={styles.subjectList}
            />
          ) : (
            <Text style={styles.emptyMessage}>
              {currentLanguage === 'hindi' 
                ? 'पहले पुस्तक चुनें' 
                : 'Please select a book first'}
            </Text>
          )}
        </View>
        
        {/* टॉपिक वाला कार्ड (वैकल्पिक) */}
        <View style={[
          styles.card,
          !selectedSubject && styles.disabledCard
        ]}>
          <Text style={styles.cardTitle}>
            {currentLanguage === 'hindi' ? '3. टॉपिक चुनें (वैकल्पिक)' : '3. Select Topic (Optional)'}
          </Text>
          
          {selectedSubject ? (
            <>
              <TouchableOpacity
                style={[
                  styles.allTopicsButton,
                  !selectedTopic && styles.selectedTopicItem
                ]}
                onPress={handleAllTopicsSelect}
              >
                <Text style={styles.allTopicsIcon}>📚</Text>
                <Text style={styles.allTopicsText}>
                  {currentLanguage === 'hindi' ? 'सभी टॉपिक्स' : 'All Topics'}
                </Text>
              </TouchableOpacity>
              
              <FlatList
                data={getFilteredTopics()}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.topicItem,
                      selectedTopic?.id === item.id && styles.selectedTopicItem
                    ]}
                    onPress={() => handleTopicSelect(item)}
                  >
                    <Text style={styles.topicItemIcon}>{item.icon}</Text>
                    <Text style={styles.topicItemText}>{item.name}</Text>
                  </TouchableOpacity>
                )}
                contentContainerStyle={styles.topicList}
              />
            </>
          ) : (
            <Text style={styles.emptyMessage}>
              {currentLanguage === 'hindi' 
                ? 'पहले विषय चुनें' 
                : 'Please select a subject first'}
            </Text>
          )}
        </View>
        
        {/* अध्ययन मोड कार्ड */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {currentLanguage === 'hindi' ? '4. अध्ययन मोड चुनें' : '4. Select Study Mode'}
          </Text>
          
          {selectedBook && selectedSubject ? (
            <View style={styles.studyModeContainer}>
              <TouchableOpacity
                style={styles.studyModeButton}
                onPress={navigateToQuiz}
              >
                <Text style={styles.studyModeIcon}>📝</Text>
                <Text style={styles.studyModeText}>
                  {currentLanguage === 'hindi' ? 'क्विज़' : 'Quiz'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.studyModeButton}
                onPress={navigateToOneliner}
              >
                <Text style={styles.studyModeIcon}>📚</Text>
                <Text style={styles.studyModeText}>
                  {currentLanguage === 'hindi' ? 'वनलाइनर' : 'Oneliner'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text style={styles.emptyMessage}>
              {currentLanguage === 'hindi' 
                ? 'पहले पुस्तक और विषय चुनें' 
                : 'Please select a book and subject first'}
            </Text>
          )}
        </View>
        
        {/* मिश्रित प्रश्न कार्ड */}
        <View style={styles.miscCard}>
          <Text style={styles.miscCardTitle}>
            {currentLanguage === 'hindi' ? 'या फिर सीधे' : 'Or Directly'}
          </Text>
          
          <TouchableOpacity
            style={styles.miscButton}
            onPress={navigateToMiscQuestions}
          >
            <Text style={styles.miscButtonIcon}>🔄</Text>
            <Text style={styles.miscButtonText}>
              {currentLanguage === 'hindi' ? 'मिश्रित प्रश्न' : 'Mixed Questions'}
            </Text>
          </TouchableOpacity>
          
          <Text style={styles.miscDescription}>
            {currentLanguage === 'hindi' 
              ? 'बिना किसी चयन के सभी प्रश्नों का अभ्यास करें' 
              : 'Practice all questions without any selection'}
          </Text>
        </View>
        
        {/* चयन सारांश */}
        {selectedBook && (
          <View style={styles.selectionSummary}>
            <Text style={styles.summaryTitle}>
              {currentLanguage === 'hindi' ? 'आपका चयन:' : 'Your Selection:'}
            </Text>
            <Text style={styles.summaryText}>
              <Text style={styles.summaryLabel}>
                {currentLanguage === 'hindi' ? 'पुस्तक: ' : 'Book: '}
              </Text>
              {selectedBook.name}
            </Text>
            
            {selectedSubject && (
              <Text style={styles.summaryText}>
                <Text style={styles.summaryLabel}>
                  {currentLanguage === 'hindi' ? 'विषय: ' : 'Subject: '}
                </Text>
                {selectedSubject.name}
              </Text>
            )}
            
            {selectedTopic ? (
              <Text style={styles.summaryText}>
                <Text style={styles.summaryLabel}>
                  {currentLanguage === 'hindi' ? 'टॉपिक: ' : 'Topic: '}
                </Text>
                {selectedTopic.name}
              </Text>
            ) : selectedSubject && (
              <Text style={styles.summaryText}>
                <Text style={styles.summaryLabel}>
                  {currentLanguage === 'hindi' ? 'टॉपिक: ' : 'Topic: '}
                </Text>
                {currentLanguage === 'hindi' ? 'सभी टॉपिक्स' : 'All Topics'}
              </Text>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF0D5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#003049',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  disabledCard: {
    opacity: 0.7,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 16,
  },
  bookList: {
    paddingBottom: 8,
  },
  bookItem: {
    width: 120,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedItem: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  bookItemIcon: {
    fontSize: 32,
    marginBottom: 8,
    color: '#FFFFFF',
  },
  bookItemText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  subjectList: {
    paddingBottom: 8,
  },
  subjectItem: {
    width: 110,
    height: 110,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedSubjectItem: {
    backgroundColor: '#E6F2FF',
    borderWidth: 2,
    borderColor: '#003049',
  },
  subjectItemIcon: {
    fontSize: 28,
    marginBottom: 8,
  },
  subjectItemText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  allTopicsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  allTopicsIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  allTopicsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#003049',
  },
  topicList: {
    paddingBottom: 8,
  },
  topicItem: {
    width: 100,
    height: 100,
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    marginRight: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedTopicItem: {
    backgroundColor: '#E6F2FF',
    borderWidth: 2,
    borderColor: '#003049',
  },
  topicItemIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  topicItemText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 14,
    color: '#999999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 16,
  },
  studyModeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  studyModeButton: {
    width: 120,
    height: 120,
    backgroundColor: '#003049',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
  studyModeIcon: {
    fontSize: 32,
    marginBottom: 8,
    color: '#FFFFFF',
  },
  studyModeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  miscCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#669BBC',
  },
  miscCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 16,
  },
  miscButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  miscButtonIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  miscButtonText: {
    fontSize: 18,
    color: '#003049',
    fontWeight: 'bold',
  },
  miscDescription: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
  selectionSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    borderLeftWidth: 4,
    borderLeftColor: '#C1121F',
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 4,
  },
  summaryLabel: {
    fontWeight: 'bold',
    color: '#003049',
  },
});

export default HomeScreen;