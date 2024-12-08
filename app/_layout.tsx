import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import {SheetProvider} from 'react-native-actions-sheet';
import '@/components/sheets';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView, NativeViewGestureHandler } from 'react-native-gesture-handler';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView> 
   
        <SheetProvider>
            
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack
                screenOptions={{
                  contentStyle: { backgroundColor: "white"}
                }}>

                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />  
                <Stack.Screen name="+not-found" />
                
              </Stack>
            </ThemeProvider>

        </SheetProvider>

      </GestureHandlerRootView> 

    </SafeAreaProvider>
    
    
    
      
  );
}
