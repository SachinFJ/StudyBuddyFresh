// notificationsSlice.js - नोटिफिकेशन स्टेट

import { createSlice } from '@reduxjs/toolkit';

// प्रारंभिक नोटिफिकेशन स्टेट
const initialState = {
  items: [], // नोटिफिकेशन्स की सूची
  unreadCount: 0, // अनपढ़ नोटिफिकेशन्स की संख्या
};

export const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    // नया नोटिफिकेशन जोड़ें
    addNotification: (state, action) => {
      const notification = {
        id: `notif-${Date.now()}`, // यूनीक आईडी
        timestamp: new Date().toISOString(),
        isRead: false,
        ...action.payload,
      };
      
      state.items.unshift(notification); // नोटिफिकेशन को सूची के शुरू में जोड़ें
      state.unreadCount += 1;
    },
    
    // नोटिफिकेशन को पढ़ा हुआ मार्क करें
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.items.find(item => item.id === notificationId);
      
      if (notification && !notification.isRead) {
        notification.isRead = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    
    // सभी नोटिफिकेशन्स को पढ़ा हुआ मार्क करें
    markAllAsRead: (state) => {
      state.items.forEach(item => {
        item.isRead = true;
      });
      state.unreadCount = 0;
    },
    
    // नोटिफिकेशन हटाएँ
    removeNotification: (state, action) => {
      const notificationId = action.payload;
      const notificationIndex = state.items.findIndex(
        item => item.id === notificationId
      );
      
      if (notificationIndex !== -1) {
        const isUnread = !state.items[notificationIndex].isRead;
        state.items.splice(notificationIndex, 1);
        
        if (isUnread) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      }
    },
    
    // सभी नोटिफिकेशन्स साफ़ करें
    clearAllNotifications: (state) => {
      state.items = [];
      state.unreadCount = 0;
    },
    
    // सभी पढ़े हुए नोटिफिकेशन्स साफ़ करें
    clearReadNotifications: (state) => {
      state.items = state.items.filter(item => !item.isRead);
    },
    
    // सभी नोटिफिकेशन्स सेट करें
    setNotifications: (state, action) => {
      state.items = action.payload;
      state.unreadCount = action.payload.filter(item => !item.isRead).length;
    },
    
    // नोटिफिकेशन अपडेट करें
    updateNotification: (state, action) => {
      const { id, updatedData } = action.payload;
      const notification = state.items.find(item => item.id === id);
      
      if (notification) {
        const wasUnread = !notification.isRead;
        const isNowRead = updatedData.isRead !== undefined ? updatedData.isRead : notification.isRead;
        
        Object.assign(notification, updatedData);
        
        // अनपढ़ काउंट अपडेट करें यदि रीड स्टेटस बदला है
        if (wasUnread && isNowRead) {
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        } else if (!wasUnread && !isNowRead) {
          state.unreadCount += 1;
        }
      }
    },
  },
});

// एक्शन्स और रिड्यूसर को एक्सपोर्ट करें
export const {
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearAllNotifications,
  clearReadNotifications,
  setNotifications,
  updateNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
