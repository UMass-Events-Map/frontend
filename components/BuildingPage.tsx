import { View, Text, Image, StyleSheet } from 'react-native';
import EventList from './EventList';
import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabase';

type Building = {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
}

type BuildingProp = {
    building: Building | null
}

export default function BuildingPage( { building }: BuildingProp ) {
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
            <Image
                style={styles.buildingImage}
                source={{uri: 'https://lh3.googleusercontent.com/p/AF1QipOAOXvcSZqndVKoR-P1VXKmLjcvdzRPtwQATsnG=s1360-w1360-h1020'}}
            />
            <Text style={styles.buildingName}>Student Union</Text>
            <Text style={styles.buildingAddress}>41 Campus Center Way, Amherst, MA, 01002</Text>
            <EventList events={events}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    buildingImage: {
        height: 275,
    },
    buildingName: {
        width: '100%',
        fontSize: 32,
        fontWeight: 'bold',
        color: '#7E2622',
        textAlign: 'center',
        marginTop: 7

    },
    buildingAddress: {
        width: '100%',
        fontSize: 13,
        fontFamily: 'regular',
        color: '#000',
        textAlign: 'center',
        marginBottom: 20
    }
});