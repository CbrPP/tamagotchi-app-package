# Tamagotchi Life Coach

A next-generation virtual pet app that combines traditional Tamagotchi care mechanics with modern features like lifestyle integration, AI interaction, and a breeding marketplace.

## Features

- **Floating Character**: Virtual pet that floats on your screen and transforms based on care
- **Lifestyle Integration**: Syncs with your sleep, meals, exercise, and daily routines
- **Evolution System**: Multiple evolution paths based on care patterns
- **AI Interaction**: Chat with your Tamagotchi using advanced AI
- **Breeding System**: Create unique offspring with special traits
- **Marketplace**: Buy, sell, and trade rare Tamagotchis

## Getting Started

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn package manager

### Installation

1. Clone this repository
```
git clone https://github.com/yourusername/tamagotchi-life-coach.git
```

2. Install dependencies
```
cd tamagotchi-life-coach
npm install
```

3. Start the development server
```
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Building for Production

To create a production build:

```
npm run build
```

To start the production server:

```
npm run start
```

## Deployment

This application can be deployed to various platforms:

### Vercel (Recommended)

The easiest way to deploy this Next.js application is using Vercel:

1. Create an account on [Vercel](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Run `vercel` in the project directory and follow the prompts

### Other Platforms

The application can also be deployed to:
- Netlify
- AWS Amplify
- Google Cloud Run
- Any platform that supports Node.js applications

## Documentation

For detailed information about the application:

- [User Guide](./docs/user_guide.md) - Complete guide for end users
- [Technical Documentation](./docs/technical_documentation.md) - Architecture and implementation details

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

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Inspired by the original Tamagotchi virtual pets
- Built with Next.js and React
- Uses modern web technologies for optimal performance

## Contact

For any questions or support, please contact support@tamagotchicoach.com
