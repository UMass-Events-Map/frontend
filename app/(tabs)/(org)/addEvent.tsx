import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Modal, Button, Alert, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import Picker from "react-native-picker";
import { supabase } from '@/utils/supabase';

export function CreateEventDialog({ organizationId, onEventCreated }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [buildingId, setBuildingId] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [attendance, setAttendance] = useState('');
  const [buildings, setBuildings] = useState([]);
  const [loadingBuildings, setLoadingBuildings] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchBuildings = async () => {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (!sessionData?.session || sessionError) {
          // If no session or an auth error, redirect to login
          router.push('/login');
          return null;
        } else {
          // User is authenticated, proceed to fetch buildings
          const uid = sessionData.session.user.id;
          try {
            setLoadingBuildings(true);
            
            // You may have a dedicated endpoint for buildings. If not, create one.
            // This example assumes you have something like:
            // GET https://umaps.phoenixfi.app/buildings?limit=10&offset=0
            const response = await fetch(`https://umaps.phoenixfi.app/buildings`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            });
            
            if (response.ok) {
              const data = await response.json();
              setBuildings(data || []);
              return data;
            } else {
              console.error("Error fetching buildings");
              return null;
            }
          } catch (err: any) {
            console.error('Failed to fetch buildings:', err.message);
            Alert.alert('Error', 'Failed to fetch buildings');
            return null;
          } finally {
            setLoadingBuildings(false);
          }
        }
      };

    if (open) {
      fetchBuildings();
    }
  }, [open]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) throw new Error('No active session found');

      // Insert event directly into Supabase
      const { data: newEvent, error: eventError } = await supabase
        .from('/events')
        .insert([{
          organization_id: organizationId,
          name,
          description: description || null,
          date,
          time,
          building_id: buildingId,
          room_number: roomNumber || null,
          thumbnail: thumbnail || null,
          attendance: attendance ? parseInt(attendance) : null,
        }]);

      if (eventError) {
        throw eventError;
      }

      Alert.alert("Success", "Event created successfully");
      setOpen(false);
      onEventCreated?.();
    } catch (error) {
      Alert.alert("Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <Button title="New Event" onPress={() => setOpen(true)} />
      <Modal
        visible={open}
        onRequestClose={() => setOpen(false)}
        animationType="slide"
      >
        <View style={styles.container}>
          <Text style={styles.title}>Create New Event</Text>
          <Text>Name *</Text>
          <TextInput style={styles.input} value={name} onChangeText={setName} />

          <Text>Description</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} />

          <Text>Date (YYYY-MM-DD)*</Text>
          <TextInput style={styles.input} value={date} onChangeText={setDate} />

          <Text>Time (HH:MM)*</Text>
          <TextInput style={styles.input} value={time} onChangeText={setTime} />

          <Text>Building *</Text>
          {loadingBuildings ? (
            <Text>Loading buildings...</Text>
          ) : (
            <Picker
              selectedValue={buildingId}
              onValueChange={(val) => setBuildingId(val)}
            >
              <Picker.Item label="Select a building" value="" />
              {buildings.map((b) => (
                <Picker.Item label={b.name} value={b.id} key={b.id} />
              ))}
            </Picker>
          )}

          <Text>Room Number</Text>
          <TextInput style={styles.input} value={roomNumber} onChangeText={setRoomNumber} />

          <Text>Thumbnail URL</Text>
          <TextInput style={styles.input} value={thumbnail} onChangeText={setThumbnail} />

          <Text>Expected Attendance</Text>
          <TextInput style={styles.input} value={attendance} onChangeText={setAttendance} keyboardType="numeric" />

          <Button title={loading ? 'Creating...' : 'Create Event'} onPress={handleSubmit} disabled={loading} />
          <Button title="Cancel" onPress={() => setOpen(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderColor: '#ccc', borderWidth: 1, padding: 8, marginBottom: 10
  }
});
