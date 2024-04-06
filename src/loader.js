import { Recipe } from "@cooklang/cooklang-ts";
import { validate } from "schema-utils";

const schema = {
  type: "object",
  properties: {
    include_import_path: {
      type: "boolean",
    },
  },
};

export default function (source) {
  const options = this.getOptions();

  validate(schema, options, {
    name: "Cooklang Loader",
    baseDataPath: "options",
  });

  const recipe = new Recipe(source);

  if (options.include_import_path) {
    recipe.metadata.import_path = this.resourcePath;
  }

  return `export const recipe = ${JSON.stringify(recipe)};
export default recipe;`;
}
