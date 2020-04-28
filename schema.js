const axios = require("axios");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLInt,
  GraphQLBoolean
} = require("graphql");
const key = require('./config');

// Search
const SearchType= new GraphQLObjectType({
  name: "Search",
  fields: () => ({
    offset: { type: GraphQLInt },
    number: { type: GraphQLInt },
    results: { type: GraphQLList(RecipesType) },
    totalResults: { type: GraphQLInt },
    cuisine: { type: GraphQLString },
  }),
});

// Recipe type
const RecipesType = new GraphQLObjectType({
  name: "Recipes",
  fields: () => ({
    id: { type: GraphQLInt },
    image: { type: GraphQLString },
    readyInMinutes: { type: GraphQLInt },
    servings: { type: GraphQLInt },
    title: { type: GraphQLString },
    offset: { type: GraphQLInt },
  }),
});

// RecipeDetail type
const RecipeDetailType = new GraphQLObjectType({
  name: "RecipeDetail",
  fields: () => ({
    title: { type: GraphQLString },
    image: { type: GraphQLString },
    servings: { type: GraphQLInt },
    readyInMinutes: { type: GraphQLInt },
    vegan: { type: GraphQLBoolean },
    vegetarian: { type: GraphQLBoolean },
    cuisines: { type: GraphQLList(GraphQLString) },
    dishTypes: { type: GraphQLList(GraphQLString) },
    extendedIngredients: { type: GraphQLList(IngredientType) },
  }),
});

// Ingredient type
const IngredientType = new GraphQLObjectType({
  name: "Ingredient",
  fields: () => ({
    aisle: { type: GraphQLString },
    amount: { type: GraphQLFloat },
    name: { type: GraphQLString },
    original: { type: GraphQLString },
    measures: { type: MeasuresType },
  }),
});

// Measures type
const MeasuresType = new GraphQLObjectType({
  name: "Measures",
  fields: () => ({
    metric: { type: MeasureType },
    us: { type: MeasureType },
  }),
});

// Measure type
const MeasureType = new GraphQLObjectType({
  name: "Measure",
  fields: () => ({
    amount: { type: GraphQLFloat },
    unitLong: { type: GraphQLString },
    unitShort: { type: GraphQLString },
  }),
});

// root query
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    search: {
      type: SearchType,
      args: {
        offset: { type: GraphQLInt },
        query: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://api.spoonacular.com/recipes/search?offset=${args.offset}&query=${args.query}&apiKey=${key.api}`
          )
          .then((res) => res.data);
      },
    },
    recipe: {
      type: RecipeDetailType,
      args: {
        id: { type: GraphQLInt },
      },
      resolve(parent, args) {
        return axios
          .get(
            `https://api.spoonacular.com/recipes/${args.id}/information?apiKey=${key.api}`
          )
          .then((res) => res.data);
      },
    },
    random_recipes: {
      type: RecipeDetailType,
      resolve(parent, args) {
        return axios
          .get(
            `https://api.spoonacular.com/recipes/random?apiKey=${key.api}`
          )
          .then((res) => res.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
