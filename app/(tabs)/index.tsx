import MapComponent from "@/components/MapComponent";
import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabase';

export default function Index() { // Map Component (index as default entry point)
  const [buildings, setBuildings] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      const { data: buildings, error } = await supabase
        .from('buildings')
        .select('*');
      
      if (error) {
        console.error("Error fetching buildings:", error.message);
        setError(error.message);
      } else {
        setBuildings(buildings);
      }
    };
    fetchBuildings();
  }, []);
  
  
  return (
    <View style={{ flex: 1 }}>
      
      <MapComponent buildings={buildings}/>
    </View>
  );
}
