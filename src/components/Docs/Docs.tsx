import type { ProjectParser } from "typedoc-json-parser";
import JSONDisplay from "./JSONDisplay";
import RenderProp from "./RenderProp";
import RenderMethod from "./RenderMethod";
import RenderConstructor from "./RenderConstructor";

export default function Docs({ data }: { data: ProjectParser }) {
  return (
    <>
      <h2 class="dark:text-gray-300 my-7 text-xl">
        {data.name} v{data.version}
      </h2>
      {data.classes
        .map((c) => (
          <>
            {/* Constructor */}
            <RenderConstructor
              data={c}
            />
            {/* Props */}
            {c.properties
              .map((p: any) => (
                <>
                  <RenderProp
                    data={p}
                  />
                </>
              ))}
            {/* Methods */}
            {c.methods
              .map((m) => (
                <>
                  <RenderMethod
                    data={m}
                  />
                </>
              ))}
          </>
        ))}
            <details class="mt-8 w-full sm:mt-0">
                <summary class="text-gray-500 dark:text-gray-400">Debug JSON</summary>
                {JSONDisplay(data)}
            </details>

    </>
  );
}
