import EventForm from "@/components/EventForm"; // Import the EventForm component from the specified path
import { useState } from "react"; // Import the useState hook from React
import {
  SafeAreaView,
  TouchableHighlight,
  View,
  StyleSheet,
  Text,
} from "react-native"; // Import necessary components from react-native

// Define and export the addEventForm component
export default function addEventForm() {
  // State management for the loading indicator
  const [loading, setLoading] = useState<boolean>(false);

  // Function to handle the event creation process (commented out)
  // const addEventButton = async () => {
  //     setLoading(true); // Set loading state to true
  //     const newEvent = { // Create a new event object with the necessary details
  //         name: eventName, // Event name
  //         description: description, // Event description
  //         date: dateTime.format("YYYY-MM-DD"), // Event date formatted as YYYY-MM-DD
  //         building_id: building, // Building ID where the event will take place
  //         room_number: room, // Room number for the event
  //         organization_id: "123e4567-e89b-12d3-a456-426614174000", // Organization ID
  //         thumbnail: thumbnail, // Thumbnail image for the event
  //         attendance: 150 // Expected attendance for the event
  //     };
  //     console.log(newEvent); // Log the new event object to the console
  //     // await handleEventCreation(); // Call the function to handle event creation (commented out)
  //     setLoading(false); // Set loading state to false
  // }

  return (
    // SafeAreaView ensures that the content is rendered within the safe area boundaries of a device
    <SafeAreaView style={{ flex: 1 }}>
      {/* Render the EventForm component */}
      <EventForm />
      {/* Footer container to hold the ADD EVENT button */}
      <View style={styles.footerContainer}>
        {/* TouchableHighlight component to create a button with a highlight effect when pressed */}
        <TouchableHighlight
          style={styles.buttonContainer} // Apply styles to the button
          onPress={() => console.log("works")} // Log a message when the button is pressed
          underlayColor={"#7E2622"} // Color of the button when pressed
        >
          {/* Text component to display the button text */}
          <Text style={styles.addEventButtonText}>ADD EVENT</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
    // {loading && (
    //         <View style={styles.loading}>
    //             <ActivityIndicator color="#7E2622" size="large" animating={loading} />
    //         </View>
    // )}
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
  },
  // Style for the button container
  buttonContainer: {
    backgroundColor: "#AD3835", // Background color of the button
    borderRadius: 3, // Rounded corners
    height: 40, // Height of the button
    alignItems: "center", // Center the content horizontally
    justifyContent: "center", // Center the content vertically
    width: "60%", // Width of the button
  },
  // Style for the button text
  addEventButtonText: {
    fontWeight: "bold", // Bold text
    fontSize: 15, // Font size
    color: "white", // Text color
  },
});
