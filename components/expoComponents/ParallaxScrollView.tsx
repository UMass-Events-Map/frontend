import type { PropsWithChildren, ReactElement } from "react";
import { StyleSheet, useColorScheme } from "react-native";
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from "react-native-reanimated";

import { ThemedView } from "@/components/expoComponents/ThemedView";

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
}: Props) {
  // Determine the current color scheme (light or dark)
  const colorScheme = useColorScheme() ?? "light";

  // Animated ref to attach to the ScrollView for tracking scroll offset
  const scrollRef = useAnimatedRef<Animated.ScrollView>();

  // Hook for calculating scroll offset based on the scrollRef
  const scrollOffset = useScrollViewOffset(scrollRef);

  // Create an animated style for the header image that changes position and scale
  // as the user scrolls. We use interpolation based on the scroll offset.
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          // Translate the header image on the Y-axis as the user scrolls
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          // Scale the header image when pulled down (over-scrolled)
          scale: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [2, 1, 1]
          ),
        },
      ],
    };
  });

  return (
    // A themed view that adjusts its appearance based on the current theme (light/dark)
    <ThemedView style={styles.container}>
      {/* The Animated.ScrollView enables smooth animated scrolling and transformations */}
      <Animated.ScrollView ref={scrollRef} scrollEventThrottle={16}>
        {/* The header contains the image and uses animated styles for parallax effect */}
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme] },
            headerAnimatedStyle,
          ]}
        >
          {headerImage}
        </Animated.View>

        {/* Content area below the header for any child components */}
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  // Container of the whole screen, takes full available space
  container: {
    flex: 1,
  },
  // Header section with a fixed height. Overflow hidden to clip the image.
  header: {
    height: 250,
    overflow: "hidden",
  },
  // Content section below the header, padding and spacing for child elements
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
    overflow: "hidden",
  },
});
