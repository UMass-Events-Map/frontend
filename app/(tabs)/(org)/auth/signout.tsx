import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { createClient } from '@supabase/supabase-js';
import { router } from 'expo-router';

// Create your Supabase client instance
const supabaseClient = createClient(
    'https://gdacboczcpnnnqfxkjsj.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdkYWNib2N6Y3Bubm5xZnhranNqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk2MjQwMzIsImV4cCI6MjA0NTIwMDAzMn0.z9pvzajPfB_qPYmFMD-U-_hcdfarXF3Kq7WHG3OPz5c'
  );

const SettingsScreen = () => {
  const handleSignOut = async () => {
    try {
      // Sign out the user on the client side
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;

      // After signing out, navigate the user to your login screen
      router.push('/login');
    } catch (err) {
      Alert.alert("Error");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default SettingsScreen;
