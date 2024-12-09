import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

interface CreateOrganizationScreenProps {
  token: string; // Pass in the token from your auth flow
  onRequestCreated?: () => void;
}

const OrganizationSignUpScreen = ({ token, onRequestCreated }: CreateOrganizationScreenProps) => {
  const [organizationName, setOrganizationName] = useState('');
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false);

  const createOrganization = async () => {
    
    const payload = {
      organization_name: organizationName,
      description: description,
      email: email,
      password: password
    };

    setLoading(true);
    try {
      const response = await fetch('https://umaps.phoenixfi.app/organization', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Include the token for auth
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Something went wrong');
      }

      const data = await response.json();

      Alert.alert('Request Submitted', 'Your organization creation request is pending approval.');
      // Optionally call a callback to refresh the list or navigate
      onRequestCreated?.();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Organization Name"
        value={organizationName}
        onChangeText={setOrganizationName}
        style={styles.input}
      />
      <TextInput
        placeholder="Organization Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />
      <Button title={loading ? 'Submitting...' : 'Submit Request'} onPress={createOrganization} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    padding: 10,
    borderRadius: 5
  }
});

export default OrganizationSignUpScreen;
