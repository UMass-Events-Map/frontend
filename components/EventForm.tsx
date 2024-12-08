import { Building, CreateEvent, Event } from "@/constants/Interfaces";
import React, { useState } from "react";
import { Text, View, SafeAreaView, TextInput, Button, Modal, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import { Ionicons } from "@expo/vector-icons";

export default function EventForm() {
    // Store new event details
    const [eventName, setEventName] = useState<string>("");
    const [thumbnail, setThumbnail] = useState<string>("");
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState<string>("");
    const [building, setBuilding] = useState<string>("");
    const [room, setRoom] = useState<string>("");
    const [description, setDescription] = useState<string>("");

    // Store all buildings
    const [buildings, setBuildings] = useState<Building[]>();

    // Manage modal
    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState<boolean>(true);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleEventCreation = async () => {
        const response = await fetch(`https://umaps.phoenixfi.app/events/organization/${"6a0583c1-dc38-44e0-8a7a-9742ea90b61e"}`, {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            body:JSON.stringify({
                name: eventName,
                description: description,
                date: date.format("YYYY-MM-DD"),
                time: time,
                building_id: building,
                room_number: room,
                organization_id: "6a0583c1-dc38-44e0-8a7a-9742ea90b61e",
                thumbnail: thumbnail,
                attendance: 150
            })
            },
        });


        if (response.status === 200) {
            console.log("SUCCESS");
        }
        else {
            const data = await response.json();
            console.log(data.error);
        }
    }

    const addEventButton = async () => {
        setLoading(true);
        await handleEventCreation();
        setLoading(false);
    }
    
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                <Text style={styles.attributeText}>Name:</Text>
                <TextInput
                    value={eventName}
                    onChangeText={setEventName}
                    placeholder="Enter event name"
                    style={styles.textInput}/>
                <Text style={styles.attributeText}>Thumbnail:</Text>
                <TextInput
                    value={thumbnail}
                    onChangeText={setThumbnail}
                    placeholder="Provide a thumbnail link"
                    style={styles.textInput}/>
                <Text style={styles.attributeText}>Date:</Text>
                <View style={styles.dateLayout}>
                    <Text style={styles.dateInput}>{formatter.format(date)}</Text>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.calendarButton}>
                        <Ionicons name={"calendar-outline"} size={30} color={'white'}/>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);}}
                    >
                    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white'}}>
                        <DateTimePicker
                        mode="single"
                        date={date}
                        onChange={(params) => setDate(params.date)}
                        selectedItemColor="#AD3835"
                        
                        />
                        <Button 
                            title="Close"
                            onPress={() => setModalVisible(!modalVisible)}
                        />
                    </View>
                </Modal>


                <Text style={styles.attributeText}>Time:</Text>
                <TextInput
                    value={time}
                    onChangeText={setTime}
                    placeholder="Enter start time"
                    style={styles.textInput}/>
                <Text style={styles.attributeText}>Building:</Text>
                <DropDownPicker
                    open={isDropdownOpen}
                    setOpen={setIsDropdownOpen}
                    value={building}
                    setValue={setBuilding}
                    style={{ borderColor: '#AD3835', borderWidth: 2}}
                    items={[
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
                    ]}
                    placeholder="Select a building"/>
                <Text style={styles.attributeText}>Room Number:</Text>
                <TextInput
                    value={room}
                    onChangeText={setRoom}
                    placeholder="Enter a room number"
                    style={styles.textInput}/>
                    
                <Text style={styles.attributeText}>Description:</Text>
                <TextInput 
                    editable
                    multiline
                    numberOfLines={10}
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter a description"
                    style={styles.textInput}/>
                <View style={styles.footerContainer}>
                    <TouchableOpacity style={styles.addEventButton}>
                        <Text style={styles.addEventButtonText}>ADD EVENT</Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
            {loading && (
                <View>
                    <ActivityIndicator color="#7E2622" size="large" animating={loading} />
                </View>
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: '5%',
        backgroundColor: "white",
        height: '100%'
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
        marginRight: '1%'
    },
    calendarButton: {
        borderRadius: 3,
        backgroundColor: '#AD3835',
        padding: 5,
        height: "auto",

    },
    button: {
        borderWidth: 1
    },
    footerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '20%'
    },
    addEventButton: {
        backgroundColor: '#AD3835',
        borderRadius: 3,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',

    },
    addEventButtonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
    loading: {
        position: "absolute",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F5FCFF88",
      },
});

const options: Intl.DateTimeFormatOptions = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formatter = new Intl.DateTimeFormat("en-US", options);
