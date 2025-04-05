# Tamagotchi Life Coach - Technical Documentation

## Architecture Overview

The Tamagotchi Life Coach app is built using Next.js, a React framework that provides server-side rendering, static site generation, and a robust development environment. The application follows a component-based architecture with state management through React Context.

## Project Structure

```
tamagotchi-app-nextjs/
├── migrations/             # Database migration files
├── src/
│   ├── app/                # Next.js app router pages
│   │   ├── ai/             # AI interaction page
│   │   ├── breeding/       # Breeding system page
│   │   ├── care/           # Tamagotchi care page
│   │   ├── dashboard/      # Main dashboard page
│   │   ├── evolution/      # Evolution tracking page
│   │   ├── guide/          # User guide page
│   │   ├── lifestyle/      # Lifestyle integration page
│   │   ├── login/          # Authentication page
│   │   ├── marketplace/    # Trading marketplace page
│   │   └── page.tsx        # Home/landing page
│   ├── components/         # Reusable React components
│   │   ├── auth/           # Authentication components
│   │   ├── layout/         # Layout components
│   │   └── tamagotchi/     # Tamagotchi-specific components
│   ├── hooks/              # Custom React hooks
│   └── lib/                # Utility functions and services
├── public/                 # Static assets
└── docs/                   # Documentation files
```

## Key Components

### State Management

The application uses React Context for state management, with several key contexts:

1. **TamagotchiContext**: Manages the core Tamagotchi state including:
   - Basic stats (hunger, happiness, energy, hygiene, health)
   - Evolution state and progress
   - Care history and activities
   - Current form and appearance

2. **UserContext**: Handles user authentication and profile information:
   - User credentials and session management
   - User preferences and settings
   - Owned Tamagotchis and inventory

### Core Features Implementation

#### Tamagotchi Character

The floating Tamagotchi character is implemented using:
- CSS animations for the floating effect
- State-based rendering for different emotions and states
- Dynamic styling based on current stats and evolution stage

```jsx
// TamagotchiCharacter.tsx
// This component renders the visual representation of the Tamagotchi
// It changes appearance based on current state, health, and evolution
```

#### Evolution System

The evolution system tracks care patterns over time and determines evolution paths:

```jsx
// EvolutionSystem.tsx
// Monitors care patterns and calculates evolution progress
// Determines potential evolution paths based on care history
// Triggers evolution events when thresholds are reached
```

#### Lifestyle Integration

The lifestyle integration connects user habits with Tamagotchi wellbeing:

```jsx
// LifestyleIntegration.tsx
// Synchronizes user schedule with Tamagotchi activities
// Processes lifestyle data from user input and connected devices
// Applies effects to Tamagotchi based on user behavior
```

#### AI Interaction

The AI companion feature provides intelligent interaction:

```jsx
// EnhancedAICompanion.tsx
// Manages conversation state and history
// Processes user input (text, voice, images)
// Generates contextual responses based on Tamagotchi state
// Develops personality traits over time
```

#### Breeding System

The breeding system allows Tamagotchis to create offspring:

```jsx
// BreedingSystem.tsx
// Handles compatibility calculations between Tamagotchis
// Manages breeding process including waiting periods
// Generates offspring with inherited and random traits
// Tracks lineage and genetic history
```

#### Marketplace

The marketplace facilitates trading between users:

```jsx
// MarketplaceSystem.tsx
// Manages listings, auctions, and direct trades
// Handles transaction processing and validation
// Calculates value based on rarity, traits, and market demand
```

## Database Schema

The application uses a relational database with the following key tables:

1. **Users**: User accounts and authentication
2. **Tamagotchis**: All Tamagotchi instances with their stats and state
3. **Evolution_History**: Record of evolution events and transformations
4. **Care_Activities**: Log of all care actions performed
5. **Lifestyle_Data**: User lifestyle information and schedules
6. **Breeding_Records**: History of breeding events and outcomes
7. **Marketplace_Listings**: Active and past marketplace listings
8. **Transactions**: Record of all marketplace transactions

## API Endpoints

The application provides several API endpoints for client-server communication:

### User Management
- `POST /api/auth/register`: Create new user account
- `POST /api/auth/login`: Authenticate user
- `GET /api/auth/user`: Get current user profile
- `PUT /api/auth/user`: Update user profile

### Tamagotchi Management
- `GET /api/tamagotchi/:id`: Get Tamagotchi details
- `POST /api/tamagotchi/create`: Create new Tamagotchi
- `PUT /api/tamagotchi/:id/care`: Perform care action
- `GET /api/tamagotchi/:id/stats`: Get current stats
- `GET /api/tamagotchi/:id/evolution`: Get evolution status

### Lifestyle Integration
- `POST /api/lifestyle/sync`: Sync lifestyle data
- `PUT /api/lifestyle/schedule`: Update lifestyle schedule
- `POST /api/lifestyle/activity`: Log lifestyle activity

### Breeding System
- `GET /api/breeding/compatible`: Get compatible partners
- `POST /api/breeding/initiate`: Start breeding process
- `GET /api/breeding/offspring/:id`: Get offspring details

### Marketplace
- `GET /api/marketplace/listings`: Get active listings
- `POST /api/marketplace/create`: Create new listing
- `POST /api/marketplace/bid`: Place bid on auction
- `POST /api/marketplace/purchase`: Complete purchase

## Deployment

The application is deployed using the Next.js deployment system, which provides:
- Optimized production builds
- Static page generation where possible
- Server-side rendering for dynamic content
- API routes for backend functionality

## Future Enhancements

Potential areas for future development include:

1. **Enhanced AI**: More sophisticated AI interaction with deeper personality development
2. **Advanced Genetics**: More complex genetic inheritance system for breeding
3. **Social Features**: Friend lists, social interactions, and community events
4. **Expanded Evolution**: Additional evolution paths and special forms
5. **Augmented Reality**: AR features to see your Tamagotchi in the real world
6. **Wearable Integration**: Deeper integration with fitness wearables and health devices

## Performance Considerations

The application is optimized for:
- Mobile performance with responsive design
- Battery efficiency for background processes
- Data usage optimization for lifestyle tracking
- Memory management for long-term usage

## Security Measures

Security features include:
- Secure authentication with JWT tokens
- Data encryption for sensitive information
- Rate limiting on API endpoints
- Input validation and sanitization
- Regular security audits and updates
