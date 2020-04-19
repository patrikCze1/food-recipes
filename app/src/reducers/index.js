import { combineReducers } from "redux";

const checkReducer = (state = false, action) => {
  switch (action.type) {
    case "CHECK":
      return !state;

    default:
      return state;
  }
}

const recipes = (
  state = {
    isFetching: false,
    didInvalidate: false,
    recipes: [],
  },
  action
) => {
  switch (action.type) {
    case "INVALIDATE_SUBREDDIT":
      return Object.assign({}, state, {
        didInvalidate: true,
      });
    case "REQUEST_RECIPES":
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
      });
    case "RECEIVE_RECIPES":
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        recipes: action.recipes,
        lastUpdated: action.receivedAt,
      });
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  recipes,
});

export default checkReducer;
