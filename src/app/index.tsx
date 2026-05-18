import { useSession } from "@/providers/session-provider";
import { Redirect } from "expo-router";

export default function Index() {
  const { userEmail, isReady } = useSession();

  if (!isReady) return null;

  return userEmail ? <Redirect href="/posts" /> : <Redirect href="/sign-in" />;
}
