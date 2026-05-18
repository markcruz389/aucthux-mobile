import Ionicons from "@expo/vector-icons/Ionicons";
import { HeaderButton } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { type Href, Tabs, router } from "expo-router";

function SettingsHeaderButton() {
  const { colors } = useTheme();

  return (
    <HeaderButton
      onPress={() => router.push("/settings" as Href)}
      accessibilityLabel="Settings"
    >
      <Ionicons name="settings-outline" size={24} color={colors.text} />
    </HeaderButton>
  );
}

export default function PostsTabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitle: () => null,
        headerRight: () => <SettingsHeaderButton />,
        tabBarActiveTintColor: "#2563eb",
        tabBarInactiveTintColor: "#64748b",
        tabBarStyle: {
          backgroundColor: "#f8fafc",
          borderTopColor: "#e2e8f0",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Public",
          tabBarAccessibilityLabel: "All public posts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="globe-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="my-posts"
        options={{
          tabBarLabel: "My posts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
