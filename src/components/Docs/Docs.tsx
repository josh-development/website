import CoreCode from "../Core/Code";
import RenderProp from "./RenderProp";

const whitelist = {
    classes: [
        'Josh',
    ]
};

const JSONDisplay = (data: unknown) => <CoreCode text={JSON.stringify(data, null, 2)} language="json" />

export default function Docs({ data }: { data: unknown }) {
    return (
        <>
            <h2 class="dark:text-gray-300 my-7 text-xl">
                {data.name} v{data.version}
            </h2>
            {
                data.classes.filter((c: unknown) => whitelist.classes.includes(c.name))
                    .map((c: any) => (<>
                        <RenderProp data={{
                            name: `new ${c.name}`,
                            paramaters: c.construct.parameters,
                            description: c.construct.comment?.description || c.comment?.description,
                            blockTags: c.construct.comment?.blockTags?.lenght ? c.construct.comment?.blockTags : c.comment?.blockTags,
                        }} />
                        <div class="mb-5">
                            <h3 class="dark:text-gray-300 my-7 text-lg">
                                new {c.name}({c.construct.parameters.map((p: any) => p.name).join(', ')})
                            </h3>
                            <div class="mt-8 w-full sm:mt-0">
                                {JSONDisplay(c)}
                            </div>
                        </div>
                    </>
                    ))
            }
            {/* <div class="mt-8 w-full sm:mt-0">
                {JSONDisplay(data)}
            </div> */}
        </>
    );
}
