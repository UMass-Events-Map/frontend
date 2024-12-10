import { Stack } from 'expo-router';

export default function ListLayout() {
    return (
        <Stack
        screenOptions={{
            contentStyle: { backgroundColor: "white"}
        }}>
            <Stack.Screen name="list" options={{ headerShown: false }}/>
        </Stack>
    );
}