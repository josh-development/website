import { useParams } from 'solid-app-router';
import { createResource } from 'solid-js';
import { Sidebar } from '../components/packages/sidebar';
import packageData from '../store/packages';
import type { Docs } from '../store/types';
import { NotFoundPage } from './notfound';

const [packages] = packageData;

export const PackagePage = () => {
  const params = useParams();
  const pkg = packages()?.find((pkg) => pkg.name === params.package);
  if (!pkg) return <NotFoundPage />;

  const fetchPackageData = async () => {
    const data = await fetch(pkg.url).then((r) => r.json());

    localStorage.setItem(pkg.name, JSON.stringify(data));
    return data;
  };

  const initialData = localStorage.getItem(pkg.name);
  const [docs] = createResource<Docs, true>(fetchPackageData, {
    initialValue: initialData ? JSON.parse(initialData as string) : undefined
  });

  return (
    <div class='flex min-h-[80vh]'>
      <Sidebar packages={packages()!} docs={docs()!}></Sidebar>
    </div>
  );
};
