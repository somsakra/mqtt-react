import React, { useEffect } from "react";
import mqtt from "mqtt";
import { useDispatch, useSelector } from "react-redux";
import {
  setClient,
  setConnectStatus,
  setIsSuped,
  setPayload,
} from "./actions/mqttAction";
import { setInstallStatus } from "./actions/appAction";

const imageUrl = process.env.REACT_APP_IMAGE_URL;

function App() {
  const dispatch = useDispatch();
  const { connectStatus, client, isSubed, payload } = useSelector(
    ({ mqttReducer }) => mqttReducer
  );
  const { wood1, wood2 } = useSelector(({ appReducer }) => appReducer);
  const mqttConnect = (host, mqttOption) => {
    dispatch(setConnectStatus("Connecting"));
    dispatch(setClient(mqtt.connect(host, mqttOption)));
  };

  const mqttPublish = (context) => {
    if (client) {
      const { topic, qos, payload } = context;
      client.publish(topic, payload, { qos }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  const mqttSub = (subscription) => {
    if (client) {
      const { topic, qos } = subscription;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topic error", error);
          return;
        }
        dispatch(setIsSuped(true));
      });
    }
  };

  useEffect(() => {
    mqttConnect(process.env.REACT_APP_MQTT_SERVER, {
      port: process.env.REACT_APP_MQTT_SERVER_PORT,
    });
  }, []);

  useEffect(() => {
    if (client) {
      client.on("connect", () => {
        dispatch(setConnectStatus("Connected"));
        mqttSub({
          topic: "second",
          qos: 2,
        });
      });
      client.on("error", (err) => {
        console.error("Connection error: ", err);
        client.end();
      });
      client.on("reconnect", () => {
        dispatch(setConnectStatus("Reconnecting"));
      });
      client.on("message", (topic, message) => {
        const payload = { topic, message: message.toString() };
        if (payload.topic === "second" && payload.message === "next") {
          dispatch(setInstallStatus());
        } else {
          console.log("waiting for next message");
        }
        dispatch(setPayload(payload));
      });
    }
  }, [client]);

  const handleInstallClick = () => {
    mqttPublish({ topic: "first", qos: 2, payload: "Installing" });
  };
  return (
    <div>
      <div style={{ textAlign: "center", margin: 30 }}>
        <img
          name="Wood1"
          src={imageUrl}
          alt="this is wood 1"
          style={{ margin: 50, opacity: wood1.opacity }}
        ></img>
        <img
          name="Wood2"
          src={imageUrl}
          alt="this is wood 2"
          style={{ margin: 50, opacity: wood2.opacity }}
        ></img>
        <div>
          <button onClick={handleInstallClick}>INSTALL</button>
        </div>
      </div>
    </div>
  );
}

export default App;
