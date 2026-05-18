import { createPostsQueryOptions } from "@/queries/post";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

export default function PostsScreen() {
  const insets = useSafeAreaInsets();
  const { data, isPending, isError, error, refetch, isFetching } = useQuery(
    createPostsQueryOptions(),
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["left", "right"]}>
      <View className="flex-1">
        {isPending ? (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color="#2563eb" />
            <Text className="mt-3 text-slate-600">Loading posts…</Text>
          </View>
        ) : isError ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="mb-4 text-center text-base text-red-600">
              {error instanceof Error ? error.message : "Something went wrong"}
            </Text>
            <Pressable
              onPress={() => void refetch()}
              className="rounded-xl bg-blue-600 px-5 py-3 active:opacity-90"
              accessibilityRole="button"
              accessibilityLabel="Retry loading posts"
            >
              <Text className="font-semibold text-white">Try again</Text>
            </Pressable>
          </View>
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            contentContainerClassName="px-4 py-4 pb-8"
            refreshing={isFetching && !isPending}
            onRefresh={() => void refetch()}
            renderItem={({ item }) => (
              <View className="mb-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                <Text className="mb-1 text-xs font-medium uppercase text-slate-400">
                  Post #{item.id}
                </Text>
                <Text className="mb-2 text-base font-semibold text-slate-900">
                  {item.title}
                </Text>
                <Text
                  className="text-sm leading-5 text-slate-600"
                  numberOfLines={3}
                >
                  {item.body}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <Text className="py-8 text-center text-slate-500">
                No posts found.
              </Text>
            }
          />
        )}
        <Pressable
          onPress={() => router.push("/posts/create")}
          className="absolute right-4 size-14 items-center justify-center rounded-full bg-blue-600 shadow-lg active:opacity-90"
          style={{ bottom: insets.bottom + 16 }}
          accessibilityRole="button"
          accessibilityLabel="Add post"
        >
          <Ionicons name="add" size={28} color="#ffffff" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
