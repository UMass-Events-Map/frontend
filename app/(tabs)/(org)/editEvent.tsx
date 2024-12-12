import EventForm from "@/components/EventForm"; // Import the EventForm component from the specified path
import { useState } from "react"; // Import the useState hook from React
import {
  SafeAreaView,
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
} from "react-native"; // Import necessary components from react-native

// Define and export the editEventForm component
export default function editEventForm() {
  return (
    // SafeAreaView ensures that the content is rendered within the safe area boundaries of a device
    <SafeAreaView style={{ flex: 1 }}>
      {/* Render the EventForm component */}
      <EventForm />
      {/* Footer container to hold the DELETE EVENT and SAVE CHANGES buttons */}
      <View style={styles.footerContainer}>
        {/* TouchableHighlight component to create a button with a highlight effect when pressed */}
        <TouchableHighlight
          style={styles.buttonContainer} // Apply styles to the button
          onPress={() => console.log("works")} // Log a message when the button is pressed
          underlayColor={"#7E2622"} // Color of the button when pressed
        >
          {/* Text component to display the button text */}
          <Text style={styles.editEventButtonText}>DELETE EVENT</Text>
        </TouchableHighlight>
        {/* TouchableHighlight component to create a button with a highlight effect when pressed */}
        <TouchableHighlight
          style={styles.buttonContainer} // Apply styles to the button
          onPress={() => console.log("works")} // Log a message when the button is pressed
          underlayColor={"#7E2622"} // Color of the button when pressed
        >
          {/* Text component to display the button text */}
          <Text style={styles.editEventButtonText}>SAVE CHANGES</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  // Style for the footer container
  footerContainer: {
    justifyContent: "center", // Center the content horizontally
    alignItems: "center", // Center the content vertically
    width: "100%", // Full width of the screen
    position: "absolute", // Position the container absolutely
    bottom: "3%", // Position it 3% from the bottom
    flexDirection: "row", // Arrange children in a row
  },
  // Style for the button container
  buttonContainer: {
    backgroundColor: "#AD3835", // Background color of the button
    borderRadius: 3, // Rounded corners
    height: 40, // Height of the button
    alignItems: "center", // Center the content horizontally
    justifyContent: "center", // Center the content vertically
    width: "40%", // Width of the button
    marginHorizontal: "2%", // Horizontal margin between buttons
  },
  // Style for the button text
  editEventButtonText: {
    fontWeight: "bold", // Bold text
    fontSize: 15, // Font size
    color: "white", // Text color
  },
});
