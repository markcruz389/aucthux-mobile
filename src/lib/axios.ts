import { showApiErrorToast } from "@/lib/show-api-error-toast";
import axios from "axios";

const configuredOrigin = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

if (!configuredOrigin) {
  throw new Error(
    "EXPO_PUBLIC_API_BASE_URL is not set. Copy .env-example to .env and set your API base URL.",
  );
}

const baseURL = configuredOrigin.replace(/\/$/, "");

const axiosInstance = axios.create({
  baseURL,
  timeout: 15000, // 15 seconds is often safer for mobile networks
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Example: Custom header to identify the client
    // "X-Client-Platform": Platform.OS,
  },
});

// Response Interceptor: Global Error Handling (e.g., redirect on 401)
axiosInstance.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    showApiErrorToast(error);
    return Promise.reject(error);
  },
);

export default axiosInstance;
