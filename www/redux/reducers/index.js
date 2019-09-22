import { combineReducers } from "redux";
import { testReducers } from "./testReducers";
import { userReducers } from "./userReducers";

export default combineReducers({
  test: testReducers,
  user: userReducers
});
