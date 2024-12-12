import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  memo,
  useEffect,
} from "react";
import {
  Platform,
  Text,
  StyleSheet,
  View,
  Image,
  Modal,
  ScrollView,
  ActivityIndicator,
  TouchableHighlight,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from "react-native-maps";
import ActionSheet, {
  SheetManager,
  ActionSheetRef,
  useScrollHandlers,
} from "react-native-actions-sheet";
import { BuildingProp, Building, Event } from "@/constants/Interfaces";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import DateTimePicker from "react-native-ui-datepicker";

// Initial region settings for Amherst map area
const amherstRegion = {
  latitude: 42.390309,
  longitude: -72.527682,
  latitudeDelta: 0.012,
  longitudeDelta: 0.012,
};

const amherstOutline = [
  // Coordinates defining a polygon that outlines the Amherst area
  { latitude: 42.39687750573958, longitude: -72.53179399481978 },
  { latitude: 42.39641734582244, longitude: -72.53399563305013 },
  { latitude: 42.393027397115645, longitude: -72.53856507088673 },
  { latitude: 42.38774861550499, longitude: -72.53894355996819 },
  { latitude: 42.385319659157716, longitude: -72.53843166557478 },
  { latitude: 42.3815595278501, longitude: -72.53820538835554 },
  { latitude: 42.38183403111216, longitude: -72.53412549359008 },
  { latitude: 42.3806869420396, longitude: -72.53182462588248 },
  { latitude: 42.3806869420396, longitude: -72.53056305550214 },
  { latitude: 42.38191652037847, longitude: -72.52584968838677 },
  { latitude: 42.38332635504355, longitude: -72.52063673430507 },
  { latitude: 42.38878603110683, longitude: -72.51698090183982 },
  { latitude: 42.39262484388817, longitude: -72.51645806612888 },
  { latitude: 42.3974397009589, longitude: -72.52093766444546 },
  { latitude: 42.399236354401665, longitude: -72.52585840357689 },
  { latitude: 42.39686901018197, longitude: -72.53178895977285 },
];

export default function MapComponent() {
  // State that holds currently displayed buildings with events
  const [buildings, setBuildings] = useState<Building[]>([]);
  // State that holds all buildings fetched from the API
  const [allBuildings, setAllBuildings] = useState<Building[]>([]);
  // State to track loading data
  const [loading, setLoading] = useState<boolean>(true);
  // State to track the currently selected date for events
  const [date, setDate] = useState(dayjs());

  // Controls the visibility of the date picker modal
  const [modalVisible, setModalVisible] = useState(false);

  // Ref for the MapView component
  const mapRef = useRef<MapView>(null);

  // State used to force a re-render of the map when filtering
  const [mapKey, setMapKey] = useState(0);

  // Function to increment the mapKey and thus reload the map
  const reloadMap = () => {
    setMapKey((prevKey) => prevKey + 1);
  };

  // Recenters the map to the initial Amherst region
  const zoomToRegion = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(amherstRegion, 250);
    }
  };

  // Fetches all buildings from the API
  const fetchBuildings = async (): Promise<Building[]> => {
    const response = await fetch(
      `https://umaps.phoenixfi.app/buildings?limit=${30}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // If successful response
    if (response.status === 200 || 304) {
      const data = await response.json();
      setAllBuildings(data.data);
      return data.data;
    } else {
      console.error("Error fetching buildings");
      return [];
    }
  };

  // Fetches events for a specific building by its ID
  const fetchEventByBuildingId = async (id: string): Promise<Event[]> => {
    const response = await fetch(
      `https://umaps.phoenixfi.app/buildings/${id}/events`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // If successful response
    if (response.status === 200 || 304) {
      const data = await response.json();
      return data;
    } else {
      console.error("Error fetching events by building id");
      return [];
    }
  };

  // Filters buildings based on the currently selected date
  const filterBuildingByDate = async () => {
    setLoading(true);
    const promises: Promise<Event[]>[] = new Array(allBuildings.length);
    // Iterate through all buildings and fetch their events, then filter by date
    allBuildings.forEach(async (building, index) => {
      const promise = fetchEventByBuildingId(building.id);
      promises[index] = promise;
      building.events = (await promise).filter(
        (e) => e.date === date.format("YYYY-MM-DD")
      );
    });
    await Promise.all(promises);
    // Update state with only those buildings that have events for the selected date
    setBuildings(
      allBuildings.filter((b) => b.events !== null && b.events.length > 0)
    );
    setLoading(false);
    reloadMap();
  };

  useEffect(() => {
    // Initial fetch of buildings, then events, and set state accordingly
    fetchBuildings().then(async (data) => {
      setAllBuildings(data);
      setLoading(true);
      const promises: Promise<Event[]>[] = new Array(data.length);
      data.forEach(async (building, index) => {
        const promise = fetchEventByBuildingId(building.id);
        promises[index] = promise;
        building.events = (await promise).filter(
          (e) => e.date === date.format("YYYY-MM-DD")
        );
      });
      await Promise.all(promises);
      // After fetching and filtering events, set the buildings state
      setBuildings(
        data.filter((b) => b.events !== null && b.events.length > 0)
      );
      setLoading(false);
      reloadMap();
    });
  }, []);

  // Handles the press event on a building marker, displaying more info in the action sheet
  const handleMarkerPress = (building: Building) => {
    SheetManager.show("mapaction-sheet", {
      payload: { value: building },
    });
  };

  return (
    <View style={styles.container}>
      {/* The main map view */}
      <MapView
        key={mapKey}
        ref={mapRef}
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        region={amherstRegion}
      >
        {/* Draws an outline polygon around Amherst area */}
        <Polygon
          coordinates={amherstOutline}
          strokeWidth={2}
          strokeColor="#AD3835"
          lineDashPattern={[8, 5]}
        />
        {/* Place markers for buildings that have events on the selected date */}
        {buildings?.map((building) => (
          <Marker
            key={building.id}
            coordinate={{
              latitude: building.latitude,
              longitude: building.longitude,
            }}
            onPress={() => handleMarkerPress(building)}
            zIndex={9999999}
          >
            {/* Custom marker image */}
            <Image
              style={styles.markerImage}
              source={require("../assets/icons/pin.png")}
            />
          </Marker>
        ))}
      </MapView>

      {/* Button to recenter the map to the Amherst region */}
      <View style={styles.buttonsContainer}>
        <TouchableHighlight
          style={styles.circleButton}
          underlayColor={"#FAFAFA"}
          onPress={zoomToRegion}
        >
          <Ionicons name={"navigate"} size={30} color={"#7E2622"} />
        </TouchableHighlight>
      </View>

      {/* Date selector trigger at the top center */}
      <SafeAreaView
        style={{ position: "absolute", width: "100%", alignItems: "center" }}
      >
        <TouchableHighlight
          style={styles.dateContainer}
          onPress={() => setModalVisible(!modalVisible)}
          underlayColor={"#FAFAFA"}
        >
          <Text style={styles.dateText}>
            {date.format("dddd, MMMM D, YYYY")}
          </Text>
        </TouchableHighlight>
      </SafeAreaView>

      {/* Loading indicator while fetching/filtering data */}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color="#7E2622" size="large" animating={loading} />
        </View>
      )}

      {/* Date picker modal */}
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.datePickerContainer}>
          <DateTimePicker
            mode="single"
            date={date}
            onChange={(params) => setDate(dayjs(params.date))}
            selectedItemColor="#AD3835"
            headerButtonColor="#AD3835"
            displayFullDays
            todayContainerStyle={{
              borderWidth: 1,
            }}
          />
          {/* Done button to close modal and refetch events filtered by new date */}
          <Button
            title="Done"
            color={"#AD3835"}
            onPress={() => {
              setModalVisible(!modalVisible);
              filterBuildingByDate();
            }}
          />
        </View>
      </Modal>
    </View>
  );
}

// Dimensions for resizing the marker image
const resizedWidth = 30;
const resizedHeight = resizedWidth / 0.86;

const styles = StyleSheet.create({
  // Container for the entire screen
  container: {
    flex: 1,
  },
  // Loading overlay styles
  loading: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF88",
    flex: 1,
  },
  // Style for the MapView component
  map: {
    flex: 1,
  },
  // Content container (if needed for scroll views, etc.)
  contentContainer: {
    padding: 16,
    alignItems: "center",
  },
  // Title style (not currently used)
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  // Description style (not currently used)
  description: {
    fontSize: 16,
    color: "#666",
  },
  // Style for the custom marker pin image
  markerImage: {
    width: resizedWidth,
    height: resizedHeight,
  },
  // Container for any floating action buttons over the map
  buttonsContainer: {
    position: "absolute",
    top: "30%",
    right: "3%",
  },
  // Style for a circular floating button
  circleButton: {
    height: 55,
    backgroundColor: "white",
    width: 55,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 10,
  },
  // Container for the date label at the top
  dateContainer: {
    backgroundColor: "white",
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  // Text style for the currently selected date
  dateText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#7E2622",
  },
  // Container for the date picker modal
  datePickerContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});
