import { combineReducers } from "redux";
import fnCountReducer from "./fnCounter/fnReducers";
import classCountReducer from "./classCounter/classReducers";

export default combineReducers({
  fnCountReducer: fnCountReducer,
  classCountReducer: classCountReducer,
});
