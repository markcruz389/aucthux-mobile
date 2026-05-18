export const queryKeys = {
  posts: {
    all: ["posts"] as const,
    list: () => [...queryKeys.posts.all, "list"] as const,
    detail: (id: number) => [...queryKeys.posts.all, "detail", id] as const,
  },
};
