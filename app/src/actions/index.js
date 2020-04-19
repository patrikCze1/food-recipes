export function requestRecipes(subreddit) {
  return {
    type: "REQUEST_RECIPES",
    subreddit,
  };
}

export function requestRecipe(id) {
  return {
    type: "REQUEST_RECIPE",
    id,
  };
}

export function checkIngredient(ingredient) {
  return {
    type: "CHECK_INGREDIENT",
    ingredient,
  };
}

export function receiveRecipe(subreddit, json) {
  return {
    type: "RECEIVE_RECIPE",
    subreddit,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now(),
  };
}

export function receiveRecipes(subreddit, json) {
  return {
    type: "RECEIVE_RECIPES",
    subreddit,
    posts: json.data.children.map((child) => child.data),
    receivedAt: Date.now(),
  };
}

export function fetchRecipes(page) {
  return function(dispatch) {
    dispatch(requestRecipes(page))
  }
}