"use client";

import { useEffect, useState } from 'react';
import { useTamagotchi } from './TamagotchiContext';

export default function AppTutorial() {
  const { tamagotchi } = useTamagotchi();
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false);
  const [tutorialCompleted, setTutorialCompleted] = useState(false);

  useEffect(() => {
    // Check if tutorial has been completed before
    const tutorialStatus = localStorage.getItem('tamagotchiTutorialCompleted');
    if (tutorialStatus === 'true') {
      setTutorialCompleted(true);
    } else if (tamagotchi) {
      // Only show tutorial if user has a Tamagotchi and hasn't completed tutorial
      setShowTutorial(true);
    }
  }, [tamagotchi]);

  const tutorialSteps = [
    {
      title: "Welcome to Tamagotchi Life Coach!",
      content: "This tutorial will guide you through the basics of caring for your virtual pet. Your Tamagotchi is more than just a pet - it's a companion that mirrors your lifestyle and helps you develop better habits.",
      image: "🐣"
    },
    {
      title: "Dashboard",
      content: "The Dashboard shows your Tamagotchi's current status. Monitor hunger, thirst, happiness, energy, health, and cleanliness here. Keep these stats balanced for a healthy pet!",
      image: "📊"
    },
    {
      title: "Care Menu",
      content: "Use the Care menu to feed, water, play with, and clean your Tamagotchi. Regular care is essential for your pet's wellbeing and evolution.",
      image: "🍎"
    },
    {
      title: "Evolution",
      content: "Your Tamagotchi will evolve based on how you care for it. Different care patterns lead to different evolutions, each with unique traits and abilities.",
      image: "🦋"
    },
    {
      title: "Lifestyle Integration",
      content: "Your real-life habits affect your Tamagotchi! When you sleep, exercise, eat well, and maintain a healthy routine, your Tamagotchi will thrive.",
      image: "🏃"
    },
    {
      title: "AI Interaction",
      content: "Chat with your Tamagotchi! It has its own personality that develops over time. You can have conversations, share images, and even use voice commands.",
      image: "💬"
    },
    {
      title: "Breeding",
      content: "Once your Tamagotchi reaches maturity, it can breed with other Tamagotchis to create unique offspring with inherited traits.",
      image: "❤️"
    },
    {
      title: "Marketplace",
      content: "Buy, sell, and trade Tamagotchis in the marketplace. Rare evolutions and offspring with exceptional traits are particularly valuable!",
      image: "🛒"
    },
    {
      title: "You're Ready!",
      content: "That's all you need to know to get started! Remember, your Tamagotchi needs regular care and attention to thrive. Have fun!",
      image: "🎉"
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeTutorial();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeTutorial = () => {
    setShowTutorial(false);
    setTutorialCompleted(true);
    localStorage.setItem('tamagotchiTutorialCompleted', 'true');
  };

  const restartTutorial = () => {
    setCurrentStep(0);
    setShowTutorial(true);
    setTutorialCompleted(false);
    localStorage.removeItem('tamagotchiTutorialCompleted');
  };

  if (!showTutorial) {
    return (
      <div className="text-center mt-4">
        {tutorialCompleted && (
          <button
            onClick={restartTutorial}
            className="text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-1 px-3 rounded transition-colors"
          >
            Show Tutorial Again
          </button>
        )}
      </div>
    );
  }

  const currentTutorialStep = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="p-6">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-4xl">
              {currentTutorialStep.image}
            </div>
          </div>
          
          <h2 className="text-xl font-bold mb-2 text-center">{currentTutorialStep.title}</h2>
          <p className="text-gray-600 mb-6 text-center">{currentTutorialStep.content}</p>
          
          <div className="flex justify-between items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
            >
              Previous
            </button>
            
            <div className="text-sm text-gray-500">
              Step {currentStep + 1} of {tutorialSteps.length}
            </div>
            
            <button
              onClick={nextStep}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition-colors"
            >
              {currentStep < tutorialSteps.length - 1 ? 'Next' : 'Finish'}
            </button>
          </div>
          
          <div className="mt-4 text-center">
            <button
              onClick={completeTutorial}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              Skip Tutorial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
