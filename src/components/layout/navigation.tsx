import { FiChevronDown, FiChevronUp, FiGithub, FiMenu } from 'solid-icons/fi';
import { createMemo, createSignal, Match, Switch } from 'solid-js';
import { Transition } from 'solid-transition-group';
import npmData from '../../store/npm';
export const Navigation = () => {
  const [chosenTag, setChosenTag] = createSignal('latest');
  const [showTagList, setShowTagList] = createSignal(false);
  const chooseTag = (index: string) => {
    setChosenTag(index);
    setShowTagList(false);
  };

  const [npm] = npmData;
  const tags = createMemo(() => {
    const o = npm();
    if (npm.loading || !o) return [];
    return Object.keys(o.versions).reduce<{ tag: string; versions: string[] }[]>((prev, curr) => {
      const dotSplit = curr.split('.');
      const dashSplit = dotSplit[0].split('-');
      const tag = dotSplit.length > 1 && dashSplit.length < 2 ? `${dotSplit[0]}.x` : dashSplit[1].split('.')[0];
      const foundIdx = prev.findIndex((x) => x.tag === tag);
      if (foundIdx >= 0) {
        prev[foundIdx].versions.push(curr);
        return prev;
      }

      return [...prev, { tag, versions: [curr] }];
    }, []);
  });

  return (
    <nav class='2xl:container 2xl:mx-auto sm:py-6 sm:px-7 py-5 px-4'>
      <div class='flex justify-between '>
        <div class='hidden sm:flex flex-row items-center space-x-6'>
          <a
            href='https://github.com/josh-development'
            class='dark:text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'
          >
            <FiGithub size={24}></FiGithub>
          </a>
        </div>
        <div class='flex space-x-3 items-center'>
          <h1 class='text-2xl leading-6 text-gray-800 dark:text-white '>Josh</h1>
        </div>
        <div class='hidden sm:flex flex-row'>
          <button
            onclick={() => setShowTagList(!showTagList())}
            class='rounded-md flex w-24 text-sm py-1.5 text-black bg-white border border-indigo-700 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 duration-150 justify-center items-center'
          >
            <Show when={npm()?._id} fallback={<span>Loading...</span>}>
              <span class='px-4'>{chosenTag}</span>
            </Show>

            <span class='border-l border-gray-300 h-full px-1.5 pt-0.5'>
              <Transition name='fade' mode='outin'>
                <Switch>
                  <Match when={showTagList()}>
                    <FiChevronUp size={16}></FiChevronUp>
                  </Match>
                  <Match when={!showTagList()}>
                    <FiChevronDown size={16}></FiChevronDown>
                  </Match>
                </Switch>
              </Transition>
            </span>
          </button>
          <Transition name='fade' mode='outin'>
            <Switch>
              <Match when={showTagList()}>
                <ul class='visible transition mt-10 bg-white dark:bg-zinc-800 shadow rounded py-1 w-24 absolute'>
                  {tags().map((tag) => (
                    <li
                      onclick={() => chooseTag(tag.tag)}
                      class='focus:outline-none cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 focus:bg-gray-200 transition hover:bg-gray-100 dark:hover:bg-zinc-900 px-3 flex items-center'
                    >
                      {tag.tag}
                    </li>
                  ))}
                </ul>
              </Match>
              <Match when={!showTagList()}>
                <ul></ul>
              </Match>
            </Switch>
          </Transition>
        </div>

        <div class='focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 flex justify-center items-center sm:hidden cursor-pointer'>
          <FiMenu size={24} class='dark:text-white text-black'></FiMenu>
        </div>
      </div>
      {/* Todo: mobile nav */}
      <div class='hidden sm:hidden mt-4 mx-auto'>
        <div class='flex flex-row items-center justify-center space-x-6'>{/* icons */}</div>
        <div class='flex flex-col gap-4 mt-4 w-80 mx-auto '>{/* nav */}</div>
      </div>
    </nav>
  );
};
