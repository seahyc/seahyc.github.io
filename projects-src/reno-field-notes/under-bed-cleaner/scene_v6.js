import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const compact = window.matchMedia('(max-width: 820px)').matches;
const captureMode = new URLSearchParams(window.location.search).get('capture') === '1';

const DIM = Object.freeze({
  bedWidthMm: 1980,
  bedDepthMm: 2100,
  gapMm: 10,
  headSpanMm: 540,
  headChordMm: 55,
  headTargetMm: 5.5,
  pivotTargetMm: 7.5,
  wristLengthMm: 350,
  wristLinks: 7,
  steerTargetDeg: 60,
  oldHeadMm: 180,
});

const C = {
  bg: 0x071014,
  panel: 0x192a31,
  case: 0x263a42,
  case2: 0x3b525a,
  teal: 0x4ce0ce,
  orange: 0xff815f,
  yellow: 0xf6cc68,
  steel: 0xd5e0e3,
  floor: 0x74563e,
  bed: 0xb9ad9d,
  micro: 0x355e62,
  carrier: 0x8edfd5,
  clean: 0x5de498,
  dust: 0xe0b06b,
  cord: 0xc7d3d6,
};

function material(color, roughness = .55, metalness = 0, opacity = 1, emissive = 0) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness,
    metalness,
    transparent: opacity < 1,
    opacity,
    depthWrite: opacity >= .45,
    emissive,
    emissiveIntensity: emissive ? .38 : 0,
  });
}

const M = {
  panel: material(C.panel, .48),
  case: material(C.case, .34, .05),
  case2: material(C.case2, .42),
  teal: material(C.teal, .30, .02, 1, 0x073832),
  orange: material(C.orange, .35, 0, 1, 0x351008),
  yellow: material(C.yellow, .42, 0, 1, 0x302407),
  steel: material(C.steel, .20, .72),
  steelGhost: material(C.steel, .22, .60, .34),
  floor: material(C.floor, .88),
  bedGhost: material(C.bed, .92, 0, .18),
  bed: material(C.bed, .90),
  micro: material(C.micro, .98),
  carrier: material(C.carrier, .45, 0, .9),
  clean: material(C.clean, .55, 0, .22, 0x07371d),
  dust: material(C.dust, .88),
  clear: material(0xbde2e5, .12, .1, .13),
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(C.bg);
scene.fog = new THREE.Fog(C.bg, 7.5, 14);

const camera = new THREE.PerspectiveCamera(39, window.innerWidth / window.innerHeight, .02, 30);
camera.position.set(3.25, 2.25, 3.95);

const renderer = new THREE.WebGLRenderer({ antialias: !compact, preserveDrawingBuffer: captureMode, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.35 : 1.9));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.shadowMap.enabled = !compact;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.prepend(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = .075;
controls.minDistance = 1.5;
controls.maxDistance = 10;
controls.target.set(0, .12, 0);

scene.add(new THREE.HemisphereLight(0xf3fbff, 0x10171a, 2.25));
const key = new THREE.DirectionalLight(0xffffff, 4.4);
key.position.set(4.5, 7.5, 5.5);
key.shadow.mapSize.set(compact ? 512 : 1024, compact ? 512 : 1024);
key.castShadow = renderer.shadowMap.enabled;
key.shadow.camera.left = -5;
key.shadow.camera.right = 5;
key.shadow.camera.top = 5;
key.shadow.camera.bottom = -5;
scene.add(key);
const rim = new THREE.DirectionalLight(C.teal, 2.0);
rim.position.set(-5, 3, -5);
scene.add(rim);

function box(parent, name, size, pos, mat = M.case, cast = true) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
  mesh.name = name;
  mesh.position.set(...pos);
  mesh.castShadow = cast;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function cylinder(parent, name, radius, depth, pos, mat = M.case, rotation = [0, 0, 0], segments = 48) {
  const mesh = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, depth, segments), mat);
  mesh.name = name;
  mesh.position.set(...pos);
  mesh.rotation.set(...rotation);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  parent.add(mesh);
  return mesh;
}

function edgeOutline(parent, source, color = 0xe9f3f5, opacity = .52) {
  const line = new THREE.LineSegments(
    new THREE.EdgesGeometry(source.geometry),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
  );
  line.position.copy(source.position);
  line.rotation.copy(source.rotation);
  line.scale.copy(source.scale);
  parent.add(line);
  return line;
}

function lineFrom(parent, points, color, opacity = .9) {
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity }));
  parent.add(line);
  return line;
}

