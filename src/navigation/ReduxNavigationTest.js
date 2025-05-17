import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import simpleStore, { increment, decrement } from '../store/simpleStore';

// रेडक्स के साथ होम स्क्रीन
const HomeScreen = ({ navigation }) => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>होम स्क्रीन</Text>
      <Text style={styles.counter}>काउंटर: {count}</Text>
      <View style={styles.buttonContainer}>
        <Button 
          title="बढ़ाएं" 
          onPress={() => dispatch(increment())}
          color="#FE7743"
        />
        <View style={styles.buttonSpacer} />
        <Button 
          title="घटाएं" 
          onPress={() => dispatch(decrement())}
          color="#273F4F"
        />
      </View>
      <Button 
        title="दूसरी स्क्रीन पर जाएं" 
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

// रेडक्स के साथ डिटेल्स स्क्रीन
const DetailsScreen = ({ navigation }) => {
  const count = useSelector((state) => state.counter.value);
  
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>डिटेल्स स्क्रीन</Text>
      <Text style={styles.counter}>काउंटर: {count}</Text>
      <Button 
        title="वापस जाएं" 
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const Stack = createStackNavigator();

// नेविगेशन सेटअप
const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// रेडक्स प्रोवाइडर के साथ मुख्य कंपोनेंट
const ReduxNavigationTest = () => {
  return (
    <Provider store={simpleStore}>
      <Navigation />
    </Provider>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#EFEEEA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FE7743',
  },
  counter: {
    fontSize: 18,
    marginBottom: 20,
    color: '#273F4F',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  buttonSpacer: {
    width: 20,
  },
});

export default ReduxNavigationTest;