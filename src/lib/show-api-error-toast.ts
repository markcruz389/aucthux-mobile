import { getApiErrorMessage } from "@/lib/api-error-message";
import Toast from "react-native-toast-message";

export function showApiErrorToast(error: unknown) {
  Toast.show({
    type: "error",
    text1: "Error",
    text2: getApiErrorMessage(error),
  });
}
