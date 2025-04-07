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
  evolutionStage: string; // Main stage string like 'egg', 'baby', 'child'
  appearance?: {
    imageUrl?: string;
  };
  dna?: {             // Optional property
    traits?: {        // Optional property
      intelligence?: number;
      strength?: number;     // <<< Added trait
      agility?: number;      // <<< Added trait
    };
    rarity?: number;         // <<< Added property (e.g., 1-10)
  };
  evolution?: {             // Optional property
     stage?: number | string; // Optional property (e.g., number 1, 2, 3 or string 'egg')
     currentProgress?: number;
  };
  lastUpdated: number;
}

// Define the shape of the context data and functions
export interface TamagotchiContextType {
  tamagotchi: Tamagotchi | null;
  loading: boolean;
  feedTamagotchi: () => void;
  giveWater: () => void;
  playWithTamagotchi: () => void;
  toggleSleep: () => void;
  cleanTamagotchi: () => void;
  treatTamagotchi: (treatmentType: string) => void;
  saveTamagotchi: () => void;
  // NOTE: updateTamagotchiBasedOnActivity and updateTamagotchiStat seem missing from implementation
}

const TamagotchiContext = createContext<TamagotchiContextType | undefined>(undefined);

interface TamagotchiProviderProps {
  children: ReactNode;
}

const getInitialTamagotchi = (): Tamagotchi | null => {
  const defaultStats: TamagotchiStats = { hunger: 70, thirst: 70, happiness: 60, energy: 80, health: 90, cleanliness: 80 };
  const defaultStatus: TamagotchiStatus = { isSleeping: false, isSick: false, poopCount: 0 };
  // Add placeholder DNA including new traits and rarity
  const defaultDna = { traits: { intelligence: 5, strength: 5, agility: 5 }, rarity: 3 };
  const defaultEvolution = { stage: 0, currentProgress: 0  }; // Start at stage 0 (egg)

  return {
    id: 'my-tamagotchi-1',
    name: 'Tamatest',
    age: 0,
    stats: defaultStats,
    status: defaultStatus,
    dna: defaultDna, // Include initial DNA
    evolutionStage: 'egg', // Initial stage name
    evolution: defaultEvolution, // Include initial evolution details
    appearance: { imageUrl: '/tamagotchi-egg.png' },
    lastUpdated: Date.now()
  };
};

export const TamagotchiProvider: React.FC<TamagotchiProviderProps> = ({ children }) => {
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi | null>(null);
  const [loading, setLoading] = useState(true);

   // Load state from localStorage on initial mount (client-side only)
   useEffect(() => {
       if (typeof window !== 'undefined') {
           const savedState = localStorage.getItem('tamagotchiState');
           if (savedState) {
               try {
                   const parsedState = JSON.parse(savedState);
                   // Basic validation: check if it has an ID
                   if (parsedState && parsedState.id) {
                      setTamagotchi(parsedState);
                   } else {
                      setTamagotchi(getInitialTamagotchi());
                   }
               } catch (e) {
                   console.error("Failed to load state from localStorage", e);
                   setTamagotchi(getInitialTamagotchi()); // Fallback to initial
               }
           } else {
                setTamagotchi(getInitialTamagotchi()); // Set initial if nothing saved
           }
           setLoading(false);
       }
   }, []); // Empty dependency array means this runs once on mount


  // --- Action Functions (with safety checks) ---

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

   const saveTamagotchi = () => {
      if (tamagotchi && typeof window !== 'undefined') {
         console.log("Saving Tamagotchi state:", tamagotchi);
         localStorage.setItem('tamagotchiState', JSON.stringify(tamagotchi));
      }
   };

  // --- Game Loop ---
  useEffect(() => {
    if (!tamagotchi || tamagotchi.status?.isSleeping || loading) return;

    const interval = setInterval(() => {
      setTamagotchi(prev => {
        if (!prev || prev.status?.isSleeping) return prev;

        const now = Date.now();
        const elapsedMs = Math.min(now - prev.lastUpdated, 5 * 60 * 1000); // Cap elapsed time (e.g., 5 mins)
        const elapsedHours = elapsedMs / (1000 * 60 * 60);

        if (elapsedHours <= 0) return prev;

        const prevStats = prev.stats ?? { hunger: 50, thirst: 50, happiness: 50, energy: 50, health: 100, cleanliness: 50 };
        const prevStatus = prev.status ?? { isSleeping: false, isSick: false, poopCount: 0 };
        const prevEvolution = prev.evolution ?? { stage: 0 };
        const prevAge = typeof prev.age === 'number' ? prev.age : 0;


        // Decay stats
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

         // Handle poop
         let newPoopCount = prevStatus.poopCount;
         if (Math.random() < 0.05 * elapsedHours && newPoopCount < 3) {
            newPoopCount += 1;
         }

         // Handle sickness
         let newIsSick = prevStatus.isSick;
         if (!newIsSick && (prevStats.cleanliness < 25 || prevStats.health < 40)) {
             if (Math.random() < 0.02 * elapsedHours) newIsSick = true;
         }

        // Handle age
        const newAge = prevAge + (elapsedHours / 24); // Age in days

        // Handle evolution (simplified example)
        let newEvolutionStage = prev.evolutionStage;
        let newEvolutionDetails = prevEvolution;

        if (newAge > 1 && prev.evolutionStage === 'egg') { // Example: Egg hatches after 1 day
            newEvolutionStage = 'baby';
            newEvolutionDetails = { ...newEvolutionDetails, stage: 1 };
        } else if (newAge > 3 && prev.evolutionStage === 'baby') { // Example: Evolves to child after 3 days
             newEvolutionStage = 'child';
             newEvolutionDetails = { ...newEvolutionDetails, stage: 2 };
        } // Add more stages...

        return {
          ...prev,
          stats: newStats,
          status: { ...prevStatus, poopCount: newPoopCount, isSick: newIsSick },
          lastUpdated: now,
          age: newAge,
          evolutionStage: newEvolutionStage,
          evolution: newEvolutionDetails
        };
      });
    }, 60 * 1000); // Update every minute

    return () => clearInterval(interval);
  }, [tamagotchi, loading]);


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

export const useTamagotchi = (): TamagotchiContextType => {
  const context = useContext(TamagotchiContext);
  if (context === undefined) {
    throw new Error('useTamagotchi must be used within a TamagotchiProvider');
  }
  return context;
};