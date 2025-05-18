import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  StatusBar,
  BackHandler,
  Alert,
  FlatList,
} from 'react-native';

/**
 * MiscQuestionsScreen - मिश्रित प्रश्न स्क्रीन
 * सभी प्रश्नों का रैंडम एक्सेस प्रदान करता है
 * @param {Object} navigation - नेविगेशन कंट्रोलर
 */
const MiscQuestionsScreen = ({ navigation }) => {
  // स्टेट
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  
  // एनिमेशन वैल्यूज़
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const emojiAnim = useRef(new Animated.Value(0)).current;
  
  // टाइमर रेफरेंस
  const timerRef = useRef(null);
  
  // फिल्टर ऑप्शन्स
  const filterOptions = [
    { id: 'all', name: 'सभी प्रश्न' },
    { id: 'history', name: 'इतिहास' },
    { id: 'geography', name: 'भूगोल' },
    { id: 'science', name: 'विज्ञान' },
    { id: 'easy', name: 'आसान' },
    { id: 'medium', name: 'मध्यम' },
    { id: 'hard', name: 'कठिन' },
  ];
  
  // डेमो डेटा - सभी प्रश्न
  const allQuestions = [
    {
      id: 'q1',
      text: 'भारत का राष्ट्रीय पक्षी कौन सा है?',
      options: ['मोर', 'कबूतर', 'गौरैया', 'हंस'],
      correctAnswer: 0,
      category: 'geography',
      difficulty: 'easy',
    },
    {
      id: 'q2',
      text: 'भारत में कितने राज्य हैं?',
      options: ['27', '28', '29', '30'],
      correctAnswer: 1,
      category: 'geography',
      difficulty: 'easy',
    },
    {
      id: 'q3',
      text: 'निम्न में से कौन भारत का पड़ोसी देश नहीं है?',
      options: ['नेपाल', 'म्यांमार', 'अफगानिस्तान', 'इंडोनेशिया'],
      correctAnswer: 3,
      category: 'geography',
      difficulty: 'medium',
    },
    {
      id: 'q4',
      text: 'भारत के प्रथम प्रधानमंत्री कौन थे?',
      options: ['सरदार पटेल', 'जवाहरलाल नेहरू', 'महात्मा गांधी', 'बी.आर. अम्बेडकर'],
      correctAnswer: 1,
      category: 'history',
      difficulty: 'easy',
    },
    {
      id: 'q5',
      text: 'किस नदी को भारत की सबसे पवित्र नदी माना जाता है?',
      options: ['ब्रह्मपुत्र', 'यमुना', 'गोदावरी', 'गंगा'],
      correctAnswer: 3,
      category: 'geography',
      difficulty: 'easy',
    },
    {
      id: 'q6',
      text: 'फ्लोराइड किस प्रकार का तत्व है?',
      options: ['धातु', 'अधातु', 'उपधातु', 'दुर्लभ मृदा तत्व'],
      correctAnswer: 1,
      category: 'science',
      difficulty: 'medium',
    },
    {
      id: 'q7',
      text: 'विटामिन C का रासायनिक नाम क्या है?',
      options: ['एस्कॉर्बिक एसिड', 'फॉलिक एसिड', 'सिट्रिक एसिड', 'लैक्टिक एसिड'],
      correctAnswer: 0,
      category: 'science',
      difficulty: 'medium',
    },
    {
      id: 'q8',
      text: 'पृथ्वी का सबसे बड़ा महाद्वीप कौन सा है?',
      options: ['अफ्रीका', 'उत्तरी अमेरिका', 'एशिया', 'अंटार्कटिका'],
      correctAnswer: 2,
      category: 'geography',
      difficulty: 'easy',
    },
    {
      id: 'q9',
      text: 'ताजमहल किस नदी के किनारे स्थित है?',
      options: ['गंगा', 'यमुना', 'सरस्वती', 'ब्रह्मपुत्र'],
      correctAnswer: 1,
      category: 'history',
      difficulty: 'easy',
    },
    {
      id: 'q10',
      text: 'भारतीय अंतरिक्ष अनुसंधान संगठन का मुख्यालय कहां स्थित है?',
      options: ['मुंबई', 'बेंगलुरु', 'हैदराबाद', 'नई दिल्ली'],
      correctAnswer: 1,
      category: 'science',
      difficulty: 'medium',
    },
    {
      id: 'q11',
      text: 'निम्नलिखित में से कौन-सा युग्म मिलान नहीं है?',
      options: ['ताँबा - Cu', 'चाँदी - Ag', 'सोना - Gd', 'पारा - Hg'],
      correctAnswer: 2,
      category: 'science',
      difficulty: 'hard',
    },
    {
      id: 'q12',
      text: 'भारत के किस राज्य की सीमा चीन, नेपाल और भूटान से मिलती है?',
      options: ['सिक्किम', 'अरुणाचल प्रदेश', 'असम', 'पश्चिम बंगाल'],
      correctAnswer: 0,
      category: 'geography',
      difficulty: 'hard',
    },
    {
      id: 'q13',
      text: 'हड़प्पा सभ्यता का सबसे बड़ा स्थल कौन-सा है?',
      options: ['हड़प्पा', 'मोहनजोदड़ो', 'राखीगढ़ी', 'लोथल'],
      correctAnswer: 2,
      category: 'history',
      difficulty: 'hard',
    },
    {
      id: 'q14',
      text: '1857 के विद्रोह के समय भारत का गवर्नर-जनरल कौन था?',
      options: ['लॉर्ड डलहौजी', 'लॉर्ड कैनिंग', 'लॉर्ड रिपन', 'लॉर्ड हेस्टिंग्स'],
      correctAnswer: 1,
      category: 'history',
      difficulty: 'medium',
    },
    {
      id: 'q15',
      text: 'निम्नलिखित में से कौन अपवर्तन के नियम का प्रतिपादन किया?',
      options: ['न्यूटन', 'स्नेल', 'हुक', 'फैराडे'],
      correctAnswer: 1,
      category: 'science',
      difficulty: 'hard',
    },
  ];
  
  // स्क्रीन लोड होने पर फिल्टर सेट करें
  useEffect(() => {
    applyFilter('all');
  }, []);
  
  // प्रश्न लोड होने पर एनिमेशन
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(progressAnim, {
          toValue: (currentQuestion + 1) / filteredQuestions.length,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
    
    setSelectedAnswer(null);
    setShowAnswer(false);
  }, [currentQuestion, fadeAnim, progressAnim, filteredQuestions]);
  
  // टाइमर सेटअप
  useEffect(() => {
    if (isTimerActive && filteredQuestions.length > 0) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive, filteredQuestions]);
  
  // बैक बटन हैंडलर
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'प्रश्न छोड़ें?',
        'क्या आप वाकई इस सेशन को छोड़ना चाहते हैं?',
        [
          { text: 'नहीं', style: 'cancel', onPress: () => {} },
          { text: 'हां', style: 'destructive', onPress: () => navigation.goBack() }
        ]
      );
      return true;
    };
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
    return () => backHandler.remove();
  }, [navigation]);
  
  // फिल्टर लागू करें
  const applyFilter = (filterId) => {
    setActiveFilter(filterId);
    
    let filtered = [];
    if (filterId === 'all') {
      filtered = [...allQuestions];
    } else if (['history', 'geography', 'science'].includes(filterId)) {
      filtered = allQuestions.filter(q => q.category === filterId);
    } else if (['easy', 'medium', 'hard'].includes(filterId)) {
      filtered = allQuestions.filter(q => q.difficulty === filterId);
    }
    
    // शफल करें
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    
    setFilteredQuestions(shuffled);
    setCurrentQuestion(0);
    setScore(0);
    setTimeElapsed(0);
    fadeAnim.setValue(0);
    progressAnim.setValue(0);
  };
  
  // इमोजी एनिमेशन प्रारंभ करें
  const startEmojiAnimation = (isCorrect) => {
    emojiAnim.setValue(0);
    Animated.sequence([
      Animated.timing(emojiAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1000), 
      Animated.timing(emojiAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };
  
  // टाइमर को फॉर्मेट करें (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // उत्तर चेक करें
  const checkAnswer = (index) => {
    setSelectedAnswer(index);
    setShowAnswer(true);
    
    const isCorrect = index === filteredQuestions[currentQuestion].correctAnswer;
    startEmojiAnimation(isCorrect);
    
    // सही उत्तर चेक करें
    if (isCorrect) {
      setScore(score + 1);
    }
    
    // कुछ समय बाद अगले प्रश्न पर जाएं (अगर अंतिम प्रश्न नहीं है)
    if (currentQuestion < filteredQuestions.length - 1) {
      setTimeout(() => {
        setCurrentQuestion(currentQuestion + 1);
        fadeAnim.setValue(0); // फेड एनिमेशन रीसेट
      }, 2250);
    }
  };
  
  // अगले प्रश्न पर जाएं
  const goToNextQuestion = () => {
    if (currentQuestion < filteredQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      fadeAnim.setValue(0);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };
  
  // पिछले प्रश्न पर वापस जाएं
  const goToPreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      fadeAnim.setValue(0);
      setSelectedAnswer(null);
      setShowAnswer(false);
    }
  };
  
  // प्रश्न को स्किप करें
  const skipQuestion = () => {
    goToNextQuestion();
  };
  
  // सेशन रीसेट करें
  const resetSession = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setTimeElapsed(0);
    fadeAnim.setValue(0);
    progressAnim.setValue(0);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#003049" barStyle="light-content" />
      
      {/* हेडर */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            Alert.alert(
              'प्रश्न छोड़ें?',
              'क्या आप वाकई इस सेशन को छोड़ना चाहते हैं?',
              [
                { text: 'नहीं', style: 'cancel', onPress: () => {} },
                { text: 'हां', style: 'destructive', onPress: () => navigation.goBack() }
              ]
            );
          }}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>मिश्रित प्रश्न</Text>
          <Text style={styles.headerSubtitle}>
            सभी विषयों से रैंडम प्रश्न
          </Text>
        </View>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
        </View>
      </View>
      
      {/* फिल्टर्स */}
      <View style={styles.filterContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={filterOptions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterButton,
                activeFilter === item.id && styles.activeFilterButton
              ]}
              onPress={() => applyFilter(item.id)}
            >
              <Text style={[
                styles.filterButtonText,
                activeFilter === item.id && styles.activeFilterButtonText
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.filterList}
        />
      </View>
      
      {/* प्रगति बार */}
      {filteredQuestions.length > 0 && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <Animated.View 
              style={[
                styles.progressFill,
                { width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }) }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentQuestion + 1} / {filteredQuestions.length}
          </Text>
        </View>
      )}
      
      {/* मुख्य कंटेंट */}
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {filteredQuestions.length > 0 ? (
          <>
            {/* इमोजी एनिमेशन */}
            {showAnswer && (
              <Animated.View 
                style={[
                  styles.emojiContainer,
                  { 
                    opacity: emojiAnim,
                    transform: [
                      { scale: emojiAnim.interpolate({
                        inputRange: [0, 0.5, 1],
                        outputRange: [0.5, 1.2, 1]
                      })},
                    ]
                  }
                ]}
              >
                <Text style={styles.emojiText}>
                  {selectedAnswer === filteredQuestions[currentQuestion].correctAnswer ? '😃' : '😔'}
                </Text>
                <Text style={[
                  styles.emojiSubtext, 
                  selectedAnswer === filteredQuestions[currentQuestion].correctAnswer 
                    ? styles.correctEmojiText 
                    : styles.incorrectEmojiText
                ]}>
                  {selectedAnswer === filteredQuestions[currentQuestion].correctAnswer 
                    ? 'शाबाश!' 
                    : 'अगली बार'
                  }
                </Text>
              </Animated.View>
            )}
          
            {/* प्रश्न कार्ड */}
            <Animated.View 
              style={[
                styles.questionCard,
                { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                }) }] }
              ]}
            >
              <View style={styles.questionHeader}>
                <Text style={styles.questionNumber}>प्रश्न {currentQuestion + 1}</Text>
                <View style={styles.questionMeta}>
                  <View style={[
                    styles.categoryBadge,
                    filteredQuestions[currentQuestion].category === 'history' && styles.historyBadge,
                    filteredQuestions[currentQuestion].category === 'geography' && styles.geographyBadge,
                    filteredQuestions[currentQuestion].category === 'science' && styles.scienceBadge,
                  ]}>
                    <Text style={styles.categoryText}>
                      {filteredQuestions[currentQuestion].category === 'history' ? 'इतिहास' : 
                       filteredQuestions[currentQuestion].category === 'geography' ? 'भूगोल' : 
                       filteredQuestions[currentQuestion].category === 'science' ? 'विज्ञान' : 'अन्य'}
                    </Text>
                  </View>
                  <View style={[
                    styles.difficultyBadge,
                    filteredQuestions[currentQuestion].difficulty === 'easy' && styles.easyBadge,
                    filteredQuestions[currentQuestion].difficulty === 'medium' && styles.mediumBadge,
                    filteredQuestions[currentQuestion].difficulty === 'hard' && styles.hardBadge,
                  ]}>
                    <Text style={styles.difficultyText}>
                      {filteredQuestions[currentQuestion].difficulty === 'easy' ? 'आसान' : 
                       filteredQuestions[currentQuestion].difficulty === 'medium' ? 'मध्यम' : 
                       filteredQuestions[currentQuestion].difficulty === 'hard' ? 'कठिन' : ''}
                    </Text>
                  </View>
                </View>
              </View>
              
              <Text style={styles.questionText}>{filteredQuestions[currentQuestion].text}</Text>
              
              {/* विकल्प */}
              <View style={styles.optionsContainer}>
                {filteredQuestions[currentQuestion].options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionButton,
                      selectedAnswer === index && styles.selectedOption,
                      showAnswer && index === filteredQuestions[currentQuestion].correctAnswer && styles.correctOption,
                      showAnswer && selectedAnswer === index && 
                      selectedAnswer !== filteredQuestions[currentQuestion].correctAnswer && styles.incorrectOption,
                    ]}
                    onPress={() => !showAnswer && checkAnswer(index)}
                    disabled={showAnswer}
                  >
                    <View style={styles.optionIndex}>
                      <Text style={styles.optionIndexText}>{String.fromCharCode(65 + index)}</Text>
                    </View>
                    <Text style={styles.optionText}>{option}</Text>
                    
                    {showAnswer && index === filteredQuestions[currentQuestion].correctAnswer && (
                      <Text style={styles.correctIndicator}>✓</Text>
                    )}
                    
                    {showAnswer && selectedAnswer === index && 
                     selectedAnswer !== filteredQuestions[currentQuestion].correctAnswer && (
                      <Text style={styles.incorrectIndicator}>✗</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
            
            {/* फीडबैक मैसेज */}
            {showAnswer && (
              <View style={styles.feedbackContainer}>
                <Text style={[
                  styles.feedbackText,
                  selectedAnswer === filteredQuestions[currentQuestion].correctAnswer
                    ? styles.correctFeedbackText
                    : styles.incorrectFeedbackText
                ]}>
                  {selectedAnswer === filteredQuestions[currentQuestion].correctAnswer
                    ? '✓ सही उत्तर! बहुत बढ़िया!'
                    : `✗ गलत उत्तर। सही उत्तर: ${filteredQuestions[currentQuestion].options[filteredQuestions[currentQuestion].correctAnswer]}`}
                </Text>
              </View>
            )}
            
            {/* नेविगेशन बटन्स */}
            <View style={styles.navigationContainer}>
              <TouchableOpacity
                style={[styles.navButton, currentQuestion === 0 && styles.disabledButton]}
                onPress={goToPreviousQuestion}
                disabled={currentQuestion === 0}
              >
                <Text style={styles.navButtonText}>◀ पिछला</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.skipButton}
                onPress={skipQuestion}
                disabled={currentQuestion === filteredQuestions.length - 1}
              >
                <Text style={styles.skipButtonText}>
                  {showAnswer ? 'अगला प्रश्न' : 'प्रश्न छोड़ें'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[
                  styles.navButton, 
                  currentQuestion === filteredQuestions.length - 1 && styles.disabledButton
                ]}
                onPress={goToNextQuestion}
                disabled={currentQuestion === filteredQuestions.length - 1}
              >
                <Text style={styles.navButtonText}>अगला ▶</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              इस फिल्टर के अनुसार कोई प्रश्न उपलब्ध नहीं है।
            </Text>
            <TouchableOpacity
              style={styles.resetButton}
              onPress={() => applyFilter('all')}
            >
              <Text style={styles.resetButtonText}>सभी प्रश्न दिखाएं</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
      
      {/* स्टेट्स फुटर */}
      {filteredQuestions.length > 0 && (
        <View style={styles.statsContainer}>
          <View style={styles.statsLeft}>
            <Text style={styles.statsText}>
              स्कोर: <Text style={styles.statsHighlight}>{score}/{currentQuestion + (showAnswer ? 1 : 0)}</Text>
            </Text>
            <Text style={styles.statsText}>
              सटीकता: <Text style={styles.statsHighlight}>
                {currentQuestion + (showAnswer ? 1 : 0) > 0 
                  ? Math.round((score / (currentQuestion + (showAnswer ? 1 : 0))) * 100)
                  : 0}%
              </Text>
            </Text>
          </View>
          
          <TouchableOpacity
            style={styles.resetSessionButton}
            onPress={resetSession}
          >
            <Text style={styles.resetSessionText}>रीसेट</Text>
          </TouchableOpacity>
        </View>
      )}
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
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#003049',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  headerSubtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
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
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  filterList: {
    paddingHorizontal: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 20,
    marginHorizontal: 4,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  activeFilterButton: {
    backgroundColor: '#C1121F',
  },
  filterButtonText: {
    color: '#003049',
    fontWeight: '500',
    fontSize: 14,
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#F0F0F0',
    borderRadius: 3,
    marginRight: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#C1121F',
    borderRadius: 3,
  },
  progressText: {
    color: '#003049',
    fontWeight: 'bold',
    fontSize: 13,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  // इमोजी स्टाइल्स
  emojiContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  emojiText: {
    fontSize: 36,
    lineHeight: 40,
  },
  emojiSubtext: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: -5,
  },
  correctEmojiText: {
    color: '#669BBC',
  },
  incorrectEmojiText: {
    color: '#C1121F',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    marginBottom: 16,
  },
  questionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  questionNumber: {
    fontSize: 14,
    color: '#669BBC',
    fontWeight: 'bold',
  },
  questionMeta: {
    flexDirection: 'row',
  },
  categoryBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 6,
  },
  historyBadge: {
    backgroundColor: '#C1121F',
  },
  geographyBadge: {
    backgroundColor: '#669BBC',
  },
  scienceBadge: {
    backgroundColor: '#780000',
  },
  categoryText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  easyBadge: {
    backgroundColor: '#4CAF50',
  },
  mediumBadge: {
    backgroundColor: '#FF9800',
  },
  hardBadge: {
    backgroundColor: '#F44336',
  },
  difficultyText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 20,
    lineHeight: 26,
  },
  optionsContainer: {
    marginTop: 5,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    height: 50,
  },
  selectedOption: {
    backgroundColor: '#FDF0D5',
    borderColor: '#C1121F',
  },
  correctOption: {
    backgroundColor: '#EDF9F0',
    borderColor: '#669BBC',
  },
  incorrectOption: {
    backgroundColor: '#FEF0EF',
    borderColor: '#780000',
  },
  optionIndex: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionIndexText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#003049',
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    color: '#003049',
  },
  correctIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#669BBC',
    marginLeft: 8,
  },
  incorrectIndicator: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#780000',
    marginLeft: 8,
  },
  feedbackContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  feedbackText: {
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  correctFeedbackText: {
    color: '#669BBC',
  },
  incorrectFeedbackText: {
    color: '#780000',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  navButtonText: {
    color: '#003049',
    fontWeight: 'bold',
    fontSize: 14,
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#003049',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  skipButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  disabledButton: {
    opacity: 0.5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 20,
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#C1121F',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statsLeft: {
    flexDirection: 'column',
  },
  statsText: {
    fontSize: 13,
    color: '#666666',
    marginBottom: 2,
  },
  statsHighlight: {
    color: '#C1121F',
    fontWeight: 'bold',
  },
  resetSessionButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  resetSessionText: {
    color: '#003049',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default MiscQuestionsScreen;