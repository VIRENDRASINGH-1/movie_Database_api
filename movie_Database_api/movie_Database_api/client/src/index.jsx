import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import MainView from "./components/main-view/main-view";
import moviesApp from "./reducers/reducers";

//Import statement to indicate that you need to bundle `./index.scss`

import "./index.scss";

const store = createStore(moviesApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// Main component (will eventually use all the others)

class My1980sMoviesAPI extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

// Finds the root of the app

const container = document.getElementsByClassName("app-container")[0];

// Tells React to render your app in the root DOM element

ReactDOM.render(React.createElement(My1980sMoviesAPI), container);
