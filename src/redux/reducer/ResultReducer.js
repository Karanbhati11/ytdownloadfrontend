import { ActionTypes } from "../constants/action-types";
const initialstate = {
  results: [],
  audioresults: [],
  resgistrationmessage: {},
  credentials: {},
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
export const resgistrationSuccessReducer = (
  state = initialstate.resgistrationmessage,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.REGISTRAIONSUCCESS:
      return { ...state, results: payload };
    default:
      return state;
  }
};
export const fetchCredentials = (
  state = initialstate.credentials,
  { type, payload }
) => {
  switch (type) {
    case ActionTypes.CREDENTIALS:
      return { ...state, results: payload };
    default:
      return state;
  }
};
