import { Router } from 'solid-app-router';
import { render } from 'solid-js/web';
import { App } from './App';
import './assets/css/main.css';
render(
  () => (
    <Router>
      <App />
    </Router>
  ),
  document.getElementById('root')!
);
