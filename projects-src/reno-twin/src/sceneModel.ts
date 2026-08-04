export type SourceConfidence = "confirmed" | "reference" | "provisional" | "superseded";

export interface RegisteredSource {
  id: string;
  label: string;
  issuedBy: string;
  issuedAt: string;
  scope: string;
  pages: string;
  role: string;
  confidence: SourceConfidence;
}

export interface RoomRegion {
  id: string;
  label: string;
  bounds: readonly [number, number, number, number];
  sourceRefs: readonly string[];
}

export interface WallSegment {
  axis: "x" | "z";
  fixed: number;
  from: number;
  to: number;
  sourceRefs: readonly string[];
}

export interface CarpentryAssembly {
  path: string;
  name: string;
  room: string;
  kind: "run" | "wardrobe" | "feature-wall" | "vanity" | "storage";
  position: readonly [number, number, number];
  size: readonly [number, number, number];
  rotationY?: number;
  bays: readonly number[];
  sourceRefs: readonly string[];
  note: string;
}

export interface ElectricalFixture {
  path: string;
  room: string;
  kind: "ceiling" | "fan" | "wall" | "track" | "socket" | "switch";
  position: readonly [number, number, number];
  circuit: string;
  sourceRefs: readonly string[];
}

export interface EquipmentAsset {
  path: string;
  name: string;
  room: string;
  category: string;
  position: readonly [number, number, number];
  size: readonly [number, number, number];
  rotationY?: number;
  model: string;
  supplier: string;
  sourceRefs: readonly string[];
}

export const REGISTERED_SOURCES: RegisteredSource[] = [
  {
    id: "CH-ELEC-2026-05-25-P1",
    label: "Comfort Home proposed lighting plan",
    issuedBy: "CP / Comfort Home",
    issuedAt: "25 May 2026",
    scope: "Whole-home room registration, lighting points and circuit labels",
    pages: "Electrical plan p.1",
    role: "Primary plan-coordinate registration",
    confidence: "reference",
  },
  {
    id: "CH-ELEC-2026-05-25-P2",
    label: "Comfort Home proposed electrical plan",
    issuedBy: "CP / Comfort Home",
    issuedAt: "25 May 2026",
    scope: "Power, data, heater, appliance and switch points",
    pages: "Electrical plan p.2",
    role: "MEP point registration",
    confidence: "reference",
  },
  {
    id: "CH-CARP-2026-05-30-P01-07",
    label: "Kitchen and dry-pantry detailed drawings",
    issuedBy: "CP / Comfort Home",
    issuedAt: "30 May 2026",
    scope: "Kitchen top view, appliance clearances, cabinet elevations and internal divisions",
    pages: "Detailed drawings pp.1-7",
    role: "Carpentry assembly dimensions",
    confidence: "reference",
  },
  {
    id: "CH-CARP-2026-05-30-P08-10",
    label: "Living feature-wall detailed drawings",
    issuedBy: "CP / Comfort Home",
    issuedAt: "30 May 2026",
    scope: "5,964 x 3,376 mm top-view registration; DB, shelter, niche, Boba and paludarium sequence",
    pages: "Detailed drawings pp.8-10",
    role: "Living carpentry registration",
    confidence: "reference",
  },
  {
    id: "CH-CARP-2026-05-30-P11-17",
    label: "Bedroom and bathroom detailed drawings",
    issuedBy: "CP / Comfort Home",
    issuedAt: "30 May 2026",
    scope: "Study storage, bedroom wardrobes, master wardrobes and both vanity assemblies",
    pages: "Detailed drawings pp.11-17",
    role: "Carpentry elevations and internals",
    confidence: "reference",
  },
  {
    id: "CH-CARP-2026-05-30-P18-30",
    label: "Appliance and installation reference appendix",
    issuedBy: "CP / Comfort Home",
    issuedAt: "30 May 2026",
    scope: "Sink, Bosch appliances, refrigerator clearances, ventilation and equipment installation references",
    pages: "Detailed drawings pp.18-30",
    role: "Equipment envelope and installation metadata",
    confidence: "reference",
  },
  {
    id: "CH-VISUAL-CURRENT-P02-20",
    label: "Comfort Home current 3D visual set",
    issuedBy: "Comfort Home Interior",
    issuedAt: "Current canonical visual",
    scope: "Foyer, living, dining, kitchen, study, bedrooms and bathrooms",
    pages: "3D visual pp.2-20",
    role: "Material, colour, lighting and spatial-intent reference",
    confidence: "reference",
  },
  {
    id: "CHAT-CP-2026-06-11-STUDY",
    label: "Study wall confirmation",
    issuedBy: "CP",
    issuedAt: "11 Jun 2026",
    scope: "3,294 mm usable study desk-wall length",
    pages: "Reno chat messages 102656-102665",
    role: "Governing dimension",
    confidence: "confirmed",
  },
  {
    id: "CHAT-CP-2026-06-18-STUDY-STORAGE",
    label: "Study storage and circulation decision",
    issuedBy: "CP / owners",
    issuedAt: "18 Jun 2026",
    scope: "590 mm open shelf, 3 x 590 mm doors, 1 x 650 mm door, one pocket mechanism; 2,036 mm desk-plus-walkway",
    pages: "Reno chat messages 107723-107795",
    role: "Post-drawing carpentry variant",
    confidence: "confirmed",
  },
  {
    id: "CHAT-CP-2026-06-25-LIVING-SHELVES",
    label: "Living shelving clarification",
    issuedBy: "CP",
    issuedAt: "25 Jun 2026",
    scope: "Three living shelves; apparent fourth line is the ceiling part",
    pages: "Reno chat messages 113065 and 113257",
    role: "Post-drawing clarification",
    confidence: "confirmed",
  },
];

