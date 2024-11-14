import MapComponent from "@/components/MapComponent";
import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { supabase } from '@/utils/supabase';
import { BuildingProp, Building } from "@/constants/Interfaces";

export default function Index() { // Map Component (index as default entry point)
  const [buildings, setBuildings] = useState<Building[] | null>(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      const response = await fetch(`https://umaps.phoenixfi.app/buildings?limit=${20}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
      });

      if(response.status === 200 || 304) {
        const data = await response.json();
        setBuildings(data.data);
      } else {
        console.error("Error fetching buildings");
      }
    };
    fetchBuildings();
  }, []);
 
  // const filteredBuildings : Building[] = (!buildings) ? [] : (buildings as Building[]).filter(building => (building.events !== undefined && building.events.length > 0));

  return (
    <View style={{ flex: 1 }}>
      <MapComponent buildings={buildings}/>
    </View>
  );
  
  
}
