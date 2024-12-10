import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import {SheetProvider} from 'react-native-actions-sheet';
import '@/components/sheets';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView, NativeViewGestureHandler } from 'react-native-gesture-handler';
//import Auth from './(tabs)/(org)/login'
import { View, Text } from 'react-native'
import { Session } from '@supabase/supabase-js'
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from 'react'

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
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
