import { useState, useEffect } from "react";
import mqtt from "mqtt";
import type { Sht30Data, Cj702Data } from "../types/sensor";

const BROKER = "ws://broker.emqx.io:8083/mqtt";
const SHT30_TOPIC = "/sensors/test/sht30";
const CJ702_TOPIC = "/sensors/test/cj702";

interface UseMqttReturn {
  connected: boolean;
  sht30: Sht30Data | null;
  cj702: Cj702Data | null;
}

export function useMqtt(): UseMqttReturn {
  const [connected, setConnected] = useState(false);
  const [sht30, setSht30] = useState<Sht30Data | null>(null);
  const [cj702, setCj702] = useState<Cj702Data | null>(null);

  useEffect(() => {
    const client = mqtt.connect(BROKER);

    client.on("connect", () => {
      setConnected(true);
      client.subscribe(SHT30_TOPIC);
      client.subscribe(CJ702_TOPIC);
    });

    client.on("message", (topic, payload) => {
      try {
        const data = JSON.parse(payload.toString());
        if (topic === SHT30_TOPIC) setSht30(data as Sht30Data);
        if (topic === CJ702_TOPIC) setCj702(data as Cj702Data);
      } catch {
        console.warn("mqtt: failed to parse", topic, payload.toString());
      }
    });

    client.on("close", () => setConnected(false));
    client.on("error", () => setConnected(false));

    return () => {
      client.end(true);
    };
  }, []);

  return { connected, sht30, cj702 };
}
