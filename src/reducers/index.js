import { combineReducers } from "redux";
import mqttReducer from "./mqttReducer";
import appReducer from "./appReducer";

export default combineReducers({ mqttReducer, appReducer });
