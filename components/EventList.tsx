import React, { useState, useRef, useCallback } from "react";
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

export default function EventList({ events }: EventListProps) {
  // console.log(events);
  if (!events) {
    return (
      <View style={styles.container}>
        <ActivityIndicator testID="ActivityIndicator" color="#7E2622" size="large" />
      </View>
    );
  } else if (events.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noEventText}>No events available</Text>
      </View>
    );
  } else {
    return (
      <FlatList
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={events}
        numColumns={2}
        style={styles.eventList}
        contentContainerStyle={{ paddingBottom: 200 }} 
        renderItem={({ item }) => EventCard(item)}
        extraData={events}
        keyExtractor={(item) => item.id.toString()}
      />
    )
  };
}

export function EventCard(event: Event) {
  const onPressEvent = () => {
    // navigate to event detail page
    SheetManager.show("eventdetail-sheet", {
      payload: { value: event },
    });
  };

  // Get the current time and event time
  const currentTime = new Date();
  const eventTime = new Date(event.date + " " + event.time);

  // Check if the event is within the next hour
  const isEventSoon = eventTime > currentTime && (eventTime.getTime() - currentTime.getTime()) <= 3600000;

  const newDate = new Date(event.date);

  return (
      <TouchableHighlight
      style={[styles.eventContainer, isEventSoon && styles.eventSoon]}
        accessibilityLabel={`Event ${event.name}`}
        onPress={onPressEvent}
        underlayColor={"white"}
        testID="eventCardTouchable"
      >
        <View>
          <Image testID="eventImage" style={styles.eventImage} source={{ uri: event.thumbnail }} />
          <View style={styles.eventInfoContainer}>
            <Text
              style={styles.eventName}
              adjustsFontSizeToFit={true}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {event.name}
            </Text>
            <View style={styles.eventDetailLayout}>
              <Ionicons name={"calendar-outline"} size={16} style={styles.icon} />
              <Text style={styles.eventDetailText}>{formatter2.format(newDate)}</Text>
            </View>
            <View style={styles.eventDetailLayout}>
              <Ionicons name={"time-outline"} size={16} style={styles.icon} />
              <Text style={styles.eventDetailText}>{event.time.substring(0,event.time.length - 3)}</Text>
            </View>
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
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  noEventText: {
    fontSize: 20,
    color: "#D6D6D6",
  },
  eventList: {
    flex: 0,
    paddingHorizontal: 15,
  },
  eventSoon: {
    backgroundColor: "#FFB5B3", // Highlight the event in green
  },
  eventContainer: {
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    height: 260,
    width: "49%",
    paddingBottom: 20,
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
    width: "100%",
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventInfoContainer: {
    height: '40%',
    marginHorizontal:'5%',
  },
  eventDetailText: {
    fontSize: 10,
    fontWeight: "light",
    flexWrap: 'wrap',
    width: "90%"
  },
  eventName: {
    height: '35%',
    fontWeight: "500",
    marginVertical: 3,
    fontSize: 15
  },
  icon: {
    marginRight: 2,
  },
});

// Options for formatting the day of the month an year
const options2: Intl.DateTimeFormatOptions = {
  timeZone: "America/New_York",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const formatter2 = new Intl.DateTimeFormat("en-US", options2);
