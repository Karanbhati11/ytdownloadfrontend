import { combineReducers } from "redux";
import { resultReducer, audioresultReducer } from "./ResultReducer";

const reducers = combineReducers({
  allResults: resultReducer,
  audioResult: audioresultReducer,
});

export default reducers;
