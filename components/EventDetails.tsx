// Importing React and necessary components from React Native.
// Ionicons is used for icons.
// dayjs is a library for parsing and formatting dates.
// Event is the type of the event object being displayed.
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Event } from "@/constants/Interfaces";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import dayjs from "dayjs";

interface ImageBannerProps {
  thumbnail: string;
}

// The Buttons component displays circular buttons over the image banner.
// Currently, these buttons are just icons, presumably used for navigation or actions (like going back, closing the sheet, or starring the event).
function Buttons() {
  return (
    <View style={styles.absoluteContainer}>
      <View style={styles.sideContainer}>
        {/* Left button (arrow-back): Could be used for going back */}
        <TouchableOpacity style={styles.leftCircleButton}>
          <Ionicons name={"arrow-back-outline"} size={25} style={styles.icon} />
        </TouchableOpacity>

        {/* Right button (close): Could be used for closing the sheet or modal */}
        <TouchableOpacity style={styles.rightCircleButton}>
          <Ionicons name={"close-outline"} size={25} style={styles.closeIcon} />
        </TouchableOpacity>
      </View>

      {/* Bottom button (star): Could be used for favoriting or saving the event */}
      <TouchableOpacity style={styles.bottomCircleButton}>
        <Ionicons name={"star-outline"} size={25} style={styles.starIcon} />
      </TouchableOpacity>
    </View>
  );
}

// The ImageBanner component displays a banner image (presumably the event's thumbnail) at the top.
function ImageBanner(props: ImageBannerProps) {
  return (
    <View>
      <Image style={styles.bannerImage} source={{ uri: props.thumbnail }} />
    </View>
  );
}

// The Details component displays information about the event: name, location, date, time, and description.
// It uses Ionicons to display icons next to information chunks for a more visual layout.
function Details(event: Event) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.icon}>
        <Text style={styles.eventName}>{event.name}</Text>
      </View>

      {/* Commented out code that might show building name and directions. Could be re-enabled in the future. 
            <View style={styles.sideContainer}>
                <Text style={styles.eventDetailsTitle}>{event?.building?.name}</Text>
                <Text style={styles.directionsTitle}>Directions</Text>
            </View> */}

      {/* Displaying room number with a location icon */}
      <View style={styles.calendarContainer}>
        <Ionicons
          name={"location"}
          size={25}
          style={styles.icon}
          color={"#AD3835"}
        />
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>
            Room Number: {event.room_number}
          </Text>
        </View>
      </View>

      {/* Displaying event date and start time with a calendar icon */}
      <View style={styles.calendarContainer}>
        {/* The commented out Ionicon might be replaced by the calendar icon being used below */}
        {/*<Ionicons name={"calendar-outline"} size={16} style={styles.leftItem}/>*/}
        <Ionicons
          name={"calendar"}
          size={25}
          style={styles.icon}
          color={"#AD3835"}
        />
        <View style={styles.timeContainer}>
          <Text style={styles.addressText}>
            {dayjs(event.date).format("MMMM D, YYYY")}
          </Text>
          <Text style={styles.addressText}>Starts: {event.time}</Text>
        </View>
      </View>

      {/* Displaying event description under "Event Details" */}
      <View style={styles.detailsParagraphContainer}>
        <Text style={styles.eventDetailsTitle}>Event Details</Text>
        <Text style={styles.detailText}>{event.description}</Text>
      </View>
    </View>
  );
}

// The ContactInfo component (currently commented out in the main return) would show organization-related details.
// For now, it just displays placeholder text for organization name and email.
function ContactInfo(event: Event) {
  return (
    <View style={styles.contactContainer}>
      <Text style={styles.eventDetailsTitle}>ORGANIZATION NAME</Text>
      <Text style={styles.eventDetailsTitle}>ORGANIZATION EMAIL</Text>
    </View>
  );
}

// The main EventDetails component brings together all other components:
// - A ScrollView that contains the ImageBanner and Details (and can include ContactInfo in the future).
// - The background and layout are defined in pageContainer style.
export default function EventDetails(event: Event) {
  return (
    <View style={styles.pageContainer}>
      <ScrollView style={styles.pageContainer} scrollEnabled={false}>
        <ImageBanner thumbnail={event.thumbnail} />
        <Details {...event} />
        {/* <ContactInfo {...event}/> */}
      </ScrollView>
    </View>
  );
}

// Styles define the layout and look of the components above:
// Colors, flex direction, margins, text style, and background colors are defined here.
// The design uses a dark background (#2C2C2C) and white text for contrast.
const styles = StyleSheet.create({
  icon: {
    display: "flex",
    width: "auto",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  starIcon: {
    display: "flex",
    width: "auto",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    color: "#FDDA0D",
  },
  closeIcon: {
    display: "flex",
    width: "auto",
    height: "auto",
    alignItems: "center",
    justifyContent: "center",
    color: "red",
  },
  absoluteContainer: {
    position: "absolute",
    marginLeft: "2%",
    marginRight: "2%",
  },
  detailsParagraphContainer: {
    paddingTop: "7%",
  },
  detailsContainer: {
    marginLeft: "6%",
    marginRight: "6%",
    marginTop: "3%",
  },
  pageContainer: {
    flexDirection: "column",
    display: "flex",
    backgroundColor: "#2C2C2C",
    height: "100%",
  },
  contactContainer: {
    backgroundColor: "#2C2C2C",
    alignItems: "center",
    marginTop: "10%",
    marginBottom: "5%",
  },
  timeContainer: {
    color: "white",
    marginLeft: "8%",
    marginTop: "0.7%",
    gap: 10,
  },
  calendarContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: "4%",
  },
  eventName: {
    color: "white",
    fontSize: 20,
    marginBottom: "1%",
    fontWeight: "bold",
  },
  bannerImage: {
    width: "100%",
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  sideContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    color: "white",
    marginTop: "3%",
  },
  addressText: {
    color: "white",
  },
  detailText: {
    color: "white",
    paddingTop: "2%",
  },
  eventDetailsTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  directionsTitle: {
    color: "#48FF37",
    fontSize: 15,
  },
  addressContainer: {
    marginLeft: "8%",
    marginTop: "1.5%",
  },
  farRight: {
    marginLeft: "60%",
  },
  leftCircleButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 100,
  },
  rightCircleButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 100,
    marginLeft: "80%",
  },
  bottomCircleButton: {
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 35,
    height: 35,
    backgroundColor: "#fff",
    borderRadius: 100,
    marginTop: "3%",
  },
});
