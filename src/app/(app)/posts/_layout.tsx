import Ionicons from "@expo/vector-icons/Ionicons";
import { HeaderButton } from "@react-navigation/elements";
import { useTheme } from "@react-navigation/native";
import { type Href, Stack, router } from "expo-router";

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

export default function PostsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        title: "Posts",
        headerRight: () => <SettingsHeaderButton />,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="create"
        options={{
          title: "New post",
          headerBackTitle: "Posts",
        }}
      />
      <Stack.Screen
        name="my-posts"
        options={{
          title: "My posts",
          headerBackTitle: "Posts",
        }}
      />
    </Stack>
  );
}
