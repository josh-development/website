import hljs from 'highlight.js/lib/core';
import { default as javascript, default as typescript } from 'highlight.js/lib/languages/typescript';
import MarkdownIt from 'markdown-it';
import { Link, useNavigate, useParams } from 'solid-app-router';
import { FiChevronDown } from 'solid-icons/fi';
import { createMemo, createSignal, Show } from 'solid-js';
import { ProjectParser } from 'typedoc-json-parser';
import packages from '../store/packages';
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);

const DocsPage = () => {
  const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight(str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(str, { language: lang }).value;
        } catch (__) {}
      }

      return ''; // use external default escaping
    }
  });

  const [pkgs] = packages;
  const params = useParams();
  const router = useNavigate();
  const [selectedPkg, setPackage] = createSignal<ProjectParser>();
  const toIterate = createMemo(() => {
    if (params.type === 'methods') {
      return selectedPkg() ? selectedPkg()!.classes.flatMap((x) => x.methods.map((m) => ({ ...m, from: x }))) : [];
    }

    return [];
  });

  const choosePackage = async (name: string) => {
    const found = pkgs().find((x) => x.name === name);
    const stored = localStorage.getItem(`docs-${name}`);
    let json;

    if (stored) {
      json = JSON.parse(stored);
    } else {
      json = await fetch(found!.url).then((r) => r.json());
      localStorage.setItem(`docs-${name}`, JSON.stringify(json));
    }

    const proj = new ProjectParser({ data: json });

    setPackage(proj);
  };

  if (params.pkg) {
    if (!selectedPkg()) {
      void choosePackage(params.pkg);
    }
  }

  return (
    <div class='min-h-[100vh] flex pt-5'>
      <div class='w-72'>
        {pkgs().map((pkg) => (
          <div
            class={`transition my-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 ${
              params.pkg === pkg.name ? 'dark:bg-zinc-800 bg-gray-100' : ''
            }`}
          >
            <button
              onClick={() => {
                if (params.pkg === pkg.name) {
                  router('/docs');
                  setTimeout(() => {
                    setPackage();
                  }, 250);
                } else {
                  void choosePackage(pkg.name);
                  router(`/docs/${pkg.name}`);
                }
              }}
              class='w-full py-2 px-3'
            >
              <div class='flex text-[14px] tracking-widest'>
                <p class='dark:text-white font-bold'>{pkg.name}</p>
                <span class='ml-auto dark:text-white pt-0.5'>
                  <FiChevronDown class='transition' style={{ transform: params.pkg === pkg.name ? 'rotate(0deg)' : 'rotate(90deg)' }}></FiChevronDown>
                </span>
              </div>
            </button>
            <div style={{ 'max-height': params.pkg === pkg.name ? '1000px' : '0px' }} class='transition-all overflow-hidden'>
              <div class='pl-6 pb-3 dark:text-zinc-300 text-[13px] tracking-widest'>
                <Link href={`/docs/${pkg.name}/methods`}>
                  <h3>Methods</h3>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div class='w-full pb-10'>
        <div class='transition-all' style={{ opacity: params.pkg ? 1 : 0 }}>
          <Show when={selectedPkg()}>
            <Show when={!params.type}>
              <div
                class='prose pl-10 pr-40 max-w-full prose-h1:font-normal prose-img:my-1 prose-img:inline prose-hr:my-3 prose-h2:mt-2 dark:prose-invert'
                innerHTML={md.render(selectedPkg()!.readme || '')}
              ></div>
            </Show>
            <Show when={params.type}>
              <div class='px-10'>
                <h1 class='dark:text-white text-4xl font-ledger'>{params.type[0].toUpperCase() + params.type.slice(1)}</h1>
                {toIterate().map((method) => (
                  <div id={method.name}>
                    <div class='my-4'>
                      {method.signatures.map((sig) => (
                        <div>
                          <h1
                            class='text-2xl dark:text-white cursor-pointer'
                            onClick={() => router(`/docs/${params.pkg}/${params.type}#${method.name}`)}
                          >
                            <code>
                              {method.from.name}.{sig.name}
                              {sig.typeParameters.length > 0 ?? '<'}
                              {sig.typeParameters.map((x) => x.name + (x.default ? `=${x.default}` : '')).join(', ')}
                              {sig.typeParameters.length > 0 ?? '>'}()
                            </code>
                          </h1>

                          <div class='dark:text-zinc-200 my-4' innerHTML={md.render(sig.comment.description || '')}></div>
                          <Show when={sig.parameters.length > 0}>
                            <div class='overflow-x-auto relative w-full sm:w-1/2 shadow-md sm:rounded-lg'>
                              <table class='text-sm w-full text-left text-gray-500 dark:text-gray-400'>
                                <thead class='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
                                  <tr>
                                    <th scope='col' class='py-3 px-6'>
                                      Parameter
                                    </th>
                                    <th scope='col' class='py-3 px-6'>
                                      Type
                                    </th>
                                    {/* <th scope='col' class='py-3 px-6'>
                                    Description
                                  </th> */}
                                  </tr>
                                </thead>
                                <tbody>
                                  {sig.parameters.map((param) => (
                                    <tr class='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                                      <th scope='row' class='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        {param.name}
                                      </th>
                                      <td class='py-4 px-6'>{param.type.toString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </Show>
                          <div class='prose my-3' innerHTML={md.render(sig.comment.example.map((x) => x.text).join('\n'))}></div>
                        </div>
                      ))}
                    </div>

                    <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
                  </div>
                ))}
              </div>
            </Show>
          </Show>
        </div>
      </div>
    </div>
  );
};

export default DocsPage;
