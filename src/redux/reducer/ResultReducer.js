import { ActionTypes } from "../constants/action-types";
const initialstate = {
  results: [],
  audioresults: [],
};

export const resultReducer = (
  state = initialstate.results,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.RESULTS:
      return { ...state, results: payload };
    default:
      return state;
  }
};
export const audioresultReducer = (
  state = initialstate.audioresults,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.AUDIOPLAYER:
      return { ...state, results: payload };
    default:
      return state;
  }
};
