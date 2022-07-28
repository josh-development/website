import { createResource } from 'solid-js';
import type { GithubMembers } from './types';

const fetchGithubMembers = async () => {
  const members = await (await fetch('https://api.github.com/orgs/josh-development/members')).json();
  const coreContributors = await (await fetch('https://api.github.com/repos/josh-development/core/contributors')).json();
  const providerContributors = await (await fetch('https://api.github.com/repos/josh-development/providers/contributors')).json();
  const data: GithubMembers = [];

  for (const u of [...members, ...coreContributors, ...providerContributors]) {
    if (!data.find((x) => x.login === u.login) && u.login.split('bot').length === 1) {
      data.push(u);
    }
  }

  localStorage.setItem('githubMembers', JSON.stringify(data));
  return data;
};

const initialData = localStorage.getItem('githubMembers');

export default createResource<GithubMembers, true>(fetchGithubMembers, {
  initialValue: initialData ? JSON.parse(initialData as string) : undefined
});
