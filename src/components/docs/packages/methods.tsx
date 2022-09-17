import { Link } from '@solidjs/router';
import { Show } from 'solid-js';
import { md } from '../../../utils/mdit';
import type { MethodsProps } from '../../types';

export const DocsMethods = ({ params, allMethods, selectedPkg, onUpdateScroll }: MethodsProps) => {
  return (
    <div class='pt-4 sm:pt-0 sm:px-5'>
      <h1 class='dark:text-white text-4xl font-ledger'>{params().type[0].toUpperCase() + params().type.slice(1)}</h1>
      <hr class='dark:border-zinc-700 mb-4 mt-6'></hr>
      {(selectedPkg() ? allMethods() : []).map((method) => (
        <div id={`${method.from.name}-${method.name}`}>
          <div class='my-4'>
            {method.signatures.map((sig) => (
              <div>
                <Link
                  onClick={() => onUpdateScroll(true)}
                  class='hover:opacity-70 transition'
                  href={`/docs/${params().pkg}/${params().type}#${method.from.name}-${method.name}`}
                >
                  <h1 class='sm:text-lg md:text-2xl dark:text-white break-words'>
                    <code>
                      <span class='text-primary'>{`${method.accessibility} `}</span>
                      {method.from.name}.{sig.name}
                      {sig.typeParameters.length > 0 ? '<' : ''}
                      {sig.typeParameters.map((x) => x.name + (x.default ? `=${x.default}` : '')).join(', ')}
                      {sig.typeParameters.length > 0 ? '>' : ''}(
                      {sig.parameters.map((x) => `${x.name}: ${x.type.toString().split('.')[x.type.toString().split('.').length - 1]}`).join(', ')})
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
  );
};
