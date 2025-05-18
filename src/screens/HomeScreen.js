import React, { useState, useEffect } from 'react';
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
} from 'react-native';

/**
 * HomeScreen - StudyBuddy ऐप का मुख्य स्क्रीन
 * @param {Object} navigation - नेविगेशन प्रॉप जो स्क्रीन्स के बीच नेविगेट करने के लिए होता है
 */
const HomeScreen = ({ navigation }) => {
  // डेमो स्टेट
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [currentLanguage, setCurrentLanguage] = useState('hindi'); // 'hindi' or 'english'
  const [fadeAnim] = useState(new Animated.Value(0)); // एनिमेशन वैल्यू
  
  // एनिमेशन प्रभाव - स्क्रीन पर लोड होने पर
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true
    }).start();
  }, []);
  
  // डेमो डेटा - बाद में API या Redux से आएगा
  const bookList = [
    { id: 'book1', name: 'सामान्य ज्ञान', color: '#FE7743', icon: '🧠' },
    { id: 'book2', name: 'भारतीय इतिहास', color: '#3498DB', icon: '🏛️' },
    { id: 'book3', name: 'भूगोल', color: '#5B8C5A', icon: '🌍' },
    { id: 'book4', name: 'विज्ञान', color: '#9B59B6', icon: '🔬' },
  ];
  
  const topicList = [
    { id: 'topic1', name: 'इतिहास', icon: '📜' },
    { id: 'topic2', name: 'भूगोल', icon: '🌍' },
    { id: 'topic3', name: 'राजनीति', icon: '⚖️' },
    { id: 'topic4', name: 'विज्ञान', icon: '🔬' },
    { id: 'topic5', name: 'सामान्य ज्ञान', icon: '💡' },
  ];
  
  // भाषा टॉगल हैंडलर
  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'hindi' ? 'english' : 'hindi');
  };

  // पुस्तक चयन हैंडलर
  const handleSelectBook = (book) => {
    setSelectedBook(book);
    setSelectedTopic(null);
  };
  
  // टॉपिक चयन हैंडलर
  const handleSelectTopic = (topic) => {
    setSelectedTopic(topic);
  };
  
  // नेविगेशन हैंडलर्स
  const navigateToQuiz = () => {
    // डीबग टेस्ट के लिए - कंसोल लॉग
    console.log("Quiz screen पर नेविगेट कर रहे हैं...");
    console.log("Selected Book:", selectedBook?.id);
    console.log("Selected Topic:", selectedTopic?.id);
    
    if (selectedBook && selectedTopic) {
      // पैरामीटर्स को स्पष्ट रूप से पास करें
      navigation.navigate('Quiz', {
        bookId: selectedBook.id,
        topicId: selectedTopic.id,
      });
    } else {
      // अगर बुक या टॉपिक नहीं चुने गए हैं तो अलर्ट दिखाए
      alert('कृपया पहले पुस्तक और विषय चुनें');
    }
  };
  
  const navigateToOneliner = () => {
    if (selectedBook && selectedTopic) {
      navigation.navigate('Oneliner', {
        bookId: selectedBook.id,
        topicId: selectedTopic.id,
      });
    } else {
      // अगर बुक या टॉपिक नहीं चुने गए हैं तो अलर्ट दिखाए
      alert('कृपया पहले पुस्तक और विषय चुनें');
    }
  };
  
  const navigateToMiscQuestions = () => {
    navigation.navigate('MiscQuestions');
  };
  
  const navigateToSuggestBook = () => {
    navigation.navigate('SuggestBook');
  };
  
  // पुस्तक कार्ड रेंडर
  const renderBookItem = ({ item, index }) => {
    // कार्ड एनिमेशन लगाने के लिए थोड़ी देरी
    const delay = index * 100;
    
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
          <Text style={styles.bookCardText}>{item.name}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FE7743" barStyle="light-content" />
      
      {/* हेडर - साधारण व्यू के साथ */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>StudyBuddy</Text>
        <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
          <Text style={styles.langButtonText}>
            {currentLanguage === 'hindi' ? 'EN' : 'हिं'}
          </Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* स्वागत संदेश */}
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
        
        {/* पुस्तक चुनें */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {currentLanguage === 'hindi' ? 'पुस्तक चुनें' : 'Select Book'}
          </Text>
          
          <FlatList
            data={bookList}
            renderItem={renderBookItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bookList}
          />
        </View>
        
        {/* टॉपिक चुनें - केवल तभी दिखाएं जब पुस्तक चुनी गई हो */}
        {selectedBook && (
          <Animated.View 
            style={[
              styles.section,
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
              {currentLanguage === 'hindi' ? 'विषय चुनें' : 'Select Topic'}
            </Text>
            
            <View style={styles.topicList}>
              {topicList.map((topic, index) => (
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
                    {topic.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        )}
        
        {/* अध्ययन मोड */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {currentLanguage === 'hindi' ? 'अध्ययन मोड' : 'Study Mode'}
          </Text>
          
          {/* क्विज़ मोड */}
          <TouchableOpacity
            style={[
              styles.modeCard,
              styles.quizCard,
              (!selectedBook || !selectedTopic) && styles.disabledCard
            ]}
            onPress={navigateToQuiz}
            disabled={!selectedBook || !selectedTopic}
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
            </View>
            <Text style={styles.modeCardArrow}>→</Text>
          </TouchableOpacity>
          
          {/* वनलाइनर मोड */}
          <TouchableOpacity
            style={[
              styles.modeCard,
              styles.onelinerCard,
              (!selectedBook || !selectedTopic) && styles.disabledCard
            ]}
            onPress={navigateToOneliner}
            disabled={!selectedBook || !selectedTopic}
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
            </View>
            <Text style={styles.modeCardArrow}>→</Text>
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
            </View>
            <Text style={styles.modeCardArrow}>→</Text>
          </TouchableOpacity>
        </View>
        
        {/* प्रगति - अधिक आकर्षक डिज़ाइन के साथ */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {currentLanguage === 'hindi' ? 'आपकी प्रगति' : 'Your Progress'}
          </Text>
          
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
                  {currentLanguage === 'hindi' ? 'विषय कवर किए' : 'Topics Covered'}
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
        
        {/* नई पुस्तक सुझाव - अब नेविगेशन के साथ */}
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
    backgroundColor: '#EFEEEA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FE7743',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  langButton: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  langButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  welcome: {
    padding: 20,
    paddingTop: 25,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#273F4F',
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: '#666666',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#273F4F',
    marginBottom: 15,
    paddingHorizontal: 20,
  },
  bookList: {
    paddingLeft: 20,
    paddingRight: 10,
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
  topicList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
  },
  topicButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 25,
    marginHorizontal: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  selectedTopicButton: {
    backgroundColor: '#FE7743',
    elevation: 4,
  },
  topicIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  topicText: {
    color: '#273F4F',
    fontSize: 15,
    fontWeight: '500',
  },
  selectedTopicText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
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
  },
  quizCard: {
    borderLeftColor: '#FE7743',
  },
  onelinerCard: {
    borderLeftColor: '#273F4F',
  },
  miscCard: {
    borderLeftColor: '#5B8C5A',
  },
  disabledCard: {
    opacity: 0.5,
  },
  modeCardIcon: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(254, 119, 67, 0.1)',
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
    color: '#273F4F',
    marginBottom: 4,
  },
  modeCardDesc: {
    fontSize: 13,
    color: '#666666',
  },
  modeCardArrow: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FE7743',
  },
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
    color: '#273F4F',
  },
  progressPercent: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FE7743',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FE7743',
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
    backgroundColor: 'rgba(254, 119, 67, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#273F4F',
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  suggestContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  suggestButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#273F4F',
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
    color: '#273F4F',
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
});

export default HomeScreen;