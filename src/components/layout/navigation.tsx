import { FiChevronDown, FiChevronUp, FiGithub, FiMenu } from 'solid-icons/fi';
import { createSignal, Match, Switch } from 'solid-js';
import { Transition } from 'solid-transition-group';
export const Navigation = () => {
  const [chosenTag, setChosenTag] = createSignal(0);
  const [showTagList, setShowTagList] = createSignal(false);
  const tags = ['latest', 'next', '1.0.0', '1.1.0'];
  const chooseTag = (index: number) => {
    setChosenTag(index);
    setShowTagList(false);
  };

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
            <span class='px-4'>{tags[chosenTag()]}</span>
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
                  {tags.map((tag, index) => (
                    <li
                      onclick={() => chooseTag(index)}
                      class='focus:outline-none cursor-pointer text-gray-600 dark:text-gray-400 text-sm leading-3 tracking-normal py-3 focus:bg-gray-200 transition hover:bg-gray-100 dark:hover:bg-zinc-900 px-3 flex items-center'
                    >
                      {tag}
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
