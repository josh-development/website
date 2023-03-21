import hljs from 'highlight.js/lib/core';
import { default as diff } from 'highlight.js/lib/languages/diff';
import { default as script } from 'highlight.js/lib/languages/typescript';

import MarkdownIt from 'markdown-it';

import 'highlight.js/styles/tokyo-night-dark.css';

hljs.registerLanguage('typescript', script);
hljs.registerLanguage('ts', script);
hljs.registerLanguage('javascript', script);
hljs.registerLanguage('js', script);
hljs.registerLanguage('diff', diff);

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
