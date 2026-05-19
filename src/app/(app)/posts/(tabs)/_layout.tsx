import Ionicons from "@expo/vector-icons/Ionicons";
import {
  BottomTabBar,
  type BottomTabBarProps,
} from "@react-navigation/bottom-tabs";
import { HeaderButton } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { type Href, Tabs, router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import { CreatePostFab } from "@/components/create-post-fab";

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

function PostsTabBar(props: BottomTabBarProps) {
  const [height, setHeight] = useState(0);

  return (
    <View pointerEvents="box-none" style={{ position: "relative" }}>
      <View
        pointerEvents="box-none"
        onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
      >
        <BottomTabBar {...props} />
      </View>
      <CreatePostFab bottomOffset={height + 16} />
    </View>
  );
}

export default function PostsTabsLayout() {
  return (
    <Tabs
      tabBar={(tabBarProps) => <PostsTabBar {...tabBarProps} />}
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
