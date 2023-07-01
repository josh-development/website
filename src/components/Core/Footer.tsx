import { createMemo, createSignal, onMount } from 'solid-js';
import { shuffleArray } from '../../utils/shuffle';
import type { GithubMembers } from '../../utils/types';

const urls = [
  'https://api.github.com/orgs/josh-development/members',
  'https://api.github.com/repos/josh-development/core/contributors',
  'https://api.github.com/repos/josh-development/providers/contributors'
];

export default function CoreFooter() {
  const [members, setMembers] = createSignal<GithubMembers>([]);

  onMount(async () => {
    if (localStorage.getItem('members')) {
      setMembers(JSON.parse(localStorage.getItem('members')!) as GithubMembers);
    } else {
      const promises = [];

      for (const url of urls) {
        const prom = fetch(url)
          .then((res) => res.json())
          .then((data) => {
            setMembers((old) => [
              ...old,
              ...(data as GithubMembers)
                .filter((member) => member.type !== 'Bot' && !old.some((oldMember) => oldMember.id === member.id))
                .map((member) => ({
                  login: member.login,
                  id: member.id,
                  avatar_url: member.avatar_url,
                  url: member.url,
                  html_url: member.html_url,
                  type: member.type
                }))
            ]);
          });

        promises.push(prom);
      }

      await Promise.all(promises);

      if (members().length > 0) {
        localStorage.setItem('members', JSON.stringify(members()));
      }
    }
  });

  const shuffledMembers = createMemo(() => {
    return shuffleArray(members()).slice(0, 10);
  });

  return (
    <footer class="w-full border-t border-zinc-800 pt-5 pb-5 px-10">
      <div class="flex">
        <div>
          <h1 class="text-4xl dark:text-white font-ledger">Josh</h1>
          <p class="dark:text-gray-300 mt-2">Copyright &copy; {new Date().getFullYear()} - Josh Team</p>
        </div>
        <div class="ml-auto">
          <div class="flex items-center flex-wrap mt-2 -mr-2 justify-center">
            {shuffledMembers().map((member) => (
              <a href={member.html_url} rel="noopener" target="_blank" class="focus:outline-none w-12 h-12 bg-cover bg-center rounded-md -ml-2">
                <img
                  loading="lazy"
                  src={`${member.avatar_url}&size=48`}
                  alt={member.login}
                  class="h-full w-full bg-white overflow-hidden object-cover rounded-full border-2 border-white shadow"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
