import ActionSheet, { SheetProps, useScrollHandlers } from 'react-native-actions-sheet';
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useState, useEffect } from "react";
import { supabase } from '@/utils/supabase';
import EventList from "@/components/EventList";
import {NativeViewGestureHandler} from 'react-native-gesture-handler';

export default function EventDetailSheet(props: SheetProps<"eventdetail-sheet">) {



    return(
        <ActionSheet
        initialSnapIndex={0}
        snapPoints={[100]}


        >

            
            <Text>
                dahjskfhasjfkahsjkfa
            </Text>

        </ActionSheet>
    
    )
}
