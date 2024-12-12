// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from "@expo/vector-icons/Ionicons"; // Import Ionicons from expo-vector-icons
import { type IconProps } from "@expo/vector-icons/build/createIconSet"; // Import IconProps type from expo-vector-icons
import { type ComponentProps } from "react"; // Import ComponentProps type from React

// Define and export the TabBarIcon component
export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>["name"]>) {
  return (
    // Render the Ionicons component with specified size and style
    <Ionicons
      size={28} // Set the icon size to 28
      style={[{ marginBottom: -3 }, style]} // Apply a bottom margin and any additional styles passed as props
      {...rest} // Spread the rest of the props onto the Ionicons component
    />
  );
}
