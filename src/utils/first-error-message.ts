export function firstFieldErrorMessage(errors: readonly unknown[] | undefined) {
  const first = errors?.[0];
  if (
    first &&
    typeof first === "object" &&
    first !== null &&
    "message" in first
  ) {
    return String((first as { message: string }).message);
  }
  return undefined;
}
