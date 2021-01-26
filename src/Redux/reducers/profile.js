/* eslint-disable import/no-anonymous-default-export */
import { ADD_USER_ } from "../constants";

export default (state, { payload, type }) => {
  switch (type) {
    case ADD_USER_:
      return { ...state, user: payload };
    default:
      return { ...state };
  }
};
