export const queryKeys = {
  posts: {
    all: ["posts"] as const,
    list: () => [...queryKeys.posts.all, "list"] as const,
    byUser: (userId: number) =>
      [...queryKeys.posts.all, "byUser", userId] as const,
    detail: (id: number) => [...queryKeys.posts.all, "detail", id] as const,
  },
};
