import { TextField } from "@/components/form/text-field";
import { useCreatePost } from "@/queries/post";
import { createPostFormSchema } from "@/services/api/post";
import { firstFieldErrorMessage } from "@/utils/first-error-message";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreatePostScreen() {
  const router = useRouter();
  const createPostMutation = useCreatePost();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      body: "",
      userId: "1",
    },
    validators: {
      onSubmit: createPostFormSchema,
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null);
      try {
        await createPostMutation.mutateAsync({
          title: value.title.trim(),
          body: value.body.trim(),
          userId: Number(value.userId),
        });
        router.back();
      } catch (err) {
        setSubmitError(
          err instanceof Error ? err.message : "Could not create post",
        );
      }
    },
  });

  const isPending = createPostMutation.isPending;

  return (
    <SafeAreaView
      className="flex-1 bg-slate-50"
      edges={["bottom", "left", "right"]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerClassName="px-4 py-4 pb-8"
        >
          <form.Field name="title">
            {(field) => (
              <TextField
                label="Title"
                value={field.state.value}
                onChangeText={field.handleChange}
                error={firstFieldErrorMessage(field.state.meta.errors)}
                placeholder="Post title"
              />
            )}
          </form.Field>

          <form.Field name="body">
            {(field) => (
              <TextField
                label="Body"
                value={field.state.value}
                onChangeText={field.handleChange}
                error={firstFieldErrorMessage(field.state.meta.errors)}
                placeholder="Write something…"
                multiline
                numberOfLines={6}
                textAlignVertical="top"
                containerClassName="mb-4"
                style={{ minHeight: 120 }}
              />
            )}
          </form.Field>

          <form.Field name="userId">
            {(field) => (
              <TextField
                label="User ID"
                value={field.state.value}
                onChangeText={field.handleChange}
                error={firstFieldErrorMessage(field.state.meta.errors)}
                placeholder="1"
                keyboardType="number-pad"
              />
            )}
          </form.Field>

          {submitError ? (
            <Text
              className="mb-4 text-center text-sm text-red-600"
              accessibilityRole="alert"
            >
              {submitError}
            </Text>
          ) : null}

          <Pressable
            disabled={isPending}
            className={`items-center rounded-xl bg-blue-600 py-4 active:opacity-90 ${isPending ? "opacity-70" : ""}`}
            onPress={() => void form.handleSubmit()}
            accessibilityRole="button"
            accessibilityLabel="Create post"
          >
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-base font-semibold text-white">
                Create post
              </Text>
            )}
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
