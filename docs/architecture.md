# Tamagotchi App Architecture

## Overview

The Tamagotchi app is designed as a modern mobile-first web application using Next.js. The architecture follows a component-based approach with clear separation of concerns between the UI, business logic, and data layers.

## Architecture Layers

### 1. Presentation Layer
- **UI Components**: Reusable React components for the user interface
- **Pages**: Next.js pages for routing and layout
- **Animations**: System for rendering and animating the Tamagotchi character
- **Styles**: Tailwind CSS for styling

### 2. Application Layer
- **State Management**: React Context and hooks for global state
- **Business Logic**: Services for handling game mechanics
- **Event System**: For handling interactions and time-based events
- **AI Integration**: For personality and interaction capabilities

### 3. Data Layer
- **API Routes**: Next.js API routes for server-side operations
- **Database Access**: D1 database interactions via Cloudflare Workers
- **External API Integration**: For fitness devices, location services, etc.
- **Storage**: For user data, Tamagotchi states, and assets

## Component Architecture

### Core Components

1. **TamagotchiContainer**
   - Main container for the Tamagotchi character
   - Handles rendering and animation states
   - Manages floating behavior on screen

2. **TamagotchiCharacter**
   - Renders the visual appearance of the Tamagotchi
   - Handles transformations and evolutions
   - Manages character animations and expressions

3. **InteractionPanel**
   - UI for user interactions with the Tamagotchi
   - Contains buttons for feeding, playing, etc.
   - Displays status indicators

4. **StatusDashboard**
   - Displays Tamagotchi's vital statistics
   - Shows health, hunger, happiness metrics
   - Visualizes growth and evolution progress

5. **ActivityTracker**
   - Monitors user activities via device sensors
   - Tracks location, movement, and exercise
   - Synchronizes with Tamagotchi's needs

6. **AIInteractionModule**
   - Handles verbal and visual communication
   - Processes user questions and provides responses
   - Manages personality development

7. **BreedingSystem**
   - Manages matching with other Tamagotchis
   - Handles pregnancy and offspring mechanics
   - Tracks DNA inheritance

8. **Marketplace**
   - Interface for trading Tamagotchis
   - Auction and direct sale functionality
   - Displays listings and transaction history

### Supporting Components

1. **NotificationSystem**
   - Manages alerts for Tamagotchi needs
   - Schedules reminders for care activities
   - Provides updates on status changes

2. **SettingsPanel**
   - User preferences and app configuration
   - Privacy and permission settings
   - Account management

3. **TutorialSystem**
   - Guides for new users
   - Explains game mechanics and features
   - Provides tips for optimal care

4. **AnalyticsTracker**
   - Monitors user engagement
   - Tracks Tamagotchi development
   - Provides insights on care patterns

## State Management

The app uses a combination of React Context and custom hooks for state management:

1. **TamagotchiContext**
   - Stores current Tamagotchi state
   - Provides methods for updating state
   - Handles persistence of state changes

2. **UserContext**
   - Manages user authentication and profile
   - Tracks user activities and routines
   - Handles user preferences

3. **AppContext**
   - Manages global app state
   - Handles theme and UI preferences
   - Manages notifications and alerts

## API Endpoints

### Tamagotchi Management
- `GET /api/tamagotchi/:id` - Get Tamagotchi details
- `POST /api/tamagotchi/create` - Create new Tamagotchi
- `PUT /api/tamagotchi/:id` - Update Tamagotchi state
- `POST /api/tamagotchi/:id/feed` - Feed Tamagotchi
- `POST /api/tamagotchi/:id/play` - Play with Tamagotchi
- `POST /api/tamagotchi/:id/sleep` - Put Tamagotchi to sleep
- `POST /api/tamagotchi/:id/wake` - Wake up Tamagotchi
- `POST /api/tamagotchi/:id/clean` - Clean Tamagotchi
- `GET /api/tamagotchi/:id/health` - Get health status

### User Management
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile
- `POST /api/user/activity` - Log user activity
- `GET /api/user/stats` - Get user statistics

### Breeding System
- `GET /api/breeding/matches` - Get potential matches
- `POST /api/breeding/request/:id` - Send breeding request
- `GET /api/breeding/requests` - Get breeding requests
- `POST /api/breeding/accept/:id` - Accept breeding request
- `GET /api/breeding/offspring` - Get offspring list

### Marketplace
- `GET /api/market/listings` - Get marketplace listings
- `POST /api/market/list` - Create new listing
- `GET /api/market/listing/:id` - Get listing details
- `POST /api/market/buy/:id` - Purchase Tamagotchi
- `POST /api/market/bid/:id` - Place bid on auction
- `GET /api/market/history` - Get transaction history

### AI Interaction
- `POST /api/ai/message` - Send message to AI
- `POST /api/ai/image` - Send image to AI
- `GET /api/ai/personality` - Get AI personality traits

## Data Flow

1. **User Interaction Flow**
   - User interacts with Tamagotchi via UI
   - Action is processed by relevant component
   - State is updated via context
   - API call is made to persist changes
   - UI updates to reflect new state

2. **Background Processing Flow**
   - Time-based events trigger in background
   - Tamagotchi state is updated automatically
   - Notifications are sent for important changes
   - UI updates to reflect new state

3. **User Activity Tracking Flow**
   - Sensors detect user activity
   - Activity is processed and categorized
   - Relevant Tamagotchi attributes are affected
   - UI updates to show synchronization

4. **AI Interaction Flow**
   - User input is sent to AI service
   - Response is generated based on personality
   - Interaction affects Tamagotchi's mood/state
   - UI updates to show response and effects

## Technical Considerations

1. **Performance Optimization**
   - Efficient rendering for animations
   - Background processing for time-based events
   - Lazy loading for marketplace and breeding features
   - Optimized asset loading for different devices

2. **Offline Capabilities**
   - Local storage for Tamagotchi state
   - Queuing of actions when offline
   - Synchronization when connection restored
   - Graceful degradation of features

3. **Security Considerations**
   - Secure authentication for user accounts
   - Protection against marketplace fraud
   - Privacy controls for location and activity data
   - Secure storage of user information

4. **Scalability**
   - Efficient database design for growing user base
   - Optimized API endpoints for high traffic
   - Caching strategies for common requests
   - Distributed processing for AI interactions

## Technology Stack

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes, Cloudflare Workers
- **Database**: D1 (SQLite-compatible)
- **Authentication**: JWT-based auth system
- **AI Integration**: External AI service with custom wrapper
- **Animation**: Framer Motion for smooth animations
- **Deployment**: Cloudflare Pages
