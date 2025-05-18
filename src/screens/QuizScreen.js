import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  BackHandler,
  Alert,
  Modal,
} from 'react-native';

/**
 * QuizScreen - क्विज़ स्क्रीन जहां यूजर क्विज़ प्रश्नों का अभ्यास कर सकता है
 * @param {Object} route - नेविगेशन रूट जिसमें bookId, subjectId, topicId होगा
 * @param {Object} navigation - नेविगेशन कंट्रोलर
 */
const QuizScreen = ({ route, navigation }) => {
  // रूट पैरामीटर्स से डेटा प्राप्त करें
  const { bookId, subjectId, topicId } = route?.params || { bookId: 'book1', subjectId: 'subject1', topicId: 'topic1' };
  
  // स्टेट
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false); // इमोजी दिखाने के लिए नया स्टेट
  const [isCorrect, setIsCorrect] = useState(false); // सही/गलत उत्तर का स्टेट
  
  // एनिमेशन वैल्यूज़
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;
  const emojiAnim = useRef(new Animated.Value(0)).current; // इमोजी के लिए एनिमेशन
  
  // टाइमर रेफरेंस
  const timerRef = useRef(null);
  const timeoutDuration = 1800; // 30 मिनट (सेकंड्स में)
  
  // डेमो प्रश्न
  const questions = [
    {
      id: 'q1',
      text: 'भारत का राष्ट्रीय पक्षी कौन सा है?',
      options: ['मोर', 'कबूतर', 'गौरैया', 'हंस'],
      correctAnswer: 0,
    },
    {
      id: 'q2',
      text: 'भारत में कितने राज्य हैं?',
      options: ['27', '28', '29', '30'],
      correctAnswer: 1,
    },
    {
      id: 'q3',
      text: 'निम्न में से कौन भारत का पड़ोसी देश नहीं है?',
      options: ['नेपाल', 'म्यांमार', 'अफगानिस्तान', 'इंडोनेशिया'],
      correctAnswer: 3,
    },
    {
      id: 'q4',
      text: 'भारत के प्रथम प्रधानमंत्री कौन थे?',
      options: ['सरदार पटेल', 'जवाहरलाल नेहरू', 'महात्मा गांधी', 'बी.आर. अम्बेडकर'],
      correctAnswer: 1,
    },
    {
      id: 'q5',
      text: 'किस नदी को भारत की सबसे पवित्र नदी माना जाता है?',
      options: ['ब्रह्मपुत्र', 'यमुना', 'गोदावरी', 'गंगा'],
      correctAnswer: 3,
    },
    {
      id: 'q6',
      text: 'फ्लोराइड किस प्रकार का तत्व है?',
      options: ['धातु', 'अधातु', 'उपधातु', 'दुर्लभ मृदा तत्व'],
      correctAnswer: 1,
    },
    {
      id: 'q7',
      text: 'विटामिन C का रासायनिक नाम क्या है?',
      options: ['एस्कॉर्बिक एसिड', 'फॉलिक एसिड', 'सिट्रिक एसिड', 'लैक्टिक एसिड'],
      correctAnswer: 0,
    },
    {
      id: 'q8',
      text: 'पृथ्वी का सबसे बड़ा महाद्वीप कौन सा है?',
      options: ['अफ्रीका', 'उत्तरी अमेरिका', 'एशिया', 'अंटार्कटिका'],
      correctAnswer: 2,
    },
    {
      id: 'q9',
      text: 'ताजमहल किस नदी के किनारे स्थित है?',
      options: ['गंगा', 'यमुना', 'सरस्वती', 'ब्रह्मपुत्र'],
      correctAnswer: 1,
    },
    {
      id: 'q10',
      text: 'भारतीय अंतरिक्ष अनुसंधान संगठन का मुख्यालय कहां स्थित है?',
      options: ['मुंबई', 'बेंगलुरु', 'हैदराबाद', 'नई दिल्ली'],
      correctAnswer: 1,
    },
  ];
  
  // टाइमर सेटअप
  useEffect(() => {
    if (isTimerActive && !completed) {
      timerRef.current = setInterval(() => {
        setTimeElapsed(prev => {
          const newTime = prev + 1;
          // टाइम आउट चेक
          if (newTime >= timeoutDuration) {
            clearInterval(timerRef.current);
            setShowTimeoutModal(true);
            return timeoutDuration;
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isTimerActive, completed]);
  
  // प्रश्न लोड होने पर एनिमेशन
  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: (currentQuestion + 1) / questions.length,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
    
    setSelectedAnswer(null);
    setShowAnswer(false);
    setShowEmoji(false); // इमोजी को हटाएं 
  }, [currentQuestion, fadeAnim, progressAnim]);
  
  // बैक बटन हैंडलर
  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        'क्विज़ छोड़ें?',
        'क्या आप वाकई क्विज़ छोड़ना चाहते हैं? आपकी प्रगति सहेजी नहीं जाएगी।',
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
  
  // टाइमर को फॉर्मेट करें (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // इमोजी एनिमेशन प्रारंभ करें
  const startEmojiAnimation = () => {
    emojiAnim.setValue(0);
    Animated.sequence([
      Animated.timing(emojiAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(1200), // इमोजी को लंबे समय तक दिखाएं
      Animated.timing(emojiAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };
  
  // उत्तर चेक करें
  const checkAnswer = (index) => {
    const isAnswerCorrect = index === questions[currentQuestion].correctAnswer;
    
    setSelectedAnswer(index);
    setShowAnswer(true);
    setIsCorrect(isAnswerCorrect);
    setShowEmoji(true);
    startEmojiAnimation();
    
    // सही उत्तर चेक करें
    if (isAnswerCorrect) {
      setScore(score + 1);
    }
    
    // 2.25 सेकंड का समय
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        fadeAnim.setValue(0); // फेड एनिमेशन रीसेट
      } else {
        // क्विज़ पूरा हुआ
        setCompleted(true);
        setIsTimerActive(false);
      }
    }, 2250); // 2.25 सेकंड का समय
  };
  
  // क्विज़ रीसेट करें
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setCompleted(false);
    setTimeElapsed(0);
    setIsTimerActive(true);
    setShowEmoji(false);
    fadeAnim.setValue(0);
    progressAnim.setValue(0);
  };
  
  // होम स्क्रीन पर वापस जाएं
  const goToHome = () => {
    navigation.goBack();
  };
  
  // क्विज़ जारी रखें (टाइम आउट के बाद)
  const continueQuiz = () => {
    setShowTimeoutModal(false);
    setIsTimerActive(true);
    setTimeElapsed(0);
  };
  
  // अगर क्विज़ पूरा हो गया है तो रिजल्ट स्क्रीन दिखाएं
  if (completed) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>क्विज़ पूरा हुआ!</Text>
          <View style={styles.scoreCard}>
            <Text style={styles.resultEmoji}>
              {score >= questions.length * 0.7 ? '🎉' : score >= questions.length * 0.4 ? '👍' : '😊'}
            </Text>
            <Text style={styles.scoreText}>
              आपका स्कोर: <Text style={styles.scoreNumber}>{score}</Text>/{questions.length}
            </Text>
            <Text style={styles.percentageText}>
              {Math.round((score / questions.length) * 100)}%
            </Text>
            
            <View style={styles.resultProgressBar}>
              <View 
                style={[
                  styles.resultProgressFill, 
                  { width: `${(score / questions.length) * 100}%` }
                ]} 
              />
            </View>
            
            <Text style={styles.timeText}>
              कुल समय: {formatTime(timeElapsed)}
            </Text>
          </View>
          
          <View style={styles.resultMessage}>
            <Text style={styles.resultMessageText}>
              {score === questions.length
                ? '🎉 बधाई हो! आपने सभी प्रश्नों के सही उत्तर दिए!'
                : score >= questions.length * 0.7
                ? '👍 अच्छा प्रदर्शन! थोड़ा और अभ्यास से आप और बेहतर कर सकते हैं।'
                : '📚 अभ्यास जारी रखें! अगली बार आप बेहतर करेंगे।'}
            </Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.tryAgainButton]} 
              onPress={resetQuiz}
            >
              <Text style={styles.buttonText}>फिर से प्रयास करें</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, styles.homeButton]} 
              onPress={goToHome}
            >
              <Text style={styles.buttonText}>होम स्क्रीन</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  
  return (
    <SafeAreaView style={styles.container}>
      {/* हेडर */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            Alert.alert(
              'क्विज़ छोड़ें?',
              'क्या आप वाकई क्विज़ छोड़ना चाहते हैं? आपकी प्रगति सहेजी नहीं जाएगी।',
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
          <Text style={styles.headerTitle}>क्विज़</Text>
        </View>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
        </View>
      </View>
      
      {/* प्रगति बार */}
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
          {currentQuestion + 1} / {questions.length}
        </Text>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
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
          <Text style={styles.questionNumber}>प्रश्न {currentQuestion + 1}</Text>
          <Text style={styles.questionText}>{questions[currentQuestion].text}</Text>
          
          {/* इमोजी एनिमेशन - प्रश्न के अंदर ऑप्शन के ऊपर */}
          {showEmoji && (
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
                {isCorrect ? '😃' : '😔'}
              </Text>
              <Text style={[styles.emojiSubtext, isCorrect ? styles.correctEmojiText : styles.incorrectEmojiText]}>
                {isCorrect ? 'शाबाश!' : 'अगली बार'}
              </Text>
            </Animated.View>
          )}
          
          {/* विकल्प */}
          <View style={styles.optionsContainer}>
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedAnswer === index && styles.selectedOption,
                  showAnswer && index === questions[currentQuestion].correctAnswer && styles.correctOption,
                  showAnswer && selectedAnswer === index && 
                  selectedAnswer !== questions[currentQuestion].correctAnswer && styles.incorrectOption,
                ]}
                onPress={() => !showAnswer && checkAnswer(index)}
                disabled={showAnswer}
              >
                <View style={styles.optionIndex}>
                  <Text style={styles.optionIndexText}>{String.fromCharCode(65 + index)}</Text>
                </View>
                <Text style={styles.optionText}>{option}</Text>
                
                {showAnswer && index === questions[currentQuestion].correctAnswer && (
                  <Text style={styles.correctIndicator}>✓</Text>
                )}
                
                {showAnswer && selectedAnswer === index && 
                 selectedAnswer !== questions[currentQuestion].correctAnswer && (
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
              selectedAnswer === questions[currentQuestion].correctAnswer
                ? styles.correctFeedbackText
                : styles.incorrectFeedbackText
            ]}>
              {selectedAnswer === questions[currentQuestion].correctAnswer
                ? '✓ सही उत्तर! बहुत बढ़िया!'
                : `✗ गलत उत्तर। सही उत्तर: ${questions[currentQuestion].options[questions[currentQuestion].correctAnswer]}`}
            </Text>
          </View>
        )}
        
        {/* "धागा जोड़ें" सेक्शन - हर 5 प्रश्नों के बाद */}
        {currentQuestion > 0 && (currentQuestion + 1) % 5 === 0 && !showAnswer && (
          <View style={styles.threadSection}>
            <Text style={styles.threadTitle}>📌 धागा जोड़ें</Text>
            <Text style={styles.threadText}>
              इस विषय से जुड़े अन्य महत्वपूर्ण तथ्य:
            </Text>
            <View style={styles.threadContent}>
              <Text style={styles.threadItem}>• भारत के पश्चिमी घाट यूनेस्को की विश्व धरोहर स्थल हैं।</Text>
              <Text style={styles.threadItem}>• भारत में कुल 28 राज्य और 8 केंद्र शासित प्रदेश हैं।</Text>
              <Text style={styles.threadItem}>• हिमालय पर्वत श्रृंखला दुनिया की सबसे युवा पर्वत श्रृंखला है।</Text>
            </View>
          </View>
        )}
      </ScrollView>
      
      {/* टाइम आउट मॉडल */}
      <Modal
        visible={showTimeoutModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>समय समाप्त!</Text>
            <Text style={styles.modalText}>
              आपका क्विज़ सत्र 30 मिनट का हो गया है। क्या आप जारी रखना चाहते हैं?
            </Text>
            
            <View style={styles.modalSummary}>
              <Text style={styles.summaryText}>प्रगति: {currentQuestion + 1}/{questions.length} प्रश्न</Text>
              <Text style={styles.summaryText}>स्कोर: {score} सही उत्तर</Text>
            </View>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.homeButton]}
                onPress={goToHome}
              >
                <Text style={styles.buttonText}>होम स्क्रीन</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.continueButton]}
                onPress={continueQuiz}
              >
                <Text style={styles.buttonText}>जारी रखें</Text>
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
    backgroundColor: '#EFEEEA',
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
  },
  // इमोजी स्टाइल्स - छोटे और क्यूट, कार्ड के अंदर
  emojiContainer: {
    alignItems: 'center',
    marginVertical: 8,
    position: 'relative',
  },
  emojiText: {
    fontSize: 36, // छोटा साइज़
    lineHeight: 40,
  },
  emojiSubtext: {
    fontSize: 14, // छोटा साइज़
    fontWeight: 'bold',
    marginTop: -5, // थोड़ा ऊपर खिसकाएं
  },
  correctEmojiText: {
    color: '#669BBC',
  },
  incorrectEmojiText: {
    color: '#780000',
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  questionNumber: {
    fontSize: 13,
    color: '#669BBC',
    marginBottom: 6,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 15,
    lineHeight: 24,
  },
  optionsContainer: {
    marginTop: 5,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10, // कम पैडिंग
    borderRadius: 10,
    marginBottom: 8, // कम मार्जिन
    borderWidth: 1,
    borderColor: '#EFEEEA',
    height: 50, // निश्चित हाइट
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
    width: 26, // छोटा साइज़
    height: 26, // छोटा साइज़
    borderRadius: 13,
    backgroundColor: '#EFEEEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionIndexText: {
    fontSize: 13, // छोटा फॉन्ट साइज़
    fontWeight: 'bold',
    color: '#003049',
  },
  optionText: {
    flex: 1,
    fontSize: 15, // छोटा फॉन्ट साइज़
    color: '#003049',
  },
  correctIndicator: {
    fontSize: 16, // छोटा साइज़
    fontWeight: 'bold',
    color: '#669BBC',
    marginLeft: 8,
  },
  incorrectIndicator: {
    fontSize: 16, // छोटा साइज़
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
    fontSize: 15, // छोटा फॉन्ट साइज़
    textAlign: 'center',
    fontWeight: 'bold',
  },
  correctFeedbackText: {
    color: '#669BBC',
  },
  incorrectFeedbackText: {
    color: '#780000',
  },
  threadSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderLeftWidth: 3,
    borderLeftColor: '#C1121F',
  },
  threadTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 8,
  },
  threadText: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
  },
  threadContent: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
  },
  threadItem: {
    fontSize: 14,
    color: '#003049',
    marginBottom: 6,
  },
  resultContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#003049',
    textAlign: 'center',
    marginBottom: 30,
  },
  scoreCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 30,
  },
  resultEmoji: {
    fontSize: 50,
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 18,
    color: '#003049',
    marginBottom: 8,
  },
  scoreNumber: {
    fontWeight: 'bold',
    color: '#C1121F',
    fontSize: 24,
  },
  percentageText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 16,
  },
  resultProgressBar: {
    width: '100%',
    height: 10,
    backgroundColor: '#EFEEEA',
    borderRadius: 5,
    marginBottom: 16,
    overflow: 'hidden',
  },
  resultProgressFill: {
    height: '100%',
    backgroundColor: '#C1121F',
    borderRadius: 5,
  },
  timeText: {
    fontSize: 14,
    color: '#666666',
  },
  resultMessage: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 30,
  },
  resultMessageText: {
    fontSize: 16,
    color: '#003049',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    margin: 8,
    elevation: 2,
  },
  tryAgainButton: {
    backgroundColor: '#C1121F',
  },
  homeButton: {
    backgroundColor: '#003049',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
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
    padding: 20,
    width: '80%',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003049',
    textAlign: 'center',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 16,
    color: '#003049',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalSummary: {
    backgroundColor: '#F8F8F8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  summaryText: {
    fontSize: 14,
    color: '#003049',
    marginBottom: 6,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    margin: 8,
  },
  continueButton: {
    backgroundColor: '#C1121F',
  },
});

export default QuizScreen;