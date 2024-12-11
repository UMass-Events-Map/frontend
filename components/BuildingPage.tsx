import { View, Text, Image, StyleSheet } from "react-native";
import EventList from "./EventList";
import { useState, useEffect } from "react";
import { Building, Event } from "@/constants/Interfaces";

export default function BuildingPage(building: Building) {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [error, setError] = useState<string | null>(null);

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
  return (
    <View style={styles.container}>
      <Image
        style={styles.buildingImage}
        source={{
          uri: building.thumbnail,
        }}
      />
      <Text style={styles.buildingName}> {building.name} </Text>
      <Text style={styles.buildingAddress}>
        {building.address}
      </Text>
      <EventList events={building.events} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
  buildingImage: {
    height: '30%',
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
