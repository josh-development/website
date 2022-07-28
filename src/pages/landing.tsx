import Highlight from 'solid-highlight';

import 'highlight.js/styles/tokyo-night-dark.css';
import { Link } from 'solid-app-router';
import { FiBook, FiGithub } from 'solid-icons/fi';
import { createSignal } from 'solid-js';

export const LandingPage = () => {
  const [code, setCode] = createSignal(`import { Josh } from "@joshdb/core";
  
const josh = new Josh({ name: "website" });

await josh.set("foo", "bar");`);

  const [pkg, setPackage] = createSignal('core');
  const [currentPkg, setCurrentPkg] = createSignal('');
  const packages = ['mongo', 'redis', 'map', 'json', 'core', 'middleware'];
  const nextPackage = async () => {
    const current = pkg();
    const next = packages[(packages.indexOf(current) + 1) % packages.length];

    for (const _ of current) {
      setPackage(pkg().slice(0, -1));
      await new Promise((r) => {
        setTimeout(r, 100);
      });
    }

    await new Promise((r) => {
      setTimeout(r, 500);
    });

    setCurrentPkg(next);

    for (let i = 0; i < next.length; i++) {
      setPackage(next.slice(0, i + 1));
      await new Promise((r) => {
        setTimeout(r, 100);
      });
    }

    setTimeout(() => {
      void nextPackage();
    }, 3000);
  };

  setTimeout(() => {
    void nextPackage();
  }, 3000);

  return (
    <>
      <div class='sm:flex w-full h-[80vh] items-center'>
        <div class='mt-20 sm:mt-0 sm:w-1/2'>
          <h2 class='text-xl dark:text-gray-400'>
            <a href={`https://npmjs.org/package/${currentPkg()}`}>
              @joshdb/{pkg} <div class='h-6 -mb-1.5 inline-block bg-zinc-800 dark:bg-gray-300 animate-pulse w-1 -ml-1'></div>
            </a>
          </h2>
          <h1 class='text-6xl dark:text-gray-100 my-2'>Databases, reimagined</h1>
          <p class='dark:text-gray-300 my-7'>
            Explore the easiest way to quickly, yet efficiently manage lots of different types of databases, all under one easy to use and powerful
            api. Paired with providers ranging from MongoDB and SQL to JSON, and Middleware such as caching and schema validation, Josh is the easiest
            way to manage your data.
          </p>
          <div class='space-x-2'>
            <Link href='/docs' class='bg-white shadow-lg dark:shadow px-6 py-4 rounded-lg inline-block bg-primary text-white'>
              <div class='flex'>
                <FiBook class='mt-[0.2rem] mr-2'></FiBook> Documentation
              </div>
            </Link>
            <a
              target='_blank'
              href='https://github.com/josh-development/core'
              class='bg-white shadow-lg dark:shadow px-6 py-4 rounded-lg inline-block'
            >
              <div class='flex'>
                <FiGithub class='mt-[0.2rem] mr-2'></FiGithub> Source
              </div>
            </a>
          </div>
        </div>
        <div class='sm:w-1/2 sm:px-8 mt-8 sm:mt-0'>
          <Highlight autoDetect={false} language={'ts'} class='rounded-lg shadow-xl py-8 sm:px-10 text-sm sm:text-lg sm:h-60 sm:pt-10'>
            {code()}
          </Highlight>
          <div></div>
        </div>
      </div>
    </>
  );
};
