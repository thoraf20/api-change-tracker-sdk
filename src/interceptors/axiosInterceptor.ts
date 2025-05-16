import axios from "axios";
import { getConfig } from "../config/configManager";
import { storeSnapshot } from "../snapshot/snapshotManager";

interface Snapshot {
  type: string;
  timestamp: string;
  project: string;
  url: string;
  method: string;
  headers: Record<string, any>;
  body: any;
  client_id: string;
}

export function attachAxiosInterceptor() {
  const config = getConfig();
  const internalAxios = axios.create();

  axios.interceptors.request.use(async (req) => {
    const snapshot: Snapshot = {
      type: "outgoing_request",
      timestamp: new Date().toISOString(),
      url: req.url || "",
      method: req.method?.toUpperCase() || "POST",
      headers: req.headers || {},
      body: req.data || null,
      project: config.projectName,
      client_id: config.clientId
    };

    try {
      if (config.mode === "remote") {
        if (!config.backendURL) throw new Error("backendURL is not defined in config");
        console.log(snapshot, "backend");

        await internalAxios.post(config.backendURL, snapshot);

        if (config.logSnapshots) console.log("[SDK] Snapshot sent to backend.");
      }

      if (config.mode === "local") {
        await storeSnapshot(snapshot);
        if (config.logSnapshots) console.log("[SDK] Snapshot stored locally.");
      }

    } catch (err: any) {
      console.warn("[SDK] Failed to send snapshot:", err.message);
      console.warn("Full error:", err);
    }

    return req;
  });
}
