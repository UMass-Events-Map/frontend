import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  SafeAreaView,
} from "react-native";
import EventList from "@/components/EventList";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { Link } from "expo-router";
import OrgProfile from "@/components/OrgProfile";
import { Event } from "@/constants/Interfaces";

export default function List() {
  const [events, setEvents] = useState<Event[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor={"grey"}
        style={styles.searchBar}
        clearButtonMode="always"
        value={searchQuery}
        autoCorrect={false}
        onChangeText={(query) => handleSearch(query)}
      />
      <EventList events={events} />
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
    marginBottom: 20,
    padding: 10,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    borderRadius: 20,
  },
});
