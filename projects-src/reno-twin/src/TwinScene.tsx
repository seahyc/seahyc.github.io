import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CARPENTRY_ASSEMBLIES, ELECTRICAL_FIXTURES, EQUIPMENT_ASSETS, ROOM_REGIONS, WALL_SEGMENTS } from "./sceneModel";
import { MATERIAL_PRESETS, WAYPOINTS } from "./twinData";
import type { MaterialSelection, TwinLayer } from "./types";

type NavigationMode = "orbit" | "walk";
type Movement = "forward" | "back" | "left" | "right" | "turnLeft" | "turnRight";

interface WaypointRequest {
  id: string;
  sequence: number;
}

interface TwinSceneProps {
  layers: Record<TwinLayer, boolean>;
  materials: MaterialSelection;
  scenario: string;
  navigationMode: NavigationMode;
  selectedPath: string | null;
  openObjects: Record<string, boolean>;
  hiddenObjects: Record<string, boolean>;
  movement: Movement[];
  waypointRequest: WaypointRequest;
  onSelect: (path: string) => void;
  onToggleObject: (path: string) => void;
  onReady: () => void;
}

interface RuntimeState {
  layers: Record<TwinLayer, boolean>;
  materials: MaterialSelection;
  scenario: string;
  navigationMode: NavigationMode;
  selectedPath: string | null;
  openObjects: Record<string, boolean>;
  hiddenObjects: Record<string, boolean>;
  movement: Movement[];
}

const WALL_HEIGHT = 2.75;
const CABINET_PATH = "/World/Carpentry/Kitchen/SinkServiceRun";
const WARDROBE_PATH = "/World/Carpentry/MasterBedroom/WardrobeReturn";

const presetColor = (kind: keyof MaterialSelection, id: string) => {
  const preset = MATERIAL_PRESETS[kind].find((candidate) => candidate.id === id);
  return preset?.color ?? "#b8b1a6";
};

const assignPath = (object: THREE.Object3D, path: string) => {
  object.userData.semanticPath = path;
  object.traverse((child) => {
    child.userData.semanticPath = path;
  });
};

