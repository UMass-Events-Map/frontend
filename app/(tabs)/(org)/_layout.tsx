import { Stack } from "expo-router"; // Import the Stack component from the expo-router library

// Define and export the OrgLayout component
export default function OrgLayout() {
  return (
    // Render a Stack component to manage the navigation stack
    <Stack
      // Set screen options for the Stack component
      screenOptions={{
        // Set the background color of the content to white
        contentStyle: { backgroundColor: "white" },
      }}
    >
      {/* Define a screen within the Stack for the login page */}
      <Stack.Screen
        name="login" // Name of the screen
        options={{ headerShown: false }} // Hide the header for this screen
      />
      {/* Define a screen within the Stack for the organization main page */}
      <Stack.Screen
        name="org" // Name of the screen
        options={{
          headerShown: false, // Hide the header for this screen
          headerTitle: "Main Page", // Set the title for the header
        }}
      />
      {/* Define a screen within the Stack for adding an event */}
      <Stack.Screen
        name="addEvent" // Name of the screen
        options={{
          headerShown: true, // Show the header for this screen
          headerTitle: "Event Form", // Set the title for the header
          headerTintColor: "#AD3835", // Set the tint color for the header
        }}
      />
      {/* Define a screen within the Stack for editing an event */}
      <Stack.Screen
        name="editEvent" // Name of the screen
        options={{
          headerShown: true, // Show the header for this screen
          headerTitle: "Edit Event Form", // Set the title for the header
          headerTintColor: "#AD3835", // Set the tint color for the header
        }}
      />
    </Stack>
  );
}
