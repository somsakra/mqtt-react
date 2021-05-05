import {
  MQTT_SET_CLIENT,
  MQTT_SET_CONNECT_STATUS,
  MQTT_SET_IS_SUBBED,
  MQTT_SET_PAYLOAD,
} from "../Constants";

const initialState = {
  connectStatus: "Off-line",
  client: null,
  isSubed: false,
  payload: {},
};

const mqttReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case MQTT_SET_PAYLOAD:
      return { ...state, payload: payload };
    case MQTT_SET_IS_SUBBED:
      return { ...state, isSubed: payload };
    case MQTT_SET_CONNECT_STATUS:
      return { ...state, connectStatus: payload };
    case MQTT_SET_CLIENT:
      return { ...state, client: payload };
    default:
      return state;
  }
};

export default mqttReducer;
