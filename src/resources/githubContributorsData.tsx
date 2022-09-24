import { fetch } from '@sapphire/fetch';
import { createResource } from 'solid-js';
import { RawRepositoryContributor, RawRepositoryContributorType, RepositoryContributor } from '../types/RepositoryContributor';

const repositories = ['core', 'middlewares', 'providers', 'utilities', 'website'];
const initialGitHubContributorsData = localStorage.getItem('githubContributorsData');
const fetchGitHubContributorsData = async (): Promise<RepositoryContributor[]> => {
  if (initialGitHubContributorsData !== null) return JSON.parse(initialGitHubContributorsData);

  const allContributors = (
    await Promise.all(
      repositories.map(async (repository) => {
        const rawContributors = await fetch<RawRepositoryContributor[]>(`https://api.github.com/repos/josh-development/${repository}/contributors`);

        return rawContributors
          .filter((rawContributor) => rawContributor.type === RawRepositoryContributorType.User)
          .map<RepositoryContributor>((rawContributor) => ({
            username: rawContributor.login,
            avatarUrl: rawContributor.avatar_url,
            profileUrl: rawContributor.html_url
          }));
      })
    )
  ).flat();

  const contributors: RepositoryContributor[] = [];

  for (const contributor of allContributors) {
    if (contributors.some((c) => c.username === contributor.username)) continue;

    contributors.push(contributor);
  }

  localStorage.setItem('githubContributorsData', JSON.stringify(contributors));

  return contributors;
};

export const githubContributorsData = createResource<RepositoryContributor[], true>(fetchGitHubContributorsData, {
  initialValue: initialGitHubContributorsData ? JSON.parse(initialGitHubContributorsData) : undefined
});
