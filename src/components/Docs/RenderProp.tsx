import type { PropertyParser } from 'typedoc-json-parser';
import RenderBlockquote from './RenderBlockquote';


export default function RenderProp({ data }: { data: PropertyParser }) {
	if(data.name === 'constructor') console.log(data)
	return (
    <div class="mb-5">
      <h3 class="dark:text-gray-300 my-7 text-lg">
        {data.name}
      </h3>
      {data.comment.description && (
        <p class="mb-5">{data.comment.description}</p>
      )}
      {data.comment.blockTags?.map((tag) => <RenderBlockquote data={tag} />) ||
        []}
    </div>
  );
}
