import { Stack } from 'expo-router';

export default function OrgLayout() {
    return (
        <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }}/>
            <Stack.Screen name="org" options={{ headerShown: false }}/>
        </Stack>
    );
}