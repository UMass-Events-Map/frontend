import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Event } from "@/constants/Interfaces";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";

interface ImageBannerProps {
    thumbnail: string
}
 
function Buttons() {
    return (
        <View style={styles.absoluteContainer}>
            <View style={styles.sideContainer}>

            <TouchableOpacity style={styles.leftCircleButton}>
                <Ionicons name={"arrow-back-outline"} size={25} style={styles.icon} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.rightCircleButton}>
                <Ionicons name={"close-outline"} size={25} style={styles.closeIcon} />
            </TouchableOpacity>

            </View>

            <TouchableOpacity style={styles.bottomCircleButton}>
                <Ionicons name={"star-outline"} size={25} style={styles.starIcon} />
            </TouchableOpacity>
        </View>
    )
}

function ImageBanner(props: ImageBannerProps) {
    return (
        <View>
            <Image style={styles.bannerImage} source={{ uri: props.thumbnail }} />
        </View>
    )
}

function Details(event: Event) {
    return (
        <View style={styles.detailsContainer}>
            <View style={styles.icon}>
                <Text style={styles.eventName}>{event.name}</Text>
            </View>

            <View style={styles.sideContainer}>
                <Text style={styles.detailText}>Attendance: {event.attendance}</Text>
                <Text style={styles.detailText}>Free</Text>
            </View>

            {/* <View style={styles.sideContainer}>
                <Text style={styles.eventDetailsTitle}>{event?.building?.name}</Text>
                <Text style={styles.directionsTitle}>Directions</Text>
            </View> */}

            <View style={styles.calendarContainer}>
                <Ionicons name={"location"} size={25} style={styles.icon} color={'#AD3835'} />
                <View style={styles.addressContainer}>
                    <Text style={styles.addressText}>Room Number: {event.room_number}</Text>
                </View>
            </View>

            <View style={styles.calendarContainer}>
                {/*<Ionicons name={"calendar-outline"} size={16} style={styles.leftItem}/>*/}
                <Ionicons name={"calendar"} size={25} style={styles.icon}  color={'#AD3835'} />
                <View style={styles.timeContainer}>
                    <Text style={styles.addressText}>{formatter.format(new Date(event.date))}</Text>
                    <Text style={styles.addressText}>Starts: {event.time}</Text>
                    <Text style={styles.addressText}>Length: </Text>
                </View>
            </View>

            <View style={styles.detailsParagraphContainer}>
                <Text style={styles.eventDetailsTitle}>Event Details</Text>
                <Text style={styles.detailText}>{event.description}</Text>
            </View>
        </View>
    )
}

function ContactInfo(event: Event) {
    return (
        <View style={styles.contactContainer}>
            <Text style={styles.eventDetailsTitle}>ORGANIZATION NAME</Text>
            <Text style={styles.eventDetailsTitle}>ORGANIZATION EMAIL</Text>
        </View>
    )
}

export default function EventDetails(event: Event) {
  return (
    <View style={styles.pageContainer}>
        <ScrollView style={styles.pageContainer}
            scrollEnabled={false}
            >
                <ImageBanner thumbnail={event.thumbnail}/>
                <Details {...event}/>
                <ContactInfo {...event}/>
        </ScrollView>

        <Buttons/>
    </View>
  );
}

const styles = StyleSheet.create({
    icon: {
        display: "flex",
        width: "auto",        
        height: "auto",   
        alignItems: "center",  
        justifyContent: "center", 
    },
    starIcon: {
        display: "flex",
        width: "auto",        
        height: "auto",   
        alignItems: "center",  
        justifyContent: "center", 
        color: "#FDDA0D"
    },
    closeIcon: {
        display: "flex",
        width: "auto",        
        height: "auto",   
        alignItems: "center",  
        justifyContent: "center", 
        color: "red"
    },
    absoluteContainer: {
       position: "absolute",
       marginLeft: "2%",
       marginRight: "2%"
    },
    detailsParagraphContainer: {
        paddingTop: "7%",
    },
    detailsContainer: {
        marginLeft: "6%",
        marginRight: "6%",
        marginTop: "3%",
    },
    pageContainer: {
        flexDirection: 'column',
        display: "flex",
        backgroundColor: "#2C2C2C",
        height: "100%"
    },
    contactContainer: {   
        backgroundColor: "#2C2C2C",
        alignItems: "center",
        marginTop: "10%",
        marginBottom: "5%"
    },
    timeContainer: {
        color: "white",
        marginLeft: "8%",
        marginTop: "0.7%",
        gap: 10
    },
    calendarContainer: {
        flexDirection: 'row',
        justifyContent: "flex-start",
        marginTop: "4%"
    },
    eventName: {
        color: "white",
        fontSize: 20,
        marginBottom: "1%",
        fontWeight: 'bold'
    },
    bannerImage: {
        width: "100%",
        height: 200,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    sideContainer: {
        flexDirection: 'row',
        justifyContent: "space-between",
        color: "white",
        marginTop: "3%",
    },
    addressText: {
        color: "white",
    },
    detailText: {
        color: "white",
        paddingTop: "2%"
    },
    eventDetailsTitle: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold'
    },
    directionsTitle: {
        color: "#48FF37",
        fontSize: 15
    },
    addressContainer: {
        marginLeft: "8%",
        marginTop: "1.5%"
    },
    farRight: {
        marginLeft: "60%"
    },
    leftCircleButton: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:35,
        height:35,
        backgroundColor:'#fff',
        borderRadius:100,
    },
    rightCircleButton: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:35,
        height:35,
        backgroundColor:'#fff',
        borderRadius:100,
        marginLeft: "80%"
    },
    bottomCircleButton: {
        borderWidth:1,
        borderColor:'rgba(0,0,0,0.2)',
        alignItems:'center',
        justifyContent:'center',
        width:35,
        height:35,
        backgroundColor:'#fff',
        borderRadius:100,
        marginTop: "3%"
    },
});

const options: Intl.DateTimeFormatOptions = {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric",
};
const formatter = new Intl.DateTimeFormat("en-US", options);
