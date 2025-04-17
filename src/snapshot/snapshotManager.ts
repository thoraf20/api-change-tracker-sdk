import fs from "fs";
import path from "path";

const SNAPSHOT_DIR = path.resolve(__dirname, "../../../.api-snapshots");

if (!fs.existsSync(SNAPSHOT_DIR)) {
  fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
}

export async function storeSnapshot(snapshot: {
  url: string;
  method: string;
  headers: Record<string, any>;
  body: any;
  clientId: string;
}) {
  const safeUrl = encodeURIComponent(snapshot.url);
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-"); // ISO timestamp that's filesystem-safe
  const fileName = `${
    snapshot.clientId
  }_${snapshot.method.toUpperCase()}_${safeUrl}_${timestamp}.json`;
  const filePath = path.join(SNAPSHOT_DIR, fileName);

  try {
    await fs.promises.writeFile(filePath, JSON.stringify(snapshot, null, 2));
    console.log(`[SDK] Snapshot stored locally at ${filePath}`);
  } catch (err) {
    console.error("[SDK] Failed to write local snapshot:", err);
  }
}
