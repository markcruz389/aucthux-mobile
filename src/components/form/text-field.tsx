import { cn } from "@/lib/cn";
import type { TextInputProps } from "react-native";
import { Text, TextInput, View } from "react-native";

const inputClassName =
  "rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-base text-slate-900";

export type TextFieldProps = Omit<TextInputProps, "onChange" | "onChangeText"> & {
  label: string;
  onChangeText: TextInputProps["onChangeText"];
  error?: string;
  containerClassName?: string;
};

export function TextField({
  label,
  error,
  containerClassName = "mb-4",
  className,
  placeholderTextColor = "#94a3b8",
  ...rest
}: TextFieldProps) {
  return (
    <View className={containerClassName}>
      <Text className="mb-2 text-sm font-medium text-slate-800">{label}</Text>
      <TextInput
        className={cn(inputClassName, className)}
        placeholderTextColor={placeholderTextColor}
        {...rest}
      />
      {error ? <Text className="mt-1 text-sm text-red-600">{error}</Text> : null}
    </View>
  );
}
