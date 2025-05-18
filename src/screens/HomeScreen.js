import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Animated,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';

/**
 * HomeScreen - StudyBuddy ऐप का मुख्य स्क्रीन
 * एक ही स्क्रीन पर क्रमशः चयन करने का अनुभव
 */
const HomeScreen = ({ navigation }) => {
  // मुख्य स्टेट वेरिएबल्स
  const [currentLanguage, setCurrentLanguage] = useState('hindi');
  const [currentStep, setCurrentStep] = useState(1); // 1: बुक, 2: सब्जेक्ट, 3: टॉपिक, 4: स्टडी मोड
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // एनिमेशन स्टेट
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // एनिमेशन के लिए useEffect
  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true
    }).start();
  }, [currentStep]);
  
  // स्क्रॉल रेफरेन्स
  const scrollViewRef = useRef(null);
  
  // डेमो डेटा
  const bookList = [
    { id: 'book1', name: 'सामान्य ज्ञान', color: '#003049', icon: '🧠' },
    { id: 'book2', name: 'भारतीय इतिहास', color: '#C1121F', icon: '🏛️' },
    { id: 'book3', name: 'भूगोल', color: '#669BBC', icon: '🌍' },
    { id: 'book4', name: 'विज्ञान', color: '#780000', icon: '🔬' },
    { id: 'book5', name: 'राजनीति', color: '#003049', icon: '⚖️' },
    { id: 'book6', name: 'अर्थशास्त्र', color: '#C1121F', icon: '💰' },
  ];
  
  const subjectList = [
    // सामान्य ज्ञान के विषय
    { id: 'subject1', bookId: 'book1', name: 'राष्ट्रीय', icon: '🏆' },
    { id: 'subject2', bookId: 'book1', name: 'अंतर्राष्ट्रीय', icon: '🌐' },
    { id: 'subject3', bookId: 'book1', name: 'खेल', icon: '⚽' },
    { id: 'subject4', bookId: 'book1', name: 'पुरस्कार', icon: '🏅' },
    
    // भारतीय इतिहास के विषय
    { id: 'subject5', bookId: 'book2', name: 'प्राचीन काल', icon: '🗿' },
    { id: 'subject6', bookId: 'book2', name: 'मध्यकाल', icon: '⚔️' },
    { id: 'subject7', bookId: 'book2', name: 'आधुनिक काल', icon: '🚂' },
    
    // भूगोल के विषय
    { id: 'subject8', bookId: 'book3', name: 'भारतीय भूगोल', icon: '🗺️' },
    { id: 'subject9', bookId: 'book3', name: 'विश्व भूगोल', icon: '🌎' },
    
    // विज्ञान के विषय
    { id: 'subject10', bookId: 'book4', name: 'भौतिक विज्ञान', icon: '⚛️' },
    { id: 'subject11', bookId: 'book4', name: 'रसायन विज्ञान', icon: '⚗️' },
    { id: 'subject12', bookId: 'book4', name: 'जीव विज्ञान', icon: '🧬' },
  ];
  
  const topicsList = [
    // राष्ट्रीय के टॉपिक्स
    { id: 'topic1', subjectId: 'subject1', name: 'राष्ट्रीय प्रतीक', icon: '🏛️' },
    { id: 'topic2', subjectId: 'subject1', name: 'संविधान', icon: '📜' },
    
    // अंतर्राष्ट्रीय के टॉपिक्स
    { id: 'topic3', subjectId: 'subject2', name: 'संयुक्त राष्ट्र', icon: '🇺🇳' },
    { id: 'topic4', subjectId: 'subject2', name: 'अंतर्राष्ट्रीय संगठन', icon: '🌐' },
    
    // प्राचीन काल के टॉपिक्स
    { id: 'topic5', subjectId: 'subject5', name: 'सिंधु घाटी सभ्यता', icon: '🏺' },
    { id: 'topic6', subjectId: 'subject5', name: 'वैदिक काल', icon: '📚' },
  ];
  
  // फिल्टर्ड डेटा फंक्शन्स
  const getFilteredBooks = () => {
    if (!searchQuery) return bookList;
    return bookList.filter(book => 
      book.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const getFilteredSubjects = () => {
    if (!selectedBook) return [];
    return subjectList.filter(subject => subject.bookId === selectedBook.id);
  };
  
  const getFilteredTopics = () => {
    if (!selectedSubject) return [];
    return topicsList.filter(topic => topic.subjectId === selectedSubject.id);
  };
  
  // चयन हैंडलर्स
  const handleBookSelect = (book) => {
    setSelectedBook(book);
    setSelectedSubject(null);
    setSelectedTopic(null);
    
    // अगले स्टेप पर जाएँ
    setCurrentStep(2);
    
    // स्क्रॉल ऊपर करें
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };
  
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedTopic(null);
    
    // अगले स्टेप पर जाएँ
    setCurrentStep(3);
    
    // स्क्रॉल ऊपर करें
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };
  
  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    
    // अगले स्टेप पर जाएँ
    setCurrentStep(4);
    
    // स्क्रॉल ऊपर करें
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };
  
  // "सभी टॉपिक्स" विकल्प के लिए हैंडलर
  const handleAllTopicsSelect = () => {
    setSelectedTopic(null);
    
    // अगले स्टेप पर जाएँ
    setCurrentStep(4);
    
    // स्क्रॉल ऊपर करें
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };
  
  // भाषा स्विच करने का हैंडलर
  const toggleLanguage = () => {
    setCurrentLanguage(prev => prev === 'hindi' ? 'english' : 'hindi');
  };
  
  // नेविगेशन हैंडलर्स
  const navigateToQuiz = () => {
    if (!selectedBook || !selectedSubject) {
      Alert.alert(
        currentLanguage === 'hindi' ? 'चयन आवश्यक' : 'Selection Required',
        currentLanguage === 'hindi' 
          ? 'कृपया पहले पुस्तक और विषय चुनें' 
          : 'Please select a book and subject first'
      );
      return;
    }
    
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
    if (!selectedBook || !selectedSubject) {
      Alert.alert(
        currentLanguage === 'hindi' ? 'चयन आवश्यक' : 'Selection Required',
        currentLanguage === 'hindi' 
          ? 'कृपया पहले पुस्तक और विषय चुनें' 
          : 'Please select a book and subject first'
      );
      return;
    }
    
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
  
  // नीचे जाने के लिए बटन हैंडलर्स
  const goToStep = (step) => {
    if (step <= currentStep) {
      setCurrentStep(step);
      scrollViewRef.current?.scrollTo({ y: 0, animated: true });
    }
  };
  
  // स्टेप इंडिकेटर बार
  const renderStepIndicator = () => (
    <View style={styles.stepIndicatorContainer}>
      <TouchableOpacity 
        style={[
          styles.stepItem,
          currentStep >= 1 && styles.activeStepItem
        ]}
        onPress={() => goToStep(1)}
      >
        <Text style={[
          styles.stepNumber,
          currentStep >= 1 && styles.activeStepNumber
        ]}>1</Text>
        <Text style={[
          styles.stepLabel,
          currentStep >= 1 && styles.activeStepLabel
        ]}>
          {currentLanguage === 'hindi' ? 'पुस्तक' : 'Book'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.stepConnector}>
        <View style={[
          styles.stepConnectorLine,
          currentStep >= 2 && styles.activeStepConnectorLine
        ]} />
      </View>
      
      <TouchableOpacity 
        style={[
          styles.stepItem,
          currentStep >= 2 && styles.activeStepItem
        ]}
        onPress={() => selectedBook && goToStep(2)}
        disabled={!selectedBook}
      >
        <Text style={[
          styles.stepNumber,
          currentStep >= 2 && styles.activeStepNumber
        ]}>2</Text>
        <Text style={[
          styles.stepLabel,
          currentStep >= 2 && styles.activeStepLabel
        ]}>
          {currentLanguage === 'hindi' ? 'विषय' : 'Subject'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.stepConnector}>
        <View style={[
          styles.stepConnectorLine,
          currentStep >= 3 && styles.activeStepConnectorLine
        ]} />
      </View>
      
      <TouchableOpacity 
        style={[
          styles.stepItem,
          currentStep >= 3 && styles.activeStepItem
        ]}
        onPress={() => selectedSubject && goToStep(3)}
        disabled={!selectedSubject}
      >
        <Text style={[
          styles.stepNumber,
          currentStep >= 3 && styles.activeStepNumber
        ]}>3</Text>
        <Text style={[
          styles.stepLabel,
          currentStep >= 3 && styles.activeStepLabel
        ]}>
          {currentLanguage === 'hindi' ? 'टॉपिक' : 'Topic'}
        </Text>
      </TouchableOpacity>
      
      <View style={styles.stepConnector}>
        <View style={[
          styles.stepConnectorLine,
          currentStep >= 4 && styles.activeStepConnectorLine
        ]} />
      </View>
      
      <TouchableOpacity 
        style={[
          styles.stepItem,
          currentStep >= 4 && styles.activeStepItem
        ]}
        onPress={() => selectedSubject && goToStep(4)}
        disabled={!selectedSubject}
      >
        <Text style={[
          styles.stepNumber,
          currentStep >= 4 && styles.activeStepNumber
        ]}>4</Text>
        <Text style={[
          styles.stepLabel,
          currentStep >= 4 && styles.activeStepLabel
        ]}>
          {currentLanguage === 'hindi' ? 'अध्ययन' : 'Study'}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#003049" barStyle="light-content" />
      
      {/* हेडर */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>StudyBuddy</Text>
        
        <TouchableOpacity
          style={styles.langButton}
          onPress={toggleLanguage}
        >
          <Text style={styles.langButtonIcon}>🌐</Text>
          <View style={styles.langToggleContainer}>
            <Text style={[
              styles.langToggleText,
              currentLanguage === 'hindi' && styles.activeLangToggleText
            ]}>हिं</Text>
            <Text style={styles.langToggleSeparator}>|</Text>
            <Text style={[
              styles.langToggleText,
              currentLanguage === 'english' && styles.activeLangToggleText
            ]}>ENG</Text>
          </View>
        </TouchableOpacity>
      </View>
      
      {/* स्टेप इंडिकेटर */}
      {renderStepIndicator()}
      
      {/* चयन पाथ */}
      {selectedBook && (
        <View style={styles.selectionPathContainer}>
          <Text style={styles.selectionPathLabel}>
            {currentLanguage === 'hindi' ? 'चयनित:' : 'Selected:'}
          </Text>
          
          <TouchableOpacity
            style={styles.selectionChip}
            onPress={() => goToStep(1)}
          >
            <Text style={styles.selectionChipIcon}>{selectedBook.icon}</Text>
            <Text style={styles.selectionChipText}>{selectedBook.name}</Text>
          </TouchableOpacity>
          
          {selectedSubject && (
            <>
              <Text style={styles.selectionPathArrow}>›</Text>
              <TouchableOpacity
                style={styles.selectionChip}
                onPress={() => goToStep(2)}
              >
                <Text style={styles.selectionChipIcon}>{selectedSubject.icon}</Text>
                <Text style={styles.selectionChipText}>{selectedSubject.name}</Text>
              </TouchableOpacity>
            </>
          )}
          
          {selectedTopic && (
            <>
              <Text style={styles.selectionPathArrow}>›</Text>
              <TouchableOpacity
                style={styles.selectionChip}
                onPress={() => goToStep(3)}
              >
                <Text style={styles.selectionChipIcon}>{selectedTopic.icon}</Text>
                <Text style={styles.selectionChipText}>{selectedTopic.name}</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
      
      <ScrollView 
        ref={scrollViewRef}
        style={styles.mainScrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* चरण 1: पुस्तक चयन */}
        {currentStep === 1 && (
          <Animated.View 
            style={[
              styles.stepContainer,
              {
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={styles.stepTitle}>
              {currentLanguage === 'hindi' ? 'पुस्तक चुनें' : 'Select a Book'}
            </Text>
            
            {/* सर्च इनपुट */}
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder={currentLanguage === 'hindi' ? 'पुस्तक खोजें...' : 'Search books...'}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery ? (
                <TouchableOpacity 
                  style={styles.clearSearchButton}
                  onPress={() => setSearchQuery('')}
                >
                  <Text style={styles.clearSearchButtonText}>✕</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.searchIcon}>🔍</Text>
              )}
            </View>
            
            {/* पुस्तक ग्रिड */}
            <View style={styles.booksGrid}>
              {getFilteredBooks().map((book) => (
                <TouchableOpacity
                  key={book.id}
                  style={[
                    styles.bookCard,
                    { backgroundColor: book.color },
                    selectedBook?.id === book.id && styles.selectedBookCard
                  ]}
                  onPress={() => handleBookSelect(book)}
                >
                  <Text style={styles.bookCardIcon}>{book.icon}</Text>
                  <Text style={styles.bookCardText}>{book.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        )}
        
        {/* चरण 2: विषय चयन */}
        {currentStep === 2 && (
          <Animated.View 
            style={[
              styles.stepContainer,
              {
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={styles.stepTitle}>
              {currentLanguage === 'hindi' ? 'विषय चुनें' : 'Select a Subject'}
            </Text>
            
            {/* विषय ग्रिड */}
            <View style={styles.subjectsContainer}>
              <ScrollView 
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.horizontalScrollView}
              >
                {getFilteredSubjects().map((subject) => (
                  <TouchableOpacity
                    key={subject.id}
                    style={[
                      styles.subjectCard,
                      selectedSubject?.id === subject.id && styles.selectedSubjectCard
                    ]}
                    onPress={() => handleSubjectSelect(subject)}
                  >
                    <View style={styles.subjectIconContainer}>
                      <Text style={styles.subjectCardIcon}>{subject.icon}</Text>
                    </View>
                    <Text style={[
                      styles.subjectCardText,
                      selectedSubject?.id === subject.id && styles.selectedCardText
                    ]}>
                      {subject.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              
              {/* स्क्रॉल इंडिकेटर */}
              {getFilteredSubjects().length > 0 && (
                <View style={styles.scrollIndicator}>
                  <Text style={styles.scrollIndicatorText}>
                    {currentLanguage === 'hindi' ? '← स्क्रॉल →' : '← Scroll →'}
                  </Text>
                </View>
              )}
              
              {getFilteredSubjects().length === 0 && (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsText}>
                    {currentLanguage === 'hindi' 
                      ? 'इस पुस्तक के कोई विषय नहीं हैं' 
                      : 'No subjects found for this book'}
                  </Text>
                </View>
              )}
            </View>
            
            {/* नेविगेशन बटन्स */}
            <View style={styles.navigationButtonsContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => goToStep(1)}
              >
                <Text style={styles.backButtonText}>
                  {currentLanguage === 'hindi' ? '← वापस' : '← Back'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
        
        {/* चरण 3: टॉपिक चयन */}
        {currentStep === 3 && (
          <Animated.View 
            style={[
              styles.stepContainer,
              {
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={styles.stepTitle}>
              {currentLanguage === 'hindi' ? 'टॉपिक चुनें (वैकल्पिक)' : 'Select Topic (Optional)'}
            </Text>
            
            {/* सभी टॉपिक्स विकल्प */}
            <TouchableOpacity
              style={[
                styles.allTopicsCard,
                (!selectedTopic && currentStep === 3) && styles.selectedTopicCard
              ]}
              onPress={handleAllTopicsSelect}
            >
              <View style={styles.topicIconContainer}>
                <Text style={styles.topicCardIcon}>📚</Text>
              </View>
              <Text style={[
                styles.allTopicsCardText,
                (!selectedTopic && currentStep === 3) && styles.selectedCardText
              ]}>
                {currentLanguage === 'hindi' ? 'सभी टॉपिक्स' : 'All Topics'}
              </Text>
            </TouchableOpacity>
            
            {/* टॉपिक ग्रिड */}
            <View style={styles.topicsGrid}>
              {getFilteredTopics().map((topic) => (
                <TouchableOpacity
                  key={topic.id}
                  style={[
                    styles.topicCard,
                    selectedTopic?.id === topic.id && styles.selectedTopicCard
                  ]}
                  onPress={() => handleTopicSelect(topic)}
                >
                  <View style={styles.topicIconContainer}>
                    <Text style={styles.topicCardIcon}>{topic.icon}</Text>
                  </View>
                  <Text style={[
                    styles.topicCardText,
                    selectedTopic?.id === topic.id && styles.selectedCardText
                  ]}>
                    {topic.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* नेविगेशन बटन्स */}
            <View style={styles.navigationButtonsContainer}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => goToStep(2)}
              >
                <Text style={styles.backButtonText}>
                  {currentLanguage === 'hindi' ? '← वापस' : '← Back'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleAllTopicsSelect}
              >
                <Text style={styles.nextButtonText}>
                  {currentLanguage === 'hindi' ? 'आगे बढ़ें →' : 'Continue →'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        )}
        
        {/* चरण 4: अध्ययन मोड */}
        {currentStep === 4 && (
          <Animated.View 
            style={[
              styles.stepContainer,
              {
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [300, 0]
                    })
                  }
                ]
              }
            ]}
          >
            <Text style={styles.stepTitle}>
              {currentLanguage === 'hindi' ? 'अध्ययन मोड चुनें' : 'Select Study Mode'}
            </Text>
            
            {/* अध्ययन मोड कार्ड्स */}
            <View style={styles.studyModesContainer}>
              {/* क्विज मोड */}
              <TouchableOpacity
                style={styles.studyModeCard}
                onPress={navigateToQuiz}
              >
                <View style={[styles.studyModeIconContainer, { backgroundColor: 'rgba(193, 18, 31, 0.15)' }]}>
                  <Text style={styles.studyModeIcon}>📝</Text>
                </View>
                <View style={styles.studyModeContent}>
                  <Text style={styles.studyModeTitle}>
                    {currentLanguage === 'hindi' ? 'क्विज़' : 'Quiz'}
                  </Text>
                  <Text style={styles.studyModeDescription}>
                    {currentLanguage === 'hindi' 
                      ? 'इंटरैक्टिव प्रश्न के साथ अभ्यास करें' 
                      : 'Practice with interactive questions'}
                  </Text>
                </View>
                <Text style={styles.studyModeArrow}>→</Text>
              </TouchableOpacity>
              
              {/* वनलाइनर मोड */}
              <TouchableOpacity
                style={styles.studyModeCard}
                onPress={navigateToOneliner}
              >
                <View style={[styles.studyModeIconContainer, { backgroundColor: 'rgba(0, 48, 73, 0.15)' }]}>
                  <Text style={styles.studyModeIcon}>📚</Text>
                </View>
                <View style={styles.studyModeContent}>
                  <Text style={styles.studyModeTitle}>
                    {currentLanguage === 'hindi' ? 'वनलाइनर' : 'Oneliner'}
                  </Text>
                  <Text style={styles.studyModeDescription}>
                    {currentLanguage === 'hindi' 
                      ? 'एक-पंक्ति सार पढ़ें और याद करें' 
                      : 'Read and memorize one-line summaries'}
                  </Text>
                </View>
                <Text style={styles.studyModeArrow}>→</Text>
              </TouchableOpacity>
            </View>
            
            {/* मिश्रित प्रश्न मोड */}
            <View style={styles.miscModeContainer}>
              <Text style={styles.miscModeTitle}>
                {currentLanguage === 'hindi' ? 'या फिर...' : 'Or...'}
              </Text>
              <TouchableOpacity
                style={styles.miscModeCard}
                onPress={navigateToMiscQuestions}
              >
                <View style={[styles.studyModeIconContainer, { backgroundColor: 'rgba(102, 155, 188, 0.15)' }]}>
                  <Text style={styles.studyModeIcon}>🔄</Text>
                </View>
                <View style={styles.studyModeContent}>
                  <Text style={styles.studyModeTitle}>
                    {currentLanguage === 'hindi' ? 'मिश्रित प्रश्न' : 'Mixed Questions'}
                  </Text>
                  <Text style={styles.studyModeDescription}>
                    {currentLanguage === 'hindi' 
                      ? 'सभी प्रश्नों का रैंडम एक्सेस' 
                      : 'Random access to all questions'}
                  </Text>
                </View>
                <Text style={styles.studyModeArrow}>→</Text>
              </TouchableOpacity>
            </View>
            
            {/* नेविगेशन बटन्स */}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => goToStep(3)}
            >
              <Text style={styles.backButtonText}>
                {currentLanguage === 'hindi' ? '← वापस' : '← Back'}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        )}
        
        {/* मिश्रित प्रश्न बटन - पहले चरण पर दिखेगा */}
        {currentStep === 1 && (
          <View style={styles.miscButtonContainer}>
            <TouchableOpacity
              style={styles.miscButton}
              onPress={navigateToMiscQuestions}
            >
              <Text style={styles.miscButtonIcon}>🔄</Text>
              <Text style={styles.miscButtonText}>
                {currentLanguage === 'hindi' ? 'मिश्रित प्रश्न' : 'Mixed Questions'}
              </Text>
            </TouchableOpacity>
            <Text style={styles.miscButtonSubtext}>
              {currentLanguage === 'hindi' 
                ? 'कोई चयन किए बिना सभी प्रश्नों का अभ्यास करें' 
                : 'Practice all questions without any selection'}
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
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
    elevation: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  langButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
  },
  langButtonIcon: {
    fontSize: 16,
    marginRight: 6,
    color: '#FFFFFF',
  },
  langToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  langToggleText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 14,
    paddingHorizontal: 4,
  },
  activeLangToggleText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  langToggleSeparator: {
    color: 'rgba(255,255,255,0.5)',
    fontSize: 14,
  },
  // स्टेप इंडिकेटर स्टाइल्स
  stepIndicatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  stepItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeStepItem: {
    // एक्टिव स्टेप अतिरिक्त स्टाइल्स
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E0E0E0',
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    fontSize: 12,
    fontWeight: 'bold',
    overflow: 'hidden',
    marginBottom: 4,
  },
  activeStepNumber: {
    backgroundColor: '#C1121F',
    color: '#FFFFFF',
  },
  stepLabel: {
    fontSize: 12,
    color: '#666666',
  },
  activeStepLabel: {
    color: '#003049',
    fontWeight: 'bold',
  },
  stepConnector: {
    flex: 1,
    height: 2,
    paddingHorizontal: 4,
  },
  stepConnectorLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#E0E0E0',
  },
  activeStepConnectorLine: {
    backgroundColor: '#C1121F',
  },
  // सेलेक्शन पाथ स्टाइल्स
  selectionPathContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'rgba(0, 48, 73, 0.05)',
    flexWrap: 'wrap',
  },
  selectionPathLabel: {
    fontSize: 13,
    color: '#666666',
    marginRight: 6,
  },
  selectionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
    elevation: 1,
  },
  selectionChipIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  selectionChipText: {
    fontSize: 13,
    color: '#003049',
  },
  selectionPathArrow: {
    fontSize: 16,
    color: '#666666',
    marginHorizontal: 4,
  },
  // मेन स्क्रॉल व्यू
  mainScrollView: {
    flex: 1,
  },
  // स्टेप कंटेनर स्टाइल्स
  stepContainer: {
    padding: 16,
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 16,
  },
  // सर्च स्टाइल्स
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 16,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#003049',
    padding: 0,
  },
  searchIcon: {
    fontSize: 16,
    color: '#999999',
  },
  clearSearchButton: {
    padding: 4,
  },
  clearSearchButtonText: {
    fontSize: 16,
    color: '#999999',
  },
  // पुस्तक ग्रिड स्टाइल्स
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  selectedBookCard: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  bookCardIcon: {
    fontSize: 36,
    marginBottom: 12,
    color: '#FFFFFF',
  },
  bookCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  // विषय स्टाइल्स
  subjectsContainer: {
    marginBottom: 16,
  },
  horizontalScrollView: {
    marginBottom: 8,
  },
  subjectCard: {
    width: 140,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    elevation: 2,
  },
  selectedSubjectCard: {
    borderWidth: 2,
    borderColor: '#C1121F',
  },
  subjectIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 48, 73, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectCardIcon: {
    fontSize: 30,
  },
  subjectCardText: {
    fontSize: 16,
    color: '#003049',
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedCardText: {
    color: '#C1121F',
    fontWeight: 'bold',
  },
  scrollIndicator: {
    alignItems: 'center',
  },
  scrollIndicatorText: {
    fontSize: 12,
    color: '#999999',
  },
  // टॉपिक स्टाइल्स
  allTopicsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
  },
  allTopicsCardText: {
    fontSize: 16,
    color: '#003049',
    fontWeight: '500',
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  topicCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  selectedTopicCard: {
    borderWidth: 2,
    borderColor: '#C1121F',
  },
  topicIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 48, 73, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  topicCardIcon: {
    fontSize: 24,
  },
  topicCardText: {
    fontSize: 14,
    color: '#003049',
    fontWeight: '500',
    textAlign: 'center',
  },
  // स्टडी मोड स्टाइल्स
  studyModesContainer: {
    marginBottom: 20,
  },
  studyModeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
  },
  studyModeIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  studyModeIcon: {
    fontSize: 28,
  },
  studyModeContent: {
    flex: 1,
  },
  studyModeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 6,
  },
  studyModeDescription: {
    fontSize: 14,
    color: '#666666',
  },
  studyModeArrow: {
    fontSize: 24,
    color: '#003049',
  },
  // मिश्रित मोड स्टाइल्स
  miscModeContainer: {
    marginBottom: 20,
  },
  miscModeTitle: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 8,
    textAlign: 'center',
  },
  miscModeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#669BBC',
    elevation: 3,
  },
  miscButtonContainer: {
    padding: 16,
    marginTop: 20,
  },
  miscButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(102, 155, 188, 0.15)',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  miscButtonIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  miscButtonText: {
    fontSize: 16,
    color: '#003049',
    fontWeight: '500',
  },
  miscButtonSubtext: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  // नेविगेशन बटन्स स्टाइल्स
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  nextButton: {
    backgroundColor: '#003049',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#003049',
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  backButtonText: {
    color: '#003049',
    fontWeight: '500',
    fontSize: 16,
  },
  // नो रिजल्ट्स स्टाइल्स
  noResultsContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  noResultsText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});

export default HomeScreen;