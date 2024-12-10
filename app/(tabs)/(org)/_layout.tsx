import { Stack } from 'expo-router';

export default function OrgLayout() {
    return (
        <Stack
        screenOptions={{
            contentStyle: { backgroundColor: "white"}
          }}>
            <Stack.Screen name="login" options={{ headerShown: false }}/>
            <Stack.Screen name="org" options={{ headerShown: false, headerTitle: "Main Page" }}/>
            <Stack.Screen name="addEvent" options={{ headerShown: true, headerTitle: "Event Form", headerTintColor: '#AD3835'}}/>
            <Stack.Screen name="editEvent" options={{ headerShown: true, headerTitle: "Edit Event Form", headerTintColor: '#AD3835' }}/>
        </Stack>
    );
}
