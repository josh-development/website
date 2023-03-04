import { getRawPackageManifest, RawPackageManifest } from 'query-registry';
import { createResource } from 'solid-js';

const initialNpmRegistryData = localStorage.getItem('npmRegistryData');
const fetchNpmRegistryData = async (): Promise<RawPackageManifest> => {
  if (initialNpmRegistryData !== null) return JSON.parse(initialNpmRegistryData);

  const data = await getRawPackageManifest({ name: '@joshdb/core' });

  localStorage.setItem('npmRegistryData', JSON.stringify(data));

  return data;
};

export const npmRegistryData = createResource<RawPackageManifest, true>(fetchNpmRegistryData, {
  initialValue: initialNpmRegistryData ? JSON.parse(initialNpmRegistryData) : undefined
});
