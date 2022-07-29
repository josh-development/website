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
export type GithubMembers = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}[];

export type files = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url?: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}[];

export interface Docs {
  id: number;
  name: string;
  classes: Array<{
    id: number;
    name: string;
    comment: {
      description: any;
      blockTags: Array<any>;
      modifierTags: Array<any>;
    };
    source: {
      line: number;
      file: string;
      path: string;
    };
    external: boolean;
    abstract: boolean;
    extendsType: {
      kind: string;
      id: any;
      name: string;
      packageName: string;
      typeArguments: Array<{
        kind: string;
        id: number;
        name: string;
        packageName: any;
        typeArguments: Array<{
          kind: string;
          id: number;
          name: string;
          packageName: any;
          typeArguments: Array<any>;
        }>;
      }>;
    };
    implementsType: Array<any>;
    construct: {
      id: number;
      name: string;
      comment: {
        description: any;
        blockTags: Array<any>;
        modifierTags: Array<any>;
      };
      source: {
        line: number;
        file: string;
        path: string;
      };
      parameters: Array<{
        id: number;
        name: string;
        type: {
          kind: string;
          id?: number;
          name: string;
          packageName?: string;
          typeArguments: Array<{
            kind: string;
            id?: number;
            name: string;
            packageName?: string;
            typeArguments: Array<any>;
          }>;
        };
      }>;
    };
    properties: Array<{
      id: number;
      name: string;
      comment: {
        description?: string;
        blockTags: Array<{
          name: string;
          text: string;
        }>;
        modifierTags: Array<any>;
      };
      source: {
        line: number;
        file: string;
        path: string;
      };
      accessibility: string;
      abstract: boolean;
      static: boolean;
      readonly: boolean;
      optional: boolean;
      type: {
        kind: string;
        id?: number;
        name?: string;
        packageName?: string;
        typeArguments?: Array<{
          kind: string;
          id?: number;
          name: string;
          packageName?: string;
          typeArguments: Array<any>;
        }>;
        type?: string;
      };
    }>;
    methods: Array<{
      id: number;
      name: string;
      comment: {
        description: any;
        blockTags: Array<any>;
        modifierTags: Array<any>;
      };
      source: {
        line: number;
        file: string;
        path: string;
      };
      accessibility: string;
      abstract: boolean;
      static: boolean;
      signatures: Array<{
        id: number;
        name: string;
        typeParameters: Array<{
          id: number;
          name: string;
          type?: {
            kind: string;
            id: any;
            name: string;
            packageName: string;
            typeArguments: Array<any>;
          };
          default?: {
            kind: string;
            id: number;
            name: string;
            packageName: any;
            typeArguments: Array<any>;
          };
        }>;
        parameters: Array<{
          id: number;
          name: string;
          type: {
            kind: string;
            id?: number;
            name: string;
            packageName: string;
            typeArguments: Array<{
              kind: string;
              id: number;
              name: string;
              packageName?: string;
              typeArguments: Array<any>;
            }>;
          };
        }>;
        returnType: {
          kind: string;
          id: any;
          name?: string;
          packageName?: string;
          typeArguments?: Array<{
            kind: string;
            id?: number;
            name: string;
            packageName?: string;
            typeArguments: Array<{
              kind: string;
              id: number;
              name: string;
              packageName?: string;
              typeArguments: Array<any>;
            }>;
          }>;
          type?: string;
        };
      }>;
    }>;
  }>;
  constants: Array<any>;
  enums: Array<any>;
  functions: Array<any>;
  interfaces: Array<any>;
  namespaces: Array<{
    id: number;
    name: string;
    comment: {
      description: any;
      blockTags: Array<any>;
      modifierTags: Array<any>;
    };
    source: {
      line: number;
      file: string;
      path: string;
    };
    external: boolean;
    classes: Array<any>;
    constants: Array<any>;
    enums: Array<any>;
    functions: Array<any>;
    interfaces: Array<{
      id: number;
      name: string;
      comment: {
        description: any;
        blockTags: Array<any>;
        modifierTags: Array<any>;
      };
      source: {
        line: number;
        file: string;
        path: string;
      };
      external: boolean;
      properties: Array<{
        id: number;
        name: string;
        comment: {
          description: string;
          blockTags: Array<{
            name: string;
            text: string;
          }>;
          modifierTags: Array<any>;
        };
        source: {
          line: number;
          file: string;
          path: string;
        };
        readonly: boolean;
        type: {
          kind: string;
          id?: number;
          name?: string;
          packageName: any;
          typeArguments?: Array<any>;
          type?: string;
        };
      }>;
    }>;
    namespaces: Array<any>;
    typeAliases: Array<any>;
  }>;
  typeAliases: Array<any>;
}
