import { createResource } from 'solid-js';
import type { NPMData } from './types';

const fetchNpmData = async () => {
  const data = await (await fetch('https://registry.npmjs.org/@joshdb/core')).json();

  localStorage.setItem('npmData', JSON.stringify(data));
  return data;
};

const initialData = localStorage.getItem('npmData');

export default createResource<NPMData, true>(fetchNpmData, {
  initialValue: initialData ? JSON.parse(initialData as string) : undefined
});
