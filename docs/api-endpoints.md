# Tamagotchi App API Endpoints Design

## Overview

This document outlines the API endpoints for the Tamagotchi application, detailing the routes, request/response formats, and functionality for each endpoint.

## Authentication Endpoints

### User Registration
- **Endpoint**: `POST /api/auth/register`
- **Description**: Register a new user account
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "userId": "string",
    "token": "string"
  }
  ```

### User Login
- **Endpoint**: `POST /api/auth/login`
- **Description**: Authenticate a user and get access token
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "userId": "string",
    "token": "string",
    "expiresAt": "timestamp"
  }
  ```

### Logout
- **Endpoint**: `POST /api/auth/logout`
- **Description**: Invalidate the current user session
- **Request Body**: None
- **Response**:
  ```json
  {
    "success": true
  }
  ```

## Tamagotchi Management Endpoints

### Create Tamagotchi
- **Endpoint**: `POST /api/tamagotchi/create`
- **Description**: Create a new Tamagotchi for the user
- **Request Body**:
  ```json
  {
    "name": "string",
    "initialAttributes": {
      "color": "string",
      "personality": "string"
    }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "tamagotchiId": "string",
    "tamagotchi": {
      "id": "string",
      "name": "string",
      "evolutionType": "object",
      "stats": "object",
      "status": "object",
      "appearance": "object",
      "createdAt": "timestamp"
    }
  }
  ```

### Get Tamagotchi
- **Endpoint**: `GET /api/tamagotchi/:id`
- **Description**: Get details of a specific Tamagotchi
- **Parameters**: `id` - Tamagotchi ID
- **Response**:
  ```json
  {
    "id": "string",
    "name": "string",
    "evolutionType": {
      "id": "string",
      "name": "string",
      "description": "string",
      "rarity": "number"
    },
    "age": "number",
    "stats": {
      "hunger": "number",
      "thirst": "number",
      "happiness": "number",
      "energy": "number",
      "health": "number",
      "cleanliness": "number",
      "weight": "number"
    },
    "status": {
      "isSick": "boolean",
      "isSleeping": "boolean",
      "isPregnant": "boolean"
    },
    "appearance": {
      "baseForm": "string",
      "color": "string",
      "accessories": ["string"],
      "specialFeatures": ["string"]
    },
    "activities": {
      "lastFed": "timestamp",
      "lastDrink": "timestamp",
      "lastPlay": "timestamp",
      "lastWalk": "timestamp",
      "lastSleep": "timestamp",
      "lastClean": "timestamp"
    },
    "evolution": {
      "currentProgress": "number",
      "potentialEvolutions": ["object"]
    }
  }
  ```

### Update Tamagotchi
- **Endpoint**: `PUT /api/tamagotchi/:id`
- **Description**: Update Tamagotchi details
- **Parameters**: `id` - Tamagotchi ID
- **Request Body**:
  ```json
  {
    "name": "string",
    "appearance": {
      "accessories": ["string"]
    }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "tamagotchi": "object"
  }
  ```

### Feed Tamagotchi
- **Endpoint**: `POST /api/tamagotchi/:id/feed`
- **Description**: Feed the Tamagotchi with a specific food item
- **Parameters**: `id` - Tamagotchi ID
- **Request Body**:
  ```json
  {
    "foodItemId": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "newHungerLevel": "number",
    "newHappinessLevel": "number",
    "evolutionInfluence": "object",
    "message": "string"
  }
  ```

### Give Water to Tamagotchi
- **Endpoint**: `POST /api/tamagotchi/:id/drink`
- **Description**: Give water to the Tamagotchi
- **Parameters**: `id` - Tamagotchi ID
- **Response**:
  ```json
  {
    "success": true,
    "newThirstLevel": "number",
    "message": "string"
  }
  ```

### Play with Tamagotchi
- **Endpoint**: `POST /api/tamagotchi/:id/play`
- **Description**: Play with the Tamagotchi
- **Parameters**: `id` - Tamagotchi ID
- **Request Body**:
  ```json
  {
    "gameType": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "newHappinessLevel": "number",
    "newEnergyLevel": "number",
    "message": "string"
  }
  ```

### Take Tamagotchi for a Walk
- **Endpoint**: `POST /api/tamagotchi/:id/walk`
- **Description**: Take the Tamagotchi for a walk
- **Parameters**: `id` - Tamagotchi ID
- **Request Body**:
  ```json
  {
    "duration": "number",
    "locationData": "object"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "newHappinessLevel": "number",
    "newEnergyLevel": "number",
    "healthBonus": "number",
    "message": "string"
  }
  ```

