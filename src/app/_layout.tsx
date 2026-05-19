import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "@/providers/session-provider";
import { Stack } from "expo-router";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

import "@/global.css";

export { ErrorBoundary } from "@/components/error-fallback";

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }} />
          <Toast />
        </SafeAreaProvider>
      </SessionProvider>
    </QueryClientProvider>
  );
}
