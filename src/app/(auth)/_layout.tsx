import { useSession } from "@/providers/session-provider";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { userEmail, isReady } = useSession();

  if (!isReady) return null;

  if (userEmail != null) {
    return <Redirect href="/posts" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
