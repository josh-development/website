import CoreCode from "../Core/Code";

const codeBlockRegex = /^\s*```(\w+)?\n((?:.|\n)*)\n```\s*$/;

// TODO: parse links in returns and see
export default function RenderBlockquote({ data }: { data: { name: string, text: string } }) {
    switch (data.name) {
        case "see":
            return (
                <>
                    <h3 class="dark:text-gray-300 my-3 text-lg">
                        See
                    </h3>
                    {<p class="mb-5">{data.text}</p>}
                </>);

        case "since":
            return (
                <>
                    <h3 class="dark:text-gray-300 my-3 text-lg">
                        Since
                    </h3>
                    {<p class="mb-5">{data.text}</p>}
                </>);
        case "example":
          const [,lang = "js", code] = codeBlockRegex.exec(data.text) || [];
          if(!code) return (<></>);
          return (
            <>
              <h3 class="dark:text-gray-300 my-3 text-lg">
                Example
              </h3>
              <CoreCode text={code} language={lang} />
            </>);
          case "returns":
            return (
              <>
                <h3 class="dark:text-gray-300 my-3 text-lg">
                  Returns
                </h3>
                {<p class="mb-5">{data.text}</p>}
              </>);
        default:
            console.log("Unknown prop", data);
            return (<></>);
    }
}
