import type { MaterialSelection, TwinLayer, TwinNode } from "./types";

export const LAYERS: Array<{ id: TwinLayer; label: string; short: string }> = [
  { id: "shell", label: "Shell", short: "Walls & floors" },
  { id: "carpentry", label: "Carpentry", short: "Cabinets & built-ins" },
  { id: "electrical", label: "Electrical / lighting", short: "Fixtures & points" },
  { id: "plumbing", label: "Plumbing", short: "Water fittings" },
  { id: "furniture", label: "Furniture", short: "Moveable pieces" },
  { id: "inventory", label: "Inventory", short: "Asset markers" },
  { id: "issues", label: "Issue markers", short: "Field notes" },
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
  label: "Comfort Home current records",
  detail: "Spatial intent referenced from the current Comfort Home 3D visual and detailed drawings; this web shell is not a measured as-built survey.",
  confidence: "reference" as const,
};

const provisional = {
  kind: "inference" as const,
  label: "Provisional web reconstruction",
  detail: "Position and scale are diagrammatic pending a chat-confirmed or measured as-built value.",
  confidence: "provisional" as const,
};

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
    reference: "comfort-home:3d-visual",
    provenance: [comfortHome, provisional],
  },
  {
    path: "/World/Furniture/Living/Sofa_A",
    name: "Living-room sofa",
    room: "Living room",
    category: "Seating",
    layer: "furniture",
    recordState: "design",
    reference: "furniture:sofa",
    variants: ["Sofa_A", "Sofa_B", "Hidden"],
    provenance: [comfortHome, provisional],
    inventory: asset("/World/Furniture/Living/Sofa_A", "Living room", "Seating", "TBC", "Scenario sofa", "TBC", "planned"),
  },
  {
    path: "/World/Furniture/Living/DiningTable_A",
    name: "Dining table",
    room: "Living room",
    category: "Table",
    layer: "furniture",
    recordState: "design",
    reference: "selection:dining-table",
    variants: ["Dining", "Open circulation"],
    provenance: [comfortHome, provisional],
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
    path: "/World/Carpentry/Kitchen/CabinetSet_A",
    name: "Kitchen cabinet set",
    room: "Kitchen",
    category: "Base cabinet",
    layer: "carpentry",
    recordState: "design",
    reference: "comfort-home:detailed-drawings:2026-05-30",
    variants: ["Closed", "Doors open", "Drawer open"],
    provenance: [
      {
        kind: "canonical-record",
        label: "CP · 30 May 2026",
        detail: "Latest formal detailed/carpentry drawing. Later chat variations may not be consolidated, so this is not represented as final as-built work.",
        confidence: "reference",
      },
      provisional,
    ],
    inventory: asset("/World/Carpentry/Kitchen/CabinetSet_A", "Kitchen", "Base cabinet", "CUSTOM", "Comfort Home carpentry", "Comfort Home"),
    interactive: "cabinet",
  },
  {
    path: "/World/Carpentry/MasterBedroom/Wardrobe_A",
    name: "Master-bedroom wardrobe",
    room: "Master bedroom",
    category: "Wardrobe",
    layer: "carpentry",
    recordState: "design",
    reference: "comfort-home:detailed-drawings:2026-05-30",
    variants: ["Closed", "Doors open"],
    provenance: [comfortHome, provisional],
    inventory: asset("/World/Carpentry/MasterBedroom/Wardrobe_A", "Master bedroom", "Wardrobe", "CUSTOM", "Comfort Home carpentry", "Comfort Home"),
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
];

export const NODE_BY_PATH = new Map(TWIN_NODES.map((node) => [node.path, node]));

export const WAYPOINTS = [
  { id: "overview", label: "Overview", room: "Whole home", position: [13.5, 11, 14] as const, target: [5.8, 0, 4.5] as const },
  { id: "living", label: "Living", room: "Living room", position: [2.5, 1.6, 3.8] as const, target: [4.5, 1.3, 2.5] as const },
  { id: "kitchen", label: "Kitchen", room: "Kitchen", position: [7.4, 1.6, 2.4] as const, target: [7.2, 1.1, 1] as const },
  { id: "study", label: "Study", room: "Study", position: [2.5, 1.6, 7.2] as const, target: [3.5, 1.1, 7.2] as const },
  { id: "bedroom", label: "Bedroom", room: "Master bedroom", position: [8.2, 1.6, 6.4] as const, target: [10.4, 1.2, 7.5] as const },
  { id: "bath", label: "Bath", room: "Master bathroom", position: [10.1, 1.6, 2.1] as const, target: [11.5, 1.3, 1.3] as const },
];

export const SCENARIOS = [
  { id: "installed", label: "Installed intent", description: "Default furniture arrangement" },
  { id: "open", label: "Open circulation", description: "Dining table tucked, secondary seat hidden" },
  { id: "work", label: "Work mode", description: "Study desks emphasized" },
];
