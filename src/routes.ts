import type { RouteDefinition } from '@solidjs/router';
import { lazy } from 'solid-js';
import Docs from './pages/Docs';
import NotFound from './pages/NotFound';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: lazy(() => import('./pages/Home'))
  },
  {
    path: ['/docs', '/docs/guide', '/docs/guide/:category', '/docs/guide/:category/:page', '/docs/', '/docs/:pkg', '/docs/:pkg/:type'],
    component: Docs
  },
  {
    path: '*',
    component: NotFound
  }
];
