import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, SET_USER } from "../actions/actions";

function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function currentUser(state = {}, action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  currentUser
});

export default moviesApp;
