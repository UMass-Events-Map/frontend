import { Stack } from "expo-router"; //Here we import the stack component used in the newest version of expo

export default function ListLayout() {
  return (
    //Then we render a stack component to manage the navigation stack
    <Stack
      //here we set the screen options for the stack component and we set the background color of the content to white
      screenOptions={{
        contentStyle: { backgroundColor: "white" },
      }}
    >
      {/*here we define a screen within the stack */}
      <Stack.Screen
        name="list"
        options={{ headerShown: false }} // Here we are Hiding the header for this screen
      />
    </Stack>
  );
}
