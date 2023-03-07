# Introduction

Welcome to Josh, we're glad you have decided to follow our guide to the wonders of simple database integration!

## Getting Started

To use Josh, you need to install `@joshdb/core`. You can use the following command, or replace `npm install` with your package manager of choice.

```sh
npm install @joshdb/core
```

## Quick Start

To begin, import `@joshdb/core` and initiate [`Josh`](https://github.com/josh-development/core/blob/main/src/lib/structures/Josh.ts). This is where you can customize Josh's behavior.

The below snippet will create a [`Josh`](https://github.com/josh-development/core/blob/main/src/lib/structures/Josh.ts) instance, by default (without a provider), this will save all data in-memory.

**Please note, all the code snippets below will be using [ECMAScript Modules (ESM)](https://nodejs.org/api/esm.html#introduction) over CommonJS**

```javascript
import { Josh } from '@joshdb/core';

const josh = new Josh({ name: 'users' });

await josh.init();
```

## Using TypeScript

Josh is written in TypeScript so support for it comes by default. An example of creating an instance of [`Josh`](https://github.com/josh-development/core/blob/main/src/lib/structures/Josh.ts) with TypeScript is below.

```typescript
import { Josh } from '@joshdb/core';

interface User {
  id: string;

  username: string;
}

const josh = new Josh<User>({ name: 'users' });

await josh.init();
```
