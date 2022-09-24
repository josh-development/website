export interface RawRepositoryContributor {
  login: string;

  avatar_url: string;

  html_url: string;

  type: RawRepositoryContributorType;
}

export enum RawRepositoryContributorType {
  User = 'User',

  Bot = 'Bot'
}

export interface RepositoryContributor {
  username: string;

  avatarUrl: string;

  profileUrl: string;
}
