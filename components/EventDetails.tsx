import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

interface Event {
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

interface ImageBannerProps {
    thumbnail: string
}

function ImageBanner(props: ImageBannerProps) {
    return (
        <View>
            <Image source={{ uri: props.thumbnail }} />
        </View>
    )
}

function Details(event: Event) {
    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Text>{event.name}</Text>
            </View>

            <View style={styles.sideContainer}>
                <Text style={styles.leftItem}>{event.attendance}</Text>
                <Text style={styles.rightItem}>Free</Text>
            </View>

            <View style={styles.sideContainer}>
                <Text style={styles.leftItem}>Building</Text>
                <Text style={styles.rightItem}>Directions</Text>
            </View>

            <View style={styles.container}>
                <View style={styles.sideContainer}>
                    <Ionicons name={"calendar-outline"} size={16} style={styles.leftItem}/>
                    <Text style={styles.rightItem}>{event.room_number}</Text>
                </View>

                <View>
                    <Text style={styles.leftItem}>{formatter.format(new Date(event.date))}</Text>
                    <View style={styles.rightItem}>
                        <Text>{event.time}</Text>
                        <Text>Length</Text>
                    </View>
                </View>
            </View>

            <View>
                <Text>Event Details</Text>
                <Text>{event.description}</Text>
            </View>
        </View>
    )
}

function ContactInfo(event: Event) {
    return (
        <View>
            <Text>{event.organization_id}</Text>
            <Text>{event.organization_id}</Text>
        </View>
    )
}

export default function EventDetails(event: Event) {
  return (
    <View style={styles.container}>
        <ImageBanner thumbnail={event.thumbnail}/>
        <Details {...event}/>
        <ContactInfo {...event}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  sideContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
  },
  leftItem: {
    flex: 1,
    textAlign: 'left',
  },
  rightItem: {
    flex: 1,
    textAlign: 'right',
  }
});

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const formatter = new Intl.DateTimeFormat("en-US", options);
