import React from 'react';
import { View, Text, Image, StyleSheet, SectionList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventCard from './EventCard';

type Event = {
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    room_number: string;
    thumbnail: string;
  };
  
  type EventListProps = {
    events: Event[] | null;
  };

  export default function EventList({ events }: EventListProps) {
    if (!events) {
      return <Text>No events available</Text>;
    }
  
    return (
      <View>
        {events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Image source={{ uri: event.thumbnail }} style={styles.thumbnail} />
            <Text style={styles.eventName}>{event.name}</Text>
            <Text>{event.description}</Text>
            <Text>Date: {event.date}</Text>
            <Text>Time: {event.time}</Text>
            <Text>Room: {event.room_number}</Text>
          </View>
        ))}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    eventCard: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
    },
    eventName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    thumbnail: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginBottom: 10,
    },
  });