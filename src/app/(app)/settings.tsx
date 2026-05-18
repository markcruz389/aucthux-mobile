import { Card } from "@/components/card";
import { useSession } from "@/providers/session-provider";
import { useRouter } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SettingsScreen() {
  const router = useRouter();
  const { userEmail, userId, signOut } = useSession();

  return (
    <SafeAreaView
      className="flex-1 bg-slate-50"
      edges={["bottom", "left", "right"]}
    >
      <View className="flex-1 px-4 pt-4">
        <Card className="mb-8">
          <Text className="text-xs font-semibold uppercase text-slate-400">
            Signed in as
          </Text>
          <Text className="mt-2 text-lg font-semibold text-slate-900">
            {userEmail ?? "Unknown"}
          </Text>
          <Text className="mt-4 text-xs font-semibold uppercase text-slate-400">
            User ID
          </Text>
          <Text className="mt-2 text-lg font-semibold text-slate-900">
            {userId != null ? String(userId) : "—"}
          </Text>
        </Card>

        <Pressable
          onPress={() => {
            void (async () => {
              await signOut();
              router.replace("/sign-in");
            })();
          }}
          className="items-center rounded-xl border border-red-200 bg-white py-4 active:bg-red-50"
          accessibilityRole="button"
          accessibilityLabel="Log out"
        >
          <Text className="text-base font-semibold text-red-600">Log out</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
