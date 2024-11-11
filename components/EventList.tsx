import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { FlatList } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

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
        <ActivityIndicator color="#7E2622" size="large" />
      </View>
    );
  } else if (events.length == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noEventText}>No events available</Text>
      </View>
    );
  }

  return (
    <FlatList
      columnWrapperStyle={{ justifyContent: "space-between" }}
      data={events}
      numColumns={2}
      style={styles.eventList}
      renderItem={({ item }) => EventCard(item)}
    />
  );
}

function EventCard(event: Event) {
  const onPressEvent = () => {
    // navigate to event detail page
  };

  const newDate = new Date(event.date);

  return (
    <TouchableHighlight
      style={styles.eventContainer}
      onPress={onPressEvent}
      underlayColor="white"
    >
      <View>
        <Image style={styles.eventImage} source={{ uri: event.thumbnail }} />
        <View style={styles.eventInfoContainer}>
          <Text style={styles.eventName} numberOfLines={2} ellipsizeMode="tail">
            {event.name}
          </Text>
          <View style={styles.eventDetailLayout}>
            <Ionicons name={"calendar-outline"} size={16} style={styles.icon} />
            <Text style={styles.eventDetailText}>
              {formatter.format(newDate)}
            </Text>
          </View>
          <View style={styles.eventDetailLayout}>
            <Ionicons name={"time-outline"} size={16} style={styles.icon} />
            <Text style={styles.eventDetailText}>{event.time}</Text>
          </View>
          <View style={styles.eventDetailLayout}>
            <Ionicons name={"location-outline"} size={16} style={styles.icon} />
            <Text
              style={styles.eventDetailText}
            >{`Student Union • ${event.room_number}`}</Text>
          </View>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noEventText: {
    fontSize: 20,
    color: "#D6D6D6",
  },
  eventList: {
    paddingHorizontal: 8,
  },
  eventContainer: {
    flex: 0,
    backgroundColor: "#FAFAFA",
    borderRadius: 10,
    height: 260,
    width: "49%",
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 1,
  },
  eventDetailLayout: {
    flexDirection: "row",
    marginVertical: 2,
  },
  eventImage: {
    width: "100%",
    height: 140,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  eventInfoContainer: {
    marginHorizontal: 5,
  },
  eventDetailText: {
    fontSize: 12,
    fontWeight: "light",
  },
  eventName: {
    fontSize: 15,
    fontWeight: "bold",
    marginVertical: 3,
  },
  icon: {
    marginRight: 3,
  },
});

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const formatter = new Intl.DateTimeFormat("en-US", options);
