"use client";

import { useState } from 'react';

export default function AIPage() {
  const [messages, setMessages] = useState([
    { role: 'tamagotchi', content: 'Hi there! I\'m your Tamagotchi companion. How can I help you today?', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // In a real implementation, we would use the actual Tamagotchi context
  // For now, we'll just show a placeholder
  
  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);
    
    // Simulate AI processing
    setTimeout(() => {
      generateResponse(inputMessage);
      setIsProcessing(false);
    }, 1000);
  };

  const generateResponse = (userInput) => {
    // In a real app, this would use a proper AI model
    // This is a simplified simulation
    
    // Detect intent from user input
    const lowerInput = userInput.toLowerCase();
    let response = '';
    
    // Check for greetings
    if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      const greetings = [
        `Hello! How are you doing today?`,
        `Hi there! What's up?`,
        `Hey! Nice to chat with you!`
      ];
      response = greetings[Math.floor(Math.random() * greetings.length)];
    }
    // Check for questions about tamagotchi
    else if (lowerInput.includes('how are you') || lowerInput.includes('feeling')) {
      response = `I'm feeling great today! Thanks for asking.`;
    }
    // Check for questions about evolution
    else if (lowerInput.includes('evolution') || lowerInput.includes('evolve')) {
      response = `I can evolve into different forms based on how you take care of me. The better you take care of me, the faster I'll evolve!`;
    }
    // Check for health advice
    else if (lowerInput.includes('health') || lowerInput.includes('advice') || lowerInput.includes('tip')) {
      const healthTips = [
        "Remember to drink plenty of water throughout the day!",
        "Try to get at least 30 minutes of exercise daily.",
        "Don't forget to take short breaks when working at a computer.",
        "Eating colorful fruits and vegetables helps maintain good health.",
        "A good night's sleep is essential for both of us!",
        "Meditation can help reduce stress and improve mental clarity."
      ];
      response = `Here's a health tip: ${healthTips[Math.floor(Math.random() * healthTips.length)]}`;
    }
    // Default responses
    else {
      const defaultResponses = [
        "That's interesting! Tell me more.",
        "I'm still learning about that topic.",
        "I'm not sure I understand, but I'm trying!",
        "Could you explain that differently?",
        "I wish I knew more about that!"
      ];
      response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    // Add tamagotchi message
    const tamagotchiMessage = {
      role: 'tamagotchi',
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, tamagotchiMessage]);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <a href="/" className="text-xl font-bold text-blue-600">
                  Tamagotchi Life Coach
                </a>
              </div>
              <nav className="ml-6 flex space-x-8">
                <a href="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Dashboard
                </a>
                <a href="/care" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Care
                </a>
                <a href="/evolution" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Evolution
                </a>
                <a href="/lifestyle" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Lifestyle
                </a>
                <a href="/ai" className="inline-flex items-center px-1 pt-1 border-b-2 border-indigo-500 text-sm font-medium text-indigo-600">
                  AI Chat
                </a>
                <a href="/breeding" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Breeding
                </a>
                <a href="/marketplace" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Marketplace
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <a href="/login" className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Login
              </a>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow p-6">
              <h1 className="text-2xl font-bold mb-6">AI Companion</h1>
              
              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2">Personality Traits</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Friendliness:</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: '75%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Playfulness:</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-yellow-500" 
                        style={{ width: '60%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Intelligence:</span>
                      <span>50%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500" 
                        style={{ width: '50%' }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm">
                      <span>Sassiness:</span>
                      <span>30%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500" 
                        style={{ width: '30%' }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Chat Messages */}
              <div className="bg-gray-50 rounded-lg p-4 h-80 overflow-y-auto mb-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`mb-3 ${message.role === 'user' ? 'text-right' : ''}`}
                  >
                    <div 
                      className={`inline-block max-w-3/4 rounded-lg p-3 ${
                        message.role === 'user' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isProcessing && (
                  <div className="mb-3">
                    <div className="inline-block bg-green-100 text-green-800 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Input Area */}
              <div className="flex items-center">
                <button 
                  className="bg-purple-100 hover:bg-purple-200 text-purple-800 p-2 rounded-full mr-2"
                  title="Share an image"
                >
                  📷
                </button>
                <button 
                  className="bg-blue-100 text-blue-800 hover:bg-opacity-80 p-2 rounded-full mr-2"
                  title="Voice input"
                >
                  🎤
                </button>
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Message your Tamagotchi..."
                  className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  disabled={isProcessing}
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isProcessing}
                  className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full ml-2 disabled:opacity-50"
                >
                  ➤
                </button>
              </div>
              
              <div className="mt-6 p-3 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-1">AI Interaction Features</h3>
                <p className="text-sm">
                  Your Tamagotchi's personality evolves based on how you care for it and interact with it.
                  You can chat, share images, and use voice commands to communicate with your pet.
                  The more you interact, the more its unique personality will develop!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            &copy; 2025 Tamagotchi Life Coach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
