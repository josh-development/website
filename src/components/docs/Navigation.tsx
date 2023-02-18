import { Link, useNavigate } from '@solidjs/router';
import { FiChevronDown } from 'solid-icons/fi';
import { createMemo, Show } from 'solid-js';
import type { NavigationProps } from '../types';

export const NavigationDocs = ({ params, onSetPackage, onChoosePackage, folders, selectedPkg, allMethods, docs }: NavigationProps) => {
  const navigateTo = useNavigate();

  const maxH = createMemo(() => {
    let i = 1;
    if (allMethods().length > 0) {
      i++;
    }
    if (selectedPkg() && selectedPkg()!.interfaces.length > 0) {
      i++;
    }
    if (selectedPkg() && selectedPkg()!.classes.length > 0) {
      i++;
    }
    if (selectedPkg() && selectedPkg()!.enums.length > 0) {
      i++;
    }
    // if (selectedPkg() && selectedPkg()!.namespaces.length > 0) {
    //   i++;
    // }
    return 27.5 * i + 12;
  });

  return (
    <div
      class='sm:w-72 sm:max-h-[75vh] sm:overflow-y-scroll will-change-transform'
    >
      <h1 class='text-primary font-bold text-xl font-ledger'>Documentation</h1>

      <div>
        {docs.map((category) => (
          <div
            class={`transition my-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 ${params().category === category.category ? 'dark:bg-zinc-800 bg-zinc-100' : ''
              }`}
          >
            <button
              onClick={() => {
                onSetPackage();
                if (params().category === category.category) {
                  navigateTo('/docs');
                } else {
                  navigateTo(`/docs/guide/` + category.category);
                }
              }}
              class='w-full py-2 px-3'
            >
              <div class='flex text-[14px] tracking-widest'>
                <p class='dark:text-white'>{category.name}</p>
                <span class='ml-auto dark:text-white pt-1'>
                  <FiChevronDown
                    class='transition'
                    style={{ transform: params().category === category.category ? 'rotate(0deg)' : 'rotate(90deg)' }}
                  ></FiChevronDown>
                </span>
              </div>
            </button>
            <div
              style={{ 'max-height': params().category === category.category ? category.pages.length * 30 + 'px' : '0px' }}
              class='transition-all overflow-hidden'
            >
              <div class='pl-6 pb-3 dark:text-zinc-300 text-[13px] tracking-widest space-y-2 grid'>
                {category.pages.map((page) => (
                  <Link href={`/docs/guide/${category.category}/${page.page}`}>
                    <h3 class={params().page === page.page ? 'font-bold' : ''}>{page.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        ))}
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
                class={`transition my-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 ${params().pkg === pkg.name ? 'dark:bg-zinc-800 bg-zinc-100' : ''
                  }`}
              >
                <button
                  onClick={() => {
                    if (params().pkg === pkg.name) {
                      navigateTo('/docs');
                      setTimeout(() => {
                        onSetPackage();
                      }, 250);
                    } else {
                      void onChoosePackage(pkg.name);
                      navigateTo(`/docs/${pkg.name}`);
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
                <div style={{ 'max-height': params().pkg === pkg.name ? maxH() + 'px' : '0px' }} class='transition-all overflow-hidden'>
                  <div class='pl-6 pb-3 dark:text-zinc-300 text-[13px] tracking-widest space-y-2 grid'>
                    <Link href={`/docs/${pkg.name}`}>
                      <h3 class={params().pkg === pkg.name && params().type === '' ? 'font-bold' : ''}>README</h3>
                    </Link>
                    <Show when={allMethods().length > 0}>
                      <Link href={`/docs/${pkg.name}/methods`}>
                        <h3 class={params().pkg === pkg.name && params().type === 'methods' ? 'font-bold' : ''}>Methods</h3>
                      </Link>
                    </Show>
                    <Show when={selectedPkg() && selectedPkg()!.interfaces.length > 0}>
                      <Link href={`/docs/${pkg.name}/interfaces`}>
                        <h3 class={params().pkg === pkg.name && params().type === 'interfaces' ? 'font-bold' : ''}>Interfaces</h3>
                      </Link>
                    </Show>
                    <Show when={selectedPkg() && selectedPkg()!.classes.length > 0}>
                      <Link href={`/docs/${pkg.name}/classes`}>
                        <h3 class={params().pkg === pkg.name && params().type === 'classes' ? 'font-bold' : ''}>Classes</h3>
                      </Link>
                    </Show>
                    <Show when={selectedPkg() && selectedPkg()!.enums.length > 0}>
                      <Link href={`/docs/${pkg.name}/enums`}>
                        <h3 class={params().pkg === pkg.name && params().type === 'enums' ? 'font-bold' : ''}>Enums</h3>
                      </Link>
                    </Show>
                    {/* <Show when={selectedPkg() && selectedPkg()!.namespaces.length > 0}>
                      <Link href={`/docs/${pkg.name}/namespaces`}>
                        <h3 class={params().pkg === pkg.name && params().type === 'namespaces' ? 'font-bold' : ''}>Namespaces</h3>
                      </Link>
                    </Show> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
