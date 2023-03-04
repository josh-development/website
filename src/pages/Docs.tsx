import { Title } from '@solidjs/meta';
import { useLocation, useNavigate, useParams } from '@solidjs/router';
import { createEffect, createMemo, createSignal, Show } from 'solid-js';
import { ProjectParser } from 'typedoc-json-parser';
import { DocsContents } from '../components/docs/Contents';
import { DocsLoading } from '../components/docs/Loading';
import { NavigationDocs } from '../components/docs/Navigation';
import { DocsClasses, DocsEnums, DocsInterfaces, DocsMethods, DocsReadme } from '../components/docs/packages';
import type { ExtraClassMethod } from '../components/types';
import DevelopmentIntro from '../docs/development/intro.mdx';
import WelcomFaq from '../docs/welcome/faq.mdx';
import GettingStarted from '../docs/welcome/getting-started.mdx';
import WelcomeHome from '../docs/welcome/home.mdx';
import WelcomeProviders from '../docs/welcome/providers.mdx';
import packages from '../store/packages';

const Docs = () => {
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
  const choosePackage = async (name: string) => {
    if (pkgs.loading) {
      setTimeout(() => {
        void choosePackage(name);
      }, 50);

      return;
    }

    const found = pkgs().find((x) => x.name === name);
    const stored = localStorage.getItem(`docs-${name}`);
    let json: ProjectParser.Json | undefined;

    if (stored) {
      const parsed: { docs: ProjectParser.Json; date: Date } = JSON.parse(stored);

      if (new Date().getTime() - new Date(parsed.date).getTime() < 1000 * 60 * 10) {
        json = parsed.docs;
      }
    }

    if (found) {
      if (!json) {
        json = await fetch(found.url).then((r) => r.json());
        localStorage.setItem(`docs-${name}`, JSON.stringify({ docs: json, date: new Date() }));
      }

      const proj = new ProjectParser({ data: json! });

      setPackage(proj);

      if (location.hash) {
        document.getElementById(location.hash.slice(1))?.scrollIntoView();
      }

      if (params().type === 'search') {
        const found = selectedPkg()!.find(parseInt(location.query.id, 10));
      }
    }
  };

  createEffect(() => {
    if (params().pkg) void choosePackage(params().pkg);
    else setPackage();
  }, [location.pathname]);

  if (params().pkg) {
    if (!selectedPkg()) {
      void choosePackage(params().pkg);
    }
  }

  const navigateTo = useNavigate();

  if (!params().pkg && !params().category) {
    navigateTo('/docs/guide/welcome');
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
          component: <WelcomeHome />
        },
        {
          name: 'Getting Started',
          page: 'getting-started',
          component: <GettingStarted />
        },
        {
          name: 'Providers',
          page: 'providers',
          component: <WelcomeProviders providers={folders().find((x) => x.name === 'providers')?.packages || []} />
        },
        {
          name: 'FAQ',
          page: 'faq',
          component: <WelcomFaq />
        }
      ]
    },
    {
      name: 'Development',
      category: 'development',
      pages: [
        {
          name: 'Intro',
          page: '',
          component: <DevelopmentIntro />
        }
      ]
    }
  ];

  return (
    <div class='min-h-[100vh] sm:flex pt-5'>
      <Title>JOSH | Docs</Title>
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
        />
        <div class='w-full overflow-x-scroll'>
          <div>
            <Show when={selectedPkg()}>
              <Title>
                JOSH | {selectedPkg()!.name} | {params().type.length > 0 ? params().type : 'README'}
              </Title>
              <Show when={params().type.length === 0}>
                <DocsReadme selectedPkg={selectedPkg} />
              </Show>
              <Show when={params().type === 'methods'}>
                <DocsMethods params={params} allMethods={allMethods} selectedPkg={selectedPkg} />
              </Show>
              <Show when={params().type === 'interfaces'}>
                <DocsInterfaces params={params} selectedPkg={selectedPkg} />
              </Show>
              <Show when={params().type === 'classes'}>
                <DocsClasses params={params} selectedPkg={selectedPkg} />
              </Show>
              <Show when={params().type === 'enums'}>
                <DocsEnums params={params} selectedPkg={selectedPkg} />
              </Show>
            </Show>
            <Show when={params().category}>
              <div class='prose prose-a:text-primary prose-pre:bg-zinc-800 sm:pl-10 mb-20 sm:pr-40 max-w-full prose-code:text-[15px] prose-h1:font-bold prose-img:my-1 prose-img:inline prose-hr:my-3 prose-h2:mt-2 dark:prose-invert'>
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
        <DocsContents params={params} allMethods={allMethods} />
      </Show>
    </div>
  );
};

export default Docs;
