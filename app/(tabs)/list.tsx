import React, { useEffect, useState } from 'react';
import { Text, View } from "react-native";
import { supabase } from "@/utils/supabase";


export default function List() {
  const [events, setEvents] = useState<any[] | null>(null);
  
  useEffect(() => {
    const fetchEvents = async () => {
      const { data } = await supabase
        .from('creators')
        .select('*');
      setEvents(data);
    };
    fetchEvents();

    console.log(events)
  
  }, []);



  return (
    <View style={{ flex: 1 }}>
    
    
    
      <Text> LIST VIEW  {events}</Text>
    
    
    
    </View>
  );
}
