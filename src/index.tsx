import { Router } from '@solidjs/router';
import { render } from 'solid-js/web';
import { App } from './App';
import './assets/css/main.css';

import { Meta, MetaProvider, Title } from '@solidjs/meta';

render(
  () => (
    <MetaProvider>
      <Title>JOSH | Home</Title>
      <Meta name='title' content='JOSH | Home' />
      <Meta
        name='description'
        content='JOSH is the JavaScript Object Storage Helper - a simple, effective, and efficient database wrapper written in Typescript'
      />

      <Meta property='og:type' content='website' />
      <Meta property='og:url' content='https://josh.evie.dev/' />
      <Meta property='og:title' content='JOSH | Home' />
      <Meta
        property='og:description'
        content='JOSH is the JavaScript Object Storage Helper - a simple, effective, and efficient database wrapper written in Typescript'
      />
      <Meta property='og:image' content='https://josh.evie.dev/.gitbook/assets/josh_p_light.svg' />

      <Meta property='twitter:card' content='summary_large_image' />
      <Meta property='twitter:url' content='https://josh.evie.dev/' />
      <Meta property='twitter:title' content='JOSH | Home' />
      <Meta
        property='twitter:description'
        content='JOSH is the JavaScript Object Storage Helper - a simple, effective, and efficient database wrapper written in Typescript'
      />
      <Meta property='twitter:image' content='https://josh.evie.dev/.gitbook/assets/josh_p_light.svg' />
      <Router>
        <App />
      </Router>
    </MetaProvider>
  ),
  document.getElementById('root')!
);
