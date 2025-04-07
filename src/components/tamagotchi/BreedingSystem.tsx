"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { useTamagotchi, Tamagotchi } from './TamagotchiContext';

// Define a simplified structure for potential mates
interface PotentialMate {
  id: string;
  name: string;
  owner: string;
  evolutionType: string;
  level: number; // <<< THIS LINE IS NEEDED AND CORRECT
  rarity: number;
  compatibility: number;
  stats: { health: number; happiness: number; };
  traits: { intelligence: number; strength: number; agility: number; };
  image: string;
}

// Define structure for breeding results
interface BreedingOffspring {
    id: string;
    name: string;
    evolutionType: string;
    potentialEvolutionType: string;
    rarity: number;
    traits: { intelligence: number; strength: number; agility: number; };
    image: string;
}

interface BreedingResult {
    parents: { parent1: string; parent2: string; };
    offspring: BreedingOffspring[];
    timestamp: Date;
}

type RarityLevel = 'Common' | 'Uncommon' | 'Rare' | 'Legendary';

export default function BreedingSystem() {
  const context = useTamagotchi();
  const tamagotchi = context?.tamagotchi ?? null;

  const [breedingEligible, setBreedingEligible] = useState(false);
  const [potentialMates, setPotentialMates] = useState<PotentialMate[]>([]);
  const [selectedMate, setSelectedMate] = useState<PotentialMate | null>(null);
  const [breedingResult, setBreedingResult] = useState<BreedingResult | null>(null);
  const [breedingInProgress, setBreedingInProgress] = useState(false);
  const [pregnancyProgress, setPregnancyProgress] = useState(0);
  const [offspringCount, setOffspringCount] = useState(0);

  // --- Eligibility Check ---
   useEffect(() => {
     const checkBreedingEligibility = () => {
         if (!tamagotchi?.stats || !tamagotchi?.status) {
             setBreedingEligible(false); return;
         };
         const age = tamagotchi.age ?? 0;
         const health = tamagotchi.stats.health ?? 0;
         const isSick = tamagotchi.status.isSick ?? true;
         // --- Explicitly handle evolution stage number ---
         const evolutionStageValue = tamagotchi?.evolution?.stage; // Safe access
         let evolutionStageNumber = 0;
         if (typeof evolutionStageValue === 'number') { evolutionStageNumber = evolutionStageValue; }
         else if (typeof evolutionStageValue === 'string') { evolutionStageNumber = parseInt(evolutionStageValue, 10) || 0; }
         // --- End explicit handling ---
         const isEligible = age >= 15 && health >= 70 && !isSick && evolutionStageNumber >= 2; // Compare numbers
         setBreedingEligible(isEligible);
       };
     checkBreedingEligibility();
   }, [tamagotchi]);


  // --- Generate Mates (Runs Once) ---
  useEffect(() => {
    const mockMates: PotentialMate[] = [ // Ensure mock data matches interface
       { id: 'mate-1', name: 'Luna', owner: 'Alex', evolutionType: 'Mystic Creature', level: 18, rarity: 7, compatibility: 85, stats: { health: 90, happiness: 85 }, traits: { intelligence: 0.8, strength: 0.6, agility: 0.7 }, image: '🦄' },
       { id: 'mate-2', name: 'Rocky', owner: 'Sam', evolutionType: 'Athletic Runner', level: 16, rarity: 5, compatibility: 70, stats: { health: 95, happiness: 75 }, traits: { intelligence: 0.5, strength: 0.9, agility: 0.8 }, image: '🐇' },
       { id: 'mate-3', name: 'Whiskers', owner: 'Jordan', evolutionType: 'Wise Scholar', level: 17, rarity: 6, compatibility: 90, stats: { health: 85, happiness: 90 }, traits: { intelligence: 0.9, strength: 0.4, agility: 0.6 }, image: '🦉' }
    ];
    setPotentialMates(mockMates);
  }, []);


  // --- Generate Offspring Logic (wrapped in useCallback) ---
  const generateOffspring = useCallback(() => {
     console.log("Generating offspring...");
     if (!tamagotchi?.name || !selectedMate?.name || !tamagotchi?.dna || !selectedMate?.traits || offspringCount <= 0) { console.error("Cannot generate offspring: Missing required data."); setBreedingInProgress(false); return; };
     const parent1Traits = { intelligence: tamagotchi.dna?.traits?.intelligence ?? 0.5, strength: tamagotchi.dna?.traits?.strength ?? 0.5, agility: tamagotchi.dna?.traits?.agility ?? 0.5 };
     const parent1Rarity = tamagotchi.dna?.rarity ?? 3;
     const parent2Traits = selectedMate.traits; const parent2Rarity = selectedMate.rarity ?? 3;
     const offspring: BreedingOffspring[] = [];
     for (let i = 0; i < offspringCount; i++) {
       const combinedTraits = { intelligence: Math.max(0, Math.min(1, (parent1Traits.intelligence + parent2Traits.intelligence) / 2 + (Math.random() * 0.2 - 0.1))), strength: Math.max(0, Math.min(1, (parent1Traits.strength + parent2Traits.strength) / 2 + (Math.random() * 0.2 - 0.1))), agility: Math.max(0, Math.min(1, (parent1Traits.agility + parent2Traits.agility) / 2 + (Math.random() * 0.2 - 0.1)))};
       const baseRarity = Math.max(parent1Rarity, parent2Rarity); const rarityBonus = Math.random() * 2; const rarity = Math.max(1, Math.min(10, Math.floor(baseRarity + rarityBonus)));
       const names = ['Pip', 'Mochi', 'Bubbles', 'Spark', 'Fluff', 'Pebble', 'Ziggy', 'Nova', 'Echo', 'Pixel']; const name = `${names[Math.floor(Math.random() * names.length)]}-${Date.now().toString().slice(-3)}`;
       const evolutionTypes = ['Healthy Sprout', 'Athletic Runner', 'Wise Scholar', 'Mystic Creature']; const potentialEvolutions = [];
       if (combinedTraits.intelligence > 0.7) potentialEvolutions.push('Wise Scholar'); if (combinedTraits.strength > 0.7) potentialEvolutions.push('Athletic Runner'); if (rarity > 7) potentialEvolutions.push('Mystic Creature');
       const potentialEvolutionType = potentialEvolutions.length > 0 ? potentialEvolutions[Math.floor(Math.random() * potentialEvolutions.length)] : 'Healthy Sprout';
       offspring.push({ id: `offspring-${i}-${Date.now()}`, name, evolutionType: 'Baby Blob', potentialEvolutionType: potentialEvolutionType, rarity, traits: combinedTraits, image: '🥚' });
     }
     setBreedingResult({ parents: { parent1: tamagotchi.name, parent2: selectedMate.name }, offspring, timestamp: new Date() });
     console.log("Offspring generated:", offspring); setBreedingInProgress(false); setSelectedMate(null);
   }, [tamagotchi, selectedMate, offspringCount]);


  // --- Pregnancy Progress Simulation ---
   useEffect(() => {
     if (!breedingInProgress || pregnancyProgress >= 100) return;
     const progressInterval = setInterval(() => {
       setPregnancyProgress(prev => {
         const newProgress = prev + 10;
         if (newProgress >= 100) { clearInterval(progressInterval); generateOffspring(); return 100; }
         return newProgress;
       });
     }, 500); return () => clearInterval(progressInterval);
   }, [breedingInProgress, pregnancyProgress, generateOffspring]);


  // --- Event Handlers ---
  const selectMate = (mate: PotentialMate) => { setSelectedMate(mate); setBreedingResult(null); };
  const startBreeding = () => { if (!tamagotchi || !selectedMate || !breedingEligible || breedingInProgress) return; console.log("Starting breeding process..."); setBreedingInProgress(true); setPregnancyProgress(0); setBreedingResult(null); const numOffspring = 1 + Math.floor(Math.random() * 3); setOffspringCount(numOffspring); };

   // --- Helper Functions ---
   const getRarityColor = (rarity: number): string => { if (rarity >= 8) return 'bg-yellow-100 text-yellow-800'; if (rarity >= 6) return 'bg-purple-100 text-purple-800'; if (rarity >= 4) return 'bg-blue-100 text-blue-800'; return 'bg-green-100 text-green-800'; };

  // --- Render Logic ---
  if (!tamagotchi) { return <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">Loading Breeding System...</div>; }
   const displayAge = tamagotchi.age ?? 0; const displayHealth = tamagotchi.stats?.health ?? 0; const displayIsSick = tamagotchi.status?.isSick ?? true;
   // --- Explicitly handle evolution stage number for display ---
   const evolutionStageValueForDisplay = tamagotchi?.evolution?.stage;
   let displayEvolutionStage = 0;
   if (typeof evolutionStageValueForDisplay === 'number') { displayEvolutionStage = evolutionStageValueForDisplay; }
   else if (typeof evolutionStageValueForDisplay === 'string') { displayEvolutionStage = parseInt(evolutionStageValueForDisplay, 10) || 0; }
   // --- End explicit handling ---

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Breeding System</h2>
      {/* Breeding Eligibility */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50"><div className="flex items-center mb-2"><div className={`w-4 h-4 rounded-full mr-2 flex-shrink-0 ${breedingEligible ? 'bg-green-500' : 'bg-red-500'}`}></div><h3 className="font-semibold text-gray-800">Breeding Status</h3></div>{breedingEligible ? (<p className="text-sm text-green-700">Your Tamagotchi ({tamagotchi.name}) is eligible for breeding!</p>) : (<div><p className="text-sm text-red-700 mb-2">Your Tamagotchi ({tamagotchi.name}) is not yet eligible. Requirements:</p><ul className="list-disc list-inside text-xs text-gray-600 space-y-1"><li>Min age: 15 days ({displayAge >= 15 ? <span className="text-green-600 font-medium">✓ Met</span> : <span className="text-red-600 font-medium">✗ {displayAge.toFixed(1)} days</span>})</li><li>Min health: 70% ({displayHealth >= 70 ? <span className="text-green-600 font-medium">✓ Met</span> : <span className="text-red-600 font-medium">✗ {displayHealth.toFixed(0)}%</span>})</li><li>Not sick ({!displayIsSick ? <span className="text-green-600 font-medium">✓ Met</span> : <span className="text-red-600 font-medium">✗ Is Sick</span>})</li><li>Min evolution stage: 2 ({displayEvolutionStage >= 2 ? <span className="text-green-600 font-medium">✓ Met</span> : <span className="text-red-600 font-medium">✗ Stage {displayEvolutionStage}</span>})</li></ul></div>)}</div>
       {/* Breeding In Progress */}
      {breedingInProgress && (<div className="mb-6 p-4 border rounded-lg bg-pink-50"><h3 className="font-semibold mb-2 text-pink-800">Breeding in Progress...</h3><div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden mb-2 border border-pink-200"><div className="h-full bg-pink-500 transition-all duration-500 ease-linear" style={{ width: `${pregnancyProgress}%` }}></div></div><p className="text-center text-sm text-pink-700">{pregnancyProgress}% Complete</p><p className="text-center mt-1 text-sm text-pink-700">Expecting {offspringCount} offspring!</p></div>)}
      {/* Breeding Results */}
       {breedingResult && !breedingInProgress && (<div className="mb-6 p-4 border rounded-lg bg-indigo-50"><h3 className="font-semibold mb-2 text-indigo-800">Breeding Successful!</h3><p className="text-sm text-indigo-700 mb-3">{breedingResult.parents.parent1} & {breedingResult.parents.parent2} produced {breedingResult.offspring.length} offspring:</p><div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">{breedingResult.offspring.map((baby) => (<div key={baby.id} className="border rounded-lg p-3 bg-white shadow-sm text-center"><div className="flex justify-center mb-2"><div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl border">{baby.image}</div></div><h4 className="font-semibold text-sm">{baby.name}</h4><p className="text-xs text-gray-500 mb-2">{baby.evolutionType}</p><div className="flex justify-center mb-2"><span className={`text-xs px-2 py-0.5 rounded-full ${getRarityColor(baby.rarity)}`}>Rarity: {baby.rarity}/10</span></div><p className="text-xs text-gray-600 mb-2">Potential: {baby.potentialEvolutionType}</p><div className="text-xs text-left mt-2 space-y-1"><div title={`Intelligence: ${(baby.traits.intelligence * 100).toFixed(0)}%`}><span className="font-medium">INT:</span><div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${baby.traits.intelligence * 100}%` }}></div></div></div><div title={`Strength: ${(baby.traits.strength * 100).toFixed(0)}%`}><span className="font-medium">STR:</span><div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-red-500" style={{ width: `${baby.traits.strength * 100}%` }}></div></div></div><div title={`Agility: ${(baby.traits.agility * 100).toFixed(0)}%`}><span className="font-medium">AGI:</span><div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{ width: `${baby.traits.agility * 100}%` }}></div></div></div></div></div>))}</div><div className="flex justify-center mt-4"><button onClick={() => setBreedingResult(null)} className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 font-medium py-2 px-4 rounded-lg transition-colors text-sm">View New Offspring</button></div></div>)}
      {/* Potential Mates Selection */}
       {breedingEligible && !breedingInProgress && !breedingResult && (<div><h3 className="font-semibold mb-3 text-gray-800">Select a Mate</h3>{potentialMates.length > 0 ? (<div className="space-y-3">{potentialMates.map(mate => (<div key={mate.id} className={`border rounded-lg p-4 cursor-pointer transition-all duration-150 ease-in-out flex flex-col sm:flex-row items-start sm:items-center gap-4 ${ selectedMate?.id === mate.id ? 'bg-blue-50 border-blue-400 ring-2 ring-blue-200' : 'hover:bg-gray-50 hover:shadow-md' }`} onClick={() => selectMate(mate)} role="button" tabIndex={0} onKeyPress={(e) => e.key === 'Enter' && selectMate(mate)}><div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-3xl mr-4 flex-shrink-0 border">{mate.image}</div><div className="flex-1"><div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-1"><h4 className="font-semibold text-base">{mate.name}</h4><span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${getRarityColor(mate.rarity)}`}>Rarity: {mate.rarity}/10</span></div><p className="text-sm text-gray-600 mb-1">Owner: {mate.owner} • Lv {mate.level}</p>{/* <<< THIS LINE IS NOW CORRECT */} <p className="text-sm font-medium italic text-gray-700">{mate.evolutionType}</p><div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs"><div title={`Compatibility: ${mate.compatibility}%`}>Compatibility:<div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-0.5"><div className={`h-full ${mate.compatibility > 80 ? 'bg-green-500' : mate.compatibility > 60 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${mate.compatibility}%` }}></div></div></div><div title={`Health: ${mate.stats.health}%`}>Health:<div className="w-full h-1.5 bg-gray-200 rounded-full overflow-hidden mt-0.5"><div className="h-full bg-green-500" style={{ width: `${mate.stats.health}%` }}></div></div></div></div></div><div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-4 text-xs space-y-1 flex-shrink-0"><div className="font-medium mb-1">Traits:</div><div className="flex items-center gap-1" title={`Intelligence: ${(mate.traits.intelligence * 100).toFixed(0)}%`}><span className="w-6 text-center font-mono bg-blue-100 text-blue-700 rounded-sm">INT</span><div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-blue-500" style={{ width: `${mate.traits.intelligence * 100}%` }}></div></div></div><div className="flex items-center gap-1" title={`Strength: ${(mate.traits.strength * 100).toFixed(0)}%`}><span className="w-6 text-center font-mono bg-red-100 text-red-700 rounded-sm">STR</span><div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-red-500" style={{ width: `${mate.traits.strength * 100}%` }}></div></div></div><div className="flex items-center gap-1" title={`Agility: ${(mate.traits.agility * 100).toFixed(0)}%`}><span className="w-6 text-center font-mono bg-green-100 text-green-700 rounded-sm">AGI</span><div className="w-16 h-1.5 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{ width: `${mate.traits.agility * 100}%` }}></div></div></div></div></div>))}</div>) : (<p className="text-sm text-gray-500 italic">No potential mates available right now.</p>)}{selectedMate && (<div className="mt-6 flex justify-center border-t pt-6"><button onClick={startBreeding} disabled={!breedingEligible || breedingInProgress} className={`bg-pink-500 hover:bg-pink-600 text-white font-medium py-2 px-6 rounded-lg transition-colors ${!breedingEligible || breedingInProgress ? 'opacity-50 cursor-not-allowed' : ''}`}>Start Breeding with {selectedMate.name}</button></div>)}</div>)}
      {/* How Breeding Works Info Box */}
      <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100"><h3 className="text-sm font-semibold text-indigo-800 mb-1">How Breeding Works</h3><p className="text-xs text-indigo-700">Eligible Tamagotchis can mate to produce offspring with inherited traits (plus randomness!). Rarer parents have better odds for rare babies. Check eligibility criteria above!</p></div>
    </div>
  );
}