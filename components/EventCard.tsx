import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function EventCard(event: {name: string, time: string, date: string, description: string}) {
    return ( 
    <View style={styles.container}>
        <Image
            style={styles.eventImage}
            source={{ uri: 'https://thevendry.com/cdn-cgi/image/width=640,quality=75,fit=contain,metadata=none,format=auto/https%3A%2F%2Fs3.amazonaws.com%2Fuploads.thevendry.co%2F24985%2F1665157263579_52126829973_d809692f7a_o-%25281%2529.jpg' }}>
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