import { combineReducers } from "redux";
import auth from "./auth";
import layout from "./layout"


export default combineReducers({
    auth,
    layout
});