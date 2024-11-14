import OrgProfile from "../../../components/OrgProfile";
import { Text, View } from "react-native";
import { supabase } from '../../../utils/supabase';
import { useState, useEffect } from "react";

export default function Org() {
  const [events, setEvents] = useState<Event[] | null>(null);
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
  
  if(!events) {
    return <View></View>
  } else {
    return (
      <View style={{ flex: 1 }}>
        <OrgProfile events={events} />
        
      </View>
    );
  }
  
}
