import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Theme from '../../utils/Theme';

/**
 * ProgressIndicator - प्रगति दिखाने वाला कंपोनेंट
 * वर्तमान प्रगति का विज़ुअल प्रतिनिधित्व दिखाता है
 * 
 * Props:
 * @param {Number} current - वर्तमान मान
 * @param {Number} total - कुल मान
 * @param {String} label - प्रगति का लेबल
 * @param {Boolean} showPercentage - प्रतिशत दिखाएं या नहीं
 * @param {Object} style - कस्टम स्टाइल
 */
const ProgressIndicator = ({
  current = 0,
  total = 100,
  label = "प्रगति",
  showPercentage = true,
  style = {}
}) => {
  // प्रगति प्रतिशत की गणना
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;
  
  return (
    <View style={[styles.container, style]}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>{label}</Text>
        {showPercentage && (
          <Text style={styles.percentage}>{percentage}%</Text>
        )}
      </View>
      
      <View style={styles.progressBarContainer}>
        <View 
          style={[styles.progressBar, { width: `${percentage}%` }]} 
        />
      </View>
      
      <View style={styles.statsRow}>
        <Text style={styles.stats}>{current} / {total}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  label: {
    color: Theme.COLORS.SECONDARY,
    fontSize: 16,
    fontWeight: '500',
  },
  percentage: {
    color: Theme.COLORS.PRIMARY,
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E5E5E5',
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: Theme.COLORS.PRIMARY,
    borderRadius: 5,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  stats: {
    color: Theme.COLORS.SECONDARY,
    fontSize: 14,
  },
});

export default ProgressIndicator;