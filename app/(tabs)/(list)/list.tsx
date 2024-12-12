import { View, StyleSheet, TextInput, SafeAreaView, ActivityIndicator, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import React from 'react';
import EventList from "@/components/EventList";
import { useState, useEffect, useMemo } from "react";
import { Event } from "@/constants/Interfaces";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";


export default function List() {
  // State management for the events that are shown
  const [events, setEvents] = useState<any[] | null>(null);

  // State management for the search bar
  const [searchQuery, setSearchQuery] = useState("");

  // State management for the loading screen
  const [loading, setLoading] = useState<boolean>(false);

  // State management for filtering the day via a dropdown menu
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // State management for filtering the week via a dropdown menu
  const [rangeOpen, setRangeOpen] = useState(false);
  const [rangeValue, setRangeValue] = useState<string | null>(null);
  const [rangeItems, setRangeItems] = useState([
    { label: "All Weeks", value: "" },
    { label: "1 Week", value: "1_week" },
    { label: "2 Weeks", value: "2_weeks" },
    { label: "3 Weeks", value: "3_weeks" },
    { label: "1 Month", value: "1_month" },
  ]);

 
 const handleSearch = (query: string) => {
    // handle searching 
    setSearchQuery(query);
  };

  useEffect(() => {
    const fetchEvent = async (id: string): Promise<Event | null> => {
      const response = await fetch(`https://umaps.phoenixfi.app/events/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200 || 304) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching event by id");
        return null;
      }
    };
  
    const fetchEventsId = async (): Promise<(Event & { buildingName?: string })[]> => {
      const response = await fetch(`https://umaps.phoenixfi.app/events/ids`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.status === 200 || 304) {
        const data = await response.json();
        const eventPromises = data.ids.map(async (id: string) => {
          const event = await fetchEvent(id);
          return event;
        });
        return (await Promise.all(eventPromises)).filter((e) => e !== null) as Event[];
      } else {
        console.error("Error fetching events");
        return [];
      }
    };
  
    fetchEventsId().then((data) => {
      setEvents(data);
    });
  }, []);
  


  // Calculate Time Range
  const filterByTimeRange = (events: any[], range: string | null) => {
    if (!range) return events;

    const now = new Date();
    let endDate: any;

    switch (range) {
      case "1_week":
        endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        break;
      case "2_weeks":
        endDate = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000);
        break;
      case "3_weeks":
        endDate = new Date(now.getTime() + 21 * 24 * 60 * 60 * 1000);
        break;
      case "1_month":
        endDate = new Date(now.setMonth(now.getMonth() + 1));
        break;
    }

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate <= endDate;
    });
  };


  // Filtered Events
  const filteredEvents = useMemo(() => {
    setLoading(true);
    if (!events) return null;
  
    const searchFiltered = events.filter((event) => {
      const formattedDate = formatter.format(new Date(event.date));
      const eventTime = event.time.substring(0, event.time.length - 3);
    
      return (
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by name
        formattedDate.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by date
        eventTime.toLowerCase().includes(searchQuery.toLowerCase()) || // Search by time
        event.building.name.toLowerCase().includes(searchQuery.toLowerCase()) // Search by building
      );
    });

    const dayFiltered = selectedDay
      ? searchFiltered.filter((event) => {
          const eventDate = new Date(event.date);
          const eventDay = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
            new Date(eventDate.getTime() + eventDate.getTimezoneOffset() * 60000)
          );
          return eventDay.toLowerCase() === selectedDay.toLowerCase();
        })
      : searchFiltered;

      setLoading(false);
      return filterByTimeRange(dayFiltered, rangeValue);
    }, [events, searchQuery, selectedDay, rangeValue]);
  

  const [key, setKey] = useState(0);
  const reloadComponent = () => {
    setKey((prevKey) => prevKey + 1);
  };
  return (
    <SafeAreaView>
      <View style={styles.containerRow}>
      <TextInput
        placeholder="Search by name, date, or time"
        placeholderTextColor="grey"
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <TouchableHighlight
        style={styles.refreshButton}
        underlayColor={"#FAFAFA"}
        onPress={reloadComponent}
      >
        <Ionicons name={"refresh-outline"} size={27} color={"#7E2622"} />
      </TouchableHighlight>
    </View>
    
      <View style={styles.dropdownRow}>
        <DropDownPicker
          open={isDropdownOpen}
          setOpen={setIsDropdownOpen}
          value={selectedDay}
          setValue={setSelectedDay}
          items={[
            { label: "All Days", value: "" },
            { label: "Sunday", value: "Sunday" },
            { label: "Monday", value: "Monday" },
            { label: "Tuesday", value: "Tuesday" },
            { label: "Wednesday", value: "Wednesday" },
            { label: "Thursday", value: "Thursday" },
            { label: "Friday", value: "Friday" },
            { label: "Saturday", value: "Saturday" },
          ]}
          placeholder="Select Day"
          containerStyle={styles.dropdownContainer}
          style={styles.dropdown}
          maxHeight={200}
        />
        <DropDownPicker
          open={rangeOpen}
          value={rangeValue}
          items={rangeItems}
          setOpen={setRangeOpen}
          setValue={setRangeValue}
          setItems={setRangeItems}
          placeholder="All Weeks"
          style={styles.dropdown}
          containerStyle={styles.dropdownContainer}
          maxHeight={200}
          zIndex={1000} // Prevent overlap issues
        />
      </View>
        <EventList key={key} events={filteredEvents as Event[]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  refreshButton: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    borderRadius: 20,
    height: 50
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    flex: 0,
    fontSize: 35,
    fontWeight: "bold",
    color: "#7E2622",
    marginLeft: 10,
    marginBottom: 15,
  },
  searchBar: {
    flex: 1,
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    borderRadius: 20,
    height: 50
  },
  dropdownContainer: {
    paddingHorizontal: 5,
    paddingTop: 5,
    marginBottom: 5,
    width: "50%",
    flexDirection: "row",
  },
  dropdown: {
    borderColor: "#D6D6D6",
    borderRadius: 10,
    zIndex: 1000
  },
  dropdownRow: {
    flexDirection: "row", // Aligns the dropdowns side by side
    justifyContent: "space-between", // Ensures they are spaced evenly
    marginHorizontal: 6,
    marginBottom: 10,
    zIndex: 1000
  },
  loading: {
    alignItems: "center",
    justifyContent: "center",
    flex: 100
  },
});

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const formatter = new Intl.DateTimeFormat("en-US", options);
