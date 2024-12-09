import { Stack } from 'expo-router';

export default function OrgLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }}/>
            {/* <Stack.Screen name="org" options={{ headerShown: false }}/>
            <Stack.Screen name="addEvent" options={{ headerShown: false }}/>
            <Stack.Screen name="editEvent" options={{ headerShown: false }}/> */}
            
            {/* Add the organizationSignUp route */}
            <Stack.Screen name="OrganizationCreationModal" options={{ headerShown: false }} />
        </Stack>
    );
}
