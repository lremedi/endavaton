import { combineReducers } from "redux";
import { events } from "./reducers/events";

export default combineReducers({
    events: events
});