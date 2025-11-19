type LogLevel = "info" | "warn" | "error" | "debug";

const log = (level: LogLevel, message: string, meta?: any): void => {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : "";
  console.log(`[${timestamp}] [${level.toUpperCase()}]: ${message}${metaStr}`);
};

export const logger = {
  info: (message: string, meta?: any) => log("info", message, meta),
  warn: (message: string, meta?: any) => log("warn", message, meta),
  error: (message: string, meta?: any) => log("error", message, meta),
  debug: (message: string, meta?: any) => log("debug", message, meta),
};
