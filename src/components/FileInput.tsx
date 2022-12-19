import { Component } from "solid-js";
import { baseLogValidator, setLogs } from "~/stores/logs";

export const FileInput: Component<{ class?: string }> = (props) => {
  return (
    <input
      type="file"
      class={props.class}
      onChange={async (e) => {
        const files = e.currentTarget.files;
        if (!files || files.length < 1) return;
        const x = await files[0].text();
        setLogs(
          x
            .trim()
            .split("\n")
            .map((log) => baseLogValidator.parse(JSON.parse(log)))
        );
      }}
    />
  );
};
