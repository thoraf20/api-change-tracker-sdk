import fs from "fs";
import path from "path";

const SNAPSHOT_DIR = path.resolve(__dirname, "../../../.api-snapshots");

if (!fs.existsSync(SNAPSHOT_DIR)) {
  fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
}

export async function storeSnapshot(snapshot: any) {
  const fileName = `${snapshot.method?.toUpperCase()}_${encodeURIComponent(
    snapshot.url
  )}.json`;
  const filePath = path.join(SNAPSHOT_DIR, fileName);

  fs.writeFileSync(filePath, JSON.stringify(snapshot, null, 2));
}
