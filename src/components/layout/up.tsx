import { FiChevronUp } from 'solid-icons/fi';
import { createSignal } from 'solid-js';

export const Up = () => {
  const [scroll, setScroll] = createSignal(window.scrollY);

  window.addEventListener(
    'scroll',
    () => {
      setScroll(window.scrollY);
    },
    true
  );

  const toTheSky = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    history.pushState('', document.title, window.location.pathname + window.location.search);
  };
  const cl = 'fixed bottom-10 right-10 bg-primary rounded-full transition duration-500 transform';

  return (
    <div class={`${cl} ${scroll() > 100 ? 'translate-y-0' : 'translate-y-24'}`}>
      <button class='p-3' onClick={toTheSky}>
        <FiChevronUp size={24} class='text-white'></FiChevronUp>
      </button>
    </div>
  );
};
