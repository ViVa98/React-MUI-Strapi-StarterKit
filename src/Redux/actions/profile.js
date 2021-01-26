import { ADD_USER_ } from "../constants";

export const ADD_USER = (_data) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: ADD_USER_,
        payload: _data,
      });
    } catch (error) {}
  };
};
