import HighlightJS from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';

HighlightJS.registerLanguage('typescript', typescript);

import 'highlight.js/styles/tokyo-night-dark.css';

export default function CoreMarkdown({ text }: { text: string }) {
  const html = HighlightJS.highlight(text, { language: 'ts' }).value;

  return (
    <pre
      class="bg-zinc-800 overflow-auto px-6 font-maven text-white rounded-lg shadow-xl py-8 xl:px-10 text-sm sm:text-md xl:text-lg sm:py-10"
      innerHTML={html}
    ></pre>
  );
}
