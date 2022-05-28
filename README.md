# Overwolf-Svelte Sample App

This is a project template using [Svelte](https://svelte.dev) based on the [Overwolf Sample App](https://github.com/overwolf/sample-app).

To create a new project based on this template using [degit](https://github.com/Rich-Harris/degit):

```bash
npx degit yourfavoritekyle/overwolf-svelte ow-app
cd ow-app
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

If you're using [Visual Studio Code](https://code.visualstudio.com/) we recommend installing the official extension [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode). If you are using other editors you may need to install a plugin in order to get syntax highlighting and intellisense.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

## Using TypeScript

If you want to use `baseUrl` or `path` aliases within your `tsconfig`, you need to set up `@rollup/plugin-alias` to tell Rollup to resolve the aliases. For more info, see [this StackOverflow question](https://stackoverflow.com/questions/63427935/setup-tsconfig-path-in-svelte).

---

_Psst — looking for a more information on Svelte? Check out [Svelte](https://svelte.dev)!_

_Maybe you need more information on Overwolf? Check out [Overwolf](https://overwolf.github.io/)_
