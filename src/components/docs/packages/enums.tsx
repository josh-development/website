import { Link } from '@solidjs/router';
import { Show } from 'solid-js';
import { md } from '../../../utils/mdit';
import type { EnumsProps } from '../../types';

export const DocsEnums = ({ selectedPkg, params }: EnumsProps) => {
  return (
    <div class='pt-4 sm:pt-0 sm:px-10'>
      <h1 class='dark:text-white text-4xl font-ledger'>{params().type[0].toUpperCase() + params().type.slice(1)}</h1>
      <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
      {(selectedPkg() ? selectedPkg()!.enums : []).map((enu) => (
        <div id={enu.name}>
          <div class='my-4'>
            <div>
              <Link
                class='hover:opacity-70 transition'
                href={`/docs/${params().pkg}/${params().type}#${enu.name}`}
              >
                <h1 class='text-2xl dark:text-white'>
                  <code>{enu.name}</code>
                </h1>
              </Link>

              <div class='dark:text-zinc-200 my-4' innerHTML={md.render(enu.comment.description || '')}></div>

              <Show when={enu.members}>
                <table class='text-sm text-left text-gray-500 dark:text-gray-400'>
                  <thead class='text-xs text-gray-700 uppercase bg-zinc-50 dark:bg-zinc-700 dark:text-gray-400'>
                    <tr>
                      <th scope='col' class='py-3 px-6'>
                        Member
                      </th>
                      <th scope='col' class='py-3 px-6'>
                        Value
                      </th>
                      <Show when={enu.members.find((x) => x.comment.description)}>
                        <th scope='col' class='py-3 px-6'>
                          Description
                        </th>
                      </Show>
                    </tr>
                  </thead>
                  <tbody>
                    {enu.members.map((prop) => (
                      <tr class='border-b dark:bg-zinc-800 dark:border-gray-700'>
                        <th scope='row' class='py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                          {prop.name}
                        </th>
                        <td class='py-4 px-6 break-words'>{prop.value}</td>
                        <Show when={prop.comment.description}>
                          <td class='py-4 px-6 break-words'>{prop.comment.description}</td>
                        </Show>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Show>
              <div
                class='prose prose-pre:bg-zinc-800 font-mono prose-pre:my-4 my-3 text-lg tracking-wide'
                innerHTML={md.render(enu.comment.example.map((x) => x.text).join('\n'))}
              ></div>
            </div>
          </div>

          <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
        </div>
      ))}
    </div>
  );
};
