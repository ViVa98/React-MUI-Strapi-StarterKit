/* eslint-disable import/no-anonymous-default-export */
import reduceReducers from "reduce-reducers";
import { applyMiddleware, compose, createStore } from "redux";
import logger from "redux-logger";
import thunk from "redux-thunk";
import profilereducer from "./reducers/profile";

export default () => {
  const reducers = reduceReducers(profilereducer);
  const devTool =
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
    window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(
    reducers,
    {
      user: {},
    },
    // compose(applyMiddleware(thunk))
    compose(applyMiddleware(thunk, logger), devTool)
  );
  return store;
};
