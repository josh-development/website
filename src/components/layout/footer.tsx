import { createMemo } from 'solid-js';
import githubMembers from '../../store/members';

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];

    array[i] = array[j];
    array[j] = temp;
  }

  return array;
}

const [members] = githubMembers;

export const Footer = () => {
  const mems = createMemo(() => {
    const membs = members() || [];

    return shuffleArray(membs).slice(0, 10);
  });

  return (
    <footer class='w-full border-t border-gray-500 pt-5 pb-5 sm:pb-1'>
      <div class='flex'>
        <div>
          <h1 class='text-4xl dark:text-white'>Josh</h1>
          <p class='dark:text-gray-300 mt-2'>Copyright &copy; {new Date().getFullYear()} - Josh Team</p>
        </div>
        <div class='ml-auto'>
          <div class='flex items-center flex-wrap mt-2 -mr-2 justify-center'>
            {mems().map((member) => (
              <a href={member.html_url} rel='noopener' target='_blank' class='focus:outline-none w-12 h-12 bg-cover bg-center rounded-md -ml-2'>
                <img
                  loading='lazy'
                  src={`${member.avatar_url}&size=48`}
                  alt={member.login}
                  class='h-full w-full bg-white overflow-hidden object-cover rounded-full border-2 border-white shadow'
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
