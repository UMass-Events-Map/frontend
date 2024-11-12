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
        <View>
            <View>
                <Text>{event.name}</Text>
            </View>

            <View>
                <Text>{event.attendance}</Text>
                <Text>Free</Text>
            </View>

            <View>
                <Text>{event.building_id}</Text>
                <Text>Directions</Text>
            </View>

            <View>
                <View>
                    <Ionicons name={"calendar-outline"} size={16}/>
                    <Text>{event.room_number}</Text>
                </View>

                <View>
                    <Text>{event.date}</Text>
                    <Text>{event.time}</Text>
                    <Text>Length</Text>
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
    <View>
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
});

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const formatter = new Intl.DateTimeFormat("en-US", options);
