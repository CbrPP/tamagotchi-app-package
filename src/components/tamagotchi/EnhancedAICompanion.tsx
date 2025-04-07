"use client";

import React, { useState, useEffect, useCallback } from 'react'; // Use useCallback
import { useTamagotchi } from './TamagotchiContext';
// --- ADDED UI IMPORTS ---
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { SendHorizontal, Mic, Camera } from 'lucide-react'; // Import icons
// ------------------------

// Define a type for personality traits
interface Personality {
  friendliness: number;
  playfulness: number;
  intelligence: number;
  sassiness: number;
}

// Define message structure
interface Message {
  role: 'user' | 'tamagotchi';
  content: string;
  timestamp: Date;
}

export default function EnhancedAICompanion() {
  const { tamagotchi } = useTamagotchi() || {};
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [personalityTraits, setPersonalityTraits] = useState<Personality>({
    friendliness: 0.7, playfulness: 0.6, intelligence: 0.5, sassiness: 0.3
  });

  // Initialize with a welcome message
  useEffect(() => {
    if (tamagotchi && messages.length === 0) {
      const welcomeMessage: Message = { role: 'tamagotchi', content: `Hi there! I'm ${tamagotchi.name ?? 'your companion'}. How can I help you today?`, timestamp: new Date() };
      setMessages([welcomeMessage]);
    }
  }, [tamagotchi, messages.length]);

  // Evolve personality based on interactions
  useEffect(() => {
    if (!tamagotchi?.stats) return;
    const interval = setInterval(() => {
      setPersonalityTraits(prev => {
        const intelTrait = tamagotchi.dna?.traits?.intelligence ?? 0.5; // Default to 0.5 if missing
        const happiness = tamagotchi.stats?.happiness ?? 50;
        const energy = tamagotchi.stats?.energy ?? 50;
        const hunger = tamagotchi.stats?.hunger ?? 50;
        const intelligenceBoost = intelTrait * 0.05;
        const friendlinessBoost = happiness > 70 ? 0.03 : -0.03;
        const playfulnessBoost = energy > 60 ? 0.02 : -0.02;
        const sassinessBoost = hunger < 40 ? 0.04 : -0.01;
        return {
          intelligence: Math.min(1, Math.max(0.1, (prev.intelligence || 0.5) + intelligenceBoost)),
          friendliness: Math.min(1, Math.max(0.1, (prev.friendliness || 0.5) + friendlinessBoost)),
          playfulness: Math.min(1, Math.max(0.1, (prev.playfulness || 0.5) + playfulnessBoost)),
          sassiness: Math.min(1, Math.max(0.1, (prev.sassiness || 0.2) + sassinessBoost))
        };
      });
    }, 60000);
    return () => clearInterval(interval);
  }, [tamagotchi?.stats, tamagotchi?.dna]); // Safe dependencies

  // Generate AI Response Logic (wrapped in useCallback)
  const generateResponse = useCallback((userInput: string) => {
    if (!tamagotchi?.stats || !tamagotchi?.status) return;

    const lowerInput = userInput.toLowerCase();
    let response = '';
    const stats = tamagotchi.stats;
    const status = tamagotchi.status;
    const evolutionStageValue = tamagotchi?.evolution?.stage;
    let evolutionStageNumber = 0;
    if (typeof evolutionStageValue === 'number') { evolutionStageNumber = evolutionStageValue; }
    else if (typeof evolutionStageValue === 'string') { evolutionStageNumber = parseInt(evolutionStageValue, 10) || 0; }
    const isEligibleForBreeding = (tamagotchi.age ?? 0) >= 15 && (stats.health ?? 0) >= 70 && !(status.isSick ?? true) && evolutionStageNumber >= 2;

    // Simplified response logic
    if (lowerInput.includes('hello') || lowerInput.includes('hi')) { response = `Hi there! Feeling about ${stats.happiness ?? 50}% happy right now.`; }
    else if (lowerInput.includes('how are you')) { response = `Doing okay! Energy: ${stats.energy ?? '?'}, Health: ${stats.health ?? '?'}.`; if (status.isSick) response += " Feeling sick though."; }
    else if (lowerInput.includes('evolution')) { response = `I'm a ${tamagotchi.evolutionStage ?? 'creature'} (Stage ${evolutionStageNumber}).`; }
    else if (lowerInput.includes('breed')) { response = isEligibleForBreeding ? `Ready to breed!` : `Not ready for breeding yet (Stage ${evolutionStageNumber}/2 needed).`; }
    else if (lowerInput.includes('advice')) { response = "Remember to take breaks!"; }
    else if (lowerInput.includes('love')) { response = `Aww, thanks! ❤️`; }
    else { response = "Interesting point!"; }

    // Personality injection
    if (personalityTraits.sassiness > 0.7 && Math.random() < 0.2) response += " Pfft.";
    if (personalityTraits.friendliness > 0.8 && Math.random() < 0.3) response += " 😊";
    if (personalityTraits.playfulness > 0.7 && Math.random() < 0.2) response += " Let's play!";

    const tamagotchiMessage: Message = { role: 'tamagotchi', content: response, timestamp: new Date() };
    setMessages(prev => [...prev, tamagotchiMessage]);
  }, [tamagotchi, personalityTraits]); // Added personalityTraits dependency


  const handleSendMessage = useCallback(() => { // Wrap in useCallback
    if (!inputMessage.trim() || !tamagotchi) return;
    const userMessage: Message = { role: 'user', content: inputMessage, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsProcessing(true);
    setTimeout(() => { generateResponse(inputMessage); setIsProcessing(false); }, 1000);
  }, [inputMessage, tamagotchi, generateResponse]); // Add dependencies

  const handleKeyPress = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => { // Wrap in useCallback
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  }, [handleSendMessage]); // Add dependencies


  const handleImageUpload = useCallback(() => { // Wrap in useCallback
     setShowImageUpload(false); setIsProcessing(true);
     setTimeout(() => { const responses = ["Nice pic!", "What's that?", "Cool!", "Interesting image."]; const msg = { role: 'tamagotchi' as const, content: responses[Math.floor(Math.random()*responses.length)], timestamp: new Date() }; setMessages(p=>[...p, msg]); setIsProcessing(false); }, 1500);
  }, []); // No external dependencies

  const toggleVoiceInput = useCallback(() => { // Wrap in useCallback
     setIsListening(prev => {
         const nextIsListening = !prev;
         if (nextIsListening) {
             // Simulate voice recognition starting
             setTimeout(() => {
                 const texts = ["How are you?", "Tell me a joke.", "What's my health?"];
                 setInputMessage(texts[Math.floor(Math.random()*texts.length)]);
                 setIsListening(false); // Simulate recognition ending
             }, 2000);
         }
         // else: Handle cancellation if needed
         return nextIsListening;
     });
  }, []); // No external dependencies


  if (!tamagotchi) { return <div className="p-4 bg-gray-100 rounded-lg shadow text-center text-gray-500">Loading AI Companion...</div>; }

  // Helper to render personality traits safely
  const renderTrait = (trait: keyof Personality, label: string, colorClass: string) => (
    <div>
      <div className="flex justify-between text-sm font-medium text-gray-700">
         <Label className="capitalize">{label}:</Label>
         <span>{Math.round((personalityTraits[trait] || 0) * 100)}%</span>
      </div>
       <TooltipProvider delayDuration={100}>
         <Tooltip>
           <TooltipTrigger asChild>
              {/* Removed indicatorClassName, styling via className or default */}
              <Progress value={(personalityTraits[trait] || 0) * 100} className={`h-2 ${colorClass.replace('bg-', ' [&>*]:bg-')}`} />
           </TooltipTrigger>
           <TooltipContent><p>{label}: Detailed description here...</p></TooltipContent>
         </Tooltip>
       </TooltipProvider>
    </div>
  );

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-lg">AI Companion: {tamagotchi.name}</CardTitle>
        <CardDescription className="text-sm">Personality & Mood</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
         {/* Personality Display */}
        <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-gray-200">
          <h3 className="font-semibold mb-2 text-center text-sm text-gray-600 uppercase tracking-wider">Personality Profile</h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2">
             {renderTrait('friendliness', 'Friendliness', 'bg-green-500')}
             {renderTrait('playfulness', 'Playfulness', 'bg-yellow-500')}
             {renderTrait('intelligence', 'Intelligence', 'bg-blue-500')}
             {renderTrait('sassiness', 'Sassiness', 'bg-purple-500')}
          </div>
        </div>

         {/* Chat Messages */}
         <div className="bg-gray-100 rounded-lg p-3 h-64 overflow-y-auto border border-gray-200">
            {messages.map((message, index) => (
              <div key={index} className={`mb-2 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`inline-block max-w-[80%] rounded-lg px-3 py-2 text-sm ${ message.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none' }`}>
                  <p>{message.content}</p>
                   <p className={`text-xs mt-1 ${message.role === 'user' ? 'text-blue-200' : 'text-gray-400'}`}> {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} </p>
                </div>
              </div>
            ))}
            {isProcessing && ( <div className="flex justify-start mb-2"><div className="inline-block bg-white text-gray-800 rounded-lg p-3 border border-gray-200"><div className="flex space-x-1 items-center"><div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></div><div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div><div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div></div></div></div> )}
         </div>

        {/* Image Upload UI */}
         {showImageUpload && (<div className="my-2 p-4 border-2 border-dashed border-gray-300 rounded-lg text-center"><p className="mb-2 text-sm">Upload an image (feature simulated)</p><Button onClick={handleImageUpload} size="sm">Select</Button><Button variant="ghost" size="sm" onClick={() => setShowImageUpload(false)} className="ml-2 text-xs">Cancel</Button></div>)}

         {/* Input Area */}
        <div className="flex items-center space-x-2">
          <TooltipProvider><Tooltip><TooltipTrigger asChild><Button onClick={() => setShowImageUpload(true)} variant="outline" size="icon" className="w-9 h-9 flex-shrink-0"><Camera className="h-4 w-4"/></Button></TooltipTrigger><TooltipContent><p>Share Image (Simulated)</p></TooltipContent></Tooltip></TooltipProvider>
          <TooltipProvider><Tooltip><TooltipTrigger asChild><Button onClick={toggleVoiceInput} variant="outline" size="icon" className={`w-9 h-9 flex-shrink-0 ${isListening ? 'text-red-600 animate-pulse' : ''}`}><Mic className="h-4 w-4"/></Button></TooltipTrigger><TooltipContent><p>{isListening ? 'Listening... (Simulated)' : 'Voice Input (Simulated)'}</p></TooltipContent></Tooltip></TooltipProvider>
          <Input
            type="text" value={inputMessage} onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Message ${tamagotchi.name}...`}
            className="flex-1 h-9" // Adjusted height
            disabled={isProcessing || isListening} />
           <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isProcessing} size="icon" className="w-9 h-9 flex-shrink-0"> {/* Adjusted size */}
             <SendHorizontal className="h-4 w-4"/>
           </Button>
        </div>
      </CardContent>
    </Card>
  );
}