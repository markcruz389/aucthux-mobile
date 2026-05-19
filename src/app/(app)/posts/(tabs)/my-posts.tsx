import { Card } from "@/components/card";
import { ErrorFallback } from "@/components/error-fallback";
import { PostSkeletonList } from "@/components/post-skeleton-card";
import { useSession } from "@/providers/session-provider";
import { createPostsByUserQueryOptions } from "@/queries/post";
import { useQuery } from "@tanstack/react-query";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MyPostsScreen() {
  const { userId } = useSession();

  const { data, isPending, isError, error, refetch, isRefetching } = useQuery({
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
          <PostSkeletonList />
        ) : isError ? (
          <ErrorFallback
            title="Couldn't load your posts"
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
                You have no posts yet.
              </Text>
            }
          />
        )}
      </View>
    </SafeAreaView>
  );
}
