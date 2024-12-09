import ActionSheet, { SheetProps, useScrollHandlers } from 'react-native-actions-sheet';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useState, useEffect } from "react";
import EventList from "@/components/EventList";
import BuildingPage from "@/components/BuildingPage";
import { Building } from '@/constants/Interfaces';


export default function MapActionSheet(props: SheetProps<'mapaction-sheet'>) {
    
    if(!props.payload?.value) {
      return(<View></View>)
    } else {
      return (
        <ActionSheet
            safeAreaInsets={{ top: 0, right: 0, bottom: 0, left: 0 }}
            indicatorStyle={{ backgroundColor: 'lightgray' }}
            headerAlwaysVisible={true}
            gestureEnabled
            enableGesturesInScrollView
            initialSnapIndex={0} 
            snapPoints={[100]} 
            >
              <BuildingPage {...props.payload?.value}></BuildingPage>
        </ActionSheet>
      )
    } 
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
      paddingTop: 70,
    },
    heading: {
      flex: 0,
      fontSize: 35,
      fontWeight: 'bold',
      color: '#7E2622',
      textAlign: "center",
      padding: 15
    },
    eventList: {
      flex: 0
    }    
  });
  