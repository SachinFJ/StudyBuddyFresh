import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  FlatList,
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
  
  // डेमो डेटा - बाद में API या Redux से आएगा
  const bookList = [
    { id: 'book1', name: 'सामान्य ज्ञान', color: '#FE7743' },
    { id: 'book2', name: 'भारतीय इतिहास', color: '#3498DB' },
    { id: 'book3', name: 'भूगोल', color: '#5B8C5A' },
    { id: 'book4', name: 'विज्ञान', color: '#9B59B6' },
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
    alert('मिश्रित प्रश्न स्क्रीन पर जा रहे हैं');
    navigation.navigate('MiscQuestions');
  };
  
  // पुस्तक कार्ड रेंडर
  const renderBookItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.bookCard,
        { backgroundColor: item.color },
        selectedBook?.id === item.id && styles.selectedBookCard
      ]}
      onPress={() => handleSelectBook(item)}
      activeOpacity={0.8}
    >
      <Text style={styles.bookCardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FE7743" barStyle="light-content" />
      
      {/* हेडर */}
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
        <View style={styles.welcome}>
          <Text style={styles.welcomeTitle}>
            {currentLanguage === 'hindi' ? 'नमस्ते!' : 'Hello!'}
          </Text>
          <Text style={styles.welcomeText}>
            {currentLanguage === 'hindi' 
              ? 'आज आप क्या सीखना चाहते हैं?' 
              : 'What would you like to learn today?'}
          </Text>
        </View>
        
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
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              {currentLanguage === 'hindi' ? 'विषय चुनें' : 'Select Topic'}
            </Text>
            
            <View style={styles.topicList}>
              {topicList.map(topic => (
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
          </View>
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
        
        {/* प्रगति */}
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
                <Text style={styles.statNumber}>98</Text>
                <Text style={styles.statLabel}>
                  {currentLanguage === 'hindi' ? 'प्रश्न हल किए' : 'Questions Solved'}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>8</Text>
                <Text style={styles.statLabel}>
                  {currentLanguage === 'hindi' ? 'विषय कवर किए' : 'Topics Covered'}
                </Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>7.2</Text>
                <Text style={styles.statLabel}>
                  {currentLanguage === 'hindi' ? 'औसत स्कोर' : 'Avg. Score'}
                </Text>
              </View>
            </View>
          </View>
        </View>
        
        {/* नई पुस्तक सुझाव */}
        <View style={styles.suggestContainer}>
          <TouchableOpacity style={styles.suggestButton}>
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
    flex: 1,
  },
  welcome: {
    padding: 20,
    paddingTop: 25,
  },
  welcomeTitle: {
    fontSize: 26,
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
    fontSize: 18,
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
    width: 150,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
    padding: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedBookCard: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  bookCardText: {
    color: '#FFFFFF',
    fontSize: 16,
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedTopicButton: {
    backgroundColor: '#FE7743',
  },
  topicIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  topicText: {
    color: '#273F4F',
    fontSize: 14,
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
    borderRadius: 12,
    padding: 15,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(254, 119, 67, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  modeCardIconText: {
    fontSize: 20,
  },
  modeCardContent: {
    flex: 1,
  },
  modeCardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#273F4F',
    marginBottom: 4,
  },
  modeCardDesc: {
    fontSize: 12,
    color: '#666666',
  },
  modeCardArrow: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FE7743',
  },
  progressCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#273F4F',
  },
  progressPercent: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FE7743',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
    marginBottom: 15,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FE7743',
    borderRadius: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#273F4F',
    marginBottom: 4,
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
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#273F4F',
    borderStyle: 'dashed',
  },
  suggestIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  suggestText: {
    color: '#273F4F',
    fontWeight: '500',
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