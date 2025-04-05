"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define types for our Tamagotchi
interface TamagotchiStats {
  hunger: number;
  thirst: number;
  happiness: number;
  energy: number;
  health: number;
  cleanliness: number;
}

interface TamagotchiStatus {
  isSleeping: boolean;
  isSick: boolean;
  isPlaying: boolean;
  isEating: boolean;
}

interface TamagotchiDNA {
  rarity: number;
  traits: {
    intelligence: number;
    strength: number;
    agility: number;
  };
}

interface TamagotchiEvolution {
  stage: number;
  currentProgress: number;
  maxProgress: number;
}

interface Tamagotchi {
  id: string;
  name: string;
  age: number;
  evolutionType: string;
  stats: TamagotchiStats;
  status: TamagotchiStatus;
  dna: TamagotchiDNA;
  evolution: TamagotchiEvolution;
  lastCaredAt: Date;
}

interface TamagotchiContextType {
  tamagotchi: Tamagotchi | null;
  createTamagotchi: (initialData: { name: string; evolutionType: string }) => void;
  feedTamagotchi: (foodType: string) => void;
  giveDrink: () => void;
  playWithTamagotchi: (gameType: string) => void;
  takeTamagotchiForWalk: (duration: number) => void;
  putTamagotchiToSleep: () => void;
  wakeTamagotchiUp: () => void;
  cleanTamagotchi: () => void;
  treatTamagotchi: (treatmentType: string) => void;
  updateTamagotchiBasedOnActivity: (activityType: string, duration: number) => void;
}

const TamagotchiContext = createContext<TamagotchiContextType | undefined>(undefined);

