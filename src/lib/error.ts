export function isAxiosErrorLike(
  err: unknown
): err is { response: { data?: { error?: string } } } {
  return (
    typeof err === "object" &&
    err !== null &&
    "response" in err &&
    typeof (err as Record<string, unknown>).response === "object"
  );
}

export function extractErrorMessage(
  err: unknown,
  fallback = "An unexpected error occurred."
): string {
  if (err instanceof Error && err.message) {
    return err.message;
  }

  if (isAxiosErrorLike(err) && err.response.data?.error) {
    return err.response.data.error;
  }

  return fallback;
}
