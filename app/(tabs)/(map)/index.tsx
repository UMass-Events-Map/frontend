import MapComponent from "@/components/MapComponent";
import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect, useMemo } from "react";
import { BuildingProp, Building } from "@/constants/Interfaces";

export default function Index() { // Map Component (index as default entry point)
  
  return (
    <View style={{ flex: 1 }}>
      <MapComponent />
    </View>
  );


}
