import EventForm from "@/components/EventForm";
import { useState } from "react";
import { SafeAreaView, TouchableHighlight, View, StyleSheet, Text } from "react-native";

export default function addEventForm() {
    // Manage loading screen
    const [loading, setLoading] = useState<boolean>(false);

    // const addEventButton = async () => {
    //     setLoading(true);
    //     const newEvent = {
    //         name: eventName,
    //         description: description,
    //         date: dateTime.format("YYYY-MM-DD"),
    //         building_id: building,
    //         room_number: room,
    //         organization_id: "123e4567-e89b-12d3-a456-426614174000",
    //         thumbnail: thumbnail,
    //         attendance: 150
    //     };
    //     console.log(newEvent);
    //     // await handleEventCreation();
    //     setLoading(false);
    // }
    
    return (
        <SafeAreaView style={{flex: 1}}>
                <EventForm/>
                <View style={styles.footerContainer}>
                    <TouchableHighlight style={styles.buttonContainer} onPress={() => console.log('works')} underlayColor={"#7E2622"}>
                        <Text style={styles.addEventButtonText}>ADD EVENT</Text>
                    </TouchableHighlight>
                </View>
        </SafeAreaView>
        // {loading && (
        //         <View style={styles.loading}>
        //             <ActivityIndicator color="#7E2622" size="large" animating={loading} />
        //         </View>
        // )}
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: '3%',
    },
    buttonContainer: {
        backgroundColor: '#AD3835',
        borderRadius: 3,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '60%',
    },
    addEventButtonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
});