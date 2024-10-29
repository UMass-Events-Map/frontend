import { Text, View, StyleSheet } from "react-native";
import EventList from "@/components/EventList";
import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabase'

export default function List() {
  const [events, setEvents] = useState<any[] | null>(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('events')
        .select('*');
      setEvents(data);
    };
    fetchEvents();

    console.log(events)
  
  }, []);



  return (
    <View style={styles.container}>
    
      <Text style={styles.heading}>EVENT LIST</Text>
      <EventList></EventList>
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
