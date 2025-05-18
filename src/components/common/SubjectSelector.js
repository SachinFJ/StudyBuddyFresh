import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const SubjectSelector = ({ subjects, selectedSubject, onSelectSubject, language }) => {
  if (!subjects || subjects.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {language === 'hindi' ? 'कोई विषय उपलब्ध नहीं है' : 'No subjects available'}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {subjects.map((subject) => (
        <TouchableOpacity
          key={subject.id}
          style={[
            styles.subjectButton,
            selectedSubject?.id === subject.id && styles.selectedSubjectButton
          ]}
          onPress={() => onSelectSubject(subject)}
          activeOpacity={0.7}
        >
          <Text style={styles.subjectIcon}>{subject.icon}</Text>
          <Text
            style={[
              styles.subjectText,
              selectedSubject?.id === subject.id && styles.selectedSubjectText
            ]}
          >
            {subject.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  emptyContainer: {
    padding: 15,
    alignItems: 'center',
  },
  emptyText: {
    color: '#666',
    fontStyle: 'italic',
  },
  subjectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FDF0D5',
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
    borderWidth: 1,
    borderColor: '#E5D7BD',
  },
  selectedSubjectButton: {
    backgroundColor: '#C1121F',
    borderColor: '#C1121F',
    elevation: 4,
  },
  subjectIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  subjectText: {
    color: '#003049',
    fontSize: 15,
    fontWeight: '500',
  },
  selectedSubjectText: {
    color: '#FDF0D5',
    fontWeight: 'bold',
  },
});

export default SubjectSelector;