### Put Tamagotchi to Sleep
- **Endpoint**: `POST /api/tamagotchi/:id/sleep`
- **Description**: Put the Tamagotchi to sleep
- **Parameters**: `id` - Tamagotchi ID
- **Response**:
  ```json
  {
    "success": true,
    "sleepStartTime": "timestamp",
    "message": "string"
  }
  ```

### Wake Up Tamagotchi
- **Endpoint**: `POST /api/tamagotchi/:id/wake`
- **Description**: Wake up the Tamagotchi
- **Parameters**: `id` - Tamagotchi ID
- **Response**:
  ```json
  {
    "success": true,
    "sleepDuration": "number",
    "newEnergyLevel": "number",
    "message": "string"
  }
  ```

### Clean Tamagotchi
- **Endpoint**: `POST /api/tamagotchi/:id/clean`
- **Description**: Clean or bathe the Tamagotchi
- **Parameters**: `id` - Tamagotchi ID
- **Response**:
  ```json
  {
    "success": true,
    "newCleanlinessLevel": "number",
    "newHappinessLevel": "number",
    "message": "string"
  }
  ```

### Get Tamagotchi Health
- **Endpoint**: `GET /api/tamagotchi/:id/health`
- **Description**: Get detailed health status of the Tamagotchi
- **Parameters**: `id` - Tamagotchi ID
- **Response**:
  ```json
  {
    "overallHealth": "number",
    "isSick": "boolean",
    "conditions": ["string"],
    "recommendations": ["string"],
    "healthHistory": ["object"]
  }
  ```

### Treat Tamagotchi
- **Endpoint**: `POST /api/tamagotchi/:id/treat`
- **Description**: Treat a sick Tamagotchi
- **Parameters**: `id` - Tamagotchi ID
- **Request Body**:
  ```json
  {
    "treatmentType": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "newHealthLevel": "number",
    "isSick": "boolean",
    "message": "string"
  }
  ```

## User Management Endpoints

### Get User Profile
- **Endpoint**: `GET /api/user/profile`
- **Description**: Get the current user's profile
- **Response**:
  ```json
  {
    "id": "string",
    "username": "string",
    "email": "string",
    "profile": {
      "avatar": "string",
      "joinDate": "timestamp",
      "petsOwned": "number",
      "rarestPet": "string"
    },
    "settings": {
      "notifications": "boolean",
      "locationTracking": "boolean",
      "fitnessIntegration": "boolean",
      "darkMode": "boolean",
      "soundEffects": "boolean"
    },
    "stats": {
      "careScore": "number",
      "breedingSuccess": "number",
      "rarityScore": "number"
    }
  }
  ```

### Update User Profile
- **Endpoint**: `PUT /api/user/profile`
- **Description**: Update the user's profile
- **Request Body**:
  ```json
  {
    "username": "string",
    "profile": {
      "avatar": "string"
    },
    "settings": {
      "notifications": "boolean",
      "locationTracking": "boolean",
      "fitnessIntegration": "boolean",
      "darkMode": "boolean",
      "soundEffects": "boolean"
    }
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "user": "object"
  }
  ```

### Log User Activity
- **Endpoint**: `POST /api/user/activity`
- **Description**: Log a user activity for lifestyle synchronization
- **Request Body**:
  ```json
  {
    "activityType": "string",
    "startTime": "timestamp",
    "endTime": "timestamp",
    "details": "object"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "activityId": "string",
    "tamagotchiEffects": ["object"]
  }
  ```

### Get User Statistics
- **Endpoint**: `GET /api/user/stats`
- **Description**: Get user statistics and achievements
- **Response**:
  ```json
  {
    "careScore": "number",
    "breedingSuccess": "number",
    "rarityScore": "number",
    "achievements": ["object"],
    "activitySummary": {
      "feedingCount": "number",
      "playingCount": "number",
      "walkingCount": "number",
      "cleaningCount": "number"
    }
  }
  ```

### Connect Device
- **Endpoint**: `POST /api/user/devices/connect`
- **Description**: Connect a fitness or tracking device
- **Request Body**:
  ```json
  {
    "deviceType": "string",
    "deviceName": "string",
    "authToken": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "deviceId": "string",
    "message": "string"
  }
  ```

## Breeding System Endpoints

### Get Potential Matches
- **Endpoint**: `GET /api/breeding/matches`
- **Description**: Get potential breeding matches for the user's Tamagotchi
- **Query Parameters**:
  - `tamagotchiId`: ID of the user's Tamagotchi
  - `rarity`: Filter by rarity level
  - `compatibilityMin`: Minimum compatibility percentage
- **Response**:
  ```json
  {
    "matches": [
      {
        "tamagotchiId": "string",
        "name": "string",
        "evolutionType": "object",
        "rarity": "number",
        "compatibility": "number",
        "owner": {
          "id": "string",
          "username": "string"
        },
        "potentialOffspringTraits": ["string"]
      }
    ]
  }
  ```

