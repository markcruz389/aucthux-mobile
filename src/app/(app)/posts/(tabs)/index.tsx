import { Card } from "@/components/card";
import { ErrorFallback } from "@/components/error-fallback";
import { PostSkeletonList } from "@/components/post-skeleton-card";
import { createPostsQueryOptions } from "@/queries/post";
import { useQuery } from "@tanstack/react-query";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PostsScreen() {
  const { data, isPending, isError, error, refetch, isRefetching } = useQuery(
    createPostsQueryOptions(),
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={["left", "right"]}>
      <View className="flex-1">
        {isPending ? (
          <View className="flex-1">
            <View className="items-center py-6">
              <ActivityIndicator size="large" color="#2563eb" />
              <Text className="mt-3 text-slate-600">Loading posts…</Text>
            </View>
            <PostSkeletonList />
          </View>
        ) : isError ? (
          <ErrorFallback
            title="Couldn't load posts"
            error={error}
            onRetry={() => void refetch()}
          />
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item) => String(item.id)}
            contentContainerClassName="px-4 py-4 pb-8"
            contentContainerStyle={{ flexGrow: 1 }}
            refreshing={isRefetching}
            onRefresh={() => void refetch()}
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
                No posts found.
              </Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
