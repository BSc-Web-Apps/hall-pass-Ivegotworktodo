import "~/global.css";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Platform } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { Home as HomeIcon } from "~/lib/icons/Home";
import { Info } from "~/lib/icons/Info";
import { useColorScheme } from "~/lib/useColorScheme";
import HomeScreen from "./index";
import SettingsScreen from "./settings";
import { PortalHost } from "@rn-primitives/portal";

const Tab = createBottomTabNavigator();

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "hsl(11, 72%, 3%)",
            borderTopColor: "transparent",
          },
          tabBarActiveTintColor: "hsl(11, 100%, 60%)",
          tabBarInactiveTintColor: "hsla(11, 20%, 64%, 0.5)",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Info size={size} color={color} />,
          }}
        />
      </Tab.Navigator>
      <PortalHost />
    </>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined"
    ? React.useEffect
    : React.useLayoutEffect;
