import { combineReducers } from "redux";
import { resultReducer } from "./ResultReducer";

const reducers = combineReducers({
  allResults: resultReducer,
});

export default reducers;
