import { ActionTypes } from "../constants/action-types";
const initialstate = {
  results: [],
};

export const resultReducer = (state = initialstate, { type, payload }) => {
  switch (type) {
    case ActionTypes.RESULTS:
      return { ...state, results: payload };
    default:
      return state;
  }
};
