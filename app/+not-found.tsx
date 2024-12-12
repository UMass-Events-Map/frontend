import { Link, Stack } from "expo-router"; // Import Link and Stack components from expo-router
import { StyleSheet } from "react-native"; // Import StyleSheet from react-native

import { ThemedText } from "@/components/expoComponents/ThemedText"; // Import ThemedText component
import { ThemedView } from "@/components/expoComponents/ThemedView"; // Import ThemedView component

// Define and export the NotFoundScreen component
export default function NotFoundScreen() {
  return (
    <>
      {/* Set the screen options for the stack navigator */}
      <Stack.Screen options={{ title: "Oops!" }} />
      {/* ThemedView component to provide consistent theming */}
      <ThemedView style={styles.container}>
        {/* Display a message indicating the screen doesn't exist */}
        <ThemedText type="title">This screen doesn't exist.</ThemedText>
        {/* Link component to navigate back to the home screen */}
        <Link href="/" style={styles.link}>
          <ThemedText type="link">Go to home screen!</ThemedText>
        </Link>
      </ThemedView>
    </>
  );
}

// Define styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1, // Flex value to fill the available space
    alignItems: "center", // Center align items horizontally
    justifyContent: "center", // Center align items vertically
    padding: 20, // Padding of 20 units
  },
  link: {
    marginTop: 15, // Top margin of 15 units
    paddingVertical: 15, // Vertical padding of 15 units
  },
});
