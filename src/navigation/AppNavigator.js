import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

// मौजूदा स्क्रीन्स
import HomeScreen from '../screens/HomeScreen';
import QuizScreen from '../screens/QuizScreen';
import OnelinerScreen from '../screens/OnelinerScreen';

// MiscQuestionsScreen अनकमेंट कर दिया है
import MiscQuestionsScreen from '../screens/MiscQuestionsScreen';

// अभी तक नहीं बनी स्क्रीन्स - बाद में अनकमेंट करें
// import SuggestBookScreen from '../screens/SuggestBookScreen';
// import ProgressScreen from '../screens/ProgressScreen';
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
  
  // अभी के लिए हार्डकोडेड कलर्स का उपयोग
  const COLORS = {
    PRIMARY: '#FE7743',
    BACKGROUND: '#EFEEEA',
    SECONDARY: '#273F4F',
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
        
        {/* MiscQuestionsScreen अनकमेंट कर दिया है */}
        <Stack.Screen name="MiscQuestions" component={MiscQuestionsScreen} />
        
        {/* अभी तक नहीं बनी स्क्रीन्स - बाद में अनकमेंट करें */}
        {/* <Stack.Screen name="SuggestBook" component={SuggestBookScreen} /> */}
        
        {/* अतिरिक्त स्क्रीन्स - बाद में अनकमेंट करें */}
        {/* <Stack.Screen name="Progress" component={ProgressScreen} /> */}
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