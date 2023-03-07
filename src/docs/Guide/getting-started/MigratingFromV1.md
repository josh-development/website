# Migrating from v1

TODO

## Why should I migrate?

Well, simply put, v2 is a complete rewrite of v1.
It was written in TypeScript and has more features, such as:

- Advanced middleware support.
  This makes many features possible without injecting them into the core code like v1 did.
- A more robust error handling system.
- It has bundles in ESM and CommonJS.
  This makes it possible for you to use Josh in many different project environments.
- Designed with first class TypeScript support in mind.

## Prequisites

v2 uses different formats for saving data then v1.
So, you may need to migrate some code that works directly with your backend with Josh.
That being said, it's wise to make a backup of your database backend before beginning migration.

## Migrating

There has been a lot changed in v2, so please read all the changes carefully to ensure your migration is smooth and sound.

### Importing Josh

In v1, you could import or require Josh with it's default export, that has since been removed and now uses named exports.

```diff
import Josh from '@joshdb/core';
import { Josh } from '@joshdb/core';
```

### Initialization

There are many options that have changed or since been removed in v2.
Please reference the below content to see what has changed.

#### Provider

In v1, you would pass the provider class to `options.provider` and then it's options to `options.providerOptions`.

In v2, you now pass the provider options to the instance of your provider which is pass onto `options.provider`.

```diff
import { Josh } from '@joshdb/core';
import { Provider } from 'provider';

const josh = new Josh({
  name: 'users',
- provider: Provider,
- providerOptions: {
-   option: 'option'
- },
+ provider: Provider({
+   options: 'option'
+ })
});
```

#### AutoEnsure

In v1, you would pass a value to ensure for most operations to the database.

In v2, that option has been moved to the [`AutoEnsureMiddleware`](https://github.com/josh-development/middlewares/blob/main/packages/auto-ensure/src/lib/AutoEnsureMiddleware.ts) class.

```diff
import { Josh } from '@joshdb/core';
import { Provider } from 'provider';
+ import { AutoEnsureMiddleware } from '@joshdb/auto-ensure';

const josh = new Josh({
  name: 'users',
  provider: new Provider(),
- autoEnsure: 'default-value',
+ middlewares: [new AutoEnsureMiddleware({ defaultValue: 'default-value' })]
})
```

#### Serialization

In v1 you would pass a function to each `options.serialize` and `options.deserialize` to transform data to and from your database backend.

In v2, this option has been moved to the [`TransformMiddleware`](https://github.com/josh-development/middlewares/blob/main/packages/transform/src/lib/TransformMiddleware.ts) class.

```diff
import { Josh } from '@joshdb/core';
import { Provider } from 'provider';
+ import { TransformMiddleware } from '@joshdb/transform';

const Josh = new Josh({
  name: 'users',
  provider: new Provider(),
- serialize(data) {
-   return {...data, data.name.toUpperCase() };
- },
- deserialize(data) {
-   return {...data, data.name.toLowerCase() };
- },
+ middlewares: [
+   new TransformMiddleware({
+     before(data) {
+       return {...data, data.name.toUpperCase() };
+     },
+     after(data) {
+       return {...data, data.name.toLowerCase() };
+     }
+   })
+ ]
});
```

### Methods & Properties

Below lists all methods and properties that have breaking changes from v1 to v2.

- `autoId()` has been renamed to `autoKey()`.

```diff
- await josh.autoId();
+ await josh.autoKey();
```

- `delete()` no longer supports a string array or a symbol.
  Use `deleteMany()` and `clear()` instead.

```diff
- await josh.delete(josh.all);
+ await josh.clear();

- await josh.delete(['key1', 'key2']);
+ await josh.deleteMany(['key1', 'key2']);
```

- `find()` no long returns an object, but returns an array.

```diff
- const [[key, value]] = Object.entries(await josh.find());
+ const [key, value] = await josh.find();
```

- `getMany()` no longer support a symbol.
  Use `getAll()` instead.

```diff
- await josh.getMany(josh.all);
+ await josh.getAll();
```

- `math()` no longer has a fourth `path` parameter.
- `push()` no longer has a third `allowDupes` parameter.
  Rather save a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set) which doesn't allow duplicate values.
- `random()` first `count` parameter has been renamed to `options`.
  Use `options.count` instead.

```diff
- await josh.random(2);
+ await josh.random({ count: 2 });
```

- `randomKey()` first `count` parameter has been renamed to `options`.
  Use `options.count` instead.

```diff
- await josh.randomKey(2);
+ await josh.randomKey({ count: 2 });
```

- `size` is no longer a getter.
  Use `size()` instead.

```diff
- await josh.size;
+ await josh.size();
```

- `update()` no longer accepts a non-function value for the second `hook` parameter.

```diff
- await josh.update('key', { path: 'value' });
+ await josh.update('key', (value) => ({ ...value, path: 'value' }));
```
