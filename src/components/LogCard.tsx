import { Component } from "solid-js";
import { BaseLog, LogLevel } from "~/stores/logs";
import { classNames } from "~/utils/lib";

export const LogCard: Component<{ log: BaseLog }> = (props) => {
  return (
    <div class="card rounded bg-neutral shadow-xl">
      <div class="card-body">
        <div class="flex items-center justify-between">
          <div class="flex items-center justify-center gap-2">
            <div
              class={classNames(
                "h-4 w-4 rounded-full",
                props.log.level === LogLevel.DEBUG && "bg-white",
                props.log.level === LogLevel.INFO && "bg-blue-500",
                props.log.level === LogLevel.WARN && "bg-amber-500",
                props.log.level === LogLevel.ERROR && "bg-red-500"
              )}
            />
            <h2 class="card-title">{props.log.msg}</h2>
          </div>
          <time>{props.log.ts}</time>
        </div>

        <pre class="overflow-x-scroll rounded bg-black p-1">
          {JSON.stringify(props.log, null, 2)}
        </pre>
      </div>
    </div>
  );
};
