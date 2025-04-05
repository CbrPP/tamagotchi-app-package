"use client";

import { useEffect, useState } from 'react';
import TamagotchiCharacter from './TamagotchiCharacter';
import { useTamagotchi } from './TamagotchiContext';

interface TamagotchiContainerProps {
  floatingMode?: boolean;
}

export default function TamagotchiContainer({ floatingMode = false }: TamagotchiContainerProps) {
  const { tamagotchi } = useTamagotchi();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [direction, setDirection] = useState({ x: 1, y: 1 });
  const [isAnimating, setIsAnimating] = useState(floatingMode);

  // Floating animation effect
  useEffect(() => {
    if (!floatingMode || !isAnimating) return;
    
    const moveInterval = setInterval(() => {
      setPosition(prev => {
        // Calculate new position
        let newX = prev.x + direction.x * 0.5;
        let newY = prev.y + direction.y * 0.5;
        let newDirectionX = direction.x;
        let newDirectionY = direction.y;
        
        // Bounce off edges
        if (newX <= 0 || newX >= 90) {
          newDirectionX = -direction.x;
        }
        if (newY <= 0 || newY >= 90) {
          newDirectionY = -direction.y;
        }
        
        // Update direction if needed
        if (newDirectionX !== direction.x || newDirectionY !== direction.y) {
          setDirection({ x: newDirectionX, y: newDirectionY });
        }
        
        // Ensure position stays within bounds
        newX = Math.max(0, Math.min(90, newX));
        newY = Math.max(0, Math.min(90, newY));
        
        return { x: newX, y: newY };
      });
    }, 50);
    
    return () => clearInterval(moveInterval);
  }, [floatingMode, isAnimating, direction]);

  // Occasionally change direction randomly
  useEffect(() => {
    if (!floatingMode || !isAnimating) return;
    
    const changeDirectionInterval = setInterval(() => {
      if (Math.random() < 0.1) { // 10% chance to change direction
        setDirection(prev => ({
          x: Math.random() > 0.5 ? -prev.x : prev.x,
          y: Math.random() > 0.5 ? -prev.y : prev.y
        }));
      }
    }, 3000);
    
    return () => clearInterval(changeDirectionInterval);
  }, [floatingMode, isAnimating]);

  if (!tamagotchi) {
    return null;
  }

  return (
    <div 
      className={`relative ${floatingMode ? 'fixed inset-0 pointer-events-none z-50' : 'h-64'}`}
    >
      <div 
        className={`absolute transition-all duration-300 ${floatingMode ? 'pointer-events-auto' : ''}`}
        style={{ 
          left: `${position.x}%`, 
          top: `${position.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <TamagotchiCharacter 
          tamagotchi={tamagotchi} 
          size={floatingMode ? 'sm' : 'lg'} 
        />
      </div>
    </div>
  );
}
