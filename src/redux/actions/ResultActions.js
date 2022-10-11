import { ActionTypes } from "../constants/action-types";
export const resultAction = (results) => {
  return {
    type: ActionTypes.RESULTS,
    payload: results,
  };
};
export const resultAudioPlayer = (results) => {
  return {
    type: ActionTypes.AUDIOPLAYER,
    payload: results,
  };
};
export const resgistrationSuccess = (results) => {
  return {
    type: ActionTypes.REGISTRAIONSUCCESS,
    payload: results,
  };
};
export const fetchcredentials = (results) => {
  return {
    type: ActionTypes.CREDENTIALS,
    payload: results,
  };
};
