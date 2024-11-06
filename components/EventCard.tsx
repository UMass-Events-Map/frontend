import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export type Event = {
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    room_number: string;
    thumbnail: string;
};

export default function EventCard({ event } : { event: Event }) {
    return ( 
    <View style={styles.container} >
        <Image
            style={styles.eventImage}
            source={{ uri: event.thumbnail }}>
        </Image>
        <View style={styles.eventInfo}>
            <Text style={styles.eventName}>{event.name}</Text>
            <View style={styles.eventInfoLayout}>
                <Ionicons name={"calendar"} size={16} style={styles.icon}/>
                <Text style={styles.eventDateTime}>{event.date}</Text>
            </View>
            <View style={styles.eventInfoLayout}>
                <Ionicons name={"time"} size={16} style={styles.icon}/>
                <Text style={styles.eventDateTime}>{event.time}</Text>
            </View>
            <View style={styles.eventInfoLayout}>
                <Ionicons name={"location"} size={16} style={styles.icon}/>
                <Text style={styles.eventRoomNumber}>{event.room_number}</Text>
            </View>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#FAFAFA',
        borderRadius: 10,
        height: 270,
        width: '49%',
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.3,
        shadowRadius: 1, 
    },
    eventInfoLayout: {
        flexDirection: "row",
        marginVertical: 3
    },
    eventImage: {
        width: '100%',
        height: 140,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    eventInfo: {
        marginHorizontal: 5
    },
    eventDateTime: {
        fontSize: 14,
        fontWeight: 'light',
    },
    eventName: {
        fontSize: 17,
        fontWeight: 'bold',
        marginVertical: 3
    },
    eventRoomNumber: {
        fontSize: 14,
        fontWeight: 'light',
    },
    icon: {
        marginRight: 3
    }

});