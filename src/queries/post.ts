import { queryKeys } from "@/queries/query-keys";
import {
  createPost,
  getPosts,
  getPostsByUserId,
  type Post,
} from "@/services/api/post";
import {
  useMutation,
  useQueryClient,
  type UseQueryOptions,
} from "@tanstack/react-query";

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

export function createPostsByUserQueryOptions(
  userId: number,
  options?: Omit<
    UseQueryOptions<Post[], Error, Post[], readonly unknown[]>,
    "queryKey" | "queryFn"
  >,
) {
  return {
    queryKey: queryKeys.posts.byUser(userId),
    queryFn: () => getPostsByUserId(userId),
    ...DEFAULT_QUERY_OPTIONS,
    ...(options ?? {}),
  };
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () =>
      void queryClient.invalidateQueries({ queryKey: queryKeys.posts.all }),
  });
}
