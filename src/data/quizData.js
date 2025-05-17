// quizData.js - क्विज़ प्रश्न और उत्तर डेटा

const quizData = {
  hindi: {
    book1: { // सामान्य ज्ञान
      topic1: [ // इतिहास
        {
          id: 'q1',
          question: 'भारत का राष्ट्रीय पक्षी कौन सा है?',
          options: ['मोर', 'कबूतर', 'गौरैया', 'हंस'],
          correctAnswer: 0,
          explanation: 'मोर भारत का राष्ट्रीय पक्षी है। इसे 1963 में इस प्रतिष्ठा के लिए चुना गया था।'
        },
        {
          id: 'q2',
          question: 'किस मुग़ल शासक ने ताजमहल का निर्माण करवाया था?',
          options: ['अकबर', 'शाहजहाँ', 'जहाँगीर', 'औरंगज़ेब'],
          correctAnswer: 1,
          explanation: 'शाहजहाँ ने अपनी प्रिय पत्नी मुमताज महल की याद में ताजमहल का निर्माण करवाया था।'
        },
        {
          id: 'q3',
          question: '1857 का विद्रोह कहाँ से शुरू हुआ था?',
          options: ['मेरठ', 'दिल्ली', 'कानपुर', 'झाँसी'],
          correctAnswer: 0,
          explanation: '1857 का प्रथम स्वतंत्रता संग्राम मेरठ से शुरू हुआ था, जहाँ सैनिकों ने अंग्रेजों के खिलाफ विद्रोह किया था।'
        },
        {
          id: 'q4',
          question: 'स्वतंत्र भारत के प्रथम गवर्नर जनरल कौन थे?',
          options: ['सी. राजगोपालाचारी', 'जवाहरलाल नेहरू', 'लॉर्ड माउंटबेटन', 'सरदार पटेल'],
          correctAnswer: 2,
          explanation: 'लॉर्ड माउंटबेटन स्वतंत्र भारत के प्रथम गवर्नर जनरल थे। बाद में सी. राजगोपालाचारी ने पदभार संभाला।'
        },
        {
          id: 'q5',
          question: 'महात्मा गांधी द्वारा किस आंदोलन में "भारत छोड़ो" का नारा दिया गया था?',
          options: ['खिलाफत आंदोलन', 'नमक सत्याग्रह', 'भारत छोड़ो आंदोलन', 'असहयोग आंदोलन'],
          correctAnswer: 2,
          explanation: 'महात्मा गांधी ने 8 अगस्त 1942 को मुंबई के गवालिया टैंक मैदान से "भारत छोड़ो" आंदोलन शुरू किया था।'
        },
      ],
      topic2: [ // भूगोल
        {
          id: 'q6',
          question: 'भारत का सबसे बड़ा राज्य कौन सा है?',
          options: ['मध्य प्रदेश', 'राजस्थान', 'महाराष्ट्र', 'उत्तर प्रदेश'],
          correctAnswer: 1,
          explanation: 'राजस्थान क्षेत्रफल के हिसाब से भारत का सबसे बड़ा राज्य है।'
        },
        {
          id: 'q7',
          question: 'कौन सी नदी भारत की सबसे लंबी नदी है?',
          options: ['ब्रह्मपुत्र', 'गंगा', 'गोदावरी', 'यमुना'],
          correctAnswer: 1,
          explanation: 'गंगा नदी भारत की सबसे लंबी नदी है, जिसकी लंबाई लगभग 2,525 किलोमीटर है।'
        },
        {
          id: 'q8',
          question: 'भारत की सबसे ऊँची चोटी कौन सी है?',
          options: ['कंचनजंघा', 'नंदा देवी', 'माउंट एवरेस्ट', 'के2'],
          correctAnswer: 0,
          explanation: 'कंचनजंघा भारत की सबसे ऊँची चोटी है (माउंट एवरेस्ट नेपाल और तिब्बत की सीमा पर स्थित है)।'
        },
        {
          id: 'q9',
          question: 'निम्नलिखित में से कौन सा देश भारत के साथ सीमा साझा नहीं करता है?',
          options: ['म्यांमार', 'अफगानिस्तान', 'थाईलैंड', 'भूटान'],
          correctAnswer: 2,
          explanation: 'थाईलैंड भारत के साथ सीमा साझा नहीं करता है। भारत के पड़ोसी देश पाकिस्तान, अफगानिस्तान, चीन, नेपाल, भूटान, म्यांमार और बांग्लादेश हैं।'
        },
        {
          id: 'q10',
          question: 'भारत में सबसे अधिक वर्षा वाला स्थान कौन सा है?',
          options: ['चेरापूंजी', 'शिलांग', 'दार्जिलिंग', 'माउंट आबू'],
          correctAnswer: 0,
          explanation: 'मेघालय के चेरापूंजी (मौसिनराम) को विश्व का सबसे अधिक वर्षा वाला स्थान माना जाता है।'
        },
      ],
    },
    book2: { // विज्ञान और प्रौद्योगिकी
      topic1: [ // भौतिकी
        {
          id: 'q11',
          question: 'न्यूटन का गति का प्रथम नियम किस नाम से जाना जाता है?',
          options: ['जड़त्व का नियम', 'संवेग का नियम', 'गुरुत्वाकर्षण का नियम', 'क्रिया-प्रतिक्रिया का नियम'],
          correctAnswer: 0,
          explanation: 'न्यूटन का गति का प्रथम नियम जड़त्व का नियम के नाम से जाना जाता है। इसके अनुसार कोई वस्तु अपनी स्थिति में परिवर्तन का विरोध करती है।'
        },
        {
          id: 'q12',
          question: 'प्रकाश की गति लगभग कितनी होती है?',
          options: ['300,000 किमी/सेकंड', '150,000 किमी/सेकंड', '3,000 किमी/सेकंड', '30,000 किमी/सेकंड'],
          correctAnswer: 0,
          explanation: 'प्रकाश की गति निर्वात में लगभग 299,792 किलोमीटर प्रति सेकंड (या लगभग 300,000 किमी/सेकंड) होती है।'
        },
      ],
      topic2: [ // रसायन विज्ञान
        {
          id: 'q13',
          question: 'पानी का रासायनिक सूत्र क्या है?',
          options: ['H2O', 'CO2', 'O2', 'H2SO4'],
          correctAnswer: 0,
          explanation: 'पानी का रासायनिक सूत्र H2O है, जिसमें हाइड्रोजन के दो परमाणु और ऑक्सीजन का एक परमाणु होता है।'
        },
        {
          id: 'q14',
          question: 'आवर्त सारणी में कितने तत्व हैं?',
          options: ['92', '118', '108', '112'],
          correctAnswer: 1,
          explanation: 'वर्तमान में आवर्त सारणी में 118 तत्व हैं, जिनमें से 94 प्राकृतिक रूप से पाए जाते हैं और शेष मानव निर्मित हैं।'
        },
      ],
    },
  },
  english: {
    book1: { // General Knowledge
      topic1: [ // History
        {
          id: 'q1',
          question: 'Which is the national bird of India?',
          options: ['Peacock', 'Pigeon', 'Sparrow', 'Swan'],
          correctAnswer: 0,
          explanation: 'The peacock is the national bird of India. It was chosen for this honor in 1963.'
        },
        {
          id: 'q2',
          question: 'Which Mughal emperor built the Taj Mahal?',
          options: ['Akbar', 'Shah Jahan', 'Jahangir', 'Aurangzeb'],
          correctAnswer: 1,
          explanation: 'Shah Jahan built the Taj Mahal in memory of his beloved wife Mumtaz Mahal.'
        },
        {
          id: 'q3',
          question: 'Where did the 1857 revolt begin?',
          options: ['Meerut', 'Delhi', 'Kanpur', 'Jhansi'],
          correctAnswer: 0,
          explanation: 'The First War of Independence of 1857 began in Meerut, where soldiers revolted against the British.'
        },
        {
          id: 'q4',
          question: 'Who was the first Governor-General of independent India?',
          options: ['C. Rajagopalachari', 'Jawaharlal Nehru', 'Lord Mountbatten', 'Sardar Patel'],
          correctAnswer: 2,
          explanation: 'Lord Mountbatten was the first Governor-General of independent India. Later, C. Rajagopalachari took over.'
        },
        {
          id: 'q5',
          question: 'In which movement did Mahatma Gandhi give the slogan "Quit India"?',
          options: ['Khilafat Movement', 'Salt Satyagraha', 'Quit India Movement', 'Non-Cooperation Movement'],
          correctAnswer: 2,
          explanation: 'Mahatma Gandhi launched the "Quit India" movement on August 8, 1942, from Gowalia Tank Maidan in Mumbai.'
        },
      ],
      topic2: [ // Geography
        {
          id: 'q6',
          question: 'Which is the largest state in India by area?',
          options: ['Madhya Pradesh', 'Rajasthan', 'Maharashtra', 'Uttar Pradesh'],
          correctAnswer: 1,
          explanation: 'Rajasthan is the largest state in India by area.'
        },
        {
          id: 'q7',
          question: 'Which river is the longest in India?',
          options: ['Brahmaputra', 'Ganga', 'Godavari', 'Yamuna'],
          correctAnswer: 1,
          explanation: 'The Ganga is the longest river in India, with a length of approximately 2,525 kilometers.'
        },
        {
          id: 'q8',
          question: 'What is the highest peak in India?',
          options: ['Kanchenjunga', 'Nanda Devi', 'Mount Everest', 'K2'],
          correctAnswer: 0,
          explanation: 'Kanchenjunga is the highest peak in India (Mount Everest is located on the Nepal-Tibet border).'
        },
        {
          id: 'q9',
          question: 'Which of the following countries does not share a border with India?',
          options: ['Myanmar', 'Afghanistan', 'Thailand', 'Bhutan'],
          correctAnswer: 2,
          explanation: 'Thailand does not share a border with India. India\'s neighboring countries are Pakistan, Afghanistan, China, Nepal, Bhutan, Myanmar, and Bangladesh.'
        },
        {
          id: 'q10',
          question: 'Which place in India receives the highest rainfall?',
          options: ['Cherrapunji', 'Shillong', 'Darjeeling', 'Mount Abu'],
          correctAnswer: 0,
          explanation: 'Cherrapunji (Mawsynram) in Meghalaya is considered the wettest place in the world.'
        },
      ],
    },
    book2: { // Science and Technology
      topic1: [ // Physics
        {
          id: 'q11',
          question: 'What is Newton\'s First Law of Motion also known as?',
          options: ['Law of Inertia', 'Law of Momentum', 'Law of Gravitation', 'Law of Action-Reaction'],
          correctAnswer: 0,
          explanation: 'Newton\'s First Law of Motion is known as the Law of Inertia. According to this law, an object resists changes in its state of motion.'
        },
        {
          id: 'q12',
          question: 'What is the approximate speed of light?',
          options: ['300,000 km/s', '150,000 km/s', '3,000 km/s', '30,000 km/s'],
          correctAnswer: 0,
          explanation: 'The speed of light in vacuum is approximately 299,792 kilometers per second (or about 300,000 km/s).'
        },
      ],
      topic2: [ // Chemistry
        {
          id: 'q13',
          question: 'What is the chemical formula for water?',
          options: ['H2O', 'CO2', 'O2', 'H2SO4'],
          correctAnswer: 0,
          explanation: 'The chemical formula for water is H2O, which consists of two hydrogen atoms and one oxygen atom.'
        },
        {
          id: 'q14',
          question: 'How many elements are there in the periodic table?',
          options: ['92', '118', '108', '112'],
          correctAnswer: 1,
          explanation: 'Currently, there are 118 elements in the periodic table, of which 94 occur naturally and the rest are man-made.'
        },
      ],
    },
  }
};

export default quizData;