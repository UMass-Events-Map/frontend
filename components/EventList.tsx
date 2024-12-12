import React, { useState, useRef, useCallback, useEffect } from "react";
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
import dayjs from "dayjs";

/**
 * This function accepts a list of events data, and displays a list of cards that visually represent that data.
 * @param events -> A list of events to display.
 * @returns A component that shows a list of events.
 */
export default function EventList({ events }: EventListProps) {
  // If the event list is null (or undefined) or still loading, show a loading indicator.
  if (!events) {
    return (
      <View>
        <ActivityIndicator
          testID="ActivityIndicator"
          color="#7E2622"
          size="large"
        />
      </View>
    );
  }

  // If there are no events, display a message indicating that no events are available.
  if (events.length == 0) {
    return (
      <View testID={"EmptyListView"}>
        <Text testID={"EmptyListText"} style={styles.noEventText}>
          No events available
        </Text>
      </View>
    );
  }

  // If events are present, display them in a two-column layout.
  return (
    <FlatList
      columnWrapperStyle={{ justifyContent: "space-between" }}
      data={events}
      numColumns={2}
      style={styles.eventList}
      contentContainerStyle={{ paddingBottom: 150 }}
      renderItem={({ item }) => <EventCard event={item} />}
      extraData={events}
      keyExtractor={(item) => item.id.toString()}
      testID={"ListView"}
    />
  );
}

/**
 * This function accepts data of an event and returns a card that shows information about that event.
 * @param event -> Contains data about a single event.
 * @returns A card component with information about an event.
 */
export function EventCard({ event }: { event: Event }) {
  // When the card is pressed, show the event details in a bottom sheet using SheetManager.
  const onPressEvent = () => {
    SheetManager.show("eventdetail-sheet", {
      payload: { value: event },
    });
  };

  // Get the current time and parse the event’s time.
  const currentTime = new Date();
  const eventTime = new Date(event.date + " " + event.time);

  // Determine if the event is happening within the next hour (3600000 ms).
  // If the event is soon, we highlight it differently.
  const isEventSoon =
    Math.abs(eventTime.getTime() - currentTime.getTime()) <= 3600000;

  return (
    // TouchableHighlight makes the card pressable and provides feedback when tapped.
    <TouchableHighlight
      style={[
        styles.eventContainer,
        isEventSoon ? styles.eventSoon : styles.notEventSoon,
      ]}
      accessibilityLabel={`Event ${event.name}`}
      onPress={onPressEvent}
      underlayColor={"white"}
      testID="eventCardTouchable"
    >
      <View>
        {/* Displays a thumbnail image for the event */}
        <Image
          testID="eventImage"
          style={styles.eventImage}
          source={{ uri: event.thumbnail }}
        />

        {/* Container for the event’s textual details */}
        <View style={styles.eventInfoContainer}>
          {/* Display the event name. The text may wrap or be truncated if too long. */}
          <Text style={styles.eventName} numberOfLines={2} ellipsizeMode="tail">
            {event.name}
          </Text>

          {/* Display the event date with a calendar icon */}
          <View style={styles.eventDetailLayout}>
            <Ionicons name={"calendar-outline"} size={16} style={styles.icon} />
            <Text style={styles.eventDetailText}>
              {dayjs(event.date).format("ddd, MMM DD, YYYY")}
            </Text>
          </View>

          {/* Display the event time with a time icon */}
          <View style={styles.eventDetailLayout}>
            <Ionicons name={"time-outline"} size={16} style={styles.icon} />
            <Text style={styles.eventDetailText}>
              {event.time.substring(0, event.time.length - 3)}
            </Text>
          </View>

          {/* Display the event location with a location icon, including building name and room number */}
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
  // Style for text shown when no events are available.
  noEventText: {
    fontSize: 20,
    color: "#D6D6D6",
    textAlign: "center",
  },
  // Style for the event list container.
  eventList: {
    paddingHorizontal: 15,
  },
  // Style for events happening soon - highlighted background.
  eventSoon: {
    backgroundColor: "#FFB5B3",
  },
  // Style for events not happening soon - default background.
  notEventSoon: {
    backgroundColor: "#FAFAFA",
  },
  // Style for the main event container card.
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
  // Style for laying out event details (icon + text) in a row.
  eventDetailLayout: {
    flexDirection: "row",
    marginVertical: 2,
  },
  // Style for the event thumbnail image at the top of the card.
  eventImage: {
    height: "60%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  // Container for the lower portion of the card holding the event info.
  eventInfoContainer: {
    height: "40%",
    marginHorizontal: "5%",
  },
  // Style for small event detail text (date, time, building).
  eventDetailText: {
    fontSize: 10,
    width: "90%",
  },
  // Style for the event name text.
  eventName: {
    height: "45%",
    fontWeight: "500",
    marginVertical: 3,
    fontSize: 15,
  },
  // Style for icons displayed in event details.
  icon: {
    marginRight: 2,
  },
});
