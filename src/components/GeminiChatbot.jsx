import React, { useState, useRef, useEffect } from 'react';
import { FaTimes, FaPaperPlane, FaRobot } from 'react-icons/fa';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6CwedjJdcDjw-fd1WUhigu6BuseGLUhk",
  authDomain: "syed-taha-protfolio.firebaseapp.com",
  databaseURL: "https://syed-taha-protfolio-default-rtdb.firebaseio.com",
  projectId: "syed-taha-protfolio",
  storageBucket: "syed-taha-protfolio.firebasestorage.app",
  messagingSenderId: "661743042303",
  appId: "1:661743042303:web:b7cecc88ace19d778416ca",
  measurementId: "G-CYZ70QEZKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Portfolio information to feed the chatbot
const PORTFOLIO_INFO = {
  name: 'Syed Taha',
  email: 'tahasyed225@gmail.com',
  phone: '+92 311 5929527',
  location: 'Abbottabad, Pakistan',
  field: 'Video Editing, Graphic Design, YouTuber',
  youtube: '@iamsyedtaha',
  skills: [
    'Adobe Photoshop (3+ years)',
    'Adobe Premiere (3+ years)',
    'Adobe After Effects (3+ years)',
    'React.js',
    'Python',
    'HTML, CSS, JavaScript',
    'MongoDB, Node.js, Firebase',
    'AI Tools: VEO 3, Gemini API'
  ],
  services: [
    'Video Editing',
    'Graphic Designing'
  ],
  languages: [
    'Urdu (Fluent)',
    'Hindi (Fluent)',
    'English (Fluent)'
  ],
  education: 'Currently studying Software Engineering, 5th semester at COMSATS',
  equipment: 'High-end laptop and PC',
  hobbies: [
    'Creating YouTube Shorts & Tutorials',
    'Coding',
    'Traveling',
    'Boxing'
  ]
};

// Gemini API integration
// Using the correct endpoint URL from Google AI documentation
const API_KEY = 'AIzaSyCHuKm1Z7-5Zj2u5JRFwe7wpIsBLMgazqA';
const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

