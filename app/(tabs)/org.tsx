import OrgProfile from "@/components/OrgProfile";
import { Text, View } from "react-native";
import EventList from "@/components/EventList";
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from "react";

export default function Org() {
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
    <View style={{ flex: 1 }}>
      <OrgProfile events={events} />
      
    </View>
  );
}
