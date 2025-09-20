import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useColorScheme } from "../../hooks/useColorScheme";
import Colors from "../../constants/Colors";
import { NAV_TABS } from "../../constants/AppConfig";

// Define a type for the tab objects to ensure type safety
type NavTab = {
  id: string;
  title: string;
  icon: keyof typeof Ionicons.glyphMap; // This ensures the icon name is valid
  route: string;
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "dark"];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.tabIconDefault,
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.cardBorder,
          borderTopWidth: 1,
          paddingBottom: 8,
          paddingTop: 8,
          height: 88,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: "600",
        },
      }}
    >
      {/* Map over the NAV_TABS array to create the screens dynamically */}
      {NAV_TABS.map((tab: NavTab) => (
        <Tabs.Screen
          key={tab.id}
          name={tab.id}
          options={{
            title: tab.title,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name={tab.icon} size={size} color={color} />
            ),
            headerShown: tab.id !== "home", // Hide header only for the home screen
          }}
        />
      ))}

      {/* These screens are part of the tabs layout but are not visible in the tab bar */}
      <Tabs.Screen
        name="skinScanResult"
        options={{
          href: null, // This hides the screen from the tab bar
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="prescriptionResult"
        options={{
          href: null, // This hides the screen from the tab bar
          headerShown: false,
        }}
      />
    </Tabs>
  );
}
