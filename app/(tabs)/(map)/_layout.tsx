import { Stack } from "expo-router"; // Import the Stack component from the expo-router library

// Define and export the MapLayout component
export default function MapLayout() {
  return (
    // Render a Stack component to manage the navigation stack
    <Stack>
      {/* Define a screen within the Stack */}
      <Stack.Screen
        name="index" // Name of the screen
        options={{ headerShown: false }} // Hide the header for this screen
      />
    </Stack>
  );
}
