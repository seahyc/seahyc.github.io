import { CARPENTRY_ASSEMBLIES, ELECTRICAL_FIXTURES, EQUIPMENT_ASSETS, REGISTERED_SOURCES } from "./sceneModel";
import type { MaterialSelection, ProvenanceRecord, TwinLayer, TwinNode } from "./types";

export const LAYERS: Array<{ id: TwinLayer; label: string; short: string }> = [
  { id: "shell", label: "Shell", short: "Walls & floors" },
  { id: "carpentry", label: "Carpentry", short: "Cabinets & built-ins" },
  { id: "electrical", label: "Electrical / lighting", short: "Fixtures & points" },
  { id: "plumbing", label: "Plumbing", short: "Water fittings" },
  { id: "furniture", label: "Furniture", short: "Moveable pieces" },
  { id: "inventory", label: "Inventory", short: "Asset markers" },
  { id: "issues", label: "Issue markers", short: "Field notes" },
  { id: "references", label: "Source registration", short: "Drawing overlays" },
];

export const MATERIAL_PRESETS = {
  wall: [
    { id: "warm-limewash", label: "Warm limewash", color: "#ded7c9" },
    { id: "soft-white", label: "Soft white", color: "#f1efe8" },
    { id: "sage", label: "Muted sage", color: "#aab5a6" },
    { id: "clay", label: "Clay", color: "#b88770" },
  ],
  floor: [
    { id: "pale-oak", label: "Pale oak", color: "#bd9f75" },
    { id: "smoked-oak", label: "Smoked oak", color: "#715b47" },
    { id: "stone", label: "Warm stone", color: "#aaa298" },
  ],
  cabinet: [
    { id: "walnut", label: "Walnut", color: "#644b3a" },
    { id: "mushroom", label: "Mushroom", color: "#9a8e7f" },
    { id: "ink", label: "Ink", color: "#303735" },
  ],
  furniture: [
    { id: "moss", label: "Moss", color: "#657464" },
    { id: "rust", label: "Rust", color: "#9a5944" },
    { id: "oat", label: "Oat", color: "#c0ad91" },
  ],
} as const;

export const DEFAULT_MATERIALS: MaterialSelection = {
  wall: "warm-limewash",
  floor: "pale-oak",
  cabinet: "walnut",
  furniture: "moss",
};

const comfortHome = {
  kind: "canonical-record" as const,
  label: "CP · 25 May 2026",
  detail: "Actual room topology traced from the current formal Comfort Home electrical plan. Its 12,650 mm × 9,235 mm dimension chains are drawing references, not a measured as-built survey.",
  confidence: "reference" as const,
};

const provisional = {
  kind: "inference" as const,
  label: "Provisional web reconstruction",
  detail: "Position and scale are diagrammatic pending a chat-confirmed or measured as-built value.",
  confidence: "provisional" as const,
};

const renderIntent = {
  kind: "canonical-record" as const,
  label: "Comfort Home Interior · current 3D visual",
  detail: "Loose furniture shown in the visual set is design intent only. Exact product, dimensions, purchase status and installed position are not confirmed.",
  confidence: "reference" as const,
};

const provenanceForRefs = (sourceRefs: readonly string[]): ProvenanceRecord[] => sourceRefs.flatMap((id) => {
  const source = REGISTERED_SOURCES.find((candidate) => candidate.id === id);
  if (!source) return [];
  return [{
    kind: source.confidence === "confirmed" ? "chat" as const : "canonical-record" as const,
    label: `${source.issuedBy} · ${source.issuedAt}`,
    detail: `${source.label}; ${source.scope}. ${source.pages}.`,
    confidence: source.confidence === "confirmed" ? "confirmed" as const : "reference" as const,
  }];
});

const asset = (
  semanticPath: string,
  room: string,
  category: string,
  sku: string,
  model: string,
  supplier: string,
  status: "planned" | "ordered" | "installed" | "attention" = "installed",
) => ({
  semanticPath,
  room,
  category,
  sku,
  model,
  supplier,
  status,
  quantity: 1,
  condition: status === "attention" ? ("inspect" as const) : ("good" as const),
  warrantyUntil: "Not recorded in public twin",
  maintenance: "Add owner-maintained note",
});

