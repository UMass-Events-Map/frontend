import ActionSheet, { SheetProps, useScrollHandlers } from 'react-native-actions-sheet';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabase';
import EventList from "@/components/EventList";
import {NativeViewGestureHandler} from 'react-native-gesture-handler';

function BuildingSheet(props: SheetProps<"building-sheet">) {

    // temp for now
    const [events, setEvents] = useState<any[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handlers = useScrollHandlers();
  
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
        indicatorStyle={{ backgroundColor: 'lightgray' }}
        headerAlwaysVisible={true}
        gestureEnabled
        initialSnapIndex={1} 
        snapPoints={[55, 97]} 
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
  