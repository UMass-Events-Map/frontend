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
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import ActionSheet, {
  SheetManager,
  ActionSheetRef,
  useScrollHandlers,
} from "react-native-actions-sheet";
import { BuildingProp, Building, Event } from "@/constants/Interfaces";
import { ApiService } from "@/service/api.service";

const amherstRegion = {
  // Data to have map focus in on Amherst Area on load
  latitude: 42.390309,
  longitude: -72.527682,
  latitudeDelta: 0.012,
  longitudeDelta: 0.012,
};

export default function MapComponent() {
  const [buildings, setBuildings] = useState<Building[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBuildings = async (): Promise<Building[]> => {
      const response = await fetch(
        `https://umaps.phoenixfi.app/buildings?limit=${20}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || 304) {
        const data = await response.json();
        return data.data;
      } else {
        console.error("Error fetching buildings");
        return [];
      }
    };

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

      if (response.status === 200 || 304) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching events by building id");
        return [];
      }
    };
    fetchBuildings().then(async (data) => {
      const promises: Promise<Event[]>[] = new Array(data.length);
      data.forEach(async (building, index) => {
        const promise = fetchEventByBuildingId(building.id);
        promises[index] = promise;
        building.events = await promise;
      });
      await Promise.all(promises);
      setBuildings(data.filter(b => b.events !== null && b.events.length > 0));
      setLoading(false);
    })
  }, []);

  const handleMarkerPress = (building: Building) => {
    SheetManager.show("mapaction-sheet", {
      payload: { value: building },
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
        style={styles.map}
        region={amherstRegion}
      >
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
            <Image
              style={styles.markerImage}
              source={require("../assets/icons/pin.png")}
            />
          </Marker>
        ))}
      </MapView>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color="#7E2622" size="large" animating={loading} />
        </View>
      )}
    </View>
  );
}

const resizedWidth = 30;
const resizedHeight = resizedWidth / 0.86;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF88",
  },
  map: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#666",
  },
  markerImage: {
    width: resizedWidth,
    height: resizedHeight,
  },
});
