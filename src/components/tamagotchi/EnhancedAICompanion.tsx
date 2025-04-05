"use client";

import { useEffect, useState } from 'react';
import { useTamagotchi } from './TamagotchiContext';

export default function EnhancedAICompanion() {
  const { tamagotchi } = useTamagotchi();
  const [messages, setMessages] = useState<Array<{role: 'user' | 'tamagotchi', content: string, timestamp: Date}>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [personalityTraits, setPersonalityTraits] = useState({
    friendliness: 0.7,
    playfulness: 0.6,
    intelligence: 0.5,
    sassiness: 0.3
  });

  // Initialize with a welcome message
  useEffect(() => {
    if (tamagotchi && messages.length === 0) {
      const welcomeMessage = {
        role: 'tamagotchi' as const,
        content: `Hi there! I'm ${tamagotchi.name}. How can I help you today?`,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [tamagotchi, messages.length]);

  // Evolve personality based on interactions
  useEffect(() => {
    if (!tamagotchi) return;
    
    // In a real app, this would be more sophisticated and persistent
    const interval = setInterval(() => {
      setPersonalityTraits(prev => {
        // Personality evolves based on tamagotchi stats and care
        const intelligenceBoost = tamagotchi.dna.traits.intelligence * 0.1;
        const friendlinessBoost = tamagotchi.stats.happiness > 70 ? 0.05 : -0.05;
        const playfulnessBoost = tamagotchi.stats.energy > 60 ? 0.03 : -0.03;
        const sassinessBoost = tamagotchi.stats.hunger < 40 ? 0.07 : -0.02;
        
        return {
          intelligence: Math.min(1, Math.max(0.1, prev.intelligence + intelligenceBoost)),
          friendliness: Math.min(1, Math.max(0.1, prev.friendliness + friendlinessBoost)),
          playfulness: Math.min(1, Math.max(0.1, prev.playfulness + playfulnessBoost)),
          sassiness: Math.min(1, Math.max(0.1, prev.sassiness + sassinessBoost))
        };
      });
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [tamagotchi]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !tamagotchi) return;
    
    // Add user message
    const userMessage = {
      role: 'user' as const,
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

  const generateResponse = (userInput: string) => {
    if (!tamagotchi) return;
    
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
      if (tamagotchi.stats.happiness > 80) {
        response = `I'm feeling great! My happiness is at ${tamagotchi.stats.happiness}%!`;
      } else if (tamagotchi.stats.happiness > 50) {
        response = `I'm doing okay. Could use a bit more fun though!`;
      } else {
        response = `Not so good... I could really use some attention.`;
      }
      
      // Add details based on other stats
      if (tamagotchi.stats.hunger < 30) {
        response += ` I'm really hungry right now.`;
      }
      if (tamagotchi.stats.thirst < 30) {
        response += ` I could use something to drink.`;
      }
      if (tamagotchi.status.isSick) {
        response += ` And I'm not feeling well - I think I'm sick.`;
      }
    }
    // Check for questions about evolution
    else if (lowerInput.includes('evolution') || lowerInput.includes('evolve')) {
      response = `I'm currently a ${tamagotchi.evolutionType} at evolution stage ${tamagotchi.evolution.stage}. My evolution progress is at ${tamagotchi.evolution.currentProgress}%. The better you take care of me, the faster I'll evolve!`;
    }
    // Check for questions about breeding
    else if (lowerInput.includes('breed') || lowerInput.includes('mate')) {
      if (tamagotchi.age >= 15 && tamagotchi.stats.health >= 70 && tamagotchi.evolution.stage >= 2) {
        response = `I'm eligible for breeding! You can visit the Breeding section to find me a mate.`;
      } else {
        response = `I'm not ready for breeding yet. I need to be at least 15 days old, have 70% health, and be at evolution stage 2.`;
      }
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
    // Check for compliments
    else if (lowerInput.includes('love you') || lowerInput.includes('great') || lowerInput.includes('awesome') || lowerInput.includes('cool')) {
      const complimentResponses = [
        "Aww, thank you! I appreciate that!",
        "You're the best owner I could ask for!",
        "That makes me so happy to hear!",
        "I'm blushing! If I could blush, that is."
      ];
      response = complimentResponses[Math.floor(Math.random() * complimentResponses.length)];
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
    
    // Modify response based on personality traits
    if (personalityTraits.sassiness > 0.7 && Math.random() < 0.3) {
      const sassyAdditions = [
        " ...obviously.",
        " Duh!",
        " Took you long enough to ask!",
        " I thought you'd never ask.",
        " Not that you asked in the best way, but whatever."
      ];
      response += sassyAdditions[Math.floor(Math.random() * sassyAdditions.length)];
    }
    
    if (personalityTraits.friendliness > 0.8 && Math.random() < 0.4) {
      const friendlyAdditions = [
        " I'm so glad we're friends!",
        " You're the best!",
        " I really enjoy our chats.",
        " Thanks for taking such good care of me!"
      ];
      response += friendlyAdditions[Math.floor(Math.random() * friendlyAdditions.length)];
    }
    
    if (personalityTraits.playfulness > 0.7 && Math.random() < 0.3) {
      const playfulAdditions = [
        " Wanna play a game after this?",
        " *does a little dance*",
        " *bounces excitedly*",
        " This is fun!"
      ];
      response += playfulAdditions[Math.floor(Math.random() * playfulAdditions.length)];
    }
    
    // Add tamagotchi message
    const tamagotchiMessage = {
      role: 'tamagotchi' as const,
      content: response,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, tamagotchiMessage]);
  };

  const handleImageUpload = () => {
    // In a real app, this would handle actual image uploads
    setShowImageUpload(false);
    
    // Simulate processing an image
    setIsProcessing(true);
    
    setTimeout(() => {
      const imageResponses = [
        "I can see that's a picture of food! Looks delicious, now I'm hungry!",
        "Is that a park? I love the outdoors! Taking me for a walk would be great for both of us.",
        "That looks like exercise equipment! Regular workouts are great for maintaining health.",
        "Is that your pet? They look friendly! I wish I could play with them.",
        "Nice selfie! You're looking great today!"
      ];
      
      const tamagotchiMessage = {
        role: 'tamagotchi' as const,
        content: imageResponses[Math.floor(Math.random() * imageResponses.length)],
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, tamagotchiMessage]);
      setIsProcessing(false);
    }, 2000);
  };

  const toggleVoiceInput = () => {
    // In a real app, this would use the Web Speech API
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice recognition
      setTimeout(() => {
        const voiceTexts = [
          "How are you feeling today?",
          "What should I eat for dinner?",
          "Can you recommend an exercise routine?",
          "Tell me about your evolution"
        ];
        
        setInputMessage(voiceTexts[Math.floor(Math.random() * voiceTexts.length)]);
        setIsListening(false);
      }, 3000);
    }
  };

  if (!tamagotchi) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Chat with {tamagotchi.name}</h2>
      
      {/* Personality Display */}
      <div className="mb-4 p-3 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Personality Traits</h3>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <div className="flex justify-between text-sm">
              <span>Friendliness:</span>
              <span>{Math.round(personalityTraits.friendliness * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-green-500" 
                style={{ width: `${personalityTraits.friendliness * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span>Playfulness:</span>
              <span>{Math.round(personalityTraits.playfulness * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500" 
                style={{ width: `${personalityTraits.playfulness * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span>Intelligence:</span>
              <span>{Math.round(personalityTraits.intelligence * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-500" 
                style={{ width: `${personalityTraits.intelligence * 100}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm">
              <span>Sassiness:</span>
              <span>{Math.round(personalityTraits.sassiness * 100)}%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-500" 
                style={{ width: `${personalityTraits.sassiness * 100}%` }}
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
      
      {/* Image Upload UI */}
      {showImageUpload && (
        <div className="mb-4 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center">
          <p className="mb-2">Upload an image to share with {tamagotchi.name}</p>
          <button 
            onClick={handleImageUpload}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Select Image
          </button>
          <button 
            onClick={() => setShowImageUpload(false)}
            className="ml-2 text-gray-500 hover:text-gray-700"
          >
            Cancel
          </button>
        </div>
      )}
      
      {/* Input Area */}
      <div className="flex items-center">
        <button 
          onClick={() => setShowImageUpload(true)}
          className="bg-purple-100 hover:bg-purple-200 text-purple-800 p-2 rounded-full mr-2"
          title="Share an image"
        >
          📷
        </button>
        <button 
          onClick={toggleVoiceInput}
          className={`${
            isListening ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
          } hover:bg-opacity-80 p-2 rounded-full mr-2`}
          title="Voice input"
        >
          🎤
        </button>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder={`Message ${tamagotchi.name}...`}
          className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
          disabled={isProcessing || isListening}
        />
        <button 
          onClick={handleSendMessage}
          disabled={!inputMessage.trim() || isProcessing}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full ml-2 disabled:opacity-50"
        >
          ➤
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-1">AI Interaction Features</h3>
        <p className="text-sm">
          Your Tamagotchi's personality evolves based on how you care for it and interact with it.
          You can chat, share images, and use voice commands to communicate with your pet.
          The more you interact, the more its unique personality will develop!
        </p>
      </div>
    </div>
  );
}
