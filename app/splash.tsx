import { useSession } from '@/contexts/session';
import { SplashScreen } from 'expo-router';

export function SplashScreenController() {
  const { isLoading } = useSession();
  console.log({ isLoading });

  if (!isLoading) {
    SplashScreen.hideAsync();
  }

  return null;
}

export default SplashScreenController;
