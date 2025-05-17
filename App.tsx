import React from 'react';
import { StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import store from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import Theme from './src/utils/Theme';

/**
 * App - मुख्य एंट्री पॉइंट
 * रेडक्स स्टोर प्रोवाइडर और नेविगेशन सेटअप करता है
 */
const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar 
          barStyle="dark-content" 
          backgroundColor={Theme.COLORS.BACKGROUND} 
        />
        <AppNavigator />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;