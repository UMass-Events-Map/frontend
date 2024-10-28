import React from 'react';
import { View, Text, Image, StyleSheet, SectionList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EventList() {
    return (
        <View style={styles.container}>
            <SectionList
                sections={[
                    {title: 'Today', 
                     data: [{
                        name: "Haunted House",
                        date: "Mar 12",
                        time: "10:00 AM",
                        description: "Keynote speakers and networking."
                    }]}
                ]}
                renderItem={({item}) => (
                <View style={styles.event}>
                    <Image
                        source={{ uri: 'https://via.placeholder.com/50' }}
                        style={styles.eventImage}
                    />
                    <View style={styles.eventInfo}>
                    <Text style={styles.eventTime}>{item.date}</Text>
                    <Text style={styles.eventName}>{item.name}</Text>
                    <Text style={styles.eventDescription}>{item.description}</Text>
                    </View>
                </View>)}
                renderSectionHeader={({section}) =>
                <Text style={styles.sectionHeader}>{section.title}</Text>}
                keyExtractor={item => `basicListEntry-${item}`}>

            </SectionList>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
    header: {
    flexDirection: 'row',
    alignItems: 'center',
    },
    logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    },
    titleContainer: {
    marginLeft: 20,
    },
    title: {
    fontSize: 24,
    fontWeight: 'bold',
    },
    sectionHeader: {
    fontSize: 20,
    fontWeight: 'semibold',
    color: 'black'
    },
    eventsContainer: {
    marginTop: 0,
    },
    event: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    },
    eventImage: {
    width: 70,
    height: 70,
    },
    eventInfo: {
    marginLeft: 15,
    },
    eventTime: {
    fontSize: 16,
    color: '#666',
    },
    eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    },
    eventDescription: {
    fontSize: 14,
    color: '#999',
    },
});