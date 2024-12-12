import React, { useState } from "react"; // Import React and the useState hook
import { Alert, StyleSheet, View } from "react-native"; // Import components from react-native
import { supabase } from "@/utils/supabase"; // Import the supabase client
import { Button, TextInput, Text } from "react-native"; // Import components from react-native
import { useRouter } from "expo-router"; // Import the useRouter hook from expo-router

// Define and export the Auth component
export default function Auth() {
  // State variables for email, password, and loading indicator
  const [email, setEmail] = useState(""); // Email input state
  const [password, setPassword] = useState(""); // Password input state
  const [loading, setLoading] = useState(false); // Loading state for asynchronous operations
  const router = useRouter(); // Initialize the router for navigation

  // Function to handle sign-in with email and password
  async function signInWithEmail() {
    setLoading(true); // Set loading to true while the sign-in operation is in progress
    const { error } = await supabase.auth.signInWithPassword({
      email: email, // User's email
      password: password, // User's password
    });
    // Function to handle post-login actions
    const handleLogin = () => {
      // Navigate to the '/org' route upon successful login
      router.replace("/org");
    };

    if (error) {
      // Show an alert if there's an error during sign-in
      Alert.alert(error.message);
    } else {
      // Navigate to the '/org' route if sign-in is successful
      router.push("/org");
    }
    setLoading(false); // Set loading to false after the operation is complete
  }

  // Function to handle sign-up with email and password
  async function signUpWithEmail() {
    setLoading(true); // Set loading to true while the sign-up operation is in progress
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email, // New user's email
      password: password, // New user's password
    });

    if (error) {
      // Show an alert if there's an error during sign-up
      Alert.alert(error.message);
    }
    if (!session) {
      // Prompt the user to check their email for verification if no session is returned
      Alert.alert("Please check your inbox for email verification!");
    }
    setLoading(false); // Set loading to false after the operation is complete
  }

  // Render the authentication form
  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        {/* Title text */}
        <Text
          style={{
            paddingBottom: "30%",
            fontSize: 30,
            color: "#7E2622",
            fontWeight: "bold",
          }}
        >
          Login as Organization
        </Text>
        {/* Email input field */}
        <TextInput
          style={{
            width: "95%",
            borderWidth: 1,
            borderColor: "#7E2622",
            borderRadius: 3,
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}
          label="Email"
          leftIcon={{ type: "font-awesome", name: "envelope" }}
          onChangeText={(text) => setEmail(text)} // Update email state on text change
          value={email} // Bind email state to input value
          placeholder="email@address.com" // Placeholder text
          autoCapitalize={"none"} // Disable auto-capitalization
        />
      </View>
      <View style={styles.verticallySpaced}>
        {/* Password input field */}
        <TextInput
          style={{
            width: "95%",
            borderWidth: 1,
            borderColor: "#7E2622",
            borderRadius: 3,
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)} // Update password state on text change
          value={password} // Bind password state to input value
          secureTextEntry={true} // Hide the input text for password security
          placeholder="Password" // Placeholder text
          autoCapitalize={"none"} // Disable auto-capitalization
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        {/* Sign in button */}
        <Button
          title="Sign in"
          disabled={loading} // Disable button while loading
          onPress={() => signInWithEmail()} // Call signInWithEmail on press
          color={"#7E2622"} // Set button color
        />
      </View>
      <View style={styles.verticallySpaced}>
        {/* Sign up button */}
        <Button
          title="Sign up"
          disabled={loading} // Disable button while loading
          onPress={() => signUpWithEmail()} // Call signUpWithEmail on press
          color={"#7E2622"} // Set button color
        />
      </View>
    </View>
  );
}

// Stylesheet for the component
const styles = StyleSheet.create({
  container: {
    marginTop: 40, // Margin at the top of the container
    padding: 12, // Padding inside the container
    justifyContent: "center", // Center content vertically
    flex: 1, // Flex value for container
  },
  verticallySpaced: {
    paddingTop: 4, // Padding at the top
    paddingBottom: 4, // Padding at the bottom
    alignSelf: "stretch", // Stretch to fill the container
    alignItems: "center", // Center items horizontally
  },
  mt20: {
    marginTop: 20, // Additional top margin of 20 units
  },
});
