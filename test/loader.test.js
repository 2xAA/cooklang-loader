/**
 * @jest-environment node
 */
import compiler from "./compiler.js";

test("Parses Cooklang file", async () => {
  const stats = await compiler("Easy Pancakes.cook");
  const output = stats.toJson({ source: true }).modules[0].source;

  expect(output).toBe(
    'export const recipe = {"ingredients":[{"type":"ingredient","name":"eggs","quantity":3,"units":""},{"type":"ingredient","name":"flour","quantity":125,"units":"g"},{"type":"ingredient","name":"milk","quantity":250,"units":"ml"},{"type":"ingredient","name":"sea salt","quantity":1,"units":"pinch"},{"type":"ingredient","name":"oil","quantity":"some","units":""}],"cookwares":[{"type":"cookware","name":"bowl","quantity":1},{"type":"cookware","name":"large non-stick frying pan","quantity":1}],"metadata":{},"steps":[[{"type":"text","value":"Crack the "},{"type":"ingredient","name":"eggs","quantity":3,"units":""},{"type":"text","value":" into a blender, then add the "},{"type":"ingredient","name":"flour","quantity":125,"units":"g"},{"type":"text","value":", "},{"type":"ingredient","name":"milk","quantity":250,"units":"ml"},{"type":"text","value":" and "},{"type":"ingredient","name":"sea salt","quantity":1,"units":"pinch"},{"type":"text","value":", and blitz until smooth."}],[{"type":"text","value":"Pour into a "},{"type":"cookware","name":"bowl","quantity":1},{"type":"text","value":" and leave to stand for "},{"type":"timer","name":"","quantity":15,"units":"minutes"},{"type":"text","value":"."}],[{"type":"text","value":"Melt the butter (or a drizzle of "},{"type":"ingredient","name":"oil","quantity":"some","units":""},{"type":"text","value":" if you want to be a bit healthier) in a "},{"type":"cookware","name":"large non-stick frying pan","quantity":1},{"type":"text","value":" on a medium heat, then tilt the pan so the butter coats the surface."}],[{"type":"text","value":"Pour in 1 ladle of batter and tilt again, so that the batter spreads all over the base, then cook for 1 to 2 minutes, or until it starts to come away from the sides."}],[{"type":"text","value":"Once golden underneath, flip the pancake over and cook for 1 further minute, or until cooked through."}],[{"type":"text","value":"Serve straightaway with your favourite topping."}]],"shoppingList":{},"parser":{"defaultUnits":"","defaultCookwareAmount":1,"defaultIngredientAmount":"some","includeStepNumber":false}};\nexport default recipe;'
  );
});

test("Parses Cooklang file and includes import_path", async () => {
  const stats = await compiler("Easy Pancakes.cook", {
    include_import_path: true,
  });
  let output = stats.toJson({ source: true }).modules[0].source;

  output = output.replace("export const recipe = ", "");
  output = output.replace(";\nexport default recipe;", "");

  const jsonOutput = JSON.parse(output);

  expect(jsonOutput.metadata).toHaveProperty("import_path");
});
