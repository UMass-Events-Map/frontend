import { Text, View, StyleSheet } from "react-native";
import EventList from "@/components/EventList";
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
  

  return (
    <View style={styles.container}>
    
      <Text style={styles.heading}>EVENT LIST</Text>
      <EventList events={events} />
    
    </View>
    // <BuildingPage/>
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
  eventList: {
    flex: 0
  }
});
