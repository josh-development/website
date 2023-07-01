/* empty css                          */import { c as createAstro, a as createComponent, r as renderTemplate, b as addAttribute, s as spreadAttributes, u as unescapeHTML, d as renderComponent, F as Fragment, _ as __astro_tag_component__, e as renderHead, f as renderSlot } from '../renderers.mjs';
import { ssrElement, mergeProps, ssr, ssrHydrationKey, escape, ssrAttribute, createComponent as createComponent$1 } from 'solid-js/web';
import { createSignal, Show, onMount, createMemo, onCleanup } from 'solid-js';
import HighlightJS from 'highlight.js/lib/core';
import typescript from 'highlight.js/lib/languages/typescript';
import 'cookie';
import 'kleur/colors';
import '@astrojs/internal-helpers/path';
import 'path-to-regexp';
import 'mime';
import 'string-width';
import 'fs';
import 'node:fs/promises';
import 'node:url';
import 'node:fs';
import 'node:path';
import 'mime/lite.js';
import 'path';
import 'html-escaper';
import 'node:worker_threads';
import 'os';
import 'url';
import 'module';
import 'worker_threads';

const $$Astro$a = createAstro();
const $$OpenGraphArticleTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$a, $$props, $$slots);
  Astro2.self = $$OpenGraphArticleTags;
  const { publishedTime, modifiedTime, expirationTime, authors, section, tags } = Astro2.props.openGraph.article;
  return renderTemplate`${publishedTime ? renderTemplate`<meta property="article:published_time"${addAttribute(publishedTime, "content")}>` : null}
${modifiedTime ? renderTemplate`<meta property="article:modified_time"${addAttribute(modifiedTime, "content")}>` : null}
${expirationTime ? renderTemplate`<meta property="article:expiration_time"${addAttribute(expirationTime, "content")}>` : null}
${authors ? authors.map((author) => renderTemplate`<meta property="article:author"${addAttribute(author, "content")}>`) : null}
${section ? renderTemplate`<meta property="article:section"${addAttribute(section, "content")}>` : null}
${tags ? tags.map((tag) => renderTemplate`<meta property="article:tag"${addAttribute(tag, "content")}>`) : null}`;
}, "C:/Development/josh-development/website/node_modules/astro-seo/src/components/OpenGraphArticleTags.astro");

const $$Astro$9 = createAstro();
const $$OpenGraphBasicTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$OpenGraphBasicTags;
  const { openGraph } = Astro2.props;
  return renderTemplate`<meta property="og:title"${addAttribute(openGraph.basic.title, "content")}>
<meta property="og:type"${addAttribute(openGraph.basic.type, "content")}>
<meta property="og:image"${addAttribute(openGraph.basic.image, "content")}>
<meta property="og:url"${addAttribute(openGraph.basic.url || Astro2.url.href, "content")}>`;
}, "C:/Development/josh-development/website/node_modules/astro-seo/src/components/OpenGraphBasicTags.astro");

const $$Astro$8 = createAstro();
const $$OpenGraphImageTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$OpenGraphImageTags;
  const { image } = Astro2.props.openGraph.basic;
  const { secureUrl, type, width, height, alt } = Astro2.props.openGraph.image;
  return renderTemplate`<meta property="og:image:url"${addAttribute(image, "content")}>
${secureUrl ? renderTemplate`<meta property="og:image:secure_url"${addAttribute(secureUrl, "content")}>` : null}
${type ? renderTemplate`<meta property="og:image:type"${addAttribute(type, "content")}>` : null}
${width ? renderTemplate`<meta property="og:image:width"${addAttribute(width, "content")}>` : null}
${!(height === null) ? renderTemplate`<meta property="og:image:height"${addAttribute(height, "content")}>` : null}
${!(alt === null) ? renderTemplate`<meta property="og:image:alt"${addAttribute(alt, "content")}>` : null}`;
}, "C:/Development/josh-development/website/node_modules/astro-seo/src/components/OpenGraphImageTags.astro");