// Function to generate response using Gemini API
const generateResponse = async (message) => {
  try {
    // Fallback responses in case API call fails
    const fallbackResponses = {
      greeting: "👋 Hello! I'm Syed Taha's AI assistant. How can I help you today?",
      about: "I'm an AI assistant for **Syed Taha**, a Video Editor, Graphic Designer, and YouTuber based in Abbottabad, Pakistan. He's currently studying Software Engineering (5th semester) at COMSATS. He has 3+ years of experience with Adobe Premiere, After Effects, and Photoshop. He also builds tools with React.js and Python.",
      contact: "You can contact Syed Taha at:\n\n📧 **Email**: tahasyed225@gmail.com\n📱 **Phone**: +92 311 5929527\n📍 **Location**: Abbottabad, Pakistan",
      skills: "Syed Taha's skills include:\n\n**Design & Editing**\n- Adobe Photoshop (3+ years)\n- Adobe Premiere (3+ years)\n- Adobe After Effects (3+ years)\n\n**Development**\n- React.js\n- Python\n- HTML, CSS, JavaScript\n- MongoDB, Node.js, Firebase\n\n**AI Tools**\n- VEO 3\n- Gemini API",
      services: "Syed Taha offers the following services:\n\n🎬 **Video Editing**\n- Cinematic edits\n- YouTube shorts\n- Motion graphics\n\n🎨 **Graphic Design**\n- Thumbnails\n- Posters\n- Social media graphics",
      education: "Syed Taha is currently pursuing a Bachelor's degree in Software Engineering (5th semester) at COMSATS.",
      languages: "Syed Taha is fluent in:\n\n- Urdu\n- Hindi\n- English",
      youtube: "Syed Taha has a YouTube channel: **@iamsyedtaha** where he creates viral shorts, cinematic edits, and Photoshop tutorials. You can check it out [here](https://www.youtube.com/@iamsyedtaha).",
      hobbies: "Syed Taha's hobbies include:\n\n- Creating YouTube Shorts & Tutorials\n- Coding\n- Traveling\n- Boxing",
      hire: "Interested in working with Syed Taha? Great choice! You can reach out via:\n\n📧 **Email**: tahasyed225@gmail.com\n📱 **WhatsApp**: +92 311 5929527\n\nPlease include details about your project requirements and timeline for a faster response.",
      default: "Thanks for your message! I'm Syed Taha's AI assistant. I can tell you about his skills, services, experience, or how to contact him. What would you like to know?"
    };
    
    // Try to use the Gemini API
    const response = await fetch(`${API_URL}?key=${API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are an AI assistant for Syed Taha, a Video Editor, Graphic Designer, and YouTuber. Respond to the following message in a helpful, friendly manner. Include markdown formatting like **bold** for emphasis and [text](url) for links when appropriate. Keep responses concise and relevant.\n\nHere's information about Syed Taha:\n${JSON.stringify(PORTFOLIO_INFO, null, 2)}\n\nUser message: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      })
    });

    if (!response.ok) {
      console.error(`API request failed with status ${response.status}`);
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Gemini API response:', data);
    
    // Check if we have a valid response
    if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
      return data.candidates[0].content.parts[0].text;
    }
    
    // If API call fails, use fallback responses based on keywords
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg === 'hey') {
      return fallbackResponses.greeting;
    } else if (lowerMsg.includes('about you') || lowerMsg.includes('who are you') || lowerMsg.includes('tell me about') || lowerMsg.includes('about syed')) {
      return fallbackResponses.about;
    } else if (lowerMsg.includes('contact') || lowerMsg.includes('email') || lowerMsg.includes('phone')) {
      return fallbackResponses.contact;
    } else if (lowerMsg.includes('skill') || lowerMsg.includes('can you do') || lowerMsg.includes('expertise')) {
      return fallbackResponses.skills;
    } else if (lowerMsg.includes('service') || lowerMsg.includes('offer') || lowerMsg.includes('provide')) {
      return fallbackResponses.services;
    } else if (lowerMsg.includes('education') || lowerMsg.includes('study') || lowerMsg.includes('degree')) {
      return fallbackResponses.education;
    } else if (lowerMsg.includes('language') || lowerMsg.includes('speak')) {
      return fallbackResponses.languages;
    } else if (lowerMsg.includes('youtube') || lowerMsg.includes('channel') || lowerMsg.includes('video')) {
      return fallbackResponses.youtube;
    } else if (lowerMsg.includes('hobby') || lowerMsg.includes('interest') || lowerMsg.includes('free time')) {
      return fallbackResponses.hobbies;
    } else if (lowerMsg.includes('hire') || lowerMsg.includes('work with') || lowerMsg.includes('project')) {
      return fallbackResponses.hire;
    } else {
      return fallbackResponses.default;
    }
  } catch (error) {
    console.error('Error generating response:', error);
    
    // Provide more specific error message for 404 errors
    if (error.message && error.message.includes('404')) {
      return "I'm having trouble connecting to the Gemini API. There might be an issue with the API endpoint or key. In the meantime, you can ask me about Syed Taha's skills, services, or contact information.";
    }
    
    return "I'm having trouble connecting to my AI services right now. Please try again later or ask me something about Syed Taha's skills, services, or contact information.";
  }
};

const GeminiChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [pastConversations, setPastConversations] = useState([]);
  const [showConversations, setShowConversations] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  
  // Create a new conversation in Firebase
  const createNewConversation = () => {
    const conversationsRef = ref(database, 'conversations');
    const newConversationRef = push(conversationsRef);
    const newConversationId = newConversationRef.key;
    
    // Initialize with timestamp and empty messages
    set(newConversationRef, {
      createdAt: new Date().toISOString(),
      messages: []
    });
    
    return newConversationId;
  };
  
  // Save a message to Firebase
  const saveMessageToFirebase = (message) => {
    if (!conversationId) return;
    
    const messagesRef = ref(database, `conversations/${conversationId}/messages`);
    const newMessageRef = push(messagesRef);
    set(newMessageRef, {
      id: message.id,
      text: message.text,
      sender: message.sender,
      timestamp: new Date().toISOString()
    });
  };
  
  // Load conversation from Firebase
  const loadConversationFromFirebase = (convId) => {
    const messagesRef = ref(database, `conversations/${convId}/messages`);
    onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesList = Object.values(messagesData).sort((a, b) => a.id - b.id);
        setMessages(messagesList);
      }
    });
  };
  
  // Fetch all past conversations
  const fetchPastConversations = () => {
    const conversationsRef = ref(database, 'conversations');
    onValue(conversationsRef, (snapshot) => {
      if (snapshot.exists()) {
        const conversationsData = snapshot.val();
        const conversationsList = Object.entries(conversationsData).map(([key, value]) => {
          // Get the first message as preview (usually the greeting)
          const messages = value.messages ? Object.values(value.messages) : [];
          const firstMessage = messages.length > 0 ? 
            messages.sort((a, b) => a.id - b.id)[0].text : 
            "Empty conversation";
          
          // Get the last message timestamp for sorting
          const lastMessage = messages.length > 0 ? 
            messages.sort((a, b) => b.id - a.id)[0] : 
            null;
          
          return {
            id: key,
            createdAt: value.createdAt,
            preview: firstMessage.substring(0, 50) + (firstMessage.length > 50 ? '...' : ''),
            lastMessageTime: lastMessage ? lastMessage.timestamp : value.createdAt
          };
        });
        
        // Sort by most recent conversation
        conversationsList.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
        setPastConversations(conversationsList);
      }
    });
  };
  
  // Delete a conversation
  const deleteConversation = (convId, event) => {
    // Stop the event from bubbling up to parent elements
    event.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this conversation?')) {
      const conversationRef = ref(database, `conversations/${convId}`);
      set(conversationRef, null);
      
      // If we're deleting the current conversation, start a new one
      if (convId === conversationId) {
        startNewConversation();
      }
    }
  };
  
  // Export conversation as JSON
  const exportConversation = (convId, event) => {
    // Stop the event from bubbling up to parent elements
    event.stopPropagation();
    
    const messagesRef = ref(database, `conversations/${convId}/messages`);
    onValue(messagesRef, (snapshot) => {
      if (snapshot.exists()) {
        const messagesData = snapshot.val();
        const messagesList = Object.values(messagesData).sort((a, b) => a.id - b.id);
        
        // Create a JSON file and trigger download
        const dataStr = JSON.stringify(messagesList, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
        
        const exportFileDefaultName = `conversation-${convId.substring(0, 8)}-${new Date().toISOString().slice(0, 10)}.json`;
        
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
      }
    }, { onlyOnce: true }); // Only read once, not continuously
  };
  
  // Clear all conversations
  const clearAllConversations = () => {
    if (window.confirm('Are you sure you want to delete ALL conversations? This cannot be undone.')) {
      const conversationsRef = ref(database, 'conversations');
      set(conversationsRef, null);
      startNewConversation();
    }
  };

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Fetch past conversations when component mounts
  useEffect(() => {
    fetchPastConversations();
  }, []);

  // Focus input when chat opens and initialize conversation
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      
      // Create a new conversation if none exists
      if (!conversationId) {
        const newConversationId = createNewConversation();
        setConversationId(newConversationId);
        
        // Add initial greeting if no messages
        if (messages.length === 0) {
          const initialMessage = {
            id: 1,
            text: "👋 Hi there! I'm Syed Taha's AI assistant. How can I help you today?",
            sender: 'ai'
          };
          
          setMessages([initialMessage]);
          
          // Save initial message to Firebase
          setTimeout(() => {
            saveMessageToFirebase(initialMessage);
          }, 100);
        }
      } else {
        // Load existing conversation
        loadConversationFromFirebase(conversationId);
      }
    }
  }, [isOpen, conversationId]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowConversations(false); // Hide conversations list when toggling chat
  };
  
  const toggleConversationsList = () => {
    setShowConversations(!showConversations);
  };
  
  const switchConversation = (convId) => {
    setConversationId(convId);
    loadConversationFromFirebase(convId);
    setShowConversations(false); // Hide the list after selection
  };
  
  const startNewConversation = () => {
    const newConversationId = createNewConversation();
    setConversationId(newConversationId);
    setMessages([]);
    setShowConversations(false);
    
    // Add initial greeting
    const initialMessage = {
      id: 1,
      text: "👋 Hi there! I'm Syed Taha's AI assistant. How can I help you today?",
      sender: 'ai'
    };
    
    setMessages([initialMessage]);
    saveMessageToFirebase(initialMessage);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!isSubmitting) {
        handleSendMessage();
      }
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === '' || isSubmitting) return;
    
    // Ensure we have a conversation ID
    if (!conversationId) {
      const newConversationId = createNewConversation();
      setConversationId(newConversationId);
    }

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'user'
    };

    const currentInput = inputValue;
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);
    setIsSubmitting(true);
    
    // Save user message to Firebase
    saveMessageToFirebase(userMessage);

    try {
      // Add a small delay to make the interaction feel more natural
      await new Promise(resolve => setTimeout(resolve, 500));

      // Get response from Gemini API
      const responseText = await generateResponse(currentInput);
      
      const aiResponse = {
        id: Date.now() + 1,
        text: responseText,
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Save AI response to Firebase
      saveMessageToFirebase(aiResponse);
    } catch (error) {
      console.error('Error getting response:', error);
      
      // Add error message
      const errorResponse = {
        id: Date.now() + 1,
        text: "I'm having trouble connecting right now. Please try again later.",
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, errorResponse]);
      
      // Save error response to Firebase
      saveMessageToFirebase(errorResponse);
    } finally {
      setIsTyping(false);
      setIsSubmitting(false);
    }
  };

  // Function to render message text with markdown-like formatting
  const renderMessageText = (text) => {
    // Convert **bold** to <strong>
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Convert [link](url) to <a>
    formattedText = formattedText.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-[#00E676] underline hover:text-[#4eff9e] transition-colors">$1</a>');
    
    // Convert line breaks to <br>
    formattedText = formattedText.replace(/\n/g, '<br />');
    
    return <div dangerouslySetInnerHTML={{ __html: formattedText }} />;
  };

  return (
    <div className="fixed bottom-5 left-5 z-50">
      {/* Chat toggle button */}
      <button
        onClick={toggleChat}
        className="interactive w-14 h-14 rounded-full bg-[#00E676] text-[#001313] flex items-center justify-center shadow-lg hover:scale-105 transition-transform focus:outline-none focus:ring-2 focus:ring-[#004d28]"
        aria-label="Open chat with Syed Taha's AI assistant"
      >
        {isOpen ? <FaTimes size={20} /> : <FaRobot size={24} />}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div 
          className="absolute bottom-16 left-0 w-80 sm:w-96 h-[450px] bg-[#021728]/95 border border-[#063042] rounded-lg shadow-xl overflow-hidden flex flex-col animate-fade-in-up"
          role="dialog"
          aria-labelledby="chatbot-title"
        >
          {/* Chat header */}
          <div className="p-3 bg-[#041827] border-b border-[#063042] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#00E676]/20 flex items-center justify-center">
                <FaRobot className="text-[#00E676]" />
              </div>
              <div>
                <div id="chatbot-title" className="font-semibold text-white">Syed Taha's Assistant</div>
                <div className="text-xs text-gray-400">
                  {conversationId ? 
                    `ID: ${conversationId.substring(0, 8)}... • Powered by Gemini` : 
                    'Powered by Gemini'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={toggleConversationsList}
                className="interactive p-1 rounded-full hover:bg-[#063042] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E676]"
                aria-label="View conversation history"
                title="View conversation history"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button 
                onClick={toggleChat}
                className="interactive p-1 rounded-full hover:bg-[#063042] transition-colors focus:outline-none focus:ring-2 focus:ring-[#00E676]"
                aria-label="Close chat"
              >
                <FaTimes className="text-gray-400" />
              </button>
            </div>
          </div>

          {/* Conversation history panel */}
          {showConversations && (
            <div className="absolute inset-0 bg-[#021728] z-10 flex flex-col">
              <div className="bg-[#041827] border-b border-[#063042] p-3 flex justify-between items-center">
            <div className="flex items-center">
              <FaRobot className="text-[#00E676] mr-2" />
              <div>
                <h3 className="font-medium text-white">Conversation History</h3>
                <p className="text-xs text-gray-400">{pastConversations.length} conversation{pastConversations.length !== 1 ? 's' : ''}{conversationId ? ` (Current: ${conversationId.substring(0, 8)}...)` : ''}</p>
              </div>
            </div>
                <button 
                  onClick={toggleConversationsList}
                  className="text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#00E676] p-1 rounded-full"
                  aria-label="Close history"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-2">
                 <div className="flex gap-2 mb-2">
                   <button
                     onClick={startNewConversation}
                     className="flex-1 p-3 bg-[#041827] hover:bg-[#063042] text-[#00E676] rounded-lg flex items-center justify-center transition-colors border border-[#063042]"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                     </svg>
                     New Conversation
                   </button>
                   <button
                     onClick={clearAllConversations}
                     className="p-3 bg-[#041827] hover:bg-red-900 text-gray-400 hover:text-red-300 rounded-lg flex items-center justify-center transition-colors border border-[#063042]"
                     title="Clear all conversations"
                     aria-label="Clear all conversations"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                       <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                     </svg>
                   </button>
                 </div>
                
                {pastConversations.length === 0 ? (
                   <div className="text-center text-gray-400 p-4">
                     No past conversations found
                   </div>
                 ) : (
                   pastConversations.map(conversation => (
                     <div key={conversation.id} className="relative mb-2">
                       <button
                         onClick={() => switchConversation(conversation.id)}
                         className={`w-full p-3 text-left rounded-lg hover:bg-[#063042] transition-colors ${conversation.id === conversationId ? 'bg-[#063042] border border-[#00E676]/30' : 'bg-[#041827] border border-[#063042]'}`}
                       >
                         <div className="text-sm font-medium truncate text-white pr-8">{conversation.preview}</div>
                         <div className="text-xs text-gray-400 mt-1">
                           {new Date(conversation.lastMessageTime).toLocaleString()}
                         </div>
                       </button>
                       <div className="absolute top-2 right-2 flex space-x-1">
                          <button 
                            onClick={(e) => exportConversation(conversation.id, e)}
                            className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-[#063042] rounded-full transition-colors"
                            aria-label="Export conversation"
                            title="Export conversation"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button 
                            onClick={(e) => deleteConversation(conversation.id, e)}
                            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-[#063042] rounded-full transition-colors"
                            aria-label="Delete conversation"
                            title="Delete conversation"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                     </div>
                   ))
                 )}
              </div>
            </div>
          )}
          
          {/* Messages container */}
          <div className="flex-1 p-3 overflow-y-auto" aria-live="polite" role="log">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-3 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${message.sender === 'user' 
                    ? 'bg-[#00E676] text-[#001313]' 
                    : 'bg-[#041827]/80 border border-[#063042] text-white'}`}
                  role={message.sender === 'ai' ? 'status' : ''}
                >
                  {renderMessageText(message.text)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start mb-3">
                <div className="bg-[#041827]/80 border border-[#063042] p-3 rounded-lg text-white">
                  <div className="flex gap-1">
                    <span className="animate-bounce">●</span>
                    <span className="animate-bounce" style={{animationDelay: "0.2s"}}>●</span>
                    <span className="animate-bounce" style={{animationDelay: "0.4s"}}>●</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="p-3 bg-[#041827] border-t border-[#063042]">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about Syed Taha..."
                className="interactive flex-1 px-3 py-2 rounded bg-[#001a1f]/40 border border-[#022b35] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E676]"
                aria-label="Type your message"
                autoComplete="off"
              />
              <button
                onClick={handleSendMessage}
                disabled={inputValue.trim() === '' || isSubmitting}
                className="interactive p-2 rounded-full bg-[#00E676] text-[#001313] disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-[#004d28]"
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default GeminiChatbot;