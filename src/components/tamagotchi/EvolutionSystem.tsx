"use client";

import { useEffect, useState } from 'react';
import { useTamagotchi } from './TamagotchiContext';

export default function EvolutionSystem() {
  const { tamagotchi } = useTamagotchi();
  const [evolutionProgress, setEvolutionProgress] = useState(0);
  const [potentialEvolutions, setPotentialEvolutions] = useState<any[]>([]);
  
  useEffect(() => {
    if (!tamagotchi) return;
    
    // Update evolution progress
    setEvolutionProgress(tamagotchi.evolution.currentProgress);
    
    // Generate potential evolutions based on current traits
    generatePotentialEvolutions();
  }, [tamagotchi]);
  
  const generatePotentialEvolutions = () => {
    if (!tamagotchi) return;
    
    // In a real app, this would be more sophisticated
    const evolutions = [
      {
        type: 'Healthy Sprout',
        requirements: [
          { name: 'Minimum Health', value: '70', met: tamagotchi.stats.health >= 70 },
          { name: 'Minimum Age', value: '5 days', met: tamagotchi.age >= 5 }
        ],
        description: 'A well-balanced young Tamagotchi',
        rarity: 2,
        progress: tamagotchi.stats.health >= 70 && tamagotchi.age >= 5 ? 100 : 
                 (tamagotchi.stats.health >= 70 ? 50 : 0) + (tamagotchi.age >= 5 ? 50 : tamagotchi.age * 10)
      },
      {
        type: 'Athletic Runner',
        requirements: [
          { name: 'Minimum Health', value: '80', met: tamagotchi.stats.health >= 80 },
          { name: 'Exercise Count', value: '20', met: false }, // Would track this in a real app
          { name: 'Minimum Age', value: '10 days', met: tamagotchi.age >= 10 }
        ],
        description: 'A Tamagotchi that loves exercise',
        rarity: 3,
        progress: tamagotchi.stats.health >= 80 && tamagotchi.age >= 10 ? 60 : 
                 (tamagotchi.stats.health >= 80 ? 30 : 0) + (tamagotchi.age >= 10 ? 30 : tamagotchi.age * 3)
      },
      {
        type: 'Wise Scholar',
        requirements: [
          { name: 'Intelligence Trait', value: '0.7', met: tamagotchi.dna.traits.intelligence >= 0.7 },
          { name: 'Puzzle Games', value: '15', met: false }, // Would track this in a real app
          { name: 'Minimum Age', value: '12 days', met: tamagotchi.age >= 12 }
        ],
        description: 'A highly intelligent Tamagotchi',
        rarity: 4,
        progress: tamagotchi.dna.traits.intelligence >= 0.7 && tamagotchi.age >= 12 ? 70 : 
                 (tamagotchi.dna.traits.intelligence >= 0.7 ? 40 : tamagotchi.dna.traits.intelligence * 50) + 
                 (tamagotchi.age >= 12 ? 30 : tamagotchi.age * 2.5)
      },
      {
        type: 'Mystic Creature',
        requirements: [
          { name: 'Rarity', value: '5+', met: tamagotchi.dna.rarity >= 5 },
          { name: 'Balanced Stats', value: 'All 70+', met: Object.values(tamagotchi.stats).every(stat => stat >= 70) },
          { name: 'Minimum Age', value: '20 days', met: tamagotchi.age >= 20 }
        ],
        description: 'A rare and mysterious Tamagotchi',
        rarity: 7,
        progress: tamagotchi.dna.rarity >= 5 && Object.values(tamagotchi.stats).every(stat => stat >= 70) && tamagotchi.age >= 20 ? 100 : 
                 (tamagotchi.dna.rarity >= 5 ? 30 : tamagotchi.dna.rarity * 6) + 
                 (Object.values(tamagotchi.stats).every(stat => stat >= 70) ? 40 : 
                  Object.values(tamagotchi.stats).filter(stat => stat >= 70).length * 5) + 
                 (tamagotchi.age >= 20 ? 30 : tamagotchi.age * 1.5)
      }
    ];
    
    setPotentialEvolutions(evolutions);
  };
  
  if (!tamagotchi) {
    return null;
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Evolution System</h2>
      
      {/* Current Evolution */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Current Form</h3>
        <div className="flex items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mr-4">
            {tamagotchi.evolutionType === 'Baby Blob' && '🐣'}
            {tamagotchi.evolutionType === 'Healthy Sprout' && '🌱'}
            {tamagotchi.evolutionType === 'Athletic Runner' && '🏃'}
            {tamagotchi.evolutionType === 'Wise Scholar' && '🦉'}
            {tamagotchi.evolutionType === 'Mystic Creature' && '✨'}
          </div>
          <div>
            <p className="font-medium">{tamagotchi.evolutionType}</p>
            <p className="text-sm text-gray-600">Stage {tamagotchi.evolution.stage}</p>
            <p className="text-sm text-gray-600">Age: {tamagotchi.age.toFixed(1)} days</p>
          </div>
        </div>
      </div>
      
      {/* Evolution Progress */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Evolution Progress</h3>
        <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div 
            className="h-full bg-blue-500" 
            style={{ width: `${evolutionProgress}%` }}
          ></div>
        </div>
        <p className="text-center text-sm">{evolutionProgress}% Complete</p>
      </div>
      
      {/* Potential Evolutions */}
      <div>
        <h3 className="font-semibold mb-2">Potential Evolutions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {potentialEvolutions.map((evolution, index) => (
            <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{evolution.type}</h4>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                  Rarity: {evolution.rarity}/10
                </span>
              </div>
              
              <p className="text-sm text-gray-600 mb-3">{evolution.description}</p>
              
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div 
                  className="h-full bg-green-500" 
                  style={{ width: `${evolution.progress}%` }}
                ></div>
              </div>
              
              <div className="text-xs text-gray-500">
                <p className="font-medium mb-1">Requirements:</p>
                <ul>
                  {evolution.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-center">
                      <span className={req.met ? "text-green-500" : "text-red-500"}>
                        {req.met ? "✓" : "✗"}
                      </span>
                      <span className="ml-1">{req.name}: {req.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-1">How Evolution Works</h3>
        <p className="text-sm">
          Your Tamagotchi evolves based on how you care for it. Different care patterns lead to different evolutions.
          Keep your Tamagotchi healthy, happy, and engaged to unlock rare evolutions!
        </p>
      </div>
    </div>
  );
}
