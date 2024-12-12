import React, { useState } from "react"; // Import React and the useState hook
import { View, TextInput, Button, Alert } from "react-native"; // Import necessary components from react-native

// Define the CreateProfileScreen component
const CreateProfileScreen = () => {
  // State variables for first name, last name, and token
  const [firstName, setFirstName] = useState(""); // State for first name input
  const [lastName, setLastName] = useState(""); // State for last name input
  const [token, setToken] = useState(""); // State for token, assume you have this from login

  // Function to handle profile creation
  const createProfile = async () => {
    try {
      // Make a POST request to create a profile
      const response = await fetch("https://umaps.phoenixfi.app/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
          Authorization: `Bearer ${token}`, // Include the access token to authenticate the request
        },
        body: JSON.stringify({ firstName, lastName }), // Send first name and last name in the request body
      });

      // Check if the response is not OK
      if (!response.ok) {
        const errorData = await response.json(); // Parse the error response
        throw new Error(errorData.error || "Something went wrong"); // Throw an error with the message
      }

      const data = await response.json(); // Parse the successful response
      Alert.alert("Success", "Profile created successfully!"); // Show success alert
      console.log(data); // Log the response data
    } catch (error) {
      Alert.alert("Error"); // Show error alert
    }
  };

  // Render the component
  return (
    <View style={{ padding: 20 }}>
      {/* TextInput for first name */}
      <TextInput
        placeholder="First Name" // Placeholder text
        value={firstName} // Bind state to input value
        onChangeText={setFirstName} // Update state on text change
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} // Styling for the input
      />
      {/* TextInput for last name */}
      <TextInput
        placeholder="Last Name" // Placeholder text
        value={lastName} // Bind state to input value
        onChangeText={setLastName} // Update state on text change
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }} // Styling for the input
      />
      {/* Button to create profile */}
      <Button title="Create Profile" onPress={createProfile} />
    </View>
  );
};

export default CreateProfileScreen; // Export the component as default
