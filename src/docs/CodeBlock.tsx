import { md } from "../utils/mdit"

export const CodeBlock = ({code, lang}:{code:string, lang:string}) => {
  return <>
    <div innerHTML={md.render('```' + lang + "\n" + code + "\n```")}></div>
  </>
}