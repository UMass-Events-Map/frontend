import ActionSheet, {
  SheetProps,
  useScrollHandlers,
} from "react-native-actions-sheet";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import EventDetails from "./EventDetails";

export default function EventDetailSheet(
  props: SheetProps<"eventdetail-sheet">
) {
  // If there is no event data in the payload, show an error text.
  if (!props.payload?.value) {
    return <Text> Error fetching Event Details </Text>;
  } else {
    // If event data is available, show it in an ActionSheet with a snap point at 95% height.
    // EventDetails is a component that displays the details of the selected event.
    return (
      <ActionSheet gestureEnabled initialSnapIndex={0} snapPoints={[95]}>
        <EventDetails {...props.payload?.value} />
      </ActionSheet>
    );
  }
}

const styles = StyleSheet.create({
  // Main container style (not currently used in this component directly)
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 70,
  },
  // Heading style for titles
  heading: {
    flex: 0,
    fontSize: 35,
    fontWeight: "bold",
    color: "#7E2622",
    textAlign: "center",
    padding: 15,
  },
  // Style for any event list displayed (not currently used here)
  eventList: {
    flex: 0,
  },
});
