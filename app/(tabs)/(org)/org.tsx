// Import necessary modules and components from React and React Native libraries
import React, { useEffect, useState } from "react";
import {
  View, // Container component for layout
  Text, // Component for displaying text
  Image, // Component for displaying images
  ActivityIndicator, // Component for displaying a loading spinner
  Alert, // Component for displaying alerts and messages
  StyleSheet, // For creating stylesheet objects
  ScrollView, // Component for creating scrollable views
  TouchableOpacity, // Component for making touchable elements
  Modal, // Component for creating modals
  TextInput, // Component for text input fields
  Button, // Component for clickable buttons
  SafeAreaView, // Ensures content is within the safe area boundaries of a device
  TouchableHighlight, // Component for touchable elements with highlight effect
} from "react-native";

// Import the Supabase client for interacting with the backend
import { supabase } from "@/utils/supabase";

// Import the router for navigation between screens
import { useRouter } from "expo-router";

// Import the Session type from Supabase for user session management
import { Session } from "@supabase/supabase-js";

// Import custom interfaces for type definitions
import { Building, Event } from "@/constants/Interfaces";

// Import DateTimePicker component for selecting date and time
import DateTimePicker from "react-native-ui-datepicker";

// Import Day.js library for date manipulation and formatting
import dayjs from "dayjs";

// Import Ionicons for using icon fonts in the application
import { Ionicons } from "@expo/vector-icons";

// Import DropDownPicker for creating dropdown menus
import DropDownPicker from "react-native-dropdown-picker";

// Define the Organization interface representing an organization entity
interface Organization {
  id: string; // Unique identifier for the organization
  name: string; // Name of the organization
  image_url?: string; // (Optional) URL to the organization's image or logo
  description?: string; // (Optional) Description or bio of the organization
  email?: string; // (Optional) Contact email address
  address?: string; // (Optional) Physical address of the organization
  verified?: boolean; // (Optional) Verification status (true if verified)
}

// Define an interface for the component's props
interface MainOrgPageProps {
  userId: string; // The ID of the user
}

