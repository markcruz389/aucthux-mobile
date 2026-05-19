import { Stack } from "expo-router";

export default function PostsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
          title: "New post",
          headerBackButtonDisplayMode: "minimal",
        }}
      />
    </Stack>
  );
}
