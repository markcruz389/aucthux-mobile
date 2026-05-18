import { getPosts, type Post } from "@/services/api/post";
import { queryKeys } from "@/queries/query-keys";
import { type UseQueryOptions } from "@tanstack/react-query";

export type { Post };

const DEFAULT_QUERY_OPTIONS: Omit<
  UseQueryOptions<Post[], Error, Post[], readonly unknown[]>,
  "queryKey" | "queryFn"
> = {
  staleTime: 60_000,
};

export function createPostsQueryOptions(
  options?: Omit<
    UseQueryOptions<Post[], Error, Post[], readonly unknown[]>,
    "queryKey" | "queryFn"
  >,
) {
  return {
    queryKey: queryKeys.posts.list(),
    queryFn: getPosts,
    ...DEFAULT_QUERY_OPTIONS,
    ...(options ?? {}),
  };
}
