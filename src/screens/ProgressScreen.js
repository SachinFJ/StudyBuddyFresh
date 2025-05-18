// ProgressScreen.js - प्रगति ट्रैकिंग स्क्रीन

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Animated,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// कंपोनेंट्स
import Header from '../components/common/Header';
import CustomCard from '../components/common/CustomCard';
import ProgressIndicator from '../components/common/ProgressIndicator';

/**
 * प्रगति स्क्रीन कंपोनेंट
 * उपयोगकर्ता की अध्ययन प्रगति का विश्लेषण
 */
const ProgressScreen = () => {
  const navigation = useNavigation();
  
  // एनिमेशन वैल्यू
  const [fadeAnim] = useState(new Animated.Value(0));
  
  // रेडक्स स्टेट से डेटा प्राप्त करें
  const { current: currentLanguage } = useSelector((state) => state.language);
  const quizActivity = useSelector((state) => state.progress.quizActivity);
  const onelinerActivity = useSelector((state) => state.progress.onelinerActivity);
  const miscActivity = useSelector((state) => state.progress.miscActivity);
  
  // समय अवधि स्टेट
  const [selectedPeriod, setSelectedPeriod] = useState('week'); // week, month, all
  
  // फिल्टर्ड डेटा स्टेट
  const [filteredQuizActivity, setFilteredQuizActivity] = useState([]);
  const [filteredOnelinerActivity, setFilteredOnelinerActivity] = useState([]);
  const [filteredMiscActivity, setFilteredMiscActivity] = useState([]);
  
  // प्रगति स्टेटिस्टिक्स स्टेट
  const [totalQuestionsAttempted, setTotalQuestionsAttempted] = useState(0);
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState(0);
  const [totalOnelinerViewed, setTotalOnelinerViewed] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [averageAccuracy, setAverageAccuracy] = useState(0);
  
  // स्क्रीन की चौड़ाई प्राप्त करें
  const screenWidth = Dimensions.get('window').width;
  
  // एनिमेशन शुरू करें
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);
  
  // चार्ट्स के लिए समय अवधि के आधार पर डेटा फिल्टर करें
  useEffect(() => {
    const filterByPeriod = (data) => {
      const currentDate = new Date();
      let filteredData = [];
      
      if (selectedPeriod === 'week') {
        // पिछले 7 दिनों का डेटा
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(currentDate.getDate() - 7);
        
        filteredData = data.filter(
          (item) => new Date(item.date) >= sevenDaysAgo
        );
      } else if (selectedPeriod === 'month') {
        // पिछले 30 दिनों का डेटा
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(currentDate.getDate() - 30);
        
        filteredData = data.filter(
          (item) => new Date(item.date) >= thirtyDaysAgo
        );
      } else {
        // सभी डेटा
        filteredData = [...data];
      }
      
      return filteredData;
    };
    
    // डेटा फिल्टर करें
    const filteredQuiz = filterByPeriod(quizActivity);
    const filteredOneliner = filterByPeriod(onelinerActivity);
    const filteredMisc = filterByPeriod(miscActivity);
    
    setFilteredQuizActivity(filteredQuiz);
    setFilteredOnelinerActivity(filteredOneliner);
    setFilteredMiscActivity(filteredMisc);
    
    // स्टेटिस्टिक्स की गणना करें
    calculateStatistics(filteredQuiz, filteredOneliner, filteredMisc);
  }, [selectedPeriod, quizActivity, onelinerActivity, miscActivity]);
  
  // स्टेटिस्टिक्स की गणना करें
  const calculateStatistics = (quizData, onelinerData, miscData) => {
    // कुल प्रश्न
    const quizQuestions = quizData.reduce(
      (total, item) => total + item.total,
      0
    );
    
    const miscQuestions = miscData.reduce(
      (total, item) => total + (item.questionsAttempted || 0),
      0
    );
    
    setTotalQuestionsAttempted(quizQuestions + miscQuestions);
    
    // कुल सही उत्तर
    const quizCorrect = quizData.reduce(
      (total, item) => total + item.score,
      0
    );
    
    const miscCorrect = miscData.reduce(
      (total, item) => total + (item.score || 0),
      0
    );
    
    setTotalCorrectAnswers(quizCorrect + miscCorrect);
    
    // सटीकता
    const totalAttempted = quizQuestions + miscQuestions;
    const accuracy =
      totalAttempted > 0
        ? ((quizCorrect + miscCorrect) / totalAttempted) * 100
        : 0;
    
    setAverageAccuracy(accuracy);
    
    // कुल वनलाइनर देखे
    const onelinerCount = onelinerData.reduce(
      (total, item) => total + (item.viewedCount || 0),
      0
    );
    
    setTotalOnelinerViewed(onelinerCount);
    
    // कुल समय
    const quizTime = quizData.reduce(
      (total, item) => total + (item.timeSpent || 0),
      0
    );
    
    const onelinerTime = onelinerData.reduce(
      (total, item) => total + (item.timeSpent || 0),
      0
    );
    
    const miscTime = miscData.reduce(
      (total, item) => total + (item.timeSpent || 0),
      0
    );
    
    setTotalTimeSpent(quizTime + onelinerTime + miscTime);
  };
  
  // क्विज़ प्रगति डेटा के लिए सारांश प्राप्त करें
  const getQuizProgressSummary = () => {
    if (filteredQuizActivity.length === 0) return null;
    
    // तारीखों के अनुसार डेटा ग्रुप करें
    const groupedData = filteredQuizActivity.reduce((acc, item) => {
      const date = new Date(item.date);
      const dateString = `${date.getDate()}/${date.getMonth() + 1}`;
      
      if (!acc[dateString]) {
        acc[dateString] = {
          total: 0,
          correct: 0,
        };
      }
      
      acc[dateString].total += item.total;
      acc[dateString].correct += item.score;
      
      return acc;
    }, {});
    
    // अंतिम 7 या 30 दिनों के लिए
    const dates = Object.keys(groupedData);
    
    return dates.map(date => ({
      date,
      total: groupedData[date].total,
      correct: groupedData[date].correct,
      accuracy: Math.round((groupedData[date].correct / groupedData[date].total) * 100) || 0
    }));
  };
  
  // अध्ययन समय के लिए सारांश प्राप्त करें
  const getStudyTimeSummary = () => {
    // तारीखों के अनुसार डेटा ग्रुप करें
    const groupedData = {};
    
    // क्विज़ अध्ययन समय
    filteredQuizActivity.forEach((item) => {
      const date = new Date(item.date);
      const dateString = `${date.getDate()}/${date.getMonth() + 1}`;
      
      if (!groupedData[dateString]) {
        groupedData[dateString] = {
          quiz: 0,
          oneliner: 0,
          misc: 0,
          total: 0
        };
      }
      
      groupedData[dateString].quiz += item.timeSpent || 0;
      groupedData[dateString].total += item.timeSpent || 0;
    });
    
    // वनलाइनर अध्ययन समय
    filteredOnelinerActivity.forEach((item) => {
      const date = new Date(item.date);
      const dateString = `${date.getDate()}/${date.getMonth() + 1}`;
      
      if (!groupedData[dateString]) {
        groupedData[dateString] = {
          quiz: 0,
          oneliner: 0,
          misc: 0,
          total: 0
        };
      }
      
      groupedData[dateString].oneliner += item.timeSpent || 0;
      groupedData[dateString].total += item.timeSpent || 0;
    });
    
    // मिश्रित अध्ययन समय
    filteredMiscActivity.forEach((item) => {
      const date = new Date(item.date);
      const dateString = `${date.getDate()}/${date.getMonth() + 1}`;
      
      if (!groupedData[dateString]) {
        groupedData[dateString] = {
          quiz: 0,
          oneliner: 0,
          misc: 0,
          total: 0
        };
      }
      
      groupedData[dateString].misc += item.timeSpent || 0;
      groupedData[dateString].total += item.timeSpent || 0;
    });
    
    // अंतिम 7 या 30 दिनों के लिए डेटा प्रोसेस करें
    const dates = Object.keys(groupedData);
    
    if (dates.length === 0) return null;
    
    return dates.map(date => ({
      date,
      quiz: Math.round(groupedData[date].quiz / 60),
      oneliner: Math.round(groupedData[date].oneliner / 60),
      misc: Math.round(groupedData[date].misc / 60),
      total: Math.round(groupedData[date].total / 60)
    }));
  };
  
  // टॉपिक वाइज स्कोर का सारांश प्राप्त करें
  const getTopicWiseSummary = () => {
    if (filteredQuizActivity.length === 0) return null;
    
    // टॉपिक के अनुसार डेटा ग्रुप करें
    const topicData = filteredQuizActivity.reduce((acc, item) => {
      const topicName = item.topicName || 'Other';
      
      if (!acc[topicName]) {
        acc[topicName] = {
          total: 0,
          correct: 0,
        };
      }
      
      acc[topicName].total += item.total;
      acc[topicName].correct += item.score;
      
      return acc;
    }, {});
    
    // टॉपिक्स को प्रोसेस करें
    const topics = Object.keys(topicData);
    
    return topics.map(topic => ({
      topic,
      total: topicData[topic].total,
      correct: topicData[topic].correct,
      accuracy: Math.round((topicData[topic].correct / topicData[topic].total) * 100) || 0
    }));
  };
  
  // समय को फॉर्मेट करें (HH:MM:SS)
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // समय अवधि सेलेक्टर कंपोनेंट
  const PeriodSelector = () => (
    <View style={styles.periodSelectorContainer}>
      <TouchableOpacity
        style={[
          styles.periodButton,
          selectedPeriod === 'week' && styles.selectedPeriodButton,
        ]}
        onPress={() => setSelectedPeriod('week')}
      >
        <Text
          style={[
            styles.periodButtonText,
            selectedPeriod === 'week' && styles.selectedPeriodButtonText,
          ]}
        >
          {currentLanguage === 'hindi' ? 'सप्ताह' : 'Week'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.periodButton,
          selectedPeriod === 'month' && styles.selectedPeriodButton,
        ]}
        onPress={() => setSelectedPeriod('month')}
      >
        <Text
          style={[
            styles.periodButtonText,
            selectedPeriod === 'month' && styles.selectedPeriodButtonText,
          ]}
        >
          {currentLanguage === 'hindi' ? 'महीना' : 'Month'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={[
          styles.periodButton,
          selectedPeriod === 'all' && styles.selectedPeriodButton,
        ]}
        onPress={() => setSelectedPeriod('all')}
      >
        <Text
          style={[
            styles.periodButtonText,
            selectedPeriod === 'all' && styles.selectedPeriodButtonText,
          ]}
        >
          {currentLanguage === 'hindi' ? 'सभी' : 'All'}
        </Text>
      </TouchableOpacity>
    </View>
  );
  
  // डेटा सारांश कंपोनेंट
  const DataSummaryTable = ({ data, title, headers }) => {
    if (!data || data.length === 0) {
      return (
        <View style={styles.noDataContainer}>
          <Ionicons
            name="bar-chart-outline"
            size={48}
            color="#669BBC"
          />
          
          <Text style={styles.noDataText}>
            {currentLanguage === 'hindi'
              ? 'अभी तक कोई डेटा नहीं'
              : 'No data yet'}
          </Text>
        </View>
      );
    }
    
    return (
      <View style={styles.tableSummaryContainer}>
        <Text style={styles.tableSummaryTitle}>{title}</Text>
        
        {/* हेडर रो */}
        <View style={styles.tableRow}>
          {headers.map((header, index) => (
            <Text key={index} style={styles.tableHeader}>
              {header}
            </Text>
          ))}
        </View>
        
        {/* डेटा रोज़ */}
        {data.slice(0, 5).map((item, rowIndex) => (
          <View key={rowIndex} style={[
            styles.tableRow, 
            rowIndex % 2 === 0 ? styles.evenRow : null
          ]}>
            {Object.values(item).map((value, cellIndex) => (
              <Text key={cellIndex} style={[
                styles.tableCell,
                cellIndex === 3 && item.accuracy >= 70 && styles.highAccuracyCell,
                cellIndex === 3 && item.accuracy < 70 && item.accuracy >= 40 && styles.mediumAccuracyCell,
                cellIndex === 3 && item.accuracy < 40 && styles.lowAccuracyCell,
              ]}>
                {value}
                {cellIndex === 3 ? '%' : ''}
              </Text>
            ))}
          </View>
        ))}
        
        {data.length > 5 && (
          <Text style={styles.moreDataText}>
            {currentLanguage === 'hindi'
              ? `और ${data.length - 5} दिन...`
              : `and ${data.length - 5} more days...`}
          </Text>
        )}
      </View>
    );
  };
  
  // चार्ट प्लेसहोल्डर कंपोनेंट 
  const ChartPlaceholder = ({ icon, message }) => (
    <View style={styles.chartPlaceholderContainer}>
      <Ionicons
        name={icon}
        size={48}
        color="#669BBC"
      />
      
      <Text style={styles.chartPlaceholderText}>
        {message || (currentLanguage === 'hindi'
          ? 'चार्ट यहां प्रदर्शित होगा'
          : 'Chart will be displayed here')}
      </Text>
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {currentLanguage === 'hindi' ? 'आपकी प्रगति' : 'Your Progress'}
        </Text>
        <View style={{ width: 40 }} />
      </View>
      
      <ScrollView style={styles.scrollView}>
        {/* समय अवधि सेलेक्टर */}
        <PeriodSelector />
        
        {/* प्रगति सारांश */}
        <Animated.View style={[styles.summaryContainer, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>
            {currentLanguage === 'hindi' ? 'आपका सारांश' : 'Your Summary'}
          </Text>
          
          <View style={styles.statsGridContainer}>
            <View style={styles.statsCard}>
              <Ionicons
                name="help-circle-outline"
                size={28}
                color="#C1121F"
                style={styles.statsIcon}
              />
              
              <Text style={styles.statsNumber}>{totalQuestionsAttempted}</Text>
              
              <Text style={styles.statsLabel}>
                {currentLanguage === 'hindi'
                  ? 'कुल प्रश्न'
                  : 'Total Questions'}
              </Text>
            </View>
            
            <View style={styles.statsCard}>
              <Ionicons
                name="checkmark-circle-outline"
                size={28}
                color="#669BBC"
                style={styles.statsIcon}
              />
              
              <Text style={styles.statsNumber}>{totalCorrectAnswers}</Text>
              
              <Text style={styles.statsLabel}>
                {currentLanguage === 'hindi'
                  ? 'सही उत्तर'
                  : 'Correct Answers'}
              </Text>
            </View>
            
            <View style={styles.statsCard}>
              <Ionicons
                name="document-text-outline"
                size={28}
                color="#780000"
                style={styles.statsIcon}
              />
              
              <Text style={styles.statsNumber}>{totalOnelinerViewed}</Text>
              
              <Text style={styles.statsLabel}>
                {currentLanguage === 'hindi'
                  ? 'वनलाइनर देखे'
                  : 'Oneliners Viewed'}
              </Text>
            </View>
            
            <View style={styles.statsCard}>
              <Ionicons
                name="time-outline"
                size={28}
                color="#003049"
                style={styles.statsIcon}
              />
              
              <Text style={styles.statsNumber}>
                {Math.round(totalTimeSpent / 60)}
              </Text>
              
              <Text style={styles.statsLabel}>
                {currentLanguage === 'hindi' ? 'कुल मिनट' : 'Total Minutes'}
              </Text>
            </View>
          </View>
          
          {/* सटीकता प्रगति */}
          <View style={styles.accuracyContainer}>
            <Text style={styles.accuracyLabel}>
              {currentLanguage === 'hindi' ? 'सटीकता' : 'Accuracy'}
            </Text>
            
            <View style={styles.accuracyBox}>
              <Text style={styles.accuracyPercentage}>{Math.round(averageAccuracy)}%</Text>
              <View style={styles.progressBarContainer}>
                <ProgressIndicator
                  current={Math.round(averageAccuracy)}
                  total={100}
                  showPercentage={false}
                  progressColor={
                    averageAccuracy >= 70
                      ? "#669BBC"
                      : averageAccuracy >= 40
                      ? "#FE7743"
                      : "#C1121F"
                  }
                  styles={{
                    container: styles.progressBarContainer,
                    progress: styles.progressBar
                  }}
                />
              </View>
              <Text style={styles.accuracyText}>
                {averageAccuracy >= 70
                  ? currentLanguage === 'hindi' ? 'उत्कृष्ट प्रदर्शन!' : 'Excellent!'
                  : averageAccuracy >= 40
                  ? currentLanguage === 'hindi' ? 'अच्छी प्रगति!' : 'Good progress!'
                  : currentLanguage === 'hindi' ? 'और अभ्यास करें' : 'Keep practicing!'}
              </Text>
            </View>
          </View>
        </Animated.View>
        
        {/* प्रगति चार्ट्स */}
        <Animated.View 
          style={[
            styles.chartsContainer, 
            { 
              opacity: fadeAnim,
              transform: [{
                translateY: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0]
                })
              }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>
            {currentLanguage === 'hindi' ? 'प्रगति विश्लेषण' : 'Progress Analysis'}
          </Text>
          
          {/* क्विज़ प्रगति */}
          <View style={styles.chartCard}>
            <Text style={styles.chartCardTitle}>
              {currentLanguage === 'hindi' ? 'क्विज़ प्रगति' : 'Quiz Progress'}
            </Text>
            
            {filteredQuizActivity.length > 0 ? (
              <DataSummaryTable 
                data={getQuizProgressSummary()}
                title={currentLanguage === 'hindi' ? 'दिनानुसार प्रगति' : 'Progress by Date'}
                headers={[
                  currentLanguage === 'hindi' ? 'दिन' : 'Date',
                  currentLanguage === 'hindi' ? 'कुल' : 'Total',
                  currentLanguage === 'hindi' ? 'सही' : 'Correct',
                  currentLanguage === 'hindi' ? 'सटीकता' : 'Accuracy'
                ]}
              />
            ) : (
              <ChartPlaceholder 
                icon="bar-chart-outline" 
                message={currentLanguage === 'hindi' ? 'अभी तक कोई डेटा नहीं' : 'No data yet'}
              />
            )}
          </View>
          
          {/* अध्ययन समय */}
          <View style={styles.chartCard}>
            <Text style={styles.chartCardTitle}>
              {currentLanguage === 'hindi' ? 'अध्ययन समय (मिनट)' : 'Study Time (minutes)'}
            </Text>
            
            {totalTimeSpent > 0 ? (
              <DataSummaryTable 
                data={getStudyTimeSummary()}
                title={currentLanguage === 'hindi' ? 'दिनानुसार अध्ययन समय' : 'Study Time by Date'}
                headers={[
                  currentLanguage === 'hindi' ? 'दिन' : 'Date',
                  currentLanguage === 'hindi' ? 'क्विज़' : 'Quiz',
                  currentLanguage === 'hindi' ? 'वनलाइनर' : 'Oneliner',
                  currentLanguage === 'hindi' ? 'मिश्रित' : 'Mixed',
                  currentLanguage === 'hindi' ? 'कुल' : 'Total'
                ]}
              />
            ) : (
              <ChartPlaceholder 
                icon="time-outline" 
                message={currentLanguage === 'hindi' ? 'अभी तक कोई डेटा नहीं' : 'No data yet'}
              />
            )}
          </View>
          
          {/* टॉपिक वाइज स्कोर */}
          <View style={styles.chartCard}>
            <Text style={styles.chartCardTitle}>
              {currentLanguage === 'hindi' ? 'टॉपिक वाइज सटीकता' : 'Topic-wise Accuracy'}
            </Text>
            
            {filteredQuizActivity.length > 0 ? (
              <DataSummaryTable 
                data={getTopicWiseSummary()}
                title={currentLanguage === 'hindi' ? 'टॉपिक द्वारा सटीकता' : 'Accuracy by Topic'}
                headers={[
                  currentLanguage === 'hindi' ? 'टॉपिक' : 'Topic',
                  currentLanguage === 'hindi' ? 'कुल' : 'Total',
                  currentLanguage === 'hindi' ? 'सही' : 'Correct',
                  currentLanguage === 'hindi' ? 'सटीकता' : 'Accuracy'
                ]}
              />
            ) : (
              <ChartPlaceholder 
                icon="pie-chart-outline" 
                message={currentLanguage === 'hindi' ? 'अभी तक कोई डेटा नहीं' : 'No data yet'}
              />
            )}
          </View>
        </Animated.View>
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
    paddingHorizontal: 16,
    paddingVertical: 15,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  periodSelectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  periodButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 8,
    backgroundColor: '#F0F0F0',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  selectedPeriodButton: {
    backgroundColor: '#003049',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  periodButtonText: {
    fontSize: 15,
    color: '#003049',
    fontWeight: '500',
  },
  selectedPeriodButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  summaryContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  statsGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statsCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  statsIcon: {
    marginBottom: 8,
  },
  statsNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 5,
  },
  statsLabel: {
    fontSize: 13,
    color: '#666666',
    textAlign: 'center',
  },
  accuracyContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  accuracyLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 12,
  },
  accuracyBox: {
    alignItems: 'center',
  },
  accuracyPercentage: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#C1121F',
    marginBottom: 10,
  },
  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginBottom: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 5,
  },
  accuracyText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#003049',
  },
  chartsContainer: {
    padding: 15,
    paddingTop: 0,
  },
  chartCard: {
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  chartCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 10,
  },
  chartPlaceholderContainer: {
    height: 180,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  chartPlaceholderText: {
    marginTop: 15,
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
  },
  noDataContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  noDataText: {
    fontSize: 15,
    color: '#666666',
    marginTop: 15,
    textAlign: 'center',
  },
  // टेबल स्टाइल्स
  tableSummaryContainer: {
    padding: 10,
  },
  tableSummaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#003049',
    marginBottom: 12,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  evenRow: {
    backgroundColor: '#F8F8F8',
  },
  tableHeader: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#003049',
    textAlign: 'center',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#333333',
    textAlign: 'center',
  },
  highAccuracyCell: {
    color: '#669BBC',
    fontWeight: 'bold',
  },
  mediumAccuracyCell: {
    color: '#FE7743',
    fontWeight: 'bold',
  },
  lowAccuracyCell: {
    color: '#C1121F',
    fontWeight: 'bold',
  },
  moreDataText: {
    fontSize: 13,
    color: '#666666',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ProgressScreen;