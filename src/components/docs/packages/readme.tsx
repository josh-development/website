import { md } from '../../../utils/mdit';
import type { ReadmeProps } from '../../types';

export const DocsReadme = ({ selectedPkg }: ReadmeProps) => {
  return (
    <div
      class='prose prose-pre:bg-zinc-800 sm:pl-10 mb-20 sm:pr-40 max-w-full prose-code:text-mono prose-h1:font-normal prose-img:my-1 prose-img:inline prose-hr:my-3 prose-h2:mt-2 dark:prose-invert'
      innerHTML={md.render(selectedPkg()!.readme || '')}
    ></div>
  );
};
