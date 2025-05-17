import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Animated,
  Dimensions,
  Share,
  Alert,
  BackHandler,
  PanResponder,
} from 'react-native';

// स्क्रीन विंडो आयाम प्राप्त करें
const { width, height } = Dimensions.get('window');

/**
 * OnelinerScreen - वनलाइनर (एक-पंक्ति सार) स्क्रीन
 * @param {Object} route - नेविगेशन रूट जिसमें bookId, topicId होगा
 * @param {Object} navigation - नेविगेशन कंट्रोलर
 */
const OnelinerScreen = ({ route, navigation }) => {
  // रूट पैरामीटर्स से डेटा प्राप्त करें
  const { bookId, topicId } = route?.params || { bookId: 'book1', topicId: 'topic1' };

  // स्टेट
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [viewedItems, setViewedItems] = useState([]);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [readingMode, setReadingMode] = useState(false);
  
  // एनिमेशन वैल्यूज़
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateXAnim = useRef(new Animated.Value(0)).current;
  
  // टाइमर रेफरेंस
  const timerRef = useRef(null);
  
  // पुस्तक और टॉपिक जानकारी
  const bookInfo = {
    book1: { name: 'सामान्य ज्ञान', color: '#FE7743' },
    book2: { name: 'भारतीय इतिहास', color: '#3498DB' },
    book3: { name: 'भूगोल', color: '#5B8C5A' },
    book4: { name: 'विज्ञान', color: '#9B59B6' },
  };
  
  const topicInfo = {
    topic1: { name: 'इतिहास', icon: '📜' },
    topic2: { name: 'भूगोल', icon: '🌍' },
    topic3: { name: 'राजनीति', icon: '⚖️' },
    topic4: { name: 'विज्ञान', icon: '🔬' },
    topic5: { name: 'सामान्य ज्ञान', icon: '💡' },
  };
  
  // श्रेणियां
  const categories = [
    { id: 'all', name: 'सभी' },
    { id: 'important', name: 'महत्वपूर्ण' },
    { id: 'definition', name: 'परिभाषा' },
    { id: 'fact', name: 'तथ्य' },
    { id: 'date', name: 'तिथि' },
  ];
  
  // डेमो वनलाइनर डेटा
  const oneliners = [
    {
      id: 'ol1',
      text: 'भारत का क्षेत्रफल 32,87,263 वर्ग किलोमीटर है, जो विश्व का 2.4% है।',
      category: 'fact',
      important: true,
    },
    {
      id: 'ol2',
      text: 'हिमालय पर्वत श्रृंखला विश्व की सबसे युवा वलित पर्वत श्रृंखला है।',
      category: 'fact',
      important: false,
    },
    {
      id: 'ol3',
      text: 'भूगोल: भूपृष्ठ और प्राकृतिक पर्यावरण का वैज्ञानिक अध्ययन।',
      category: 'definition',
      important: true,
    },
    {
      id: 'ol4',
      text: 'भारत की सबसे लंबी नदी गंगा है, जिसकी कुल लंबाई 2,525 किलोमीटर है।',
      category: 'fact',
      important: true,
    },
    {
      id: 'ol5',
      text: 'भारत में 28 राज्य और 8 केंद्र शासित प्रदेश हैं।',
      category: 'fact',
      important: true,
    },
    {
      id: 'ol6',
      text: '15 अगस्त 1947 को भारत को स्वतंत्रता प्राप्त हुई थी।',
      category: 'date',
      important: true,
    },
    {
      id: 'ol7',
      text: 'ज्वार-भाटा चंद्रमा के गुरुत्वाकर्षण खिंचाव के कारण होता है।',
      category: 'fact',
      important: false,
    },
    {
      id: 'ol8',
      text: 'स्थानान्तरण कृषि: वह कृषि पद्धति जिसमें जंगल के एक भाग को काटकर खेती की जाती है।',
      category: 'definition',
      important: false,
    },
    {
      id: 'ol9',
      text: 'भारत का सबसे बड़ा राज्य क्षेत्रफल की दृष्टि से राजस्थान है।',
      category: 'fact',
      important: true,
    },
    {
      id: 'ol10',
      text: 'वायुमंडल: पृथ्वी के चारों ओर मौजूद गैसों का आवरण।',
      category: 'definition',
      important: true,
    },
  ];
  
  // फिल्टर किए गए वनलाइनर्स
  const filteredOneliners = selectedCategory === 'all' 
    ? oneliners 
    : oneliners.filter(item => item.category === selectedCategory);
  
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
  
  // बैक बटन हैंडलर
  useEffect(() => {
    const backAction = () => {
      // प्रगति और समय ट्रैक करें...
      
      // वापस होम स्क्रीन पर जाएँ
      navigation.goBack();
      return true;
    };
    
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
    return () => backHandler.remove();
  }, [navigation, viewedItems, timeElapsed]);
  
  // वनलाइनर के view को ट्रैक करें
  useEffect(() => {
    if (filteredOneliners.length > 0 && !viewedItems.includes(filteredOneliners[currentIndex].id)) {
      setViewedItems([...viewedItems, filteredOneliners[currentIndex].id]);
    }
  }, [currentIndex, filteredOneliners, viewedItems]);
  
  // टाइमर को फॉर्मेट करें (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // टच जेस्चर (स्वाइप) की सेटिंग
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        // स्वाइप के दौरान कार्ड को हिलाएं
        translateXAnim.setValue(gestureState.dx);
      },
      onPanResponderRelease: (evt, gestureState) => {
        // अगर स्वाइप पर्याप्त दूरी तक है
        if (gestureState.dx < -50 && currentIndex < filteredOneliners.length - 1) {
          // बाएँ स्वाइप (अगला)
          goToNext();
        } else if (gestureState.dx > 50 && currentIndex > 0) {
          // दाएँ स्वाइप (पिछला)
          goToPrevious();
        } else {
          // स्वाइप पर्याप्त नहीं, कार्ड को वापस लाएं
          Animated.spring(translateXAnim, {
            toValue: 0,
            friction: 5,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;
  
  // अगले वनलाइनर पर जाएँ
  const goToNext = () => {
    if (currentIndex < filteredOneliners.length - 1) {
      // फेड आउट
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(currentIndex + 1);
        translateXAnim.setValue(0);
        
        // फेड इन
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    }
  };
  
  // पिछले वनलाइनर पर जाएँ
  const goToPrevious = () => {
    if (currentIndex > 0) {
      // फेड आउट
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex(currentIndex - 1);
        translateXAnim.setValue(0);
        
        // फेड इन
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }).start();
      });
    }
  };
  
  // बुकमार्क टॉगल
  const toggleBookmark = (id) => {
    if (bookmarkedItems.includes(id)) {
      setBookmarkedItems(bookmarkedItems.filter(item => item !== id));
    } else {
      setBookmarkedItems([...bookmarkedItems, id]);
    }
  };
  
  // वनलाइनर शेयर करें
  const shareOneliner = (text) => {
    Share.share({
      message: text + '\n\nStudyBuddy ऐप से शेयर किया गया',
    })
      .then(result => console.log(result))
      .catch(error => console.log(error));
  };
  
  // पढ़ने का मोड टॉगल करें
  const toggleReadingMode = () => {
    setReadingMode(!readingMode);
  };
  
  // श्रेणी चुनें
  const selectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentIndex(0);
  };
  
  // प्रगति प्रतिशत की गणना
  const calculateProgress = () => {
    return filteredOneliners.length > 0 
      ? Math.round((viewedItems.filter(id => 
          filteredOneliners.some(item => item.id === id)).length / filteredOneliners.length) * 100)
      : 0;
  };
  
  return (
    <SafeAreaView style={[
      styles.container,
      readingMode && styles.darkContainer
    ]}>
      {/* हेडर */}
      <View style={[
        styles.header,
        readingMode && styles.darkHeader
      ]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
        
        <View style={styles.headerTitleContainer}>
          <Text style={styles.headerTitle}>वनलाइनर</Text>
          <Text style={styles.headerSubtitle}>
            {bookInfo[bookId]?.name} - {topicInfo[topicId]?.name}
          </Text>
        </View>
        
        <View style={styles.timerContainer}>
          <Text style={styles.timerText}>{formatTime(timeElapsed)}</Text>
        </View>
      </View>
      
      {/* प्रगति बार */}
      <View style={[
        styles.progressContainer,
        readingMode && styles.darkProgressContainer
      ]}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill,
              { width: `${calculateProgress()}%` }
            ]} 
          />
        </View>
        <Text style={[
          styles.progressText,
          readingMode && styles.darkText
        ]}>
          {currentIndex + 1} / {filteredOneliners.length}
        </Text>
      </View>
      
      {/* श्रेणी फिल्टर */}
      <View style={[
        styles.categoryContainer,
        readingMode && styles.darkCategoryContainer
      ]}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                selectedCategory === item.id && styles.selectedCategoryButton,
                readingMode && styles.darkCategoryButton,
                selectedCategory === item.id && readingMode && styles.darkSelectedCategoryButton,
              ]}
              onPress={() => selectCategory(item.id)}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === item.id && styles.selectedCategoryText,
                readingMode && styles.darkText,
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.categoryList}
        />
      </View>
      
      {/* मुख्य कंटेंट - वनलाइनर कार्ड */}
      {filteredOneliners.length > 0 ? (
        <View style={styles.cardContainer} {...panResponder.panHandlers}>
          <Animated.View 
            style={[
              styles.card,
              readingMode && styles.darkCard,
              {
                opacity: fadeAnim,
                transform: [{ translateX: translateXAnim }],
              }
            ]}
          >
            <View style={styles.cardInner}>
              <Text style={[
                styles.cardText,
                readingMode && styles.darkCardText
              ]}>
                {filteredOneliners[currentIndex].text}
              </Text>
              
              <View style={styles.cardCategoryBadge}>
                <Text style={styles.cardCategoryText}>
                  {categories.find(cat => cat.id === filteredOneliners[currentIndex].category)?.name || 'अन्य'}
                </Text>
              </View>
              
              {filteredOneliners[currentIndex].important && (
                <View style={styles.importantBadge}>
                  <Text style={styles.importantText}>महत्वपूर्ण</Text>
                </View>
              )}
            </View>
            
            <View style={styles.cardActionBar}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => goToPrevious()}
                disabled={currentIndex === 0}
              >
                <Text style={[
                  styles.actionButtonText,
                  currentIndex === 0 && styles.disabledButton,
                  readingMode && styles.darkActionText
                ]}>
                  ◀ पिछला
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => toggleBookmark(filteredOneliners[currentIndex].id)}
              >
                <Text style={[
                  styles.actionButtonText,
                  bookmarkedItems.includes(filteredOneliners[currentIndex].id) && styles.bookmarkedIcon,
                  readingMode && styles.darkActionText
                ]}>
                  {bookmarkedItems.includes(filteredOneliners[currentIndex].id) ? '★' : '☆'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => shareOneliner(filteredOneliners[currentIndex].text)}
              >
                <Text style={[
                  styles.actionButtonText,
                  readingMode && styles.darkActionText
                ]}>
                  ↗ शेयर
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => goToNext()}
                disabled={currentIndex === filteredOneliners.length - 1}
              >
                <Text style={[
                  styles.actionButtonText,
                  currentIndex === filteredOneliners.length - 1 && styles.disabledButton,
                  readingMode && styles.darkActionText
                ]}>
                  अगला ▶
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
          
          <View style={styles.gestureHint}>
            <Text style={[
              styles.gestureHintText,
              readingMode && styles.darkText
            ]}>
              ◀ बाएँ या दाएँ स्वाइप करें ▶
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={[
            styles.emptyText,
            readingMode && styles.darkText
          ]}>
            इस श्रेणी में कोई वनलाइनर नहीं है
          </Text>
        </View>
      )}
      
      {/* स्टेट्स और टूल्स */}
      <View style={[
        styles.statsContainer,
        readingMode && styles.darkStatsContainer
      ]}>
        <View style={styles.stats}>
          <Text style={[
            styles.statText,
            readingMode && styles.darkText
          ]}>
            देखे गए: {viewedItems.filter(id => 
              filteredOneliners.some(item => item.id === id)).length} / {filteredOneliners.length}
          </Text>
          <Text style={[
            styles.statText,
            readingMode && styles.darkText
          ]}>
            बुकमार्क: {bookmarkedItems.filter(id => 
              filteredOneliners.some(item => item.id === id)).length}
          </Text>
        </View>
        
        <TouchableOpacity
          style={[
            styles.readingModeButton,
            readingMode && styles.darkModeActive
          ]}
          onPress={toggleReadingMode}
        >
          <Text style={[
            styles.readingModeText,
            readingMode && styles.darkModeActiveText
          ]}>
            {readingMode ? '💡 सामान्य मोड' : '🌙 पढ़ने का मोड'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFEEEA',
  },
  darkContainer: {
    backgroundColor: '#1A1A1A',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#273F4F',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  darkHeader: {
    backgroundColor: '#000',
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
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  darkProgressContainer: {
    backgroundColor: '#333333',
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
    backgroundColor: '#273F4F',
    borderRadius: 3,
  },
  progressText: {
    color: '#273F4F',
    fontWeight: 'bold',
  },
  darkText: {
    color: '#FFFFFF',
  },
  categoryContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEEEA',
  },
  darkCategoryContainer: {
    backgroundColor: '#333333',
    borderBottomColor: '#444444',
  },
  categoryList: {
    paddingHorizontal: 12,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 20,
    marginHorizontal: 4,
  },
  darkCategoryButton: {
    backgroundColor: '#444444',
  },
  selectedCategoryButton: {
    backgroundColor: '#273F4F',
  },
  darkSelectedCategoryButton: {
    backgroundColor: '#555555',
  },
  categoryText: {
    color: '#273F4F',
    fontWeight: '500',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  darkCard: {
    backgroundColor: '#333333',
  },
  cardInner: {
    padding: 25,
    paddingBottom: 40,
    minHeight: 200,
    justifyContent: 'center',
  },
  cardText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#273F4F',
    textAlign: 'center',
  },
  darkCardText: {
    color: '#FFFFFF',
  },
  cardCategoryBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  cardCategoryText: {
    fontSize: 12,
    color: '#666666',
  },
  importantBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#FFD700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  importantText: {
    fontSize: 12,
    color: '#333333',
    fontWeight: 'bold',
  },
  cardActionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  actionButton: {
    padding: 8,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#273F4F',
    fontWeight: '500',
  },
  darkActionText: {
    color: '#CCCCCC',
  },
  disabledButton: {
    opacity: 0.3,
  },
  bookmarkedIcon: {
    color: '#FFD700',
    fontSize: 18,
  },
  gestureHint: {
    marginTop: 16,
    opacity: 0.5,
  },
  gestureHintText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFEEEA',
  },
  darkStatsContainer: {
    backgroundColor: '#333333',
    borderTopColor: '#444444',
  },
  stats: {
    flexDirection: 'column',
  },
  statText: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 2,
  },
  readingModeButton: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  darkModeActive: {
    backgroundColor: '#FFD700',
  },
  readingModeText: {
    fontSize: 12,
    color: '#273F4F',
  },
  darkModeActiveText: {
    color: '#333333',
    fontWeight: 'bold',
  },
});

export default OnelinerScreen;