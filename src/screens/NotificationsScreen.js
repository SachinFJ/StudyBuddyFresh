// NotificationsScreen.js - नोटिफिकेशन्स स्क्रीन

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// कंपोनेंट्स
import Header from '../components/common/Header';
import CustomButton from '../components/common/CustomButton';

// स्लाइसेस
import {
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearReadNotifications,
} from '../store/slices/notificationsSlice';

// थीम
import Theme from '../utils/Theme';

/**
 * नोटिफिकेशन्स स्क्रीन कंपोनेंट
 * नोटिफिकेशन्स की सूची प्रदर्शित करता है
 */
const NotificationsScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  // रेडक्स स्टेट से डेटा प्राप्त करें
  const { current: currentLanguage } = useSelector((state) => state.language);
  const { items: notifications } = useSelector((state) => state.notifications);
  
  // नोटिफिकेशन पर टैप हैंडलर
  const handleNotificationPress = (notification) => {
    // नोटिफिकेशन को पढ़ा हुआ मार्क करें
    dispatch(markAsRead(notification.id));
    
    // नोटिफिकेशन के एक्शन लिंक पर नेविगेट करें (यदि उपलब्ध है)
    if (notification.actionLink) {
      navigation.navigate(notification.actionLink);
    }
  };
  
  // नोटिफिकेशन हटाने का हैंडलर
  const handleDeleteNotification = (notificationId) => {
    Alert.alert(
      currentLanguage === 'hindi' ? 'नोटिफिकेशन हटाएँ' : 'Delete Notification',
      currentLanguage === 'hindi'
        ? 'क्या आप वाकई इस नोटिफिकेशन को हटाना चाहते हैं?'
        : 'Are you sure you want to delete this notification?',
      [
        {
          text: currentLanguage === 'hindi' ? 'रद्द करें' : 'Cancel',
          style: 'cancel',
        },
        {
          text: currentLanguage === 'hindi' ? 'हटाएँ' : 'Delete',
          onPress: () => dispatch(removeNotification(notificationId)),
          style: 'destructive',
        },
      ]
    );
  };
  
  // सभी नोटिफिकेशन्स को पढ़ा हुआ मार्क करें
  const handleMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };
  
  // पढ़े हुए नोटिफिकेशन्स को साफ़ करें
  const handleClearReadNotifications = () => {
    Alert.alert(
      currentLanguage === 'hindi'
        ? 'पढ़े हुए नोटिफिकेशन्स साफ़ करें'
        : 'Clear Read Notifications',
      currentLanguage === 'hindi'
        ? 'क्या आप वाकई सभी पढ़े हुए नोटिफिकेशन्स को हटाना चाहते हैं?'
        : 'Are you sure you want to delete all read notifications?',
      [
        {
          text: currentLanguage === 'hindi' ? 'रद्द करें' : 'Cancel',
          style: 'cancel',
        },
        {
          text: currentLanguage === 'hindi' ? 'हटाएँ' : 'Delete',
          onPress: () => dispatch(clearReadNotifications()),
          style: 'destructive',
        },
      ]
    );
  };
  
  // समय को फॉर्मेट करें
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMs = now - date;
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    
    if (diffInSecs < 60) {
      return currentLanguage === 'hindi' ? 'अभी' : 'Just now';
    } else if (diffInMins < 60) {
      return `${diffInMins} ${
        currentLanguage === 'hindi' ? 'मिनट पहले' : 'mins ago'
      }`;
    } else if (diffInHours < 24) {
      return `${diffInHours} ${
        currentLanguage === 'hindi' ? 'घंटे पहले' : 'hours ago'
      }`;
    } else if (diffInDays < 7) {
      return `${diffInDays} ${
        currentLanguage === 'hindi' ? 'दिन पहले' : 'days ago'
      }`;
    } else {
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }
  };
  
  // नोटिफिकेशन टाइप के अनुसार आइकन प्राप्त करें
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reminder':
        return 'alarm-outline';
      case 'update':
        return 'refresh-outline';
      case 'achievement':
        return 'trophy-outline';
      case 'info':
        return 'information-circle-outline';
      default:
        return 'notifications-outline';
    }
  };
  
  // नोटिफिकेशन आइटम रेंडरर
  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.notificationItem,
        !item.isRead && styles.unreadNotificationItem,
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationIconContainer}>
        <Ionicons
          name={getNotificationIcon(item.type)}
          size={24}
          color={Theme.COLORS.SECONDARY}
        />
      </View>
      
      <View style={styles.notificationContent}>
        <Text
          style={[
            styles.notificationTitle,
            !item.isRead && styles.unreadNotificationTitle,
          ]}
        >
          {item.title}
        </Text>
        
        <Text style={styles.notificationMessage}>{item.message}</Text>
        
        <Text style={styles.notificationTime}>{formatTime(item.timestamp)}</Text>
      </View>
      
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteNotification(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color={Theme.COLORS.ERROR} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  
  // लिस्ट एम्प्टी कंपोनेंट
  const EmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Ionicons
        name="notifications-off-outline"
        size={80}
        color={Theme.COLORS.MEDIUM_GRAY}
        style={styles.emptyIcon}
      />
      
      <Text style={styles.emptyText}>
        {currentLanguage === 'hindi'
          ? 'कोई नोटिफिकेशन नहीं है'
          : 'No notifications'}
      </Text>
      
      <Text style={styles.emptySubtext}>
        {currentLanguage === 'hindi'
          ? 'अभी तक कोई नोटिफिकेशन नहीं है'
          : 'You don\'t have any notifications yet'}
      </Text>
    </View>
  );
  
  // एक्शन बटन्स कंपोनेंट
  const ActionButtons = () => (
    <View style={styles.actionButtonsContainer}>
      <CustomButton
        title={
          currentLanguage === 'hindi'
            ? 'सभी को पढ़ा हुआ मार्क करें'
            : 'Mark All as Read'
        }
        onPress={handleMarkAllAsRead}
        type="outline"
        style={styles.actionButton}
        disabled={notifications.length === 0}
      />
      
      <CustomButton
        title={
          currentLanguage === 'hindi'
            ? 'पढ़े हुए साफ़ करें'
            : 'Clear Read'
        }
        onPress={handleClearReadNotifications}
        type="outline"
        style={styles.actionButton}
        disabled={notifications.filter((n) => n.isRead).length === 0}
      />
    </View>
  );
  
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={currentLanguage === 'hindi' ? 'सूचनाएँ' : 'Notifications'}
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />
      
      <ActionButtons />
      
      <FlatList
        data={notifications}
        renderItem={renderNotificationItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<EmptyListComponent />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.COLORS.BACKGROUND,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: Theme.SPACING.REGULAR,
    borderBottomWidth: 1,
    borderBottomColor: Theme.COLORS.LIGHT_GRAY,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: Theme.SPACING.TINY,
  },
  listContent: {
    flexGrow: 1,
    padding: Theme.SPACING.REGULAR,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: Theme.COLORS.WHITE,
    borderRadius: Theme.BORDER_RADIUS.REGULAR,
    marginBottom: Theme.SPACING.MEDIUM,
    padding: Theme.SPACING.REGULAR,
    ...Theme.COMPONENT_STYLES.SHADOW,
  },
  unreadNotificationItem: {
    borderLeftWidth: 4,
    borderLeftColor: Theme.COLORS.PRIMARY,
  },
  notificationIconContainer: {
    marginRight: Theme.SPACING.REGULAR,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(39, 63, 79, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: Theme.FONT_SIZES.MEDIUM,
    fontWeight: '500',
    color: Theme.COLORS.SECONDARY,
    marginBottom: Theme.SPACING.TINY,
  },
  unreadNotificationTitle: {
    fontWeight: 'bold',
    color: Theme.COLORS.PRIMARY,
  },
  notificationMessage: {
    fontSize: Theme.FONT_SIZES.REGULAR,
    color: Theme.COLORS.TEXT,
    marginBottom: Theme.SPACING.SMALL,
  },
  notificationTime: {
    fontSize: Theme.FONT_SIZES.SMALL,
    color: Theme.COLORS.MEDIUM_GRAY,
  },
  deleteButton: {
    padding: Theme.SPACING.SMALL,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Theme.SPACING.LARGE,
  },
  emptyIcon: {
    marginBottom: Theme.SPACING.LARGE,
  },
  emptyText: {
    fontSize: Theme.FONT_SIZES.LARGE,
    fontWeight: 'bold',
    color: Theme.COLORS.SECONDARY,
    marginBottom: Theme.SPACING.SMALL,
  },
  emptySubtext: {
    fontSize: Theme.FONT_SIZES.REGULAR,
    color: Theme.COLORS.MEDIUM_GRAY,
    textAlign: 'center',
  },
});

export default NotificationsScreen;
