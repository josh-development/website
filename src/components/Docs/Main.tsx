import type { ProjectParser } from "typedoc-json-parser";
import Docs from "./Docs";

export default function DocsMain({ data }: { data: ProjectParser }) {
  return (
    <div class="px-10 py-4">
      <div class="mt-10 sm:mt-0">
        <h1 class="text-6xl dark:text-gray-100 my-2 font-ledger">
          Documentation
        </h1>
        <Docs data={data} />
      </div>
    </div>
  );
}
