import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  ...otherProps
}: ThemedViewProps) {
  // Determine the appropriate background color based on the current theme
  // and the optional lightColor/darkColor overrides passed in.
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    // Render a View component with the calculated background color
    // and any additional styles or properties passed in.
    <View style={[{ backgroundColor }, style]} {...otherProps} />
  );
}
