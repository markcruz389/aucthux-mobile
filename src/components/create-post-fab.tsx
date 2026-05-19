import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { Pressable } from "react-native";

type CreatePostFabProps = {
  /** Distance from the bottom of the nearest positioned ancestor to the FAB’s bottom edge. */
  bottomOffset: number;
};

export function CreatePostFab({ bottomOffset }: CreatePostFabProps) {
  return (
    <Pressable
      onPress={() => router.push("/posts/create")}
      className="absolute right-4 size-14 items-center justify-center rounded-full bg-blue-600 shadow-lg active:opacity-90"
      style={{
        bottom: bottomOffset,
      }}
      accessibilityRole="button"
      accessibilityLabel="Add post"
    >
      <Ionicons name="add" size={28} color="#ffffff" />
    </Pressable>
  );
}
