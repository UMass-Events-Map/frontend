import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { supabase } from '@/utils/supabase';
import { router } from 'expo-router';

const SettingsScreen = () => {
  const handleSignOut = async () => {
    try {
      // Sign out the user on the client side
      const { error } = await supabase.auth.signOut();
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
