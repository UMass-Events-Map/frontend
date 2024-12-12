import { Link } from "expo-router";
import { openBrowserAsync } from "expo-web-browser";
import { type ComponentProps } from "react";
import { Platform } from "react-native";

type Props = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

export function ExternalLink({ href, ...rest }: Props) {
  return (
    // The Link component is used to create a hyperlink within the React Native app.
    // On web platforms, it will behave like a normal link that opens in a new tab/window.
    // On native platforms, we intercept the press and open the link in an in-app browser instead.
    <Link
      target="_blank"
      {...rest}
      href={href}
      onPress={async (event) => {
        // Check if the platform is not web (i.e., iOS or Android).
        if (Platform.OS !== "web") {
          // Prevent the default behavior of the link, which would open in the default browser.
          event.preventDefault();

          // Use expo-web-browser's openBrowserAsync to open the link within the app's browser.
          await openBrowserAsync(href);
        }
      }}
    />
  );
}
