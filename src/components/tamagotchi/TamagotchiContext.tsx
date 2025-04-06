"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode, useCallback } from 'react';

// Define the structure for Tamagotchi stats
export interface TamagotchiStats {
  hunger: number;
  thirst: number;
  happiness: number;
  energy: number;
  health: number;
  cleanliness: number;
  // weight?: number; // Weight seems to be missing based on previous errors
}

// Define the structure for Tamagotchi status
export interface TamagotchiStatus {
  isSleeping: boolean;
  isSick: boolean;
  poopCount: number;
}

// Define the main Tamagotchi object structure
export interface Tamagotchi {
  id: string;
  name: string;
  age: number;
  stats: TamagotchiStats;
  status: TamagotchiStatus;
  evolutionStage: string; // This seems to be the main stage indicator
  appearance?: {
    imageUrl?: string;
  };
  dna?: {
    traits?: {
      intelligence?: number;
    };
  };
  evolution?: {             // <<< Added optional evolution property
     stage?: number | string; // <<< Added optional stage property (can be number or string)
     // path?: string;      // Example: Add other relevant evolution details if needed
  };
  lastUpdated: number; // Timestamp of the last update
}

// Define the shape of the context data and functions
// Ensure this type includes everything provided by the context value below
export interface TamagotchiContextType {
  tamagotchi: Tamagotchi | null;
  loading: boolean;
  feedTamagotchi: () => void;
  giveWater: () => void;
  playWithTamagotchi: () => void;
  toggleSleep: () => void;
  cleanTamagotchi: () => void;
  treatTamagotchi: (treatmentType: string) => void;
  // updateTamagotchiBasedOnActivity?: (activity: string, duration: number) => void; // This function seems missing from implementation
  saveTamagotchi: () => void;
}

// Create the context with a default value
const TamagotchiContext = createContext<TamagotchiContextType | undefined>(undefined);

// Define the Provider component props
interface TamagotchiProviderProps {
  children: ReactNode;
}

// Initial state function (can load from localStorage or API later)
const getInitialTamagotchi = (): Tamagotchi | null => {
  // In a real app, load from localStorage or fetch from API
  // For now, provide a default starting state if nothing is loaded
  const defaultStats: TamagotchiStats = { hunger: 70, thirst: 70, happiness: 60, energy: 80, health: 90, cleanliness: 80 };
  const defaultStatus: TamagotchiStatus = { isSleeping: false, isSick: false, poopCount: 0 };
  const defaultDna = { traits: { intelligence: 5 } }; // Example intelligence trait value
  const defaultEvolution = { stage: 1 }; // Example initial evolution stage number

  return {
    id: 'my-tamagotchi-1', // Example ID
    name: 'Tamatest',
    age: 0,
    stats: defaultStats,
    status: defaultStatus,
    dna: defaultDna,
    evolutionStage: 'egg', // Main stage string
    evolution: defaultEvolution, // Detailed evolution object
    appearance: { imageUrl: '/tamagotchi-egg.png' }, // Default appearance
    lastUpdated: Date.now()
  };
};

