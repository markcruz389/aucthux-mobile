import { Card } from "@/components/card";
import { cn } from "@/lib/cn";
import { View, type ViewProps } from "react-native";

function SkeletonBar({ className }: { className?: string }) {
  return <View className={cn("rounded-md bg-slate-200", className)} />;
}

export function PostSkeletonCard({ className, ...props }: ViewProps) {
  return (
    <Card
      className={cn("mb-3", className)}
      accessibilityLabel="Loading post"
      {...props}
    >
      <SkeletonBar className="mb-2 h-3 w-16" />
      <SkeletonBar className="mb-2 h-4 w-3/4" />
      <SkeletonBar className="mb-2 h-3 w-full" />
      <SkeletonBar className="mb-2 h-3 w-full" />
      <SkeletonBar className="h-3 w-2/3" />
    </Card>
  );
}

export function PostSkeletonList({ count = 5 }: { count?: number }) {
  return (
    <View className="flex-1 px-4 py-4 pb-8">
      {Array.from({ length: count }, (_, index) => (
        <PostSkeletonCard key={index} />
      ))}
    </View>
  );
}
