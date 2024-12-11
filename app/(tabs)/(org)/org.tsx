import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator, Alert, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput, Button, SafeAreaView, TouchableHighlight } from 'react-native';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'expo-router';
import { Session } from '@supabase/supabase-js';
import { Building, Event } from '@/constants/Interfaces';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from "dayjs";
import { Ionicons } from '@expo/vector-icons';
import DropDownPicker from 'react-native-dropdown-picker';


interface Organization {
  id: string;
  name: string;
  image_url?: string;
  description?: string;
  email?: string;
  address?: string;
  verified?: boolean;
}


interface MainOrgPageProps {
  userId: string;
}


export default function MainOrgPage({ userId }: MainOrgPageProps) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loadingOrg, setLoadingOrg] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();


  // State for calendar modal 


  // State for Add Event Modal
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [loadingAdd, setLoadingAdd] = useState(false);
  const [addName, setAddName] = useState('');
  const [addDescription, setAddDescription] = useState('');
  const [dateTime, setDateTime] = useState(dayjs());
  const [addBuildingId, setAddBuildingId] = useState('');
  const [addRoomNumber, setAddRoomNumber] = useState('');
  const [addThumbnail, setAddThumbnail] = useState('');
  const [addAttendance, setAddAttendance] = useState('');
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loadingBuildings, setLoadingBuildings] = useState(false);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const [addCalendarModal, setAddCalendarModal] = useState(false);


  // State for Edit Event Modal
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [loadingEdit, setLoadingEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editName, setEditName] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editDateTime, setEditDateTime] = useState(dayjs());
  const [editBuildingId, setEditBuildingId] = useState('');
  const [editRoomNumber, setEditRoomNumber] = useState('');
  const [editThumbnail, setEditThumbnail] = useState('');
  const [editAttendance, setEditAttendance] = useState('');
  const [editDropdownOpen, setEditDropdownOpen] = useState(false);
  const [editCalendarModal, setEditCalendarModal] = useState(false);

  useEffect(() => {
    const fetchOrganizations = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session || error) {
        router.push('/login');
        return null;
      } else {
        const uid = data.session.user.id;
        try {
          const response = await fetch(`https://umaps.phoenixfi.app/organizations/profile/${uid}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
 
          if (response.ok) {
            const data = await response.json();
            return data;
          } else {
            console.error("Error fetching organizations");
            return null;
          }
 
        } catch (err: any) {
          console.error('Failed to fetch organizations:', err.message);
          Alert.alert('Error', 'Failed to fetch organizations');
          return null;
        } finally {
          setLoadingOrg(false);
        }
      }
    };
 
    const loadOrgs = async () => {
      const orgData = await fetchOrganizations();
      if (orgData && orgData.length > 0) {
        setOrganization(orgData[0]);
      } else {
        setOrganization(null);
      }
    };
 
    loadOrgs();
  }, [userId, router]);


  useEffect(() => {
    const fetchEvents = async (organizationId: string) => {
      const { data, error } = await supabase.auth.getSession();
      if (!data?.session || error) {
        router.push('/login');
        return null;
      } else {
        try {
          setLoadingEvents(true);
          const response = await fetch(`https://umaps.phoenixfi.app/events/organization/${organizationId}/events`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });
         
          if (response.ok) {
            const data = await response.json();
            return data.data;
          } else {
            console.error("Error fetching events");
            return null;
          }
        } catch (err: any) {
          console.error('Failed to fetch events:', err.message);
          Alert.alert('Error', 'Failed to fetch events');
          return null;
        } finally {
          setLoadingEvents(false);
        }
      }
    };
   
    const loadEvents = async () => {
      if (!organization) {
        setEvents([]);
        setLoadingEvents(false);
        return;
      }
 
      const eventsData = await fetchEvents(organization.id);
      if (eventsData && eventsData.length > 0) {
        setEvents(eventsData);
      } else {
        setEvents([]);
      }
    };
 
    if (organization) {
      loadEvents();
    }
  }, [organization, router]);


  // Fetch buildings whenever we open add or edit modal
  const fetchBuildings = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (!sessionData?.session || sessionError) {
      router.push('/login');
      return null;
    }
    try {
      setLoadingBuildings(true);
      const response = await fetch(`https://umaps.phoenixfi.app/buildings`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
     
      if (response.ok) {
        const data = await response.json();
        setBuildings(data.data || []);
      } else {
        console.error("Error fetching buildings");
      }
    } catch (err: any) {
      console.error('Failed to fetch buildings:', err.message);
      Alert.alert('Error', 'Failed to fetch buildings');
    } finally {
      setLoadingBuildings(false);
    }
  };


  // Handle opening the Add modal
  const handleOpenAddModal = () => {
    // Reset fields
    setAddName('');
    setAddDescription('');
    // setAddDate('');
    // setAddTime('');
    setDateTime(dayjs());
    setAddBuildingId('');
    setAddRoomNumber('');
    setAddThumbnail('');
    setAddAttendance('');
    setAddModalVisible(true);
    fetchBuildings();
  };


  // Handle adding event
  const handleAddEvent = async () => {
    if (!organization) return;
    setLoadingAdd(true);
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData?.session) throw new Error('No active session found');


      const response = await fetch(`https://umaps.phoenixfi.app/events/organization/${organization.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          
          'Authorization': `Bearer ${sessionData.session.access_token}`
        },
        body: JSON.stringify({
          name: addName,
          description: addDescription || null,
          date: dateTime.format("YYYY-MM-DD"),
          time: dateTime.format("hh:mm"),
          building_id: addBuildingId,
          room_number: addRoomNumber || null,
          thumbnail: addThumbnail || null,
          attendance: 0
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create event');
      }
      
      // On success, parse the returned data
      const data = await response.json();
      console.log(data);

      Alert.alert("Success", "Event created successfully");
      setAddModalVisible(false);
      await refreshEvents();
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to create event");
    } finally {
      setLoadingAdd(false);
    }
  };


  // Handle opening the Edit modal
  const handleOpenEditModal = (event: Event) => {
    setSelectedEvent(event);
    setEditName(event.name);
    setEditDescription(event.description || '');
    setEditDate(event.date || '');
    setEditTime(event.time || '');
    setEditRoomNumber(event.room_number || '');
    setEditThumbnail(event.thumbnail || '');
    setEditAttendance(event.attendance ? event.attendance.toString() : '');
    setEditBuildingId(event.building_id || '');
    setEditModalVisible(true);
    fetchBuildings();
  };
  

 
const handleUpdateEvent = async () => {
  if (!selectedEvent) return;
  setLoadingEdit(true);
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session) throw new Error('No active session found');
    
    const response = await fetch(`https://umaps.phoenixfi.app/events/${selectedEvent.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${sessionData.session.access_token}`,
      },
      
      body: JSON.stringify({
        name: editName || selectedEvent.name,
        room_number: editRoomNumber || selectedEvent.room_number,
        description: editDescription || selectedEvent.description,
        time: editDateTime.format("HH:mm") || selectedEvent.time,
        date: editDateTime.format("YYYY-MM-DD") || selectedEvent.date,
      })
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error(`HTTP error! status: ${response.status}`, errorBody);
      throw new Error(`Request failed with status ${response.status}`);
    }

    Alert.alert("Success", "Event updated successfully");
    setEditModalVisible(false);
    await refreshEvents();
  } catch (error: any) {
    console.error('Update event error:', error);
    Alert.alert("Error", error.message || "Failed to update event");
  } finally {
    setLoadingEdit(false);
  }
};


  const refreshEvents = async () => {
    if (!organization) return;
    const response = await fetch(`https://umaps.phoenixfi.app/events/organization/${organization.id}/events`, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      const freshData = await response.json();
      if (freshData.data) {
        setEvents(freshData.data);
      }
    }
  };


  if (loadingOrg) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }


  if (!organization) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>No organizations</Text>
        <Text style={styles.emptyDescription}>Get started by requesting to add your organization.</Text>
      </View>
    );
  }


  return (
    <SafeAreaView style={{flex: 1}}>
    <ScrollView style={styles.scrollContainer}>
      {/* Organization Header Section */}
      <View style={styles.card}>
        {organization.image_url && (
          <Image
            source={{ uri: organization.image_url }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>{organization.name}</Text>
          {organization.verified && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Verified</Text>
            </View>
          )}
        </View>


        {organization.description && (
          <Text style={styles.cardDescription}>{organization.description}</Text>
        )}


        <View style={styles.cardContent}>
          {organization.email && (
            <Text style={styles.cardDetail}>Email: {organization.email}</Text>
          )}
          {organization.address && (
            <Text style={styles.cardDetail}>Address: {organization.address}</Text>
          )}
          <Text style={styles.cardDetail}>Organization ID: {organization.id}</Text>
        </View>
      </View>
     
      {/* Add Event Button */}
      <View style={{ marginBottom: 20, alignItems: 'center' }}>
        <TouchableOpacity
          style={styles.addEventButton}
          onPress={handleOpenAddModal}
        >
          <Text style={styles.addEventButtonText}>Add Event</Text>
        </TouchableOpacity>
      </View>


      {/* Events Section */}
      <Text style={styles.sectionTitle}>Events</Text>


      {loadingEvents ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      ) : events.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No events found</Text>
          <Text style={styles.emptyDescription}>Create a new event to get started.</Text>
        </View>
      ) : (
        events.map((event) => (
          <View key={event.id} style={styles.eventCard}>
            <Text style={styles.eventName}>{event.name}</Text>
            <Text style={styles.eventDetails}>Date: {event.date}</Text>
            <Text style={styles.eventDetails}>Time: {event.time}</Text>
            {event.description && <Text style={styles.eventDetails}>{event.description}</Text>}


            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => handleOpenEditModal(event)}
              >
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
                style={styles.textInput}/>
            <Text style={styles.attributeText}>Thumbnail:</Text>
            <TextInput
                value={addThumbnail}
                onChangeText={setAddThumbnail}
                placeholder="Provide a thumbnail link"
                style={styles.textInput}/>
            <Text style={styles.attributeText}>Date & Time:</Text>
            <View style={styles.dateLayout}>
                <Text style={styles.dateInput}>{dateTime.format('ddd, MMMM DD, YYYY')}</Text>
                <Text style={styles.timeInput}>{dateTime.format('HH:mm')}</Text>
                <TouchableHighlight onPress={() => setAddCalendarModal(true)} style={styles.calendarButton} underlayColor={'#7E2622'}>
                    <Ionicons name={"calendar-outline"} size={30} color={'white'}/>
                </TouchableHighlight>
            </View>
            <Modal
                transparent={true}
                visible={addCalendarModal}
                onRequestClose={() => {
                setAddCalendarModal(!addCalendarModal);}}
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
                        color={'#AD3835'}
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
                style={{ borderColor: '#AD3835', borderWidth: 2}}
                items={buildings.map((b: Building) => {return {label: b.name, value: b.id}})}
                placeholder="Select a building"/>
            <Text style={styles.attributeText}>Room Number:</Text>
            <TextInput
                value={addRoomNumber}
                onChangeText={setAddRoomNumber}
                placeholder="Enter a room number"
                style={styles.textInput}/>
              
            <Text style={styles.attributeText}>Description:</Text>
            <TextInput 
                editable
                multiline
                numberOfLines={10}
                value={addDescription}
                onChangeText={setAddDescription}
                placeholder="Enter a description"
                style={styles.textInput}/>
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 30}}>
              <Button title="Cancel" onPress={() => setAddModalVisible(false)} />
              <Button title={loadingAdd ? 'Creating...' : 'Create Event'} onPress={handleAddEvent} disabled={loadingAdd}/>
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
                style={styles.textInput}/>
            <Text style={styles.attributeText}>Thumbnail:</Text>
            <TextInput
                value={editThumbnail}
                onChangeText={setEditThumbnail}
                placeholder="Provide a thumbnail link"
                style={styles.textInput}/>
            <Text style={styles.attributeText}>Date & Time:</Text>
            <View style={styles.dateLayout}>
                <Text style={styles.dateInput}>{editDateTime.format('ddd, MMMM DD, YYYY')}</Text>
                <Text style={styles.timeInput}>{editDateTime.format('HH:mm')}</Text>
                <TouchableHighlight onPress={() => setEditCalendarModal(true)} style={styles.calendarButton} underlayColor={'#7E2622'}>
                    <Ionicons name={"calendar-outline"} size={30} color={'white'}/>
                </TouchableHighlight>
            </View>
            <Modal
                transparent={true}
                visible={editCalendarModal}
                onRequestClose={() => {
                setEditCalendarModal(!editCalendarModal);}}
                >
                <View style={styles.datePickerContainer}>
                    <DateTimePicker
                    mode="single"
                    date={editDateTime}
                    onChange={(params) => {

                      const newDateTime = dayjs(params.date);
                     
                      setEditDateTime(newDateTime);}
                    }
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
                        color={'#AD3835'}
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
                style={{ borderColor: '#AD3835', borderWidth: 2}}
                items={buildings.map((b: Building) => {return {label: b.name, value: b.id}})}
                placeholder="Select a building"/>
            <Text style={styles.attributeText}>Room Number:</Text>
            <TextInput
                value={editRoomNumber}
                onChangeText={setEditRoomNumber}
                placeholder="Enter a room number"
                style={styles.textInput}/>
              
            <Text style={styles.attributeText}>Description:</Text>
            <TextInput 
                editable
                multiline
                numberOfLines={10}
                value={editDescription}
                onChangeText={setEditDescription}
                placeholder="Enter a description"
                style={styles.textInput}/>
            <View style={{ flexDirection: 'row', justifyContent: 'center', paddingTop: 30}}>
              <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
              <Button title={loadingEdit ? 'Updating...' : 'Update Event'} onPress={handleUpdateEvent} disabled={loadingEdit} />
            </View>

          </ScrollView>
        </SafeAreaView>

      </Modal>


    </ScrollView>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  },
  emptyContainer: {
    padding: 20, justifyContent: 'center', alignItems: 'center'
  },
  emptyTitle: {
    fontSize: 20, fontWeight: 'bold'
  },
  emptyDescription: {
    marginTop: 10, fontSize: 14, color: '#555', textAlign: 'center'
  },
  scrollContainer: {
    flex: 1, padding: 16
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1, borderColor: '#ccc'
  },
  image: {
    width: '100%',
    height: 160
  },
  cardHeader: {
    padding: 16,
    borderBottomWidth: 1, borderColor: '#eee',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  cardTitle: {
    fontSize: 18, fontWeight: 'bold'
  },
  badge: {
    backgroundColor: 'green', borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4
  },
  badgeText: {
    color: '#fff', fontSize: 12
  },
  cardDescription: {
    padding: 16,
    fontSize: 14,
    color: '#333'
  },
  cardContent: {
    padding: 16
  },
  cardDetail: {
    fontSize: 14, color: '#555', marginBottom: 8
  },
  // addEventButton: {
  //   backgroundColor: '#7E2622',
  //   paddingVertical: 12,
  //   paddingHorizontal: 32,
  //   borderRadius: 8
  // },
  addEventButtonText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'center'
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1, borderColor: '#ccc',
    padding: 16
  },
  eventName: {
    fontSize: 16, fontWeight: 'bold', marginBottom: 8
  },
  eventDetails: {
    fontSize: 14, color: '#555', marginBottom: 4
  },
  buttonRow: {
    flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10
  },
  editButton: {
    backgroundColor: '#007AFF',
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  editButtonText: {
    color: '#fff', fontWeight: '600'
  },
  // Overlay fills the entire screen, centers content, and adds a dim background
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent dim
    justifyContent: 'center',
    alignItems: 'center',
  },
  // The actual modal content is a smaller box
  modalContent: {
    width: '80%', // or a fixed width like 300
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginBottom: 10
  },
  attributeText: {
    fontSize: 18,
    marginVertical: '3%'
},
textInput: {
    fontSize: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: "#D6D6D6",
    borderRadius: 3,
},
dateLayout: {
    flexDirection: 'row',
    alignItems: 'center'
},
dateInput: {
    fontSize: 15,
    padding: 10,
    flex: 1,
    borderColor: "#D6D6D6",
    borderWidth: 1,
    borderRadius: 3,
    marginRight: '2%'
},
timeInput: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    borderColor: "#D6D6D6",
    borderWidth: 1,
    borderRadius: 3,
    marginRight: '2%'
},
calendarButton: {
    borderRadius: 3,
    backgroundColor: '#AD3835',
    padding: 5,
    height: "auto",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 0.5 },
    shadowOpacity: 0.4,
    shadowRadius: 1
},
button: {
    borderWidth: 1
},
footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    marginBottom: 200
},
addEventButton: {
    backgroundColor: '#AD3835',
    borderRadius: 3,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
},
// addEventButtonText: {
//     fontWeight: 'bold',
//     fontSize: 15,
//     color: 'white',
// },
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
datePickerContainer: {
    flex: 1, 
    justifyContent: 'center', 
    backgroundColor: 'white'
},
container: {
  paddingHorizontal: '5%',
  backgroundColor: "white",
},
});

const buildings = [
  { label: "Science & Engineering Library", value: "8620cbb2-7da9-48fd-a0fe-883ddf9e1b72" },
  { label: "Campus Center", value: "7364af36-b61c-43cd-820d-a3d905dbfd8c" },
  { label: "UMass Campus Recreation", value: "d7eff2b2-63ca-4236-adb9-0a88bf7b96ea" },
  { label: "Manning Computer Science Building", value: "c9e08449-318d-4540-b392-7c0cfc3d6ef7" },
  { label: "Berkshire Dining Commons", value: "e1c7eab5-d176-4f1d-ae51-3a7716e27c8b" },
  { label: "Hampshire Dining Commons", value: "bd5da697-3862-439f-9ee1-0d97fdd84ec3" },
  { label: "Isenberg", value: "63a5d025-896b-4168-a2e5-6800c3879f80" },
  { label: "Franklin Dining Commons", value: "316b4fff-79a9-4668-8ca5-2e0c1edf169a" },
  { label: "Mullins Center", value: "070c9890-49e0-46f6-a92b-6a7fc0c3f33e" },
  { label: "Worcester Commons", value: "ed2d1571-99f6-4d26-8ac0-63f647aacda4" },
];
