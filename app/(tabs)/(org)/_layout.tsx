import { Stack } from 'expo-router';

export default function OrgLayout() {
    return (
        <Stack>
            <Stack.Screen name="org" options={{ headerShown: false }}/>
        </Stack>
    );
}