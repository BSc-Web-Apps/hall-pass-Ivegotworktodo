import "~/global.css";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";
import { Platform } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { ListChecks } from "~/lib/icons/ListChecks";
import { NotebookTabs } from "~/lib/icons/NotebookTabs";
import { useColorScheme } from "~/lib/useColorScheme";
import HomeScreen from "./index";
import ProjectsPage from "./projects";
import { PortalHost } from "@rn-primitives/portal";

const Tab = createBottomTabNavigator();

export { ErrorBoundary } from "expo-router";

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
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
            backgroundColor: "000000",
            borderTopColor: "transparent",
          },
          tabBarActiveTintColor: "hsl(11, 100%, 60%)",
          tabBarInactiveTintColor: "hsla(11, 20%, 64%, 0.5)",
        }}
      >
        <Tab.Screen
          name="Tasks"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <ListChecks size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Projects"
          component={ProjectsPage}
          options={{
            tabBarIcon: ({ color, size }) => (
              <NotebookTabs size={size} color={color} />
            ),
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
