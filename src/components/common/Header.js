import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Header - ऐप हेडर कंपोनेंट
 * स्क्रीन के शीर्ष पर शीर्षक और बैक बटन प्रदर्शित करता है
 * 
 * उपयोग:
 * <Header 
 *   title="क्विज़" 
 *   showBackButton={true}
 *   onBackPress={() => navigation.goBack()}
 * />
 */
const Header = ({
  title,
  showBackButton = false,
  onBackPress,
  rightComponent,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        {showBackButton && (
          <TouchableOpacity
            style={styles.backButton}
            onPress={onBackPress}
          >
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
        )}
      </View>
      
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      
      <View style={styles.rightContainer}>
        {rightComponent && rightComponent}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FE7743',
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  leftContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#EFEEEA',
    fontFamily: 'Noto Sans',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 24,
    color: '#EFEEEA',
    fontWeight: 'bold',
  },
});

export default Header;