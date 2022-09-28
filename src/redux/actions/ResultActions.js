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
