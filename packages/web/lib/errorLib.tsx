export function onError(error: any) {
  let message = error.toString();

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }

  console.error("ONERROR: -->", error)
  alert(message);
}
