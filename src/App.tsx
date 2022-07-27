import { Route, Routes } from '@solidjs/router';
import { Navigation } from './components/layout/navigation';
import { LandingPage } from './components/pages/landing';

export function App() {
  return (
    <div class='dark:bg-zinc-900 min-h-screen'>
      <Navigation></Navigation>
      <Routes>
        <Route path='/' component={LandingPage} />
      </Routes>
    </div>
  );
}
