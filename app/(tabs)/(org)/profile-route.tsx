import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

const CreateProfileScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [token, setToken] = useState(''); // Assume you have this from login

  const createProfile = async () => {
    try {
      const response = await fetch('https://umaps.phoenixfi.app/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include the access token to authenticate the request
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ firstName, lastName }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await response.json();
      Alert.alert('Success', 'Profile created successfully!');
      console.log(data);
    } catch (error) {
      Alert.alert('Error');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={{ borderWidth: 1, marginBottom: 10, padding: 8 }}
      />
      <Button title="Create Profile" onPress={createProfile} />
    </View>
  );
};

export default CreateProfileScreen;