export function TamagotchiProvider({ children }: { children: ReactNode }) {
  const [tamagotchi, setTamagotchi] = useState<Tamagotchi | null>(null);

  // Initialize from localStorage if available
  useEffect(() => {
    const savedTamagotchi = localStorage.getItem('tamagotchi');
    if (savedTamagotchi) {
      try {
        const parsedTamagotchi = JSON.parse(savedTamagotchi);
        // Convert string date back to Date object
        parsedTamagotchi.lastCaredAt = new Date(parsedTamagotchi.lastCaredAt);
        setTamagotchi(parsedTamagotchi);
      } catch (error) {
        console.error('Error parsing saved Tamagotchi:', error);
      }
    }
  }, []);

  // Save to localStorage whenever tamagotchi changes
  useEffect(() => {
    if (tamagotchi) {
      localStorage.setItem('tamagotchi', JSON.stringify(tamagotchi));
    }
  }, [tamagotchi]);

  // Passive stat changes over time
  useEffect(() => {
    if (!tamagotchi) return;

    const interval = setInterval(() => {
      setTamagotchi(prev => {
        if (!prev) return null;

        // Calculate time since last care
        const now = new Date();
        const timeDiff = (now.getTime() - prev.lastCaredAt.getTime()) / (1000 * 60); // in minutes

        // Decrease stats based on time passed
        const newHunger = Math.max(0, prev.stats.hunger - timeDiff * 0.2);
        const newThirst = Math.max(0, prev.stats.thirst - timeDiff * 0.3);
        const newEnergy = prev.status.isSleeping 
          ? Math.min(100, prev.stats.energy + timeDiff * 0.5) 
          : Math.max(0, prev.stats.energy - timeDiff * 0.1);
        const newHappiness = Math.max(0, prev.stats.happiness - timeDiff * 0.1);
        const newCleanliness = Math.max(0, prev.stats.cleanliness - timeDiff * 0.1);

        // Health decreases if other stats are low
        let healthChange = 0;
        if (newHunger < 20 || newThirst < 20) healthChange -= 0.2;
        if (newEnergy < 20) healthChange -= 0.1;
        if (newCleanliness < 30) healthChange -= 0.1;
        
        const newHealth = Math.max(0, Math.min(100, prev.stats.health + healthChange));

        // Check if Tamagotchi becomes sick
        const becomesSick = newHealth < 30 && Math.random() < 0.2;

        // Increase age slightly (1 day = 24 real minutes in this simulation)
        const ageIncrease = timeDiff / (24 * 60) * 1; // Convert minutes to days
        const newAge = prev.age + ageIncrease;

        // Update evolution progress based on care quality
        const careQuality = (newHunger + newThirst + newHappiness + newHealth + newCleanliness) / 500;
        const evolutionProgress = Math.min(
          prev.evolution.maxProgress,
          prev.evolution.currentProgress + careQuality * 0.5
        );

        return {
          ...prev,
          age: newAge,
          stats: {
            hunger: newHunger,
            thirst: newThirst,
            happiness: newHappiness,
            energy: newEnergy,
            health: newHealth,
            cleanliness: newCleanliness
          },
          status: {
            ...prev.status,
            isSick: prev.status.isSick || becomesSick
          },
          evolution: {
            ...prev.evolution,
            currentProgress: evolutionProgress
          },
          lastCaredAt: now
        };
      });
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [tamagotchi]);

  // Create a new Tamagotchi
  const createTamagotchi = (initialData: { name: string; evolutionType: string }) => {
    const newTamagotchi: Tamagotchi = {
      id: `tamagotchi-${Date.now()}`,
      name: initialData.name,
      age: 0,
      evolutionType: initialData.evolutionType,
      stats: {
        hunger: 80,
        thirst: 80,
        happiness: 80,
        energy: 80,
        health: 80,
        cleanliness: 80
      },
      status: {
        isSleeping: false,
        isSick: false,
        isPlaying: false,
        isEating: false
      },
      dna: {
        rarity: 1 + Math.floor(Math.random() * 3), // Initial rarity 1-3
        traits: {
          intelligence: 0.3 + Math.random() * 0.4, // 0.3-0.7
          strength: 0.3 + Math.random() * 0.4,
          agility: 0.3 + Math.random() * 0.4
        }
      },
      evolution: {
        stage: 0,
        currentProgress: 0,
        maxProgress: 100
      },
      lastCaredAt: new Date()
    };

    setTamagotchi(newTamagotchi);
  };

  // Feed the Tamagotchi
  const feedTamagotchi = (foodType: string) => {
    if (!tamagotchi) return;

    setTamagotchi(prev => {
      if (!prev) return null;

      // Different foods have different effects
      let hungerIncrease = 20;
      let healthChange = 0;
      let happinessChange = 5;
      let strengthChange = 0;

      if (foodType === 'Fresh Apple') {
        hungerIncrease = 15;
        healthChange = 5;
      } else if (foodType === 'Protein Shake') {
        hungerIncrease = 25;
        strengthChange = 0.1;
      } else if (foodType === 'Sweet Cake') {
        hungerIncrease = 10;
        happinessChange = 15;
        healthChange = -2; // Unhealthy food
      }

      return {
        ...prev,
        stats: {
          ...prev.stats,
          hunger: Math.min(100, prev.stats.hunger + hungerIncrease),
          health: Math.min(100, prev.stats.health + healthChange),
          happiness: Math.min(100, prev.stats.happiness + happinessChange)
        },
        status: {
          ...prev.status,
          isEating: true
        },
        dna: {
          ...prev.dna,
          traits: {
            ...prev.dna.traits,
            strength: Math.min(1, prev.dna.traits.strength + strengthChange)
          }
        },
        lastCaredAt: new Date()
      };
    });

    // Reset eating status after a delay
    setTimeout(() => {
      setTamagotchi(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status: {
            ...prev.status,
            isEating: false
          }
        };
      });
    }, 3000);
  };

  // Give water to the Tamagotchi
  const giveDrink = () => {
    if (!tamagotchi) return;

    setTamagotchi(prev => {
      if (!prev) return null;
      return {
        ...prev,
        stats: {
          ...prev.stats,
          thirst: Math.min(100, prev.stats.thirst + 30)
        },
        lastCaredAt: new Date()
      };
    });
  };

  // Play with the Tamagotchi
  const playWithTamagotchi = (gameType: string) => {
    if (!tamagotchi) return;

    setTamagotchi(prev => {
      if (!prev) return null;

      // Different games have different effects
      let happinessIncrease = 20;
      let energyDecrease = 10;
      let intelligenceChange = 0;
      let agilityChange = 0;

      if (gameType === 'Ball Game') {
        happinessIncrease = 20;
        energyDecrease = 10;
        agilityChange = 0.1;
      } else if (gameType === 'Puzzle Game') {
        happinessIncrease = 15;
        energyDecrease = 5;
        intelligenceChange = 0.1;
      }

      return {
        ...prev,
        stats: {
          ...prev.stats,
          happiness: Math.min(100, prev.stats.happiness + happinessIncrease),
          energy: Math.max(0, prev.stats.energy - energyDecrease)
        },
        status: {
          ...prev.status,
          isPlaying: true
        },
        dna: {
          ...prev.dna,
          traits: {
            ...prev.dna.traits,
            intelligence: Math.min(1, prev.dna.traits.intelligence + intelligenceChange),
            agility: Math.min(1, prev.dna.traits.agility + agilityChange)
          }
        },
        lastCaredAt: new Date()
      };
    });

    // Reset playing status after a delay
    setTimeout(() => {
      setTamagotchi(prev => {
        if (!prev) return null;
        return {
          ...prev,
          status: {
            ...prev.status,
            isPlaying: false
          }
        };
      });
    }, 3000);
  };

  // Take the Tamagotchi for a walk
  const takeTamagotchiForWalk = (duration: number) => {
    if (!tamagotchi) return;

    setTamagotchi(prev => {
      if (!prev) return null;

      // Effects scale with duration
      const happinessIncrease = duration * 0.5;
      const energyDecrease = duration * 0.3;
      const healthIncrease = duration * 0.1;
      const agilityChange = duration * 0.005;

      return {
        ...prev,
        stats: {
          ...prev.stats,
          happiness: Math.min(100, prev.stats.happiness + happinessIncrease),
          energy: Math.max(0, prev.stats.energy - energyDecrease),
          health: Math.min(100, prev.stats.health + healthIncrease)
        },
        dna: {
          ...prev.dna,
          traits: {
            ...prev.dna.traits,
            agility: Math.min(1, prev.dna.traits.agility + agilityChange)
          }
        },
        lastCaredAt: new Date()
      };
    });
  };

  // Put the Tamagotchi to sleep
  const putTamagotchiToSleep = () => {
    if (!tamagotchi) return;

    setTamagotchi(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: {
          ...prev.status,
          isSleeping: true
        },
        lastCaredAt: new Date()
      };
    });
  };

  // Wake up the Tamagotchi
  const wakeTamagotchiUp = () => {
    if (!tamagotchi) return;

    setTamagotchi(prev => {
      if (!prev) return null;
      return {
        ...prev,
        status: {
          ...prev.status,
          isSleeping: false
        },
        lastCaredAt: new Date()
      };
    });
  };

  // Clean the Tamagotchi
  const cleanTamagotchi = () => {
    if (!tamagotchi) return;

    setTamagotchi(prev => {
      if (!prev) return null;
      return {
        ...prev,
        stats: {
          ...prev.stats,
          cleanliness: 100,
          happiness: Math.min(100, prev.stats.happiness + 10)
        },
        lastCaredAt: new Date()
      };
    });
  };

  // Treat the Tamagotchi when sick
  const treatTamagotchi = (treatmentType: string) => {
    if (!tamagotchi) return;

    setTamagotchi(prev => {
      if (!prev) return null;

      let healthIncrease = 0;
      let curesSickness = false;

      if (treatmentType === 'Medicine') {
        healthIncrease = 30;
        curesSickness = true;
      } else if (treatmentType === 'Rest') {
        healthIncrease = 15;
        curesSickness = prev.stats.health + 15 > 70; // Only cures if health will be above 70
      }

      return {
        ...prev,
        stats: {
          ...prev.stats,
          health: Math.min(100, prev.stats.health + healthIncrease)
        },
        status: {
          ...prev.status,
          isSick: !curesSickness && prev.status.isSick
        },
        lastCaredAt: new Date()
      };
    });
  };

  // Update Tamagotchi based on user's real-life activity
  const updateTamagotchiBasedOnActivity = (activityType: string, duration: number) => {
    if (!tamagotchi) return;

    setTamagotchi(prev => {
      if (!prev) return null;

      let healthChange = 0;
      let happinessChange = 0;
      let energyChange = 0;
      let strengthChange = 0;
      let agilityChange = 0;

      if (activityType === 'walking') {
        healthChange = duration * 0.1;
        happinessChange = duration * 0.05;
        energyChange = -duration * 0.05;
        agilityChange = duration * 0.001;
      } else if (activityType === 'running') {
        healthChange = duration * 0.2;
        happinessChange = duration * 0.1;
        energyChange = -duration * 0.15;
        strengthChange = duration * 0.001;
        agilityChange = duration * 0.002;
      } else if (activityType === 'cycling') {
        healthChange = duration * 0.15;
        happinessChange = duration * 0.1;
        energyChange = -duration * 0.1;
        strengthChange = duration * 0.002;
        agilityChange = duration * 0.001;
      } else if (activityType === 'stationary') {
        energyChange = duration * 0.05;
      }

      return {
        ...prev,
        stats: {
          ...prev.stats,
          health: Math.min(100, prev.stats.health + healthChange),
          happiness: Math.min(100, prev.stats.happiness + happinessChange),
          energy: Math.max(0, Math.min(100, prev.stats.energy + energyChange))
        },
        dna: {
          ...prev.dna,
          traits: {
            ...prev.dna.traits,
            strength: Math.min(1, prev.dna.traits.strength + strengthChange),
            agility: Math.min(1, prev.dna.traits.agility + agilityChange)
          }
        },
        lastCaredAt: new Date()
      };
    });
  };

  const contextValue: TamagotchiContextType = {
    tamagotchi,
    createTamagotchi,
    feedTamagotchi,
    giveDrink,
    playWithTamagotchi,
    takeTamagotchiForWalk,
    putTamagotchiToSleep,
    wakeTamagotchiUp,
    cleanTamagotchi,
    treatTamagotchi,
    updateTamagotchiBasedOnActivity
  };

  return (
    <TamagotchiContext.Provider value={contextValue}>
      {children}
    </TamagotchiContext.Provider>
  );
}

export function useTamagotchi() {
  const context = useContext(TamagotchiContext);
  if (context === undefined) {
    throw new Error('useTamagotchi must be used within a TamagotchiProvider');
  }
  return context;
}