const $$Astro$7 = createAstro();
const $$OpenGraphOptionalTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$OpenGraphOptionalTags;
  const { optional } = Astro2.props.openGraph;
  return renderTemplate`${optional.audio ? renderTemplate`<meta property="og:audio"${addAttribute(optional.audio, "content")}>` : null}
${optional.description ? renderTemplate`<meta property="og:description"${addAttribute(optional.description, "content")}>` : null}
${optional.determiner ? renderTemplate`<meta property="og:determiner"${addAttribute(optional.determiner, "content")}>` : null}
${optional.locale ? renderTemplate`<meta property="og:locale"${addAttribute(optional.locale, "content")}>` : null}
${optional.localeAlternate?.map((locale) => renderTemplate`<meta property="og:locale:alternate"${addAttribute(locale, "content")}>`)}
${optional.siteName ? renderTemplate`<meta property="og:site_name"${addAttribute(optional.siteName, "content")}>` : null}
${optional.video ? renderTemplate`<meta property="og:video"${addAttribute(optional.video, "content")}>` : null}`;
}, "C:/Development/josh-development/website/node_modules/astro-seo/src/components/OpenGraphOptionalTags.astro");

const $$Astro$6 = createAstro();
const $$ExtendedTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$ExtendedTags;
  const { props } = Astro2;
  return renderTemplate`${props.extend.link?.map((attributes) => renderTemplate`<link${spreadAttributes(attributes)}>`)}
${props.extend.meta?.map(({ content, httpEquiv, name, property }) => renderTemplate`<meta${addAttribute(content, "content")}${addAttribute(httpEquiv, "http-equiv")}${addAttribute(name, "name")}${addAttribute(property, "property")}>`)}`;
}, "C:/Development/josh-development/website/node_modules/astro-seo/src/components/ExtendedTags.astro");

const $$Astro$5 = createAstro();
const $$TwitterTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$TwitterTags;
  const { card, site, title, creator, description, image, imageAlt } = Astro2.props.twitter;
  return renderTemplate`${card ? renderTemplate`<meta name="twitter:card"${addAttribute(card, "content")}>` : null}
${site ? renderTemplate`<meta name="twitter:site"${addAttribute(site, "content")}>` : null}
${title ? renderTemplate`<meta name="twitter:title"${addAttribute(title, "content")}>` : null}
${image ? renderTemplate`<meta name="twitter:image"${addAttribute(image, "content")}>` : null}
${imageAlt ? renderTemplate`<meta name="twitter:image:alt"${addAttribute(imageAlt, "content")}>` : null}
${description ? renderTemplate`<meta name="twitter:description"${addAttribute(description, "content")}>` : null}
${creator ? renderTemplate`<meta name="twitter:creator"${addAttribute(creator, "content")}>` : null}`;
}, "C:/Development/josh-development/website/node_modules/astro-seo/src/components/TwitterTags.astro");

const $$Astro$4 = createAstro();
const $$LanguageAlternatesTags = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$LanguageAlternatesTags;
  const { languageAlternates } = Astro2.props;
  return renderTemplate`${languageAlternates.map((alternate) => renderTemplate`<link rel="alternate"${addAttribute(alternate.hrefLang, "hreflang")}${addAttribute(alternate.href, "href")}>`)}`;
}, "C:/Development/josh-development/website/node_modules/astro-seo/src/components/LanguageAlternatesTags.astro");

