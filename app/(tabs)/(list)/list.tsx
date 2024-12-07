import { Text, View, StyleSheet, Button, TextInput, SafeAreaView } from "react-native";
import React from 'react';
import EventList from "@/components/EventList";
import { useState, useEffect, useMemo } from "react";
import { supabase } from '@/utils/supabase';
import { Event } from "@/constants/Interfaces";
import { Link } from 'expo-router';
import OrgProfile from "@/components/OrgProfile";
import DropDownPicker from "react-native-dropdown-picker";


export default function List() {
  // State management for the events that are shown
  const [events, setEvents] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // State management for the search bar
  const [searchQuery, setSearchQuery] = useState("");

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

    const fetchEventsId = async (): Promise<string[]> => {
      const response = await fetch(`https://umaps.phoenixfi.app/events/ids`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 || 304) {
        const data = await response.json();
        return data.ids;
      } else {
        console.error("Error fetching events");
        return [];
      }
    };

    fetchEventsId()
      .then(async (data): Promise<Event[]> => {
        const promises: Promise<Event | null>[] = data.map((id) =>
          fetchEvent(id)
        );
        const response: (Event | null)[] = await Promise.all(promises);
        return response.filter((e) => e !== null);
      })
      .then((data) => {
        setEvents(data);
      });
  }, []);


  // Calculate Time Range
  const filterByTimeRange = (events: any[], range: string | null) => {
    if (!range) return events;

    const now = new Date();
    let endDate: any;
    let startDate: any;

    switch (range) {
      case "1_week":
        endDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
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
      default:
        startDate = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
        return events.filter;
    }

    return events.filter((event) => {
      const eventDate = new Date(event.date);
      return eventDate <= endDate;
    });
  };


  // Filtered Events
  const filteredEvents = useMemo(() => {
    if (!events) return [];

    const searchFiltered = events.filter((event) => {
      const formattedDate = formatter.format(new Date(event.date));
      const eventTime = event.time.substring(0, event.time.length - 3);

      return (
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        formattedDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eventTime.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

    const dayFiltered = selectedDay
      ? searchFiltered.filter((event) => {
          const eventDay = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
            new Date(event.date)
          );
          return eventDay.toLowerCase() === selectedDay.toLowerCase();
        })
      : searchFiltered;

    return filterByTimeRange(dayFiltered, rangeValue);
  }, [events, searchQuery, selectedDay, rangeValue]);
  

  return (
    <SafeAreaView>
      <TextInput
        placeholder="Search by name, date, or time"
        placeholderTextColor="grey"
        style={styles.searchBar}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
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
     
      <EventList events={filteredEvents as Event[]} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    zIndex: 10
  },
  dropdownRow: {
    flexDirection: "row", // Aligns the dropdowns side by side
    justifyContent: "space-between", // Ensures they are spaced evenly
    marginHorizontal: 6,
    marginBottom: 10,
    zIndex: 10
  },
});

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};

const formatter = new Intl.DateTimeFormat("en-US", options);
