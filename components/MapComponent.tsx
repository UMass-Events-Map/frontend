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
  Button
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import ActionSheet, {
  SheetManager,
  ActionSheetRef,
  useScrollHandlers,
} from "react-native-actions-sheet";
import { BuildingProp, Building, Event } from "@/constants/Interfaces";
import { Ionicons } from "@expo/vector-icons";
import dayjs from 'dayjs';
import DateTimePicker from 'react-native-ui-datepicker';

const amherstRegion = {
  // Data to have map focus in on Amherst Area on load
  latitude: 42.390309,
  longitude: -72.527682,
  latitudeDelta: 0.012,
  longitudeDelta: 0.012,
};

export default function MapComponent() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [allBuildings, setAllBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [date, setDate] = useState(dayjs());

  // Manage modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  const mapRef = useRef<MapView>(null)

  const [mapKey, setMapKey] = useState(0);
  const reloadMap = () => {
    setMapKey(prevKey => prevKey + 1);
  };

  const zoomToRegion = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(amherstRegion, 250);
    }
  };

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

    if (response.status === 200 || 304) {
      const data = await response.json();
      setAllBuildings(data.data);
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

  const filterBuildingByDate = async () => {
    setLoading(true);
    const promises: Promise<Event[]>[] = new Array(allBuildings.length);
    allBuildings.forEach(async (building, index) => {
      const promise = fetchEventByBuildingId(building.id);
      promises[index] = promise;
      building.events = (await promise).filter((e) => e.date === date.format('YYYY-MM-DD'));
    });
    await Promise.all(promises);
    setBuildings(allBuildings.filter(b => b.events !== null && b.events.length > 0));
    setLoading(false);
    reloadMap()
  }

  useEffect(() => {
    fetchBuildings()
    .then(async (data) => {
      setAllBuildings(data);
      setLoading(true);
      const promises: Promise<Event[]>[] = new Array(data.length);
      data.forEach(async (building, index) => {
        const promise = fetchEventByBuildingId(building.id);
        promises[index] = promise;
        building.events = (await promise).filter((e) => e.date === date.format('YYYY-MM-DD'));
      });
      await Promise.all(promises);
      setBuildings(data.filter(b => b.events !== null && b.events.length > 0));
      setLoading(false);
      reloadMap()
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
        key={mapKey}
        ref={mapRef}
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
      <View style={styles.buttonsContainer}>
        <TouchableHighlight style={styles.circleButton} underlayColor={"#FAFAFA"} onPress={zoomToRegion}> 
          <Ionicons name={"navigate"} size={30} color={'#7E2622'}/>
        </TouchableHighlight>
      </View>
      <SafeAreaView style={{ position: 'absolute', width: '100%', alignItems: 'center'}}>
          <TouchableHighlight style={styles.dateContainer} onPress={() => setModalVisible(!modalVisible)} underlayColor={"#FAFAFA"}>
            <Text style={styles.dateText}>{date.format('dddd, MMMM D, YYYY')}</Text>
          </TouchableHighlight>
      </SafeAreaView>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator color="#7E2622" size="large" animating={loading} />
        </View>
      )}
      <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={() => {
          setModalVisible(!modalVisible);}}
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
              <Button 
                  title="Done"
                  color={'#AD3835'}
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

const resizedWidth = 30;
const resizedHeight = resizedWidth / 0.86;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loading: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5FCFF88",
    flex: 1
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
  buttonsContainer: {
    position: 'absolute',
    top: '30%',
    right: '3%',
  },
  circleButton: {
    height: 55,
    backgroundColor: 'white',
    width: 55,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 10
  },
  dateContainer: {
    backgroundColor: 'white',
    borderRadius: 100,
    paddingVertical: 15,
    paddingHorizontal: 20,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
  dateText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7E2622'
  },
  datePickerContainer: {
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: 'white'
}
});
