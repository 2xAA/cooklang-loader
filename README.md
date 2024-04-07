# Cooklang Loader

Webpack Loader for Cooklang .cook files.

## Setup

### Install this package

```bash
npm install --save-dev cooklang-loader
# OR
yarn add -D cooklang-loader
```

### Update your config

Add the plugin to your Webpack config as below:

```js
// wepback.config.js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.cook/,
        use: {
          loader: "cooklang-loader",
          options: { include_import_path: false },
        },
      },
    ],
  },
};
```

## Usage

Recipes are loaded using the [Cooklang-TS](https://github.com/cooklang/cooklang-ts) library and have the below properties:

```js
import recipe from "./test/example/recipes/Easy Pancakes.cook";

const { ingredients, cookwares, metadata, steps, shoppingList } = recipe;
```

Additionally, in the Webpack config there is an option available named `include_import_path` which is a boolean.  
If passed true (default false), the loader will return the full path of the .cook file in the `metadata` key on `import_path` which **may include sensitive data**.

This is to maintain compatibility with [vite-plugin-cooklang](https://github.com/kauhat/vite-plugin-cooklang) and to allow you to create a title for the recipe dynamically from the filename.

## Thanks

- [vite-plugin-cooklang](https://github.com/kauhat/vite-plugin-cooklang)
- The [Cooklang-TS](https://github.com/cooklang/cooklang-ts) TypeScript library
- The [Cooklang](https://github.com/cooklang) project and it's contributors