function floor(parent, width = 4.6, depth = 4.8) {
  box(parent, 'Timber floor', [width, .045, depth], [0, -.035, 0], M.floor);
  const jointMat = material(0x493426, 1);
  for (let x = -width / 2 + .18; x < width / 2; x += .28) {
    box(parent, 'Floor joint', [.006, .006, depth - .04], [x, -.009, 0], jointMat, false);
  }
}

function bedPlan(parent, offset = [0, 0, 0], ghost = true) {
  const g = new THREE.Group();
  g.position.set(...offset);
  parent.add(g);
  const bed = box(g, 'Woosa king storage bed', [1.98, .045, 2.10], [0, .025, 0], ghost ? M.bedGhost : M.bed);
  edgeOutline(g, bed, 0xf1f7f8, .66);
  box(g, 'Blocked head edge', [2.08, .032, .07], [0, .055, -1.07], M.orange, false);
  box(g, 'Blocked left edge', [.07, .032, 2.12], [-1.025, .055, 0], M.orange, false);
  box(g, 'Bedside niche — illustrative', [.42, .065, .77], [1.18, .07, -.66], M.orange, false);
  box(g, 'Partial usable right edge', [.065, .032, 1.18], [1.025, .055, .39], M.teal, false);
  return g;
}

function buildHead(parent) {
  const pivot = new THREE.Group();
  pivot.name = 'Fold-out head pivot';
  parent.add(pivot);
  const carrier = box(pivot, '540 mm carrier', [.54, .003, .055], [0, 0, 0], M.carrier);
  const microfiber = box(pivot, 'Washable microfiber sleeve', [.55, .005, .062], [0, -.004, 0], M.micro);
  edgeOutline(pivot, carrier, C.teal, .82);
  cylinder(pivot, 'Low-profile centre pivot', .009, .008, [0, .005, 0], M.yellow);
  box(pivot, 'Positive latch', [.022, .005, .014], [.012, .006, -.020], M.yellow);
  return { pivot, carrier, microfiber };
}

function buildAssembly(parent, { controller = true } = {}) {
  const group = new THREE.Group();
  group.name = 'V6 manual cleaner';
  parent.add(group);

  const controllerGroup = new THREE.Group();
  controllerGroup.name = 'External control handle';
  controllerGroup.position.set(1.26, .14, 0);
  group.add(controllerGroup);
  if (controller) {
    box(controllerGroup, 'Control shell', [.31, .23, .29], [0, 0, 0], M.case);
    box(controllerGroup, 'Low-angle grip', [.42, .13, .19], [.01, .19, 0], M.case2);
    box(controllerGroup, 'Left steering rocker', [.11, .035, .085], [-.07, .135, .08], M.teal);
    box(controllerGroup, 'Right steering rocker', [.11, .035, .085], [.07, .135, .08], M.orange);
    box(controllerGroup, 'Head fold trigger', [.07, .04, .13], [0, .06, -.15], M.yellow);
  }

  const spineLength = 1.58;
  const spineCenter = .34;
  box(group, 'Left 9 mm spring ribbon', [spineLength, .005, .009], [spineCenter, .060, -.006], M.steel);
  box(group, 'Right 9 mm spring ribbon', [spineLength, .005, .009], [spineCenter, .060, .006], M.steel);
  box(group, 'Low-friction ribbon guide', [spineLength - .05, .007, .004], [spineCenter, .057, 0], M.clear, false);

  const wristRoot = new THREE.Group();
  wristRoot.name = '350 mm steerable wrist root';
  wristRoot.position.set(-.45, .061, 0);
  group.add(wristRoot);
  cylinder(wristRoot, 'Root yaw pin', .008, .009, [0, .003, 0], M.yellow);

  const links = [];
  const joints = [wristRoot];
  let cursor = wristRoot;
  const linkLength = .05;
  for (let i = 0; i < DIM.wristLinks; i++) {
    const pivot = new THREE.Group();
    pivot.name = `Wrist joint ${i + 1}`;
    cursor.add(pivot);
    const body = box(pivot, `Wrist link ${i + 1}`, [linkLength - .005, .006, .028], [-linkLength / 2, 0, 0], i % 2 ? M.case2 : M.panel);
    edgeOutline(pivot, body, 0x9eb3b8, .32);
    cylinder(pivot, `Vertical pin ${i + 1}`, .003, .009, [-.003, .003, 0], M.steel);
    const next = new THREE.Group();
    next.position.x = -linkLength;
    pivot.add(next);
    links.push(pivot);
    joints.push(next);
    cursor = next;
  }

  const head = buildHead(cursor);
  head.pivot.position.set(-.008, -.006, 0);

  const cordGroup = new THREE.Group();
  cordGroup.name = 'Visible tendon routing';
  group.add(cordGroup);
  const leftCord = lineFrom(cordGroup, [new THREE.Vector3(), new THREE.Vector3()], C.teal);
  const rightCord = lineFrom(cordGroup, [new THREE.Vector3(), new THREE.Vector3()], C.orange);
  const foldCord = lineFrom(cordGroup, [new THREE.Vector3(), new THREE.Vector3()], C.yellow, .92);

  const assembly = { group, controllerGroup, wristRoot, links, joints, head, leftCord, rightCord, foldCord };
  setAssemblyState(assembly, { deployDeg: 90, steerDeg: 0 });
  return assembly;
}

