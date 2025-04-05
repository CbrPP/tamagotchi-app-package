# Tamagotchi App State Management Design

## Overview

This document outlines the state management approach for the Tamagotchi application, detailing how data flows through the application and how different states are managed.

## State Structure

### 1. Tamagotchi State

```typescript
interface TamagotchiState {
  id: string;
  name: string;
  evolutionType: EvolutionType;
  age: number; // in days
  stats: {
    hunger: number; // 0-100
    thirst: number; // 0-100
    happiness: number; // 0-100
    energy: number; // 0-100
    health: number; // 0-100
    cleanliness: number; // 0-100
    weight: number; // in kg
  };
  status: {
    isSick: boolean;
    isSleeping: boolean;
    isPregnant: boolean;
    pregnancyStartDate?: Date;
  };
  appearance: {
    baseForm: string;
    color: string;
    accessories: string[];
    specialFeatures: string[];
  };
  dna: {
    rarity: number; // 1-10
    traits: Record<string, number>; // trait name to value mapping
    inheritedFeatures: string[];
  };
  activities: {
    lastFed: Date;
    lastDrink: Date;
    lastPlay: Date;
    lastWalk: Date;
    lastSleep: Date;
    lastClean: Date;
  };
  evolution: {
    currentProgress: number; // 0-100
    potentialEvolutions: EvolutionType[];
    evolutionHistory: {
      type: EvolutionType;
      date: Date;
    }[];
  };
}
```

### 2. User State

```typescript
interface UserState {
  id: string;
  username: string;
  email: string;
  profile: {
    avatar: string;
    joinDate: Date;
    petsOwned: number;
    rarestPet: string;
  };
  settings: {
    notifications: boolean;
    locationTracking: boolean;
    fitnessIntegration: boolean;
    darkMode: boolean;
    soundEffects: boolean;
  };
  lifestyle: {
    sleepSchedule: {
      bedtime: string; // HH:MM format
      wakeTime: string; // HH:MM format
    };
    mealTimes: {
      breakfast: string;
      lunch: string;
      dinner: string;
    };
    exerciseRoutine: {
      frequency: number; // days per week
      duration: number; // minutes per session
      preferredActivities: string[];
    };
    waterIntake: number; // target glasses per day
  };
  connectedDevices: {
    type: string;
    name: string;
    connected: boolean;
  }[];
  stats: {
    careScore: number; // 0-100
    breedingSuccess: number; // percentage
    rarityScore: number; // calculated from owned pets
  };
}
```

### 3. App State

```typescript
interface AppState {
  currentScreen: string;
  notifications: Notification[];
  modals: {
    isOpen: boolean;
    type: string;
    data: any;
  };
  theme: 'light' | 'dark';
  floatingCharacter: {
    isVisible: boolean;
    position: {
      x: number;
      y: number;
    };
    isMinimized: boolean;
  };
  systemStatus: {
    isOnline: boolean;
    lastSynced: Date;
    pendingActions: any[];
  };
}
```

### 4. Marketplace State

```typescript
interface MarketplaceState {
  listings: Listing[];
  auctions: Auction[];
  filters: {
    rarity: number[];
    priceRange: [number, number];
    types: string[];
    searchTerm: string;
  };
  userListings: Listing[];
  userBids: Bid[];
  transactionHistory: Transaction[];
}
```

### 5. Breeding State

```typescript
interface BreedingState {
  potentialMatches: Match[];
  incomingRequests: BreedingRequest[];
  outgoingRequests: BreedingRequest[];
  activeBreedings: Breeding[];
  offspring: Offspring[];
  matchFilters: {
    rarity: number[];
    compatibilityMin: number;
    types: string[];
  };
}
```

## State Management Implementation

### React Context Structure

The application will use multiple React Context providers to manage different aspects of the state:

```jsx
// App structure with context providers
const App = () => {
  return (
    <AuthProvider>
      <UserProvider>
        <TamagotchiProvider>
          <AppStateProvider>
            <MarketplaceProvider>
              <BreedingProvider>
                <Router>
                  <AppLayout />
                </Router>
              </BreedingProvider>
            </MarketplaceProvider>
          </AppStateProvider>
        </TamagotchiProvider>
      </UserProvider>
    </AuthProvider>
  );
};
```

### Custom Hooks

Each context will have associated custom hooks for accessing and updating state:

```typescript
// Example hooks
const useTamagotchi = () => useContext(TamagotchiContext);
const useUser = () => useContext(UserContext);
const useApp = () => useContext(AppContext);
const useMarketplace = () => useContext(MarketplaceContext);
const useBreeding = () => useContext(BreedingContext);
```

