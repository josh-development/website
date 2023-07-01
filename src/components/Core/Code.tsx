import HighlightJS from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";

HighlightJS.registerLanguage("typescript", typescript);
HighlightJS.registerLanguage("javascript", javascript);
HighlightJS.registerLanguage("json", json);

import "highlight.js/styles/tokyo-night-dark.css";

export default function CoreMarkdown({ text, language = "ts" }: { text: string, language: string }) {
	const html = HighlightJS.highlight(text, { language }).value;

	return (
		<pre
			class="bg-zinc-800 overflow-auto px-6 font-maven text-white rounded-lg shadow-xl py-8 xl:px-10 text-sm sm:text-md xl:text-lg sm:py-10 glass"
			innerHTML={html}
		/>
	);
}
