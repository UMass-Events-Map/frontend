// Importing the ActionSheet component, SheetProps type, and useScrollHandlers hook from 'react-native-actions-sheet'.
// ActionSheet is a component that can display a bottom sheet with various props for styling and behavior.
// SheetProps describes the expected properties for this sheet based on its registered type.
// useScrollHandlers helps manage scroll behavior within the sheet.
import ActionSheet, {
  SheetProps,
  useScrollHandlers,
} from "react-native-actions-sheet";

// Importing core React Native components: View, Text, StyleSheet, and ScrollView.
// View is the basic container component, Text is used for displaying text,
// StyleSheet helps create styles, and ScrollView enables vertical scrollable containers.
import { View, Text, StyleSheet, ScrollView } from "react-native";

// Importing React hooks useState and useEffect for state management and side effects, if needed.
import { useState, useEffect } from "react";

// Importing the EventList component, which might be a list of events to display,
// and the BuildingPage component, which presumably shows details about a building.
import EventList from "@/components/EventList";
import BuildingPage from "@/components/BuildingPage";

// Importing the Building interface to ensure the payload we receive matches the expected data structure.
import { Building } from "@/constants/Interfaces";

// This component represents the action sheet for the "mapaction-sheet".
// It receives props typed with SheetProps for the 'mapaction-sheet',
// ensuring TypeScript type checking for the payload data.
export default function MapActionSheet(props: SheetProps<"mapaction-sheet">) {
  // Check if the `payload` or `payload.value` is not provided.
  // If it's missing, return an empty View to avoid rendering the ActionSheet without data.
  if (!props.payload?.value) {
    return <View></View>;
  } else {
    // If we have a valid `payload.value`, we render the ActionSheet.
    // The ActionSheet component is configured with various props:
    // - safeAreaInsets ensures content doesn't overlap with device's safe area (notches, etc.).
    // - indicatorStyle sets the style for the drag indicator.
    // - headerAlwaysVisible ensures that even if content is short, the header is shown.
    // - gestureEnabled and enableGesturesInScrollView allow for interactive dragging.
    // - initialSnapIndex sets the initial state of the sheet.
    // - snapPoints defines the possible snap positions of the sheet.
    // Inside the ActionSheet, we render the BuildingPage component with the building data.
    return (
      <ActionSheet
        safeAreaInsets={{ top: 0, right: 0, bottom: 0, left: 0 }}
        indicatorStyle={{ backgroundColor: "lightgray" }}
        headerAlwaysVisible={true}
        gestureEnabled
        enableGesturesInScrollView
        initialSnapIndex={0}
        snapPoints={[100]}
      >
        <BuildingPage {...props.payload?.value}></BuildingPage>
      </ActionSheet>
    );
  }
}

// Styles for the component. Although they may not all be used within this snippet,
// these styles define a container, heading, and eventList styles for the layout and presentation.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 70,
  },
  heading: {
    flex: 0,
    fontSize: 35,
    fontWeight: "bold",
    color: "#7E2622",
    textAlign: "center",
    padding: 15,
  },
  eventList: {
    flex: 0,
  },
});
