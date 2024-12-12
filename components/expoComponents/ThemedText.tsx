import { Text, type TextProps, StyleSheet } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = "default",
  ...rest
}: ThemedTextProps) {
  // Determine the color based on the current theme (light or dark) and any provided override colors.
  const color = useThemeColor({ light: lightColor, dark: darkColor }, "text");

  return (
    // Apply the selected text style based on the "type" prop, as well as the resolved color.
    <Text
      style={[
        { color },
        // If type is 'default', apply the default text style
        type === "default" ? styles.default : undefined,
        // If type is 'title', apply the title style
        type === "title" ? styles.title : undefined,
        // If type is 'defaultSemiBold', apply the semi-bold default style
        type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
        // If type is 'subtitle', apply the subtitle style
        type === "subtitle" ? styles.subtitle : undefined,
        // If type is 'link', apply the link style
        type === "link" ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  // Default text styling
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  // Default text styling with semi-bold font weight
  defaultSemiBold: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "600",
  },
  // Title styling for larger, bold text
  title: {
    fontSize: 32,
    fontWeight: "bold",
    lineHeight: 32,
  },
  // Subtitle styling for slightly smaller but still bold text
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  // Link styling with a specific color and line height
  link: {
    lineHeight: 30,
    fontSize: 16,
    color: "#0a7ea4",
  },
});
