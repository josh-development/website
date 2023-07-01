import type { ProjectParser } from "typedoc-json-parser";
import Docs from "./Docs";

// TODO: Dynamically pull this from smth.
const guides = [
  {
    title: "Getting Started",
    description: "Learn how to get started with Josh",
    link: "/docs/guides/getting-started",
    fancy: true,
  },
{
    title: "Providers",
    description: "Learn how to use different providers with Josh",
    link: "/docs/guides/providers",
  },
];

const api = [
  {
    title: "Josh Core",
    description: "The main thing you interact with",
    link: "/docs/api/core",
    fancy: true,
  },
];

const makeButtons = (data: typeof guides) => (
  <div class="space-x-2">
    <a
      href={data.link}
      class={`transition text-white hover:opacity-80 shadow-lg dark:shadow px-6 py-4 rounded-lg inline-block bg-gradient-to-r duration-300 m-2 ${
        data.fancy ? "from-josh-500 to-josh-700" : "from-zinc-800 to-zinc-700"
      }`}
    >
      <div class="flex">{data.title}
      </div>
      <p class="text-sm">{data.description}</p>
    </a>
  </div>
);

export default function DocsLanding() {
  return (
    <div class="flex flex-col grow h-full md:flex-row gap-x-10 gap-y-8 px-10 items-center h-full pt-4 md:pt-0 pb-10 md:pb-0">
      <div class="mt-10 md:w-1/2 sm:mt-0">
        <h1 class="text-6xl dark:text-gray-100 my-2 font-ledger">Guides</h1>
        {guides.map(makeButtons)}
      </div>
      <div class="mt-10 md:w-1/2 sm:mt-0">
        <h1 class="text-6xl dark:text-gray-100 my-2 font-ledger">Api Docs</h1>
        {api.map(makeButtons)}
      </div>
    </div>
  );
}
