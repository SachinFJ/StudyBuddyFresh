import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import store from './src/store';
import HomeScreen from './src/screens/HomeScreen';
import QuizScreen from './src/screens/QuizScreen';
import OnelinerScreen from './src/screens/OnelinerScreen';
import MiscQuestionsScreen from './src/screens/MiscQuestionsScreen';
import ProgressScreen from './src/screens/ProgressScreen';
import SuggestBookScreen from './src/screens/SuggestBookScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Quiz" component={QuizScreen} />
          <Stack.Screen name="Oneliner" component={OnelinerScreen} />
          <Stack.Screen name="MiscQuestions" component={MiscQuestionsScreen} />
          <Stack.Screen name="Progress" component={ProgressScreen} />
          <Stack.Screen name="SuggestBook" component={SuggestBookScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;