import { Stack } from "expo-router";
import { useContext } from "react";
import AuthContextProvider, { AuthContext } from "../(list)/store/auth-context";

export default function RootLayout() {
  // Wrap everything in AuthContextProvider to have access to auth state
  return (
    <AuthContextProvider>
      <RootNavigator />
    </AuthContextProvider>
  );
}

function RootNavigator() {
  const authCtx = useContext(AuthContext);

  // If user is authenticated, show authenticated stack
  // else show auth stack
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {authCtx.isAuthenticated ? (
        <Stack.Screen name="(authenticated)" />
      ) : (
        <Stack.Screen name="(org)" />
      )}
    </Stack>
  );
}

/*
Fix this 
/Users/samuelsanchez/Downloads/CS320/frontend/app/(tabs)/(org)/_layout.js
issue with routingå
app/(tabs)/(list)/store/auth-context.js
*/