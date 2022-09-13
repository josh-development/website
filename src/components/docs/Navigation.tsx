import { Link, useNavigate } from 'solid-app-router';
import { FiChevronDown } from 'solid-icons/fi';
import { createMemo, Show } from 'solid-js';
import type { NavigationProps } from '../types';

export const NavigationDocs = ({ params, onSetPackage, onChoosePackage, folders, scrollValue, selectedPkg, allMethods }: NavigationProps) => {
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
    return 27.5 * i + 12;
  });

  return (
    <div class='sm:w-72 sm:max-h-[80vh] will-change-transform' style={{ transform: `translateY(${scrollValue > 20 ? scrollValue - 20 : 0}px)` }}>
      <h1 class='text-primary font-bold text-xl font-ledger'>Documentation</h1>

      <div>
        <div
          class={`transition my-2 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
            params().category === 'getting-started' ? 'dark:bg-zinc-800 bg-zinc-100' : ''
          }`}
        >
          <button
            onClick={() => {
              onSetPackage();
              if (params().category === 'getting-started') {
                navigateTo('/docs');
              } else {
                navigateTo(`/docs/guide/getting-started`);
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
          <div style={{ 'max-height': params().category === 'getting-started' ? '512px' : '0px' }} class='transition-all overflow-hidden'>
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
