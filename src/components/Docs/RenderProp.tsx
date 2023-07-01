import CoreCode from "../Core/Code";
import RenderBlockquote from './RenderBlockquote';
const JSONDisplay = (data: unknown) => <CoreCode text={JSON.stringify(data, null, 2)} language="json" />

interface displayProp {
	name: string;
	description: string | null;
	paramaters: [
		{
			name: string;
			description: string;
			type: string;
			required: boolean;
		}
	] | null; // Null for property, empty array for method
	blockTags: { name: string, text: string }[] | null;
}

export default function RenderProp({ data }: { data: displayProp }) {
	return (
		<div class="mb-5">
			<h3 class="dark:text-gray-300 my-7 text-lg">
				{data.name}{data.paramaters ? `(${data.paramaters.map((p) => p.name).join(", ")})` : ""}
			</h3>
			{data.description && <p class="mb-5">{data.description}</p>}
			{data.blockTags?.map((tag) =>
				<RenderBlockquote data={tag} />
			) || []}
			<div class="mt-8 w-full sm:mt-0">
				Debug Data:
				{JSONDisplay(data)}
			</div>
		</div>
	);
}
