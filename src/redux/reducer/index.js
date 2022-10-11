import { combineReducers } from "redux";
import {
  resultReducer,
  audioresultReducer,
  resgistrationSuccessReducer,
  fetchCredentials,
} from "./ResultReducer";
const reducers = combineReducers({
  allResults: resultReducer,
  audioResult: audioresultReducer,
  registration: resgistrationSuccessReducer,
  credentials: fetchCredentials,
});

export default reducers;
