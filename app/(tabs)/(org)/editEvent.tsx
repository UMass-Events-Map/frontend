import EventForm from "@/components/EventForm";
import { useState } from "react";
import { SafeAreaView, TouchableHighlight, View, StyleSheet, Text } from "react-native";

export default function addEventForm() {
    return (
        <SafeAreaView style={{flex: 1}}>
                <EventForm/>
                <View style={styles.footerContainer}>
                    <TouchableHighlight style={styles.buttonContainer} onPress={() => console.log('works')} underlayColor={"#7E2622"}>
                        <Text style={styles.editEventButtonText}>DELETE EVENT</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.buttonContainer} onPress={() => console.log('works')} underlayColor={"#7E2622"}>
                        <Text style={styles.editEventButtonText}>SAVE CHANGES</Text>
                    </TouchableHighlight>
                </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'absolute',
        bottom: '3%',
        flexDirection: 'row'
    },
    buttonContainer: {
        backgroundColor: '#AD3835',
        borderRadius: 3,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        marginHorizontal: '2%'
    },
    editEventButtonText: {
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
    },
});