function updateCordGeometry(line, points) {
  line.geometry.dispose();
  line.geometry = new THREE.BufferGeometry().setFromPoints(points);
}

function updateTendons(assembly) {
  assembly.group.updateMatrixWorld(true);
  const left = [new THREE.Vector3(1.23, .205, -.082), new THREE.Vector3(-.43, .073, -.014)];
  const right = [new THREE.Vector3(1.29, .205, .082), new THREE.Vector3(-.43, .073, .014)];
  const fold = [new THREE.Vector3(1.26, .165, 0), new THREE.Vector3(-.43, .098, 0)];

  for (let i = 0; i < assembly.joints.length; i++) {
    const joint = assembly.joints[i];
    const worldPos = new THREE.Vector3();
    const worldQuat = new THREE.Quaternion();
    joint.getWorldPosition(worldPos);
    joint.getWorldQuaternion(worldQuat);
    const side = new THREE.Vector3(0, 0, 1).applyQuaternion(worldQuat).multiplyScalar(.013);
    const leftWorld = worldPos.clone().sub(side);
    const rightWorld = worldPos.clone().add(side);
    left.push(assembly.group.worldToLocal(leftWorld.clone()));
    right.push(assembly.group.worldToLocal(rightWorld.clone()));
    fold.push(assembly.group.worldToLocal(worldPos.clone()).add(new THREE.Vector3(0, .041, 0)));
  }

  updateCordGeometry(assembly.leftCord, left);
  updateCordGeometry(assembly.rightCord, right);
  updateCordGeometry(assembly.foldCord, fold);
}

function setAssemblyState(assembly, { deployDeg = 90, steerDeg = 0 }) {
  const perJoint = THREE.MathUtils.degToRad(steerDeg / DIM.wristLinks);
  for (const link of assembly.links) link.rotation.y = perJoint;
  assembly.head.pivot.rotation.y = THREE.MathUtils.degToRad(deployDeg);
  updateTendons(assembly);
}

// Product mechanism view.
const overviewGroup = new THREE.Group();
scene.add(overviewGroup);
floor(overviewGroup, 4.7, 3.0);
const overviewAssembly = buildAssembly(overviewGroup);
overviewAssembly.group.position.set(-.05, .03, 0);
overviewAssembly.group.scale.setScalar(1.35);

// Real-room entry / deployed / steering views.
const roomGroup = new THREE.Group();
scene.add(roomGroup);
floor(roomGroup, 4.4, 4.7);
bedPlan(roomGroup);
const roomAssembly = buildAssembly(roomGroup);
roomAssembly.group.position.set(.04, .06, .34);
roomAssembly.group.rotation.y = 0;
roomAssembly.group.scale.setScalar(1.0);

// Cross-section: vertical dimension is deliberately magnified 18×.
const clearanceGroup = new THREE.Group();
scene.add(clearanceGroup);
box(clearanceGroup, 'Floor section', [3.7, .16, .8], [0, -.08, 0], M.floor);
box(clearanceGroup, 'Bed underside', [3.7, .42, .8], [0, 1.21, 0], M.bed);
box(clearanceGroup, 'Compressed microfiber', [1.48, .22, .54], [.15, .11, 0], M.micro);
box(clearanceGroup, '0.8 mm carrier', [1.48, .09, .51], [.15, .265, 0], M.carrier);
box(clearanceGroup, 'Low-profile pivot stack', [.24, .74, .31], [-.56, .37, 0], M.yellow);
box(clearanceGroup, 'Twin ribbon / wrist envelope', [1.20, .54, .18], [-1.35, .27, 0], M.steel);
lineFrom(clearanceGroup, [new THREE.Vector3(1.55, 0, .28), new THREE.Vector3(1.55, 1.0, .28)], C.orange);
lineFrom(clearanceGroup, [new THREE.Vector3(1.18, 0, .28), new THREE.Vector3(1.18, .75, .28)], C.teal);

