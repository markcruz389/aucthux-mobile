import { z } from "zod";

export const MOCK_EMAIL = "test@gmail.com";
export const MOCK_PASSWORD = "testPassword";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "At least 8 characters"),
});

export function mockSignIn(email: string, password: string) {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      if (email.trim() === MOCK_EMAIL && password === MOCK_PASSWORD) {
        resolve();
        return;
      }
      reject(new Error("Invalid email or password"));
    }, 600);
  });
}
