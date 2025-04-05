import { UserProvider } from '../auth/UserContext';
import { TamagotchiProvider } from '../tamagotchi/TamagotchiContext';
import { ReactNode } from 'react';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <UserProvider>
      <TamagotchiProvider>
        {children}
      </TamagotchiProvider>
    </UserProvider>
  );
}
