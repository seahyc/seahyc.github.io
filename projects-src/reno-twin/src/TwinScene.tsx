import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
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
const CABINET_PATH = "/World/Carpentry/Kitchen/CabinetSet_A";
const WARDROBE_PATH = "/World/Carpentry/MasterBedroom/Wardrobe_A";

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
    camera.position.set(13.5, 11, 14);

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
    controls.target.set(5.8, 0.65, 4.5);
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
    (["shell", "carpentry", "electrical", "plumbing", "furniture", "inventory", "issues"] as TwinLayer[]).forEach((layer) => {
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

    const floorRooms = [
      { center: [3, 0, 2.5] as const, size: [6, 0.12, 5] as const },
      { center: [7.5, 0, 1.5] as const, size: [3, 0.12, 3] as const },
      { center: [10.5, 0, 1.5] as const, size: [3, 0.12, 3] as const },
      { center: [3, 0, 7] as const, size: [6, 0.12, 4] as const },
      { center: [9, 0, 6] as const, size: [6, 0.12, 6] as const },
    ];
    floorRooms.forEach(({ center, size }) => addBox(layerGroups.shell, [...size], [...center], materials.floor, false));

    const wall = (size: [number, number, number], position: [number, number, number]) =>
      addBox(layerGroups.shell, size, position, materials.wall);
    wall([12.25, WALL_HEIGHT, 0.14], [6, WALL_HEIGHT / 2, -0.06]);
    wall([0.14, WALL_HEIGHT, 9.15], [-0.06, WALL_HEIGHT / 2, 4.5]);
    wall([12.25, WALL_HEIGHT, 0.14], [6, WALL_HEIGHT / 2, 9.06]);
    wall([0.14, WALL_HEIGHT, 9.15], [12.06, WALL_HEIGHT / 2, 4.5]);
    wall([0.12, WALL_HEIGHT, 3], [6, WALL_HEIGHT / 2, 1.5]);
    wall([0.12, WALL_HEIGHT, 2.1], [6, WALL_HEIGHT / 2, 7.95]);
    wall([3, WALL_HEIGHT, 0.12], [10.5, WALL_HEIGHT / 2, 3]);
    wall([1.65, WALL_HEIGHT, 0.12], [6.85, WALL_HEIGHT / 2, 3]);
    wall([1.6, WALL_HEIGHT, 0.12], [9.2, WALL_HEIGHT / 2, 3]);
    wall([2.2, WALL_HEIGHT, 0.12], [1.1, WALL_HEIGHT / 2, 5]);
    wall([2.2, WALL_HEIGHT, 0.12], [4.9, WALL_HEIGHT / 2, 5]);

    const shellPath = "/World/Shell/Apartment";
    assignPath(layerGroups.shell, shellPath);

    const sofaGroup = new THREE.Group();
    sofaGroup.name = "Scenario:Sofa";
    sofaGroup.position.set(2.35, 0.34, 2.1);
    addBox(sofaGroup, [2.8, 0.42, 1.05], [0, 0.18, 0], materials.furniture);
    addBox(sofaGroup, [2.8, 0.7, 0.22], [0, 0.65, -0.42], materials.furniture);
    addBox(sofaGroup, [0.2, 0.54, 1], [-1.32, 0.42, 0], materials.furniture);
    addBox(sofaGroup, [0.2, 0.54, 1], [1.32, 0.42, 0], materials.furniture);
    assignPath(sofaGroup, "/World/Furniture/Living/Sofa_A");
    layerGroups.furniture.add(sofaGroup);

    const diningGroup = new THREE.Group();
    diningGroup.name = "Scenario:Dining";
    diningGroup.position.set(4.55, 0.72, 3.85);
    const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.1, 40), materials.white);
    tableTop.castShadow = renderer.shadowMap.enabled;
    diningGroup.add(tableTop);
    addBox(diningGroup, [0.18, 0.7, 0.18], [0, -0.38, 0], materials.dark);
    assignPath(diningGroup, "/World/Furniture/Living/DiningTable_A");
    layerGroups.furniture.add(diningGroup);

    const deskGroup = new THREE.Group();
    deskGroup.name = "Scenario:Desks";
    deskGroup.position.set(2.7, 0, 7.7);
    [-0.86, 0.86].forEach((x) => {
      addBox(deskGroup, [1.55, 0.09, 0.7], [x, 0.76, 0], materials.cabinet);
      addBox(deskGroup, [0.07, 0.72, 0.5], [x - 0.57, 0.38, 0], materials.dark);
      addBox(deskGroup, [0.07, 0.72, 0.5], [x + 0.57, 0.38, 0], materials.dark);
    });
    assignPath(deskGroup, "/World/Furniture/Study/DeskPair");
    layerGroups.furniture.add(deskGroup);

    const bedGroup = new THREE.Group();
    bedGroup.position.set(8.7, 0, 6.6);
    addBox(bedGroup, [2.1, 0.42, 2.25], [0, 0.28, 0], materials.white);
    addBox(bedGroup, [2.25, 0.9, 0.18], [0, 0.62, -1.07], materials.cabinet);
    assignPath(bedGroup, "/World/Furniture/MasterBedroom/Bed_A");
    layerGroups.furniture.add(bedGroup);

    const cabinetGroup = new THREE.Group();
    cabinetGroup.position.set(7.5, 0, 0.55);
    addBox(cabinetGroup, [2.4, 0.12, 0.58], [0, 0.08, 0], materials.cabinet);
    addBox(cabinetGroup, [0.12, 0.82, 0.58], [-1.14, 0.48, 0], materials.cabinet);
    addBox(cabinetGroup, [0.12, 0.82, 0.58], [0, 0.48, 0], materials.cabinet);
    addBox(cabinetGroup, [0.12, 0.82, 0.58], [1.14, 0.48, 0], materials.cabinet);
    addBox(cabinetGroup, [2.48, 0.1, 0.7], [0, 0.94, 0], materials.white);
    const cabinetDoorPivots: THREE.Group[] = [];
    [-1.08, 0.06].forEach((x, index) => {
      const pivot = new THREE.Group();
      pivot.position.set(x, 0.5, 0.32);
      addBox(pivot, [1.05, 0.72, 0.07], [0.525, 0, 0], materials.cabinet);
      pivot.userData.openDirection = index === 0 ? 1 : -1;
      cabinetGroup.add(pivot);
      cabinetDoorPivots.push(pivot);
    });
    const drawer = addBox(cabinetGroup, [0.96, 0.25, 0.5], [0.58, 0.76, 0.1], materials.cabinet);
    drawer.userData.closedZ = 0.1;
    assignPath(cabinetGroup, CABINET_PATH);
    layerGroups.carpentry.add(cabinetGroup);

    const wardrobe = new THREE.Group();
    wardrobe.position.set(10.75, 0, 7.75);
    addBox(wardrobe, [2.2, 2.35, 0.62], [0, 1.18, 0], materials.cabinet);
    const wardrobeDoorPivots: THREE.Group[] = [];
    [-1.04, 0.02].forEach((x, index) => {
      const pivot = new THREE.Group();
      pivot.position.set(x, 1.18, 0.33);
      addBox(pivot, [1.02, 2.2, 0.06], [0.51, 0, 0], materials.cabinet);
      pivot.userData.openDirection = index === 0 ? 1 : -1;
      wardrobe.add(pivot);
      wardrobeDoorPivots.push(pivot);
    });
    assignPath(wardrobe, WARDROBE_PATH);
    layerGroups.carpentry.add(wardrobe);

    const boba = new THREE.Group();
    boba.position.set(0.12, 1.85, 2.45);
    boba.rotation.z = Math.PI / 2;
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.16, 32), materials.metal);
    boba.add(collar);
    const globe = new THREE.Mesh(new THREE.SphereGeometry(0.36, 28, 20), materials.white);
    globe.position.y = 0.32;
    boba.add(globe);
    assignPath(boba, "/World/Electrical/Living/BobaLight_Upper");
    layerGroups.electrical.add(boba);

    const controlsNode = new THREE.Group();
    controlsNode.position.set(5.86, 1.25, 3.85);
    addBox(controlsNode, [0.04, 0.28, 0.42], [0, 0, 0], materials.white, false);
    assignPath(controlsNode, "/World/Electrical/WholeHome/Controls");
    layerGroups.electrical.add(controlsNode);

    const shower = new THREE.Group();
    shower.position.set(11.86, 1.2, 1.25);
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
    addMarker([0.48, 2.35, 2.45], "/World/Electrical/Living/BobaLight_Upper", "issue");
    addMarker([11.48, 1.72, 1.25], "/World/Plumbing/MasterBath/ShowerMixer", "issue");
    addMarker([2.7, 1.15, 7.7], "/World/Furniture/Study/DeskPair", "inventory");
    addMarker([7.5, 1.3, 0.65], CABINET_PATH, "inventory");
    addMarker([10.75, 2.55, 7.75], WARDROBE_PATH, "inventory");

    const grid = new THREE.GridHelper(18, 36, "#83948e", "#aebbb5");
    grid.position.set(6, -0.055, 4.5);
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

    const obstacles = [
      new THREE.Box2(new THREE.Vector2(1.0, 1.35), new THREE.Vector2(3.8, 2.8)),
      new THREE.Box2(new THREE.Vector2(6.2, 0.05), new THREE.Vector2(8.8, 1.25)),
      new THREE.Box2(new THREE.Vector2(1.0, 7.2), new THREE.Vector2(4.5, 8.3)),
      new THREE.Box2(new THREE.Vector2(7.5, 5.3), new THREE.Vector2(9.9, 7.9)),
      new THREE.Box2(new THREE.Vector2(9.5, 7.25), new THREE.Vector2(11.8, 8.4)),
      // Interior wall runs, split where the diagrammatic shell leaves door openings.
      new THREE.Box2(new THREE.Vector2(5.82, 0), new THREE.Vector2(6.18, 3)),
      new THREE.Box2(new THREE.Vector2(5.82, 6.85), new THREE.Vector2(6.18, 9)),
      new THREE.Box2(new THREE.Vector2(9, 2.82), new THREE.Vector2(12, 3.18)),
      new THREE.Box2(new THREE.Vector2(6, 2.82), new THREE.Vector2(7.7, 3.18)),
      new THREE.Box2(new THREE.Vector2(8.35, 2.82), new THREE.Vector2(10, 3.18)),
      new THREE.Box2(new THREE.Vector2(0, 4.82), new THREE.Vector2(2.2, 5.18)),
      new THREE.Box2(new THREE.Vector2(3.8, 4.82), new THREE.Vector2(6, 5.18)),
    ];
    const canMoveTo = (x: number, z: number) => {
      if (x < 0.3 || x > 11.7 || z < 0.3 || z > 8.7) return false;
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
      sofaGroup.visible = !state.hiddenObjects["/World/Furniture/Living/Sofa_A"];
      diningGroup.visible = !state.hiddenObjects["/World/Furniture/Living/DiningTable_A"];
      deskGroup.visible = !state.hiddenObjects["/World/Furniture/Study/DeskPair"];
      diningGroup.position.x = THREE.MathUtils.lerp(diningGroup.position.x, scenarioProgress === "open" ? 5.1 : 4.55, 0.09);
      diningGroup.position.z = THREE.MathUtils.lerp(diningGroup.position.z, scenarioProgress === "open" ? 4.45 : 3.85, 0.09);
      sofaGroup.position.x = THREE.MathUtils.lerp(sofaGroup.position.x, scenarioProgress === "work" ? 1.95 : 2.35, 0.09);
      sofaGroup.scale.setScalar(THREE.MathUtils.lerp(sofaGroup.scale.x, scenarioProgress === "open" ? 0.82 : 1, 0.09));
      deskGroup.scale.setScalar(THREE.MathUtils.lerp(deskGroup.scale.x, scenarioProgress === "work" ? 1.06 : 1, 0.09));

      layerGroups.issues.children.forEach((marker, index) => {
        marker.position.y = marker.userData.baseY + Math.sin(elapsed * 2.2 + index) * 0.06;
        marker.rotation.y += delta * 0.7;
      });
      layerGroups.inventory.children.forEach((marker, index) => {
        marker.position.y = marker.userData.baseY + Math.sin(elapsed * 1.7 + index) * 0.045;
        marker.rotation.y -= delta * 0.45;
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
          camera.position.set(waypoint.position[0], waypoint.position[1], waypoint.position[2]);
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
      Object.values(materials).forEach((material) => material.dispose());
      selectionHelper.geometry.dispose();
      selectionHelper.material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="twin-canvas" ref={mountRef} />;
}
