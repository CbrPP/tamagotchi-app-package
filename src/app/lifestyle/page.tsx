"use client";

import React, { useState, useEffect } from 'react'; // Added React import
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTamagotchi } from '@/components/tamagotchi/TamagotchiContext'; // Assuming context path
import { Activity, BedDouble, Utensils } from 'lucide-react'; // Example icons

// Define structure for lifestyle data (example)
interface LifestyleData {
  sleep: { enabled: boolean; bedtime: string; waketime: string; };
  meals: { enabled: boolean; mealCount: number; };
  exercise: { enabled: boolean; frequency: string; }; // e.g., 'daily', '3 times a week'
  // Add other categories as needed
}

export default function LifestylePage() {
  const { tamagotchi } = useTamagotchi() || {}; // Handle potential null context
  // Simulate user's lifestyle settings - in a real app, this would be fetched/saved
  const [userLifestyleData, setUserLifestyleData] = useState<LifestyleData>({
    sleep: { enabled: true, bedtime: '22:00', waketime: '07:00' },
    meals: { enabled: true, mealCount: 3 },
    exercise: { enabled: false, frequency: 'Not Set' },
  });

  // Function to update state - ADDED TYPE ANNOTATIONS
  const updateLifestyleSettings = (category: keyof LifestyleData, key: string, value: any) => {
     setUserLifestyleData(prev => {
        const newData = { ...prev };
        // Type assertion needed because TypeScript can't guarantee category/key combinations
        (newData[category] as any)[key] = value;
        return newData;
     });
     // In a real app, you'd also save this data (e.g., API call)
     console.log(`Updated ${category}.${key} to ${value}`);
  };


  // Effect to potentially sync Tamagotchi state based on lifestyle (example)
  useEffect(() => {
    if (tamagotchi && userLifestyleData.sleep.enabled) {
      // Basic example: make tamagotchi sleepy near user's bedtime
      // More complex logic would be needed here
      console.log("Checking sleep sync...");
    }
     if (tamagotchi && userLifestyleData.exercise.enabled) {
       console.log("Checking exercise sync...");
       // Potentially increase Tamagotchi energy/health if user exercises
     }

  }, [userLifestyleData, tamagotchi]);


  return (
    <div className="container mx-auto p-4 md:p-6">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Lifestyle Integration</CardTitle>
          <CardDescription>Sync your daily habits with your Tamagotchi's needs.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            When you sync your lifestyle, your Tamagotchi's schedule and well-being can align with yours.
            Taking care of yourself helps take care of your virtual pet!
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sleep Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><BedDouble className="mr-2 h-5 w-5" /> Sleep Schedule</CardTitle>
            <CardDescription>Sync your sleep times.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="sleep-enabled">Enable Sleep Sync</Label>
              <Switch
                id="sleep-enabled"
                checked={userLifestyleData.sleep.enabled}
                onCheckedChange={(checked) => updateLifestyleSettings('sleep', 'enabled', checked)}
              />
            </div>
            {userLifestyleData.sleep.enabled && (
              <>
                <div className="space-y-1">
                  <Label htmlFor="bedtime">Bedtime</Label>
                  <Input
                    id="bedtime"
                    type="time"
                    value={userLifestyleData.sleep.bedtime}
                    onChange={(e) => updateLifestyleSettings('sleep', 'bedtime', e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="waketime">Wake-up Time</Label>
                  <Input
                    id="waketime"
                    type="time"
                    value={userLifestyleData.sleep.waketime}
                    onChange={(e) => updateLifestyleSettings('sleep', 'waketime', e.target.value)}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Meal Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Utensils className="mr-2 h-5 w-5" /> Meal Times</CardTitle>
            <CardDescription>Align feeding times with your meals.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
              <Label htmlFor="meals-enabled">Enable Meal Sync</Label>
              <Switch
                id="meals-enabled"
                checked={userLifestyleData.meals.enabled}
                onCheckedChange={(checked) => updateLifestyleSettings('meals', 'enabled', checked)}
              />
            </div>
             {userLifestyleData.meals.enabled && (
                <div className="space-y-1">
                  <Label htmlFor="meal-count">Meals Per Day</Label>
                  <Input
                    id="meal-count"
                    type="number"
                    min="1"
                    max="10" // Example limits
                    value={userLifestyleData.meals.mealCount}
                    onChange={(e) => updateLifestyleSettings('meals', 'mealCount', parseInt(e.target.value) || 1)}
                  />
                </div>
             )}
          </CardContent>
        </Card>

        {/* Exercise Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center"><Activity className="mr-2 h-5 w-5" /> Exercise Routine</CardTitle>
            <CardDescription>Connect your fitness activity.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
              <Label htmlFor="exercise-enabled">Enable Exercise Sync</Label>
              <Switch
                id="exercise-enabled"
                checked={userLifestyleData.exercise.enabled}
                onCheckedChange={(checked) => updateLifestyleSettings('exercise', 'enabled', checked)}
              />
            </div>
             {userLifestyleData.exercise.enabled && (
               <>
                 <p className="text-sm text-gray-600">
                   Connect fitness apps/devices (integration feature coming soon!)
                 </p>
                 {/* Placeholder for frequency or connection status */}
                  <div className="space-y-1">
                   <Label htmlFor="exercise-freq">Activity Level (Placeholder)</Label>
                    <Input
                      id="exercise-freq"
                      type="text"
                      value={userLifestyleData.exercise.frequency}
                      onChange={(e) => updateLifestyleSettings('exercise', 'frequency', e.target.value)}
                      placeholder="e.g., Daily walks"
                    />
                  </div>
               </>
             )}
          </CardContent>
        </Card>

        {/* Add more cards for other lifestyle categories */}

      </div>

       <div className="mt-8 text-center">
         <Button >Save Lifestyle Settings</Button>
          {/* In a real app, this button would trigger saving data to backend/localStorage */}
       </div>
    </div>
  );
}