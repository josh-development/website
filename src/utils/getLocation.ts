// @joshdb/provider.Payload.Hook<StoredValue, unknown>
export const getLocation = (type: string) => {
  const possiblePackage = type.split('.')[0];

  switch (possiblePackage.split('/')[0]) {
    case '@joshdb':
      return { url: `/docs/${possiblePackage.split('/')[1]}?search=${type.split('.')[1]}`, text: type.split('.')[1] };

    case 'typescript':
      return { url: `https://www.typescriptlang.org/docs/handbook/${type.split('.')[1]}.html`, text: type.split('.')[1] };

    default:
      return { url: '/docs/', text: type };
  }
};
