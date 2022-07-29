import { createSignal } from 'solid-js';
import type { Docs, files } from '../../store/types';

export const Sidebar = ({ docs, packages }: { docs: Docs; packages: files }) => {
  const [open, setOpen] = createSignal<string[]>([docs.name.split('@joshdb/')[1]]);
  const uncollapse = (name: string) => {
    if (open().includes(name)) {
      setOpen(open().filter((x) => x !== name));
    } else {
      setOpen([...open(), name]);
    }
  };

  return (
    <div class='w-60 h-full shadow-md px-1 text-white'>
      <ul class='relative'>
        {packages
          .filter((x) => x.type === 'dir')
          .map((pkg) => (
            <li class='relative' id='sidenavEx1'>
              <button onClick={() => uncollapse(pkg.name)}>
                <span>
                  {pkg.name
                    .split('-')
                    .map((n) => n[0].toUpperCase() + n.slice(1))
                    .join('')}
                </span>
              </button>
              <ul class={`h-${open().includes(pkg.name) ? 'full' : '0'} transition overflow-hidden`}>
                <li class='relative'>
                  <a class='relative'>Link 1</a>
                </li>
              </ul>
            </li>
          ))}
      </ul>
    </div>
  );
};
