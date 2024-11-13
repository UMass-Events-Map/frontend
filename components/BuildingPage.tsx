import { View, Text, Image, StyleSheet } from 'react-native';
import EventList from './EventList';
import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabase';
import { BuildingProp, Building, EventListProps, Event } from '@/constants/Interfaces'



export default function BuildingPage(building: Building ) {
    const [events, setEvents] = useState<Event[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      const fetchEventByBuildingId = async (id: string) => {
        const response = await fetch(`https://umaps.phoenixfi.app/buildings/${id}/events`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json",
          },
        });
  
        if(response.status === 200 || 304) {
          const data = await response.json();
          setEvents(data);
        } else {
          console.error("Error fetching events by building id");
        }
      };
      fetchEventByBuildingId(building.id)
    }, []);
    
    if(!events) {
        return <Text> No Events at this Building right now </Text>
    } else {
        return (
            <View style={styles.container}>
                <Image
                    style={styles.buildingImage}
                    source={{uri: 'https://lh3.googleusercontent.com/p/AF1QipOAOXvcSZqndVKoR-P1VXKmLjcvdzRPtwQATsnG=s1360-w1360-h1020'}}
                />
                <Text style={styles.buildingName}> {building.name} </Text>
                <Text style={styles.buildingAddress}> Temporary Address, Amherst, MA, 01002 </Text>
                <EventList events={events}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    buildingImage: {
        height: 200,
    },
    buildingName: {
        width: '100%',
        fontSize: 26,
        fontWeight: 'bold',
        color: '#7E2622',
        textAlign: 'center',
        marginTop: 7,
        marginBottom: 3,
    },
    buildingAddress: {
        width: '100%',
        fontSize: 13,
        fontFamily: 'regular',
        color: '#000',
        textAlign: 'center',
        marginBottom: 10
    }
});