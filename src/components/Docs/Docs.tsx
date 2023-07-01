import JSONDisplay from "./JSONDisplay";
import RenderProp from "./RenderProp";

const blacklist = {
  classes: ["JoshError"],
  props: ["Josh.middlewares", "Josh.provider", "Josh.providerDataFailedError"],
};

export default function Docs({ data }: { data: unknown }) {
  return (
    <>
      <h2 class="dark:text-gray-300 my-7 text-xl">
        {data.name} v{data.version}
      </h2>
      {data.classes
        .filter((c: unknown) => !blacklist.classes.includes(c.name))
        .map((c: any) => (
          <>
            {/* Constructor */}
            <RenderProp
              data={{
                name: `new ${c.name}`,
                parameters: c.construct.parameters,
                description:
                  c.construct.comment?.description || c.comment?.description,
                blockTags: c.construct.comment?.blockTags?.length
                  ? c.construct.comment?.blockTags
                  : c.comment?.blockTags,
              }}
            />
            {/* Props */}
            {c.properties
              .filter((p) => !blacklist.props.includes(`${c.name}.${p.name}`))
              .map((p: any) => (
                <>
                  <RenderProp
                    data={{
                      name: p.name,
                      parameters: null,
                      description: p.comment?.description,
                      blockTags: p.comment?.blockTags,
                    }}
                  />
                </>
              ))}
            {/* Methods */}
            {c.methods
              .filter(
                (m: any) => !blacklist.props.includes(`${c.name}.${m.name}`)
              )
              .map((m: any) => (
                <>
                  <RenderProp
                    data={{
                      name: m.name,
                      parameters: m.parameters,
                      description: m.signatures?.[0]?.comment?.description,
                      blockTags: m.signatures?.[0]?.comment?.blockTags,
                    }}
                  />
                </>
              ))}
            {/* Debug Info */}
            <div class="mt-8 w-full sm:mt-0">{JSONDisplay(c)}</div>
          </>
        ))}
      {/* <div class="mt-8 w-full sm:mt-0">
                {JSONDisplay(data)}
            </div> */}
    </>
  );
}
