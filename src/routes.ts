import type { RouteDefinition } from '@solidjs/router';
import Docs from './pages/Docs';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

export const routes: RouteDefinition[] = [
  {
    path: '/',
    component: Home
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
