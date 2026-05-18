import { useSession } from "@/providers/session-provider";
import { Redirect, Stack } from "expo-router";

export default function AppLayout() {
  const { userEmail, isReady } = useSession();

  if (!isReady) return null;

  if (userEmail == null) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="posts" options={{ headerShown: false }} />
      <Stack.Screen
        name="settings"
        options={{
          headerShown: true,
          title: "Settings",
        }}
      />
    </Stack>
  );
}
