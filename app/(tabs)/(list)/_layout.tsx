import { Stack } from 'expo-router';

export default function ListLayout() {
    return (
        <Stack>
            <Stack.Screen name="list" options={{ headerShown: false }}/>
            <Stack.Screen name="blank"/>
        </Stack>
    );
}