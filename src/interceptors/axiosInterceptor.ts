import axios from "axios";
import { getConfig } from "../config/configManager";

interface Snapshot {
  url: string;
  method: string;
  headers: Record<string, any>;
  body: any;
  clientId: string;
}

export function attachAxiosInterceptor() {
  const config = getConfig();

  // if (config.mode === "local" || config.mode === "hybrid") {
  //   await storeSnapshotLocally(snapshot, config.localPath, config.clientId);
  // }

  // if (config.mode === "remote" || config.mode === "hybrid") {
  //   await sendSnapshotToBackend(snapshot, config.backendURL);
  // }

  axios.interceptors.request.use(async (req) => {
    const snapshot: Snapshot = {
      url: req.url || "",
      method: (req.method || "GET").toUpperCase(),
      headers: req.headers || {},
      body: req.data || null,
      clientId: config.clientId, // comes from your SDK config
    };

    if (config.mode === "remote" && config.backendURL) {
      try {
        await axios.post(`${config.backendURL}/snapshots`, snapshot);
        console.log("[SDK] Snapshot sent to backend.");
      } catch (err: any) {
        console.warn("[SDK] Failed to send snapshot:", err.message);
      }
    } else {
      console.log("[SDK] Captured Snapshot:", snapshot);
    }

    return req;
  });
}
