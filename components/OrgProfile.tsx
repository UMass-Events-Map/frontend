import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventList from './EventList';

export default function OrgProfile() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.logo}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Your Events</Text>
          <MaterialCommunityIcons name="power-plug" size={24} color="#34C759" />
        </View>
      </View>
      <EventList/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 70
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  titleContainer: {
    marginLeft: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
