import type {
  ClassParser,
  MethodParser,
  SignatureParser,
} from "typedoc-json-parser";
import JSONDisplay from "./JSONDisplay";
import RenderBlockquote from "./RenderBlockquote";

export default function RenderConstructor({
  data,
}: {
  data: ClassParser;
}) {
  return (
    <div class="mb-5">
      <h3 class="dark:text-gray-300 my-7 text-lg">
        {`new ${data.name}`}
        {`(${data.construct.parameters.map((p) => p.name).join(", ")})`}
      </h3>
      {data.comment.description && (
        <p class="mb-5">{data.comment.description}</p>
      )}
      {data.comment.blockTags?.map((tag) => (
        <RenderBlockquote data={tag} />
      )) || []}
      {/* <div class="mt-8 w-full sm:mt-0">
				Debug Data:
				{JSONDisplay(data)}
			</div> */}
    </div>
  );
}
