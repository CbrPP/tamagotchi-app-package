"use client";

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useTamagotchi } from '@/components/tamagotchi/TamagotchiContext'; // Assuming context path
import { TreeDeciduous, Star, Zap } from 'lucide-react'; // Example icons

// Define a type for evolution paths (replace with actual structure if available)
interface EvolutionPath {
  id: string;
  name: string;
  description: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Legendary';
  unlocked: boolean;
  requirements?: string[];
  imageUrl?: string; // Optional image for the evolved form
}

// Simulated evolution data (replace with actual data source)
const simulatedEvolutionPaths: EvolutionPath[] = [
  { id: 'evo1', name: 'Basic Adult', description: 'A standard adult form achieved through balanced care.', rarity: 'Common', unlocked: true, imageUrl: '/tamagotchi-adult1.png' },
  { id: 'evo2', name: 'Happy Go Lucky', description: 'Evolves when happiness is consistently high.', rarity: 'Uncommon', unlocked: true, requirements: ['Happiness > 80% for 3 days'], imageUrl: '/tamagotchi-adult2.png' },
  { id: 'evo3', name: 'Grumpy Gus', description: 'Results from neglecting happiness and play.', rarity: 'Uncommon', unlocked: false, requirements: ['Happiness < 30% for 2 days'], imageUrl: '/tamagotchi-adult3.png' },
  { id: 'evo4', name: 'Gourmand', description: 'Achieved by focusing heavily on feeding.', rarity: 'Rare', unlocked: false, requirements: ['Feed count > 10 times daily', 'Maintain high weight'], imageUrl: '/tamagotchi-adult4.png' },
  { id: 'evo5', name: 'Fitness Fanatic', description: 'Evolves through high activity and energy levels.', rarity: 'Rare', unlocked: false, requirements: ['Energy > 90%', 'Exercise regularly'], imageUrl: '/tamagotchi-adult5.png' },
  { id: 'evo6', name: 'Sparkling Star', description: 'A rare form achieved through exceptional overall care.', rarity: 'Legendary', unlocked: false, requirements: ['All stats > 85%', 'Age > 10 days'], imageUrl: '/tamagotchi-adult-legendary.png' },
];


export default function EvolutionPage() {
  const { tamagotchi } = useTamagotchi() || {}; // Handle potential null context
  const currentStage = tamagotchi?.evolutionStage || 'Unknown';
  const availablePaths = simulatedEvolutionPaths; // Use simulated data

  // Function to determine badge color based on rarity
  const getRarityBadgeVariant = (rarity: EvolutionPath['rarity']): "default" | "secondary" | "destructive" | "outline" => {
    switch (rarity) {
      case 'Common': return 'default';
      case 'Uncommon': return 'secondary';
      case 'Rare': return 'outline'; // Example mapping
      case 'Legendary': return 'destructive'; // Example mapping
      default: return 'default';
    }
  };

   // Function to determine background/border color based on rarity for the card
   const getEvolutionPathColor = (rarity: string): string => { // Added ': string' type annotation
     switch (rarity) {
       case 'Common': return 'bg-green-100 text-green-800 border-green-200';
       case 'Uncommon': return 'bg-blue-100 text-blue-800 border-blue-200';
       case 'Rare': return 'bg-purple-100 text-purple-800 border-purple-200';
       case 'Legendary': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
       default: return 'bg-gray-100 text-gray-800 border-gray-200';
     }
   };


  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Stage: {currentStage}</CardTitle>
          <CardDescription>Your Tamagotchi's current point in its lifecycle.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Maybe display current Tamagotchi image here */}
          <img
             src={tamagotchi?.appearance?.imageUrl || '/tamagotchi-placeholder.png'}
             alt={currentStage}
             className="w-32 h-32 mx-auto mb-4 object-contain"
           />
          <p className="text-center text-sm text-gray-600">View your Tamagotchi's potential futures below.</p>
        </CardContent>
      </Card>

      <Separator className="my-6" />

      <h2 className="text-2xl font-bold mb-4 text-center">Evolution Paths</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {availablePaths.map((path) => (
          <Card key={path.id} className={`border-2 ${path.unlocked ? 'opacity-100' : 'opacity-60'} ${getEvolutionPathColor(path.rarity)}`}>
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                 <CardTitle className="text-lg">{path.name}</CardTitle>
                 <Badge variant={getRarityBadgeVariant(path.rarity)}>{path.rarity}</Badge>
              </div>
              {path.imageUrl && (
                 <img src={path.imageUrl} alt={path.name} className="w-24 h-24 mx-auto rounded-md object-cover mb-2" />
              )}
              <CardDescription className="text-sm">{path.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {path.requirements && path.requirements.length > 0 && (
                <div>
                  <h4 className="font-semibold mb-1 text-xs">Requirements:</h4>
                  <ul className="list-disc list-inside text-xs space-y-1">
                    {path.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
              )}
              {!path.requirements && <p className="text-xs text-gray-500 italic">Basic evolution path.</p>}
               <div className="mt-3 text-center">
                {path.unlocked ? (
                    <Badge variant="secondary" className="bg-white text-gray-700">Unlocked</Badge>
                ) : (
                    <Badge variant="outline" className="border-gray-400 text-gray-500">Locked</Badge>
                )}
               </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}