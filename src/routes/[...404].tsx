import { A } from "solid-start";

export default function NotFound() {
  return (
    <main class="mx-auto my-5 space-y-4 text-gray-700 lg:container">
      <h1 class="text-6xl font-bold text-primary">Oops...</h1>
      <h2 class="text-3xl text-secondary-content ">
        We could not find that page.{" "}
        <A href="/" class="link-accent">
          Wanna go home?
        </A>
      </h2>
    </main>
  );
}
