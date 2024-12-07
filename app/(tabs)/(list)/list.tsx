import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import React from 'react';
import EventList from "@/components/EventList";
import { useState, useEffect, useMemo } from "react";
import { supabase } from '@/utils/supabase';
import { Link } from 'expo-router';
import OrgProfile from "@/components/OrgProfile";


export default function List() {
  const [events, setEvents] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

 const handleSearch = (query: string) => {
    // handle searching 
    setSearchQuery(query);
 }

  useEffect(() => {
    const fetchEvents = async () => {
      const { data: events, error } = await supabase
        .from('events')
        .select('*');
      
      if (error) {
        console.error("Error fetching events:", error.message);
        setError(error.message);
      } else {
        setEvents(events);
      }
    };
    fetchEvents();
  }, []);

  // Filtered events based on search query
  const filteredEvents = useMemo(() => {
    if (!events) return [];

    return events.filter((event) => {
      const formattedDate = formatter.format(new Date(event.date));
      const eventTime = event.time.substring(0, event.time.length - 3);

      return (
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formattedDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eventTime.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [events, searchQuery]);
  

  return (
    <View style={styles.container}>
      <TextInput 
        placeholder='Search' 
        placeholderTextColor={'grey'}
        style={styles.searchBar}
        clearButtonMode="always"
        value={searchQuery}
        autoCorrect={false}
        onChangeText={(query) => handleSearch(query)}/>
      <EventList events={filteredEvents} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 70,
  },
  heading: {
    flex: 0,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#7E2622',
    marginLeft: 10,
    marginBottom: 15
  },
  searchBar: {
    marginHorizontal: 10,
    marginBottom: 20,
    padding: 10,
    borderColor: '#D6D6D6',
    borderWidth: 1,
    borderRadius: 20
  },
});

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const formatter = new Intl.DateTimeFormat("en-US", options);