### Send Breeding Request
- **Endpoint**: `POST /api/breeding/request/:id`
- **Description**: Send a breeding request to another Tamagotchi
- **Parameters**: `id` - Target Tamagotchi ID
- **Request Body**:
  ```json
  {
    "tamagotchiId": "string",
    "message": "string"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "requestId": "string",
    "message": "string"
  }
  ```

### Get Breeding Requests
- **Endpoint**: `GET /api/breeding/requests`
- **Description**: Get incoming and outgoing breeding requests
- **Response**:
  ```json
  {
    "incoming": [
      {
        "requestId": "string",
        "fromTamagotchi": "object",
        "fromUser": "object",
        "message": "string",
        "requestDate": "timestamp",
        "compatibility": "number"
      }
    ],
    "outgoing": [
      {
        "requestId": "string",
        "toTamagotchi": "object",
        "toUser": "object",
        "message": "string",
        "requestDate": "timestamp",
        "status": "string"
      }
    ]
  }
  ```

### Accept Breeding Request
- **Endpoint**: `POST /api/breeding/accept/:id`
- **Description**: Accept a breeding request
- **Parameters**: `id` - Request ID
- **Response**:
  ```json
  {
    "success": true,
    "breedingId": "string",
    "pregnancyStartDate": "timestamp",
    "expectedOffspringCount": "number",
    "message": "string"
  }
  ```

### Get Offspring List
- **Endpoint**: `GET /api/breeding/offspring`
- **Description**: Get list of offspring from breeding
- **Response**:
  ```json
  {
    "offspring": [
      {
        "id": "string",
        "name": "string",
        "birthDate": "timestamp",
        "parents": {
          "parent1": "object",
          "parent2": "object"
        },
        "evolutionType": "object",
        "rarity": "number",
        "inheritedTraits": ["string"]
      }
    ]
  }
  ```

## Marketplace Endpoints

### Get Marketplace Listings
- **Endpoint**: `GET /api/market/listings`
- **Description**: Get marketplace listings
- **Query Parameters**:
  - `rarity`: Filter by rarity level
  - `priceMin`: Minimum price
  - `priceMax`: Maximum price
  - `type`: Filter by evolution type
  - `isAuction`: Filter for auctions only
- **Response**:
  ```json
  {
    "listings": [
      {
        "id": "string",
        "tamagotchi": "object",
        "price": "number",
        "seller": {
          "id": "string",
          "username": "string"
        },
        "isAuction": "boolean",
        "endDate": "timestamp",
        "currentBid": "number",
        "bidCount": "number",
        "listingDate": "timestamp"
      }
    ],
    "totalCount": "number"
  }
  ```

### Create Listing
- **Endpoint**: `POST /api/market/list`
- **Description**: Create a new marketplace listing
- **Request Body**:
  ```json
  {
    "tamagotchiId": "string",
    "price": "number",
    "description": "string",
    "isAuction": "boolean",
    "auctionDuration": "number"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "listingId": "string",
    "message": "string"
  }
  ```

### Get Listing Details
- **Endpoint**: `GET /api/market/listing/:id`
- **Description**: Get details of a specific listing
- **Parameters**: `id` - Listing ID
- **Response**:
  ```json
  {
    "id": "string",
    "tamagotchi": {
      "id": "string",
      "name": "string",
      "evolutionType": "object",
      "age": "number",
      "stats": "object",
      "appearance": "object",
      "rarity": "number"
    },
    "price": "number",
    "description": "string",
    "seller": {
      "id": "string",
      "username": "string",
      "rating": "number"
    },
    "isAuction": "boolean",
    "endDate": "timestamp",
    "currentBid": "number",
    "bidHistory": [
      {
        "userId": "string",
        "username": "string",
        "amount": "number",
        "bidTime": "timestamp"
      }
    ],
    "listingDate": "timestamp",
    "status": "string"
  }
  ```

### Purchase Tamagotchi
- **Endpoint**: `POST /api/market/buy/:id`
- **Description**: Purchase a Tamagotchi from a listing
- **Parameters**: `id` - Listing ID
- **Response**:
  ```json
  {
    "success": true,
    "transactionId": "string",
    "tamagotchiId": "string",
    "message": "string"
  }
  ```

### Place Bid
- **Endpoint**: `POST /api/market/bid/:id`
- **Description**: Place a bid on an auction
- **Parameters**: `id` - Listing ID
- **Request Body**:
  ```json
  {
    "amount": "number"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "bidId": "string",
    "isHighestBid": "boolean",
    "currentHighestBid": "number",
    "message": "string"
  }
  ```

