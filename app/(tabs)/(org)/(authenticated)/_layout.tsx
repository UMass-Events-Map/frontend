import { Stack } from "expo-router";
import { Colors } from "../../constants/styles";

export default function AuthenticatedLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: "white",
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="welcome" options={{ title: "Welcome" }} />
      <Stack.Screen
        name="addEvent"
        options={{
          headerShown: true,
          headerTitle: "Event Form",
          headerTintColor: "#AD3835",
        }}
      />
      <Stack.Screen name="editEvent" options={{ headerShown: false }} />
    </Stack>
  );
}
