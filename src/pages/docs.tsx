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
    if (pkgs.loading) {
      setTimeout(() => {
        void choosePackage(name);
      }, 100);

      return;
    }

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
    <div class='min-h-[100vh] sm:flex pt-5'>
      <Show when={pkgs.loading}>
        <div class='w-full justify-center flex pt-[25vh]'>
          <svg
            aria-hidden='true'
            class='mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-green-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            />
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            />
          </svg>
          <span class='sr-only'>Loading...</span>
        </div>
      </Show>
      <Show when={!pkgs.loading}>
        <div class='sm:w-72'>
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
                    <FiChevronDown
                      class='transition'
                      style={{ transform: params.pkg === pkg.name ? 'rotate(0deg)' : 'rotate(90deg)' }}
                    ></FiChevronDown>
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
                  class='prose sm:pl-10 sm:pr-40 max-w-full prose-h1:font-normal prose-img:my-1 prose-img:inline prose-hr:my-3 prose-h2:mt-2 dark:prose-invert'
                  innerHTML={md.render(selectedPkg()!.readme || '')}
                ></div>
              </Show>
              <Show when={params.type}>
                <div class='pt-4 sm:pt-0 sm:px-10'>
                  <h1 class='dark:text-white text-4xl font-ledger'>{params.type[0].toUpperCase() + params.type.slice(1)}</h1>
                  <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
                  <div class='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-4 gap-y-2 my-4'>
                    {toIterate().map((method) => (
                      <Link
                        class='text-lg hover:opacity-70 transition dark:text-white break-words'
                        href={`/docs/${params.pkg}/${params.type}#${method.name}`}
                      >
                        <h1>
                          {method.from.name}.{method.name}
                        </h1>
                      </Link>
                    ))}
                  </div>
                  <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
                  {toIterate().map((method) => (
                    <div id={method.name}>
                      <div class='my-4'>
                        {method.signatures.map((sig) => (
                          <div>
                            <Link class='hover:opacity-70 transition' href={`/docs/${params.pkg}/${params.type}#${method.name}`}>
                              <h1 class='text-2xl dark:text-white'>
                                <code>
                                  <span class='text-primary'>{`${method.accessibility} `}</span>
                                  {method.from.name}.{sig.name}
                                  {sig.typeParameters.length > 0 ? '<' : ''}
                                  {sig.typeParameters.map((x) => x.name + (x.default ? `=${x.default}` : '')).join(', ')}
                                  {sig.typeParameters.length > 0 ? '>' : ''}(
                                  {sig.parameters
                                    .map((x) => `${x.name}: ${x.type.toString().split('.')[x.type.toString().split('.').length - 1]}`)
                                    .join(', ')}
                                  )
                                </code>
                              </h1>
                            </Link>

                            <div class='dark:text-zinc-200 my-4' innerHTML={md.render(sig.comment.description || '')}></div>
                            <Show when={sig.parameters.length > 0}>
                              <div class='overflow-x-auto relative w-full sm:w-3/5 border-2 dark:border-0 sm:rounded-lg'>
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
                                      <tr class='border-b dark:bg-gray-800 dark:border-gray-700'>
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
                            <div
                              class='prose prose-pre:my-4 my-3 text-lg tracking-wide'
                              innerHTML={md.render(sig.comment.example.map((x) => x.text).join('\n'))}
                            ></div>
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
      </Show>
    </div>
  );
};

export default DocsPage;
