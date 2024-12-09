import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableHighlight, SafeAreaView, StyleSheet, Alert
} from "react-native";
import { router } from "expo-router";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for React Native.
// It's generally recommended to keep keys secret in production and load from env.
const supabaseClient = createClient(
  'https://gdacboczcpnnnqfxkjsj.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkYWNib2N6Y3Bubm5xZnhranNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MjQwMzIsImV4cCI6MjA0NTIwMDAzMn0.z9pvzajPfB_qPYmFMD-U-_hcdfarXF3Kq7WHG3OPz5c'
);

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      // Sign in with Supabase
      const { data: { user, session }, error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      if (!user || !session || !session.access_token) {
        throw new Error("No user session found.");
      }

      // Use the session token to check if the user has a profile
      const token = session.access_token;
      const profileCheckResponse = await fetch('https://gdacboczcpnnnqfxkjsj.supabase.co/orgainzations${user.id}', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (profileCheckResponse.ok) {
        // Profile exists, navigate to the main screen
        router.push('/OrganizationCreationModal');
      } else if (profileCheckResponse.status === 404) {
        // Profile does not exist, navigate to profile creation screen
        router.push('/profileCreation');
      } else {
        const errorData = await profileCheckResponse.json();
        throw new Error(errorData?.error || "Unknown error checking profile.");
      }

    } catch (error: any) {
      Alert.alert("Error", error.message || "An error occurred during sign in.");
    } finally {
      setLoading(false);
    }
  };

  const handleAccountCreation = () => {
    router.push('/OrganizationCreationModal');
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
        <TouchableHighlight style={styles.signInButton} onPress={handleLogin} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign In'}</Text>
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