export const PLAN_REGISTRATION = {
  units: "metres" as const,
  axes: { x: "plan left-to-right", y: "height", z: "plan top-to-bottom" },
  drawingEnvelope: { width: 12.65, depth: 9.235 },
  topBayChain: [3.55, 3.05, 2.95, 3.1] as const,
  registrationSource: "CH-ELEC-2026-05-25-P1",
  caveat: "Drawing-coordinate registration, not an as-built survey.",
};

export const ROOM_REGIONS: RoomRegion[] = [
  { id: "balcony", label: "Balcony", bounds: [0, 3.55, 0, 1.4], sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { id: "living", label: "Living / dining", bounds: [0, 3.55, 1.4, 4.95], sourceRefs: ["CH-ELEC-2026-05-25-P1", "CH-CARP-2026-05-30-P08-10"] },
  { id: "study", label: "Study", bounds: [3.55, 6.6, 0, 4.95], sourceRefs: ["CH-ELEC-2026-05-25-P1", "CHAT-CP-2026-06-11-STUDY"] },
  { id: "bedroom-2", label: "Bedroom 2", bounds: [6.6, 9.55, 0, 4.95], sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { id: "master-bedroom", label: "Master bedroom", bounds: [9.55, 12.65, 0, 4.95], sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { id: "shelter", label: "Household shelter", bounds: [0, 1.7, 4.95, 7.85], sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { id: "foyer", label: "Foyer", bounds: [1.7, 3.55, 4.95, 7.85], sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { id: "hall", label: "Hall", bounds: [3.55, 6.6, 4.95, 6.54], sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { id: "common-bath", label: "Common bath", bounds: [6.6, 8.3, 4.95, 6.54], sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { id: "master-bath", label: "Master bath", bounds: [8.3, 10.2, 4.95, 6.54], sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { id: "kitchen", label: "Kitchen", bounds: [3.55, 7.145, 6.54, 9.235], sourceRefs: ["CH-ELEC-2026-05-25-P1", "CH-CARP-2026-05-30-P01-07"] },
  { id: "yard", label: "Yard", bounds: [7.145, 8.615, 6.54, 9.235], sourceRefs: ["CH-ELEC-2026-05-25-P1", "CH-CARP-2026-05-30-P01-07"] },
];

export const WALL_SEGMENTS: WallSegment[] = [
  { axis: "x", fixed: 0, from: 0, to: 3.55, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 0, from: 0, to: 7.85, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 7.85, from: 0, to: 2.05, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 7.85, from: 3, to: 3.55, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 3.55, from: 7.85, to: 9.235, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 9.235, from: 3.55, to: 8.615, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 8.615, from: 7.85, to: 9.235, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 7.85, from: 8.615, to: 10.2, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 10.2, from: 6.54, to: 7.85, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 4.95, from: 10.2, to: 12.65, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 12.65, from: 0, to: 4.95, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 0, from: 3.55, to: 12.65, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 3.55, from: 0, to: 3.95, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 3.55, from: 4.72, to: 7.05, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 3.55, from: 7.78, to: 9.235, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 6.6, from: 0, to: 3.95, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 6.6, from: 4.72, to: 6.54, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 9.55, from: 0, to: 3.95, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 4.95, from: 0, to: 2.42, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 4.95, from: 3.16, to: 7.02, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 1.7, from: 4.95, to: 7.85, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 8.3, from: 4.95, to: 6.54, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 4.95, from: 7.78, to: 8.68, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 4.95, from: 9.44, to: 10.2, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 6.54, from: 6.6, to: 7.02, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 6.54, from: 7.78, to: 8.62, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "x", fixed: 6.54, from: 9.36, to: 10.2, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { axis: "z", fixed: 7.145, from: 6.54, to: 9.235, sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
];

export const CARPENTRY_ASSEMBLIES: CarpentryAssembly[] = [
  {
    path: "/World/Carpentry/Living/FeatureWall",
    name: "Living feature wall",
    room: "Living room",
    kind: "feature-wall",
    position: [3.27, 0, 4.39],
    size: [5.964, 2.388, 0.56],
    rotationY: Math.PI / 2,
    bays: [0.83, 0.89, 0.82, 1.01, 1.01, 1.01],
    sourceRefs: ["CH-CARP-2026-05-30-P08-10", "CHAT-CP-2026-06-25-LIVING-SHELVES"],
    note: "DB, household-shelter door, niche, Boba-light bay, storage/paludarium and three-shelf clarification stitched into one registered run.",
  },
  {
    path: "/World/Carpentry/Study/StorageWall",
    name: "Study storage wall",
    room: "Study",
    kind: "storage",
    position: [6.28, 0, 2.2],
    size: [3.01, 2.4, 0.6],
    rotationY: Math.PI / 2,
    bays: [0.59, 0.59, 0.59, 0.59, 0.65],
    sourceRefs: ["CH-CARP-2026-05-30-P11-17", "CHAT-CP-2026-06-18-STUDY-STORAGE"],
    note: "Post-drawing variant: one 590 mm open shelf, three 590 mm doors and one 650 mm printer door with one pocket mechanism.",
  },
  {
    path: "/World/Carpentry/Bedroom2/Wardrobe",
    name: "Bedroom 2 wardrobe",
    room: "Bedroom 2",
    kind: "wardrobe",
    position: [8.58, 0, 4.64],
    size: [1.728, 2.4, 0.6],
    bays: [0.347, 0.347, 0.347, 0.347],
    sourceRefs: ["CH-CARP-2026-05-30-P11-17"],
    note: "1,728 mm wide, 600 mm deep wardrobe with four internal clothes rods.",
  },
  {
    path: "/World/Carpentry/MasterBedroom/WardrobeHead",
    name: "Master wardrobe - head wall",
    room: "Master bedroom",
    kind: "wardrobe",
    position: [10.65, 0, 4.64],
    size: [1.96, 2.4, 0.6],
    bays: [0.42, 0.42, 0.42],
    sourceRefs: ["CH-CARP-2026-05-30-P11-17"],
    note: "1,960 mm registered elevation including curved side panels and adjacent 600 mm side panel.",
  },
  {
    path: "/World/Carpentry/MasterBedroom/WardrobeReturn",
    name: "Master wardrobe - return wall",
    room: "Master bedroom",
    kind: "wardrobe",
    position: [12.34, 0, 3.55],
    size: [2.393, 2.6, 0.6],
    rotationY: Math.PI / 2,
    bays: [0.423, 0.423, 0.423, 0.423],
    sourceRefs: ["CH-CARP-2026-05-30-P11-17"],
    note: "2,393 mm return elevation with niche, two drawers and curved panels.",
  },
  {
    path: "/World/Carpentry/Kitchen/SinkServiceRun",
    name: "Kitchen sink and service run",
    room: "Kitchen",
    kind: "run",
    position: [6.15, 0, 6.87],
    size: [4.882, 2.4, 0.65],
    bays: [0.7, 0.77, 0.8, 0.605, 2.007],
    sourceRefs: ["CH-CARP-2026-05-30-P01-07"],
    note: "Washer/dryer, sewer pipes, 800 mm sink bay, 605 mm dishwasher and corner run registered from kitchen top view.",
  },
  {
    path: "/World/Carpentry/Kitchen/HobReturn",
    name: "Kitchen hob return",
    room: "Kitchen",
    kind: "run",
    position: [8.29, 0, 7.66],
    size: [1.804, 2.4, 0.65],
    rotationY: Math.PI / 2,
    bays: [0.904, 0.9],
    sourceRefs: ["CH-CARP-2026-05-30-P01-07"],
    note: "Hood, hob and two-tier corner shelving return.",
  },
  {
    path: "/World/Carpentry/Kitchen/DryPantryRun",
    name: "Dry pantry and fridge run",
    room: "Kitchen",
    kind: "run",
    position: [5.05, 0, 8.91],
    size: [2.6, 2.4, 0.6],
    bays: [0.5, 1.5, 0.97],
    sourceRefs: ["CH-CARP-2026-05-30-P01-07"],
    note: "Robot-vacuum bay, dry pantry drawers and fridge/tall-appliance zone; drawer internals remain revision-aware.",
  },
  {
    path: "/World/Carpentry/CommonBath/Vanity",
    name: "Common-bath vanity",
    room: "Common bathroom",
    kind: "vanity",
    position: [7.28, 0, 6.18],
    size: [0.76, 1.806, 0.55],
    bays: [0.57],
    sourceRefs: ["CH-CARP-2026-05-30-P11-17"],
    note: "760 mm overall vanity, 550 mm cabinet depth and mirrored upper cabinet.",
  },
  {
    path: "/World/Carpentry/MasterBath/Vanity",
    name: "Master-bath vanity",
    room: "Master bathroom",
    kind: "vanity",
    position: [9.05, 0, 6.16],
    size: [0.9, 1.844, 0.52],
    bays: [0.332, 0.332, 0.3],
    sourceRefs: ["CH-CARP-2026-05-30-P11-17"],
    note: "900 mm slanted vanity footprint, 520 mm maximum depth and tissue-roll cut-out.",
  },
];

export const ELECTRICAL_FIXTURES: ElectricalFixture[] = [
  { path: "/World/Electrical/Living/Fan_C2", room: "Living room", kind: "fan", position: [1.75, 2.64, 3.08], circuit: "C2", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Living/Ceiling_C1", room: "Living room", kind: "ceiling", position: [1.25, 2.7, 2.1], circuit: "C1", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Living/Ceiling_C3", room: "Living room", kind: "ceiling", position: [1.25, 2.7, 4.05], circuit: "C3", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Living/Ceiling_C4", room: "Living room", kind: "ceiling", position: [2.85, 2.7, 4.15], circuit: "C4", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Living/BobaLight_Upper", room: "Living room", kind: "wall", position: [2.96, 1.9, 4.55], circuit: "Boba upper", sourceRefs: ["CH-ELEC-2026-05-25-P1", "CH-CARP-2026-05-30-P08-10"] },
  { path: "/World/Electrical/Living/BobaLight_Lower", room: "Living room", kind: "wall", position: [2.96, 1.15, 4.55], circuit: "Boba lower", sourceRefs: ["CH-ELEC-2026-05-25-P1", "CH-CARP-2026-05-30-P08-10"] },
  { path: "/World/Electrical/Study/Fan_G1", room: "Study", kind: "fan", position: [5.05, 2.64, 1.9], circuit: "G1", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Study/Track_G2", room: "Study", kind: "track", position: [6.3, 2.67, 1.05], circuit: "G2", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Bedroom2/Fan_H1", room: "Bedroom 2", kind: "fan", position: [8.05, 2.64, 2.05], circuit: "H1", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/MasterBedroom/Fan_K2", room: "Master bedroom", kind: "fan", position: [11.15, 2.64, 1.85], circuit: "K2/L4", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/MasterBedroom/Ceiling_K1", room: "Master bedroom", kind: "ceiling", position: [10.65, 2.7, 3.75], circuit: "K1", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Foyer/Ceiling_A1", room: "Foyer", kind: "ceiling", position: [2.55, 2.7, 6.15], circuit: "A1", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Shelter/Ceiling_SS1", room: "Household shelter", kind: "ceiling", position: [0.85, 2.7, 6.25], circuit: "SS1", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Hall/Ceiling_E1", room: "Hall", kind: "ceiling", position: [4.55, 2.7, 5.35], circuit: "E1", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Hall/Ceiling_E2", room: "Hall", kind: "ceiling", position: [5.6, 2.7, 5.45], circuit: "E2", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/CommonBath/Ceiling_J1", room: "Common bathroom", kind: "ceiling", position: [7.25, 2.7, 5.55], circuit: "J1", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/MasterBath/Ceiling_M1", room: "Master bathroom", kind: "ceiling", position: [9.25, 2.7, 5.5], circuit: "M1", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Kitchen/Ceiling_F1", room: "Kitchen", kind: "ceiling", position: [4.15, 2.7, 7.1], circuit: "F1", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Kitchen/Track_F2", room: "Kitchen", kind: "track", position: [5.55, 2.67, 8.2], circuit: "F2", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Yard/Ceiling_F3", room: "Yard", kind: "ceiling", position: [7.6, 2.7, 7.55], circuit: "F3", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Yard/Ceiling_F4", room: "Yard", kind: "ceiling", position: [8.1, 2.7, 8.25], circuit: "F4", sourceRefs: ["CH-ELEC-2026-05-25-P1"] },
  { path: "/World/Electrical/Foyer/Switch_A", room: "Foyer", kind: "switch", position: [3.47, 1.2, 7.25], circuit: "A / shifted", sourceRefs: ["CH-ELEC-2026-05-25-P1", "CH-ELEC-2026-05-25-P2"] },
  { path: "/World/Electrical/Kitchen/PowerTrack", room: "Kitchen", kind: "socket", position: [5.85, 1.25, 6.7], circuit: "80 cm power track", sourceRefs: ["CH-ELEC-2026-05-25-P2", "CH-CARP-2026-05-30-P01-07"] },
  { path: "/World/Electrical/Kitchen/DryPantryPowerTrack", room: "Kitchen", kind: "socket", position: [5.0, 1.25, 8.66], circuit: "75 cm power track", sourceRefs: ["CH-ELEC-2026-05-25-P2", "CH-CARP-2026-05-30-P01-07"] },
];

export const EQUIPMENT_ASSETS: EquipmentAsset[] = [
  { path: "/World/Equipment/Kitchen/WasherDryerStack", name: "Stacked washer and dryer", room: "Kitchen", category: "Laundry appliance", position: [4.06, 0, 6.88], size: [0.7, 1.82, 0.65], model: "Stacked installation envelope", supplier: "Owner selection", sourceRefs: ["CH-CARP-2026-05-30-P01-07", "CH-CARP-2026-05-30-P18-30"] },
  { path: "/World/Equipment/Kitchen/Sink", name: "Song-Cho kitchen sink", room: "Kitchen", category: "Sink", position: [5.66, 0.94, 6.86], size: [0.8, 0.09, 0.48], model: "800 mm sink bay", supplier: "Song-Cho", sourceRefs: ["CH-CARP-2026-05-30-P01-07", "CH-CARP-2026-05-30-P18-30"] },
  { path: "/World/Equipment/Kitchen/Dishwasher", name: "Bosch dishwasher", room: "Kitchen", category: "Dishwasher", position: [6.39, 0, 6.88], size: [0.605, 0.86, 0.62], model: "Built-in dishwasher envelope", supplier: "Bosch", sourceRefs: ["CH-CARP-2026-05-30-P01-07", "CH-CARP-2026-05-30-P18-30"] },
  { path: "/World/Equipment/Kitchen/HoodHob", name: "Kitchen hood and hob", room: "Kitchen", category: "Cooking appliance", position: [8.28, 0, 7.58], size: [0.58, 2.25, 0.88], rotationY: Math.PI / 2, model: "Hood/hob registered bay", supplier: "Owner selection", sourceRefs: ["CH-CARP-2026-05-30-P01-07", "CH-CARP-2026-05-30-P18-30"] },
  { path: "/World/Equipment/Kitchen/Refrigerator", name: "Refrigerator", room: "Kitchen", category: "Refrigerator", position: [5.85, 0, 8.87], size: [0.97, 1.9, 0.64], model: "970 mm registered fridge bay", supplier: "Owner selection", sourceRefs: ["CH-CARP-2026-05-30-P01-07", "CH-CARP-2026-05-30-P18-30"] },
  { path: "/World/Equipment/Kitchen/OvenMicrowaveTower", name: "Built-in oven and microwave", room: "Kitchen", category: "Cooking appliance", position: [6.72, 0, 8.62], size: [0.6, 2.15, 0.6], rotationY: Math.PI / 2, model: "600 mm tall-unit envelope", supplier: "Bosch", sourceRefs: ["CH-CARP-2026-05-30-P01-07", "CH-CARP-2026-05-30-P18-30"] },
  { path: "/World/Equipment/Kitchen/RobotVacuum", name: "Robot vacuum dock", room: "Kitchen", category: "Cleaning appliance", position: [3.99, 0, 8.87], size: [0.5, 0.18, 0.5], model: "500 mm registered dock bay", supplier: "Dreame", sourceRefs: ["CH-CARP-2026-05-30-P01-07"] },
  { path: "/World/Equipment/Living/Paludarium", name: "Paludarium", room: "Living room", category: "Display habitat", position: [2.82, 0.3, 2.05], size: [0.45, 0.9, 0.45], model: "45 x 45 x 90 cm", supplier: "Owner supplied", sourceRefs: ["CH-CARP-2026-05-30-P08-10"] },
];

export const SOURCE_COUNTS = {
  registeredSources: REGISTERED_SOURCES.length,
  rooms: ROOM_REGIONS.length,
  carpentryAssemblies: CARPENTRY_ASSEMBLIES.length,
  electricalFixtures: ELECTRICAL_FIXTURES.length,
  equipmentAssets: EQUIPMENT_ASSETS.length,
};
