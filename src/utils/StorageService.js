import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * StorageService - स्थानीय स्टोरेज सेवा
 * AsyncStorage का उपयोग करके डेटा को स्थानीय रूप से स्टोर और रिट्रीव करने की सुविधा प्रदान करता है
 */
class StorageService {
  // स्टोरेज कीज़
  static KEYS = {
    USER_PROGRESS: 'studybuddy_user_progress',
    SELECTED_BOOK: 'studybuddy_selected_book',
    SELECTED_TOPIC: 'studybuddy_selected_topic',
    LANGUAGE: 'studybuddy_language',
    QUIZ_HISTORY: 'studybuddy_quiz_history',
    ONELINER_HISTORY: 'studybuddy_oneliner_history',
    MISC_HISTORY: 'studybuddy_misc_history',
    TIMER_SETTINGS: 'studybuddy_timer_settings',
  };

  /**
   * डेटा को स्टोर करें
   * @param {string} key - स्टोरेज की
   * @param {*} value - स्टोर करने के लिए डेटा
   * @returns {Promise<void>}
   */
  static async storeData(key, value) {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (error) {
      console.error('Error storing data:', error);
      return false;
    }
  }

  /**
   * डेटा को रिट्रीव करें
   * @param {string} key - स्टोरेज की
   * @returns {Promise<*>} - रिट्रीव्ड डेटा
   */
  static async getData(key) {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (error) {
      console.error('Error getting data:', error);
      return null;
    }
  }

  /**
   * डेटा को हटाएं
   * @param {string} key - स्टोरेज की
   * @returns {Promise<boolean>}
   */
  static async removeData(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  }

  /**
   * सभी डेटा साफ़ करें
   * @returns {Promise<boolean>}
   */
  static async clearAll() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing all data:', error);
      return false;
    }
  }

  /**
   * उपयोगकर्ता की प्रगति सहेजें
   * @param {Object} progressData - प्रगति डेटा
   * @returns {Promise<boolean>}
   */
  static async saveUserProgress(progressData) {
    return await this.storeData(this.KEYS.USER_PROGRESS, progressData);
  }

  /**
   * उपयोगकर्ता की प्रगति प्राप्त करें
   * @returns {Promise<Object>}
   */
  static async getUserProgress() {
    return await this.getData(this.KEYS.USER_PROGRESS);
  }

  /**
   * चयनित पुस्तक को सहेजें
   * @param {Object} book - पुस्तक डेटा
   * @returns {Promise<boolean>}
   */
  static async saveSelectedBook(book) {
    return await this.storeData(this.KEYS.SELECTED_BOOK, book);
  }

  /**
   * चयनित पुस्तक प्राप्त करें
   * @returns {Promise<Object>}
   */
  static async getSelectedBook() {
    return await this.getData(this.KEYS.SELECTED_BOOK);
  }

  /**
   * चयनित टॉपिक को सहेजें
   * @param {Object} topic - टॉपिक डेटा
   * @returns {Promise<boolean>}
   */
  static async saveSelectedTopic(topic) {
    return await this.storeData(this.KEYS.SELECTED_TOPIC, topic);
  }

  /**
   * चयनित टॉपिक प्राप्त करें
   * @returns {Promise<Object>}
   */
  static async getSelectedTopic() {
    return await this.getData(this.KEYS.SELECTED_TOPIC);
  }

  /**
   * भाषा सेटिंग को सहेजें
   * @param {string} language - भाषा कोड ('hindi' या 'english')
   * @returns {Promise<boolean>}
   */
  static async saveLanguage(language) {
    return await this.storeData(this.KEYS.LANGUAGE, language);
  }

  /**
   * भाषा सेटिंग प्राप्त करें
   * @returns {Promise<string>}
   */
  static async getLanguage() {
    return await this.getData(this.KEYS.LANGUAGE);
  }
}

export default StorageService;