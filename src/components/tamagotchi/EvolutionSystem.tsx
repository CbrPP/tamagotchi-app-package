"use client";

import React, { useEffect, useState, useCallback } from 'react'; // Added React import and useCallback
import { useTamagotchi } from './TamagotchiContext'; // Assuming context path is correct
import { Progress } from "@/components/ui/progress"; // Import Progress component

// Define interface for evolution requirements display
interface Requirement {
    name: string;
    value: string;
    met: boolean;
}

// Define interface for potential evolution display
interface PotentialEvolution {
    type: string;
    requirements: Requirement[];
    description: string;
    rarity: number; // Assuming 1-10 scale
    progress: number; // Progress towards this specific evolution (0-100)
}


export default function EvolutionSystem() {
  const context = useTamagotchi();
  const tamagotchi = context?.tamagotchi ?? null;

  // Use state for progress, defaulting to 0
  const [evolutionProgress, setEvolutionProgress] = useState(0);
  const [potentialEvolutions, setPotentialEvolutions] = useState<PotentialEvolution[]>([]);

  // Use useCallback for generatePotentialEvolutions if it were more complex or passed down
  const generatePotentialEvolutions = useCallback(() => {
    if (!tamagotchi?.stats || !tamagotchi?.dna || !tamagotchi?.age) return; // Need necessary data

    // Example calculation logic - make this match your game's rules
    const evolutions: PotentialEvolution[] = [
      {
        type: 'Healthy Sprout',
        requirements: [
          { name: 'Min Health', value: '70', met: (tamagotchi.stats.health ?? 0) >= 70 },
          { name: 'Min Age', value: '1 day', met: tamagotchi.age >= 1 }
        ],
        description: 'Balanced young Tamagotchi.',
        rarity: 2,
        progress: Math.min(100, (((tamagotchi.stats.health ?? 0)/70)*50) + (((tamagotchi.age ?? 0)/1)*50) ) // Example progress calculation
      },
      {
        type: 'Athletic Runner',
        requirements: [
          { name: 'Min Health', value: '80', met: (tamagotchi.stats.health ?? 0) >= 80 },
          { name: 'Min Energy', value: '70', met: (tamagotchi.stats.energy ?? 0) >= 70 },
          { name: 'Min Age', value: '3 days', met: tamagotchi.age >= 3 }
        ],
        description: 'Loves exercise!',
        rarity: 4,
        progress: Math.min(100, (((tamagotchi.stats.health ?? 0)/80)*34) + (((tamagotchi.stats.energy ?? 0)/70)*33) + (((tamagotchi.age ?? 0)/3)*33) )
      },
      {
        type: 'Wise Scholar',
        requirements: [
          { name: 'Min Intelligence', value: '0.7', met: (tamagotchi.dna.traits?.intelligence ?? 0) >= 0.7 },
          { name: 'Min Happiness', value: '60', met: (tamagotchi.stats.happiness ?? 0) >= 60},
          { name: 'Min Age', value: '4 days', met: tamagotchi.age >= 4 }
        ],
        description: 'Highly intelligent.',
        rarity: 5,
        progress: Math.min(100, (((tamagotchi.dna.traits?.intelligence ?? 0)/0.7)*40) + (((tamagotchi.stats.happiness ?? 0)/60)*30) + (((tamagotchi.age ?? 0)/4)*30) )
      },
      {
        type: 'Mystic Creature',
        requirements: [
          { name: 'Min Rarity', value: '5+', met: (tamagotchi.dna.rarity ?? 0) >= 5 },
          { name: 'Balanced Stats', value: 'All 70+', met: Object.values(tamagotchi.stats ?? {}).every(stat => stat >= 70) },
          { name: 'Min Age', value: '7 days', met: tamagotchi.age >= 7 }
        ],
        description: 'Rare and mysterious.',
        rarity: 8,
        progress: Math.min(100, (((tamagotchi.dna.rarity ?? 0)/5)*30) + ((Object.values(tamagotchi.stats ?? {}).filter(stat => stat >= 70).length / Object.keys(tamagotchi.stats ?? {}).length)*40) + (((tamagotchi.age ?? 0)/7)*30) )
      }
    ];

    setPotentialEvolutions(evolutions);
     // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tamagotchi?.stats, tamagotchi?.dna, tamagotchi?.age]); // Depend on specific fields


  useEffect(() => {
    if (!tamagotchi) return;

    // Update overall evolution progress using safe access
    setEvolutionProgress(tamagotchi.evolution?.currentProgress ?? 0); // <<< SAFE ACCESS + DEFAULT

    // Generate potential evolutions based on current state
    generatePotentialEvolutions();

  }, [tamagotchi, generatePotentialEvolutions]); // Include generatePotentialEvolutions


  if (!tamagotchi) {
    return <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">Loading Evolution Data...</div>;
  }

  // Safely get display values
  const displayEvolutionStageName = tamagotchi.evolutionStage ?? 'Unknown Stage';
  const displayEvolutionStageNumber = tamagotchi.evolution?.stage ?? 'N/A';
  const displayAge = tamagotchi.age?.toFixed(1) ?? '0.0';
  const displayImageUrl = tamagotchi.appearance?.imageUrl ?? '/tamagotchi-placeholder.png'; // Placeholder image

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Evolution System</h2>

      {/* Current Evolution */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-semibold mb-2 text-gray-800">Current Form</h3>
        <div className="flex items-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mr-4 flex-shrink-0 border border-blue-200">
            {/* Use image URL if available, otherwise fallback based on stage name */}
             <img src={displayImageUrl} alt={displayEvolutionStageName} className="w-full h-full object-contain rounded-full p-1" />
             {/* Example fallback icons if needed:
             {displayEvolutionStageName === 'egg' && '🥚'}
             {displayEvolutionStageName === 'baby' && '🐣'}
            */}
          </div>
          <div>
            <p className="font-medium text-blue-800">{displayEvolutionStageName}</p>
            <p className="text-sm text-gray-600">Stage: {displayEvolutionStageNumber}</p>
            <p className="text-sm text-gray-600">Age: {displayAge} days</p>
          </div>
        </div>
      </div>

      {/* Evolution Progress Towards Next Stage */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-gray-700">Progress to Next Stage</h3>
        <Progress value={evolutionProgress} className="h-3" /> {/* Use Progress component */}
        <p className="text-center text-xs text-gray-500 mt-1">{evolutionProgress.toFixed(1)}% Complete</p>
      </div>

      {/* Potential Evolutions */}
      <div>
        <h3 className="font-semibold mb-3 text-gray-800">Potential Next Evolutions</h3>
        {potentialEvolutions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {potentialEvolutions.map((evolution, index) => (
                <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow duration-200 bg-white">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-base">{evolution.type}</h4>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${evolution.rarity > 7 ? 'bg-yellow-100 text-yellow-800' : evolution.rarity > 4 ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                      Rarity: {evolution.rarity}/10
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{evolution.description}</p>

                   <div className="mb-3" title={`Progress: ${evolution.progress.toFixed(1)}%`}>
                     <span className="text-xs font-medium text-gray-500">Unlock Progress:</span>
                     <Progress value={evolution.progress} className="h-1.5 mt-0.5" />
                   </div>

                  <div className="text-xs text-gray-500">
                    <p className="font-medium mb-1">Requirements:</p>
                    <ul className="space-y-0.5">
                      {evolution.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className={`flex items-center ${req.met ? "text-green-600" : "text-red-600"}`}>
                           {req.met ?
                              <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              :
                              <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                           }
                           <span className="ml-1">{req.name}: {req.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
        ) : (
            <p className="text-sm text-gray-500 italic">Calculating potential evolutions...</p>
        )}
      </div>

       {/* Info Box */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
         <h3 className="text-sm font-semibold text-blue-800 mb-1">How Evolution Works</h3>
         <p className="text-xs text-blue-700">
           Your Tamagotchi evolves based on age, stats, and potentially hidden factors like care mistakes or specific interactions. Meeting the requirements for multiple paths might lead to different outcomes! Keep exploring!
         </p>
       </div>
    </div>
  );
}