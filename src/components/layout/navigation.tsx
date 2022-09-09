import { Link, NavLink } from 'solid-app-router';
import { FiGithub, FiMenu, FiX } from 'solid-icons/fi';
import { SiDiscord } from 'solid-icons/si';
import { createMemo, createSignal } from 'solid-js';
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
      href: '/',
      end: true
    },
    {
      text: 'Documentation',
      href: '/docs',
      end: false
    }
  ];

  return (
    <nav>
      <div class='flex justify-between'>
        <div class='hidden sm:flex flex-row items-center space-x-6 w-1/3'>
          {links.map((link) => (
            <NavLink
              end={link.end}
              activeClass='border-gray-400'
              inactiveClass='border-transparent'
              class='border-b transition dark:text-white py-2'
              href={link.href}
            >
              {link.text}
            </NavLink>
          ))}
        </div>
        <div class='space-x-3 w-1/3 text-center items-center justify-center flex'>
          <h1 class='text-2xl leading-6 font-ledger text-gray-800 dark:text-white '>
            <Link href='/'>Josh</Link>
          </h1>
        </div>
        <div class='hidden sm:flex ml-auto space-x-3 items-center justify-center'>
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