export const TWIN_NODES: TwinNode[] = [
  {
    path: "/World/Shell/Apartment",
    name: "Whole-home shell",
    room: "Whole home",
    category: "Spatial shell",
    layer: "shell",
    recordState: "design",
    reference: "comfort-home:electrical-plan:2026-05-25",
    provenance: [comfortHome, provisional],
  },
  {
    path: "/World/Furniture/Living/Sofa_A",
    name: "Render-intent sofa (provisional)",
    room: "Living room",
    category: "Seating",
    layer: "furniture",
    recordState: "design",
    reference: "furniture:sofa",
    variants: ["Sofa_A", "Sofa_B", "Hidden"],
    provenance: [renderIntent, provisional],
    inventory: asset("/World/Furniture/Living/Sofa_A", "Living room", "Seating", "TBC", "Scenario sofa", "TBC", "planned"),
  },
  {
    path: "/World/Furniture/Living/DiningTable_A",
    name: "Render-intent dining table (provisional)",
    room: "Living room",
    category: "Table",
    layer: "furniture",
    recordState: "design",
    reference: "selection:dining-table",
    variants: ["Dining", "Open circulation"],
    provenance: [renderIntent, provisional],
    inventory: asset("/World/Furniture/Living/DiningTable_A", "Living room", "Table", "SHORTLIST", "Travertine candidate", "TBC", "planned"),
  },
  {
    path: "/World/Furniture/Study/DeskPair",
    name: "Standing-desk pair",
    room: "Study",
    category: "Workstation",
    layer: "furniture",
    recordState: "design",
    reference: "chat:CP:2026-06-11",
    variants: ["2 × 1500 mm", "2 × 1400 mm"],
    provenance: [
      {
        kind: "chat",
        label: "CP · 11 Jun 2026",
        detail: "CP confirmed 3294 mm of usable study desk-wall length. Two 1500 mm desks leave approximately 294 mm before any bookshelf allowance.",
        confidence: "confirmed",
      },
      {
        kind: "chat",
        label: "CP · 18 Jun 2026",
        detail: "CP clarified the 2036 mm budget is desk depth plus walkway, not a wall-length cap.",
        confidence: "confirmed",
      },
      provisional,
    ],
    inventory: { ...asset("/World/Furniture/Study/DeskPair", "Study", "Workstation", "TBC", "Dual-motor standing desk", "TBC", "planned"), quantity: 2 },
  },
  {
    path: "/World/Furniture/MasterBedroom/Bed_A",
    name: "Master-bedroom bed (render intent)",
    room: "Master bedroom",
    category: "Bed",
    layer: "furniture",
    recordState: "design",
    reference: "comfort-home:electrical-plan-and-3d-visual",
    variants: ["Plan / render orientation"],
    provenance: [
      {
        kind: "canonical-record",
        label: "CP / Comfort Home · 25 May 2026",
        detail: "The electrical plan registers the headboard against the right-hand exterior wall, with the bed projecting left into the master bedroom.",
        confidence: "reference",
      },
      renderIntent,
      provisional,
    ],
    inventory: asset("/World/Furniture/MasterBedroom/Bed_A", "Master bedroom", "Bed", "TBC", "Render-intent bed envelope", "TBC", "planned"),
  },
  {
    path: "/World/Carpentry/Kitchen/SinkServiceRun",
    name: "Kitchen sink and service run",
    room: "Kitchen",
    category: "Base cabinet",
    layer: "carpentry",
    recordState: "design",
    reference: "comfort-home:detailed-drawings:2026-05-30",
    variants: ["Registered assembly", "Doors open", "Drawer open"],
    provenance: [
      {
        kind: "canonical-record",
        label: "CP · 30 May 2026",
        detail: "Latest formal detailed/carpentry drawing. Later chat variations may not be consolidated, so this is not represented as final as-built work.",
        confidence: "reference",
      },
      provisional,
    ],
    inventory: asset("/World/Carpentry/Kitchen/SinkServiceRun", "Kitchen", "Base cabinet", "CUSTOM", "Comfort Home 4.882 m sink/service run", "Comfort Home"),
    interactive: "cabinet",
  },
  {
    path: "/World/Carpentry/MasterBedroom/WardrobeReturn",
    name: "Master-bedroom return wardrobe",
    room: "Master bedroom",
    category: "Wardrobe",
    layer: "carpentry",
    recordState: "design",
    reference: "comfort-home:detailed-drawings:2026-05-30",
    variants: ["Closed", "Doors open"],
    provenance: [comfortHome, provisional],
    inventory: asset("/World/Carpentry/MasterBedroom/WardrobeReturn", "Master bedroom", "Wardrobe", "CUSTOM", "Comfort Home 2.393 m return wardrobe", "Comfort Home"),
    interactive: "cabinet",
  },
  {
    path: "/World/Electrical/Living/BobaLight_Upper",
    name: "Upper Boba wall light",
    room: "Living room",
    category: "Wall light",
    layer: "electrical",
    recordState: "as-built",
    reference: "focus-lighting:invoice-bom",
    provenance: [
      {
        kind: "canonical-record",
        label: "Focus de Lightings · corrected 31 May 2026 schedule",
        detail: "Focus de Lightings is the current lighting-supplier attribution. Public twin omits prices and invoice contents.",
        confidence: "reference",
      },
      {
        kind: "site-observation",
        label: "Owner site photos · Aug 2026",
        detail: "Upper collar stops with a wall gap and becomes progressively tighter while unscrewing; cross-threading remains the leading diagnosis, not a confirmed teardown finding.",
        confidence: "reference",
      },
      provisional,
    ],
    inventory: asset("/World/Electrical/Living/BobaLight_Upper", "Living room", "Wall light", "FOCUS-BOM", "Boba wall light", "Focus de Lightings", "attention"),
    issue: {
      title: "Jammed Boba-light collar",
      href: "/reno/field-notes/boba-light/",
      summary: "Cross-thread diagnosis, constrained-grip tool and non-destructive removal sequence.",
    },
    interactive: "select",
  },
  {
    path: "/World/Plumbing/MasterBath/ShowerMixer",
    name: "Master-bath shower mixer",
    room: "Master bathroom",
    category: "Shower fitting",
    layer: "plumbing",
    recordState: "as-built",
    reference: "site-observation:shower-fitting",
    provenance: [
      {
        kind: "site-observation",
        label: "Owner site photos and contractor explanation · Aug 2026",
        detail: "Mixer sits visibly away from the tiled wall. Multiple concealed geometries remain possible without a controlled inspection.",
        confidence: "reference",
      },
      provisional,
    ],
    inventory: asset("/World/Plumbing/MasterBath/ShowerMixer", "Master bathroom", "Shower fitting", "TBC", "Concealed shower mixer", "TBC", "attention"),
    issue: {
      title: "Slanted shower fitting",
      href: "/reno/field-notes/shower-fitting/",
      summary: "Four possible geometries and a non-destructive check order.",
    },
    interactive: "select",
  },
  {
    path: "/World/Electrical/WholeHome/Controls",
    name: "Whole-home electrical controls",
    room: "Whole home",
    category: "Electrical system",
    layer: "electrical",
    recordState: "design",
    reference: "comfort-home:electrical-plan:2026-05-25",
    provenance: [
      {
        kind: "canonical-record",
        label: "CP · 25 May 2026",
        detail: "Current formal electrical plan; CP described four-gang switches being split into paired two-gang switches. Installation attribution: Voltz Solution.",
        confidence: "confirmed",
      },
    ],
    inventory: asset("/World/Electrical/WholeHome/Controls", "Whole home", "Electrical system", "PLAN-2026-05-25", "Electrical controls", "Voltz Solution"),
  },
  ...CARPENTRY_ASSEMBLIES.filter(({ path }) => ![
    "/World/Carpentry/Kitchen/SinkServiceRun",
    "/World/Carpentry/MasterBedroom/WardrobeReturn",
  ].includes(path)).map((assembly): TwinNode => ({
    path: assembly.path,
    name: assembly.name,
    room: assembly.room,
    category: assembly.kind === "wardrobe" ? "Wardrobe" : assembly.kind === "vanity" ? "Vanity" : "Built-in carpentry",
    layer: "carpentry",
    recordState: "design",
    reference: assembly.sourceRefs.join(" + "),
    variants: ["Drawing registration", "Source overlay"],
    provenance: [...provenanceForRefs(assembly.sourceRefs), provisional],
    inventory: asset(assembly.path, assembly.room, "Built-in carpentry", "CUSTOM", assembly.name, "Comfort Home"),
    interactive: "select",
  })),
  ...ELECTRICAL_FIXTURES.filter(({ path }) => path !== "/World/Electrical/Living/BobaLight_Upper").map((fixture): TwinNode => ({
    path: fixture.path,
    name: `${fixture.room} ${fixture.kind} · ${fixture.circuit}`,
    room: fixture.room,
    category: fixture.kind === "socket" || fixture.kind === "switch" ? "Electrical point" : "Lighting fixture",
    layer: "electrical",
    recordState: "design",
    reference: fixture.sourceRefs.join(" + "),
    provenance: provenanceForRefs(fixture.sourceRefs),
    inventory: asset(fixture.path, fixture.room, fixture.kind, fixture.circuit, `${fixture.kind} point ${fixture.circuit}`, fixture.kind === "socket" || fixture.kind === "switch" ? "Voltz Solution" : "Focus de Lightings", "planned"),
    interactive: "select",
  })),
  ...EQUIPMENT_ASSETS.map((equipment): TwinNode => ({
    path: equipment.path,
    name: equipment.name,
    room: equipment.room,
    category: equipment.category,
    layer: "inventory",
    recordState: "design",
    reference: equipment.sourceRefs.join(" + "),
    provenance: provenanceForRefs(equipment.sourceRefs),
    inventory: asset(equipment.path, equipment.room, equipment.category, "REFERENCE", equipment.model, equipment.supplier, "planned"),
    interactive: "select",
  })),
];