const $$Astro$3 = createAstro();
const $$SEO = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$SEO;
  Astro2.props.surpressWarnings = true;
  function validateProps(props) {
    if (props.openGraph) {
      if (!props.openGraph.basic || props.openGraph.basic.title == null || props.openGraph.basic.type == null || props.openGraph.basic.image == null) {
        throw new Error(
          "If you pass the openGraph prop, you have to at least define the title, type, and image basic properties!"
        );
      }
    }
    if (props.title && props.openGraph?.basic.title) {
      if (props.title == props.openGraph.basic.title && !props.surpressWarnings) {
        console.warn(
          "WARNING(astro-seo): You passed the same value to `title` and `openGraph.optional.title`. This is most likely not what you want. See docs for more."
        );
      }
    }
    if (props.openGraph?.basic?.image && !props.openGraph?.image?.alt && !props.surpressWarnings) {
      console.warn(
        "WARNING(astro-seo): You defined `openGraph.basic.image`, but didn't define `openGraph.image.alt`. This is stongly discouraged.'"
      );
    }
  }
  validateProps(Astro2.props);
  let updatedTitle = "";
  if (Astro2.props.title) {
    updatedTitle = Astro2.props.title;
    if (Astro2.props.titleTemplate) {
      updatedTitle = Astro2.props.titleTemplate.replace(/%s/g, updatedTitle);
    }
  } else if (Astro2.props.titleDefault) {
    updatedTitle = Astro2.props.titleDefault;
  }
  return renderTemplate`${updatedTitle ? renderTemplate`<title>${unescapeHTML(updatedTitle)}</title>` : null}

${Astro2.props.charset ? renderTemplate`<meta${addAttribute(Astro2.props.charset, "charset")}>` : null}

<link rel="canonical"${addAttribute(Astro2.props.canonical || Astro2.url.href, "href")}>

${Astro2.props.description ? renderTemplate`<meta name="description"${addAttribute(Astro2.props.description, "content")}>` : null}

<meta name="robots"${addAttribute(`${Astro2.props.noindex ? "noindex" : "index"}, ${Astro2.props.nofollow ? "nofollow" : "follow"}`, "content")}>

${Astro2.props.openGraph && renderTemplate`${renderComponent($$result, "OpenGraphBasicTags", $$OpenGraphBasicTags, { ...Astro2.props })}`}
${Astro2.props.openGraph?.optional && renderTemplate`${renderComponent($$result, "OpenGraphOptionalTags", $$OpenGraphOptionalTags, { ...Astro2.props })}`}
${Astro2.props.openGraph?.image && renderTemplate`${renderComponent($$result, "OpenGraphImageTags", $$OpenGraphImageTags, { ...Astro2.props })}`}
${Astro2.props.openGraph?.article && renderTemplate`${renderComponent($$result, "OpenGraphArticleTags", $$OpenGraphArticleTags, { ...Astro2.props })}`}
${Astro2.props.twitter && renderTemplate`${renderComponent($$result, "TwitterTags", $$TwitterTags, { ...Astro2.props })}`}
${Astro2.props.extend && renderTemplate`${renderComponent($$result, "ExtendedTags", $$ExtendedTags, { ...Astro2.props })}`}
${Astro2.props.languageAlternates && renderTemplate`${renderComponent($$result, "LanguageAlternatesTags", $$LanguageAlternatesTags, { ...Astro2.props })}`}`;
}, "C:/Development/josh-development/website/node_modules/astro-seo/src/SEO.astro");

const userAgents = [
  // this must always be the first element here!
  {
    name: "woff",
    ua: "Mozilla/5.0 (Windows NT 10.0; Trident/7.0; rv:11.0) like Gecko"
  },
  // from: https://github.com/fontsource/google-font-metadata/blob/main/data/user-agents.json
  {
    name: "woff2",
    ua: 'Mozilla/5.0 (Windows NT 6.3; rv:39.0) Gecko/20100101 Firefox/44.0"'
  }
];
function downloadFontCSS(url) {
  const fontDownloads = Promise.all(
    userAgents.map((entry) => {
      return fetch(url, { headers: { "User-Agent": entry.ua } }).then((res) => res.text()).then(
        (t) => t.replace(/  +/g, "").replace(/\t+/g, "").replace(/\n+/g, "")
      );
    })
  );
  return fontDownloads.then((contents) => contents.join(" "));
}

const $$Astro$2 = createAstro();
const $$GoogleFontsOptimizer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$GoogleFontsOptimizer;
  const props = Astro2.props;
  const urls = Array.isArray(props.url) ? props.url : [props.url];
  const contents = await Promise.all(urls.map((url) => downloadFontCSS(url)));
  return renderTemplate`${contents.length > 0 && renderTemplate`<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">`}
${contents.map(
    (styles) => renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`
    <style type="text/css">${unescapeHTML(styles)}</style>
` })}`
  )}`;
}, "C:/Development/josh-development/website/node_modules/astro-google-fonts-optimizer/GoogleFontsOptimizer.astro");