// Exploded architecture view.
const explodedGroup = new THREE.Group();
scene.add(explodedGroup);
floor(explodedGroup, 4.7, 3.4);
const explodedHandle = new THREE.Group();
explodedHandle.position.set(1.45, .42, 0);
explodedGroup.add(explodedHandle);
box(explodedHandle, 'Two-part controller shell', [.48, .28, .40], [0, 0, 0], M.case);
box(explodedHandle, 'Steering rocker', [.28, .05, .12], [0, .22, .10], M.teal);
box(explodedHandle, 'Fold trigger', [.12, .05, .18], [0, .14, -.23], M.yellow);
box(explodedGroup, 'Twin coiled spring-ribbon module', [.82, .14, .30], [.47, .26, 0], M.steel);
const explodedWrist = new THREE.Group();
explodedWrist.position.set(-.42, .25, 0);
explodedGroup.add(explodedWrist);
for (let i = 0; i < DIM.wristLinks; i++) {
  box(explodedWrist, `Link ${i + 1}`, [.13, .07, .22], [-i * .16, 0, 0], i % 2 ? M.case2 : M.panel);
  cylinder(explodedWrist, `Pin ${i + 1}`, .018, .09, [-i * .16 + .06, .04, 0], M.steel);
}
const explodedHead = buildHead(explodedGroup);
explodedHead.pivot.position.set(-1.72, .22, 0);
explodedHead.pivot.rotation.y = Math.PI / 2;
box(explodedGroup, 'Removable microfiber sleeve', [.64, .038, .13], [-1.72, .61, 0], M.micro);

// Coverage comparison.
const coverageGroup = new THREE.Group();
scene.add(coverageGroup);
floor(coverageGroup, 5.8, 4.5);
function coverageBed(parent, x, newDesign) {
  const g = new THREE.Group();
  g.position.x = x;
  parent.add(g);
  const bed = box(g, newDesign ? 'V6 coverage bed' : 'V5 coverage bed', [1.98, .035, 2.10], [0, .025, 0], M.bedGhost);
  edgeOutline(g, bed, newDesign ? C.teal : C.orange, .84);
  const laneWidth = newDesign ? .54 : .18;
  const lanes = newDesign ? 4 : 12;
  for (let i = 0; i < lanes; i++) {
    const z = -1.05 + laneWidth / 2 + i * laneWidth;
    if (z > 1.05) break;
    const lane = box(g, `${newDesign ? 'Wide' : 'Narrow'} lane ${i + 1}`, [1.86, .010, laneWidth * .84], [0, .055, z], newDesign ? M.clean : M.clear, false);
    edgeOutline(g, lane, newDesign ? C.teal : C.orange, newDesign ? .30 : .16);
  }
  return g;
}
coverageBed(coverageGroup, -1.25, false);
coverageBed(coverageGroup, 1.25, true);

// Autonomous architecture: external actuation, thin passive sled.
const robotGroup = new THREE.Group();
scene.add(robotGroup);
floor(robotGroup, 4.5, 4.7);
bedPlan(robotGroup);
const anchors = [
  new THREE.Vector3(-.93, .10, -.98), new THREE.Vector3(.93, .10, -.98),
  new THREE.Vector3(-.93, .10, .98), new THREE.Vector3(.93, .10, .98),
];
for (let i = 0; i < anchors.length; i++) {
  cylinder(robotGroup, `Corner guide ${i + 1}`, .045, .05, anchors[i].toArray(), i % 2 ? M.orange : M.teal);
}
const sled = new THREE.Group();
sled.position.set(.20, .075, .16);
robotGroup.add(sled);
box(sled, '4–6 mm passive sled', [.30, .025, .22], [0, 0, 0], M.carrier);
box(sled, 'Microfiber pad', [.32, .018, .24], [0, -.018, 0], M.micro);
for (let i = 0; i < anchors.length; i++) {
  lineFrom(robotGroup, [anchors[i], sled.position.clone()], i % 2 ? C.orange : C.teal, .76);
}
const motorPod = new THREE.Group();
motorPod.position.set(1.46, .16, .52);
robotGroup.add(motorPod);
box(motorPod, 'External motor pod', [.48, .27, .42], [0, 0, 0], M.case);
cylinder(motorPod, 'Winch A', .09, .11, [-.13, .18, 0], M.teal, [Math.PI / 2, 0, 0]);
cylinder(motorPod, 'Winch B', .09, .11, [.13, .18, 0], M.orange, [Math.PI / 2, 0, 0]);

