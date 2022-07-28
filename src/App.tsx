import { Route, Routes } from 'solid-app-router';
import { lazy } from 'solid-js';
import { Footer } from './components/layout/footer';
import { Navigation } from './components/layout/navigation';
import { LandingPage } from './pages/landing';

const NotFound = lazy(() => import('./pages/notfound'));

export function App() {
  return (
    <div class='dark:bg-zinc-900 '>
      <div class='min-h-screen 2xl:container 2xl:mx-auto sm:py-6 sm:px-7 py-5 px-4'>
        <Navigation></Navigation>
        <Routes>
          <Route path='/' component={LandingPage} />
          <Route path='*' component={NotFound} />
        </Routes>
        <Footer></Footer>
      </div>
    </div>
  );
}
