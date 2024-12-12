import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import EventList from "./EventList";
import { Event, EventListProps } from "@/constants/Interfaces";

// The OrgProfile component takes an array of events as a prop.
// It displays an organization's profile information along with a list of events associated with it.
export default function OrgProfile(events: Event[]) {
  return (
    // The main container View, which fills the screen and sets the background and spacing from the top.
    <View style={styles.container}>
      {/* A header section containing the org logo and name, as well as a status icon */}
      <View style={styles.header}>
        {/* The organization’s logo as an Image component */}
        <Image
          source={{ uri: "https://via.placeholder.com/100" }}
          style={styles.logo}
        />
        {/* The title container holds the org name and the MaterialCommunityIcons component */}
        <View style={styles.titleContainer}>
          {/* The organization’s displayed name */}
          <Text style={styles.title}>Org Name</Text>
          {/* A power-plug icon from MaterialCommunityIcons to indicate some status (e.g., active org) */}
          <MaterialCommunityIcons name="power-plug" size={24} color="#34C759" />
        </View>
      </View>
      {/* A title for the events list section */}
      <Text style={styles.listTitle}>Your events:</Text>
      {/* EventList component for displaying a list of events (currently commented out) */}
      {/* <EventList events={events} /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  // The outermost container styling:
  // Sets the background color, makes it take up the full height, and adds padding from top
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 70,
  },
  // Styles for the header section, ensuring elements are horizontally aligned
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    marginBottom: 20,
  },
  // The organization logo image styling: a 100x100 circle image
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  // A container for the org name and icon, separated from the logo
  titleContainer: {
    marginLeft: 20,
  },
  // The style for the organization name text
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  // The style for the "Your events:" title above the event list
  listTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 10,
    paddingBottom: 15,
  },
});
