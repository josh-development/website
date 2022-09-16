export * from './classes';
export * from './enums';
export * from './interfaces';
export * from './methods';
export * from './readme';

// While cool, this unfortunately meant the page would not be able to snap to an id
// export const Readme = lazy(() => import('./readme'));
// export const Interfaces = lazy(() => import('./interfaces'));
// export const Methods = lazy(() => import('./methods'));
// export const Classes = lazy(() => import('./classes'));

// export const DocsReadme = (props: ReadmeProps) => (
//   <Suspense fallback={DocsLoading}>
//     <Readme {...props}></Readme>
//   </Suspense>
// );

// export const DocsInterfaces = (props: InterfacesProps) => (
//   <Suspense fallback={DocsLoading}>
//     <Interfaces {...props}></Interfaces>
//   </Suspense>
// );

// export const DocsMethods = (props: MethodsProps) => (
//   <Suspense fallback={DocsLoading}>
//     <Methods {...props}></Methods>
//   </Suspense>
// );

// export const DocsClasses = (props: ClassesProps) => (
//   <Suspense fallback={DocsLoading}>
//     <Classes {...props}></Classes>
//   </Suspense>
// );
