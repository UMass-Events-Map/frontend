import ActionSheet, { SheetProps, useScrollHandlers } from 'react-native-actions-sheet';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabase';

export default function EventDetailSheet(props: SheetProps<"eventdetail-sheet">) {

    return(
        <ActionSheet
            gestureEnabled
            initialSnapIndex={0}
            snapPoints={[100]}

        >

            <Text style={styles.heading}>
                insert vinayak event detail page 
            </Text>
            <Text style={styles.heading}>
                insert vinayak event detail page 
            </Text>
            <Text style={styles.heading}>
                insert vinayak event detail page 
            </Text>
            <Text style={styles.heading}>
                insert vinayak event detail page 
            </Text>
            <Text style={styles.heading}>
                insert vinayak event detail page 
            </Text>
            <Text style={styles.heading}>
                insert vinayak event detail page 
            </Text>
            <Text style={styles.heading}>
                insert vinayak event detail page 
            </Text>
            <Text style={styles.heading}>
                insert vinayak event detail page 
            </Text>

            
        
        </ActionSheet>
    
    )
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
    },
  });