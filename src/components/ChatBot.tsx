import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Send } from 'lucide-react';
import { ChatMessage } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { chatbotResponses } from '../data/mockData';

const INITIAL_MESSAGE: ChatMessage = {
  id: '1',
  text: "Hello! I'm your Instagram AI assistant. I can help you with growth strategies, posting times, engagement tips, and hashtag usage. What would you like to know?",
  isBot: true,
  timestamp: Date.now(),
};

export const ChatBot = () => {
  const [messages, setMessages] = useLocalStorage<ChatMessage[]>('chat_messages', [INITIAL_MESSAGE]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: Date.now(),
    };

    setMessages([...messages, userMessage]);
    setMessage('');

    // Get response from chatbot
    const botResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      text: chatbotResponses.getResponse(message),
      isBot: true,
      timestamp: Date.now() + 1,
    };
    
    setTimeout(() => {
      setMessages(prev => [...prev, botResponse]);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Instagram Assistant
        </h2>

        <div className="bg-gray-900 rounded-xl p-6 border border-purple-600/30">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">AI Assistant</h3>
              <p className="text-gray-400">Ask me about Instagram strategies</p>
            </div>
          </div>

          <div className="h-[400px] mb-6 overflow-y-auto space-y-4 p-4 bg-gray-800 rounded-lg">
            <AnimatePresence>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`p-4 rounded-lg max-w-[80%] ${
                    msg.isBot
                      ? 'bg-purple-600/20 mr-auto'
                      : 'bg-purple-600 ml-auto'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          <div className="flex space-x-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about Instagram strategies..."
              className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500"
            />
            <button
              onClick={handleSendMessage}
              className="px-4 py-2 bg-purple-600 rounded-lg flex items-center space-x-2 hover:bg-purple-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};