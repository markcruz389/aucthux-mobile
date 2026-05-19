import { TextField } from "@/components/form/text-field";
import { useSession } from "@/providers/session-provider";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { loginSchema, MOCK_EMAIL, mockSignIn } from "@/services/auth";
import { firstFieldErrorMessage } from "@/utils/first-error-message";

export default function SignInScreen() {
  const router = useRouter();
  const { signIn } = useSession();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      setAuthError(null);
      setIsAuthenticating(true);
      try {
        await mockSignIn(value.email, value.password);
        await signIn(value.email.trim());
        setIsAuthenticating(false);
        router.replace("/posts");
      } catch (err) {
        setIsAuthenticating(false);
        setAuthError(
          err instanceof Error ? err.message : "Something went wrong",
        );
      }
    },
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="grow justify-center px-6 py-10"
        >
          <View className="w-full max-w-md self-center">
            <Text className="mb-8 text-3xl font-bold text-slate-900">
              Sign in
            </Text>

            <form.Field name="email">
              {(field) => (
                <TextField
                  label="Email"
                  value={field.state.value}
                  onChangeText={field.handleChange}
                  error={firstFieldErrorMessage(field.state.meta.errors)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  placeholder={MOCK_EMAIL}
                />
              )}
            </form.Field>

            <form.Field name="password">
              {(field) => (
                <TextField
                  label="Password"
                  containerClassName="mb-6"
                  value={field.state.value}
                  onChangeText={field.handleChange}
                  error={firstFieldErrorMessage(field.state.meta.errors)}
                  secureTextEntry
                  autoComplete="password"
                  placeholder="••••••••"
                />
              )}
            </form.Field>

            {authError ? (
              <Text
                className="mb-4 text-center text-sm text-red-600"
                accessibilityRole="alert"
              >
                {authError}
              </Text>
            ) : null}

            <Pressable
              disabled={isAuthenticating}
              className={`items-center rounded-xl bg-blue-600 py-4 active:opacity-90 ${isAuthenticating ? "opacity-70" : ""}`}
              onPress={() => {
                void form.handleSubmit();
              }}
            >
              {isAuthenticating ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-base font-semibold text-white">
                  Continue
                </Text>
              )}
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
