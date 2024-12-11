import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Event, EventListProps } from "@/constants/Interfaces";
import { FlatList, SheetManager } from "react-native-actions-sheet";
import dayjs from 'dayjs';


/**
 * This function accepts a list of events data, and displays a list of cards that visually represent that data
 * @param events -> A list of events 
 * @returns a component that shows a list of events
 */
export default function EventList({ events }: EventListProps) {
  // If the event list is null or is still loading, display a loading indicator
  if (!events) {
    return (
        <View>
          <ActivityIndicator testID="ActivityIndicator" color="#7E2622" size="large" />
        </View>
    );
  } 
  
  // If there are no events, display text that says there are no events
  if (events.length == 0) {
    return (
      <View>
        <Text style={styles.noEventText}>No events available</Text>
      </View>
    );
  } 
  
  // Return a list of events in two columns
  return (
    <FlatList
      columnWrapperStyle={{ justifyContent: "space-between" }}
      data={events}
      numColumns={2}
      style={styles.eventList}
      contentContainerStyle={{ paddingBottom: 150 }} 
      renderItem={({ item }) => (<EventCard event={item}/>)}
      extraData={events}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

/**
 * This function accepts data of an event and returns a card that shows information about that event
 * @param event -> contains data about an event
 * @returns a card component with information about an events
 */
export function EventCard({ event }: { event: Event }) {
  // When the card is pressed, pull up the event details page as a popup sheet
  const onPressEvent = () => {
    SheetManager.show("eventdetail-sheet", {
      payload: { value: event },
    });
  };

  // Get the current time and event time
  const currentTime = new Date();
  const eventTime = new Date(event.date + " " + event.time);

  // Check if the event is within the next hour
  // This function is used to tell if the event is happening soon
  // If the event is happening soon, the event will be colored maroon
  const isEventSoon = eventTime > currentTime && (eventTime.getTime() - currentTime.getTime()) <= 3600000;

  return (
      // TouchableHighlight is a wrapper that makes views responsive to user touches
      // Pressing will reduce the opacity of the view, indicating a press to the user
      <TouchableHighlight
        style={[
          styles.eventContainer,
          isEventSoon ? styles.eventSoon : styles.notEventSoon
        ]}
        accessibilityLabel={`Event ${event.name}`}
        onPress={onPressEvent}
        underlayColor={"white"}
        testID="eventCardTouchable"
      >
        <View>
          {/* Shows a thumbnail of the event image */}
          <Image testID="eventImage" style={styles.eventImage} source={{ uri: event.thumbnail }} />

          {/* A container for the event card details */}
          <View style={styles.eventInfoContainer}>

            {/* The event card title */}
            <Text
              style={styles.eventName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {event.name}
            </Text>

            {/* The event date */}
            <View style={styles.eventDetailLayout}>
              <Ionicons name={"calendar-outline"} size={16} style={styles.icon} />
              <Text style={styles.eventDetailText}>{dayjs(event.date).format('ddd, MMM DD, YYYY')}</Text>
            </View>

            {/* The event time */}
            <View style={styles.eventDetailLayout}>
              <Ionicons name={"time-outline"} size={16} style={styles.icon} />
              <Text style={styles.eventDetailText}>{event.time.substring(0,event.time.length - 3)}</Text>
            </View>

            {/* The event location */}
            <View style={styles.eventDetailLayout}>
              <Ionicons name={"location-outline"} size={16} style={styles.icon} />
              <Text
                style={styles.eventDetailText}
                numberOfLines={2}
                ellipsizeMode="tail"
              >{`${event.building?.name} • ${event.room_number}`}</Text>
            </View>
          </View>
        </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  noEventText: {
    fontSize: 20,
    color: "#D6D6D6",
    textAlign: 'center',
  },
  eventList: {
    paddingHorizontal: 15,
  },
  eventSoon: {
    backgroundColor: "#FFB5B3", // Highlight the event in maroon if the event is happening soon
  },
  notEventSoon: {
    backgroundColor: "#FAFAFA", // Highlight the event in maroon if the event is happening soon
  },
  eventContainer: {
    backgroundColor: "#FAFAFA",
    borderRadius: 15,
    height: 250,
    width: "49%",
    paddingBottom: 30,
    marginBottom: 10,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  eventDetailLayout: {
    flexDirection: "row",
    marginVertical: 2,
  },
  eventImage: {
    height: '60%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  eventInfoContainer: {
    height: '40%',
    marginHorizontal:'5%',
  },
  eventDetailText: {
    fontSize: 10,
    width: "90%"
  },
  eventName: {
    height: '45%',
    fontWeight: "500",
    marginVertical: 3,
    fontSize: 15
  },
  icon: {
    marginRight: 2,
  },
});
