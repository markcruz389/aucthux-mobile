import axios from "axios";

const configuredOrigin = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

const baseURL =
  configuredOrigin != null && configuredOrigin !== ""
    ? `${configuredOrigin.replace(/\/$/, "")}/api`
    : "https://jsonplaceholder.typicode.com";

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
    // Always return a rejected promise so the calling function can catch it
    return Promise.reject(error);
  },
);

export default axiosInstance;
