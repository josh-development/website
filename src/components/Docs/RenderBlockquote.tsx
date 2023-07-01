import CoreCode from "../Core/Code";

const JSONDisplay = (data: unknown) => <CoreCode text={JSON.stringify(data, null, 2)} language="json" />

export default function RenderBlockquote({ data }: { data: { name: string, text: string } }) {
    switch (data.name) {
        case "see":
            return (
                <>
                    <h3 class="dark:text-gray-300 my-7 text-lg">
                        See
                    </h3>
                    {<p class="mb-5">{data.text}</p>}
                    <div class="mt-8 w-full sm:mt-0">
                        Debug Data:
                        {JSONDisplay(data)}
                    </div>
                </>);
        default:
            console.log("Unknown prop", data);
            return (<></>);
    }
}