import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type Event = {
    id: string;
    name: string;
    description: string;
    date: string;
    time: string;
    room_number: string;
    thumbnail: string;
    building_id: string;
    organization_id: string;
    attendance: string;

};
  
type EventListProps = {
    events: Event[] | null;
};

export default function EventList({ events }: EventListProps) {
  if (!events) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="#7E2622" size="large"/>
      </View>
    );
  }
  else if (events.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noEventText}>No events available</Text>
      </View>
    );
  }
  const onPressEvent = () => {
    // navigate to event detail page
  };

  return (
      <FlatList
        columnWrapperStyle={{justifyContent: 'space-between'}}
        data={events}
        numColumns={2}
        style={styles.eventList}
        renderItem={({item}) => {
          return (
            <TouchableHighlight 
              style={styles.eventContainer} 
              onPress={onPressEvent} 
              underlayColor="white"
            >
              <View>
                <Image
                  style={styles.eventImage}
                  source={{ uri: item.thumbnail }}
                />
                <View style={styles.eventInfo}>
                  <Text 
                    style={styles.eventName} 
                    numberOfLines={2} 
                    ellipsizeMode='tail'
                  >
                    {item.name}
                  </Text>
                  <View style={styles.eventInfoLayout}>
                    <Ionicons 
                      name={"calendar"} 
                      size={16} 
                      style={styles.icon} />
                    <Text style={styles.eventDateTime}>{item.date}</Text>
                  </View>
                  <View style={styles.eventInfoLayout}>
                    <Ionicons 
                      name={"time"} 
                      size={16} 
                      style={styles.icon} />
                    <Text style={styles.eventDateTime}>{item.time}</Text>
                  </View>
                  <View style={styles.eventInfoLayout}>
                    <Ionicons 
                      name={"location"} 
                      size={16} 
                      style={styles.icon} />
                    <Text style={styles.eventRoomNumber}>{item.room_number}</Text>
                  </View>
                </View>
              </View>
            </TouchableHighlight>
          );
        }}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noEventText: {
    fontSize: 20,
    color: '#D6D6D6'
  },
  eventList: {
    paddingHorizontal: 8,
    backgroundColor: '#fff'
  },
  eventContainer: {
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