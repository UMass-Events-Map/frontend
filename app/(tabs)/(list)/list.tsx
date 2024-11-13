import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import EventList from "@/components/EventList";
import { useState, useEffect } from "react";
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
      <EventList events={events} />
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
