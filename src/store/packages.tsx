import { createResource } from 'solid-js';
import type { files } from './types';

const fetchPackageData = async () => {
  const data: files = await fetch('https://api.github.com/repos/josh-development/docs/contents').then((r) => r.json());
  const mapped = data
    .filter((pkg) => pkg.type === 'dir')
    .map((pkg) => ({ name: pkg.name, url: `https://raw.githubusercontent.com/josh-development/docs/main/${pkg.path}/main.json` }));

  localStorage.setItem('packages', JSON.stringify(mapped));
  return data;
};

const initialData = localStorage.getItem('packages');

export default createResource<files, true>(fetchPackageData, {
  initialValue: initialData ? JSON.parse(initialData as string) : undefined
});
