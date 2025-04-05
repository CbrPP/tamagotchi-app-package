"use client";

import { useEffect, useState } from 'react';
import { useTamagotchi } from './TamagotchiContext';

export default function BreedingSystem() {
  const { tamagotchi } = useTamagotchi();
  const [breedingEligible, setBreedingEligible] = useState(false);
  const [potentialMates, setPotentialMates] = useState<any[]>([]);
  const [selectedMate, setSelectedMate] = useState<any>(null);
  const [breedingResult, setBreedingResult] = useState<any>(null);
  const [breedingInProgress, setBreedingInProgress] = useState(false);
  const [pregnancyProgress, setPregnancyProgress] = useState(0);
  const [offspringCount, setOffspringCount] = useState(0);

  useEffect(() => {
    if (!tamagotchi) return;
    
    // Check if Tamagotchi is eligible for breeding
    checkBreedingEligibility();
    
    // Generate potential mates
    generatePotentialMates();
  }, [tamagotchi]);

  // Simulate pregnancy progress
  useEffect(() => {
    if (!breedingInProgress || pregnancyProgress >= 100) return;
    
    const progressInterval = setInterval(() => {
      setPregnancyProgress(prev => {
        const newProgress = prev + 5;
        
        if (newProgress >= 100) {
          // Pregnancy complete, generate offspring
          generateOffspring();
          clearInterval(progressInterval);
        }
        
        return newProgress;
      });
    }, 2000); // Update every 2 seconds for demo purposes
    
    return () => clearInterval(progressInterval);
  }, [breedingInProgress, pregnancyProgress]);

  const checkBreedingEligibility = () => {
    if (!tamagotchi) return;
    
    // In a real app, this would have more sophisticated criteria
    const isEligible = 
      tamagotchi.age >= 15 && // Minimum age
      tamagotchi.stats.health >= 70 && // Minimum health
      !tamagotchi.status.isSick && // Not sick
      tamagotchi.evolution.stage >= 2; // Minimum evolution stage
    
    setBreedingEligible(isEligible);
  };

  const generatePotentialMates = () => {
    if (!tamagotchi) return;
    
    // In a real app, these would be fetched from a database of other users' Tamagotchis
    const mockMates = [
      {
        id: 'mate-1',
        name: 'Luna',
        owner: 'Alex',
        evolutionType: 'Mystic Creature',
        rarity: 7,
        compatibility: 85,
        stats: {
          health: 90,
          happiness: 85
        },
        traits: {
          intelligence: 0.8,
          strength: 0.6,
          agility: 0.7
        },
        image: '🦄'
      },
      {
        id: 'mate-2',
        name: 'Rocky',
        owner: 'Sam',
        evolutionType: 'Athletic Runner',
        rarity: 5,
        compatibility: 70,
        stats: {
          health: 95,
          happiness: 75
        },
        traits: {
          intelligence: 0.5,
          strength: 0.9,
          agility: 0.8
        },
        image: '🐇'
      },
      {
        id: 'mate-3',
        name: 'Whiskers',
        owner: 'Jordan',
        evolutionType: 'Wise Scholar',
        rarity: 6,
        compatibility: 90,
        stats: {
          health: 85,
          happiness: 90
        },
        traits: {
          intelligence: 0.9,
          strength: 0.4,
          agility: 0.6
        },
        image: '🦉'
      }
    ];
    
    setPotentialMates(mockMates);
  };

  const selectMate = (mate: any) => {
    setSelectedMate(mate);
    setBreedingResult(null);
  };

  const startBreeding = () => {
    if (!tamagotchi || !selectedMate) return;
    
    setBreedingInProgress(true);
    setPregnancyProgress(0);
    
    // Determine number of offspring (1-3)
    const offspringCount = 1 + Math.floor(Math.random() * 3);
    setOffspringCount(offspringCount);
  };

  const generateOffspring = () => {
    if (!tamagotchi || !selectedMate) return;
    
    // In a real app, this would use more sophisticated genetics algorithms
    const offspring = [];
    
    for (let i = 0; i < offspringCount; i++) {
      // Combine traits from both parents with some randomness
      const combinedTraits = {
        intelligence: (tamagotchi.dna.traits.intelligence + selectedMate.traits.intelligence) / 2 + (Math.random() * 0.2 - 0.1),
        strength: (tamagotchi.dna.traits.strength + selectedMate.traits.strength) / 2 + (Math.random() * 0.2 - 0.1),
        agility: (tamagotchi.dna.traits.agility + selectedMate.traits.agility) / 2 + (Math.random() * 0.2 - 0.1)
      };
      
      // Calculate rarity based on parents' rarity and traits
      const baseRarity = Math.max(tamagotchi.dna.rarity, selectedMate.rarity);
      const rarityBonus = Math.random() * 2;
      const rarity = Math.min(10, Math.floor(baseRarity + rarityBonus));
      
      // Generate random name
      const names = ['Pip', 'Mochi', 'Bubbles', 'Spark', 'Fluff', 'Pebble', 'Ziggy', 'Nova', 'Echo', 'Pixel'];
      const name = names[Math.floor(Math.random() * names.length)];
      
      // Determine potential evolution types
      const evolutionTypes = ['Healthy Sprout', 'Athletic Runner', 'Wise Scholar', 'Mystic Creature'];
      const potentialEvolutions = [];
      
      // Higher intelligence favors Wise Scholar
      if (combinedTraits.intelligence > 0.7) {
        potentialEvolutions.push('Wise Scholar');
      }
      
      // Higher strength favors Athletic Runner
      if (combinedTraits.strength > 0.7) {
        potentialEvolutions.push('Athletic Runner');
      }
      
      // Higher rarity favors Mystic Creature
      if (rarity > 7) {
        potentialEvolutions.push('Mystic Creature');
      }
      
      // Default to Healthy Sprout if no specific traits stand out
      const evolutionType = potentialEvolutions.length > 0 
        ? potentialEvolutions[Math.floor(Math.random() * potentialEvolutions.length)]
        : 'Healthy Sprout';
      
      // Create offspring object
      offspring.push({
        id: `offspring-${i}`,
        name,
        evolutionType: 'Baby Blob', // Starts as baby
        potentialEvolutionType: evolutionType,
        rarity,
        traits: combinedTraits,
        image: '🥚'
      });
    }
    
    setBreedingResult({
      parents: {
        parent1: tamagotchi.name,
        parent2: selectedMate.name
      },
      offspring,
      timestamp: new Date()
    });
    
    setBreedingInProgress(false);
  };

  if (!tamagotchi) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Breeding System</h2>
      
      {/* Breeding Eligibility */}
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div 
            className={`w-4 h-4 rounded-full mr-2 ${breedingEligible ? 'bg-green-500' : 'bg-red-500'}`}
          ></div>
          <h3 className="font-semibold">Breeding Status</h3>
        </div>
        
        {breedingEligible ? (
          <p className="text-green-600">Your Tamagotchi is eligible for breeding!</p>
        ) : (
          <div>
            <p className="text-red-600 mb-2">Your Tamagotchi is not yet eligible for breeding.</p>
            <ul className="list-disc list-inside text-sm">
              <li>Minimum age: 15 days {tamagotchi.age >= 15 ? '✓' : '✗'}</li>
              <li>Minimum health: 70% {tamagotchi.stats.health >= 70 ? '✓' : '✗'}</li>
              <li>Not sick: {!tamagotchi.status.isSick ? '✓' : '✗'}</li>
              <li>Minimum evolution stage: 2 {tamagotchi.evolution.stage >= 2 ? '✓' : '✗'}</li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Breeding In Progress */}
      {breedingInProgress && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Pregnancy in Progress</h3>
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-pink-500" 
              style={{ width: `${pregnancyProgress}%` }}
            ></div>
          </div>
          <p className="text-center text-sm">{pregnancyProgress}% Complete</p>
          <p className="text-center mt-2">Expecting {offspringCount} offspring!</p>
        </div>
      )}
      
      {/* Breeding Results */}
      {breedingResult && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Breeding Results</h3>
          <p className="mb-2">
            {tamagotchi.name} and {breedingResult.parents.parent2} have produced {breedingResult.offspring.length} offspring!
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {breedingResult.offspring.map((baby: any) => (
              <div key={baby.id} className="border rounded-lg p-4 bg-blue-50">
                <div className="flex justify-center mb-2">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl">
                    {baby.image}
                  </div>
                </div>
                <h4 className="font-semibold text-center">{baby.name}</h4>
                <p className="text-center text-sm">{baby.evolutionType}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs">
                    <span>Rarity:</span>
                    <span className="font-medium">{baby.rarity}/10</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>Potential:</span>
                    <span className="font-medium">{baby.potentialEvolutionType}</span>
                  </div>
                </div>
                <div className="mt-2 text-xs">
                  <div className="mb-1">Traits:</div>
                  <div className="grid grid-cols-3 gap-1">
                    <div>
                      <div>INT</div>
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${baby.traits.intelligence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div>STR</div>
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500" 
                          style={{ width: `${baby.traits.strength * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div>AGI</div>
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${baby.traits.agility * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center mt-4">
            <button 
              onClick={() => {
                setBreedingResult(null);
                setSelectedMate(null);
              }}
              className="bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      )}
      
      {/* Potential Mates */}
      {breedingEligible && !breedingInProgress && !breedingResult && (
        <div>
          <h3 className="font-semibold mb-2">Potential Mates</h3>
          <div className="space-y-3">
            {potentialMates.map(mate => (
              <div 
                key={mate.id} 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                  selectedMate?.id === mate.id ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                }`}
                onClick={() => selectMate(mate)}
              >
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-4">
                    {mate.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-semibold">{mate.name}</h4>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                        Rarity: {mate.rarity}/10
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Owner: {mate.owner}</p>
                    <p className="text-sm">{mate.evolutionType}</p>
                  </div>
                </div>
                
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="flex justify-between">
                      <span>Compatibility:</span>
                      <span className={`font-medium ${
                        mate.compatibility > 80 ? 'text-green-600' : 
                        mate.compatibility > 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {mate.compatibility}%
                      </span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${
                          mate.compatibility > 80 ? 'bg-green-500' : 
                          mate.compatibility > 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style={{ width: `${mate.compatibility}%` }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between">
                      <span>Health:</span>
                      <span className="font-medium">{mate.stats.health}%</span>
                    </div>
                    <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500" 
                        style={{ width: `${mate.stats.health}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-xs">
                  <div className="mb-1">Traits:</div>
                  <div className="grid grid-cols-3 gap-1">
                    <div>
                      <div>INT</div>
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${mate.traits.intelligence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div>STR</div>
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-red-500" 
                          style={{ width: `${mate.traits.strength * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div>AGI</div>
                      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500" 
                          style={{ width: `${mate.traits.agility * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {selectedMate && (
            <div className="mt-4 flex justify-center">
              <button 
                onClick={startBreeding}
                className="bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Start Breeding with {selectedMate.name}
              </button>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-6 p-3 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-1">How Breeding Works</h3>
        <p className="text-sm">
          Breeding allows your Tamagotchi to mate with others and produce offspring with unique traits. 
          The offspring inherit characteristics from both parents, with some random variation. 
          Rarer parents have a higher chance of producing rare offspring.
        </p>
      </div>
    </div>
  );
}
