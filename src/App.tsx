import { useRoutes } from '@solidjs/router';
import { Footer } from './components/layout/footer';
import { Navigation } from './components/layout/navigation';
import { Up } from './components/layout/up';
import { routes } from './routes';

export function App() {
  const Routes = useRoutes(routes);

  return (
    <div class='dark:bg-zinc-900 transition'>
      <div class='min-h-screen 2xl:container 2xl:mx-auto sm:py-6 sm:px-7 py-5 px-4'>
        <Navigation />
        <Routes />
        <Up></Up>
        <Footer />
      </div>
    </div>
  );
}
