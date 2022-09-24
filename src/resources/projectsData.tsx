import { fetch } from '@sapphire/fetch';
import { createResource } from 'solid-js';
import { ProjectParser } from 'typedoc-json-parser';
import { RepositoryContent, RepositoryContentFileType } from '../types/RepositoryContent';

const initialProjectsData = localStorage.getItem('projectsData');
const fetchProjectsData = async (): Promise<ProjectData[]> => {
  if (initialProjectsData !== null && localStorage.getItem('noCache') !== 'true') return JSON.parse(initialProjectsData);

  const contents = (await fetch<RepositoryContent[]>('https://api.github.com/repos/josh-development/docs/contents')).filter(
    (content) => content.type === RepositoryContentFileType.Directory
  );

  const projects: ProjectData[] = [];

  for (const content of contents) {
    const folderContents = await fetch<RepositoryContent[]>(content.url);

    if (folderContents.some((folderContent) => folderContent.type === RepositoryContentFileType.Directory)) {
      const project: ProjectData = {
        name: content.name,
        isMonoRepo: true,
        projectParsers: []
      };

      for (const folderContent of folderContents) {
        const packageContents = await fetch<RepositoryContent[]>(folderContent.url);
        const projectParsers = [];

        for (const packageContent of packageContents) {
          if (packageContent.download_url === null) throw new Error('Package content has no download url');

          const data = await fetch<ProjectParser>(packageContent.download_url);

          projectParsers.push(new ProjectParser({ data, version: packageContent.name.replace('.json', '') }));
        }

        project.projectParsers.push(projectParsers);
      }
    } else {
      const project: ProjectData = {
        name: content.name,
        isMonoRepo: false,
        projectParsers: []
      };

      for (const folderContent of folderContents) {
        if (folderContent.download_url === null) throw new Error('Package content has no download url');

        const data = await fetch<ProjectParser>(folderContent.download_url);

        project.projectParsers.push(new ProjectParser({ data, version: folderContent.name.replace('.json', '') }));
      }
    }
  }

  localStorage.setItem(
    'projectsData',
    JSON.stringify(
      projects.map((project) =>
        project.isMonoRepo
          ? project.projectParsers.map((projectParsers) => projectParsers.map((projectParser) => projectParser.toJSON()))
          : project.projectParsers.map((projectParser) => projectParser.toJSON())
      )
    )
  );

  return projects;
};

export const projectsData = createResource<ProjectData[], true>(fetchProjectsData, {
  initialValue: initialProjectsData ? JSON.parse(initialProjectsData) : undefined
});

export type ProjectData = ProjectDataSingleRepo | ProjectDataMonoRepo;

export interface ProjectDataSingleRepo {
  name: string;

  isMonoRepo: false;

  projectParsers: ProjectParser[];
}

export interface ProjectDataMonoRepo {
  name: string;

  isMonoRepo: true;

  projectParsers: ProjectParser[][];
}
