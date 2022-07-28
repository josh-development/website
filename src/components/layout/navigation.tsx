import { Link, NavLink } from 'solid-app-router';
import { FiChevronDown, FiChevronUp, FiGithub, FiMenu, FiX } from 'solid-icons/fi';
import { SiDiscord } from 'solid-icons/si';
import { createMemo, createSignal, Match, Show, Switch } from 'solid-js';
import { Transition } from 'solid-transition-group';
import npmData from '../../store/npm';
export const Navigation = () => {
  const [chosenTag, setChosenTag] = createSignal('latest');
  const [showTagList, setShowTagList] = createSignal(false);
  const [showMenu, setShowMenu] = createSignal(false);
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
      const dashSplit = curr.split('-');
      const tag = dotSplit.length > 1 && dashSplit.length < 2 ? `${dotSplit[0]}.x` : dashSplit[1].split('.')[0];
      const foundIdx = prev.findIndex((x) => x.tag === tag);
      if (foundIdx >= 0) {
        prev[foundIdx].versions.push(curr);
        return prev;
      }

      return [...prev, { tag, versions: [curr] }];
    }, []);
  });

  const icons = [
    {
      icon: (size = 24) => <FiGithub size={size} />,
      href: 'https://github.com/josh-development'
    },
    {
      icon: (size = 24) => <SiDiscord size={size} />,
      href: 'https://discord.evie.dev'
    }
  ];

  const links = [
    {
      text: 'Home',
      href: '/'
    },
    {
      text: 'Documentation',
      href: '/docs'
    }
  ];

  return (
    <nav>
      <div class='flex justify-between'>
        <div class='hidden sm:flex flex-row items-center space-x-6 w-1/3'>
          {icons.map((icon) => (
            <a
              target='_blank'
              rel='noopener'
              href={icon.href}
              class='dark:text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'
            >
              {icon.icon()}
            </a>
          ))}
          {links.map((link) => (
            <NavLink
              end
              activeClass='border-gray-400'
              inactiveClass='border-transparent'
              class='border-b transition dark:text-white py-2'
              href={link.href}
            >
              {link.text}
            </NavLink>
          ))}
        </div>
        <div class='flex space-x-3 items-center'>
          <h1 class='text-2xl leading-6 text-gray-800 dark:text-white '>
            <Link href='/'>Josh</Link>
          </h1>
        </div>
        <div class='hidden sm:flex w-1/3'>
          <button
            onclick={() => setShowTagList(!showTagList())}
            class='rounded-md flex ml-auto w-24 text-sm py-1.5 text-black bg-white border border-indigo-700 focus:outline-none focus:bg-gray-200 hover:bg-gray-200 duration-150 justify-center items-center'
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
                <ul class='visible ml-auto right-7 2xl:right-[4.9rem] top-7 transition mt-10 bg-white dark:bg-zinc-800 shadow rounded py-1 w-24 absolute'>
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
          <FiMenu onClick={() => setShowMenu(true)} size={24} class='dark:text-white text-black'></FiMenu>
        </div>
      </div>
      {/* Todo: mobile nav */}
      <div
        style='z-index:2'
        class={`transition w-screen h-screen bg-primary mx-auto fixed top-0 left-0 py-6 px-6 ${showMenu() ? 'translate-x-0' : 'translate-x-[100vw]'}`}
      >
        <div>
          <FiX class='ml-auto text-white' onClick={() => setShowMenu(false)} size={32}></FiX>
        </div>
        <div class='text-center'>
          {links.map((link) => (
            <NavLink
              onClick={() => setShowMenu(false)}
              end
              activeClass='border-gray-400'
              inactiveClass='border-transparent'
              class='border-b block my-10 mx-20 transition text-white py-2 text-2xl'
              href={link.href}
            >
              {link.text}
            </NavLink>
          ))}
        </div>
        <div class='flex justify-center space-x-4 mt-auto'>
          {icons.map((icon) => (
            <a
              target='_blank'
              href={icon.href}
              rel='noopener'
              class='text-white p-1 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800'
            >
              {icon.icon(36)}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};
