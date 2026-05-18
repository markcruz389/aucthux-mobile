import api from "@/lib/axios";
import { z } from "zod";

export const postSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  body: z.string(),
});

export const postsListResponseSchema = z.array(postSchema);

export type Post = z.infer<typeof postSchema>;

export const createPostFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less"),
  body: z
    .string()
    .trim()
    .min(1, "Body is required")
    .max(5000, "Body must be 5000 characters or less"),
  userId: z
    .string()
    .trim()
    .min(1, "User ID is required")
    .regex(/^[1-9]\d*$/, "Enter a positive whole number"),
});

export type CreatePostInput = {
  title: string;
  body: string;
  userId: number;
};

export async function createPost(input: CreatePostInput) {
  const { data } = await api.post<unknown>("/posts", input);
  return postSchema.parse(data);
}

export async function getPosts() {
  const { data } = await api.get<unknown>("/posts");
  return postsListResponseSchema.parse(data);
}

export async function getPostsByUserId(userId: number) {
  const { data } = await api.get<unknown>("/posts", {
    params: { userId },
  });
  return postsListResponseSchema.parse(data);
}