### Get Transaction History
- **Endpoint**: `GET /api/market/history`
- **Description**: Get user's transaction history
- **Response**:
  ```json
  {
    "purchases": [
      {
        "transactionId": "string",
        "tamagotchi": "object",
        "price": "number",
        "seller": "object",
        "purchaseDate": "timestamp"
      }
    ],
    "sales": [
      {
        "transactionId": "string",
        "tamagotchi": "object",
        "price": "number",
        "buyer": "object",
        "saleDate": "timestamp"
      }
    ]
  }
  ```

## AI Interaction Endpoints

### Send Message to AI
- **Endpoint**: `POST /api/ai/message`
- **Description**: Send a message to the Tamagotchi's AI
- **Request Body**:
  ```json
  {
    "tamagotchiId": "string",
    "message": "string"
  }
  ```
- **Response**:
  ```json
  {
    "response": "string",
    "mood": "string",
    "actions": ["object"],
    "suggestions": ["string"]
  }
  ```

### Send Image to AI
- **Endpoint**: `POST /api/ai/image`
- **Description**: Send an image to the Tamagotchi's AI for analysis
- **Request Body**:
  ```json
  {
    "tamagotchiId": "string",
    "imageData": "base64string"
  }
  ```
- **Response**:
  ```json
  {
    "recognition": {
      "objects": ["string"],
      "activities": ["string"],
      "environment": "string"
    },
    "response": "string",
    "mood": "string",
    "actions": ["object"]
  }
  ```

### Get AI Personality
- **Endpoint**: `GET /api/ai/personality/:id`
- **Description**: Get the AI personality traits of a Tamagotchi
- **Parameters**: `id` - Tamagotchi ID
- **Response**:
  ```json
  {
    "traits": {
      "openness": "number",
      "conscientiousness": "number",
      "extraversion": "number",
      "agreeableness": "number",
      "neuroticism": "number"
    },
    "interests": ["string"],
    "communicationStyle": "string",
    "knowledgeAreas": ["string"],
    "developmentLevel": "number"
  }
  ```

## Food and Items Endpoints

### Get Available Food Items
- **Endpoint**: `GET /api/items/food`
- **Description**: Get list of available food items
- **Response**:
  ```json
  {
    "items": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "nutritionValue": "number",
        "evolutionInfluence": "object",
        "price": "number",
        "image": "string"
      }
    ]
  }
  ```

### Get User Inventory
- **Endpoint**: `GET /api/user/inventory`
- **Description**: Get user's inventory of items
- **Response**:
  ```json
  {
    "food": [
      {
        "itemId": "string",
        "name": "string",
        "quantity": "number"
      }
    ],
    "accessories": [
      {
        "itemId": "string",
        "name": "string",
        "quantity": "number"
      }
    ],
    "medicine": [
      {
        "itemId": "string",
        "name": "string",
        "quantity": "number"
      }
    ]
  }
  ```

### Purchase Item
- **Endpoint**: `POST /api/items/purchase`
- **Description**: Purchase an item for the user's inventory
- **Request Body**:
  ```json
  {
    "itemId": "string",
    "quantity": "number"
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "newBalance": "number",
    "inventory": "object"
  }
  ```

## Evolution Endpoints

### Get Evolution Types
- **Endpoint**: `GET /api/evolution/types`
- **Description**: Get all possible evolution types
- **Response**:
  ```json
  {
    "types": [
      {
        "id": "string",
        "name": "string",
        "description": "string",
        "rarity": "number",
        "requirements": "object",
        "image": "string"
      }
    ]
  }
  ```

### Get Evolution Progress
- **Endpoint**: `GET /api/tamagotchi/:id/evolution`
- **Description**: Get evolution progress for a Tamagotchi
- **Parameters**: `id` - Tamagotchi ID
- **Response**:
  ```json
  {
    "currentProgress": "number",
    "currentType": "object",
    "potentialEvolutions": [
      {
        "type": "object",
        "progress": "number",
        "requirements": {
          "met": ["string"],
          "unmet": ["string"]
        }
      }
    ],
    "evolutionHistory": [
      {
        "type": "object",
        "date": "timestamp"
      }
    ]
  }
  ```

## Error Handling

All endpoints will return appropriate HTTP status codes and error messages:

```json
{
  "success": false,
  "error": {
    "code": "string",
    "message": "string",
    "details": "object"
  }
}
```

Common error codes:
- `AUTH_REQUIRED`: Authentication required
- `INVALID_CREDENTIALS`: Invalid login credentials
- `RESOURCE_NOT_FOUND`: Requested resource not found
- `PERMISSION_DENIED`: User doesn't have permission
- `VALIDATION_ERROR`: Invalid request data
- `INSUFFICIENT_FUNDS`: Not enough currency for purchase
- `ALREADY_EXISTS`: Resource already exists
- `SERVER_ERROR`: Internal server error
