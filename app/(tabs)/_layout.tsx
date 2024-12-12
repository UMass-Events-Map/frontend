import { Tabs } from "expo-router"; // Import the Tabs component from expo-router
import React from "react"; // Import React

import { TabBarIcon } from "@/components/navigation/TabBarIcon"; // Import the TabBarIcon component

// Define and export the TabLayout component
export default function TabLayout() {
  return (
    // Render the Tabs component to create a tab navigation layout
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#7E2622", // Set the active tab icon color
        headerShown: false, // Hide the header for all screens
      }}
    >
      {/* Define the first tab screen for the map */}
      <Tabs.Screen
        name="(map)" // Name of the screen
        options={{
          title: "Map", // Title of the tab
          tabBarIcon: ({ color, focused }) => (
            // Render the TabBarIcon component with different icons based on focus state
            <TabBarIcon
              name={focused ? "compass" : "compass-outline"}
              color={color}
            />
          ),
        }}
      />
      {/* Define the second tab screen for the list */}
      <Tabs.Screen
        name="(list)" // Name of the screen
        options={{
          title: "List", // Title of the tab
          tabBarIcon: ({ color, focused }) => (
            // Render the TabBarIcon component with different icons based on focus state
            <TabBarIcon
              name={focused ? "list" : "list-outline"}
              color={color}
            />
          ),
        }}
      />
      {/* Define the third tab screen for the organization */}
      <Tabs.Screen
        name="(org)" // Name of the screen
        options={{
          title: "Organization", // Title of the tab
          tabBarIcon: ({ color, focused }) => (
            // Render the TabBarIcon component with different icons based on focus state
            <TabBarIcon
              name={focused ? "person-circle" : "person-circle-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
