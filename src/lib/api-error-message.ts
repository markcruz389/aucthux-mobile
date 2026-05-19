import { isAxiosError } from "axios";

export function getApiErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      return "Request timed out. Please try again.";
    }

    if (error.response == null) {
      return "Network error. Check your connection and try again.";
    }

    const { data, status } = error.response;

    if (typeof data === "string" && data.trim() !== "") {
      return data;
    }

    if (typeof data === "object" && data !== null) {
      if ("message" in data && typeof data.message === "string") {
        return data.message;
      }
      if ("error" in data && typeof data.error === "string") {
        return data.error;
      }
    }

    if (status === 401) return "You are not authorized.";
    if (status === 403) return "You do not have permission.";
    if (status === 404) return "Not found.";
    if (status >= 500) return "Server error. Please try again later.";

    return `Request failed (${status}).`;
  }

  if (error instanceof Error && error.message.trim() !== "") {
    return error.message;
  }

  return "Something went wrong.";
}
