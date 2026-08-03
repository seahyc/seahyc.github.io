export type TwinLayer =
  | "shell"
  | "carpentry"
  | "electrical"
  | "plumbing"
  | "furniture"
  | "inventory"
  | "issues";

export type RecordState = "design" | "installed" | "as-built";

export interface ProvenanceRecord {
  kind: "chat" | "canonical-record" | "site-observation" | "inference";
  label: string;
  detail: string;
  confidence: "confirmed" | "reference" | "provisional";
}

export interface InventoryRecord {
  semanticPath: string;
  room: string;
  category: string;
  sku: string;
  model: string;
  supplier: string;
  status: "planned" | "ordered" | "installed" | "attention";
  quantity: number;
  condition: "new" | "good" | "inspect";
  warrantyUntil: string;
  maintenance: string;
}

export interface TwinNode {
  path: string;
  name: string;
  room: string;
  category: string;
  layer: TwinLayer;
  recordState: RecordState;
  reference: string;
  variants?: string[];
  provenance: ProvenanceRecord[];
  inventory?: InventoryRecord;
  issue?: {
    title: string;
    href: string;
    summary: string;
  };
  interactive?: "cabinet" | "drawer" | "select";
}

export interface MaterialSelection {
  wall: string;
  floor: string;
  cabinet: string;
  furniture: string;
}

export interface AssetOverride {
  status?: InventoryRecord["status"];
  condition?: InventoryRecord["condition"];
  quantity?: number;
  maintenance?: string;
}

export interface PersistedTwinState {
  version: 1;
  materials: MaterialSelection;
  scenario: string;
  openObjects: Record<string, boolean>;
  hiddenObjects: Record<string, boolean>;
  assetOverrides: Record<string, AssetOverride>;
}
