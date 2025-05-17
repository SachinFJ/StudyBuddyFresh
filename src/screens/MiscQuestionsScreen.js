import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Animated,
  Modal,
  ScrollView,
  StatusBar,
} from 'react-native';

/**
 * MiscQuestionsScreen - मिश्रित प्रश्नों का स्क्रीन
 * यह स्क्रीन पुस्तक या टॉपिक का चयन किए बिना रैंडम प्रश्नों का अभ्यास प्रदान करता है
 * @param {Object} navigation - नेविगेशन प्रॉप
 */
const MiscQuestionsScreen = ({ navigation }) => {
  // स्टेट
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [questionsAttempted, setQuestionsAttempted] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [loadNewQuestions, setLoadNewQuestions] = useState(false);
  
  // एनिमेशन वैल्यूज़
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // टाइमर रेफरेंस
  const timerRef = useRef(null);
  
  // फिल्टर विकल्प
  const filters = [
    { id: 'all', name: 'सभी' },
    { id: 'history', name: 'इतिहास' },
    { id: 'geography', name: 'भूगोल' },
    { id: 'science', name: 'विज्ञान' },
    { id: 'polity', name: 'राजनीति' },
    { id: 'economics', name: 'अर्थशास्त्र' },
  ];
  
  // डेमो प्रश्न - वास्तविक डेटा बाद में JSON से आएगा
  const demoQuestions = [
    {
      id: 'mq1',
      text: 'भारत का राष्ट्रीय पक्षी कौन सा है?',
      options: ['मोर', 'कबूतर', 'गौरैया', 'हंस'],
      correctAnswer: 0,
      category: 'science',
      difficulty: 'easy',
    },
    {
      id: 'mq2',
      text: 'किस महासागर में हिंद महासागर द्वीप समूह स्थित है?',
      options: ['प्रशांत महासागर', 'हिंद महासागर', 'अटलांटिक महासागर', 'आर्कटिक महासागर'],
      correctAnswer: 1,
      category: 'geography',
      difficulty: 'medium',
    },
    {
      id: 'mq3',
      text: 'महात्मा गांधी का जन्म किस वर्ष हुआ था?',
      options: ['1869', '1872', '1878', '1882'],
      correctAnswer: 0,
      category: 'history',
      difficulty: 'medium',
    },
    {
      id: 'mq4',
      text: 'भारतीय संविधान को किस वर्ष अपनाया गया था?',
      options: ['1947', '1950', '1952', '1956'],
      correctAnswer: 1,
      category: 'polity',
      difficulty: 'medium',
    },
    {
      id: 'mq5',
      text: 'निम्नलिखित में से कौन एक प्राथमिक रंग है?',
      options: ['नारंगी', 'हरा', 'बैंगनी', 'नीला'],
      correctAnswer: 3,
      category: 'science',
      difficulty: 'easy',
    },
    {
      id: 'mq6',
      text: 'मुद्रास्फीति का क्या अर्थ है?',
      options: [
        'वस्तुओं और सेवाओं की कीमतों में वृद्धि',
        'मुद्रा का मूल्य घटना',
        'बेरोजगारी की दर में वृद्धि',
        'अर्थव्यवस्था में मंदी'
      ],
      correctAnswer: 0,
      category: 'economics',
      difficulty: 'hard',
    },
    {
      id: 'mq7',
      text: 'सूर्य से पृथ्वी की औसत दूरी कितनी है?',
      options: ['150 मिलियन किमी', '100 मिलियन किमी', '200 मिलियन किमी', '250 मिलियन किमी'],
      correctAnswer: 0,
      category: 'science',
      difficulty: 'hard',
    },
    {
      id: 'mq8',
      text: 'भारत में सबसे लंबी नदी कौन सी है?',
      options: ['गंगा', 'ब्रह्मपुत्र', 'गोदावरी', 'यमुना'],
      correctAnswer: 0,
      category: 'geography',
      difficulty: 'easy',
    },
    {
      id: 'mq9',
      text: 'बाबर कौन था?',
      options: ['मुगल साम्राज्य का संस्थापक', 'दिल्ली सल्तनत का अंतिम शासक', 'मराठा साम्राज्य का संस्थापक', 'गुप्त वंश का शासक'],
      correctAnswer: 0,
      category: 'history',
      difficulty: 'medium',
    },
    {
      id: 'mq10',
      text: 'भारतीय संसद के दो सदन कौन से हैं?',
      options: ['विधान सभा और विधान परिषद', 'लोकसभा और राज्यसभा', 'लोकसभा और विधान सभा', 'राज्यसभा और विधान परिषद'],
      correctAnswer: 1,
      category: 'polity',
      difficulty: 'easy',
    },
  ];
  
  // प्रश्न लोड करें
  useEffect(() => {
    loadQuestions();
  }, [selectedFilter, loadNewQuestions]);
  
  // टाइमर सेटअप
  useEffect(() => {
    if (isTimerActive) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive]);
  
  // प्रश्न लोड करने का फंक्शन
  const loadQuestions = () => {
    // फिल्टर अनुसार प्रश्न फिल्टर करें
    let filteredQuestions = [...demoQuestions];
    
    if (selectedFilter !== 'all') {
      filteredQuestions = demoQuestions.filter(q => q.category === selectedFilter);
    }
    
    // प्रश्नों को शफल करें
    const shuffled = [...filteredQuestions].sort(() => 0.5 - Math.random());
    
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
  };
  
  // टाइमर को फॉर्मेट करें (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // अगले प्रश्न पर जाएँ
  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      // फेड आउट
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
        
        // फेड इन
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    } else {
      // प्रश्न समाप्त - नए प्रश्न लोड करें या सारांश दिखाएं
      setShowStatsModal(true);
    }
  };
  
  // उत्तर चेक करें
  const checkAnswer = (index) => {
    setSelectedAnswer(index);
    setShowAnswer(true);
    setQuestionsAttempted(questionsAttempted + 1);
    
    // सही उत्तर चेक करें
    if (index === questions[currentIndex].correctAnswer) {
      setScore(score + 1);
    }
    
    // कुछ समय बाद अगले प्रश्न पर जाएं
    setTimeout(() => {
      goToNext();
    }, 1500);
  };
  
  // फिल्टर बदलें
  const changeFilter = (filterId) => {
    setSelectedFilter(filterId);
    setScore(0);
    setQuestionsAttempted(0);
  };
  
  // नए प्रश्न लोड करें
  const loadMoreQuestions = () => {
    setShowStatsModal(false);
    setScore(0);
    setQuestionsAttempted(0);
    setLoadNewQuestions(!loadNewQuestions);
  };
  
  // होम स्क्रीन पर जाएँ
  const goToHome = () => {
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#5B8C5A" barStyle="light-content" />
      
      {/* हेडर */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={goToHome}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>मिश्रित प्रश्न</Text>
        </View>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
        </View>
      </View>
      
      {/* फिल्टर बटन्स */}
      <View style={styles.filterContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterScrollContent}
        >
          {filters.map(filter => (
            <TouchableOpacity
              key={filter.id}
              style={[
                styles.filterButton,
                selectedFilter === filter.id && styles.selectedFilterButton
              ]}
              onPress={() => changeFilter(filter.id)}
            >
              <Text style={[
                styles.filterButtonText,
                selectedFilter === filter.id && styles.selectedFilterButtonText
              ]}>
                {filter.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* स्टैट्स बार */}
      <View style={styles.statsBar}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>स्कोर</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>प्रयास</Text>
          <Text style={styles.statValue}>{questionsAttempted}</Text>
        </View>
        
        <View style={styles.statDivider} />
        
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>सटीकता</Text>
          <Text style={styles.statValue}>
            {questionsAttempted > 0 
              ? `${Math.round((score / questionsAttempted) * 100)}%` 
              : '0%'}
          </Text>
        </View>
      </View>
      
      {/* प्रश्न कंटेंट */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {questions.length > 0 ? (
          <Animated.View 
            style={[
              styles.questionCard,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* प्रश्न हेडर */}
            <View style={styles.questionHeader}>
              <Text style={styles.questionNumber}>
                प्रश्न {currentIndex + 1} / {questions.length}
              </Text>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryText}>
                  {filters.find(f => f.id === questions[currentIndex].category)?.name || 'अन्य'}
                </Text>
              </View>
            </View>
            
            {/* प्रश्न टेक्स्ट */}
            <Text style={styles.questionText}>
              {questions[currentIndex].text}
            </Text>
            
            {/* विकल्प */}
            <View style={styles.optionsContainer}>
              {questions[currentIndex].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionButton,
                    selectedAnswer === index && styles.selectedOption,
                    showAnswer && index === questions[currentIndex].correctAnswer && styles.correctOption,
                    showAnswer && selectedAnswer === index && 
                    selectedAnswer !== questions[currentIndex].correctAnswer && styles.incorrectOption,
                  ]}
                  onPress={() => !showAnswer && checkAnswer(index)}
                  disabled={showAnswer}
                >
                  <Text style={styles.optionIndex}>{String.fromCharCode(65 + index)}</Text>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {/* फीडबैक */}
            {showAnswer && (
              <View style={styles.feedbackContainer}>
                <Text style={[
                  styles.feedbackText,
                  selectedAnswer === questions[currentIndex].correctAnswer 
                    ? styles.correctFeedbackText
                    : styles.incorrectFeedbackText
                ]}>
                  {selectedAnswer === questions[currentIndex].correctAnswer 
                    ? '✓ सही उत्तर!' 
                    : `✗ गलत उत्तर। सही उत्तर: ${questions[currentIndex].options[questions[currentIndex].correctAnswer]}`}
                </Text>
              </View>
            )}
            
            {/* अगला बटन (केवल जब उत्तर दिखाया गया हो) */}
            {showAnswer && (
              <TouchableOpacity 
                style={styles.nextButton}
                onPress={goToNext}
              >
                <Text style={styles.nextButtonText}>
                  {currentIndex < questions.length - 1 ? 'अगला प्रश्न' : 'परिणाम देखें'}
                </Text>
              </TouchableOpacity>
            )}
          </Animated.View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              इस श्रेणी में कोई प्रश्न उपलब्ध नहीं है।
            </Text>
            <TouchableOpacity 
              style={styles.changeFilterButton}
              onPress={() => changeFilter('all')}
            >
              <Text style={styles.changeFilterButtonText}>
                सभी प्रश्न देखें
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
      {/* स्टैट्स मॉडल */}
      <Modal
        visible={showStatsModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>आपका परिणाम</Text>
            
            <View style={styles.modalStatsContainer}>
              <View style={styles.modalStatItem}>
                <Text style={styles.modalStatValue}>{score}</Text>
                <Text style={styles.modalStatLabel}>सही उत्तर</Text>
              </View>
              
              <View style={styles.modalStatItem}>
                <Text style={styles.modalStatValue}>{questionsAttempted}</Text>
                <Text style={styles.modalStatLabel}>कुल प्रयास</Text>
              </View>
              
              <View style={styles.modalStatItem}>
                <Text style={styles.modalStatValue}>
                  {questionsAttempted > 0 
                    ? `${Math.round((score / questionsAttempted) * 100)}%` 
                    : '0%'}
                </Text>
                <Text style={styles.modalStatLabel}>सटीकता</Text>
              </View>
            </View>
            
            <View style={styles.timeTakenContainer}>
              <Text style={styles.timeTakenText}>
                कुल समय: {formatTime(timeElapsed)}
              </Text>
            </View>
            
            <View style={styles.feedbackMessageContainer}>
              <Text style={styles.feedbackMessageText}>
                {questionsAttempted > 0 && score / questionsAttempted >= 0.8
                  ? '🎉 बढ़िया प्रदर्शन! आप बहुत अच्छा कर रहे हैं।'
                  : questionsAttempted > 0 && score / questionsAttempted >= 0.5
                  ? '👍 अच्छा प्रयास! थोड़ा और अभ्यास करें।'
                  : '📚 अधिक अभ्यास करें, आप बेहतर कर सकते हैं!'}
              </Text>
            </View>
            
            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.homeButton]}
                onPress={goToHome}
              >
                <Text style={styles.modalButtonText}>होम</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.continueButton]}
                onPress={loadMoreQuestions}
              >
                <Text style={styles.modalButtonText}>और प्रश्न</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#5B8C5A',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  timerContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  timerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterScrollContent: {
    paddingHorizontal: 10,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    marginHorizontal: 5,
  },
  selectedFilterButton: {
    backgroundColor: '#5B8C5A',
  },
  filterButtonText: {
    color: '#333333',
    fontWeight: '500',
  },
  selectedFilterButtonText: {
    color: '#FFFFFF',
  },
  statsBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5B8C5A',
  },
  statDivider: {
    width: 1,
    height: '80%',
    backgroundColor: '#EFEFEF',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 30,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  questionNumber: {
    fontSize: 14,
    color: '#666666',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#5B8C5A20',
    borderRadius: 12,
  },
  categoryText: {
    fontSize: 12,
    color: '#5B8C5A',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  selectedOption: {
    backgroundColor: '#5B8C5A20',
    borderColor: '#5B8C5A',
  },
  correctOption: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  incorrectOption: {
    backgroundColor: '#FFEBEE',
    borderColor: '#E57373',
  },
  optionIndex: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#EFEFEF',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333333',
    marginRight: 12,
    overflow: 'hidden',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
  },
  feedbackContainer: {
    marginTop: 15,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  feedbackText: {
    fontSize: 16,
    textAlign: 'center',
  },
  correctFeedbackText: {
    color: '#4CAF50',
  },
  incorrectFeedbackText: {
    color: '#E57373',
  },
  nextButton: {
    backgroundColor: '#5B8C5A',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  changeFilterButton: {
    backgroundColor: '#5B8C5A',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  changeFilterButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 25,
    width: '85%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  modalStatItem: {
    alignItems: 'center',
  },
  modalStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5B8C5A',
    marginBottom: 5,
  },
  modalStatLabel: {
    fontSize: 14,
    color: '#666666',
  },
  timeTakenContainer: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    paddingVertical: 10,
    marginBottom: 20,
  },
  timeTakenText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  feedbackMessageContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  feedbackMessageText: {
    fontSize: 16,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 24,
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 6,
  },
  homeButton: {
    backgroundColor: '#666666',
  },
  continueButton: {
    backgroundColor: '#5B8C5A',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MiscQuestionsScreen;