// Define and export the MainOrgPage component
export default function MainOrgPage({ userId }: MainOrgPageProps) {
  // State to hold the organization data
  const [organization, setOrganization] = useState<Organization | null>(null);

  // State to hold the list of events
  const [events, setEvents] = useState<Event[]>([]);

  // State to manage loading status of organization data
  const [loadingOrg, setLoadingOrg] = useState(true);

  // State to manage loading status of events data
  const [loadingEvents, setLoadingEvents] = useState(true);

  // State to hold the user session
  const [session, setSession] = useState<Session | null>(null);

  // Initialize the router for navigation
  const router = useRouter();

  // State for calendar modal (if any additional state is needed, you can include it here)

  // State variables for the Add Event Modal
  const [addModalVisible, setAddModalVisible] = useState(false); // Controls visibility of the Add Event modal
  const [loadingAdd, setLoadingAdd] = useState(false); // Indicates if the add operation is in progress
  const [addName, setAddName] = useState(""); // Holds the event name input in the Add Event modal
  const [addDescription, setAddDescription] = useState(""); // Holds the event description input
  const [dateTime, setDateTime] = useState(dayjs()); // Holds the selected date and time using dayjs
  const [addBuildingId, setAddBuildingId] = useState(""); // Holds the selected building ID
  const [addRoomNumber, setAddRoomNumber] = useState(""); // Holds the room number input
  const [addThumbnail, setAddThumbnail] = useState(""); // Holds the thumbnail image URL input
  const [addAttendance, setAddAttendance] = useState(""); // Holds the attendance number input
  const [buildings, setBuildings] = useState<Building[]>([]); // Holds the list of buildings for the dropdown
  const [loadingBuildings, setLoadingBuildings] = useState(false); // Indicates if building data is being loaded
  const [addDropdownOpen, setAddDropdownOpen] = useState(false); // Controls the open state of the building dropdown
  const [addCalendarModal, setAddCalendarModal] = useState(false); // Controls visibility of the calendar modal

  // State variables for the Edit Event Modal
  const [editModalVisible, setEditModalVisible] = useState(false); // Controls visibility of the Edit Event modal
  const [loadingEdit, setLoadingEdit] = useState(false); // Indicates if the edit operation is in progress
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null); // Holds the currently selected event to edit
  const [editName, setEditName] = useState(""); // Holds the event name input in the Edit Event modal
  const [editDescription, setEditDescription] = useState(""); // Holds the event description input
  const [editDate, setEditDate] = useState(""); // Holds the event date input as a string
  const [editTime, setEditTime] = useState(""); // Holds the event time input as a string
  const [editDateTime, setEditDateTime] = useState(dayjs()); // Holds the selected date and time using dayjs
  const [editBuildingId, setEditBuildingId] = useState(""); // Holds the selected building ID
  const [editRoomNumber, setEditRoomNumber] = useState(""); // Holds the room number input
  const [editThumbnail, setEditThumbnail] = useState(""); // Holds the thumbnail image URL input
  const [editAttendance, setEditAttendance] = useState(""); // Holds the attendance number input
  const [editDropdownOpen, setEditDropdownOpen] = useState(false); // Controls the open state of the building dropdown
  const [editCalendarModal, setEditCalendarModal] = useState(false); // Controls visibility of the calendar modal

  // Fetch the organization linked to the current user
  useEffect(() => {
    const fetchOrganizations = async () => {
      // Function to fetch organizations associated with the current user
      const { data, error } = await supabase.auth.getSession();
      // If there's no session or an error occurred, redirect to the login page
      if (!data?.session || error) {
        router.push("/login");
        return null;
      } else {
        const uid = data.session.user.id;
        try {
          // Fetch the organization's profile using the user ID
          const response = await fetch(
            `https://umaps.phoenixfi.app/organizations/profile/${uid}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            // Parse the response data
            const data = await response.json();
            return data;
          } else {
            console.error("Error fetching organizations");
            return null;
          }
        } catch (err: any) {
          console.error("Failed to fetch organizations:", err.message);
          Alert.alert("Error", "Failed to fetch organizations");
          return null;
        } finally {
          // Set the loading state to false
          setLoadingOrg(false);
        }
      }
    };

    // Function to load organizations and update the state
    const loadOrgs = async () => {
      const orgData = await fetchOrganizations();
      // If organization data is found, set it. Otherwise, set it to null.
      if (orgData && orgData.length > 0) {
        // Set the first organization from the fetched data
        setOrganization(orgData[0]);
      } else {
        setOrganization(null);
      }
    };

    // Invoke the function to load organizations
    loadOrgs();
  }, [userId, router]);

  useEffect(() => {
    // Function to fetch events for a specific organization
    const fetchEvents = async (organizationId: string) => {
      const { data, error } = await supabase.auth.getSession();
      // If there's no session or an error occurred, redirect to the login page
      if (!data?.session || error) {
        router.push("/login");
        return null;
      } else {
        try {
          // Set the loading state to true
          setLoadingEvents(true);
          // Fetch events associated with the organization ID
          const response = await fetch(
            `https://umaps.phoenixfi.app/events/organization/${organizationId}/events`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          if (response.ok) {
            // Parse the response data
            const data = await response.json();
            return data.data;
          } else {
            console.error("Error fetching events");
            return null;
          }
        } catch (err: any) {
          console.error("Failed to fetch events:", err.message);
          Alert.alert("Error", "Failed to fetch events");
          return null;
        } finally {
          // Set the loading state to false
          setLoadingEvents(false);
        }
      }
    };
    // Function to load events and update the state
    const loadEvents = async () => {
      if (!organization) {
        // If no organization is set, clear events and loading state
        setEvents([]);
        setLoadingEvents(false);
        return;
      }
      // Fetch events using the organization's ID
      const eventsData = await fetchEvents(organization.id);
      if (eventsData && eventsData.length > 0) {
        setEvents(eventsData);
      } else {
        setEvents([]);
      }
    };
    // Load events when the organization or router changes
    if (organization) {
      loadEvents();
    }
  }, [organization, router]);

  // Function to fetch buildings whenever the add or edit modal is opened
  const fetchBuildings = async () => {
    const { data: sessionData, error: sessionError } =
      await supabase.auth.getSession();
    // If there's no session or an error occurred, redirect to the login page
    if (!sessionData?.session || sessionError) {
      router.push("/login");
      return null;
    }
    try {
      // Set the loading state to true
      setLoadingBuildings(true);
      // Fetch all buildings
      const response = await fetch(`https://umaps.phoenixfi.app/buildings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Parse and set the buildings data
        const data = await response.json();
        setBuildings(data.data || []);
      } else {
        console.error("Error fetching buildings");
      }
    } catch (err: any) {
      console.error("Failed to fetch buildings:", err.message);
      Alert.alert("Error", "Failed to fetch buildings");
    } finally {
      // Set the loading state to false
      setLoadingBuildings(false);
    }
  };

  // Handle opening the Add Event modal
  const handleOpenAddModal = () => {
    // Reset all fields
    setAddName("");
    setAddDescription("");
    setDateTime(dayjs());
    setAddBuildingId("");
    setAddRoomNumber("");
    setAddThumbnail("");
    setAddAttendance("");
    // Show the Add Event modal
    setAddModalVisible(true);
    // Fetch the list of buildings
    fetchBuildings();
  };

  // Handle adding a new event
  const handleAddEvent = async () => {
    if (!organization) return;
    // Set the loading state to true
    setLoadingAdd(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) throw new Error("No active session found");

      // Make a POST request to create a new event
      const response = await fetch(
        `https://umaps.phoenixfi.app/events/organization/${organization.id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },
          body: JSON.stringify({
            name: addName,
            description: addDescription || null,
            date: dateTime.format("YYYY-MM-DD"),
            time: dateTime.format("hh:mm"),
            building_id: addBuildingId,
            room_number: addRoomNumber || null,
            thumbnail: addThumbnail || null,
            attendance: 0,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create event");
      }

      // On success, parse the returned data
      const data = await response.json();

      // Notify the user and close the modal
      Alert.alert("Success", "Event created successfully");
      setAddModalVisible(false);
      await refreshEvents();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create event");
    } finally {
      // Set the loading state to false
      setLoadingAdd(false);
    }
  };

  // Handle opening the Edit Event modal
  const handleOpenEditModal = (event: Event) => {
    // Set the selected event and populate fields
    setSelectedEvent(event);
    setEditName(event.name);
    setEditDescription(event.description || "");
    setEditDate(event.date || "");
    setEditTime(event.time || "");
    setEditDateTime(dayjs(event.date + " " + event.time));
    setEditRoomNumber(event.room_number || "");
    setEditThumbnail(event.thumbnail || "");
    setEditAttendance(event.attendance ? event.attendance.toString() : "");
    setEditBuildingId(event.building_id || "");
    // Show the Edit Event modal
    setEditModalVisible(true);
    // Fetch the list of buildings
    fetchBuildings();
  };

  // Handle updating an existing event
  const handleUpdateEvent = async () => {
    if (!selectedEvent) return;
    // Set the loading state to true
    setLoadingEdit(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) throw new Error("No active session found");

      // Make a PATCH request to update the event
      const response = await fetch(
        `https://umaps.phoenixfi.app/events/${selectedEvent.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionData.session.access_token}`,
          },

          body: JSON.stringify({
            name: editName || selectedEvent.name,
            room_number: editRoomNumber || selectedEvent.room_number,
            description: editDescription || selectedEvent.description,
            time: editDateTime.format("HH:mm") || selectedEvent.time,
            date: editDateTime.format("YYYY-MM-DD") || selectedEvent.date,
          }),
        }
      );

      if (!response.ok) {
        const errorBody = await response.text();
        console.error(`HTTP error! status: ${response.status}`, errorBody);
        throw new Error(`Request failed with status ${response.status}`);
      }

      // Notify the user and close the modal
      Alert.alert("Success", "Event updated successfully");
      setEditModalVisible(false);
      await refreshEvents();
    } catch (error: any) {
      console.error("Update event error:", error);
      Alert.alert("Error", error.message || "Failed to update event");
    } finally {
      // Set the loading state to false
      setLoadingEdit(false);
    }
  };

  // Function to refresh the events list
  const refreshEvents = async () => {
    if (!organization) return;
    // Fetch the updated list of events
    const response = await fetch(
      `https://umaps.phoenixfi.app/events/organization/${organization.id}/events`,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      const freshData = await response.json();
      if (freshData.data) {
        setEvents(freshData.data);
      }
    }
  };

  // If loading organization data, show a loading indicator
  if (loadingOrg) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // If no organization is found, display a message
  if (!organization) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No organizations</Text>
        <Text style={styles.emptyDescription}>
          Get started by requesting to add your organization.
        </Text>
      </View>
    );
  }

  return (
    // SafeAreaView ensures the content is displayed within the safe area boundaries of a device
    <SafeAreaView style={{ flex: 1 }}>
      // ScrollView allows scrolling of the content if it exceeds the screen
      size
      <ScrollView style={styles.scrollContainer}>
        {/* Organization Header Section */}
        // Card container for displaying organization details
        <View style={styles.card}>
          // Display the organization's image if available
          {organization.image_url && (
            <Image
              source={{ uri: organization.image_url }}
              style={styles.image}
              resizeMode="cover"
            />
          )}
          // Header section containing the organization's name and verification
          badge
          <View style={styles.cardHeader}>
            // Display the organization's name
            <Text style={styles.cardTitle}>{organization.name}</Text>
            // Display 'Verified' badge if the organization is verified
            {organization.verified && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Verified</Text>
              </View>
            )}
          </View>
          // Display the organization's description if available
          {organization.description && (
            <Text style={styles.cardDescription}>
              {organization.description}
            </Text>
          )}
          // Additional organization details
          <View style={styles.cardContent}>
            // Display the organization's email if available
            {organization.email && (
              <Text style={styles.cardDetail}>Email: {organization.email}</Text>
            )}
            // Display the organization's address if available
            {organization.address && (
              <Text style={styles.cardDetail}>
                Address: {organization.address}
              </Text>
            )}
            // Display the organization's ID
            <Text style={styles.cardDetail}>
              Organization ID: {organization.id}
            </Text>
          </View>
        </View>
        {/* Add Event Button */}
        // Container for the 'Add Event' button
        <View style={{ marginBottom: 20, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.addEventButton}
            onPress={handleOpenAddModal}
          >
            // Text for the 'Add Event' button
            <Text style={styles.addEventButtonText}>Add Event</Text>
          </TouchableOpacity>
        </View>
        {/* Events Section */}
        // Title for the events section
        <Text style={styles.sectionTitle}>Events</Text>
        // Conditional rendering based on loading status and events availability
        {loadingEvents ? (
          // Display a loading indicator while events are loading
          <View style={styles.loaderContainer}>
            <ActivityIndicator size="large" />
          </View>
        ) : events.length === 0 ? (
          // Display a message if no events are found
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTitle}>No events found</Text>
            <Text style={styles.emptyDescription}>
              Create a new event to get started.
            </Text>
          </View>
        ) : (
          // Map through the events and display each one
          events.map((event) => (
            // Card for each event
            <View key={event.id} style={styles.eventCard}>
              // Display the event's name
              <Text style={styles.eventName}>{event.name}</Text>
              // Display the event's date
              <Text style={styles.eventDetails}>Date: {event.date}</Text>
              // Display the event's time
              <Text style={styles.eventDetails}>Time: {event.time}</Text>
              // Display the event's description if available
              {event.description && (
                <Text style={styles.eventDetails}>{event.description}</Text>
              )}
              // Button to edit the event
              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={() => handleOpenEditModal(event)}
                >
                  // Text for the 'Edit' button
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
        {/* Add Event Modal */}
        <Modal
          visible={addModalVisible}
          onRequestClose={() => setAddModalVisible(false)}
          animationType="slide"
          transparent={false} // Make the background transparent to show the dim layer
        >
          <SafeAreaView>
            <ScrollView style={styles.container}>
              <Text style={styles.attributeText}>Name:</Text>
              <TextInput
                value={addName}
                onChangeText={setAddName}
                placeholder="Enter event name"
                style={styles.textInput}
              />
              <Text style={styles.attributeText}>Thumbnail:</Text>
              <TextInput
                value={addThumbnail}
                onChangeText={setAddThumbnail}
                placeholder="Provide a thumbnail link"
                style={styles.textInput}
              />
              <Text style={styles.attributeText}>Date & Time:</Text>
              <View style={styles.dateLayout}>
                <Text style={styles.dateInput}>
                  {dateTime.format("ddd, MMMM DD, YYYY")}
                </Text>
                <Text style={styles.timeInput}>{dateTime.format("HH:mm")}</Text>
                <TouchableHighlight
                  onPress={() => setAddCalendarModal(true)}
                  style={styles.calendarButton}
                  underlayColor={"#7E2622"}
                >
                  <Ionicons
                    name={"calendar-outline"}
                    size={30}
                    color={"white"}
                  />
                </TouchableHighlight>
              </View>
              <Modal
                transparent={true}
                visible={addCalendarModal}
                onRequestClose={() => {
                  setAddCalendarModal(!addCalendarModal);
                }}
              >
                <View style={styles.datePickerContainer}>
                  <DateTimePicker
                    mode="single"
                    date={dateTime}
                    onChange={(params) => setDateTime(dayjs(params.date))}
                    selectedItemColor="#AD3835"
                    headerButtonColor="#AD3835"
                    timePicker
                    displayFullDays
                    todayContainerStyle={{
                      borderWidth: 1,
                    }}
                  />
                  <Button
                    title="Done"
                    color={"#AD3835"}
                    onPress={() => setAddCalendarModal(!addCalendarModal)}
                  />
                </View>
              </Modal>
              <Text style={styles.attributeText}>Building:</Text>
              <DropDownPicker
                listMode="MODAL"
                open={addDropdownOpen}
                setOpen={setAddDropdownOpen}
                value={addBuildingId}
                setValue={setAddBuildingId}
                style={{ borderColor: "#AD3835", borderWidth: 2 }}
                items={buildings.map((b: Building) => {
                  return { label: b.name, value: b.id };
                })}
                placeholder="Select a building"
              />
              <Text style={styles.attributeText}>Room Number:</Text>
              <TextInput
                value={addRoomNumber}
                onChangeText={setAddRoomNumber}
                placeholder="Enter a room number"
                style={styles.textInput}
              />

              <Text style={styles.attributeText}>Description:</Text>
              <TextInput
                editable
                multiline
                numberOfLines={10}
                value={addDescription}
                onChangeText={setAddDescription}
                placeholder="Enter a description"
                style={styles.textInput}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingTop: 30,
                }}
              >
                <Button
                  title="Cancel"
                  onPress={() => setAddModalVisible(false)}
                />
                <Button
                  title={loadingAdd ? "Creating..." : "Create Event"}
                  onPress={handleAddEvent}
                  disabled={loadingAdd}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
        {/* Edit Event Modal */}
        <Modal
          visible={editModalVisible}
          onRequestClose={() => setEditModalVisible(false)}
          animationType="slide"
        >
          {/* <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Edit Event</Text>
          <Text>Name *</Text>
          <TextInput style={styles.input} value={editName} onChangeText={setEditName} />


          <Text>Description</Text>
          <TextInput style={styles.input} value={editDescription} onChangeText={setEditDescription} />


          <Text>Date (YYYY-MM-DD)*</Text>
          <TextInput style={styles.input} value={editDate} onChangeText={setEditDate} />


          <Text>Time (HH:MM)*</Text>
          <TextInput style={styles.input} value={editTime} onChangeText={setEditTime} />


          <Text>Room Number</Text>
          <TextInput style={styles.input} value={editRoomNumber} onChangeText={setEditRoomNumber} />


          <Text>Thumbnail URL</Text>
          <TextInput style={styles.input} value={editThumbnail} onChangeText={setEditThumbnail} />


          <Text>Expected Attendance</Text>
          <TextInput style={styles.input} value={editAttendance} onChangeText={setEditAttendance} keyboardType="numeric" />


          <Button title={loadingEdit ? 'Updating...' : 'Update Event'} onPress={handleUpdateEvent} disabled={loadingEdit} />
          <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
        </View>
        </View> */}

          <SafeAreaView>
            <ScrollView style={styles.container}>
              <Text style={styles.attributeText}>Name:</Text>
              <TextInput
                value={editName}
                onChangeText={setEditName}
                placeholder="Enter event name"
                style={styles.textInput}
              />
              <Text style={styles.attributeText}>Thumbnail:</Text>
              <TextInput
                value={editThumbnail}
                onChangeText={setEditThumbnail}
                placeholder="Provide a thumbnail link"
                style={styles.textInput}
              />
              <Text style={styles.attributeText}>Date & Time:</Text>
              <View style={styles.dateLayout}>
                <Text style={styles.dateInput}>
                  {editDateTime.format("ddd, MMMM DD, YYYY")}
                </Text>
                <Text style={styles.timeInput}>
                  {editDateTime.format("HH:mm")}
                </Text>
                <TouchableHighlight
                  onPress={() => setEditCalendarModal(true)}
                  style={styles.calendarButton}
                  underlayColor={"#7E2622"}
                >
                  <Ionicons
                    name={"calendar-outline"}
                    size={30}
                    color={"white"}
                  />
                </TouchableHighlight>
              </View>
              <Modal
                transparent={true}
                visible={editCalendarModal}
                onRequestClose={() => {
                  setEditCalendarModal(!editCalendarModal);
                }}
              >
                <View style={styles.datePickerContainer}>
                  <DateTimePicker
                    mode="single"
                    date={editDateTime}
                    onChange={(params) => {
                      const newDateTime = dayjs(params.date);

                      setEditDateTime(newDateTime);
                    }}
                    selectedItemColor="#AD3835"
                    headerButtonColor="#AD3835"
                    timePicker
                    displayFullDays
                    todayContainerStyle={{
                      borderWidth: 1,
                    }}
                  />
                  <Button
                    title="Done"
                    color={"#AD3835"}
                    onPress={() => setEditCalendarModal(!editCalendarModal)}
                  />
                </View>
              </Modal>
              <Text style={styles.attributeText}>Building:</Text>
              <DropDownPicker
                listMode="MODAL"
                open={editDropdownOpen}
                setOpen={setEditDropdownOpen}
                value={editBuildingId}
                setValue={setEditBuildingId}
                style={{ borderColor: "#AD3835", borderWidth: 2 }}
                items={buildings.map((b: Building) => {
                  return { label: b.name, value: b.id };
                })}
                placeholder="Select a building"
              />
              <Text style={styles.attributeText}>Room Number:</Text>
              <TextInput
                value={editRoomNumber}
                onChangeText={setEditRoomNumber}
                placeholder="Enter a room number"
                style={styles.textInput}
              />

              <Text style={styles.attributeText}>Description:</Text>
              <TextInput
                editable
                multiline
                numberOfLines={10}
                value={editDescription}
                onChangeText={setEditDescription}
                placeholder="Enter a description"
                style={styles.textInput}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  paddingTop: 30,
                }}
              >
                <Button
                  title="Cancel"
                  onPress={() => setEditModalVisible(false)}
                />
                <Button
                  title={loadingEdit ? "Updating..." : "Update Event"}
                  onPress={handleUpdateEvent}
                  disabled={loadingEdit}
                />
              </View>
            </ScrollView>
          </SafeAreaView>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Style for the container that holds the loading indicator
  loaderContainer: {
    flex: 1, // Take up the full height of the parent
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  emptyContainer: {
    padding: 20, // Add padding inside the container
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  emptyTitle: {
    fontSize: 20, // Set the font size
    fontWeight: "bold", // Make the text bold
  },
  emptyDescription: {
    marginTop: 10, // Add margin to the top
    fontSize: 14, // Set the font size
    color: "#555", // Set the text color
    textAlign: "center", // Center the text
  },
  // Style for the scroll container
  scrollContainer: {
    flex: 1, // Take up the full height of the parent
    padding: 16, // Add padding inside the container
  },
  // Style for the card component
  card: {
    backgroundColor: "#fff", // Set the background color to white
    borderRadius: 8, // Round the corners
    marginBottom: 16, // Add margin to the bottom
    overflow: "hidden", // Hide any overflow content
    borderWidth: 1, // Set the border width
    borderColor: "#ccc", // Set the border color
  },
  // Style for the image component
  image: {
    width: "100%", // Take up the full width of the parent
    height: 160, // Set the height
  },
  cardHeader: {
    padding: 16, // Add padding inside the container
    borderBottomWidth: 1, // Set the bottom border width
    borderColor: "#eee", // Set the border color
    flexDirection: "row", // Arrange children in a row
    alignItems: "center", // Center the content vertically
    justifyContent: "space-between", // Space out the children evenly
  },
  // Style for the card title text
  cardTitle: {
    fontSize: 18, // Set the font size
    fontWeight: "bold", // Make the text bold
  },
  // Style for the badge component
  badge: {
    backgroundColor: "green", // Set the background color to green
    borderRadius: 4, // Round the corners
    paddingHorizontal: 8, // Add horizontal padding
    paddingVertical: 4, // Add vertical padding
  }, // Style for the badge text
  badgeText: {
    color: "#fff", // Set the text color to white
    fontSize: 12, // Set the font size
  },
  // Style for the card description text
  cardDescription: {
    padding: 16, // Add padding inside the container
    fontSize: 14, // Set the font size
    color: "#333", // Set the text color
  },
  // Style for the card content container
  cardContent: {
    padding: 16, // Add padding inside the container
  },
  // Style for the card detail text
  cardDetail: {
    fontSize: 14, // Set the font size
    color: "#555", // Set the text color
    marginBottom: 8, // Add margin to the bottom
  },
  // Style for the add event button text
  addEventButtonText: {
    color: "#fff", // Set the text color to white
    fontWeight: "bold", // Make the text bold
  },
  // Style for the section title text
  sectionTitle: {
    fontSize: 20, // Set the font size
    fontWeight: "700", // Make the text bold
    marginBottom: 10, // Add margin to the bottom
    textAlign: "center", // Center the text
  },
  // Style for the event card component
  eventCard: {
    backgroundColor: "#fff", // Set the background color to white
    borderRadius: 8, // Round the corners
    marginBottom: 16, // Add margin to the bottom
    borderWidth: 1, // Set the border width
    borderColor: "#ccc", // Set the border color
    padding: 16, // Add padding inside the container
  },
  // Style for the event name text
  eventName: {
    fontSize: 16, // Set the font size
    fontWeight: "bold", // Make the text bold
    marginBottom: 8, // Add margin to the bottom
  },
  // Style for the event details text
  eventDetails: {
    fontSize: 14, // Set the font size
    color: "#555", // Set the text color
    marginBottom: 4, // Add margin to the bottom
  },
  // Style for the button row container
  buttonRow: {
    flexDirection: "row", // Arrange children in a row
    justifyContent: "flex-end", // Align children to the end
    marginTop: 10, // Add margin to the top
  },
  // Style for the edit button
  editButton: {
    backgroundColor: "#007AFF", // Set the background color to blue
    borderRadius: 4, // Round the corners
    paddingHorizontal: 12, // Add horizontal padding
    paddingVertical: 8, // Add vertical padding
  },
  // Style for the edit button text
  editButtonText: {
    color: "#fff", // Set the text color to white
    fontWeight: "600", // Make the text bold
  },
  // Style for the modal overlay
  modalOverlay: {
    flex: 1, // Take up the full height of the parent
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Set a semi-transparent black background
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  // Style for the modal content container
  modalContent: {
    width: "80%", // Set the width to 80% of the parent
    backgroundColor: "#fff", // Set the background color to white
    padding: 20, // Add padding inside the container
    borderRadius: 10, // Round the corners
  },
  title: {
    fontSize: 20, // Font size for the title text
    fontWeight: "bold", // Bold font weight for the title text
    marginBottom: 10, // Bottom margin of 10 units for spacing
  },
  input: {
    borderColor: "#ccc", // Border color for the input field
    borderWidth: 1, // Border width of 1 unit
    padding: 8, // Padding of 8 units inside the input field
    marginBottom: 10, // Bottom margin of 10 units for spacing
  },
  attributeText: {
    fontSize: 18, // Font size for attribute text
    marginVertical: "3%", // Vertical margin of 3% for spacing
  },
  textInput: {
    fontSize: 15, // Font size for the text input
    padding: 10, // Padding of 10 units inside the text input
    borderWidth: 1, // Border width of 1 unit
    borderColor: "#D6D6D6", // Border color for the text input
    borderRadius: 3, // Border radius of 3 units for rounded corners
  },
  dateLayout: {
    flexDirection: "row", // Arrange children in a row
    alignItems: "center", // Center align items vertically
  },
  dateInput: {
    fontSize: 15, // Font size for the date input
    padding: 10, // Padding of 10 units inside the date input
    flex: 1, // Flex value to allow the input to grow
    borderColor: "#D6D6D6", // Border color for the date input
    borderWidth: 1, // Border width of 1 unit
    borderRadius: 3, // Border radius of 3 units for rounded corners
    marginRight: "2%", // Right margin of 2% for spacing
  },
  timeInput: {
    fontSize: 15, // Font size for the time input
    paddingVertical: 10, // Vertical padding of 10 units
    paddingHorizontal: 20, // Horizontal padding of 20 units
    justifyContent: "center", // Center align content horizontally
    borderColor: "#D6D6D6", // Border color for the time input
    borderWidth: 1, // Border width of 1 unit
    borderRadius: 3, // Border radius of 3 units for rounded corners
    marginRight: "2%", // Right margin of 2% for spacing
  },
  calendarButton: {
    borderRadius: 3, // Border radius of 3 units for rounded corners
    backgroundColor: "#AD3835", // Background color for the calendar button
    padding: 5, // Padding of 5 units inside the button
    height: "auto", // Automatic height adjustment
    shadowColor: "#000000", // Shadow color for the button
    shadowOffset: { width: 0, height: 0.5 }, // Shadow offset for the button
    shadowOpacity: 0.4, // Shadow opacity for the button
    shadowRadius: 1, // Shadow radius for the button
  },
  button: {
    borderWidth: 1, // Border width of 1 unit for the button
  },
  footerContainer: {
    justifyContent: "center", // Center align content horizontally
    alignItems: "center", // Center align items vertically
    height: "20%", // Height of 20% for the footer container
    marginBottom: 200, // Bottom margin of 200 units for spacing
  },
  addEventButton: {
    backgroundColor: "#AD3835", // Background color for the add event button
    borderRadius: 3, // Border radius of 3 units for rounded corners
    height: 40, // Height of 40 units for the button
    alignItems: "center", // Center align items horizontally
    justifyContent: "center", // Center align content vertically
    width: "100%", // Full width for the button
  },
  // addEventButtonText: {
  //     fontWeight: 'bold', // Bold font weight for the button text
  //     fontSize: 15, // Font size of 15 units for the button text
  //     color: 'white', // White color for the button text
  // },
  loading: {
    position: "absolute", // Absolute positioning for the loading indicator
    top: 0, // Top position of 0 units
    right: 0, // Right position of 0 units
    bottom: 0, // Bottom position of 0 units
    left: 0, // Left position of 0 units
    alignItems: "center", // Center align items horizontally
    justifyContent: "center", // Center align content vertically
    backgroundColor: "#F5FCFF88", // Background color with opacity for the loading indicator
    flex: 1, // Flex value of 1 for the loading indicator
  },
  datePickerContainer: {
    flex: 1, // Flex value of 1 for the date picker container
    justifyContent: "center", // Center align content vertically
    backgroundColor: "white", // White background color for the date picker container
  },
  container: {
    paddingHorizontal: "5%", // Horizontal padding of 5% for the container
    backgroundColor: "white", // White background color for the container
  },
});

// Array of building objects with labels and values
const buildings = [
  {
    label: "Science & Engineering Library", // Label for the building
    value: "8620cbb2-7da9-48fd-a0fe-883ddf9e1b72", // Value for the building
  },
  { label: "Campus Center", value: "7364af36-b61c-43cd-820d-a3d905dbfd8c" },
  {
    label: "UMass Campus Recreation",
    value: "d7eff2b2-63ca-4236-adb9-0a88bf7b96ea",
  },
  {
    label: "Manning Computer Science Building",
    value: "c9e08449-318d-4540-b392-7c0cfc3d6ef7",
  },
  {
    label: "Berkshire Dining Commons",
    value: "e1c7eab5-d176-4f1d-ae51-3a7716e27c8b",
  },
  {
    label: "Hampshire Dining Commons",
    value: "bd5da697-3862-439f-9ee1-0d97fdd84ec3",
  },
  { label: "Isenberg", value: "63a5d025-896b-4168-a2e5-6800c3879f80" },
  {
    label: "Franklin Dining Commons",
    value: "316b4fff-79a9-4668-8ca5-2e0c1edf169a",
  },
  { label: "Mullins Center", value: "070c9890-49e0-46f6-a92b-6a7fc0c3f33e" },
  { label: "Worcester Commons", value: "ed2d1571-99f6-4d26-8ac0-63f647aacda4" },
];
