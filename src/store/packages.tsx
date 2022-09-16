import type { InitializedResourceReturn } from 'solid-js';
import { createResource } from 'solid-js';
import type { files } from './types';

export interface foundPackage {
  url: string;
  name: string;
  path: string;
}

const recursiveMainJson = async (data: files): Promise<foundPackage[]> => {
  const main = data.find((x) => x.name === 'main.json');
  const final: foundPackage[] = [];

  if (main) {
    final.push({ url: main.download_url!, name: main.path.split('/')[main.path.split('/').length - 2], path: main.path });
  } else {
    for (const file of data.filter((x) => x.type === 'dir')) {
      const res = await fetch(file.url).then((r) => r.json());
      const found = await recursiveMainJson(res);

      final.push(...found);
    }
  }

  return final;
};

const initialData = localStorage.getItem('packages');
const fetchPackageData = async () => {
  if (initialData) return JSON.parse(initialData);

  const data: files = await fetch('https://api.github.com/repos/josh-development/docs/contents').then((r) => r.json());
  const mapped = await recursiveMainJson(data);

  localStorage.setItem('packages', JSON.stringify(mapped));
  return mapped;
};

export default createResource<foundPackage[], true>(fetchPackageData, {
  initialValue: initialData ? JSON.parse(initialData as string) : []
}) as InitializedResourceReturn<foundPackage[], true>;
