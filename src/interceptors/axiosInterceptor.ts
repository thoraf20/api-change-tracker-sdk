import axios from "axios";
import { getConfig } from "../config/configManager";

export function attachAxiosInterceptor() {
  const config = getConfig();

  axios.interceptors.request.use(async (req) => {
    const snapshot = {
      type: "outgoing_request",
      timestamp: new Date().toISOString(),
      project: config.projectName,
      endpoint: req.url,
      method: req.method,
      headers: req.headers,
      body: req.data || null,
    };

    if (config.mode === "remote" && config.backendURL) {
      try {
        console.log(config.backendURL, snapshot);
        await axios.post(`${config.backendURL}`, snapshot);
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
