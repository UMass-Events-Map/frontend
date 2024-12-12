// Importing necessary components and hooks from React and React Native.
// `View`, `Text`, and `Image` are core UI components.
// `StyleSheet` is for creating styles in React Native.
// `EventList` is a custom component that displays a list of events.
// `useState` and `useEffect` are React hooks used for state management and side effects.
// `Building` and `Event` are TypeScript interfaces representing the shape of building and event data.
import { View, Text, Image, StyleSheet } from "react-native";
import EventList from "./EventList";
import { useState, useEffect } from "react";
import { Building, Event } from "@/constants/Interfaces";

// The BuildingPage component takes a Building object as input and displays its details.
// It shows a building image, name, address, and a list of associated events.
// For now, the event data is passed directly from the building object (instead of being fetched),
// though there is commented-out code that can be used to fetch events dynamically by building ID.
export default function BuildingPage(building: Building) {
  // events: state to store the list of events associated with the building.
  // error: state to store any error messages (not currently used).
  const [events, setEvents] = useState<Event[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Commented out useEffect block intended for fetching events by building ID from an API.
  // If uncommented, it would set the `events` state to the fetched data.
  // useEffect(() => {
  //   const fetchEventByBuildingId = async (id: string) => {
  //     const response = await fetch(
  //       `https://umaps.phoenixfi.app/buildings/${id}/events`,
  //       {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (response.status === 200 || 304) {
  //       const data = await response.json();
  //       setEvents(data);
  //     } else {
  //       console.error("Error fetching events by building id");
  //     }
  //   };
  //   fetchEventByBuildingId(building.id);
  // }, []);

  // The component layout includes:
  // - A building image at the top.
  // - The building name in bold.
  // - The building address underneath.
  // - An EventList component to display the building's events.
  return (
    <View style={styles.container}>
      <Image
        style={styles.buildingImage}
        source={{
          uri: building.thumbnail,
        }}
      />
      <Text style={styles.buildingName}> {building.name} </Text>
      <Text style={styles.buildingAddress}>{building.address}</Text>
      {/* Display events directly from building.events. */}
      <EventList events={building.events} />
    </View>
  );
}

// Styles define the layout and appearance of the BuildingPage component.
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  buildingImage: {
    height: "30%",
  },
  buildingName: {
    width: "100%",
    fontSize: 26,
    fontWeight: "bold",
    color: "#7E2622",
    textAlign: "center",
    marginTop: 7,
    marginBottom: 3,
  },
  buildingAddress: {
    width: "100%",
    fontSize: 13,
    fontFamily: "regular",
    color: "#000",
    textAlign: "center",
    marginBottom: 10,
  },
});
