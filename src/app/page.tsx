"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const [showDemo, setShowDemo] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <a href="/" className="text-xl font-bold text-blue-600">
                  Tamagotchi Life Coach
                </a>
              </div>
              <nav className="ml-6 flex space-x-8">
                <a href="/dashboard" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Dashboard
                </a>
                <a href="/care" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Care
                </a>
                <a href="/evolution" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Evolution
                </a>
                <a href="/lifestyle" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Lifestyle
                </a>
                <a href="/ai" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  AI Chat
                </a>
                <a href="/breeding" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Breeding
                </a>
                <a href="/marketplace" className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300">
                  Marketplace
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <a href="/login" className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                Login
              </a>
            </div>
          </div>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <div className="relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Meet Your Virtual</span>
                <span className="block text-blue-600">Life Coach</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                A Tamagotchi that mirrors your lifestyle, evolves with your habits, and helps you become the best version of yourself.
              </p>
              <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
                <div className="rounded-md shadow">
                  <a
                    href="/dashboard"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                  </a>
                </div>
                <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                  <button
                    onClick={() => setShowDemo(true)}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                  >
                    Watch Demo
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating Tamagotchi Animation */}
          <div className="absolute top-1/2 right-10 transform -translate-y-1/2 hidden lg:block">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center animate-bounce shadow-lg">
              <span className="text-5xl">🐣</span>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Everything You Need in a Virtual Pet
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                More than just a game, it's a companion that helps you build better habits.
              </p>
            </div>
            
            <div className="mt-10">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-blue-500 rounded-md shadow-lg">
                          <span className="text-white text-2xl">🏃</span>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Lifestyle Integration</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Your Tamagotchi mirrors your real-life habits. When you sleep, exercise, or eat healthy, your virtual pet thrives too.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                          <span className="text-white text-2xl">🧠</span>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">AI Interaction</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Chat with your Tamagotchi using advanced AI. It develops its own personality based on how you care for it.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-purple-500 rounded-md shadow-lg">
                          <span className="text-white text-2xl">🧬</span>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Evolution System</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Your care patterns determine how your Tamagotchi evolves. Different lifestyles lead to different forms.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-green-500 rounded-md shadow-lg">
                          <span className="text-white text-2xl">❤️</span>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Breeding System</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Breed your Tamagotchi with others to create unique offspring with special traits and characteristics.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-yellow-500 rounded-md shadow-lg">
                          <span className="text-white text-2xl">🏆</span>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Marketplace</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Buy, sell, and trade rare Tamagotchis with other users in our vibrant marketplace.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="pt-6">
                  <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                    <div className="-mt-6">
                      <div>
                        <span className="inline-flex items-center justify-center p-3 bg-red-500 rounded-md shadow-lg">
                          <span className="text-white text-2xl">📱</span>
                        </span>
                      </div>
                      <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Device Integration</h3>
                      <p className="mt-5 text-base text-gray-500">
                        Connect with fitness trackers and health apps to automatically sync your activity data.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* How It Works Section */}
        <div className="py-16 bg-blue-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">How It Works</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Your Journey with Tamagotchi Life Coach
              </p>
            </div>
            
            <div className="mt-12">
              <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                <div>
                  <div className="mt-10 space-y-10">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                          <span className="text-xl">1</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg leading-6 font-medium text-gray-900">Create Your Tamagotchi</h4>
                        <p className="mt-2 text-base text-gray-500">
                          Start with a basic egg that will hatch into your companion. Name it and begin your journey together.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                          <span className="text-xl">2</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg leading-6 font-medium text-gray-900">Care for Your Pet</h4>
                        <p className="mt-2 text-base text-gray-500">
                          Feed, play, clean, and care for your Tamagotchi. Your care patterns will influence its growth.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                          <span className="text-xl">3</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg leading-6 font-medium text-gray-900">Sync Your Lifestyle</h4>
                        <p className="mt-2 text-base text-gray-500">
                          Connect your real-life habits with your Tamagotchi. As you improve your lifestyle, your pet thrives.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                          <span className="text-xl">4</span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-lg leading-6 font-medium text-gray-900">Watch It Evolve</h4>
                        <p className="mt-2 text-base text-gray-500">
                          Your Tamagotchi will evolve based on your care. Different lifestyles lead to different evolutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 lg:mt-0 flex justify-center">
                  <div className="w-64 h-64 bg-white rounded-full shadow-xl flex items-center justify-center">
                    <div className="w-48 h-48 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                      <span className="text-7xl">🐣</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="py-16 bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-blue-600 tracking-wide uppercase">Testimonials</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                What Our Users Say
              </p>
            </div>
            
            <div className="mt-12 grid gap-8 lg:grid-cols-3">
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                    👩
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Sarah K.</h4>
                    <p className="text-gray-500 text-sm">Fitness Enthusiast</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "My Tamagotchi has helped me stay consistent with my workouts. Knowing that my virtual pet's health depends on my activity keeps me motivated!"
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                    👨
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Michael T.</h4>
                    <p className="text-gray-500 text-sm">Software Developer</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "The AI chat feature is amazing! My Tamagotchi has developed a witty personality and reminds me to take breaks during long coding sessions."
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                    👧
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium">Emma R.</h4>
                    <p className="text-gray-500 text-sm">College Student</p>
                  </div>
                </div>
                <p className="text-gray-600">
                  "I've bred some rare Tamagotchis and sold them on the marketplace. It's fun to see what unique traits they develop based on my care!"
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="bg-blue-700">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              <span className="block">Ready to start your journey?</span>
              <span className="block text-blue-200">Get your Tamagotchi today.</span>
            </h2>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/dashboard"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                  Get Started
                </a>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="/guide"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                  Learn More
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <a href="/" className="text-xl font-bold text-blue-600">
                Tamagotchi Life Coach
              </a>
            </div>
            <div className="mt-8 md:mt-0">
              <p className="text-center text-base text-gray-400">
                &copy; 2025 Tamagotchi Life Coach. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setShowDemo(false)}></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Tamagotchi Life Coach Demo
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        This would be a video demo in the actual application.
                      </p>
                      <div className="mt-4 bg-gray-100 rounded-lg p-4 flex items-center justify-center h-64">
                        <div className="text-center">
                          <div className="text-5xl mb-4">🎬</div>
                          <p className="text-gray-700">Demo Video Placeholder</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDemo(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
