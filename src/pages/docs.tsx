import { Link, useLocation, useNavigate, useParams } from 'solid-app-router';
import { FiChevronDown } from 'solid-icons/fi';
import { createMemo, createSignal, onCleanup, Show } from 'solid-js';
import { ProjectParser } from 'typedoc-json-parser';
import GettingStarted from '../docs/getting-started.mdx';
import Providers from '../docs/providers.mdx';
import packages from '../store/packages';
import { md } from '../utils/mdit';

const DocsPage = () => {
  let sideBar: HTMLDivElement | undefined;
  const [pkgs] = packages;
  const p = useParams() as { type: string | null; pkg: string | null; page: string | null; category: string | null };
  const params = createMemo(() => {
    return {
      type: p.type ? p.type.toLowerCase() : '',
      pkg: p.pkg ? p.pkg.toLowerCase() : '',
      page: p.page ? p.page.toLowerCase() : '',
      category: p.category ? p.category.toLowerCase() : ''
    };
  });

  const location = useLocation();
  const router = useNavigate();
  const [selectedPkg, setPackage] = createSignal<ProjectParser>();
  const [scrollValue, setScroll] = createSignal(window.innerWidth < 640 ? 0 : window.scrollY);
  const updateScroll = (forced = false, smooth = false) => {
    if (forced) {
      setTimeout(() => {
        updateScroll(false, true);
      }, 50);

      return;
    }

    setScroll(window.scrollY);

    if (sideBar) {
      const perc = scrollValue() / document.body.scrollHeight;
      const max = sideBar.scrollHeight - sideBar.clientHeight;

      sideBar.scrollTo({ top: perc * max, behavior: smooth ? 'smooth' : 'auto' });
    }
  };

  const ev = () => updateScroll();

  if (window.innerWidth > 640) window.addEventListener('scroll', ev, { passive: true });

  onCleanup(() => {
    window.removeEventListener('scroll', ev);
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

    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }
  };

  if (params().pkg) {
    if (!selectedPkg()) {
      void choosePackage(params().pkg);
    }
  }

  const allMethods = createMemo(() => {
    return selectedPkg() ? selectedPkg()!.classes.flatMap((x) => x.methods.map((m) => ({ ...m, from: x }))) : [];
  });

  const folders = createMemo(() => {
    const all = [];

    for (const pkg of pkgs()) {
      const folder = pkg.path.split('/')[0];
      const foundIdx = all.findIndex((x) => x.name === folder);

      if (foundIdx === -1) {
        all.push({ name: folder, packages: [pkg] });
      } else {
        all[foundIdx].packages.push(pkg);
      }
    }

    return all;
  });

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
        <div
          class='sm:w-72 sm:max-h-[80vh] will-change-transform'
          style={{ transform: `translateY(${scrollValue() > 20 ? scrollValue() - 20 : 0}px)` }}
        >
          <h1 class='text-primary font-bold text-xl font-ledger'>Documentation</h1>

          <div class='pl-2'>
            <div
              class={`transition my-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                params().category === 'getting-started' ? 'dark:bg-zinc-800 bg-zinc-100' : ''
              }`}
            >
              <button
                onClick={() => {
                  setPackage();
                  if (params().category === 'getting-started') {
                    router('/docs');
                  } else {
                    router(`/docs/guide/getting-started`);
                  }
                }}
                class='w-full py-2 px-3'
              >
                <div class='flex text-[14px] tracking-widest'>
                  <p class='dark:text-white'>Welcome</p>
                  <span class='ml-auto dark:text-white pt-1'>
                    <FiChevronDown
                      class='transition'
                      style={{ transform: params().category === 'getting-started' ? 'rotate(0deg)' : 'rotate(90deg)' }}
                    ></FiChevronDown>
                  </span>
                </div>
              </button>
              <div style={{ 'max-height': params().category === 'getting-started' ? '1000px' : '0px' }} class='transition-all overflow-hidden'>
                <div class='pl-6 pb-3 dark:text-zinc-300 text-[13px] tracking-widest space-y-2 grid'>
                  <Link href={`/docs/guide/getting-started`}>
                    <h3 class={params().page === '' ? 'font-bold' : ''}>Getting Started</h3>
                  </Link>
                  <Link href={`/docs/guide/getting-started/providers`}>
                    <h3 class={params().page === 'providers' ? 'font-bold' : ''}>Providers</h3>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <h1 class='text-primary font-bold text-xl mb-2 mt-4 font-ledger'>API</h1>
          {folders().map((folder) => (
            <div>
              <Show when={folder.packages.length > 1}>
                <h1 class='pl-3 dark:text-primary'>{folder.name}</h1>
              </Show>
              <div class={folder.packages.length > 1 ? 'pl-4' : ''}>
                {folder.packages.map((pkg) => (
                  <div
                    class={`transition my-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                      params().pkg === pkg.name ? 'dark:bg-zinc-800 bg-zinc-100' : ''
                    }`}
                  >
                    <button
                      onClick={() => {
                        if (params().pkg === pkg.name) {
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
                        <p class={folder.packages.length < 2 ? 'dark:text-primary' : 'dark:text-white'}>{pkg.name}</p>
                        <span class='ml-auto dark:text-white pt-1'>
                          <FiChevronDown
                            class='transition'
                            style={{ transform: params().pkg === pkg.name ? 'rotate(0deg)' : 'rotate(90deg)' }}
                          ></FiChevronDown>
                        </span>
                      </div>
                    </button>
                    <div style={{ 'max-height': params().pkg === pkg.name ? '1000px' : '0px' }} class='transition-all overflow-hidden'>
                      <div class='pl-6 pb-3 dark:text-zinc-300 text-[13px] tracking-widest space-y-2 grid'>
                        <Link href={`/docs/${pkg.name}`}>
                          <h3 class={params().pkg === pkg.name && params().type === '' ? 'font-bold' : ''}>README</h3>
                        </Link>
                        <Link href={`/docs/${pkg.name}/methods`}>
                          <h3 class={params().pkg === pkg.name && params().type === 'methods' ? 'font-bold' : ''}>Methods</h3>
                        </Link>
                        <Link href={`/docs/${pkg.name}/interfaces`}>
                          <h3 class={params().pkg === pkg.name && params().type === 'interfaces' ? 'font-bold' : ''}>Interfaces</h3>
                        </Link>
                        <Link href={`/docs/${pkg.name}/classes`}>
                          <h3 class={params().pkg === pkg.name && params().type === 'classes' ? 'font-bold' : ''}>Classes</h3>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div class='w-full'>
          <div>
            <Show when={selectedPkg()}>
              <Show when={params().type.length === 0}>
                <div
                  class='prose prose-pre:bg-zinc-800 sm:pl-10 mb-20 sm:pr-40 max-w-full prose-code:text-mono prose-h1:font-normal prose-img:my-1 prose-img:inline prose-hr:my-3 prose-h2:mt-2 dark:prose-invert'
                  innerHTML={md.render(selectedPkg()!.readme || '')}
                ></div>
              </Show>
              <Show when={params().type === 'methods'}>
                <div class='pt-4 sm:pt-0 sm:px-5'>
                  <h1 class='dark:text-white text-4xl font-ledger'>{params().type[0].toUpperCase() + params().type.slice(1)}</h1>
                  <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
                  {(selectedPkg() ? allMethods() : []).map((method) => (
                    <div id={method.name}>
                      <div class='my-4'>
                        {method.signatures.map((sig) => (
                          <div>
                            <Link
                              onClick={() => updateScroll(true)}
                              class='hover:opacity-70 transition'
                              href={`/docs/${params().pkg}/${params().type}#${method.name}`}
                            >
                              <h1 class='sm:text-lg md:text-2xl dark:text-white break-words'>
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
                                  <thead class='text-xs text-gray-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-gray-400'>
                                    <tr>
                                      <th scope='col' class='py-3 px-6'>
                                        Parameter
                                      </th>
                                      <th scope='col' class='py-3 px-6'>
                                        Type
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {sig.parameters.map((param) => (
                                      <tr class='border-b dark:bg-zinc-800 dark:border-gray-700'>
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
                              class='prose prose-pre:bg-zinc-800 font-mono prose-pre:my-4 my-3 text-lg tracking-wide prose-invert'
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
              <Show when={params().type === 'interfaces'}>
                <div class='pt-4 sm:pt-0 sm:px-10'>
                  <h1 class='dark:text-white text-4xl font-ledger'>{params().type[0].toUpperCase() + params().type.slice(1)}</h1>
                  <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
                  {(selectedPkg() ? selectedPkg()!.interfaces : []).map((intf) => (
                    <div id={intf.name}>
                      <div class='my-4'>
                        <div>
                          <Link
                            onClick={() => updateScroll(true)}
                            class='hover:opacity-70 transition'
                            href={`/docs/${params().pkg}/${params().type}#${intf.name}`}
                          >
                            <h1 class='text-2xl dark:text-white'>
                              <code>{intf.name}</code>
                            </h1>
                          </Link>

                          <div class='dark:text-zinc-200 my-4' innerHTML={md.render(intf.comment.description || '')}></div>

                          <Show when={intf.properties}>
                            <div class='overflow-x-auto relative w-full sm:w-3/5 border-2 dark:border-0 sm:rounded-lg'>
                              <table class='text-sm w-full text-left text-gray-500 dark:text-gray-400'>
                                <thead class='text-xs text-gray-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-gray-400'>
                                  <tr>
                                    <th scope='col' class='py-3 px-6'>
                                      Property
                                    </th>
                                    <th scope='col' class='py-3 px-6'>
                                      Type
                                    </th>
                                    <Show when={intf.properties.find((x) => x.comment.description)}>
                                      <th scope='col' class='py-3 px-6'>
                                        Description
                                      </th>
                                    </Show>
                                  </tr>
                                </thead>
                                <tbody>
                                  {intf.properties.map((prop) => (
                                    <tr class='border-b dark:bg-zinc-800 dark:border-gray-700'>
                                      <th scope='row' class='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        {prop.name}
                                      </th>
                                      <td class='py-4 px-6 break-words'>{prop.type.toString()}</td>
                                      <Show when={prop.comment.description}>
                                        <td class='py-4 px-6 break-words'>{prop.comment.description}</td>
                                      </Show>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </Show>
                          <div
                            class='prose prose-pre:bg-zinc-800 font-mono prose-pre:my-4 my-3 text-lg tracking-wide'
                            innerHTML={md.render(intf.comment.example.map((x) => x.text).join('\n'))}
                          ></div>
                        </div>
                      </div>

                      <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
                    </div>
                  ))}
                </div>
              </Show>
              <Show when={params().type === 'classes'}>
                <div class='pt-4 sm:pt-0 sm:px-10'>
                  <h1 class='dark:text-white text-4xl font-ledger'>{params().type[0].toUpperCase() + params().type.slice(1)}</h1>
                  <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
                  {(selectedPkg() ? selectedPkg()!.classes : []).map((cls) => (
                    <div id={cls.name}>
                      <div class='my-4'>
                        <div>
                          <Link
                            onClick={() => updateScroll(true)}
                            class='hover:opacity-70 transition'
                            href={`/docs/${params().pkg}/${params().type}#${cls.name}`}
                          >
                            <h1 class='text-2xl dark:text-white'>
                              <code>{cls.name}</code>
                            </h1>
                          </Link>

                          <div class='dark:text-zinc-200 my-4' innerHTML={md.render(cls.comment.description || '')}></div>

                          <Show when={cls.construct.parameters}>
                            <div class='overflow-x-auto relative w-full sm:w-3/5 border-2 dark:border-0 sm:rounded-lg'>
                              <table class='text-sm w-full text-left text-gray-500 dark:text-gray-400'>
                                <thead class='text-xs text-gray-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-gray-400'>
                                  <tr>
                                    <th scope='col' class='py-3 px-6'>
                                      Parameter
                                    </th>
                                    <th scope='col' class='py-3 px-6'>
                                      Type
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {cls.construct.parameters.map((prop) => (
                                    <tr class='border-b dark:bg-zinc-800 dark:border-gray-700'>
                                      <th scope='row' class='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        {prop.name}
                                      </th>
                                      <td class='py-4 px-6 break-words'>{prop.type.toString()}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </Show>
                          <Show when={cls.properties}>
                            <div class='overflow-x-auto mt-4 relative w-full sm:w-3/5 border-2 dark:border-0 sm:rounded-lg'>
                              <table class='text-sm w-full text-left text-gray-500 dark:text-gray-400'>
                                <thead class='text-xs text-gray-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-gray-400'>
                                  <tr>
                                    <th scope='col' class='py-3 px-6'>
                                      Property
                                    </th>
                                    <th scope='col' class='py-3 px-6'>
                                      Type
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {cls.properties.map((prop) => (
                                    <tr class='border-b dark:bg-zinc-800 dark:border-gray-700'>
                                      <th scope='row' class='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                                        {prop.name}
                                      </th>
                                      <td class='py-4 px-6 break-words'>{prop.type ? prop.type.toString() : 'N/A'}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </Show>
                          <div
                            class='prose prose-pre:bg-zinc-800 font-mono prose-pre:my-4 my-3 text-lg tracking-wide'
                            innerHTML={md.render(cls.comment.example.map((x) => x.text).join('\n'))}
                          ></div>
                        </div>
                      </div>

                      <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
                    </div>
                  ))}
                </div>
              </Show>
            </Show>
            <Show when={params().category}>
              <div class='prose prose-ledger prose-pre:bg-zinc-800 sm:pl-10 mb-20 sm:pr-40 max-w-full prose-code:text-[15px] prose-code:text-mono prose-h1:font-bold prose-img:my-1 prose-img:inline prose-hr:my-3 prose-h2:mt-2 dark:prose-invert'>
                {params().category === 'getting-started' && !params().page && <GettingStarted />}
                {params().category === 'getting-started' && params().page === 'providers' && <Providers />}
              </div>
            </Show>
          </div>
        </div>
        <div
          class='hidden sm:block sm:w-80 max-h-[75vh] will-change-transform'
          style={{ transform: `translateY(${scrollValue() > 20 ? scrollValue() - 20 : 0}px)` }}
        >
          <Show when={params().type.length > 0}>
            <h1 class='text-primary font-bold text-xl mb-2 font-ledger'>Contents</h1>
            <div class='overflow-y-scroll h-full' ref={sideBar}>
              <Show when={params().type === 'methods'}>
                {allMethods().map((method) => (
                  <div class='pt-2 pr-4'>
                    <div class={`transition px-2 border-l ${location.hash.slice(1) === method.name ? 'border-primary' : 'dark:border-zinc-800'}`}>
                      <Link
                        onClick={() => updateScroll(true)}
                        class='dark:text-gray-300'
                        href={`/docs/${params().pkg}/${params().type}#${method.name}`}
                      >
                        {method.name}
                      </Link>
                    </div>
                    <hr class='dark:border-zinc-800 mt-4 mb-2'></hr>
                  </div>
                ))}
              </Show>
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
};

export default DocsPage;
