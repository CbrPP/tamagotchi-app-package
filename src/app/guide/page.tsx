"use client";

import React, { useState, useEffect } from 'react'; // Added React import

// Define the structure for a section
interface SectionContent {
  title: string;
  content: string;
}

// Define the structure for the sections object
interface Sections {
  basics: SectionContent;
  evolution: SectionContent;
  lifestyle: SectionContent;
  ai: SectionContent;
  breeding: SectionContent;
  marketplace: SectionContent;
  // Add other sections here if needed
}

// Content for the guide sections
const sectionsData: Sections = {
    basics: {
      title: 'Basics',
      content: `
        <h3>Getting Started</h3>
        <p>Welcome to your Tamagotchi Life Coach! This guide will help you understand how to care for your virtual pet and get the most out of the experience.</p>

        <h3>Basic Care</h3>
        <p>Your Tamagotchi needs regular care to thrive. Make sure to:</p>
        <ul>
          <li>Feed it regularly</li>
          <li>Play with it daily</li>
          <li>Keep it clean</li>
          <li>Let it sleep</li>
          <li>Monitor its health</li>
        </ul>

        <h3>Navigation</h3>
        <p>Use the navigation bar at the top to access different features:</p>
        <ul>
          <li><strong>Dashboard:</strong> Overview of your Tamagotchi's status</li>
          <li><strong>Care:</strong> Feed, play, clean, and other care actions</li>
          <li><strong>Evolution:</strong> Track evolution progress and possible forms</li>
          <li><strong>Lifestyle:</strong> Sync your lifestyle with your Tamagotchi</li>
          <li><strong>AI Chat:</strong> Communicate with your Tamagotchi</li>
          <li><strong>Breeding:</strong> Breed with other Tamagotchis</li>
          <li><strong>Marketplace:</strong> Buy, sell, and trade Tamagotchis</li>
        </ul>
      `
    },
    evolution: {
      title: 'Evolution',
      content: `
        <h3>Evolution System</h3>
        <p>Your Tamagotchi will evolve based on how you care for it. Different care patterns lead to different evolutions.</p>

        <h3>Evolution Stages</h3>
        <ol>
          <li><strong>Egg:</strong> The beginning of every Tamagotchi's life</li>
          <li><strong>Baby Blob:</strong> The first form after hatching</li>
          <li><strong>Child Form:</strong> Develops based on early care patterns</li>
          <li><strong>Teen Form:</strong> Further specialization based on continued care</li>
          <li><strong>Adult Form:</strong> Final evolution with unique traits and abilities</li>
        </ol>

        <h3>Evolution Paths</h3>
        <p>There are several possible evolution paths:</p>
        <ul>
          <li><strong>Healthy Sprout:</strong> Balanced nutrition and regular exercise</li>
          <li><strong>Athletic Runner:</strong> High exercise, moderate nutrition, regular sleep</li>
          <li><strong>Wise Scholar:</strong> Mental stimulation, balanced lifestyle</li>
          <li><strong>Mystic Creature:</strong> Perfect balance of all stats, special care</li>
        </ul>

        <p>The better you care for your Tamagotchi, the faster it will evolve!</p>
      `
    },
    lifestyle: {
      title: 'Lifestyle Integration',
      content: `
        <h3>Syncing Your Lifestyle</h3>
        <p>Your Tamagotchi mirrors your lifestyle. When you take care of yourself, your Tamagotchi thrives too!</p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Sleep Schedule:</strong> Your Tamagotchi sleeps when you sleep</li>
          <li><strong>Meal Times:</strong> Your Tamagotchi eats when you eat</li>
          <li><strong>Exercise Routine:</strong> Your Tamagotchi exercises when you do</li>
          <li><strong>Water Intake:</strong> Track your hydration to keep your Tamagotchi healthy</li>
          <li><strong>Screen Time:</strong> Manage your screen time for better health</li>
        </ul>

        <h3>Fitness Device Integration</h3>
        <p>Connect your fitness devices to automatically sync your activity data with your Tamagotchi.</p>

        <h3>Benefits</h3>
        <p>This two-way relationship encourages healthy habits. As you improve your lifestyle, your Tamagotchi becomes healthier and evolves in positive ways.</p>
      `
    },
    ai: {
      title: 'AI Interaction',
      content: `
        <h3>Talking with Your Tamagotchi</h3>
        <p>Your Tamagotchi has its own personality and can communicate with you through the AI Chat feature.</p>

        <h3>Personality Development</h3>
        <p>Your Tamagotchi's personality evolves based on how you care for it and interact with it. The more you chat, the more its unique personality will develop.</p>

        <h3>Communication Features</h3>
        <ul>
          <li><strong>Text Chat:</strong> Type messages to your Tamagotchi</li>
          <li><strong>Image Sharing:</strong> Share images with your Tamagotchi</li>
          <li><strong>Voice Input:</strong> Speak to your Tamagotchi</li>
        </ul>

        <h3>AI Capabilities</h3>
        <p>Your Tamagotchi can:</p>
        <ul>
          <li>Answer questions about itself and its needs</li>
          <li>Provide health and lifestyle advice</li>
          <li>Offer motivation and encouragement</li>
          <li>Share interesting facts and information</li>
          <li>Express its feelings and emotions</li>
        </ul>
      `
    },
    breeding: {
      title: 'Breeding System',
      content: `
        <h3>Creating Unique Offspring</h3>
        <p>Once your Tamagotchi reaches maturity, it can breed with other Tamagotchis to create unique offspring.</p>

        <h3>How Breeding Works</h3>
        <ol>
          <li><strong>Find a Partner:</strong> Browse the breeding marketplace to find a compatible partner</li>
          <li><strong>Initiate Breeding:</strong> Send a breeding request to the other Tamagotchi's owner</li>
          <li><strong>Pregnancy Period:</strong> If successful, there's a waiting period before offspring are born</li>
          <li><strong>Birth:</strong> 1-3 baby Tamagotchis will be born with traits from both parents</li>
        </ol>

        <h3>Genetic Inheritance</h3>
        <p>Offspring inherit traits from both parents with some random variation. Rarer parents have a higher chance of producing rare offspring.</p>

        <h3>Breeding Strategy</h3>
        <p>For the best results:</p>
        <ul>
          <li>Breed Tamagotchis with complementary traits</li>
          <li>Look for partners with rare or desirable characteristics</li>
          <li>Ensure both Tamagotchis are in good health before breeding</li>
        </ul>
      `
    },
    marketplace: {
      title: 'Marketplace',
      content: `
        <h3>Trading Tamagotchis</h3>
        <p>The Marketplace allows you to buy, sell, and trade Tamagotchis with other users.</p>

        <h3>Key Features</h3>
        <ul>
          <li><strong>Listings:</strong> Browse available Tamagotchis for sale or breeding</li>
          <li><strong>Auctions:</strong> Bid on rare or valuable Tamagotchis</li>
          <li><strong>Direct Trading:</strong> Negotiate trades with other users</li>
          <li><strong>Events:</strong> Special marketplace events featuring rare Tamagotchis</li>
        </ul>

        <h3>Valuation Factors</h3>
        <p>A Tamagotchi's value is determined by:</p>
        <ul>
          <li>Rarity of evolution form</li>
          <li>Genetic traits and lineage</li>
          <li>Age and development stage</li>
          <li>Health and stat levels</li>
          <li>Special abilities or characteristics</li>
        </ul>

        <h3>Marketplace Ethics</h3>
        <p>Remember to treat all Tamagotchis with care, even when trading. A healthy marketplace benefits everyone!</p>
      `
    }
  };

