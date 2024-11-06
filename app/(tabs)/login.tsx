import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    console.log("Email:", email);
    console.log("Password:", password);
  };

  const handleAccountCreation = () => {
    //handle logic for when they don't have an account
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login as Organization</Text>
      <Text style={styles.subtitle}>Sign in</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={handleLogin} />
      <Text
        style={[styles.text, { textDecorationLine: "underline" }]}
        onPress={handleAccountCreation}
      >
        Organization doesn’t have an account?
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "white",
    fontSize: 15,
    marginTop: 8,
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default LoginScreen;
