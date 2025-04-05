"use client";

import { useEffect, useState } from 'react';

interface TamagotchiCharacterProps {
  tamagotchi: any;
  size?: 'sm' | 'md' | 'lg';
}

export default function TamagotchiCharacter({ tamagotchi, size = 'md' }: TamagotchiCharacterProps) {
  const [mood, setMood] = useState<'happy' | 'neutral' | 'sad' | 'sick' | 'sleeping' | 'hungry' | 'thirsty'>('neutral');
  const [animation, setAnimation] = useState<string>('idle');
  
  // Determine size class
  const sizeClass = 
    size === 'sm' ? 'w-16 h-16' : 
    size === 'lg' ? 'w-32 h-32' : 
    'w-24 h-24';
  
  // Update mood based on tamagotchi stats
  useEffect(() => {
    if (!tamagotchi) return;
    
    if (tamagotchi.status.isSleeping) {
      setMood('sleeping');
    } else if (tamagotchi.status.isSick) {
      setMood('sick');
    } else if (tamagotchi.stats.hunger < 30) {
      setMood('hungry');
    } else if (tamagotchi.stats.thirst < 30) {
      setMood('thirsty');
    } else if (tamagotchi.stats.happiness > 70) {
      setMood('happy');
    } else if (tamagotchi.stats.happiness < 40) {
      setMood('sad');
    } else {
      setMood('neutral');
    }
  }, [tamagotchi]);
  
  // Random animations
  useEffect(() => {
    if (tamagotchi?.status.isSleeping) return;
    
    const animationInterval = setInterval(() => {
      const randomNum = Math.random();
      
      if (randomNum < 0.1) {
        // 10% chance to play a random animation
        const animations = ['bounce', 'wiggle', 'spin', 'jump'];
        const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
        setAnimation(randomAnimation);
        
        // Reset animation after a delay
        setTimeout(() => {
          setAnimation('idle');
        }, 1000);
      }
    }, 5000);
    
    return () => clearInterval(animationInterval);
  }, [tamagotchi]);
  
  // Get character emoji based on evolution type and mood
  const getCharacterEmoji = () => {
    if (!tamagotchi) return '❓';
    
    if (tamagotchi.status.isSleeping) {
      return '😴';
    }
    
    if (tamagotchi.status.isSick) {
      return '🤒';
    }
    
    const evolutionType = tamagotchi.evolutionType;
    
    if (evolutionType === 'Baby Blob') {
      if (mood === 'happy') return '😊';
      if (mood === 'sad') return '😢';
      if (mood === 'hungry') return '🥺';
      if (mood === 'thirsty') return '😮';
      return '🐣';
    }
    
    if (evolutionType === 'Healthy Sprout') {
      if (mood === 'happy') return '😄';
      if (mood === 'sad') return '😔';
      if (mood === 'hungry') return '😋';
      if (mood === 'thirsty') return '💧';
      return '🌱';
    }
    
    if (evolutionType === 'Athletic Runner') {
      if (mood === 'happy') return '😁';
      if (mood === 'sad') return '😓';
      if (mood === 'hungry') return '🍖';
      if (mood === 'thirsty') return '💦';
      return '🏃';
    }
    
    if (evolutionType === 'Wise Scholar') {
      if (mood === 'happy') return '😌';
      if (mood === 'sad') return '😞';
      if (mood === 'hungry') return '📚';
      if (mood === 'thirsty') return '🍵';
      return '🦉';
    }
    
    if (evolutionType === 'Mystic Creature') {
      if (mood === 'happy') return '✨';
      if (mood === 'sad') return '💫';
      if (mood === 'hungry') return '🌟';
      if (mood === 'thirsty') return '☄️';
      return '🦄';
    }
    
    return '❓';
  };
  
  // Get animation class
  const getAnimationClass = () => {
    if (animation === 'bounce') return 'animate-bounce';
    if (animation === 'wiggle') return 'animate-wiggle';
    if (animation === 'spin') return 'animate-spin';
    if (animation === 'jump') return 'animate-jump';
    return '';
  };
  
  if (!tamagotchi) {
    return null;
  }
  
  return (
    <div 
      className={`${sizeClass} bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center ${getAnimationClass()}`}
    >
      <span className="text-3xl">{getCharacterEmoji()}</span>
    </div>
  );
}
