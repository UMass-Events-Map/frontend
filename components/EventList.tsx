import React from 'react';
import { View, Text, Image, StyleSheet, SectionList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import EventCard from './EventCard';

export default function EventList() {
    return (
        <View style={styles.container}>

            <SectionList style={{}}
                sections={[
                    {title: 'Today', 
                     data: [
                        {
                            name: "Annual Company Conference",
                            date: "Mar 12",
                            time: "10:00 AM",
                            description: "Keynote speakers and networking."
                        },
                        {
                            name: "Team Building Workshop",
                            date: "Apr 15",
                            time: "2:00 PM",
                            description: "Collaborative problem-solving activites."
                        },
                        {
                            name: "Summer Kickoff Party",
                            date: "May 20",
                            time: "6:00 PM",
                            description: "Food, drinks, and music."
                        }
                        ]}
                ]}
                renderItem={({item}) => (
                <EventCard
                    name={item.name}
                    date={item.date}
                    time={item.time}
                    description={item.description}></EventCard>)}
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
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'semibold',
        color: 'black',
        backgroundColor: 'white'
    },
});