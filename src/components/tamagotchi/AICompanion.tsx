import { useEffect, useState } from 'react';
import { useTamagotchi } from './TamagotchiContext';
import { useUser } from '../auth/UserContext';

export default function AICompanion() {
  const { tamagotchi } = useTamagotchi();
  const { user } = useUser();
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<Array<{sender: string, text: string, timestamp: Date}>>([]);
  const [thinking, setThinking] = useState(false);
  const [personality, setPersonality] = useState({
    friendliness: 70,
    intelligence: 60,
    humor: 50,
    empathy: 65,
    creativity: 55
  });

  // Initialize with a greeting
  useEffect(() => {
    if (!tamagotchi) return;
    
    // Add initial greeting
    const greeting = getGreeting();
    setConversation([{
      sender: 'tamagotchi',
      text: greeting,
      timestamp: new Date()
    }]);
    
    // Generate personality based on tamagotchi traits
    generatePersonality();
  }, [tamagotchi]);

  const generatePersonality = () => {
    if (!tamagotchi) return;
    
    // In a real app, this would be more sophisticated and based on the tamagotchi's evolution and care history
    const newPersonality = {
      friendliness: 50 + Math.floor(tamagotchi.stats.happiness / 2),
      intelligence: 50 + Math.floor(tamagotchi.dna.traits.intelligence * 10),
      humor: 40 + Math.floor(Math.random() * 40),
      empathy: 50 + Math.floor(tamagotchi.stats.happiness / 4),
      creativity: 40 + Math.floor(Math.random() * 50)
    };
    
    setPersonality(newPersonality);
  };

  const getGreeting = () => {
    if (!tamagotchi) return "Hello!";
    
    const greetings = [
      `Hi there! I'm ${tamagotchi.name}. How are you today?`,
      `Hello! I'm so happy to chat with you!`,
      `Hey! What's up? I've been waiting to talk to you!`,
      `*waves excitedly* Hi! Let's have a fun conversation!`,
      `Greetings, friend! What would you like to talk about today?`
    ];
    
    return greetings[Math.floor(Math.random() * greetings.length)];
  };

  const handleSendMessage = () => {
    if (!message.trim() || !tamagotchi) return;
    
    // Add user message to conversation
    const userMessage = {
      sender: 'user',
      text: message,
      timestamp: new Date()
    };
    
    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setThinking(true);
    
    // Simulate AI thinking time
    setTimeout(() => {
      generateResponse(message);
      setThinking(false);
    }, 1000);
  };

  const generateResponse = (userMessage: string) => {
    if (!tamagotchi) return;
    
    // In a real app, this would use a proper AI model
    // This is a simple rule-based response system for demonstration
    
    const lowercaseMessage = userMessage.toLowerCase();
    let response = '';
    
    // Check for greetings
    if (lowercaseMessage.includes('hello') || lowercaseMessage.includes('hi') || lowercaseMessage.includes('hey')) {
      response = `Hi there! It's great to chat with you!`;
    }
    // Check for how are you
    else if (lowercaseMessage.includes('how are you')) {
      if (tamagotchi.stats.happiness > 70) {
        response = `I'm feeling great! My happiness is at ${tamagotchi.stats.happiness}%!`;
      } else if (tamagotchi.stats.happiness > 40) {
        response = `I'm doing okay. Could use a bit more play time though!`;
      } else {
        response = `I'm not feeling so good... Could you help me feel better?`;
      }
    }
    // Check for hunger related
    else if (lowercaseMessage.includes('hungry') || lowercaseMessage.includes('food') || lowercaseMessage.includes('eat')) {
      if (tamagotchi.stats.hunger < 30) {
        response = `Yes, I'm really hungry! My hunger level is at ${tamagotchi.stats.hunger}%. Could you feed me please?`;
      } else if (tamagotchi.stats.hunger < 70) {
        response = `I could eat something. My hunger level is at ${tamagotchi.stats.hunger}%.`;
      } else {
        response = `I'm pretty full right now, thanks! My hunger level is at ${tamagotchi.stats.hunger}%.`;
      }
    }
    // Check for evolution questions
    else if (lowercaseMessage.includes('evolve') || lowercaseMessage.includes('evolution') || lowercaseMessage.includes('grow')) {
      response = `I'm currently a ${tamagotchi.evolutionType}! With good care, I might evolve into something special. Keep taking care of me!`;
    }
    // Check for health questions
    else if (lowercaseMessage.includes('health') || lowercaseMessage.includes('sick') || lowercaseMessage.includes('feel')) {
      if (tamagotchi.status.isSick) {
        response = `I'm not feeling well... I think I'm sick. Could you give me some medicine?`;
      } else if (tamagotchi.stats.health < 50) {
        response = `I'm not at my best. My health is at ${tamagotchi.stats.health}%. Better care would help me feel better!`;
      } else {
        response = `I'm feeling healthy! My health is at ${tamagotchi.stats.health}%. Thanks for taking good care of me!`;
      }
    }
    // Check for play requests
    else if (lowercaseMessage.includes('play') || lowercaseMessage.includes('game') || lowercaseMessage.includes('fun')) {
      response = `I'd love to play! You can use the play button in the care menu. Games make me happy!`;
    }
    // Check for sleep related
    else if (lowercaseMessage.includes('sleep') || lowercaseMessage.includes('tired') || lowercaseMessage.includes('rest')) {
      if (tamagotchi.status.isSleeping) {
        response = `Zzz... Oh! You woke me up. I was sleeping...`;
      } else if (tamagotchi.stats.energy < 30) {
        response = `I am feeling pretty tired. My energy is at ${tamagotchi.stats.energy}%. Maybe I should get some sleep soon.`;
      } else {
        response = `I'm not tired right now. My energy level is at ${tamagotchi.stats.energy}%.`;
      }
    }
    // Default responses
    else {
      const defaultResponses = [
        `That's interesting! Tell me more about that.`,
        `I'm still learning about many things. What else would you like to talk about?`,
        `I enjoy our conversations! What else is on your mind?`,
        `That's cool! I wish I knew more about that.`,
        `I'm glad we're chatting! Is there anything you'd like to know about me?`
      ];
      response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    // Add personality-based flourishes
    if (personality.humor > 70) {
      response += " 😄";
    }
    
    if (personality.empathy > 70 && lowercaseMessage.includes('sad') || lowercaseMessage.includes('bad') || lowercaseMessage.includes('upset')) {
      response = `I'm sorry to hear that. I hope things get better soon! ` + response;
    }
    
    // Add tamagotchi message to conversation
    const tamagotchiMessage = {
      sender: 'tamagotchi',
      text: response,
      timestamp: new Date()
    };
    
    setConversation(prev => [...prev, tamagotchiMessage]);
  };

  if (!tamagotchi) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Chat with {tamagotchi.name}</h2>
      
      <div className="h-64 overflow-y-auto mb-4 p-3 bg-gray-50 rounded-lg">
        {conversation.map((msg, index) => (
          <div 
            key={index} 
            className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div 
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.sender === 'user' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {msg.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>
          </div>
        ))}
        
        {thinking && (
          <div className="text-left mb-2">
            <div className="inline-block px-3 py-2 rounded-lg bg-gray-200 text-gray-800">
              <span className="inline-block animate-bounce">.</span>
              <span className="inline-block animate-bounce delay-100">.</span>
              <span className="inline-block animate-bounce delay-200">.</span>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type a message..."
          className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          disabled={thinking}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r-lg transition-colors disabled:bg-blue-300"
        >
          Send
        </button>
      </div>
      
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Personality Traits</h3>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(personality).map(([trait, value]) => (
            <div key={trait} className="text-sm">
              <div className="flex justify-between">
                <span className="capitalize">{trait}</span>
                <span>{value}%</span>
              </div>
              <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ width: `${value}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
