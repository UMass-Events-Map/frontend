import Ionicons from "@expo/vector-icons/Ionicons";
import { PropsWithChildren, useState } from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import { ThemedText } from "@/components/expoComponents/ThemedText";
import { ThemedView } from "@/components/expoComponents/ThemedView";
import { Colors } from "@/constants/Colors";

export function Collapsible({
  children,
  title,
}: PropsWithChildren & { title: string }) {
  // Local state to track if the collapsible section is open or closed
  const [isOpen, setIsOpen] = useState(false);

  // Determine the current device color scheme (light or dark mode)
  const theme = useColorScheme() ?? "light";

  return (
    // The root container uses a ThemedView for automatic theming
    <ThemedView>
      {/* The heading section is touchable, toggling the isOpen state on press */}
      <TouchableOpacity
        style={styles.heading}
        onPress={() => setIsOpen((value) => !value)}
        activeOpacity={0.8}
      >
        {/* Icon changes based on whether the content is open or closed */}
        <Ionicons
          name={isOpen ? "chevron-down" : "chevron-forward-outline"}
          size={18}
          color={theme === "light" ? Colors.light.icon : Colors.dark.icon}
        />
        {/* Title text displayed next to the icon */}
        <ThemedText type="defaultSemiBold">{title}</ThemedText>
      </TouchableOpacity>

      {/* If isOpen is true, display the content inside a styled container */}
      {isOpen && <ThemedView style={styles.content}>{children}</ThemedView>}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Styles for the heading row containing icon and title
  heading: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  // Styles for the content section, which is shown only when isOpen is true
  content: {
    marginTop: 6,
    marginLeft: 24,
  },
});
