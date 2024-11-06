import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';
import EventCard from './EventCard';
import { FlatList } from 'react-native';

export type Event = {
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    room_number: string;
    thumbnail: string;
};
  
export type EventListProps = {
    events: Event[] | null;
};

export default function EventList({ events }: EventListProps) {
  if (!events) {
    return (
      <View style={styles.noEventTextContainer}>
        <Text style={styles.noEventText}>No events available</Text>
      </View>
    );
  }

  return (

      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={events}
        numColumns={2}
        style={styles.eventList}
        renderItem={({item}) => {
          return (
            <EventCard 
            event={item}/>
          );
        }}
      />

  );
}

const styles = StyleSheet.create({
  eventCard: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  eventList: {
    paddingHorizontal: 8
  },
  noEventText: {
    fontSize: 20,
    color: '#D6D6D6'
  },
  noEventTextContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});