### State Update Patterns

1. **Direct State Updates**:
   ```typescript
   const { updateTamagotchiStat } = useTamagotchi();
   updateTamagotchiStat('hunger', 70);
   ```

2. **Action-Based Updates**:
   ```typescript
   const { dispatchTamagotchiAction } = useTamagotchi();
   dispatchTamagotchiAction({ type: 'FEED', payload: { foodItem: 'apple' } });
   ```

3. **Async Updates with API Calls**:
   ```typescript
   const { feedTamagotchi } = useTamagotchi();
   await feedTamagotchi(tamagotchiId, foodItemId);
   ```

## State Persistence

### Local Storage

For offline capabilities and quick loading:

```typescript
// Save state to local storage
const saveTamagotchiState = (state) => {
  localStorage.setItem('tamagotchi', JSON.stringify(state));
};

// Load state from local storage
const loadTamagotchiState = () => {
  const saved = localStorage.getItem('tamagotchi');
  return saved ? JSON.parse(saved) : initialState;
};
```

### Database Synchronization

For persistent storage and multi-device access:

```typescript
// Sync with database
const syncTamagotchiState = async (state) => {
  try {
    await api.updateTamagotchi(state.id, state);
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
```

## Time-Based State Changes

The Tamagotchi's state will change over time, requiring background processing:

```typescript
// Background timer for state changes
useEffect(() => {
  const timer = setInterval(() => {
    updateTamagotchiOverTime();
  }, 60000); // Update every minute
  
  return () => clearInterval(timer);
}, []);

// State update function
const updateTamagotchiOverTime = () => {
  dispatchTamagotchiAction({ type: 'TIME_PASSED', payload: { minutes: 1 } });
};
```

## User Activity Integration

The app will monitor user activities and reflect them in the Tamagotchi's state:

```typescript
// Track user activity
const trackUserActivity = (activity) => {
  dispatchUserAction({ type: 'LOG_ACTIVITY', payload: activity });
  
  // Reflect in Tamagotchi state if relevant
  if (activity.type === 'SLEEP') {
    dispatchTamagotchiAction({ 
      type: 'SYNC_WITH_USER_SLEEP', 
      payload: activity 
    });
  }
};
```

## Notification System

State changes will trigger notifications when needed:

```typescript
// Monitor state for notification triggers
useEffect(() => {
  checkForNotifications(tamagotchiState);
}, [tamagotchiState]);

// Check if notifications are needed
const checkForNotifications = (state) => {
  if (state.stats.hunger < 20) {
    addNotification({
      type: 'HUNGER',
      message: `${state.name} is hungry!`,
      priority: 'high'
    });
  }
};
```

## State Debugging Tools

For development purposes:

```typescript
// Debug component
const StateDebugger = () => {
  const { state } = useTamagotchi();
  
  return (
    <div className="debug-panel">
      <h3>Tamagotchi State</h3>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  );
};
```

## Performance Considerations

1. **Memoization** for expensive calculations:
   ```typescript
   const evolutionProgress = useMemo(() => {
     return calculateEvolutionProgress(tamagotchiState);
   }, [tamagotchiState.stats, tamagotchiState.activities]);
   ```

2. **Selective Rendering** to prevent unnecessary updates:
   ```typescript
   const TamagotchiStats = memo(({ stats }) => {
     return (
       <StatsDisplay stats={stats} />
     );
   });
   ```

3. **Batch Updates** for multiple state changes:
   ```typescript
   const handleFeedingComplete = () => {
     batchedUpdate(() => {
       updateStat('hunger', 100);
       updateStat('happiness', happiness + 10);
       logActivity('FEED');
     });
   };
   ```

## Error Handling

```typescript
const { updateTamagotchiStat, error } = useTamagotchi();

// Try to update state
try {
  await updateTamagotchiStat('hunger', 70);
} catch (err) {
  // Handle error locally
  console.error('Failed to update hunger:', err);
  
  // Queue for retry when online
  queueOfflineAction({
    type: 'UPDATE_STAT',
    payload: { stat: 'hunger', value: 70 }
  });
}

// Display errors to user if needed
if (error) {
  showErrorToast(error.message);
}
```

## Conclusion

This state management design provides a comprehensive approach to handling the complex state requirements of the Tamagotchi application. By using a combination of React Context, custom hooks, and efficient update patterns, the application can maintain a responsive and consistent user experience while supporting the rich feature set required.
