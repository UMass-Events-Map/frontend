import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native"; // Import themes and ThemeProvider from react-navigation
import { useFonts } from "expo-font"; // Import useFonts hook from expo-font
import { Stack } from "expo-router"; // Import Stack component from expo-router
import * as SplashScreen from "expo-splash-screen"; // Import SplashScreen from expo-splash-screen
import "react-native-reanimated"; // Import react-native-reanimated for animations
import { SheetProvider } from "react-native-actions-sheet"; // Import SheetProvider from react-native-actions-sheet
import "@/components/sheets"; // Import custom sheets
import { SafeAreaProvider } from "react-native-safe-area-context"; // Import SafeAreaProvider from react-native-safe-area-context
import { useColorScheme } from "@/hooks/useColorScheme"; // Import custom hook for color scheme
import {
  GestureHandlerRootView,
  NativeViewGestureHandler,
} from "react-native-gesture-handler"; // Import gesture handler components
// import Auth from './(tabs)/(org)/login' // Import Auth component (commented out)
import { View, Text } from "react-native"; // Import View and Text components from react-native
import { Session } from "@supabase/supabase-js"; // Import Session type from supabase-js
import { supabase } from "@/utils/supabase"; // Import supabase client
import { useState, useEffect } from "react"; // Import useState and useEffect hooks from React

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// const Stack = createStackNavigator();

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme(); // Get the current color scheme (dark or light)
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"), // Load custom font
  });
  const [session, setSession] = useState<Session | null>(null); // State to manage user session

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync(); // Hide the splash screen once fonts are loaded
    }
    // Get the current session from supabase
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session); // Set the session state
    });

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session); // Update the session state
    });
  }, [loaded]); // Dependency array includes loaded to re-run effect when fonts are loaded

  if (!loaded) {
    return null; // Return null if fonts are not loaded yet
  }

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <SheetProvider>
          <ThemeProvider
            value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
          >
            <Stack
              screenOptions={{
                contentStyle: { backgroundColor: "white" }, // Set the background color for all screens
              }}
            >
              {/* Define the main tab navigator */}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              {/* Define a screen for handling not found routes */}
              <Stack.Screen name="+not-found" />
            </Stack>
          </ThemeProvider>
        </SheetProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}
