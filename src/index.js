import React from "react";
import "./index.css";
import App from "./App";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configStore from "./Redux/Store";

const store = configStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
