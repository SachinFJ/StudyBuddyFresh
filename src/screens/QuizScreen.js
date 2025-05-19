import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import quizData from '../data/quizData';
import Header from '../components/common/Header';
import ProgressIndicator from '../components/common/ProgressIndicator';
import CustomButton from '../components/common/CustomButton';
import Theme from '../utils/Theme';

const QuizScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  
  const { selectedBook } = useSelector(state => state.books);
  const { selectedTopic } = useSelector(state => state.topics);
  const { current: language } = useSelector(state => state.language);
  
  const getQuestions = () => {
    try {
      if (!language || !selectedBook || !selectedBook.id || !selectedTopic || !selectedTopic.id) {
        console.log('Missing required selection:', { language, selectedBook, selectedTopic });
        return [];
      }
      
      console.log('Attempting to fetch quiz data for:', {
        language,
        bookId: selectedBook.id,
        topicId: selectedTopic.id
      });
      
      if (!quizData) {
        console.log('quizData is undefined');
        return [];
      }
      
      const languageData = quizData[language];
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
      console.error('Error getting quiz questions:', error);
      return [];
    }
  };
  
  const questions = getQuestions();
  
  useEffect(() => {
    if (!questions || questions.length === 0) {
      Alert.alert(
        'डेटा उपलब्ध नहीं है',
        'चयनित पुस्तक और टॉपिक के लिए कोई प्रश्न उपलब्ध नहीं हैं। कृपया अन्य पुस्तक या टॉपिक चुनें।',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  }, [questions, navigation]);
  
  const handleAnswerSelect = (answerIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    
    if (questions && questions.length > 0) {
      const isCorrect = answerIndex === questions[currentQuestionIndex].correctAnswer;
      if (isCorrect) {
        setScore(score + 1);
      }
    }
    
    setAnsweredQuestions(answeredQuestions + 1);
    
    setTimeout(() => {
      if (questions && questions.length > 0 && currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };
  
  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setAnsweredQuestions(0);
  };
  
  const goBack = () => {
    navigation.goBack();
  };
  
  if (showResult) {
    return (
      <View style={styles.container}>
        <Header title={language === 'hindi' ? 'परिणाम' : 'Results'} showBackButton onBackPress={goBack} />
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>
            {language === 'hindi' ? 'आपका स्कोर' : 'Your Score'}
          </Text>
          <Text style={styles.resultScore}>
            {score} / {questions ? questions.length : 0}
          </Text>
          <Text style={styles.resultPercentage}>
            {questions && questions.length > 0 ? ((score / questions.length) * 100).toFixed(0) : 0}%
          </Text>
          
          <CustomButton 
            title={language === 'hindi' ? 'फिर से शुरू करें' : 'Restart Quiz'} 
            onPress={restartQuiz} 
            style={styles.restartButton}
          />
          <CustomButton 
            title={language === 'hindi' ? 'होम पेज पर जाएं' : 'Go to Home'} 
            onPress={goBack} 
            style={styles.homeButton}
          />
        </View>
      </View>
    );
  }
  
  if (!questions || questions.length === 0) {
    return (
      <View style={styles.container}>
        <Header 
          title={selectedTopic && selectedTopic.name ? selectedTopic.name : (language === 'hindi' ? 'क्विज़' : 'Quiz')} 
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
        title={selectedTopic && selectedTopic.name ? selectedTopic.name : (language === 'hindi' ? 'क्विज़' : 'Quiz')}
        showBackButton 
        onBackPress={goBack} 
      />
      
      <View style={styles.progressContainer}>
        <ProgressIndicator 
          progress={(currentQuestionIndex) / questions.length} 
          total={questions.length} 
          current={currentQuestionIndex + 1} 
        />
      </View>
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.questionContainer}>
          <Text style={styles.questionNumber}>
            {language === 'hindi' ? 'प्रश्न' : 'Question'} {currentQuestionIndex + 1}/{questions.length}
          </Text>
          <Text style={styles.questionText}>
            {questions[currentQuestionIndex].question}
          </Text>
        </View>
        
        <View style={styles.optionsContainer}>
          {questions[currentQuestionIndex].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && index === questions[currentQuestionIndex].correctAnswer && styles.correctOption,
                selectedAnswer === index && index !== questions[currentQuestionIndex].correctAnswer && styles.wrongOption,
                selectedAnswer !== null && index === questions[currentQuestionIndex].correctAnswer && styles.correctOption,
              ]}
              onPress={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
            >
              <Text style={[
                styles.optionText,
                (selectedAnswer === index && index === questions[currentQuestionIndex].correctAnswer) || 
                (selectedAnswer !== null && index === questions[currentQuestionIndex].correctAnswer) ? styles.correctOptionText : null,
                selectedAnswer === index && index !== questions[currentQuestionIndex].correctAnswer ? styles.wrongOptionText : null,
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
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
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  questionContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
  },
  questionNumber: {
    fontSize: 16,
    color: Theme.colors.secondary,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: 20,
    color: '#000',
    lineHeight: 28,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#000',
  },
  correctOption: {
    backgroundColor: '#e6f7e6',
    borderColor: '#28a745',
  },
  wrongOption: {
    backgroundColor: '#fdebeb',
    borderColor: '#dc3545',
  },
  correctOptionText: {
    color: '#28a745',
    fontWeight: 'bold',
  },
  wrongOptionText: {
    color: '#dc3545',
    fontWeight: 'bold',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  resultTitle: {
    fontSize: 22,
    marginBottom: 20,
    color: Theme.colors.secondary,
  },
  resultScore: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Theme.colors.primary,
    marginBottom: 10,
  },
  resultPercentage: {
    fontSize: 24,
    color: Theme.colors.primary,
    marginBottom: 40,
  },
  restartButton: {
    marginBottom: 15,
    backgroundColor: Theme.colors.primary,
  },
  homeButton: {
    backgroundColor: Theme.colors.secondary,
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

export default QuizScreen;