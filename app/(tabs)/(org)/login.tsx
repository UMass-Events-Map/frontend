import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  Button,
  StyleSheet,
  TouchableHighlight,
  SafeAreaView,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Link, router } from "expo-router";
import { supabase } from "@/utils/supabase";
import { Session } from "@supabase/supabase-js";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const [session, setSession] = useState<Session | null>(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");

  const checkProfile = async (userId: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://umaps.phoenixfi.app/profiles/exists/${userId}`
      );
      const data = await response.json();
      return response.ok && data.exists;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const createProfile = async (
    first_name: string,
    last_name: string,
    token: string
  ) => {
    const response = await fetch(`https://umaps.phoenixfi.app/profiles`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ first_name: first_name, last_name: last_name }),
    });

    if (!response.ok) {
      throw new Error("Failed to create profile");
    }

    return await response.json();
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  async function signInWithEmail(): Promise<boolean> {
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      return false;
    }
    await supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        setSession(session);
      })
    return true;
  }

  async function submitName() {
    const token: string = session ? session.access_token : "";
    const response = await createProfile(firstName, lastName, token);
    console.log(response.message);
    setModalVisible(false);
  }

  const handleLogin = async () => {
    // Handle login logic here
    // router.replace('/org')
    setLoading(true);
    const result = await signInWithEmail();

    const user = session?.user;
    const hasProfile = await checkProfile(user!.id);

    setLoading(false);
    if (!hasProfile) {
      setModalVisible(true);
      return;
    }
    if (result)
      router.replace('/org');
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
        {loading && <View style={{ position: 'absolute', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF88' }}>
          <ActivityIndicator  size={'large'} color={'#7E2622'} animating={loading} />
        </View>}
        <Modal
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <SafeAreaView>
            <TextInput
              style={styles.input}
              placeholder="First Name"
              value={firstName}
              onChangeText={setFirstName}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.input}
              placeholder="Last Name"
              value={lastName}
              onChangeText={setLastName}
            />
            <Button title={"Submit"} onPress={submitName} />
          </SafeAreaView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "#000",
    fontSize: 15,
    marginTop: 9,
    textAlign: "center",
  },
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  titleContainer: {
    height: "40%",
    justifyContent: "center",
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
    width: "100%",
  },
  signInButton: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#7E2622",
    width: "60%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
  },
});
