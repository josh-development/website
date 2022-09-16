import type { Accessor, JSX } from 'solid-js';
import type { ClassMethodParser, ClassParser, ProjectParser } from 'typedoc-json-parser';
import type { foundPackage } from '../store/packages';

export interface DocsPageParams {
  type: string;
  pkg: string;
  page: string;
  category: string;
}
export interface ExtraClassMethod extends ClassMethodParser {
  from: ClassParser;
}

type selectedPkg = Accessor<ProjectParser | undefined>;
type params = Accessor<DocsPageParams>;
type onUpdateScroll = (value: boolean) => void;

export interface ClassesProps {
  selectedPkg: selectedPkg;
  params: params;
  onUpdateScroll: onUpdateScroll;
}
export interface InterfacesProps {
  selectedPkg: selectedPkg;
  onUpdateScroll: onUpdateScroll;
  params: params;
}
export interface EnumsProps {
  selectedPkg: selectedPkg;
  onUpdateScroll: onUpdateScroll;
  params: params;
}
export interface MethodsProps {
  params: params;
  allMethods: Accessor<ExtraClassMethod[]>;
  selectedPkg: selectedPkg;
  onUpdateScroll: onUpdateScroll;
}
export interface ReadmeProps {
  selectedPkg: selectedPkg;
}
export interface NavigationProps {
  selectedPkg: selectedPkg;
  allMethods: Accessor<ExtraClassMethod[]>;
  params: params;
  folders: Accessor<
    {
      name: string;
      packages: foundPackage[];
    }[]
  >;
  docs: {
    name: string;
    category: string;
    pages: {
      name: string;
      page: string;
      component: JSX.Element;
    }[];
  }[];
  scrollValue: Accessor<number>;
  onSetPackage: (pkg?: string) => void;
  onChoosePackage: (pkg: string) => void;
}
