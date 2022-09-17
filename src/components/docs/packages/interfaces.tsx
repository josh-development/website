import { Link } from '@solidjs/router';
import { Show } from 'solid-js';
import { md } from '../../../utils/mdit';
import type { InterfacesProps } from '../../types';

export const DocsInterfaces = ({ selectedPkg, onUpdateScroll, params }: InterfacesProps) => {
  return (
    <div class='pt-4 sm:pt-0 sm:px-10'>
      <h1 class='dark:text-white text-4xl font-ledger'>{params().type[0].toUpperCase() + params().type.slice(1)}</h1>
      <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
      {(selectedPkg() ? selectedPkg()!.interfaces : []).map((intf) => (
        <div id={intf.name}>
          <div class='my-4'>
            <div>
              <Link
                onClick={() => onUpdateScroll(true)}
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
  );
};