export function TwinScene(props: TwinSceneProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const onSelectRef = useRef(props.onSelect);
  const onToggleRef = useRef(props.onToggleObject);
  const onReadyRef = useRef(props.onReady);
  const stateRef = useRef<RuntimeState>({
    layers: props.layers,
    materials: props.materials,
    scenario: props.scenario,
    navigationMode: props.navigationMode,
    selectedPath: props.selectedPath,
    openObjects: props.openObjects,
    hiddenObjects: props.hiddenObjects,
    movement: props.movement,
  });
  const waypointRef = useRef(props.waypointRequest);

  onSelectRef.current = props.onSelect;
  onToggleRef.current = props.onToggleObject;
  onReadyRef.current = props.onReady;
  stateRef.current = {
    layers: props.layers,
    materials: props.materials,
    scenario: props.scenario,
    navigationMode: props.navigationMode,
    selectedPath: props.selectedPath,
    openObjects: props.openObjects,
    hiddenObjects: props.hiddenObjects,
    movement: props.movement,
  };
  waypointRef.current = props.waypointRequest;

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#cad2cb");
    scene.fog = new THREE.Fog("#cad2cb", 15, 28);

    const camera = new THREE.PerspectiveCamera(48, 1, 0.05, 80);
    camera.position.set(6.325, 15, 15.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.shadowMap.enabled = window.innerWidth > 700;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 700 ? 1.45 : 1.9));
    renderer.domElement.setAttribute("aria-label", "Interactive three-dimensional apartment model");
    renderer.domElement.setAttribute("role", "img");
    renderer.domElement.tabIndex = 0;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(6.3, 0.65, 4.6);
    controls.enableDamping = true;
    controls.dampingFactor = 0.07;
    controls.minDistance = 3;
    controls.maxDistance = 28;
    controls.maxPolarAngle = Math.PI * 0.49;

    const hemisphere = new THREE.HemisphereLight("#e8f0e9", "#6c6256", 2.5);
    scene.add(hemisphere);
    const sun = new THREE.DirectionalLight("#fff5df", 3.2);
    sun.position.set(-6, 12, 5);
    sun.castShadow = renderer.shadowMap.enabled;
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -14;
    sun.shadow.camera.right = 14;
    sun.shadow.camera.top = 14;
    sun.shadow.camera.bottom = -14;
    scene.add(sun);

    const layerGroups = {} as Record<TwinLayer, THREE.Group>;
    (["shell", "carpentry", "electrical", "plumbing", "furniture", "inventory", "issues", "references"] as TwinLayer[]).forEach((layer) => {
      const group = new THREE.Group();
      group.name = `Layer:${layer}`;
      layerGroups[layer] = group;
      scene.add(group);
    });

    const materials = {
      wall: new THREE.MeshStandardMaterial({ color: presetColor("wall", stateRef.current.materials.wall), roughness: 0.9 }),
      floor: new THREE.MeshStandardMaterial({ color: presetColor("floor", stateRef.current.materials.floor), roughness: 0.75 }),
      cabinet: new THREE.MeshStandardMaterial({ color: presetColor("cabinet", stateRef.current.materials.cabinet), roughness: 0.7 }),
      furniture: new THREE.MeshStandardMaterial({ color: presetColor("furniture", stateRef.current.materials.furniture), roughness: 0.86 }),
      dark: new THREE.MeshStandardMaterial({ color: "#28312f", roughness: 0.68 }),
      metal: new THREE.MeshStandardMaterial({ color: "#aaa59b", metalness: 0.65, roughness: 0.3 }),
      glass: new THREE.MeshPhysicalMaterial({ color: "#dff4ef", transparent: true, opacity: 0.38, roughness: 0.18, transmission: 0.3 }),
      issue: new THREE.MeshStandardMaterial({ color: "#df624d", emissive: "#7a1d10", emissiveIntensity: 0.55 }),
      inventory: new THREE.MeshStandardMaterial({ color: "#e7b85c", emissive: "#6d4e0e", emissiveIntensity: 0.25 }),
      white: new THREE.MeshStandardMaterial({ color: "#eeeae1", roughness: 0.58 }),
      reference: new THREE.MeshBasicMaterial({ color: "#53d4c7", transparent: true, opacity: 0.32, wireframe: true, depthTest: false }),
      referenceLine: new THREE.LineBasicMaterial({ color: "#2ebdad", transparent: true, opacity: 0.68, depthTest: false }),
    };

    const boxGeometryCache = new Map<string, THREE.BoxGeometry>();
    const boxGeometry = (x: number, y: number, z: number) => {
      const key = `${x}:${y}:${z}`;
      let geometry = boxGeometryCache.get(key);
      if (!geometry) {
        geometry = new THREE.BoxGeometry(x, y, z);
        boxGeometryCache.set(key, geometry);
      }
      return geometry;
    };

    const addBox = (
      parent: THREE.Object3D,
      size: [number, number, number],
      position: [number, number, number],
      material: THREE.Material,
      castShadow = true,
    ) => {
      const mesh = new THREE.Mesh(boxGeometry(...size), material);
      mesh.position.set(...position);
      mesh.castShadow = castShadow && renderer.shadowMap.enabled;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };

    // Comfort Home electrical plan, issued by CP on 25 May 2026. Coordinates are
    // metres traced from the drawing dimension chains, not an as-built survey.
    const walkableRegions: THREE.Box2[] = [];
    ROOM_REGIONS.forEach(({ bounds: [x1, x2, z1, z2] }) => {
      addBox(layerGroups.shell, [x2 - x1, 0.12, z2 - z1], [(x1 + x2) / 2, 0, (z1 + z2) / 2], materials.floor, false);
      walkableRegions.push(new THREE.Box2(new THREE.Vector2(x1 + 0.18, z1 + 0.18), new THREE.Vector2(x2 - 0.18, z2 - 0.18)));
    });
    addBox(layerGroups.shell, [1.585, 0.08, 1.31], [9.4075, -0.01, 7.195], materials.dark, false);

    const labelTextures: THREE.CanvasTexture[] = [];
    const addRoomLabel = (label: string, x: number, z: number, width = 1.45, parent: THREE.Object3D = layerGroups.shell, y = 0.34) => {
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 112;
      const context = canvas.getContext("2d");
      if (!context) return;
      context.fillStyle = "rgba(24, 34, 31, .78)";
      context.roundRect(4, 4, 504, 104, 24);
      context.fill();
      context.fillStyle = "#f5f0e5";
      context.font = "600 38px system-ui, sans-serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(label, 256, 57);
      const texture = new THREE.CanvasTexture(canvas);
      texture.colorSpace = THREE.SRGBColorSpace;
      labelTextures.push(texture);
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: texture, transparent: true, depthTest: false }));
      sprite.position.set(x, y, z);
      sprite.scale.set(width, width * 0.219, 1);
      sprite.renderOrder = 8;
      parent.add(sprite);
    };
    ROOM_REGIONS.forEach(({ label, bounds: [x1, x2, z1, z2] }) => addRoomLabel(label, (x1 + x2) / 2, (z1 + z2) / 2, Math.min(1.65, (x2 - x1) * 0.72)));
    addRoomLabel("Air-con ledge", 9.4075, 7.195, 1.35);
    const balconyGlazing = addBox(layerGroups.shell, [3.55, 2.35, 0.05], [1.775, 1.175, 1.4], materials.glass, false);
    balconyGlazing.name = "Balcony sliding glazing";

    const wallObstacles: THREE.Box2[] = [];
    const wall = (size: [number, number, number], position: [number, number, number]) => {
      const mesh = addBox(layerGroups.shell, size, position, materials.wall);
      const padding = 0.1;
      wallObstacles.push(new THREE.Box2(
        new THREE.Vector2(position[0] - size[0] / 2 - padding, position[2] - size[2] / 2 - padding),
        new THREE.Vector2(position[0] + size[0] / 2 + padding, position[2] + size[2] / 2 + padding),
      ));
      return mesh;
    };
    const wallX = (x1: number, x2: number, z: number) => wall([x2 - x1, WALL_HEIGHT, 0.12], [(x1 + x2) / 2, WALL_HEIGHT / 2, z]);
    const wallZ = (x: number, z1: number, z2: number) => wall([0.12, WALL_HEIGHT, z2 - z1], [x, WALL_HEIGHT / 2, (z1 + z2) / 2]);

    WALL_SEGMENTS.forEach((segment) => {
      if (segment.axis === "x") wallX(segment.from, segment.to, segment.fixed);
      else wallZ(segment.fixed, segment.from, segment.to);
    });

    const shellPath = "/World/Shell/Apartment";
    assignPath(layerGroups.shell, shellPath);

    const sofaGroup = new THREE.Group();
    sofaGroup.name = "Scenario:Sofa";
    sofaGroup.position.set(1.1, 0.34, 3.15);
    sofaGroup.rotation.y = Math.PI / 2;
    addBox(sofaGroup, [2.8, 0.42, 1.05], [0, 0.18, 0], materials.furniture);
    addBox(sofaGroup, [2.8, 0.7, 0.22], [0, 0.65, -0.42], materials.furniture);
    addBox(sofaGroup, [0.2, 0.54, 1], [-1.32, 0.42, 0], materials.furniture);
    addBox(sofaGroup, [0.2, 0.54, 1], [1.32, 0.42, 0], materials.furniture);
    assignPath(sofaGroup, "/World/Furniture/Living/Sofa_A");
    layerGroups.furniture.add(sofaGroup);

    const diningGroup = new THREE.Group();
    diningGroup.name = "Scenario:Dining";
    diningGroup.position.set(2.25, 0.72, 4.35);
    const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.1, 40), materials.white);
    tableTop.castShadow = renderer.shadowMap.enabled;
    diningGroup.add(tableTop);
    addBox(diningGroup, [0.18, 0.7, 0.18], [0, -0.38, 0], materials.dark);
    assignPath(diningGroup, "/World/Furniture/Living/DiningTable_A");
    layerGroups.furniture.add(diningGroup);

    const deskGroup = new THREE.Group();
    deskGroup.name = "Scenario:Desks";
    deskGroup.position.set(4.15, 0, 2.35);
    deskGroup.rotation.y = Math.PI / 2;
    [-0.86, 0.86].forEach((x) => {
      addBox(deskGroup, [1.55, 0.09, 0.7], [x, 0.76, 0], materials.cabinet);
      addBox(deskGroup, [0.07, 0.72, 0.5], [x - 0.57, 0.38, 0], materials.dark);
      addBox(deskGroup, [0.07, 0.72, 0.5], [x + 0.57, 0.38, 0], materials.dark);
    });
    assignPath(deskGroup, "/World/Furniture/Study/DeskPair");
    layerGroups.furniture.add(deskGroup);

    const bedGroup = new THREE.Group();
    bedGroup.position.set(11.38, 0, 1.55);
    bedGroup.rotation.y = -Math.PI / 2;
    addBox(bedGroup, [2.1, 0.42, 2.25], [0, 0.28, 0], materials.white);
    addBox(bedGroup, [2.25, 0.9, 0.18], [0, 0.62, -1.07], materials.cabinet);
    assignPath(bedGroup, "/World/Furniture/MasterBedroom/Bed_A");
    layerGroups.furniture.add(bedGroup);

    const addDetailedAssembly = (assembly: (typeof CARPENTRY_ASSEMBLIES)[number]) => {
      const group = new THREE.Group();
      group.name = assembly.name;
      group.position.set(...assembly.position);
      group.rotation.y = assembly.rotationY ?? 0;
      const [width, height, depth] = assembly.size;
      addBox(group, [width, 0.1, depth], [0, 0.05, 0], materials.dark);
      addBox(group, [width, 0.05, depth], [0, height - 0.025, 0], materials.cabinet);
      addBox(group, [0.055, height, depth], [-width / 2 + 0.0275, height / 2, 0], materials.cabinet);
      addBox(group, [0.055, height, depth], [width / 2 - 0.0275, height / 2, 0], materials.cabinet);
      addBox(group, [width - 0.09, height - 0.14, 0.055], [0, height / 2, -depth / 2 + 0.035], materials.cabinet);
      const bayTotal = assembly.bays.reduce((sum, bay) => sum + bay, 0);
      let cursor = -bayTotal / 2;
      assembly.bays.slice(0, -1).forEach((bay) => {
        cursor += bay;
        addBox(group, [0.035, height - 0.14, depth * 0.92], [cursor, height / 2, 0], materials.dark, false);
      });
      if (assembly.kind === "run" || assembly.kind === "vanity") {
        addBox(group, [width - 0.08, 0.065, depth + 0.08], [0, 0.94, 0.02], materials.white);
        addBox(group, [width - 0.1, 0.035, 0.05], [0, 1.4, depth / 2 + 0.03], materials.metal, false);
      } else if (assembly.kind === "feature-wall") {
        [0.68, 1.06, 1.44].forEach((y) => addBox(group, [Math.min(width * 0.28, 1.55), 0.045, depth * 0.86], [width * 0.3, y, 0], materials.white, false));
      } else {
        addBox(group, [width - 0.12, 0.035, depth + 0.025], [0, 1.25, 0.025], materials.metal, false);
      }
      assignPath(group, assembly.path);
      layerGroups.carpentry.add(group);
      return group;
    };

    CARPENTRY_ASSEMBLIES.filter(({ path }) => path !== CABINET_PATH && path !== WARDROBE_PATH).forEach(addDetailedAssembly);

    const kitchenAssembly = CARPENTRY_ASSEMBLIES.find(({ path }) => path === CABINET_PATH)!;
    const cabinetGroup = new THREE.Group();
    cabinetGroup.name = kitchenAssembly.name;
    cabinetGroup.position.set(...kitchenAssembly.position);
    const [kitchenWidth, kitchenHeight, kitchenDepth] = kitchenAssembly.size;
    addBox(cabinetGroup, [kitchenWidth, 0.1, kitchenDepth], [0, 0.05, 0], materials.dark);
    addBox(cabinetGroup, [kitchenWidth, 0.08, kitchenDepth + 0.08], [0, 0.94, 0], materials.white);
    addBox(cabinetGroup, [kitchenWidth, 0.05, kitchenDepth], [0, kitchenHeight - 0.025, 0], materials.cabinet);
    let kitchenCursor = -kitchenWidth / 2;
    kitchenAssembly.bays.slice(0, -1).forEach((bay) => {
      kitchenCursor += bay;
      addBox(cabinetGroup, [0.045, 0.86, kitchenDepth], [kitchenCursor, 0.5, 0], materials.dark, false);
      addBox(cabinetGroup, [0.045, 0.78, kitchenDepth], [kitchenCursor, 1.95, 0], materials.dark, false);
    });
    addBox(cabinetGroup, [kitchenWidth, 0.06, 0.05], [0, 1.4, kitchenDepth / 2], materials.metal, false);
    const cabinetDoorPivots: THREE.Group[] = [];
    [-kitchenWidth / 2 + 0.04, -kitchenWidth / 2 + 0.74].forEach((x, index) => {
      const pivot = new THREE.Group();
      pivot.position.set(x, 0.5, 0.32);
      addBox(pivot, [0.66, 0.72, 0.055], [0.33, 0, 0], materials.cabinet);
      pivot.userData.openDirection = index === 0 ? 1 : -1;
      cabinetGroup.add(pivot);
      cabinetDoorPivots.push(pivot);
    });
    const drawer = addBox(cabinetGroup, [0.72, 0.25, kitchenDepth * 0.78], [0.36, 0.76, 0.1], materials.cabinet);
    drawer.userData.closedZ = 0.1;
    assignPath(cabinetGroup, CABINET_PATH);
    layerGroups.carpentry.add(cabinetGroup);

    const wardrobeAssembly = CARPENTRY_ASSEMBLIES.find(({ path }) => path === WARDROBE_PATH)!;
    const wardrobe = new THREE.Group();
    wardrobe.name = wardrobeAssembly.name;
    wardrobe.position.set(...wardrobeAssembly.position);
    wardrobe.rotation.y = wardrobeAssembly.rotationY ?? 0;
    const [wardrobeWidth, wardrobeHeight, wardrobeDepth] = wardrobeAssembly.size;
    addBox(wardrobe, [wardrobeWidth, wardrobeHeight, wardrobeDepth], [0, wardrobeHeight / 2, 0], materials.cabinet);
    const wardrobeDoorPivots: THREE.Group[] = [];
    [-wardrobeWidth / 2 + 0.04, 0.02].forEach((x, index) => {
      const pivot = new THREE.Group();
      pivot.position.set(x, wardrobeHeight / 2, wardrobeDepth / 2 + 0.03);
      addBox(pivot, [wardrobeWidth / 2 - 0.06, wardrobeHeight - 0.16, 0.055], [(wardrobeWidth / 2 - 0.06) / 2, 0, 0], materials.cabinet);
      pivot.userData.openDirection = index === 0 ? 1 : -1;
      wardrobe.add(pivot);
      wardrobeDoorPivots.push(pivot);
    });
    assignPath(wardrobe, WARDROBE_PATH);
    layerGroups.carpentry.add(wardrobe);

    CARPENTRY_ASSEMBLIES.forEach((assembly) => {
      const registrationBox = new THREE.Mesh(boxGeometry(...assembly.size), materials.reference);
      registrationBox.position.set(assembly.position[0], assembly.position[1] + assembly.size[1] / 2, assembly.position[2]);
      registrationBox.rotation.y = assembly.rotationY ?? 0;
      registrationBox.renderOrder = 7;
      layerGroups.references.add(registrationBox);
      addRoomLabel(assembly.name, assembly.position[0], assembly.position[2], Math.min(1.7, Math.max(1.1, assembly.size[0] * 0.38)), layerGroups.references, assembly.size[1] + 0.24);
    });

    const dimensionVertices: number[] = [];
    const addDimensionSegment = (x1: number, x2: number, z: number) => {
      dimensionVertices.push(x1, 0.16, z, x2, 0.16, z, x1, 0.08, z - 0.1, x1, 0.24, z + 0.1, x2, 0.08, z - 0.1, x2, 0.24, z + 0.1);
    };
    [[0, 3.55], [3.55, 6.6], [6.6, 9.55], [9.55, 12.65]].forEach(([x1, x2]) => addDimensionSegment(x1, x2, -0.24));
    const dimensionGeometry = new THREE.BufferGeometry();
    dimensionGeometry.setAttribute("position", new THREE.Float32BufferAttribute(dimensionVertices, 3));
    const dimensionLines = new THREE.LineSegments(dimensionGeometry, materials.referenceLine);
    dimensionLines.renderOrder = 8;
    layerGroups.references.add(dimensionLines);
    [[1.775, "3.550 m"], [5.075, "3.050 m"], [8.075, "2.950 m"], [11.1, "3.100 m"]].forEach(([x, label]) => addRoomLabel(String(label), Number(x), -0.45, 1.05, layerGroups.references, 0.34));

    const boba = new THREE.Group();
    boba.position.set(2.96, 1.9, 4.55);
    boba.rotation.z = Math.PI / 2;
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.16, 32), materials.metal);
    boba.add(collar);
    const globe = new THREE.Mesh(new THREE.SphereGeometry(0.36, 28, 20), materials.white);
    globe.position.y = 0.32;
    boba.add(globe);
    assignPath(boba, "/World/Electrical/Living/BobaLight_Upper");
    layerGroups.electrical.add(boba);

    const fixtureGeometry = {
      ceiling: new THREE.CylinderGeometry(0.11, 0.11, 0.035, 18),
      marker: new THREE.SphereGeometry(0.085, 14, 10),
      blade: boxGeometry(0.72, 0.028, 0.12),
    };
    ELECTRICAL_FIXTURES.filter(({ path }) => path !== "/World/Electrical/Living/BobaLight_Upper").forEach((fixture) => {
      const fixtureGroup = new THREE.Group();
      fixtureGroup.name = `${fixture.kind}:${fixture.circuit}`;
      fixtureGroup.position.set(...fixture.position);
      if (fixture.kind === "fan") {
        const hub = new THREE.Mesh(fixtureGeometry.marker, materials.dark);
        fixtureGroup.add(hub);
        [0, (Math.PI * 2) / 3, (Math.PI * 4) / 3].forEach((rotation) => {
          const blade = new THREE.Mesh(fixtureGeometry.blade, materials.dark);
          blade.position.x = 0.34;
          const pivot = new THREE.Group();
          pivot.rotation.y = rotation;
          pivot.add(blade);
          fixtureGroup.add(pivot);
        });
      } else if (fixture.kind === "track") {
        addBox(fixtureGroup, [0.58, 0.045, 0.08], [0, 0, 0], materials.dark, false);
        [-0.2, 0, 0.2].forEach((x) => {
          const spot = new THREE.Mesh(fixtureGeometry.ceiling, materials.white);
          spot.position.x = x;
          fixtureGroup.add(spot);
        });
      } else if (fixture.kind === "socket" || fixture.kind === "switch") {
        addBox(fixtureGroup, [0.18, 0.12, 0.045], [0, 0, 0], materials.white, false);
      } else {
        const lightMesh = new THREE.Mesh(fixture.kind === "ceiling" ? fixtureGeometry.ceiling : fixtureGeometry.marker, materials.white);
        fixtureGroup.add(lightMesh);
      }
      assignPath(fixtureGroup, fixture.path);
      layerGroups.electrical.add(fixtureGroup);
    });

    EQUIPMENT_ASSETS.forEach((equipment) => {
      const equipmentGroup = new THREE.Group();
      equipmentGroup.name = equipment.name;
      equipmentGroup.position.set(...equipment.position);
      equipmentGroup.rotation.y = equipment.rotationY ?? 0;
      const [width, height, depth] = equipment.size;
      const equipmentMaterial = equipment.path.endsWith("Paludarium") ? materials.glass : equipment.path.endsWith("Sink") ? materials.metal : materials.dark;
      addBox(equipmentGroup, [width, height, depth], [0, height / 2, 0], equipmentMaterial);
      if (height > 0.7 && !equipment.path.endsWith("Paludarium")) {
        addBox(equipmentGroup, [width * 0.76, Math.min(0.48, height * 0.28), 0.035], [0, Math.min(height * 0.63, height - 0.3), depth / 2 + 0.02], materials.metal, false);
      }
      assignPath(equipmentGroup, equipment.path);
      layerGroups.inventory.add(equipmentGroup);
    });

    const controlsNode = new THREE.Group();
    controlsNode.position.set(3.48, 1.25, 6.15);
    addBox(controlsNode, [0.04, 0.28, 0.42], [0, 0, 0], materials.white, false);
    assignPath(controlsNode, "/World/Electrical/WholeHome/Controls");
    layerGroups.electrical.add(controlsNode);

    const shower = new THREE.Group();
    shower.position.set(9.98, 1.2, 5.72);
    shower.rotation.z = Math.PI / 2;
    const escutcheon = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.08, 32), materials.metal);
    shower.add(escutcheon);
    addBox(shower, [0.14, 0.32, 0.42], [0, 0.16, 0], materials.metal);
    assignPath(shower, "/World/Plumbing/MasterBath/ShowerMixer");
    layerGroups.plumbing.add(shower);

    const markerGeometry = new THREE.OctahedronGeometry(0.16);
    const addMarker = (position: [number, number, number], path: string, kind: "issue" | "inventory") => {
      const marker = new THREE.Mesh(markerGeometry, kind === "issue" ? materials.issue : materials.inventory);
      marker.position.set(...position);
      marker.userData.baseY = position[1];
      assignPath(marker, path);
      layerGroups[kind === "issue" ? "issues" : "inventory"].add(marker);
    };
    addMarker([2.58, 2.35, 4.55], "/World/Electrical/Living/BobaLight_Upper", "issue");
    addMarker([9.62, 1.72, 5.72], "/World/Plumbing/MasterBath/ShowerMixer", "issue");
    addMarker([11.38, 0.92, 1.55], "/World/Furniture/MasterBedroom/Bed_A", "issue");
    addMarker([4.15, 1.15, 2.35], "/World/Furniture/Study/DeskPair", "inventory");
    addMarker([6.15, 2.58, 6.87], CABINET_PATH, "inventory");
    addMarker([12.34, 2.78, 3.55], WARDROBE_PATH, "inventory");

    const grid = new THREE.GridHelper(18, 36, "#83948e", "#aebbb5");
    grid.position.set(6.325, -0.055, 4.6175);
    (grid.material as THREE.Material).opacity = 0.22;
    (grid.material as THREE.Material).transparent = true;
    layerGroups.shell.add(grid);

    const selectionHelper = new THREE.BoxHelper(scene, new THREE.Color("#ffcc78"));
    selectionHelper.material.depthTest = false;
    selectionHelper.material.transparent = true;
    selectionHelper.material.opacity = 0.95;
    selectionHelper.renderOrder = 10;
    selectionHelper.visible = false;
    scene.add(selectionHelper);

    const objectByPath = new Map<string, THREE.Object3D>();
    scene.traverse((object) => {
      const path = object.userData.semanticPath as string | undefined;
      if (path && !objectByPath.has(path)) objectByPath.set(path, object);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let pointerStart = { x: 0, y: 0 };
    let dragging = false;
    let yaw = Math.PI;
    let pitch = 0;

    const handlePointerDown = (event: PointerEvent) => {
      pointerStart = { x: event.clientX, y: event.clientY };
      dragging = false;
      if (stateRef.current.navigationMode === "walk") renderer.domElement.setPointerCapture(event.pointerId);
    };
    const handlePointerMove = (event: PointerEvent) => {
      const dx = event.clientX - pointerStart.x;
      const dy = event.clientY - pointerStart.y;
      if (Math.abs(dx) + Math.abs(dy) > 5) dragging = true;
      if (stateRef.current.navigationMode === "walk" && event.buttons === 1) {
        yaw -= event.movementX * 0.005;
        pitch = THREE.MathUtils.clamp(pitch - event.movementY * 0.004, -0.9, 0.9);
      }
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (stateRef.current.navigationMode === "walk" && renderer.domElement.hasPointerCapture(event.pointerId)) {
        renderer.domElement.releasePointerCapture(event.pointerId);
      }
      if (dragging) return;
      const bounds = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
      pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(scene.children, true);
      const selected = hits.find((hit) => hit.object.userData.semanticPath)?.object;
      const path = selected?.userData.semanticPath as string | undefined;
      if (!path) return;
      onSelectRef.current(path);
      if (path === CABINET_PATH || path === WARDROBE_PATH) onToggleRef.current(path);
    };
    renderer.domElement.addEventListener("pointerdown", handlePointerDown);
    renderer.domElement.addEventListener("pointermove", handlePointerMove);
    renderer.domElement.addEventListener("pointerup", handlePointerUp);

    const pressedKeys = new Set<string>();
    const keyDown = (event: KeyboardEvent) => {
      if (["w", "a", "s", "d", "ArrowLeft", "ArrowRight"].includes(event.key)) {
        pressedKeys.add(event.key);
        if (stateRef.current.navigationMode === "walk") event.preventDefault();
      }
    };
    const keyUp = (event: KeyboardEvent) => pressedKeys.delete(event.key);
    window.addEventListener("keydown", keyDown);
    window.addEventListener("keyup", keyUp);

    const assemblyObstacles = CARPENTRY_ASSEMBLIES.map((assembly) => {
      const [width, , depth] = assembly.size;
      const angle = assembly.rotationY ?? 0;
      const extentX = Math.abs(Math.cos(angle)) * width + Math.abs(Math.sin(angle)) * depth;
      const extentZ = Math.abs(Math.sin(angle)) * width + Math.abs(Math.cos(angle)) * depth;
      return new THREE.Box2(
        new THREE.Vector2(assembly.position[0] - extentX / 2 - 0.12, assembly.position[2] - extentZ / 2 - 0.12),
        new THREE.Vector2(assembly.position[0] + extentX / 2 + 0.12, assembly.position[2] + extentZ / 2 + 0.12),
      );
    });
    const equipmentObstacles = EQUIPMENT_ASSETS.map((equipment) => {
      const [width, , depth] = equipment.size;
      const angle = equipment.rotationY ?? 0;
      const extentX = Math.abs(Math.cos(angle)) * width + Math.abs(Math.sin(angle)) * depth;
      const extentZ = Math.abs(Math.sin(angle)) * width + Math.abs(Math.cos(angle)) * depth;
      return new THREE.Box2(
        new THREE.Vector2(equipment.position[0] - extentX / 2 - 0.08, equipment.position[2] - extentZ / 2 - 0.08),
        new THREE.Vector2(equipment.position[0] + extentX / 2 + 0.08, equipment.position[2] + extentZ / 2 + 0.08),
      );
    });
    const obstacles = [
      ...wallObstacles,
      ...assemblyObstacles,
      ...equipmentObstacles,
      new THREE.Box2(new THREE.Vector2(0.45, 1.65), new THREE.Vector2(1.75, 4.6)),
      new THREE.Box2(new THREE.Vector2(10.1, 0.35), new THREE.Vector2(12.4, 2.75)),
    ];
    const canMoveTo = (x: number, z: number) => {
      const point = new THREE.Vector2(x, z);
      if (!walkableRegions.some((region) => region.containsPoint(point))) return false;
      return !obstacles.some((box) => box.containsPoint(new THREE.Vector2(x, z)));
    };

    let currentWaypointSequence = -1;
    let previousTime = performance.now();
    let animationFrame = 0;
    const clock = new THREE.Clock();
    const animate = (time: number) => {
      const elapsed = clock.getElapsedTime();
      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;
      const state = stateRef.current;

      Object.entries(layerGroups).forEach(([id, group]) => {
        group.visible = state.layers[id as TwinLayer];
      });

      materials.wall.color.set(presetColor("wall", state.materials.wall));
      materials.floor.color.set(presetColor("floor", state.materials.floor));
      materials.cabinet.color.set(presetColor("cabinet", state.materials.cabinet));
      materials.furniture.color.set(presetColor("furniture", state.materials.furniture));

      const openCabinet = state.openObjects[CABINET_PATH] ? 1 : 0;
      cabinetDoorPivots.forEach((pivot) => {
        const target = (pivot.userData.openDirection as number) * openCabinet * Math.PI * 0.5;
        pivot.rotation.y = THREE.MathUtils.lerp(pivot.rotation.y, target, 0.12);
      });
      drawer.position.z = THREE.MathUtils.lerp(drawer.position.z, openCabinet ? 0.62 : 0.1, 0.12);
      const openWardrobe = state.openObjects[WARDROBE_PATH] ? 1 : 0;
      wardrobeDoorPivots.forEach((pivot) => {
        const target = (pivot.userData.openDirection as number) * openWardrobe * Math.PI * 0.52;
        pivot.rotation.y = THREE.MathUtils.lerp(pivot.rotation.y, target, 0.12);
      });

      const scenarioProgress = state.scenario;
      const showRenderFurniture = scenarioProgress === "render";
      sofaGroup.visible = showRenderFurniture && !state.hiddenObjects["/World/Furniture/Living/Sofa_A"];
      diningGroup.visible = showRenderFurniture && !state.hiddenObjects["/World/Furniture/Living/DiningTable_A"];
      deskGroup.visible = !state.hiddenObjects["/World/Furniture/Study/DeskPair"];
      bedGroup.visible = !state.hiddenObjects["/World/Furniture/MasterBedroom/Bed_A"];
      diningGroup.position.x = THREE.MathUtils.lerp(diningGroup.position.x, 2.25, 0.09);
      diningGroup.position.z = THREE.MathUtils.lerp(diningGroup.position.z, 4.35, 0.09);
      sofaGroup.position.x = THREE.MathUtils.lerp(sofaGroup.position.x, scenarioProgress === "work" ? 0.92 : 1.1, 0.09);
      sofaGroup.scale.setScalar(THREE.MathUtils.lerp(sofaGroup.scale.x, 1, 0.09));
      deskGroup.scale.setScalar(THREE.MathUtils.lerp(deskGroup.scale.x, scenarioProgress === "work" ? 1.06 : 1, 0.09));

      layerGroups.issues.children.forEach((marker, index) => {
        marker.position.y = marker.userData.baseY + Math.sin(elapsed * 2.2 + index) * 0.06;
        marker.rotation.y += delta * 0.7;
      });
      layerGroups.inventory.children.forEach((marker, index) => {
        if (typeof marker.userData.baseY === "number") {
          marker.position.y = marker.userData.baseY + Math.sin(elapsed * 1.7 + index) * 0.045;
          marker.rotation.y -= delta * 0.45;
        }
      });

      const selectedObject = state.selectedPath ? objectByPath.get(state.selectedPath) : undefined;
      if (selectedObject && selectedObject.visible) {
        selectionHelper.setFromObject(selectedObject);
        selectionHelper.visible = true;
      } else {
        selectionHelper.visible = false;
      }

      const requestedWaypoint = waypointRef.current;
      if (requestedWaypoint.sequence !== currentWaypointSequence) {
        currentWaypointSequence = requestedWaypoint.sequence;
        const waypoint = WAYPOINTS.find((candidate) => candidate.id === requestedWaypoint.id);
        if (waypoint) {
          const waypointTarget = new THREE.Vector3(...waypoint.target);
          const waypointPosition = new THREE.Vector3(...waypoint.position);
          if (waypoint.id === "overview" && mount.clientWidth < 700) {
            waypointPosition.sub(waypointTarget).multiplyScalar(0.84).add(waypointTarget);
          }
          camera.position.copy(waypointPosition);
          controls.target.set(waypoint.target[0], waypoint.target[1], waypoint.target[2]);
          if (state.navigationMode === "walk" && waypoint.id !== "overview") {
            const direction = new THREE.Vector3(...waypoint.target).sub(camera.position).normalize();
            yaw = Math.atan2(-direction.x, -direction.z);
            pitch = Math.asin(direction.y);
          }
        }
      }

      controls.enabled = state.navigationMode === "orbit";
      if (state.navigationMode === "orbit") {
        controls.update();
      } else {
        camera.position.y = 1.6;
        const combinedMovement = new Set<Movement>(state.movement);
        if (pressedKeys.has("w")) combinedMovement.add("forward");
        if (pressedKeys.has("s")) combinedMovement.add("back");
        if (pressedKeys.has("a")) combinedMovement.add("left");
        if (pressedKeys.has("d")) combinedMovement.add("right");
        if (pressedKeys.has("ArrowLeft")) combinedMovement.add("turnLeft");
        if (pressedKeys.has("ArrowRight")) combinedMovement.add("turnRight");
        if (combinedMovement.has("turnLeft")) yaw += delta * 1.65;
        if (combinedMovement.has("turnRight")) yaw -= delta * 1.65;
        const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
        const right = new THREE.Vector3(-forward.z, 0, forward.x);
        const travel = new THREE.Vector3();
        if (combinedMovement.has("forward")) travel.add(forward);
        if (combinedMovement.has("back")) travel.sub(forward);
        if (combinedMovement.has("right")) travel.add(right);
        if (combinedMovement.has("left")) travel.sub(right);
        if (travel.lengthSq() > 0) {
          travel.normalize().multiplyScalar(delta * 1.8);
          const nextX = camera.position.x + travel.x;
          const nextZ = camera.position.z + travel.z;
          if (canMoveTo(nextX, camera.position.z)) camera.position.x = nextX;
          if (canMoveTo(camera.position.x, nextZ)) camera.position.z = nextZ;
        }
        camera.rotation.set(pitch, yaw, 0, "YXZ");
      }

      renderer.render(scene, camera);
      animationFrame = requestAnimationFrame(animate);
    };

    const resize = () => {
      const width = Math.max(1, mount.clientWidth);
      const height = Math.max(1, mount.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, width < 700 ? 1.45 : 1.9));
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(mount);
    resize();
    animationFrame = requestAnimationFrame(animate);
    onReadyRef.current();

    return () => {
      cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      window.removeEventListener("keydown", keyDown);
      window.removeEventListener("keyup", keyUp);
      renderer.domElement.removeEventListener("pointerdown", handlePointerDown);
      renderer.domElement.removeEventListener("pointermove", handlePointerMove);
      renderer.domElement.removeEventListener("pointerup", handlePointerUp);
      controls.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          if (!Array.from(boxGeometryCache.values()).includes(object.geometry as THREE.BoxGeometry)) object.geometry.dispose();
        }
      });
      boxGeometryCache.forEach((geometry) => geometry.dispose());
      dimensionGeometry.dispose();
      labelTextures.forEach((texture) => texture.dispose());
      Object.values(materials).forEach((material) => material.dispose());
      selectionHelper.geometry.dispose();
      selectionHelper.material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="twin-canvas" ref={mountRef} />;
}
