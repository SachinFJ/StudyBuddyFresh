import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

// मौजूदा स्क्रीन्स
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import OnelinerScreen from '../screens/OnelinerScreen';
import MiscQuestionsScreen from '../screens/MiscQuestionsScreen';
import SuggestBookScreen from '../screens/SuggestBookScreen';
import ProgressScreen from '../screens/ProgressScreen'; // प्रगति स्क्रीन जोड़ी

// अभी तक नहीं बनी स्क्रीन्स - बाद में अनकमेंट करें
// import NotificationsScreen from '../screens/NotificationsScreen';
// import SettingsScreen from '../screens/SettingsScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import BookmarkScreen from '../screens/BookmarkScreen';
// import StatisticsScreen from '../screens/StatisticsScreen';
// import AboutScreen from '../screens/AboutScreen';

const Stack = createStackNavigator();

/**
 * AppNavigator - ऐप नेविगेशन कॉन्फिगरेशन
 * सभी स्क्रीन्स के बीच नेविगेशन सेटअप करता है
 */
const AppNavigator = () => {
  // रेडक्स से थीम कलर प्राप्त कर सकते हैं
  // const { COLORS } = useSelector(state => state.theme);
  
  // अब नई कलर पैलेट उपयोग कर रहे हैं
  const COLORS = {
    PRIMARY: '#003049',
    SECONDARY: '#C1121F',
    BACKGROUND: '#FDF0D5',
    ACCENT1: '#669BBC',
    ACCENT2: '#780000',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: COLORS.BACKGROUND },
          // स्क्रीन ट्रांजिशन एनिमेशन
          transitionSpec: {
            open: {
              animation: 'timing',
              config: { duration: 300 },
            },
            close: {
              animation: 'timing', 
              config: { duration: 300 },
            },
          },
          // कार्ड स्टाइल्स
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
        }}
      >
        {/* मुख्य स्क्रीन्स */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Oneliner" component={OnelinerScreen} />
        <Stack.Screen name="MiscQuestions" component={MiscQuestionsScreen} />
        <Stack.Screen name="SuggestBook" component={SuggestBookScreen} />
        <Stack.Screen name="Progress" component={ProgressScreen} />
        
        {/* अतिरिक्त स्क्रीन्स - बाद में अनकमेंट करें */}
        {/* <Stack.Screen name="Notifications" component={NotificationsScreen} /> */}
        {/* <Stack.Screen name="Settings" component={SettingsScreen} /> */}
        {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        {/* <Stack.Screen name="Bookmarks" component={BookmarkScreen} /> */}
        {/* <Stack.Screen name="Statistics" component={StatisticsScreen} /> */}
        {/* <Stack.Screen name="About" component={AboutScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;