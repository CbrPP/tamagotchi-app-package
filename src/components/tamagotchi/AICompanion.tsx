"use client";

import React, { useState, useEffect, useMemo } from 'react'; // Added React import
import { useTamagotchi } from './TamagotchiContext';
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Define a type for personality traits
interface Personality {
  friendliness: number;
  intelligence: number;
  humor: number;
  empathy: number;
  creativity: number;
}

export default function AICompanion() {
  const { tamagotchi } = useTamagotchi() || {}; // Handle null context
  const [personality, setPersonality] = useState<Personality>({
    friendliness: 50,
    intelligence: 50,
    humor: 50,
    empathy: 50,
    creativity: 50,
  });
  const [currentMood, setCurrentMood] = useState('Content');
  const [thought, setThought] = useState('...');

  // Calculate personality based on Tamagotchi stats and potentially DNA
  useEffect(() => {
    if (!tamagotchi?.stats) return; // Exit if tamagotchi or stats are null/undefined

    // Simple calculation example - make this more sophisticated
    const newPersonality: Personality = {
      // Use optional chaining and nullish coalescing for safety
      friendliness: 50 + Math.floor((tamagotchi.stats?.happiness ?? 0) / 2),
      intelligence: 50 + Math.floor((tamagotchi.dna?.traits?.intelligence ?? 0) * 10), // <<< Fixed line
      humor: 40 + Math.floor(Math.random() * 40), // Example random element
      empathy: 50 + Math.floor((tamagotchi.stats?.happiness ?? 0) / 4),
      creativity: 40 + Math.floor(Math.random() * 50) // Example random element
    };

    // Ensure values are within 0-100
    Object.keys(newPersonality).forEach(key => {
        const trait = key as keyof Personality;
        newPersonality[trait] = Math.max(0, Math.min(100, newPersonality[trait] || 0));
    });


    setPersonality(newPersonality);

  }, [tamagotchi?.stats, tamagotchi?.dna]); // Depend on stats and dna

  // Determine mood based on stats
   useEffect(() => {
     if (!tamagotchi?.stats) {
        setCurrentMood('Neutral');
        return;
     };

     const stats = tamagotchi.stats;
     if (stats.health < 40 || stats.hunger < 30 || stats.thirst < 30) {
       setCurrentMood('Unhappy 😟');
     } else if (stats.happiness < 40) {
       setCurrentMood('Sad 😞');
     } else if (stats.energy < 40) {
       setCurrentMood('Tired 😴');
     } else if (stats.happiness > 80 && stats.energy > 70) {
       setCurrentMood('Joyful 😄');
     } else {
       setCurrentMood('Content 🙂');
     }
   }, [tamagotchi?.stats]);


   // Simulate Tamagotchi thoughts (simple example)
   useEffect(() => {
     if (!tamagotchi) return;

     const thoughtInterval = setInterval(() => {
       const thoughts = [
         'Thinking about snacks...',
         'Wonder what my human is doing?',
         `Feeling ${currentMood}`,
         'Time for a nap soon?',
         'What new things can I learn?',
         'I wonder what I\'ll evolve into?',
         'Cleanliness is important!',
         'Feeling creative!',
         'Hope I get to play soon.'
       ];
       setThought(thoughts[Math.floor(Math.random() * thoughts.length)]);
     }, 15000); // Change thought every 15 seconds

     return () => clearInterval(thoughtInterval);
   }, [currentMood, tamagotchi]); // Rerun if mood or tamagotchi changes


  if (!tamagotchi) {
    return <div className="p-4 bg-gray-100 rounded-lg shadow text-center text-gray-500">Loading AI Companion...</div>;
  }

  // Helper to render personality traits with tooltips
  const renderTrait = (trait: keyof Personality, label: string) => (
    <div className="mb-2">
      <Label className="text-xs font-medium capitalize">{label}</Label>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
             <Progress value={personality[trait]} className="h-2" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{label}: {personality[trait]}%</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-center text-lg">AI Companion: {tamagotchi.name}</CardTitle>
        <CardDescription className="text-center text-sm">Personality & Mood</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
         <div className="text-center p-3 bg-blue-50 rounded-md">
           <p className="text-sm font-medium text-blue-800">Current Mood:</p>
           <p className="text-lg font-semibold">{currentMood}</p>
         </div>

          <div className="text-center p-3 bg-purple-50 rounded-md">
           <p className="text-sm font-medium text-purple-800">Current Thought:</p>
           <p className="text-base italic text-gray-700">"{thought}"</p>
         </div>


        <div>
          <h4 className="font-semibold mb-2 text-center text-sm">Personality Traits</h4>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
             {renderTrait('friendliness', 'Friendliness')}
             {renderTrait('intelligence', 'Intelligence')}
             {renderTrait('humor', 'Humor')}
             {renderTrait('empathy', 'Empathy')}
             {renderTrait('creativity', 'Creativity')}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Helper components assumed to be imported or defined elsewhere:
const Card: React.FC<any> = ({ children, ...props }) => <div {...props}>{children}</div>;
const CardHeader: React.FC<any> = ({ children, ...props }) => <div {...props}>{children}</div>;
const CardTitle: React.FC<any> = ({ children, ...props }) => <h3 {...props}>{children}</h3>;
const CardDescription: React.FC<any> = ({ children, ...props }) => <p {...props}>{children}</p>;
const CardContent: React.FC<any> = ({ children, ...props }) => <div {...props}>{children}</div>;
const Label: React.FC<any> = ({ children, ...props }) => <label {...props}>{children}</label>;