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

export async function getPosts() {
  const { data } = await api.get<unknown>("/posts");
  return postsListResponseSchema.parse(data);
}
