/**
 * SearchUtils - खोज संबंधित उपयोगिताएँ
 * StudyBuddy ऐप में खोज फंक्शनैलिटी के लिए सहायक फंक्शन्स प्रदान करता है
 */

/**
 * डेटा में खोज करता है और मैचिंग परिणाम लौटाता है
 * @param {string} query - खोज क्वेरी
 * @param {Object} data - खोजने के लिए डेटा
 * @param {Object} options - विकल्प (फिल्टर्स, प्राथमिकताएँ)
 * @returns {Array} - मैचिंग परिणामों की सूची
 */
export const searchData = (query, data, options = {}) => {
  if (!query || query.trim() === '') {
    return [];
  }

  const {
    searchInBooks = true,
    searchInTopics = true,
    searchInQuestions = true,
    searchInOneliners = true,
    maxResults = 20,
    language = 'hindi',
  } = options;

  const normalizedQuery = query.toLowerCase().trim();
  const results = [];

  // पुस्तकों में खोजें
  if (searchInBooks && data.books) {
    const bookMatches = data.books
      .filter(book => 
        book.name.toLowerCase().includes(normalizedQuery) ||
        (book.category && book.category.toLowerCase().includes(normalizedQuery))
      )
      .map(book => ({
        id: `book_${book.id}`,
        type: 'book',
        text: book.name,
        data: book,
      }));
    results.push(...bookMatches);
  }

  // टॉपिक्स में खोजें
  if (searchInTopics && data.topics) {
    const topicMatches = [];
    Object.entries(data.topics).forEach(([bookId, topics]) => {
      const matches = topics
        .filter(topic => topic.name.toLowerCase().includes(normalizedQuery))
        .map(topic => ({
          id: `topic_${topic.id}`,
          type: 'topic',
          text: topic.name,
          data: { ...topic, bookId },
        }));
      topicMatches.push(...matches);
    });
    results.push(...topicMatches);
  }

  // प्रश्नों में खोजें
  if (searchInQuestions && data.quizData && data.quizData[language]) {
    const questionMatches = [];
    Object.entries(data.quizData[language]).forEach(([bookId, bookData]) => {
      Object.entries(bookData).forEach(([topicId, questions]) => {
        const matches = questions
          .filter(q => 
            q.question.toLowerCase().includes(normalizedQuery) ||
            q.options.some(opt => opt.toLowerCase().includes(normalizedQuery))
          )
          .map(q => ({
            id: `question_${q.id}`,
            type: 'question',
            text: q.question,
            data: { ...q, bookId, topicId },
          }));
        questionMatches.push(...matches);
      });
    });
    results.push(...questionMatches);
  }

  // वनलाइनर्स में खोजें
  if (searchInOneliners && data.onelinerData && data.onelinerData[language]) {
    const onelinerMatches = [];
    Object.entries(data.onelinerData[language]).forEach(([bookId, bookData]) => {
      Object.entries(bookData).forEach(([topicId, oneliners]) => {
        const matches = oneliners
          .filter(o => o.text.toLowerCase().includes(normalizedQuery))
          .map(o => ({
            id: `oneliner_${o.id}`,
            type: 'oneliner',
            text: o.text,
            data: { ...o, bookId, topicId },
          }));
        onelinerMatches.push(...matches);
      });
    });
    results.push(...onelinerMatches);
  }

  // परिणामों को संक्षिप्त करें और प्रकार के अनुसार वर्गीकृत करें
  return results
    .slice(0, maxResults)
    .sort((a, b) => {
      // प्राथमिकता क्रम: book > topic > question > oneliner
      const typeOrder = { book: 1, topic: 2, question: 3, oneliner: 4 };
      return typeOrder[a.type] - typeOrder[b.type];
    });
};

/**
 * रैंडम प्रश्नों का सेट जनरेट करता है
 * @param {Object} quizData - क्विज़ डेटा
 * @param {number} count - प्रश्नों की संख्या
 * @param {Object} filters - फिल्टर विकल्प (पुस्तक, टॉपिक)
 * @param {string} language - भाषा कोड
 * @returns {Array} - रैंडम प्रश्नों की सूची
 */
export const generateRandomQuestions = (quizData, count = 10, filters = {}, language = 'hindi') => {
  if (!quizData || !quizData[language]) {
    return [];
  }

  const { bookId, topicId } = filters;
  const allQuestions = [];

  // सभी प्रश्नों को एकत्र करें
  if (bookId && topicId) {
    // विशिष्ट पुस्तक और टॉपिक से प्रश्न
    const questions = quizData[language][bookId]?.[topicId] || [];
    allQuestions.push(...questions);
  } else if (bookId) {
    // केवल चयनित पुस्तक से प्रश्न
    const bookData = quizData[language][bookId] || {};
    Object.values(bookData).forEach(questions => {
      allQuestions.push(...questions);
    });
  } else {
    // सभी प्रश्न
    Object.values(quizData[language]).forEach(bookData => {
      Object.values(bookData).forEach(questions => {
        allQuestions.push(...questions);
      });
    });
  }

  // प्रश्नों को शफल करें
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  
  // अनुरोधित संख्या या उपलब्ध सभी प्रश्न वापस करें
  return shuffled.slice(0, Math.min(count, shuffled.length));
};

/**
 * सर्च क्वेरी को हाइलाइट करता है
 * @param {string} text - मूल टेक्स्ट
 * @param {string} query - हाइलाइट करने के लिए क्वेरी
 * @returns {Array} - हाइलाइट किए गए टेक्स्ट सेगमेंट्स की सूची
 */
export const highlightSearchQuery = (text, query) => {
  if (!query || query.trim() === '' || !text) {
    return [{ text, highlight: false }];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const normalizedText = text.toLowerCase();
  const segments = [];
  let lastIndex = 0;

  let startIndex = normalizedText.indexOf(normalizedQuery);
  while (startIndex !== -1) {
    // हाइलाइट से पहले का टेक्स्ट
    if (startIndex > lastIndex) {
      segments.push({
        text: text.substring(lastIndex, startIndex),
        highlight: false,
      });
    }

    // हाइलाइट किया गया टेक्स्ट
    segments.push({
      text: text.substring(startIndex, startIndex + normalizedQuery.length),
      highlight: true,
    });

    lastIndex = startIndex + normalizedQuery.length;
    startIndex = normalizedText.indexOf(normalizedQuery, lastIndex);
  }

  // बाकी का टेक्स्ट
  if (lastIndex < text.length) {
    segments.push({
      text: text.substring(lastIndex),
      highlight: false,
    });
  }

  return segments;
};

export default {
  searchData,
  generateRandomQuestions,
  highlightSearchQuery,
};