import Fuse from "fuse.js";
import { createSignal, For } from "solid-js";
import { FileInput } from "~/components/FileInput";
import { FlagButton } from "~/components/LogButton";
import { LogCard } from "~/components/LogCard";
import { flaggedLogs, LogLevel } from "~/stores/logs";
import { classNames } from "~/utils/lib";

export default function Home() {
  const [searchString, setSearchString] = createSignal("");
  const [extendedSearch, setExtendedSearch] = createSignal(false);

  const fuse = () =>
    new Fuse(flaggedLogs(), {
      keys: ["msg", "ts", "rawTs"],

      includeMatches: true,
      threshold: 0.4,
      useExtendedSearch: extendedSearch(),
    });

  const filteredLogs = () =>
    searchString() === ""
      ? flaggedLogs()
      : fuse()
          .search(searchString())
          .map((x) => x.item);

  return (
    <main class="lg:container mx-auto my-5">
      <div class="flex justify-between items-center">
        <h1 class="text-6xl font-bold">Lumberjack</h1>
        <FileInput class="file-input file-input-bordered file-input-primary" />
      </div>

      <div class="divider" />

      <div class="flex gap-4">
        <input
          type="text"
          class="input input-bordered input-primary flex-grow"
          placeholder="Search..."
          onInput={(e) => setSearchString(e.currentTarget.value)}
        />
        <button
          onClick={() => setExtendedSearch((prev) => !prev)}
          class={classNames(
            "btn-secondary btn",
            !extendedSearch() && "btn-outline"
          )}
        >
          Regex
        </button>
        <FlagButton logLevel={LogLevel.DEBUG}>Debug</FlagButton>
        <FlagButton logLevel={LogLevel.INFO} class="btn-info">
          Info
        </FlagButton>
        <FlagButton logLevel={LogLevel.WARN} class="btn-warning">
          Warn
        </FlagButton>
        <FlagButton logLevel={LogLevel.ERROR} class="btn-error">
          Error
        </FlagButton>
      </div>

      <div class="divider" />

      <div class="space-y-4">
        <For each={filteredLogs()}>{(log) => <LogCard log={log} />}</For>
      </div>
    </main>
  );
}
