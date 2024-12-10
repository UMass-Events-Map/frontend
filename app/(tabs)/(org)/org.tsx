import OrgProfile from "@/components/OrgProfile";
import { Text, View, SafeAreaView, Button } from "react-native";
import EventList from "@/components/EventList";
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from "react";
import { router } from "expo-router";

export default function Org() {
  const [events, setEvents] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button 
        title="Add Event"
        onPress={() => router.push('/addEvent')}/>
      <Button 
        title="Edit Event"
        onPress={() => router.push('/editEvent')}/>
    </SafeAreaView>
  );
}
