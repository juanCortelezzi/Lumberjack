import { children, ParentComponent } from "solid-js";
import { isFlagActive, LogLevel, toggleFlag } from "~/stores/logs";
import { classNames } from "~/utils/lib";

export const FlagButton: ParentComponent<{
  logLevel: LogLevel;
  class?: string;
}> = (props) => {
  const c = children(() => props.children);
  return (
    <button
      class={classNames(
        "btn",
        !!props.class && props.class,
        !isFlagActive(props.logLevel) && "btn-outline"
      )}
      onClick={() => toggleFlag(props.logLevel)}
    >
      {c()}
    </button>
  );
};
