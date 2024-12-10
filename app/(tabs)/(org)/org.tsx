import OrgProfile from "@/components/OrgProfile";
import { Text, View, SafeAreaView, Button, Modal } from "react-native";
import EventList from "@/components/EventList";
import { supabase } from '@/utils/supabase';
import { useState, useEffect } from "react";
import { router } from "expo-router";
import { Session } from "@supabase/supabase-js";
import { CreateOrganizationDto, Organization, UserInfo } from "@/constants/Interfaces";
import { TextInput } from "react-native-gesture-handler";


export default function Org() {
  const [events, setEvents] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const [org, setOrg] = useState<Organization>();

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");


  const fetchProfileInfo= async (email: string) => {
    const response = await fetch(`https://umaps.phoenixfi.app/profiles/search?query=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      return data;
    }
    else {
      console.log('error')
    }
  }

  const fetchOrg = async (id : string): Promise<Organization[]> => {
    const test = "d6a45ed0-b00d-4dec-9f38-08f3e3d520d1"
    const response = await fetch(`https://umaps.phoenixfi.app/organizations/profile/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch organizations');
    }
    const data = await response.json();
    return data;
  }

  const createOrganization = async () => {
    const response = await fetch(`https://umaps.phoenixfi.app/organizations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.access_token}`
        },
        body: JSON.stringify({
          organization_name: newName,
          email: newEmail,
          description: "",
          image_url: "https://upload.wikimedia.org/wikipedia/commons/6/6f/ChessSet.jpg",
          address: ""
        })
    });

    if (!response.ok) {
        const error = await response.json();
        console.log(error);
        throw new Error(error.error || 'Failed to create organization');
    }
    const data = await response.json();
    console.log(data);
    return data;
}

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      console.log(session);
      return session;
    })
    .then((session) => {
      const id = session?.user.id;
      return fetchOrg(id!)
    }).then((data) => {
      console.log(data);
      setOrg(data[0]);
    });


  }, []);


  const OrgText = () => {
    if (org) {
      return (<Text>{org.name}</Text>)
    }
    else {
      return (<Text>You have no organization</Text>)
    }
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text>{userInfo?.first_name}</Text>
      <Text>Welcome</Text>
      <Text>Your Organization:</Text>
      {OrgText()}
      <Button
        title="Create new organization" 
        onPress={() => setModalVisible(true)}/>
      <Button 
        title="Add Event"
        onPress={() => router.push('/addEvent')}/>
      <Button 
        title="Edit Event"
        onPress={() => router.push('/editEvent')}/>
      <Modal
        transparent={false}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);}}>
        <SafeAreaView>
          <TextInput 
            placeholder="Enter name"
            value={newName}
            onChangeText={setNewName}/>
          <TextInput 
            placeholder="Enter email"
            value={newEmail}
            onChangeText={setNewEmail}/>
          <TextInput 
            placeholder="Enter description"/>
          <TextInput 
            placeholder="Provide link to image"/>
          <TextInput 
            placeholder="Enter address"/>
          <Button 
            title="Cancel"
            onPress={() => setModalVisible(false)}/>
          <Button 
            title="Submit"
            onPress={createOrganization}
            />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}


