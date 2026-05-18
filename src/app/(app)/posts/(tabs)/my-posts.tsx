import { Card } from "@/components/card";
import { CreatePostFab } from "@/components/create-post-fab";
import { useSession } from "@/providers/session-provider";
import { createPostsByUserQueryOptions } from "@/queries/post";
import { useQuery } from "@tanstack/react-query";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPostsScreen() {
  const { userId } = useSession();

  const { data, isPending, isError, error, refetch, isFetching } = useQuery({
    ...createPostsByUserQueryOptions(userId ?? 0),
    enabled: userId != null,
  });

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["left", "right"]}>
      <View className="flex-1">
        {userId == null ? (
          <View className="flex-1 items-center justify-center px-6">
            <Text className="text-center text-base text-slate-600">
              Your account ID is missing. Sign out and sign in again.
            </Text>
          </View>
        ) : isPending ? (
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
            ListHeaderComponent={
              <Text className="mb-3 text-sm font-medium text-slate-500">
                Your posts (user #{userId})
              </Text>
            }
            renderItem={({ item }) => (
              <Card className="mb-3">
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
              </Card>
            )}
            ListEmptyComponent={
              <Text className="py-8 text-center text-slate-500">
                You have no posts yet.
              </Text>
            }
          />
        )}
        <CreatePostFab />
      </View>
    </SafeAreaView>
  );
}
