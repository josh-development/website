import { Link } from '@solidjs/router';
import { Accessor, Show } from 'solid-js';
import type { DocsPageParams, ExtraClassMethod } from '../types';

export const DocsContents = ({
  params,
  allMethods
}: {
  params: Accessor<DocsPageParams>;
  allMethods: Accessor<ExtraClassMethod[]>;
}) => {
  return (
    <div
      class='hidden sm:block sm:w-80 max-h-[75vh]'
    >
      <Show when={params().type.length > 0}>
        <h1 class='text-primary font-bold text-xl mb-2 font-ledger'>Contents</h1>
        <div class='overflow-y-scroll h-full'>
          <Show when={params().type === 'methods'}>
            {allMethods().map((method) => (
              <div class='pt-2 pr-4'>
                <div
                  class={`transition px-2 border-l ${location.hash.slice(1) === `${method.from.name}-${method.name}` ? 'border-primary' : 'dark:border-zinc-800'
                    }`}
                >
                  <Link
                    class='dark:text-gray-300 break-words'
                    href={`/docs/${params().pkg}/${params().type}#${method.from.name}-${method.name}`}
                  >
                    {`${method.from.name}.${method.name}`}
                  </Link>
                </div>
                <hr class='dark:border-zinc-800 mt-4 mb-2'></hr>
              </div>
            ))}
          </Show>
        </div>
      </Show>
    </div>
  );
};
