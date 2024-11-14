import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
//import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Event, EventListProps } from '@/constants/Interfaces';


export default function OrgProfile({ events }: EventListProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/100' }}
          style={styles.logo}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Org Name</Text>
          {/* <MaterialCommunityIcons name="power-plug" size={24} color="#34C759" /> */}
        </View>
      </View>
      <Text style={styles.listTitle}>Your events:</Text>
      {/* <EventList events={events} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    marginBottom: 20
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
    fontSize: 28,
    fontWeight: 'bold',
  },
  listTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingBottom: 15
  }
});
