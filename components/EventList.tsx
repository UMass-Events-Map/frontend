import React from 'react';
import { View, Text, Image, StyleSheet, SectionList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function EventList() {
    return (
        <View style={styles.container}>
            <SectionList 
                sections={[
                    {title: 'Today', data: ['Event 1']}
                ]}
                renderItem={({item}) => 
                <Text>{item}</Text>}
                renderSectionHeader={({section}) =>
                <Text>{section.title}</Text>}
                keyExtractor={item => `basicListEntry-${item}`}>

            </SectionList>
        </View>

    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1
      },
});