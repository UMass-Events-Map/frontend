import React, { useState } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { supabase } from '@/utils/supabase';
import { Button, TextInput, Text } from 'react-native'
import { useRouter } from 'expo-router';

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
  const handleLogin = () => {
    // Handle login logic here
    // console.log("Email:", email);
    // console.log("Password:", password);
    router.replace('/org')
  };

    if (error) Alert.alert(error.message)
    else router.push('/org')
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (error) Alert.alert(error.message)
    if (!session) Alert.alert('Please check your inbox for email verification!')
    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Text style={{
          paddingBottom: '30%',
          fontSize: 30,
          color: "#7E2622",
          fontWeight: 'bold'}}>Login as Organization</Text>
        <TextInput
          style={{ 
            width: '95%', 
            borderWidth: 1, 
            borderColor: "#7E2622",
            borderRadius: 3, 
            paddingHorizontal: 10,
            paddingVertical: 15
          }}
          label="Email"
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          style={{ 
            width: '95%', 
            borderWidth: 1, 
            borderColor: "#7E2622",
            borderRadius: 3, 
            paddingHorizontal: 10,
            paddingVertical: 15
          }}
          label="Password"
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button title="Sign in" disabled={loading} onPress={() => signInWithEmail()} color={"#7E2622"}/>
      </View>
      <View style={styles.verticallySpaced}>
        <Button title="Sign up" disabled={loading} onPress={() => signUpWithEmail()} color={"#7E2622"} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
    justifyContent: 'center',
    flex: 1
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
    alignItems: 'center',

  },
  mt20: {
    marginTop: 20,
  },
})