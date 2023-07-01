import type {
  ClassParser,
  MethodParser,
  SignatureParser,
} from "typedoc-json-parser";
import JSONDisplay from "./JSONDisplay";
import RenderBlockquote from "./RenderBlockquote";

export default function RenderMethod({
  data,
  signature,
  constructorHint,
}: {
  data: MethodParser;
  signature?: SignatureParser;
  constructorHint?: ClassParser;
}) {
  if (!signature && !data.signatures?.[0]) return (JSONDisplay(data));
  const shouldRecurse = !signature;
  if (!signature) signature = data.signatures[0]!;
  return (
    <div class="mb-5">
      <h3 class="dark:text-gray-300 my-7 text-lg">
        {constructorHint ? `new ${constructorHint.name}` : signature.name}
        { `(${signature.parameters.map((p) => p.name).join(", ")})`}
      </h3>
      {signature.comment.description && (
        <p class="mb-5">{signature.comment.description}</p>
      )}
      {signature.comment.blockTags?.map((tag) => (
        <RenderBlockquote data={tag} />
      )) || []}
      {shouldRecurse &&
        (data.signatures.length > 1 ? (
          <>
            <details class="mt-8 w-full sm:mt-0">
              <summary>All {data.signatures.length} Signatures</summary>
              {data.signatures.map((s) => (
                <RenderMethod data={data} signature={s} />
              ))}
            </details>
          </>
        ) : null)}

      {/* <div class="mt-8 w-full sm:mt-0">
				Debug Data:
				{JSONDisplay(data)}
			</div> */}
    </div>
  );
}
