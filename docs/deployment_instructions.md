# Deployment Instructions

This document provides detailed instructions for deploying the Tamagotchi Life Coach application to various environments.

## Local Deployment

### Development Environment

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Access the application at `http://localhost:3000`

### Production Build (Local)

1. Create a production build:
```bash
npm run build
```

2. Start the production server:
```bash
npm run start
```

3. Access the application at `http://localhost:3000`

## Cloud Deployment

### Vercel (Recommended)

Vercel is the easiest platform for deploying Next.js applications:

1. Create an account on [Vercel](https://vercel.com)
2. Install Vercel CLI:
```bash
npm install -g vercel
```

3. Deploy from your project directory:
```bash
vercel
```

4. Follow the prompts to complete deployment
5. For production deployment:
```bash
vercel --prod
```

### Netlify

1. Create an account on [Netlify](https://netlify.com)
2. Install Netlify CLI:
```bash
npm install -g netlify-cli
```

3. Build your application:
```bash
npm run build
```

4. Deploy the application:
```bash
netlify deploy
```

5. For production deployment:
```bash
netlify deploy --prod
```

## Database Setup

1. The application uses a SQL database. Run migrations to set up the schema:
```bash
npx wrangler d1 execute DB --local --file=migrations/0001_tamagotchi_schema.sql
```

2. For production, ensure your database connection string is properly configured in environment variables.

## Environment Variables

The application uses the following environment variables that should be configured in production:

```
DATABASE_URL=your_database_connection_string
AUTH_SECRET=your_auth_secret_key
API_KEY=your_api_key_for_external_services
```

Create a `.env.local` file for local development or configure these in your hosting platform's environment settings.

## Troubleshooting

If you encounter issues during deployment:

1. Check the logs from your hosting platform
2. Verify all environment variables are correctly set
3. Ensure database connections are properly configured
4. Check for any build errors in the console output

For additional support, refer to the technical documentation or contact the development team.
