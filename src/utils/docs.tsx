import type { Accessor } from 'solid-js';
import DevelopmentIntro from '../docs/development/intro.mdx';
import GuideEnmap from '../docs/guide/enmap.mdx';
import GuideIntro from '../docs/guide/intro.mdx';
import GuideMigration from '../docs/guide/migration.mdx';
import GuideUsage from '../docs/guide/usage.mdx';
import WelcomeFaq from '../docs/welcome/faq.mdx';
import WelcomeGettingStarted from '../docs/welcome/getting-started.mdx';
import WelcomeHome from '../docs/welcome/home.mdx';
import WelcomeProviders from '../docs/welcome/providers.mdx';
import type { foundPackage } from '../store/packages';

export const getDocs = (
  folders: Accessor<
    {
      name: string;
      packages: foundPackage[];
    }[]
  >
) => [
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
        component: <WelcomeGettingStarted />
      },
      {
        name: 'Providers',
        page: 'providers',
        component: <WelcomeProviders providers={folders().find((x) => x.name === 'providers')?.packages || []} />
      },
      {
        name: 'FAQ',
        page: 'faq',
        component: <WelcomeFaq />
      }
    ]
  },
  {
    name: 'Guide',
    category: 'intro',
    pages: [
      // enmap.mdx, intro.mdx, migration.mdx, usage.mdx
      {
        name: 'Intro',
        page: '',
        component: <GuideIntro />
      },
      {
        name: 'v1 Migration',
        page: 'migration-from-v1',
        component: <GuideMigration />
      },
      {
        name: 'Enmap Migration',
        page: 'migrating-from-enmap',
        component: <GuideEnmap />
      },
      {
        name: 'Usage',
        page: 'usage',
        component: <GuideUsage />
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
