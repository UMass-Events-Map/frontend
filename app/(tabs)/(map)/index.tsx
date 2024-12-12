import MapComponent from "@/components/MapComponent"; // Import the MapComponent from the specified path
import { Text, View, StyleSheet } from "react-native"; // Import necessary components from react-native
import { useState, useEffect, useMemo } from "react"; // Import hooks from React
import { BuildingProp, Building } from "@/constants/Interfaces"; // Import interfaces for type definitions

// Define and export the Index component, which serves as the default entry point
export default function Index() {
  return (
    // Render a View component that takes up the entire screen
    <View style={{ flex: 1 }}>
      {/* Render the MapComponent inside the View */}
      <MapComponent />
    </View>
  );
}
