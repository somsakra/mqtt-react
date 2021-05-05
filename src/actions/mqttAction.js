import {
  MQTT_SET_CLIENT,
  MQTT_SET_CONNECT_STATUS,
  MQTT_SET_IS_SUBBED,
  MQTT_SET_PAYLOAD,
} from "../Constants";

export const setPayload = (payload) => ({
  type: MQTT_SET_PAYLOAD,
  payload,
});

export const setIsSuped = (payload) => ({
  type: MQTT_SET_IS_SUBBED,
  payload,
});

export const setConnectStatus = (payload) => ({
  type: MQTT_SET_CONNECT_STATUS,
  payload,
});

export const setClient = (payload) => ({
  type: MQTT_SET_CLIENT,
  payload,
});
