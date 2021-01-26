/* eslint-disable import/no-anonymous-default-export */
import reduceReducers from "reduce-reducers";
import { applyMiddleware, compose, createStore } from "redux";

// logger is used to see redux states in console. Comment this when building project
import logger from "redux-logger";

import thunk from "redux-thunk";
import profilereducer from "./reducers/profile";

export default () => {
  const reducers = reduceReducers(profilereducer);

  // Uncomment below code if you have redux dev tools enabled in browser and comment again before starting build
  // const devTool =
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //   window.__REDUX_DEVTOOLS_EXTENSION__();

  const store = createStore(
    reducers,
    {
      user: {},
    },
    // uncomment below line when building project for production
    // compose(applyMiddleware(thunk))

    // comment below line when building for production
    compose(applyMiddleware(thunk, logger))

    // uncomment if you want to use devtools locally but comment when building project
    // compose(applyMiddleware(thunk, logger), devTool)
  );
  return store;
};
