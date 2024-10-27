import MapComponent from "@/components/MapComponent";
import { Text, View } from "react-native";

export default function Index() { // Map Component (index as default entry point)
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text> MAP VIEW </Text>
    
      <MapComponent />
    </View>
  );
}