const groups = {
  overview: overviewGroup,
  stowed: roomGroup,
  deployed: roomGroup,
  steer: roomGroup,
  clearance: clearanceGroup,
  exploded: explodedGroup,
  coverage: coverageGroup,
  robot: robotGroup,
};

const modeTitle = document.querySelector('#modeTitle');
const modeCopy = document.querySelector('#modeCopy');
const metrics = document.querySelector('#metrics');
const risk = document.querySelector('#risk');
const deployInput = document.querySelector('#deploy');
const steerInput = document.querySelector('#steer');
const deployOut = document.querySelector('#deployOut');
const steerOut = document.querySelector('#steerOut');

const MODE = {
  overview: {
    title: 'V6 mechanism',
    copy: 'Twin spring ribbons provide reach. A seven-link distal wrist redirects the head; the centre-pivoted carrier folds inline for entry and opens broadside for cleaning.',
    metrics: [['540 mm', 'head span'], ['350 mm', 'wrist length'], ['±60°', 'yaw target'], ['≤7.5 mm', 'pivot target']],
    risk: 'Prototype gate: the linked wrist must carry push load without straightening or buckling. Tendon take-up and ribbon guidance are not yet production-proven.',
    camera: [3.15, 2.05, 3.75], target: [.12, .08, 0], deploy: 90, steer: 28,
  },
  stowed: {
    title: 'Folded entry',
    copy: 'The 540 mm bar aligns with the insertion axis, presenting only its 55 mm chord at the partial right-side opening beside the niche.',
    metrics: [['55 mm', 'entry width'], ['10 mm', 'bed gap'], ['1 edge', 'partial access'], ['0°', 'head angle']],
    risk: 'The niche dimensions are illustrative because the exact usable opening has not been measured. Verify the real entry length and any felt-pad obstructions.',
    camera: [3.35, 4.65, 3.55], target: [0, 0, .02], deploy: 0, steer: 0,
  },
  deployed: {
    title: 'Wide cleaning pass',
    copy: 'After the centre pivot clears the bed edge, the head rotates broadside. One pull covers three times the width of the former 180 mm paddle.',
    metrics: [['540 mm', 'cleaning span'], ['≈4', 'depth lanes'], ['3×', 'old swath'], ['washable', 'microfiber']],
    risk: 'The head-opening latch must be positively locked before pulling. A freely swinging bar would fold under drag and lose coverage.',
    camera: [2.95, 4.95, 2.25], target: [-.04, 0, .05], deploy: 90, steer: 0,
  },
  steer: {
    title: 'Short steerable wrist',
    copy: 'Differential tendon tension bends only the final 350 mm. The main reach member stays straight, limiting part count and avoiding a floppy two-metre snake.',
    metrics: [['7 × 50 mm', 'wrist links'], ['60°', 'target yaw'], ['≈167 mm', 'centre shift'], ['manual', 'tendon control']],
    risk: 'This is the highest-risk subsystem. The displayed geometry is a kinematic target—not evidence that the wrist can push a loaded head at two metres.',
    camera: [2.85, 5.05, 2.40], target: [-.08, 0, .06], deploy: 90, steer: 60,
  },
  clearance: {
    title: '10 mm clearance stack',
    copy: 'The section exaggerates height for readability. The microfiber/carrier should remain about 5.5 mm compressed; the centre pivot is the limiting feature at 7.5 mm.',
    metrics: [['10.0 mm', 'available'], ['7.5 mm', 'pivot maximum'], ['2.5 mm', 'tolerance'], ['18×', 'vertical display']],
    risk: 'A nominal 10 mm bed gap is not uniform. The prototype must pass an 8 mm gauge before floor testing so cloth bunching and felt compression do not jam it.',
    camera: [3.45, 1.30, 4.75], target: [0, .42, 0], deploy: 90, steer: 0,
  },
  exploded: {
    title: 'Exploded architecture',
    copy: 'The wide head remains simple and washable. Cost and failure risk concentrate in the twin-ribbon controller, tendon management and seven pinned wrist links.',
    metrics: [['2', 'spring ribbons'], ['3', 'control lines'], ['7', 'wrist links'], ['1', 'washable sleeve']],
    risk: 'Unlike V5, this cannot reuse an untouched commodity tape-measure core. V6 needs a custom twin-ribbon/tendon module or a substantially simplified base SKU.',
    camera: [3.45, 2.75, 4.80], target: [-.05, .25, 0], deploy: 90, steer: 0,
  },
  coverage: {
    title: 'Coverage comparison',
    copy: 'Left: the superseded 180 mm paddle. Right: four overlapping 540 mm passes span a 2.10 m bed depth before any steering benefit is counted.',
    metrics: [['12', 'old lanes'], ['4–5', 'V6 lanes'], ['≈67%', 'fewer passes'], ['2.10 m', 'bed depth']],
    risk: 'Pass-count reduction assumes an unobstructed floor under the bed. Interior feet or felt pads can split the reachable area into separate zones.',
    camera: [0, 6.6, .01], target: [0, 0, 0], deploy: 90, steer: 0,
  },
  robot: {
    title: 'Robotic side track',
    copy: 'A truly thin autonomous option externalises motors and power. Four lines move a 4–6 mm passive microfiber sled while the winches stay outside the bed.',
    metrics: [['4–6 mm', 'passive sled'], ['4', 'tension lines'], ['external', 'motors & power'], ['research', 'not base SKU']],
    risk: 'This requires lifting the bed for installation. Long-hair entanglement, line routing, homing and jam recovery make it a separate research product—not V6 manual cleaner scope.',
    camera: [3.55, 4.75, 3.70], target: [0, 0, 0], deploy: 90, steer: 0,
  },
};

