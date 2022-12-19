import { createSignal } from "solid-js";
import { z } from "zod";

const datetimeFormatter = new Intl.DateTimeFormat("en-US", {
  dateStyle: "full",
  timeStyle: "long",
});

export enum LogLevel {
  DEBUG = 1,
  INFO = 2,
  WARN = 4,
  ERROR = 8,
}

export type BaseLog = z.output<typeof baseLogValidator>;
export const baseLogValidator = z
  .object({
    level: z.enum(["debug", "info", "warn", "error"]),
    ts: z.string().datetime({ offset: true }),
    msg: z.string(),
  })
  .passthrough()
  .transform((log, ctx) => {
    let level;
    switch (log.level) {
      case "debug":
        level = LogLevel.DEBUG;
        break;
      case "info":
        level = LogLevel.INFO;
        break;
      case "warn":
        level = LogLevel.WARN;
        break;
      case "error":
        level = LogLevel.ERROR;
        break;
    }

    let ts;
    try {
      ts = datetimeFormatter.format(new Date(log.ts));
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "could not parse date",
      });
      return z.NEVER;
    }

    return { ...log, rawLevel: log.level, rawTs: log.ts, level, ts };
  });

const [flags, setFlags] = createSignal(0b1111);
export const toggleFlag = (flag: LogLevel) => setFlags((flags) => flags ^ flag);
export const isFlagActive = (flag: LogLevel) => (flags() & flag) === flag;

export const [logs, setLogs] = createSignal<BaseLog[]>([]);
export const flaggedLogs = () => logs().filter((l) => isFlagActive(l.level));

// type ErrorLogValidator = z.infer<typeof errorLogValidator>;
// const errorLogValidator = baseLogValidator.extend({
//   level: z.literal("error"),
//   error: z.string(),
// });
//
// type RequestInfoValidator = z.infer<typeof requestInfoValidator>;
// const requestInfoValidator = baseLogValidator.extend({
//   level: z.literal("info"),
//   remove_ip: z.string(),
//   latency: z.number().nonnegative(),
//   host: z.string(),
//   method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
//   uri: z.string(),
//   status: z.number().nonnegative(),
//   size: z.number().nonnegative(),
//   user_agent: z.string(),
// });
