import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
  Animated,
  ImageBackground,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectBook } from '../store/slices/booksSlice';
import { selectSubject, resetSubjectSelection } from '../store/slices/subjectsSlice';
import { selectTopic, resetTopicSelection } from '../store/slices/topicsSlice';
import { toggleLanguage } from '../store/slices/languageSlice';

/**
 * HomeScreen - StudyBuddy ऐप का मुख्य स्क्रीन
 * @param {Object} navigation - नेविगेशन प्रॉप जो स्क्रीन्स के बीच नेविगेट करने के लिए होता है
 */
const HomeScreen = ({ navigation }) => {
  // Redux स्टेट और डिस्पैच
  const dispatch = useDispatch();
  const { allBooks, selectedBook } = useSelector(state => state.books);
  const { allSubjects, selectedSubject } = useSelector(state => state.subjects);
  const { allTopics, selectedTopic } = useSelector(state => state.topics);
  const { current: currentLanguage } = useSelector(state => state.language);
  
  // एनिमेशन स्टेट
  const [fadeAnim] = useState(new Animated.Value(0)); // एनिमेशन वैल्यू
  
  // एनिमेशन प्रभाव - स्क्रीन पर लोड होने पर
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
  }, []);
  
  // फिल्टर्ड सबजेक्ट्स और टॉपिक्स प्राप्त करना
  const getFilteredSubjects = () => {
    if (!selectedBook) return [];
    return allSubjects[selectedBook.id] || [];
  };
  
  const getFilteredTopics = () => {
    if (!selectedSubject) return [];
    return allTopics[selectedSubject.id] || [];
  };
  
  // पुस्तक चयन हैंडलर
  const handleSelectBook = (book) => {
    dispatch(selectBook(book));
    dispatch(resetSubjectSelection());
    dispatch(resetTopicSelection());
  };
  
  // विषय चयन हैंडलर
  const handleSelectSubject = (subject) => {
    dispatch(selectSubject(subject));
    dispatch(resetTopicSelection());
  };
  
  // टॉपिक चयन हैंडलर
  const handleSelectTopic = (topic) => {
    dispatch(selectTopic(topic));
  };
  
  // भाषा टॉगल हैंडलर
  const handleToggleLanguage = () => {
    dispatch(toggleLanguage());
  };

  // नेविगेशन हैंडलर्स
  const navigateToQuiz = () => {
    // सब कुछ स्पष्ट रूप से चेक करें
    if (!selectedBook) {
      alert(currentLanguage === 'hindi' ? 'कृपया पहले पुस्तक चुनें' : 'Please select a book first');
      return;
    }
    
    if (!selectedSubject) {
      alert(currentLanguage === 'hindi' ? 'कृपया विषय चुनें' : 'Please select a subject');
      return;
    }
    
    if (!selectedTopic) {
      alert(currentLanguage === 'hindi' ? 'कृपया टॉपिक चुनें' : 'Please select a topic');
      return;
    }
    
    // तीनों चुने गए हैं, अब नेविगेट करें
    navigation.navigate('Quiz', {
      bookId: selectedBook.id,
      subjectId: selectedSubject.id,
      topicId: selectedTopic.id,
    });
  };
  
  const navigateToOneliner = () => {
    // सब कुछ स्पष्ट रूप से चेक करें
    if (!selectedBook) {
      alert(currentLanguage === 'hindi' ? 'कृपया पहले पुस्तक चुनें' : 'Please select a book first');
      return;
    }
    
    if (!selectedSubject) {
      alert(currentLanguage === 'hindi' ? 'कृपया विषय चुनें' : 'Please select a subject');
      return;
    }
    
    if (!selectedTopic) {
      alert(currentLanguage === 'hindi' ? 'कृपया टॉपिक चुनें' : 'Please select a topic');
      return;
    }
    
    // तीनों चुने गए हैं, अब नेविगेट करें
    navigation.navigate('Oneliner', {
      bookId: selectedBook.id,
      subjectId: selectedSubject.id,
      topicId: selectedTopic.id,
    });
  };
  
  const navigateToMiscQuestions = () => {
    navigation.navigate('MiscQuestions');
  };
  
  const navigateToSuggestBook = () => {
    navigation.navigate('SuggestBook');
  };
  
  const navigateToProgress = () => {
    navigation.navigate('Progress');
  };
  
  // स्टेप इंडिकेटर रेंडर करने वाला फंक्शन
  const renderStepIndicator = () => {
    // यहां हम चेक करते हैं कि यूजर कौन-सा स्टेप पूरा कर चुका है
    const step1Complete = selectedBook !== null;
    const step2Complete = selectedBook !== null && selectedSubject !== null;
    const step3Complete = selectedBook !== null && selectedSubject !== null && selectedTopic !== null;
    
    return (
      <View style={styles.stepIndicatorContainer}>
        <View style={styles.stepLine}>
          <View style={[
            styles.stepLineInner, 
            {width: step1Complete ? (step2Complete ? (step3Complete ? '100%' : '66%') : '33%') : '0%'}
          ]} />
        </View>
        
        <View style={styles.stepsContainer}>
          <View style={[styles.stepCircle, step1Complete ? styles.stepCircleComplete : null]}>
            <Text style={[styles.stepNumber, step1Complete ? styles.stepNumberComplete : null]}>1</Text>
          </View>
          
          <View style={[styles.stepCircle, step2Complete ? styles.stepCircleComplete : null]}>
            <Text style={[styles.stepNumber, step2Complete ? styles.stepNumberComplete : null]}>2</Text>
          </View>
          
          <View style={[styles.stepCircle, step3Complete ? styles.stepCircleComplete : null]}>
            <Text style={[styles.stepNumber, step3Complete ? styles.stepNumberComplete : null]}>3</Text>
          </View>
        </View>
        
        <View style={styles.stepLabelsContainer}>
          <Text style={[styles.stepLabel, step1Complete ? styles.stepLabelComplete : null]}>
            {currentLanguage === 'hindi' ? 'पुस्तक' : 'Book'}
          </Text>
          <Text style={[styles.stepLabel, step2Complete ? styles.stepLabelComplete : null]}>
            {currentLanguage === 'hindi' ? 'विषय' : 'Subject'}
          </Text>
          <Text style={[styles.stepLabel, step3Complete ? styles.stepLabelComplete : null]}>
            {currentLanguage === 'hindi' ? 'टॉपिक' : 'Topic'}
          </Text>
        </View>
      </View>
    );
  };
  
  // पुस्तक कार्ड रेंडरिंग
  const renderBookItem = ({ item }) => {
    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0]
              })
            }
          ]
        }}
      >
        <TouchableOpacity
          style={[
            styles.bookCard,
            { backgroundColor: item.color },
            selectedBook?.id === item.id && styles.selectedBookCard
          ]}
          onPress={() => handleSelectBook(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.bookCardIcon}>{item.icon}</Text>
          <Text style={styles.bookCardText}>
            {currentLanguage === 'hindi' ? item.name : (item.nameEn || item.name)}
          </Text>
          
          {/* चयनित बुक के लिए चेकमार्क */}
          {selectedBook?.id === item.id && (
            <View style={styles.checkmarkContainer}>
              <Text style={styles.checkmarkIcon}>✓</Text>
            </View>
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#003049" barStyle="light-content" />
      
      {/* हेडर */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>StudyBuddy</Text>
        
        {/* अपडेटेड भाषा स्विच बटन */}
        <TouchableOpacity style={styles.langButton} onPress={handleToggleLanguage}>
          <View style={styles.langSwitchContainer}>
            <View style={[
              styles.langOption, 
              currentLanguage === 'hindi' ? styles.activeLangOption : styles.inactiveLangOption
            ]}>
              <Text style={[
                styles.langOptionText, 
                currentLanguage === 'hindi' ? styles.activeLangText : styles.inactiveLangText
              ]}>
                हिंदी
              </Text>
            </View>
            <View style={[
              styles.langOption, 
              currentLanguage === 'english' ? styles.activeLangOption : styles.inactiveLangOption
            ]}>
              <Text style={[
                styles.langOptionText, 
                currentLanguage === 'english' ? styles.activeLangText : styles.inactiveLangText
              ]}>
                ENG
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* स्वागत संदेश */}
        <View style={styles.welcomeContainer}>
          <Animated.View 
            style={[
              styles.welcome,
              {
                opacity: fadeAnim,
                transform: [{
                  translateY: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [30, 0]
                  })
                }]
              }
            ]}
          >
            <Text style={styles.welcomeTitle}>
              {currentLanguage === 'hindi' ? 'नमस्ते!' : 'Hello!'}
            </Text>
            <Text style={styles.welcomeText}>
              {currentLanguage === 'hindi' 
                ? 'आज आप क्या सीखना चाहते हैं?' 
                : 'What would you like to learn today?'}
            </Text>
          </Animated.View>
        </View>
        
        {/* स्टेप इंडिकेटर */}
        <View style={styles.sectionBox}>
          <View style={styles.sectionInfoBox}>
            <Text style={styles.sectionInfoText}>
              {currentLanguage === 'hindi' 
                ? 'चरण-दर-चरण अध्ययन प्रक्रिया' 
                : 'Step by Step Study Process'}
            </Text>
          </View>
          {renderStepIndicator()}
        </View>
        
        {/* पुस्तक चुनें */}
        <View style={styles.sectionBox}>
          <View style={styles.sectionInfoBox}>
            <Text style={styles.sectionInfoText}>
              {currentLanguage === 'hindi' 
                ? 'चरण 1: अध्ययन के लिए पुस्तक चुनें' 
                : 'Step 1: Select Book for Study'}
            </Text>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>
                {currentLanguage === 'hindi' ? 'पुस्तक चुनें' : 'Select Book'}
              </Text>
              {!selectedBook && (
                <Text style={styles.stepHint}>
                  {currentLanguage === 'hindi' ? '← पहला चरण' : '← First Step'}
                </Text>
              )}
            </View>
            
            <FlatList
              data={allBooks}
              renderItem={renderBookItem}
              keyExtractor={item => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.bookList}
            />
          </View>
        </View>
        
        {/* विषय चुनें - केवल तभी सक्रिय करें जब पुस्तक चुनी गई हो */}
        <View style={[
          styles.sectionBox,
          !selectedBook && styles.disabledSectionBox
        ]}>
          <View style={[
            styles.sectionInfoBox,
            !selectedBook && styles.disabledSectionInfoBox
          ]}>
            <Text style={[
              styles.sectionInfoText,
              !selectedBook && styles.disabledSectionInfoText
            ]}>
              {currentLanguage === 'hindi' 
                ? 'चरण 2: पुस्तक से विषय चुनें' 
                : 'Step 2: Select Subject from Book'}
            </Text>
            {!selectedBook && (
              <Text style={styles.sectionInfoNote}>
                {currentLanguage === 'hindi' 
                  ? '(पहले पुस्तक चुनें)' 
                  : '(Select a book first)'}
              </Text>
            )}
          </View>
          
          <View style={[
            styles.section,
            !selectedBook && styles.disabledSection
          ]}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[
                styles.sectionTitle,
                !selectedBook && styles.disabledText
              ]}>
                {currentLanguage === 'hindi' ? 'विषय चुनें' : 'Select Subject'}
              </Text>
              {selectedBook && !selectedSubject && (
                <Text style={styles.stepHint}>
                  {currentLanguage === 'hindi' ? '← दूसरा चरण' : '← Second Step'}
                </Text>
              )}
              {!selectedBook && (
                <Text style={styles.disabledHint}>
                  {currentLanguage === 'hindi' ? 'पहले पुस्तक चुनें' : 'Select book first'}
                </Text>
              )}
            </View>
            
            {selectedBook && (
              <Animated.View 
                style={{
                  opacity: fadeAnim,
                  transform: [{
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0]
                    })
                  }]
                }}
              >
                <ScrollView 
                  horizontal 
                  showsHorizontalScrollIndicator={false}
                  style={styles.subjectsScrollView}
                  contentContainerStyle={styles.subjectsContainer}
                >
                  {getFilteredSubjects().map((subject) => (
                    <TouchableOpacity
                      key={subject.id}
                      style={[
                        styles.subjectButton,
                        selectedSubject?.id === subject.id && styles.selectedSubjectButton
                      ]}
                      onPress={() => handleSelectSubject(subject)}
                    >
                      <View style={styles.subjectIconContainer}>
                        <Text style={styles.subjectIcon}>{subject.icon}</Text>
                      </View>
                      <Text 
                        style={[
                          styles.subjectText,
                          selectedSubject?.id === subject.id && styles.selectedSubjectText
                        ]}
                      >
                        {currentLanguage === 'hindi' ? subject.name : (subject.nameEn || subject.name)}
                      </Text>
                      
                      {/* चयनित विषय के लिए चेकमार्क */}
                      {selectedSubject?.id === subject.id && (
                        <View style={styles.subjectCheckmark}>
                          <Text style={styles.checkmarkIcon}>✓</Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                
                {getFilteredSubjects().length === 0 && (
                  <Text style={styles.noSubjectsText}>
                    {currentLanguage === 'hindi' 
                      ? 'इस पुस्तक के कोई विषय नहीं हैं' 
                      : 'No subjects available for this book'}
                  </Text>
                )}
                
                {/* स्क्रॉल संकेत */}
                {getFilteredSubjects().length > 2 && (
                  <Text style={styles.scrollIndicator}>
                    {currentLanguage === 'hindi' ? '← दाएं-बाएं स्क्रॉल करें →' : '← Scroll left-right →'}
                  </Text>
                )}
              </Animated.View>
            )}
          </View>
        </View>
        
        {/* टॉपिक चुनें - केवल तभी सक्रिय करें जब पुस्तक और विषय चुने गए हों */}
        <View style={[
          styles.sectionBox,
          (!selectedBook || !selectedSubject) && styles.disabledSectionBox
        ]}>
          <View style={[
            styles.sectionInfoBox,
            (!selectedBook || !selectedSubject) && styles.disabledSectionInfoBox
          ]}>
            <Text style={[
              styles.sectionInfoText,
              (!selectedBook || !selectedSubject) && styles.disabledSectionInfoText
            ]}>
              {currentLanguage === 'hindi' 
                ? 'चरण 3: विषय से टॉपिक चुनें' 
                : 'Step 3: Select Topic from Subject'}
            </Text>
            {(!selectedBook || !selectedSubject) && (
              <Text style={styles.sectionInfoNote}>
                {currentLanguage === 'hindi' 
                  ? '(पहले पुस्तक और विषय चुनें)' 
                  : '(Select book & subject first)'}
              </Text>
            )}
          </View>
          
          <View style={[
            styles.section,
            (!selectedBook || !selectedSubject) && styles.disabledSection
          ]}>
            <View style={styles.sectionHeaderRow}>
              <Text style={[
                styles.sectionTitle,
                (!selectedBook || !selectedSubject) && styles.disabledText
              ]}>
                {currentLanguage === 'hindi' ? 'टॉपिक चुनें' : 'Select Topic'}
              </Text>
              {selectedBook && selectedSubject && !selectedTopic && (
                <Text style={styles.stepHint}>
                  {currentLanguage === 'hindi' ? '← अंतिम चरण (अनिवार्य)' : '← Last Step (Required)'}
                </Text>
              )}
              {(!selectedBook || !selectedSubject) && (
                <Text style={styles.disabledHint}>
                  {currentLanguage === 'hindi' 
                    ? 'पहले पुस्तक और विषय चुनें' 
                    : 'Select book and subject first'}
                </Text>
              )}
            </View>
            
            {selectedBook && selectedSubject && (
              <Animated.View 
                style={{
                  opacity: fadeAnim,
                  transform: [{
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [20, 0]
                    })
                  }]
                }}
              >
                {getFilteredTopics().length > 8 ? (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.topicsScrollView}
                    contentContainerStyle={styles.topicsScrollContainer}
                  >
                    <View style={styles.topicList}>
                      {getFilteredTopics().map((topic) => (
                        <TouchableOpacity
                          key={topic.id}
                          style={[
                            styles.topicButton,
                            selectedTopic?.id === topic.id && styles.selectedTopicButton
                          ]}
                          onPress={() => handleSelectTopic(topic)}
                        >
                          <Text style={styles.topicIcon}>{topic.icon}</Text>
                          <Text 
                            style={[
                              styles.topicText,
                              selectedTopic?.id === topic.id && styles.selectedTopicText
                            ]}
                          >
                            {currentLanguage === 'hindi' ? topic.name : (topic.nameEn || topic.name)}
                          </Text>
                          
                          {/* चयनित टॉपिक के लिए चेकमार्क */}
                          {selectedTopic?.id === topic.id && (
                            <View style={styles.topicCheckmark}>
                              <Text style={styles.checkmarkIcon}>✓</Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                ) : (
                  <View style={styles.topicList}>
                    {getFilteredTopics().map((topic) => (
                      <TouchableOpacity
                        key={topic.id}
                        style={[
                          styles.topicButton,
                          selectedTopic?.id === topic.id && styles.selectedTopicButton
                        ]}
                        onPress={() => handleSelectTopic(topic)}
                      >
                        <Text style={styles.topicIcon}>{topic.icon}</Text>
                        <Text 
                          style={[
                            styles.topicText,
                            selectedTopic?.id === topic.id && styles.selectedTopicText
                          ]}
                        >
                          {currentLanguage === 'hindi' ? topic.name : (topic.nameEn || topic.name)}
                        </Text>
                        
                        {/* चयनित टॉपिक के लिए चेकमार्क */}
                        {selectedTopic?.id === topic.id && (
                          <View style={styles.topicCheckmark}>
                            <Text style={styles.checkmarkIcon}>✓</Text>
                          </View>
                        )}
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
                
                {getFilteredTopics().length === 0 && (
                  <Text style={styles.noTopicsText}>
                    {currentLanguage === 'hindi' 
                      ? 'इस विषय के कोई टॉपिक्स नहीं हैं' 
                      : 'No topics available for this subject'}
                  </Text>
                )}
                
                {/* टॉपिक चयन संदेश */}
                <Text style={styles.topicSelectionNote}>
                  {currentLanguage === 'hindi'
                    ? 'टॉपिक चयन अनिवार्य है - क्विज़ या वनलाइनर शुरू करने के लिए एक टॉपिक अवश्य चुनें'
                    : 'Topic selection is required - you must select a topic to start quiz or oneliner'}
                </Text>
              </Animated.View>
            )}
          </View>
        </View>
        
        {/* सिलेक्शन पाथ (ब्रेडक्रम्ब) */}
        {selectedBook && selectedSubject && (
          <View style={styles.selectionPathContainer}>
            <View style={styles.selectionPath}>
              <Text style={styles.selectionPathText}>
                {currentLanguage === 'hindi' ? 'आपका चयन:' : 'Your Selection:'} {` ${selectedBook.name} > ${selectedSubject.name}${selectedTopic ? ` > ${selectedTopic.name}` : ''}`}
              </Text>
            </View>
          </View>
        )}
        
        {/* अध्ययन मोड */}
        <View style={styles.sectionBox}>
          <View style={styles.sectionInfoBox}>
            <Text style={styles.sectionInfoText}>
              {currentLanguage === 'hindi' 
                ? 'अब अध्ययन शुरू करें' 
                : 'Now Start Studying'}
            </Text>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {currentLanguage === 'hindi' ? 'अध्ययन मोड' : 'Study Mode'}
            </Text>
            
            {/* क्विज़ मोड */}
            <TouchableOpacity
              style={[
                styles.modeCard,
                styles.quizCard,
                (!selectedBook || !selectedSubject || !selectedTopic) && styles.disabledCard
              ]}
              onPress={navigateToQuiz}
              disabled={!selectedBook || !selectedSubject || !selectedTopic}
            >
              <View style={styles.modeCardIcon}>
                <Text style={styles.modeCardIconText}>📝</Text>
              </View>
              <View style={styles.modeCardContent}>
                <Text style={styles.modeCardTitle}>
                  {currentLanguage === 'hindi' ? 'क्विज़' : 'Quiz'}
                </Text>
                <Text style={styles.modeCardDesc}>
                  {currentLanguage === 'hindi' 
                    ? 'इंटरैक्टिव प्रश्नोत्तरी का अभ्यास करें' 
                    : 'Practice with interactive quizzes'}
                </Text>
                
                {!selectedTopic ? (
                  <Text style={styles.modeCardHint}>
                    {currentLanguage === 'hindi' 
                      ? 'पुस्तक, विषय और टॉपिक चुनें (अनिवार्य)' 
                      : 'Select book, subject & topic (required)'}
                  </Text>
                ) : (
                  <Text style={styles.modeCardAction}>
                    {currentLanguage === 'hindi' 
                      ? 'शुरू करने के लिए टैप करें' 
                      : 'Tap to start'}
                  </Text>
                )}
              </View>
              {(!selectedBook || !selectedSubject || !selectedTopic) ? (
                <View style={styles.modeCardLock}>
                  <Text style={styles.modeCardLockText}>🔒</Text>
                </View>
              ) : (
                <Text style={styles.modeCardArrow}>→</Text>
              )}
            </TouchableOpacity>
            
            {/* वनलाइनर मोड */}
            <TouchableOpacity
              style={[
                styles.modeCard,
                styles.onelinerCard,
                (!selectedBook || !selectedSubject || !selectedTopic) && styles.disabledCard
              ]}
              onPress={navigateToOneliner}
              disabled={!selectedBook || !selectedSubject || !selectedTopic}
            >
              <View style={styles.modeCardIcon}>
                <Text style={styles.modeCardIconText}>📚</Text>
              </View>
              <View style={styles.modeCardContent}>
                <Text style={styles.modeCardTitle}>
                  {currentLanguage === 'hindi' ? 'वनलाइनर' : 'Oneliner'}
                </Text>
                <Text style={styles.modeCardDesc}>
                  {currentLanguage === 'hindi' 
                    ? 'एक-पंक्ति सार पढ़ें और याद करें' 
                    : 'Read and memorize one-line summaries'}
                </Text>
                
                {!selectedTopic ? (
                  <Text style={styles.modeCardHint}>
                    {currentLanguage === 'hindi' 
                      ? 'पुस्तक, विषय और टॉपिक चुनें (अनिवार्य)' 
                      : 'Select book, subject & topic (required)'}
                  </Text>
                ) : (
                  <Text style={styles.modeCardAction}>
                    {currentLanguage === 'hindi' 
                      ? 'शुरू करने के लिए टैप करें' 
                      : 'Tap to start'}
                  </Text>
                )}
              </View>
              {(!selectedBook || !selectedSubject || !selectedTopic) ? (
                <View style={styles.modeCardLock}>
                  <Text style={styles.modeCardLockText}>🔒</Text>
                </View>
              ) : (
                <Text style={styles.modeCardArrow}>→</Text>
              )}
            </TouchableOpacity>
            
            {/* मिश्रित प्रश्न मोड */}
            <TouchableOpacity
              style={[styles.modeCard, styles.miscCard]}
              onPress={navigateToMiscQuestions}
            >
              <View style={styles.modeCardIcon}>
                <Text style={styles.modeCardIconText}>🔄</Text>
              </View>
              <View style={styles.modeCardContent}>
                <Text style={styles.modeCardTitle}>
                  {currentLanguage === 'hindi' ? 'मिश्रित प्रश्न' : 'Mixed Questions'}
                </Text>
                <Text style={styles.modeCardDesc}>
                  {currentLanguage === 'hindi' 
                    ? 'सभी प्रश्नों का रैंडम एक्सेस' 
                    : 'Random access to all questions'}
                </Text>
                <Text style={styles.modeCardAction}>
                  {currentLanguage === 'hindi' 
                    ? 'किसी भी समय शुरू करें' 
                    : 'Start anytime'}
                </Text>
              </View>
              <Text style={styles.modeCardArrow}>→</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {/* प्रगति */}
        <View style={styles.sectionBox}>
          <View style={styles.sectionInfoBox}>
            <Text style={styles.sectionInfoText}>
              {currentLanguage === 'hindi' 
                ? 'अपना प्रदर्शन ट्रैक करें' 
                : 'Track Your Performance'}
            </Text>
          </View>
          
          <View style={styles.section}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionTitle}>
                {currentLanguage === 'hindi' ? 'आपकी प्रगति' : 'Your Progress'}
              </Text>
              <TouchableOpacity onPress={navigateToProgress} style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>
                  {currentLanguage === 'hindi' ? 'सभी देखें' : 'View All'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>
                  {currentLanguage === 'hindi' ? 'समग्र प्रगति' : 'Overall Progress'}
                </Text>
                <Text style={styles.progressPercent}>35%</Text>
              </View>
              
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: '35%' }]} />
              </View>
              
              <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                  <View style={styles.statBubble}>
                    <Text style={styles.statNumber}>98</Text>
                  </View>
                  <Text style={styles.statLabel}>
                    {currentLanguage === 'hindi' ? 'प्रश्न हल किए' : 'Questions Solved'}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <View style={styles.statBubble}>
                    <Text style={styles.statNumber}>8</Text>
                  </View>
                  <Text style={styles.statLabel}>
                    {currentLanguage === 'hindi' ? 'विषय कवर किए' : 'Subjects Covered'}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <View style={styles.statBubble}>
                    <Text style={styles.statNumber}>7.2</Text>
                  </View>
                  <Text style={styles.statLabel}>
                    {currentLanguage === 'hindi' ? 'औसत स्कोर' : 'Avg. Score'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        
        {/* नई पुस्तक सुझाव */}
        <View style={styles.suggestContainer}>
          <TouchableOpacity 
            style={styles.suggestButton}
            onPress={navigateToSuggestBook}
          >
            <Text style={styles.suggestIcon}>📚</Text>
            <Text style={styles.suggestText}>
              {currentLanguage === 'hindi' ? 'नई पुस्तक सुझाएं' : 'Suggest a New Book'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* फुटर */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            StudyBuddy © {new Date().getFullYear()}
          </Text>
        </View>
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  // अपडेटेड भाषा स्विच स्टाइल्स
  langButton: {
    padding: 2,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  langSwitchContainer: {
    flexDirection: 'row',
    borderRadius: 18,
    overflow: 'hidden',
  },
  langOption: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
  },
  activeLangOption: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  inactiveLangOption: {
    backgroundColor: 'transparent',
  },
  langOptionText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  activeLangText: {
    color: '#003049',
  },
  inactiveLangText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  // स्वागत संदेश
  welcomeContainer: {
    backgroundColor: 'rgba(0, 48, 73, 0.03)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 48, 73, 0.1)',
  },
  welcome: {
    padding: 20,
    paddingTop: 25,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
  },
  // सेक्शन बॉक्स
  sectionBox: {
    marginBottom: 20,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  disabledSectionBox: {
    backgroundColor: '#F8F8F8',
  },
  sectionInfoBox: {
    backgroundColor: '#003049',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.2)',
  },
  disabledSectionInfoBox: {
    backgroundColor: '#999999',
  },
  sectionInfoText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  disabledSectionInfoText: {
    color: 'rgba(255,255,255,0.7)',
  },
  sectionInfoNote: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontStyle: 'italic',
    marginTop: 2,
  },
  // सेक्शन स्टाइल
  section: {
    paddingVertical: 15,
  },
  disabledSection: {
    opacity: 0.75,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  disabledText: {
    color: '#888888',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  viewAllButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  viewAllText: {
    color: '#C1121F',
    fontWeight: 'bold',
    fontSize: 14,
  },
  // पुस्तक कार्ड्स
  bookList: {
    paddingLeft: 20,
    paddingRight: 10,
    paddingBottom: 10,
  },
  bookCard: {
    width: 160,
    height: 100,
    borderRadius: 16,
    marginRight: 12,
    padding: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  selectedBookCard: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  bookCardIcon: {
    fontSize: 24,
    marginBottom: 8,
    color: '#FFFFFF',
  },
  bookCardText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // विषय स्टाइल्स
  subjectsScrollView: {
    marginBottom: 8,
  },
  subjectsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
  subjectButton: {
    width: 120,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 12,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 48, 73, 0.1)',
  },
  selectedSubjectButton: {
    backgroundColor: '#F8F8F8',
    borderWidth: 2,
    borderColor: '#C1121F',
  },
  subjectIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 48, 73, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  subjectIcon: {
    fontSize: 24,
  },
  subjectText: {
    fontSize: 14,
    color: '#003049',
    fontWeight: '500',
    textAlign: 'center',
  },
  selectedSubjectText: {
    color: '#C1121F',
    fontWeight: 'bold',
  },
  noSubjectsText: {
    fontSize: 14,
    color: '#999999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  scrollIndicator: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
    marginTop: 8,
  },
  // टॉपिक स्टाइल्स
  topicsScrollView: {
    maxHeight: 200,
  },
  topicsScrollContainer: {
    paddingBottom: 15,
  },
  topicList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
  },
  topicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'rgba(0, 48, 73, 0.1)',
  },
  selectedTopicButton: {
    backgroundColor: '#780000',
    borderColor: '#780000',
  },
  topicIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  topicText: {
    color: '#003049',
    fontSize: 15,
    fontWeight: '500',
  },
  selectedTopicText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  noTopicsText: {
    fontSize: 14,
    color: '#999999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  topicSelectionNote: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  // मोड कार्ड्स
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 16,
    padding: 18,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderWidth: 1,
    borderColor: 'rgba(0, 48, 73, 0.05)',
  },
  quizCard: {
    borderLeftColor: '#C1121F',
  },
  onelinerCard: {
    borderLeftColor: '#003049',
  },
  miscCard: {
    borderLeftColor: '#669BBC',
  },
  disabledCard: {
    opacity: 0.6,
    borderLeftColor: '#888888',
    backgroundColor: '#F8F8F8',
  },
  modeCardIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(193, 18, 31, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  modeCardIconText: {
    fontSize: 22,
  },
  modeCardContent: {
    flex: 1,
  },
  modeCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 4,
  },
  modeCardDesc: {
    fontSize: 13,
    color: '#666666',
  },
  modeCardArrow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C1121F',
  },
  modeCardLock: {
    fontSize: 22,
    color: '#888888',
    paddingHorizontal: 5,
  },
  modeCardLockText: {
    fontSize: 20,
  },
  // प्रोग्रेस कार्ड
  progressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 5,
    borderWidth: 1,
    borderColor: 'rgba(0, 48, 73, 0.05)',
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003049',
  },
  progressPercent: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#C1121F',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginBottom: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#C1121F',
    borderRadius: 5,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statBubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(102, 155, 188, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003049',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  // सुझाव बटन
  suggestContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
    marginTop: 10,
  },
  suggestButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#003049',
    borderStyle: 'dashed',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  suggestIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  suggestText: {
    color: '#003049',
    fontWeight: '500',
    fontSize: 16,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
  },
  
  // सेलेक्शन पाथ
  selectionPathContainer: {
    marginBottom: 20,
    marginHorizontal: 12,
  },
  selectionPath: {
    backgroundColor: 'rgba(193, 18, 31, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(193, 18, 31, 0.2)',
  },
  selectionPathText: {
    fontSize: 14,
    color: '#C1121F',
    fontWeight: '500',
  },
  // स्टेप इंडिकेटर
  stepIndicatorContainer: {
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  stepLine: {
    position: 'absolute',
    top: 15,
    left: 50,
    right: 50,
    height: 3,
    backgroundColor: '#E0E0E0',
    zIndex: 1,
  },
  stepLineInner: {
    height: '100%',
    width: '0%',
    backgroundColor: '#C1121F',
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    zIndex: 2,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepCircleComplete: {
    backgroundColor: '#C1121F',
    borderColor: '#C1121F',
  },
  stepNumber: {
    fontSize: 14,
    color: '#666666',
    fontWeight: 'bold',
  },
  stepNumberComplete: {
    color: '#FFFFFF',
  },
  stepLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 5,
  },
  stepLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    width: 60,
  },
  stepLabelComplete: {
    color: '#C1121F',
    fontWeight: 'bold',
  },
  stepHint: {
    fontSize: 12,
    color: '#C1121F',
    fontStyle: 'italic',
  },
  // चेकमार्क स्टाइल्स
  checkmarkContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkIcon: {
    color: '#C1121F',
    fontSize: 14,
    fontWeight: 'bold',
  },
  subjectCheckmark: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFFFFF',
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicCheckmark: {
    marginLeft: 8,
    backgroundColor: 'rgba(255,255,255,0.5)',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  // स्पेशल हिंट्स
  modeCardHint: {
    fontSize: 11,
    color: '#C1121F',
    marginTop: 5,
    fontStyle: 'italic',
  },
  modeCardAction: {
    fontSize: 11,
    color: '#669BBC',
    marginTop: 5,
    fontWeight: '500',
  },
  disabledHint: {
    fontSize: 12,
    color: '#888888',
    fontStyle: 'italic',
  },
});

export default HomeScreen;