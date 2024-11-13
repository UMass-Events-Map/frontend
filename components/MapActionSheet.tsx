import ActionSheet, { SheetProps, useScrollHandlers } from 'react-native-actions-sheet';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabase';
import EventList from "@/components/EventList";
import BuildingPage from "@/components/BuildingPage";
import { Building } from '@/constants/Interfaces';


export default function MapActionSheet(props: SheetProps<'mapaction-sheet'>) {
    
    if(!props.payload?.value) {
      return(<Text> Cannot Find Building </Text>)
    } else {
      return (
        <ActionSheet
            indicatorStyle={{ backgroundColor: 'lightgray' }}
            headerAlwaysVisible={true}
            gestureEnabled
            enableGesturesInScrollView
            initialSnapIndex={1} 
            snapPoints={[55, 100]} 
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
  