const _tmpl$$c = "<path fill=\"currentColor\" d=\"M12.001 2c-5.525 0-10 4.475-10 10a9.994 9.994 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.563 4.938c.363.312.676.912.676 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10Z\"></path>";
const _arrow_function$7 = (props = {}) => ssrElement("svg", mergeProps({
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, props), () => ssr(_tmpl$$c), true);

__astro_tag_component__(_arrow_function$7, "@astrojs/solid-js");

const _tmpl$$b = "<path fill=\"currentColor\" d=\"M19.27 5.33C17.94 4.71 16.5 4.26 15 4a.09.09 0 0 0-.07.03c-.18.33-.39.76-.53 1.09a16.09 16.09 0 0 0-4.8 0c-.14-.34-.35-.76-.54-1.09c-.01-.02-.04-.03-.07-.03c-1.5.26-2.93.71-4.27 1.33c-.01 0-.02.01-.03.02c-2.72 4.07-3.47 8.03-3.1 11.95c0 .02.01.04.03.05c1.8 1.32 3.53 2.12 5.24 2.65c.03.01.06 0 .07-.02c.4-.55.76-1.13 1.07-1.74c.02-.04 0-.08-.04-.09c-.57-.22-1.11-.48-1.64-.78c-.04-.02-.04-.08-.01-.11c.11-.08.22-.17.33-.25c.02-.02.05-.02.07-.01c3.44 1.57 7.15 1.57 10.55 0c.02-.01.05-.01.07.01c.11.09.22.17.33.26c.04.03.04.09-.01.11c-.52.31-1.07.56-1.64.78c-.04.01-.05.06-.04.09c.32.61.68 1.19 1.07 1.74c.03.01.06.02.09.01c1.72-.53 3.45-1.33 5.25-2.65c.02-.01.03-.03.03-.05c.44-4.53-.73-8.46-3.1-11.95c-.01-.01-.02-.02-.04-.02zM8.52 14.91c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.84 2.12-1.89 2.12zm6.97 0c-1.03 0-1.89-.95-1.89-2.12s.84-2.12 1.89-2.12c1.06 0 1.9.96 1.89 2.12c0 1.17-.83 2.12-1.89 2.12z\"></path>";
const _arrow_function$6 = (props = {}) => ssrElement("svg", mergeProps({
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, props), () => ssr(_tmpl$$b), true);

__astro_tag_component__(_arrow_function$6, "@astrojs/solid-js");

const _tmpl$$a = "<g id=\"feMoon0\" fill=\"none\" fill-rule=\"evenodd\" stroke=\"none\" stroke-width=\"1\"><g id=\"feMoon1\" fill=\"currentColor\"><path id=\"feMoon2\" d=\"M12.97 3a8.02 8.02 0 0 0-4.054 7c0 4.418 3.522 8 7.866 8c1.146 0 2.236-.25 3.218-.698C18.39 19.544 15.787 21 12.849 21C7.962 21 4 16.97 4 12s3.962-9 8.849-9h.12Z\"></path></g></g>";
const _arrow_function$5 = (props = {}) => ssrElement("svg", mergeProps({
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, props), () => ssr(_tmpl$$a), true);

__astro_tag_component__(_arrow_function$5, "@astrojs/solid-js");

const _tmpl$$9 = "<g id=\"feSunnyO0\" fill=\"none\" fill-rule=\"evenodd\" stroke=\"none\" stroke-width=\"1\"><g id=\"feSunnyO1\" fill=\"currentColor\" fill-rule=\"nonzero\"><path id=\"feSunnyO2\" d=\"M12 18a6 6 0 1 1 0-12a6 6 0 0 1 0 12Zm0-2a4 4 0 1 0 0-8a4 4 0 0 0 0 8ZM11 2h2v3h-2V2Zm-9 9h3v2H2v-2Zm17 0h3v2h-3v-2Zm-8 8h2v3h-2v-3Zm7.621-15l1.415 1.414l-2.122 2.122L16.5 6.12L18.621 4ZM16.5 17.414L17.914 16l2.122 2.121l-1.415 1.415l-2.121-2.122ZM6.121 16l1.415 1.414l-2.122 2.122L4 18.12L6.121 16ZM4 5.414L5.414 4l2.122 2.121L6.12 7.536L4 5.414Z\"></path></g></g>";
const _arrow_function$4 = (props = {}) => ssrElement("svg", mergeProps({
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, props), () => ssr(_tmpl$$9), true);

__astro_tag_component__(_arrow_function$4, "@astrojs/solid-js");

const _tmpl$$8 = "<g id=\"feTextAlignJustify0\" fill=\"none\" fill-rule=\"evenodd\" stroke=\"none\" stroke-width=\"1\"><g id=\"feTextAlignJustify1\" fill=\"currentColor\"><path id=\"feTextAlignJustify2\" d=\"M19 7H5a1 1 0 1 1 0-2h14a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2Zm0 4H5a1 1 0 0 1 0-2h14a1 1 0 0 1 0 2Z\"></path></g></g>";
const _arrow_function$3 = (props = {}) => ssrElement("svg", mergeProps({
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, props), () => ssr(_tmpl$$8), true);

__astro_tag_component__(_arrow_function$3, "@astrojs/solid-js");

const _tmpl$$7 = "<g id=\"feClose0\" fill=\"none\" fill-rule=\"evenodd\" stroke=\"none\" stroke-width=\"1\"><g id=\"feClose1\" fill=\"currentColor\"><path id=\"feClose2\" d=\"M10.657 12.071L5 6.414L6.414 5l5.657 5.657L17.728 5l1.414 1.414l-5.657 5.657l5.657 5.657l-1.414 1.414l-5.657-5.657l-5.657 5.657L5 17.728z\"></path></g></g>";
const _arrow_function$2 = (props = {}) => ssrElement("svg", mergeProps({
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, props), () => ssr(_tmpl$$7), true);

__astro_tag_component__(_arrow_function$2, "@astrojs/solid-js");

const _tmpl$$6 = ["<nav", "><div class=\"flex justify-between px-5 pt-6 md:px-10 md:pt-4\"><div class=\"hidden md:flex flex-row items-center space-x-6 w-1/3\">", "</div><div class=\"space-x-3 w-1/3 text-center items-center md:justify-center flex\"><h1 class=\"text-2xl leading-6 font-ledger text-gray-800 dark:text-white \"><a href=\"/\">Josh</a></h1></div><div class=\"hidden md:flex ml-auto space-x-3 items-center justify-center\"><!--#-->", "<!--/--><button class=\"dark:text-white border-l dark:border-zinc-700 pl-4 p-1 focus:outline-none focus:ring-none focus:ring-offset-2 focus:ring-gray-800\"><!--#-->", "<!--/--><!--#-->", "<!--/--></button></div><div class=\"focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex justify-center items-center md:hidden cursor-pointer mr-1\">", "</div></div><div style=\"z-index:2\" class=\"", "\"><div>", "</div><div class=\"text-center\">", "</div><div class=\"flex justify-center space-x-4 mt-auto\">", "</div></div></nav>"],
  _tmpl$2$1 = ["<a", " class=\"border-b transition dark:text-white py-2\"", ">", "</a>"],
  _tmpl$3 = ["<a", " target=\"_blank\" rel=\"noopener\"", " class=\"dark:text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800\">", "</a>"],
  _tmpl$4 = ["<a", " class=\"border-b block my-10 mx-20 transition text-white py-2 text-2xl\"", ">", "</a>"],
  _tmpl$5 = ["<a", " target=\"_blank\"", " rel=\"noopener\" class=\"text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800\">", "</a>"];
const icons = [{
  icon: (size = 24) => createComponent$1(_arrow_function$7, {
    height: size,
    width: size
  }),
  href: "https://github.com/josh-development"
}, {
  icon: (size = 24) => createComponent$1(_arrow_function$6, {
    height: size,
    width: size
  }),
  href: "https://discord.evie.dev"
}];
const links = [{
  text: "Home",
  href: "/",
  end: true
}, {
  text: "Documentation",
  href: "/docs",
  end: false
}];
function CoreNavbar({
  darkMode
}) {
  const [showMenu, setShowMenu] = createSignal(false);
  return ssr(_tmpl$$6, ssrHydrationKey(), escape(links.map(link => ssr(_tmpl$2$1, ssrHydrationKey(), ssrAttribute("href", escape(link.href, true), false), escape(link.text)))), escape(icons.map(icon => ssr(_tmpl$3, ssrHydrationKey(), ssrAttribute("href", escape(icon.href, true), false), escape(icon.icon())))), escape(createComponent$1(Show, {
    when: !darkMode,
    get children() {
      return createComponent$1(_arrow_function$5, {
        width: 24,
        height: 24
      });
    }
  })), escape(createComponent$1(Show, {
    when: darkMode,
    get children() {
      return createComponent$1(_arrow_function$4, {
        width: 24,
        height: 24
      });
    }
  })), escape(createComponent$1(_arrow_function$3, {
    onClick: () => setShowMenu(true),
    height: 24,
    width: 24,
    "class": "dark:text-white text-black"
  })), `transition md:hidden w-screen h-screen bg-josh mx-auto fixed top-0 left-0 py-5 px-5 ${showMenu() ? "translate-x-0" : "translate-x-[100vw]"}`, escape(createComponent$1(_arrow_function$2, {
    "class": "ml-auto text-white",
    onClick: () => setShowMenu(false),
    width: 24,
    height: 24
  })), escape(links.map(link => ssr(_tmpl$4, ssrHydrationKey(), ssrAttribute("href", escape(link.href, true), false), escape(link.text)))), escape(icons.map(icon => ssr(_tmpl$5, ssrHydrationKey(), ssrAttribute("href", escape(icon.href, true), false), escape(icon.icon(36))))));
}

__astro_tag_component__(CoreNavbar, "@astrojs/solid-js");

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const _tmpl$$5 = ["<footer", " class=\"w-full border-t border-zinc-800 pt-5 pb-5 px-10\"><div class=\"flex\"><div><h1 class=\"text-4xl dark:text-white font-ledger\">Josh</h1><p class=\"dark:text-gray-300 mt-2\">Copyright \xA9 <!--#-->", "<!--/--> - Josh Team</p></div><div class=\"ml-auto\"><div class=\"flex items-center flex-wrap mt-2 -mr-2 justify-center\">", "</div></div></div></footer>"],
  _tmpl$2 = ["<a", " rel=\"noopener\" target=\"_blank\" class=\"focus:outline-none w-12 h-12 bg-cover bg-center rounded-md -ml-2\"><img loading=\"lazy\" src=\"", "\"", " class=\"h-full w-full bg-white overflow-hidden object-cover rounded-full border-2 border-white shadow\"></a>"];
const urls = ["https://api.github.com/orgs/josh-development/members", "https://api.github.com/repos/josh-development/core/contributors", "https://api.github.com/repos/josh-development/providers/contributors"];
function CoreFooter() {
  const [members, setMembers] = createSignal([]);
  onMount(async () => {
    if (localStorage.getItem("members")) {
      setMembers(JSON.parse(localStorage.getItem("members")));
    } else {
      const promises = [];
      for (const url of urls) {
        const prom = fetch(url).then(res => res.json()).then(data => {
          setMembers(old => [...old, ...data.filter(member => member.type !== "Bot" && !old.some(oldMember => oldMember.id === member.id)).map(member => ({
            login: member.login,
            id: member.id,
            avatar_url: member.avatar_url,
            url: member.url,
            html_url: member.html_url,
            type: member.type
          }))]);
        }).catch(() => {});
        promises.push(prom);
      }
      await Promise.all(promises);
      if (members().length > 0) {
        localStorage.setItem("members", JSON.stringify(members()));
      }
    }
  });
  const shuffledMembers = createMemo(() => {
    return shuffleArray(members()).slice(0, 10);
  });
  return ssr(_tmpl$$5, ssrHydrationKey(), escape( /* @__PURE__ */new Date().getFullYear()), escape(shuffledMembers().map(member => ssr(_tmpl$2, ssrHydrationKey() + ssrAttribute("href", escape(member.html_url, true), false), `${escape(member.avatar_url, true)}&size=48`, ssrAttribute("alt", escape(member.login, true), false)))));
}

__astro_tag_component__(CoreFooter, "@astrojs/solid-js");

const bannerImage = {"src":"/_astro/banner.deeb726d.webp","width":1080,"height":360,"format":"webp"};

const $$Astro$1 = createAstro();
const $$Default = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Default;
  const { title, class: cls } = Astro2.props;
  const defaults = {
    title: "Home",
    description: "JOSH is the JavaScript Object Storage Helper - a simple, effective, and efficient database wrapper written in Typescript"
  };
  const theme = () => {
    if (Astro2.cookies.has("theme")) {
      return Astro2.cookies.get("theme").value;
    }
    return "dark";
  };
  return renderTemplate`<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ${renderComponent($$result, "SEO", $$SEO, { "title": `JoshDB | ${title || defaults.title}`, "description": defaults.description, "openGraph": {
    basic: {
      title: `JoshDB | ${title || defaults.title}`,
      type: "website",
      image: bannerImage.src
    }
  }, "twitter": {
    description: defaults.description,
    image: bannerImage.src
  }, "extend": {
    link: [],
    meta: []
  } })}
    ${renderComponent($$result, "GoogleFontsOptimizer", $$GoogleFontsOptimizer, { "url": "https://fonts.googleapis.com/css2?family=Maven+Pro:wght@200;400;500;700&family=Varela+Round:wght@200;400;500;700&family=Ledger:wght@200;400;500;700&display=swap" })}
  ${renderHead($$result)}</head>
  <body${addAttribute(theme(), "class")}>
    <div${addAttribute("flex flex-col transition dark:bg-zinc-900 bg-zinc-200 " + cls, "class")}>
      ${renderComponent($$result, "CoreNavbar", CoreNavbar, { "client:load": true, "darkMode": theme() === "dark", "client:component-hydration": "load", "client:component-path": "C:/Development/josh-development/website/src/components/Core/Navbar", "client:component-export": "default" })}
      ${renderSlot($$result, $$slots["default"])}
      ${renderComponent($$result, "CoreFooter", CoreFooter, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Development/josh-development/website/src/components/Core/Footer", "client:component-export": "default" })}
    </div>
  </body></html>`;
}, "C:/Development/josh-development/website/src/layouts/default.astro");

const _tmpl$$4 = "<path fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2c2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2a4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6c-.6.6-.6 1.2-.5 2V21\"></path>";
const _arrow_function$1 = (props = {}) => ssrElement("svg", mergeProps({
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, props), () => ssr(_tmpl$$4), true);

__astro_tag_component__(_arrow_function$1, "@astrojs/solid-js");

const _tmpl$$3 = "<g id=\"feBook0\" fill=\"none\" fill-rule=\"evenodd\" stroke=\"none\" stroke-width=\"1\"><g id=\"feBook1\" fill=\"currentColor\" fill-rule=\"nonzero\"><path id=\"feBook2\" d=\"m13 16.006l7-.047V5.992l-5.17.007l-1.814 1.814L13 16.006Zm-2-8.193L9.179 6.038L4 6.003v9.956l7 .047V7.813Zm-1-3.77L12 6l2-2l5.997-.008A2 2 0 0 1 22 5.989v9.97a2 2 0 0 1-1.986 2L14 18l-1.996 2L10 18l-6.014-.041a2 2 0 0 1-1.986-2V6.003a2 2 0 0 1 2-2l6 .04Z\"></path></g></g>";
const _arrow_function = (props = {}) => ssrElement("svg", mergeProps({
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
}, props), () => ssr(_tmpl$$3), true);

__astro_tag_component__(_arrow_function, "@astrojs/solid-js");

const _tmpl$$2 = ["<pre", " class=\"bg-zinc-800 overflow-auto px-6 font-maven text-white rounded-lg shadow-xl py-8 xl:px-10 text-sm sm:text-md xl:text-lg sm:py-10\">", "</pre>"];
HighlightJS.registerLanguage("typescript", typescript);
function CoreMarkdown({
  text
}) {
  const html = HighlightJS.highlight(text, {
    language: "ts"
  }).value;
  return ssr(_tmpl$$2, ssrHydrationKey(), html);
}

__astro_tag_component__(CoreMarkdown, "@astrojs/solid-js");

const _tmpl$$1 = ["<a", " class=\"flex font-maven dark:text-white\" target=\"_blank\" href=\"", "\" rel=\"noopener\"><span>@joshdb/<span class=\"text-josh\">", "</span></span><span class=\"h-5 mt-1.5 bg-zinc-800 dark:bg-gray-300 animate-cursor w-0.5 ml-0.5\"></span></a>"];
const subtitlePackageList = ["core", "mongo", "json", "redis", "sqlite", "postgres"
// to be generate dynamically later...
];

function HomeSubtitle() {
  const [subtitleIndex, setSubtitleIndex] = createSignal(0);
  const [subtitle, setSubtitle] = createSignal(subtitlePackageList[subtitleIndex()]);
  let interval;
  const erase = async () => {
    for (const _ of subtitle()) {
      setSubtitle(subtitle().slice(0, -1));
      await new Promise(r => {
        setTimeout(r, 100);
      });
    }
  };
  const type = async () => {
    for (let i = 0; i < subtitlePackageList[subtitleIndex()].length; i++) {
      setSubtitle(subtitlePackageList[subtitleIndex()].slice(0, i + 1));
      await new Promise(r => {
        setTimeout(r, 100);
      });
    }
  };
  onMount(() => {
    interval = setInterval(async () => {
      await erase();
      setSubtitleIndex((subtitleIndex() + 1) % subtitlePackageList.length);
      await type();
    }, 3e3);
  });
  onCleanup(() => {
    clearInterval(interval);
  });
  return ssr(_tmpl$$1, ssrHydrationKey(), `https://npmjs.org/package/@joshdb/${escape(subtitlePackageList[subtitleIndex()], true)}`, escape(subtitle()));
}

__astro_tag_component__(HomeSubtitle, "@astrojs/solid-js");

const _tmpl$ = ["<div", " class=\"flex flex-col grow h-full md:flex-row gap-x-10 gap-y-8 px-10 items-center h-full pt-4 md:pt-0 pb-10 md:pb-0\"><div class=\"mt-10 md:w-1/2 sm:mt-0\"><h2 class=\"text-xl dark:text-gray-400\">", "</h2><h1 class=\"text-6xl dark:text-gray-100 my-2 font-ledger\">Databases, reimagined</h1><p class=\"dark:text-gray-300 my-7\">Explore the easiest way to quickly, yet efficiently manage lots of different types of databases, all under one easy to use and powerful api. Paired with providers ranging from MongoDB and SQL to JSON, and Middleware such as caching and schema validation, Josh is the easiest way to manage your data.</p><div class=\"space-x-2\"><a href=\"/docs\" class=\"transition shadow-lg hover:opacity-80 duration-300 dark:shadow px-6 py-4 rounded-lg inline-block bg-gradient-to-r from-green-500 to-green-600 text-white\"><div class=\"flex\"><!--#-->", "<!--/--> Documentation</div></a><a target=\"_blank\" rel=\"noopener\" href=\"https://github.com/josh-development/core\" class=\"transition text-white hover:opacity-80 bg-zinc-700 shadow-lg dark:shadow px-6 py-4 rounded-lg inline-block\"><div class=\"flex\"><!--#-->", "<!--/--> Source</div></a></div></div><div class=\"mt-8 w-full md:w-1/2 sm:mt-0\">", "</div></div>"];
const starterCode = `import { Josh } from "@joshdb/core";
  
const josh = new Josh({ name: "website" });

await josh.set("foo", "bar");`;
function HomeLanding() {
  return ssr(_tmpl$, ssrHydrationKey(), escape(createComponent$1(HomeSubtitle, {})), escape(createComponent$1(_arrow_function, {
    "class": "mt-[0.2rem] mr-2"
  })), escape(createComponent$1(_arrow_function$1, {
    "class": "mt-[0.2rem] mr-2"
  })), escape(createComponent$1(CoreMarkdown, {
    text: starterCode
  })));
}

__astro_tag_component__(HomeLanding, "@astrojs/solid-js");

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "DefaultLayout", $$Default, { "class": "min-h-screen", "title": "Home" }, { "default": ($$result2) => renderTemplate`
  ${renderComponent($$result2, "HomeLanding", HomeLanding, { "client:load": true, "client:component-hydration": "load", "client:component-path": "C:/Development/josh-development/website/src/components/Home/Landing", "client:component-export": "default" })}
` })}`;
}, "C:/Development/josh-development/website/src/pages/index.astro");

const $$file = "C:/Development/josh-development/website/src/pages/index.astro";
const $$url = "";

export { $$Index as default, $$file as file, $$url as url };
