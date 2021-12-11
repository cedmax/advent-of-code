const input = require("../../utils/getInput")(__dirname, { split: "\n" });

const IngredientRe =
  /(\w+): capacity (-?\d+), durability (-?\d+), flavor (-?\d+), texture (-?\d+), calories (-?\d+)/;

const getIngredients = (input) => {
  return input.reduce((acc, ingredient) => {
    const [_, name, ...rest] = ingredient.match(IngredientRe);

    acc[name] = {
      capacity: Number(rest[0]),
      durability: Number(rest[1]),
      flavor: Number(rest[2]),
      texture: Number(rest[3]),
      calories: Number(rest[4]),
    };

    return acc;
  }, {});
};

const makeCookie = (ingredients, teaspoons, excludeRule) => {
  const r = Object.keys(ingredients).reduce((acc, ingredient) => {
    const attributes = ingredients[ingredient];
    const count = teaspoons[ingredient];

    acc.calories = (acc.calories || 0) + attributes.calories * count;
    acc.capacity = (acc.capacity || 0) + attributes.capacity * count;
    acc.durability = (acc.durability || 0) + attributes.durability * count;
    acc.flavor = (acc.flavor || 0) + attributes.flavor * count;
    acc.texture = (acc.texture || 0) + attributes.texture * count;
    return acc;
  }, {});

  if (excludeRule(r)) return 0;
  return r.capacity * r.durability * r.flavor * r.texture;
};

const ingredients = getIngredients(input);
const allCombinations = { normal: [], light: [] };
const maxTeaspoons = 100;

const ingredientsList = Object.keys(ingredients);
const qty = ingredientsList.map((i) => 0);
for (qty[0] = 0; qty[0] < maxTeaspoons; qty[0] += 1) {
  for (qty[1] = 0; qty[1] < maxTeaspoons - qty[0]; qty[1] += 1) {
    for (qty[2] = 0; qty[2] < maxTeaspoons - qty[0] - qty[1]; qty[2] += 1) {
      qty[3] = maxTeaspoons - qty[0] - qty[1] - qty[2];
      const ingrMap = ingredientsList.reduce((acc, ingredient, i) => {
        acc[ingredient] = qty[i];
        return acc;
      }, {});

      allCombinations.normal.push(
        makeCookie(ingredients, ingrMap, (r) =>
          Object.values(r).find((item) => item <= 0)
        )
      );
      allCombinations.light.push(
        makeCookie(ingredients, ingrMap, (r) => r.calories !== 500)
      );
    }
  }
}

console.log(allCombinations.normal.sort((a, b) => b - a)[0]);
console.log(allCombinations.light.sort((a, b) => b - a)[0]);
