import ActionSheet, { SheetProps } from 'react-native-actions-sheet';
import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabase';
import EventList from "@/components/EventList";

function BuildingSheet(props: SheetProps<"building-sheet">) {

    // temp for now
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
      <ActionSheet
        enableGesturesInScrollView
        gestureEnabled
        initialSnapIndex={1} 
        snapPoints={[40, 93]} 
      >
       <Text style={styles.heading}> {props.payload?.value.name} </Text>
        <EventList events={events} />

      </ActionSheet>
    );
  }
   
  export default BuildingSheet;




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
      textAlign: "center",
      padding: 15
    },
    eventList: {
      flex: 0
    }
  });
  