export const NODE_BY_PATH = new Map(TWIN_NODES.map((node) => [node.path, node]));

export const WAYPOINTS = [
  { id: "overview", label: "Overview", room: "Whole home", position: [6.325, 15, 15.5] as const, target: [6.325, 0, 4.6175] as const },
  { id: "living", label: "Living", room: "Living room", position: [2.15, 1.6, 3.35] as const, target: [2.95, 1.45, 4.55] as const },
  { id: "study", label: "Study", room: "Study", position: [5.1, 1.6, 3.65] as const, target: [4.05, 1.1, 2.35] as const },
  { id: "bedroom-2", label: "Bedroom 2", room: "Bedroom 2", position: [8.05, 1.6, 3.7] as const, target: [8.05, 1.1, 1.8] as const },
  { id: "master", label: "Master", room: "Master bedroom", position: [10.3, 1.6, 3.65] as const, target: [11.25, 1.15, 1.55] as const },
  { id: "bath", label: "Baths", room: "Master bathroom", position: [9.05, 1.6, 6.1] as const, target: [9.85, 1.2, 5.7] as const },
  { id: "kitchen", label: "Kitchen", room: "Kitchen", position: [5.15, 1.6, 7.65] as const, target: [6.15, 1.05, 6.87] as const },
  { id: "foyer", label: "Foyer", room: "Foyer", position: [2.55, 1.6, 7.25] as const, target: [2.55, 1.25, 5.6] as const },
];

export const SCENARIOS = [
  { id: "installed", label: "Registered base", description: "No unconfirmed loose furniture" },
  { id: "render", label: "Comfort Home render", description: "Show provisional sofa and dining intent" },
  { id: "work", label: "Work mode", description: "Chat-confirmed study desks emphasized" },
];
