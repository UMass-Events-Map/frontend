import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabase';

export default function List() {
  const [events, setEvents] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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
  
  console.log("Fetched events:", events);

  return (
    <View style={styles.container}>
      <Text> LIST VIEW</Text>
      {error && <Text style={{ color: 'red' }}>Error: {error}</Text>}
      {events ? events.map((event, index) => (
        <Text key={index}>{JSON.stringify(event)}</Text>
      )) : <Text>No events found</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 70,
  },
  heading: {
    flex: 0,
    fontSize: 35,
    fontWeight: 'bold',
    color: '#7E2622',
    marginBottom: 15
  },
  eventList: {
    flex: 0
  }
});