// Define the type for the keys of sectionsData
type SectionKey = keyof Sections;

export default function GuidePage() {
  // Use SectionKey for the state type
  const [currentSection, setCurrentSection] = useState<SectionKey>('basics');

  // Use the defined sectionsData
  const sections = sectionsData;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header can be simplified or removed if using a main layout */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                 {/* Link might need adjustment based on routing setup */}
                <a href="/" className="text-xl font-bold text-blue-600">
                  Tamagotchi Life Coach
                </a>
              </div>
               {/* Main nav links could be part of a separate layout component */}
              {/* <nav className="ml-6 flex space-x-8"> ... </nav> */}
            </div>
             <div className="flex items-center">
               {/* Login link might be part of user auth status */}
              <a href="/login" className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Login
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 border-b">
                <h1 className="text-2xl font-bold">Tamagotchi Guide</h1>
                <p className="text-gray-600">Everything you need to know about your virtual pet companion</p>
              </div>

              <div className="flex flex-col md:flex-row">
                {/* Sidebar Navigation */}
                <div className="w-full md:w-64 bg-gray-50 p-4 border-r">
                  <h3 className="text-xs font-semibold uppercase text-gray-500 mb-3">Guide Sections</h3>
                  <nav className="space-y-1">
                    {/* Corrected Map Function */}
                    {(Object.keys(sections) as SectionKey[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => setCurrentSection(key)}
                        className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                          currentSection === key
                            ? 'bg-blue-100 text-blue-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                        }`}
                      >
                        {sections[key].title}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Content Area */}
                <div className="flex-1 p-6">
                  {/* Render title safely */}
                   <h2 className="text-xl font-bold mb-4">{sections[currentSection]?.title || 'Select a Section'}</h2>
                   {/* Render content safely */}
                  <div
                    className="prose max-w-none prose-sm sm:prose lg:prose-lg xl:prose-xl" // Added prose classes for basic styling
                    dangerouslySetInnerHTML={{ __html: sections[currentSection]?.content || '<p>Select a section from the left.</p>' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer can be simplified or removed if using a main layout */}
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} Tamagotchi Life Coach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}