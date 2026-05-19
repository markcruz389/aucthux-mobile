import { getApiErrorMessage } from "@/lib/api-error-message";
import { type ErrorBoundaryProps } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ErrorFallbackProps = {
  title?: string;
  message?: string;
  error?: unknown;
  onRetry?: () => void;
  retryLabel?: string;
  fullScreen?: boolean;
};

export function ErrorFallback({
  title = "Something went wrong",
  message,
  error,
  onRetry,
  retryLabel = "Try again",
  fullScreen = false,
}: ErrorFallbackProps) {
  const displayMessage =
    message ??
    (error != null ? getApiErrorMessage(error) : "Please try again.");

  const content = (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="mb-2 text-center text-xl font-semibold text-slate-900">
        {title}
      </Text>
      <Text
        className="mb-6 text-center text-base text-slate-600"
        accessibilityRole="alert"
      >
        {displayMessage}
      </Text>
      {onRetry ? (
        <Pressable
          onPress={onRetry}
          className="rounded-xl bg-blue-600 px-5 py-3 active:opacity-90"
          accessibilityRole="button"
          accessibilityLabel={retryLabel}
        >
          <Text className="font-semibold text-white">{retryLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );

  if (!fullScreen) {
    return content;
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["top", "bottom", "left", "right"]}>
      {content}
    </SafeAreaView>
  );
}

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  return (
    <ErrorFallback
      error={error}
      onRetry={() => void retry()}
      fullScreen
    />
  );
}
