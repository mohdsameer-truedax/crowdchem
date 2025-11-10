export const logEvent = (
  event: string,
  data?: Record<string, string | number | boolean>
) => {
  console.log("Telemetry event:", event, data);
  // Optionally send to analytics or monitoring service
};
