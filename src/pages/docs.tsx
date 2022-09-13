import { useLocation, useParams } from 'solid-app-router';
import { createMemo, createSignal, onCleanup, Show } from 'solid-js';
import { ProjectParser } from 'typedoc-json-parser';
import { DocsLoading } from '../components/docs/Loading';
import { NavigationDocs } from '../components/docs/Navigation';
import { DocsClasses, DocsInterfaces, DocsMethods, DocsReadme } from '../components/docs/packages';
import { DocsSideBar } from '../components/docs/SideBar';
import type { ExtraClassMethod } from '../components/types';
import GettingStarted from '../docs/welcome/getting-started.mdx';
import Home from '../docs/welcome/home.mdx';
import Providers from '../docs/welcome/providers.mdx';
import packages from '../store/packages';

const DocsPage = () => {
  const [pkgs] = packages;
  const p = useParams() as { type: string | null; pkg: string | null; page: string | null; category: string | null };
  const params = createMemo(() => {
    return {
      type: p.type ? p.type.toLowerCase() : '',
      pkg: p.pkg ? p.pkg.toLowerCase() : '',
      page: p.page ? p.page.toLowerCase() : '',
      category: p.category ? p.category.toLowerCase() : ''
    };
  });

  const location = useLocation();
  const [selectedPkg, setPackage] = createSignal<ProjectParser>();
  const [scrollValue, setScroll] = createSignal(window.innerWidth < 640 ? 0 : window.scrollY);
  const updateScroll = (forced = false, smooth = false) => {
    if (forced) {
      setTimeout(() => {
        updateScroll(false, true);
      }, 50);

      return;
    }

    setScroll(window.scrollY);

    const sideBar = document.getElementById('sidebar');

    if (sideBar) {
      const perc = scrollValue() / document.body.scrollHeight;
      const max = sideBar.scrollHeight - sideBar.clientHeight;

      sideBar.scrollTo({ top: perc * max, behavior: smooth ? 'smooth' : 'auto' });
    }
  };

  const ev = () => updateScroll();

  if (window.innerWidth > 640) window.addEventListener('scroll', ev, { passive: true });

  onCleanup(() => {
    window.removeEventListener('scroll', ev);
  });

  const choosePackage = async (name: string) => {
    if (pkgs.loading) {
      setTimeout(() => {
        void choosePackage(name);
      }, 100);

      return;
    }

    const found = pkgs().find((x) => x.name === name);
    const stored = localStorage.getItem(`docs-${name}`);
    let json: ProjectParser.JSON | undefined;

    if (stored) {
      const parsed: { docs: ProjectParser.JSON; date: Date } = JSON.parse(stored);

      if (new Date().getTime() - new Date(parsed.date).getTime() < 1000 * 60 * 10) {
        json = parsed.docs;
      }
    }

    if (!json) {
      json = await fetch(found!.url).then((r) => r.json());
      localStorage.setItem(`docs-${name}`, JSON.stringify({ docs: json, date: new Date() }));
    }

    const proj = new ProjectParser({ data: json! });

    setPackage(proj);

    if (location.hash) {
      document.getElementById(location.hash.slice(1))?.scrollIntoView();
    }
  };

  if (params().pkg) {
    if (!selectedPkg()) {
      void choosePackage(params().pkg);
    }
  }

  const allMethods = createMemo<ExtraClassMethod[]>(() => {
    return selectedPkg() ? selectedPkg()!.classes.flatMap((x) => x.methods.map((m) => ({ ...m, from: x } as ExtraClassMethod))) : [];
  });

  const folders = createMemo(() => {
    const all = [];

    for (const pkg of pkgs()) {
      const folder = pkg.path.split('/')[0];
      const foundIdx = all.findIndex((x) => x.name === folder);

      if (foundIdx === -1) {
        all.push({ name: folder, packages: [pkg] });
      } else {
        all[foundIdx].packages.push(pkg);
      }
    }

    return all;
  });

  const docs = [
    {
      name: 'Welcome',
      category: 'welcome',
      pages: [
        {
          name: 'Josh',
          page: '',
          component: <Home />
        },
        {
          name: 'Getting Started',
          page: 'getting-started',
          component: <GettingStarted />
        },
        {
          name: 'Providers',
          page: 'providers',
          component: <Providers />
        }
      ]
    }
  ];

  return (
    <div class='min-h-[100vh] sm:flex pt-5'>
      <Show when={pkgs.loading}>
        <DocsLoading />
      </Show>
      <Show when={!pkgs.loading}>
        <NavigationDocs
          docs={docs}
          allMethods={allMethods}
          selectedPkg={selectedPkg}
          folders={folders}
          onChoosePackage={choosePackage}
          onSetPackage={setPackage}
          params={params}
          scrollValue={scrollValue}
        />
        <div class='w-full overflow-x-scroll'>
          <div>
            <Show when={selectedPkg()}>
              <Show when={params().type.length === 0}>
                <DocsReadme selectedPkg={selectedPkg} />
              </Show>
              <Show when={params().type === 'methods'}>
                <DocsMethods params={params} onUpdateScroll={updateScroll} allMethods={allMethods} selectedPkg={selectedPkg} />
              </Show>
              <Show when={params().type === 'interfaces'}>
                <DocsInterfaces params={params} onUpdateScroll={updateScroll} selectedPkg={selectedPkg} />
              </Show>
              <Show when={params().type === 'classes'}>
                <DocsClasses params={params} onUpdateScroll={updateScroll} selectedPkg={selectedPkg} />
              </Show>
            </Show>
            <Show when={params().category}>
              <div class='prose prose-ledger prose-pre:bg-zinc-800 sm:pl-10 mb-20 sm:pr-40 max-w-full prose-code:text-[15px] prose-code:text-mono prose-h1:font-bold prose-img:my-1 prose-img:inline prose-hr:my-3 prose-h2:mt-2 dark:prose-invert'>
                {docs.map((category) => {
                  if (category.category === params().category) {
                    return category.pages.map((page) => {
                      if (page.page === params().page) {
                        return page.component;
                      }

                      return <></>;
                    });
                  }

                  return <></>;
                })}
              </div>
            </Show>
          </div>
        </div>
        <DocsSideBar params={params} onUpdateScroll={updateScroll} allMethods={allMethods} scrollValue={scrollValue} />
      </Show>
    </div>
  );
};

export default DocsPage;
