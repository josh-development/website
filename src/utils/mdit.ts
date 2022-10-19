import hljs from 'highlight.js/lib/core';
import { default as javascript, default as typescript } from 'highlight.js/lib/languages/typescript';
import MarkdownIt from 'markdown-it';

import 'highlight.js/styles/tokyo-night-dark.css';

hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('ts', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('js', javascript);

export const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(str, { language: lang }).value;
      } catch (__) {}
    }

    return '';
  }
});
