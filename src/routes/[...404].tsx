import { A } from "solid-start";

export default function NotFound() {
  return (
    <main class="lg:container mx-auto text-gray-700 my-5 space-y-4">
      <h1 class="text-6xl text-primary font-bold">Oops...</h1>
      <h2 class="text-3xl text-secondary-content ">
        We could not find that page.{" "}
        <A href="/" class="link-accent">
          Wanna go home?
        </A>
      </h2>
    </main>
  );
}
