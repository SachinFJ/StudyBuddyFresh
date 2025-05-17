import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { View, Text, StyleSheet, Button } from 'react-native';

// टेस्ट होम स्क्रीन
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>होम स्क्रीन</Text>
      <Button 
        title="दूसरी स्क्रीन पर जाएं" 
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

// टेस्ट डिटेल्स स्क्रीन
const DetailsScreen = ({ navigation }) => {
  return (
    <View style={styles.screen}>
      <Text style={styles.title}>डिटेल्स स्क्रीन</Text>
      <Button 
        title="वापस जाएं" 
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
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
});

export default AppNavigator;