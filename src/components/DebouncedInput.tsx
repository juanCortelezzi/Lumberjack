import {
  Component,
  createEffect,
  createSignal,
  JSX,
  mergeProps,
  onCleanup,
  splitProps,
} from "solid-js";

type ComponentProps = {
  debounce?: number;
  onInput: (value: string) => void;
} & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, "onInput" | "value">;

export const DebouncedInput: Component<ComponentProps> = (rawProps) => {
  const merged = mergeProps({ debounce: 500 }, rawProps);
  const [props, others] = splitProps(merged, ["onInput", "debounce"]);

  const [value, setValue] = createSignal("");

  createEffect(() => {
    const x = value(); // put this here to trigger rerenders
    const timeout = setTimeout(() => props.onInput(x), props.debounce);
    onCleanup(() => clearTimeout(timeout));
  });

  return (
    <input
      value={value()}
      onInput={(e) => setValue(e.currentTarget.value)}
      {...others}
    />
  );
};