export const TamagotchiProvider: React.FC<TamagotchiProviderProps> = ({ children }) => {
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi | null>(null);
  const [loading, setLoading] = useState(true);

  // Load initial state (client-side only for localStorage)
  useEffect(() => {
      if (typeof window !== 'undefined') {
          const savedState = localStorage.getItem('tamagotchiState');
          if (savedState) {
              try {
                  const parsedState = JSON.parse(savedState);
                  // Add validation here if needed before setting state
                  setTamagotchi(parsedState);
              } catch (e) {
                  console.error("Failed to load state from localStorage", e);
                  setTamagotchi(getInitialTamagotchi()); // Fallback to initial
              }
          } else {
               setTamagotchi(getInitialTamagotchi()); // Set initial if nothing saved
          }
          setLoading(false);
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array means this runs once on mount


  // Function to update stats, ensuring they stay within bounds (0-100)
  const updateStat = useCallback((stat: keyof TamagotchiStats, change: number) => {
    setTamagotchi(prev => {
      if (!prev) return null;
      const currentStatValue = prev.stats?.[stat] ?? 0;
      const newValue = Math.max(0, Math.min(100, currentStatValue + change));
      return {
        ...prev,
        stats: { ...(prev.stats ?? {}), [stat]: newValue } as TamagotchiStats,
        lastUpdated: Date.now()
      };
    });
  }, []);

   // Function to update status
   const updateStatus = useCallback((key: keyof TamagotchiStatus, value: any) => {
    setTamagotchi(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: { ...(prev.status ?? {}), [key]: value } as TamagotchiStatus,
        lastUpdated: Date.now()
      };
    });
  }, []);


  // Define actions
  const feedTamagotchi = () => updateStat('hunger', 20);
  const giveWater = () => updateStat('thirst', 20);
  const playWithTamagotchi = () => updateStat('happiness', 15);
  const cleanTamagotchi = () => {
      updateStat('cleanliness', 30);
      updateStatus('poopCount', 0);
  };

  const toggleSleep = () => {
     setTamagotchi(prev => {
      if (!prev) return null;
      const sleeping = !prev.status?.isSleeping;
      const energyChange = sleeping ? -5 : 30;
      const currentEnergy = prev.stats?.energy ?? 0;
      const newEnergy = Math.max(0, Math.min(100, currentEnergy + energyChange));
      return {
        ...prev,
        stats: { ...(prev.stats ?? {}), energy: newEnergy } as TamagotchiStats,
        status: { ...(prev.status ?? {}), isSleeping: sleeping } as TamagotchiStatus,
        lastUpdated: Date.now()
      };
    });
  }

  const treatTamagotchi = (treatmentType: string) => {
    if (treatmentType === 'Medicine') {
      updateStat('health', 25);
      updateStatus('isSick', false);
    } else if (treatmentType === 'Rest') {
       updateStat('energy', 15);
    }
  };


  // Game loop effect for stat decay, aging, etc.
  useEffect(() => {
    if (!tamagotchi || tamagotchi.status?.isSleeping || loading) return;

    const interval = setInterval(() => {
      setTamagotchi(prev => {
        if (!prev || prev.status?.isSleeping) return prev;

        const now = Date.now();
        const elapsedMs = Math.min(now - prev.lastUpdated, 2 * 60 * 1000);
        const elapsedHours = elapsedMs / (1000 * 60 * 60);

        if (elapsedHours <= 0) return prev;

        const prevStats = prev.stats ?? { hunger: 50, thirst: 50, happiness: 50, energy: 50, health: 100, cleanliness: 50 };
        const prevStatus = prev.status ?? { isSleeping: false, isSick: false, poopCount: 0 };

        const hungerDecay = 1 * elapsedHours;
        const thirstDecay = 1.5 * elapsedHours;
        const happinessDecay = 0.5 * elapsedHours;
        const energyDecay = 0.8 * elapsedHours;
        const cleanlinessDecay = 0.4 * elapsedHours;
        let healthDecay = 0;
        if (prevStats.hunger < 15 || prevStats.thirst < 15) healthDecay += 1 * elapsedHours;
        if (prevStatus.isSick) healthDecay += 2 * elapsedHours;

        const newStats: TamagotchiStats = {
          hunger: Math.max(0, prevStats.hunger - hungerDecay),
          thirst: Math.max(0, prevStats.thirst - thirstDecay),
          happiness: Math.max(0, prevStats.happiness - happinessDecay),
          energy: Math.max(0, prevStats.energy - energyDecay),
          health: Math.max(0, prevStats.health - healthDecay),
          cleanliness: Math.max(0, prevStats.cleanliness - cleanlinessDecay),
        };

         let newPoopCount = prevStatus.poopCount;
         if (Math.random() < 0.05 * elapsedHours && newPoopCount < 3) {
            newPoopCount += 1;
         }

         let newIsSick = prevStatus.isSick;
         if (!newIsSick && (prevStats.cleanliness < 25 || prevStats.health < 40)) {
             if (Math.random() < 0.02 * elapsedHours) {
                 newIsSick = true;
             }
         }

        const currentAge = typeof prev.age === 'number' ? prev.age : 0;
        const newAge = currentAge + (elapsedHours / 24);

        // Add basic evolution logic example (could be more complex)
        let newEvolutionStage = prev.evolutionStage;
        let newEvolution = prev.evolution;
        if (newAge > 5 && prev.evolutionStage === 'egg') { // Example: Evolve from egg after 5 'days'
            newEvolutionStage = 'baby';
            newEvolution = { ...newEvolution, stage: 1 }; // Update detailed stage if needed
        } else if (newAge > 15 && prev.evolutionStage === 'baby') { // Example: Evolve from baby
             newEvolutionStage = 'child';
             newEvolution = { ...newEvolution, stage: 2 };
        } // Add more stages...


        return {
          ...prev,
          stats: newStats,
          status: { ...prevStatus, poopCount: newPoopCount, isSick: newIsSick },
          lastUpdated: now,
          age: newAge,
          evolutionStage: newEvolutionStage, // Update main stage string
          evolution: newEvolution // Update detailed evolution object
        };
      });
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [tamagotchi, loading]);


   // Save function (example - could save to localStorage or API)
   const saveTamagotchi = () => {
      if (tamagotchi) {
         console.log("Saving Tamagotchi state:", tamagotchi);
         if (typeof window !== 'undefined') {
            localStorage.setItem('tamagotchiState', JSON.stringify(tamagotchi));
         }
      }
   };


  // Provide context value
  const contextValue: TamagotchiContextType = {
    tamagotchi,
    loading,
    feedTamagotchi,
    giveWater,
    playWithTamagotchi,
    toggleSleep,
    cleanTamagotchi,
    treatTamagotchi,
    saveTamagotchi
  };

  return (
    <TamagotchiContext.Provider value={contextValue}>
      {children}
    </TamagotchiContext.Provider>
  );
};

// Custom hook to use the Tamagotchi context
export const useTamagotchi = (): TamagotchiContextType => {
  const context = useContext(TamagotchiContext);
  if (context === undefined) {
    throw new Error('useTamagotchi must be used within a TamagotchiProvider');
  }
  return context;
};