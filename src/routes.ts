import type { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home'))
  },
  {
    path: [
      '/docs',
      '/docs/Guide',
      '/docs/Guide/:category',
      '/docs/Guide/:category/:page',
      '/docs/Documentation',
      '/docs/Documentation/:name',
      '/docs/Documentation/:name/:version'
    ],
    component: lazy(() => import('./pages/Docs'))
  },
  {
    path: '*',
    component: lazy(() => import('./pages/NotFound'))
  }
];
