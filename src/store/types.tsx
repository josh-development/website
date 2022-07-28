export interface NPMData {
  _id: string;
  _rev: string;
  name: string;
  'dist-tags': {
    [key: string]: string;
  };
  versions: {
    [key: string]: {
      name: string;
      version: string;
      description: string;
      main: string;
      scripts: {
        test: string;
        docs: string;
      };
      repository: {
        type: string;
        url: string;
      };
      author: {
        name: string;
        email: string;
        url: string;
      };
      license: string;
      bugs: {
        url: string;
      };
      homepage: string;
      dependencies: {
        lodash: string;
      };
      devDependencies: {
        [key: string]: string;
      };
      types: string;
      gitHead: string;
      _id: string;
      _nodeVersion: string;
      _npmVersion: string;
      dist: {
        integrity: string;
        shasum: string;
        tarball: string;
        fileCount: number;
        unpackedSize: number;
        'npm-signature': string;
        signatures: Array<{
          keyid: string;
          sig: string;
        }>;
      };
      _npmUser: {
        name: string;
        email: string;
      };
      directories: any;
      maintainers: Array<{
        name: string;
        email: string;
      }>;
      _npmOperationalInternal: {
        host: string;
        tmp: string;
      };
      _hasShrinkwrap: boolean;
    };
  };
  time: {
    created: string;
    modified: string;
    [key: string]: string;
  };
  maintainers: Array<{
    name: string;
    email: string;
  }>;
  description: string;
  homepage: string;
  repository: {
    type: string;
    url: string;
  };
  author: {
    name: string;
    email: string;
    url: string;
  };
  bugs: {
    url: string;
  };
  license: string;
  readme: string;
  readmeFilename: string;
}