let currentMode = 'overview';

function showOnly(mode) {
  for (const [name, group] of Object.entries(groups)) group.visible = name === mode || (group === roomGroup && ['stowed', 'deployed', 'steer'].includes(mode));
}

function setMetrics(items) {
  metrics.replaceChildren();
  for (const [value, label] of items) {
    const card = document.createElement('div');
    card.className = 'metric';
    const strong = document.createElement('b');
    strong.textContent = value;
    const span = document.createElement('span');
    span.textContent = label;
    card.append(strong, span);
    metrics.append(card);
  }
}

function setCamera(position, target) {
  camera.position.set(...position);
  controls.target.set(...target);
  controls.update();
}

function setMode(mode, preserveCustom = false) {
  if (!MODE[mode]) return;
  currentMode = mode;
  const def = MODE[mode];
  showOnly(mode);
  document.querySelectorAll('[data-mode]').forEach(button => button.classList.toggle('active', button.dataset.mode === mode));
  modeTitle.textContent = def.title;
  modeCopy.textContent = def.copy;
  setMetrics(def.metrics);
  risk.textContent = def.risk;
  if (!preserveCustom) {
    deployInput.value = String(def.deploy);
    steerInput.value = String(def.steer);
  }
  deployOut.textContent = `${deployInput.value}°`;
  steerOut.textContent = `${steerInput.value}°`;
  setAssemblyState(overviewAssembly, { deployDeg: Number(deployInput.value), steerDeg: Number(steerInput.value) });
  setAssemblyState(roomAssembly, { deployDeg: Number(deployInput.value), steerDeg: Number(steerInput.value) });
  setCamera(def.camera, def.target);
  renderer.render(scene, camera);
}

document.querySelectorAll('[data-mode]').forEach(button => button.addEventListener('click', () => setMode(button.dataset.mode)));

function onControl() {
  if (!['overview', 'stowed', 'deployed', 'steer'].includes(currentMode)) setMode('overview', true);
  deployOut.textContent = `${deployInput.value}°`;
  steerOut.textContent = `${steerInput.value}°`;
  const state = { deployDeg: Number(deployInput.value), steerDeg: Number(steerInput.value) };
  setAssemblyState(overviewAssembly, state);
  setAssemblyState(roomAssembly, state);
}
deployInput.addEventListener('input', onControl);
steerInput.addEventListener('input', onControl);

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth <= 820 ? 1.35 : 1.9));
}
window.addEventListener('resize', resize);

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

const params = new URLSearchParams(location.search);
if (captureMode) document.body.classList.add('capture');
setMode(params.get('mode') || 'overview');

window.setSchematicMode = mode => setMode(mode);
window.renderNow = () => renderer.render(scene, camera);
window.designDimensions = DIM;
window.demoReady = true;
animate();
