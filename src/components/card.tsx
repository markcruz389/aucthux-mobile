import { cn } from "@/lib/cn";
import { View, type ViewProps } from "react-native";

const cardClassName =
  "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";

export function Card({ className, ...props }: ViewProps) {
  return <View className={cn(cardClassName, className)} {...props} />;
}
