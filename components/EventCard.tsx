import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function EventCard(event: {thumbnail: string, name: string, time: string, date: string, description: string}) {
    return ( 
    <View style={styles.container}>
        <Image
            style={styles.eventImage}
            source={{ uri: event.thumbnail }}>
        </Image>
        <View style={styles.eventInfo}>
            <Text style={styles.eventDateTime}>{event.date}, {event.time}</Text>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDescription}>{event.description}</Text>
        </View>
    </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 0,
        backgroundColor: '#FAFAFA',
        borderRadius: 3,
        flexDirection: 'row',
        padding: 10
    },
    eventImage: {
        width: 80,
        height: 80
    },
    eventInfo: {
        marginLeft: 10
    },
    eventDateTime: {
        fontSize: 16,
        color: '#666'
    },
    eventName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    eventDescription: {
        fontSize: 14,
        color: '#999',
    }

});