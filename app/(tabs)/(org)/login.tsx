import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, TouchableHighlight, SafeAreaView } from "react-native";
import { Link, router } from "expo-router";
const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic here
    // console.log("Email:", email);
    // console.log("Password:", password);
    router.replace('/org')
  };

  const handleAccountCreation = () => {
    //handle logic for when they don't have an account
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Login as Organization</Text>
        </View>
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
        <TouchableHighlight style={styles.signInButton} onPress={handleLogin}>
              <Text style={styles.buttonText}>Sign In</Text>
        </TouchableHighlight>
        <Text
          style={[styles.text, { textDecorationLine: "underline" }]}
          onPress={handleAccountCreation}
        >
          Organization doesn’t have an account?
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#000",
    fontSize: 15,
    marginTop: 9,
    textAlign: "center",
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  titleContainer: {
    height: '40%',
    justifyContent: 'center'
  },
  title: {
    color: "#000",
    fontSize: 20,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 7,
    width: '100%'
  },
  signInButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#7E2622',
    width: '60%'
  },
  buttonText: {
    color: '#fff',
    fontSize: 15
  }
});

export default LoginScreen;