import { Link, NavLink } from 'solid-app-router';
import { FiGithub, FiMenu, FiMoon, FiSun, FiX } from 'solid-icons/fi';
import { SiDiscord } from 'solid-icons/si';
import { createSignal, Show } from 'solid-js';
export const Navigation = () => {
  const [showMenu, setShowMenu] = createSignal(false);
  const [darkMode, setIfDark] = createSignal(true);
  const updateMode = () => {
    setIfDark(document.body.classList.contains('dark'));
  };

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
        <div class='space-x-3 w-1/3 text-center items-center sm:justify-center flex'>
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
          <button
            onClick={() => {
              document.body.classList.toggle('dark');
              updateMode();
            }}
            class='dark:text-white border-l dark:border-zinc-700 pl-4 p-1 focus:outline-none focus:ring-none focus:ring-offset-2 focus:ring-gray-800'
          >
            <Show when={!darkMode()}>
              <FiMoon size={24}></FiMoon>
            </Show>
            <Show when={darkMode()}>
              <FiSun size={24}></FiSun>
            </Show>
          </button>
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
