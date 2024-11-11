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
  
  const styles = StyleSheet.create({
    eventCard: {
      marginBottom: 20,
      padding: 10,
      backgroundColor: '#f9f9f9',
      borderRadius: 8,
    },
    eventName: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    thumbnail: {
      width: '100%',
      height: 150,
      borderRadius: 8,
      marginBottom: 10,
    },
  });