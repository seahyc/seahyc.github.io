import { useEffect, useRef } from "react";
import {
  ACESFilmicToneMapping,
  ArrowHelper,
  BoxGeometry,
  Color,
  ConeGeometry,
  Curve,
  CylinderGeometry,
  DirectionalLight,
  DoubleSide,
  ExtrudeGeometry,
  FogExp2,
  Group,
  HemisphereLight,
  Material,
  Mesh,
  MeshPhongMaterial,
  MeshStandardMaterial,
  Object3D,
  Path,
  PerspectiveCamera,
  PointLight,
  RingGeometry,
  Scene,
  Shape,
  SphereGeometry,
  SRGBColorSpace,
  TorusGeometry,
  TubeGeometry,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export type SceneMode = "aligned" | "jammed" | "exploded" | "strap" | "tool";

export type Dimensions = {
  globeDiameter: number;
  collarDiameter: number;
  collarDepth: number;
  collarGripWidth: number;
  wallClearance: number;
  threadDiameter: number;
  threadPitch: number;
  threadLength: number;
  misalignment: number;
  pierClearWidth: number;
  ledgeProjection: number;
  toolClearance: number;
};

export type Sequence = { kind: "none" | "failure" | "tool"; id: number };
export type SequenceUpdate = { visible: boolean; progress: number; kicker: string; caption: string };

type Props = {
  mode: SceneMode;
  dimensions: Dimensions;
  sequence: Sequence;
  onSequenceUpdate: (update: SequenceUpdate) => void;
  registerReset: (reset: () => void) => void;
};

class HelixCurve extends Curve<Vector3> {
  constructor(
    private readonly radius: number,
    private readonly length: number,
    private readonly pitch: number,
    private readonly zStart = 0,
    private readonly phase = 0,
  ) {
    super();
  }

  getPoint(t: number, target = new Vector3()) {
    const angle = this.phase + t * (this.length / this.pitch) * Math.PI * 2;
    return target.set(
      Math.cos(angle) * this.radius,
      Math.sin(angle) * this.radius,
      this.zStart + t * this.length,
    );
  }
}

function ease(t: number) {
  const value = Math.max(0, Math.min(1, t));
  return value * value * (3 - 2 * value);
}

function phase(progress: number, start: number, end: number) {
  return ease((progress - start) / (end - start));
}

export function BobaScene({ mode, dimensions, sequence, onSequenceUpdate, registerReset }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ReturnType<typeof createEngine> | null>(null);
  const updateRef = useRef(onSequenceUpdate);
  updateRef.current = onSequenceUpdate;

  useEffect(() => {
    if (!hostRef.current) return;
    const engine = createEngine(hostRef.current, dimensions, (update) => updateRef.current(update));
    engineRef.current = engine;
    engine.setMode(mode);
    registerReset(engine.resetView);
    return () => {
      engine.dispose();
      engineRef.current = null;
    };
  }, [dimensions, registerReset]);

  useEffect(() => {
    engineRef.current?.setMode(mode);
  }, [mode]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (sequence.kind === "none") engine.cancelAnimation();
    else engine.startSequence(sequence.kind);
  }, [sequence.id, sequence.kind]);

  return <div ref={hostRef} style={{ width: "100%", height: "100%" }} />;
}

function createEngine(host: HTMLDivElement, dimensions: Dimensions, report: (update: SequenceUpdate) => void) {
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const radialSegments = mobile ? 40 : 60;

  const scene = new Scene();
  scene.fog = new FogExp2(0x090d14, 0.00145);
  const camera = new PerspectiveCamera(mobile ? 43 : 36, 1, 0.5, 1200);
  const renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = !mobile;
  renderer.shadowMap.autoUpdate = false;
  host.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.target.set(0, 0, 58);
  controls.minDistance = 125;
  controls.maxDistance = 590;
  controls.enablePan = false;

  scene.add(new HemisphereLight(0xd6e8ff, 0x11141a, 2.5));
  const key = new DirectionalLight(0xffffff, 4.1);
  key.position.set(150, 190, 250);
  key.castShadow = !mobile;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);
  const rim = new DirectionalLight(0x65b9ff, 2.2);
  rim.position.set(-170, 80, 110);
  scene.add(rim);
  const warm = new PointLight(0xffc978, 900, 420, 2);
  warm.position.set(10, -50, 135);
  scene.add(warm);

  const materials = {
    wall: new MeshStandardMaterial({ color: 0xd7d6d0, roughness: .94 }),
    ledge: new MeshStandardMaterial({ color: 0xc5c2b8, roughness: .9 }),
    metal: new MeshStandardMaterial({ color: 0xb7c0ca, roughness: .31, metalness: .76 }),
    metalDark: new MeshStandardMaterial({ color: 0x596575, roughness: .36, metalness: .76 }),
    collar: new MeshStandardMaterial({ color: 0xe7eaec, roughness: .54, metalness: .21 }),
    ceramic: new MeshStandardMaterial({ color: 0xe8dec7, roughness: .8 }),
    bulb: new MeshPhongMaterial({ color: 0xffd894, emissive: 0xff9f32, emissiveIntensity: .42, shininess: 48 }),
    glass: new MeshPhongMaterial({ color: 0xe8f4ff, emissive: 0x17273a, emissiveIntensity: .22, transparent: true, opacity: .36, shininess: 82, side: DoubleSide, depthWrite: false }),
    female: new MeshPhongMaterial({ color: 0xa5d9ef, transparent: true, opacity: .62, shininess: 78, side: DoubleSide, depthWrite: false }),
    spring: new MeshStandardMaterial({ color: 0xc5cdd7, roughness: .24, metalness: .86 }),
    thread: new MeshStandardMaterial({ color: 0xf2bd5c, roughness: .29, metalness: .72 }),
    contact: new MeshStandardMaterial({ color: 0xff5149, emissive: 0xff2119, emissiveIntensity: 2.1, roughness: .34 }),
    tool: new MeshStandardMaterial({ color: 0x5bbcff, emissive: 0x123f62, emissiveIntensity: .5, roughness: .32, metalness: .25, transparent: true, opacity: .9 }),
    toolAlt: new MeshStandardMaterial({ color: 0x8bd8ff, emissive: 0x153b54, emissiveIntensity: .44, roughness: .36, metalness: .2, transparent: true, opacity: .86 }),
    rubber: new MeshStandardMaterial({ color: 0x152029, roughness: .98 }),
    band: new MeshStandardMaterial({ color: 0xe3b960, roughness: .28, metalness: .8 }),
    danger: new MeshStandardMaterial({ color: 0xff625b, emissive: 0xa31b16, emissiveIntensity: 1.2, transparent: true, opacity: .72 }),
    guard: new MeshPhongMaterial({ color: 0x8ed8ff, transparent: true, opacity: .32, shininess: 60, side: DoubleSide, depthWrite: false }),
    success: new MeshStandardMaterial({ color: 0x58daa0, emissive: 0x198c5a, emissiveIntensity: 1.2, roughness: .35 }),
  };

  const root = new Group();
  scene.add(root);
  const wall = new Mesh(new BoxGeometry(330, 300, 8), materials.wall);
  wall.position.z = -4;
  wall.receiveShadow = !mobile;
  root.add(wall);

  const leftLedge = new Mesh(new BoxGeometry(9, 282, dimensions.ledgeProjection), materials.ledge);
  const rightLedge = leftLedge.clone();
  leftLedge.position.set(-dimensions.pierClearWidth / 2 - 4.5, 0, dimensions.ledgeProjection / 2);
  rightLedge.position.set(dimensions.pierClearWidth / 2 + 4.5, 0, dimensions.ledgeProjection / 2);
  root.add(leftLedge, rightLedge);

  const collarRadius = dimensions.collarDiameter / 2;
  const globeRadius = dimensions.globeDiameter / 2;
  const globeCenterZ = 80;
  const jawWidth = Math.max(4, dimensions.collarGripWidth - 1.5);
  const jawTube = jawWidth / 2;
  const jawCenterZ = 1.2 + jawTube;
  const frontZ = 118;
  const cageInnerRadius = globeRadius + dimensions.toolClearance;
  const cageRadius = cageInnerRadius + 3.5;

  function cylinder(radius: number, depth: number, material: Material, segments = radialSegments) {
    const mesh = new Mesh(new CylinderGeometry(radius, radius, depth, segments), material);
    mesh.rotation.x = Math.PI / 2;
    mesh.castShadow = !mobile;
    mesh.receiveShadow = !mobile;
    return mesh;
  }

  function annulus(outerRadius: number, innerRadius: number, depth: number, material: Material) {
    const shape = new Shape();
    shape.absarc(0, 0, outerRadius, 0, Math.PI * 2, false);
    const hole = new Path();
    hole.absarc(0, 0, innerRadius, 0, Math.PI * 2, true);
    shape.holes.push(hole);
    const geometry = new ExtrudeGeometry(shape, { depth, bevelEnabled: false, curveSegments: radialSegments, steps: 1 });
    const mesh = new Mesh(geometry, material);
    mesh.castShadow = !mobile;
    return mesh;
  }

  function helix(radius: number, length: number, pitch: number, tubeRadius: number, material: Material, zStart = 0, helixPhase = 0) {
    const turns = Math.max(1, length / pitch);
    const geometry = new TubeGeometry(
      new HelixCurve(radius, length, pitch, zStart, helixPhase),
      Math.ceil(turns * (mobile ? 18 : 26)),
      tubeRadius,
      mobile ? 6 : 8,
      false,
    );
    return new Mesh(geometry, material);
  }

  function rail(radius: number, angle: number, zStart: number, zEnd: number, material: Material) {
    const item = cylinder(3.1, zEnd - zStart, material, 16);
    item.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, (zStart + zEnd) / 2);
    return item;
  }

  function bridge(innerRadius: number, outerRadius: number, angle: number, z: number, material: Material) {
    const length = outerRadius - innerRadius;
    const item = new Mesh(new BoxGeometry(length, 6.2, 6.2), material);
    item.position.set(Math.cos(angle) * (innerRadius + outerRadius) / 2, Math.sin(angle) * (innerRadius + outerRadius) / 2, z);
    item.rotation.z = angle;
    return item;
  }

  const fixed = new Group();
  root.add(fixed);
  const plate = cylinder(36, 2.5, materials.metal);
  plate.position.z = 1.25;
  fixed.add(plate);
  const maleCore = cylinder(dimensions.threadDiameter / 2 - 1.2, dimensions.threadLength + 1, materials.metalDark);
  maleCore.position.z = 3 + dimensions.threadLength / 2;
  fixed.add(maleCore);
  fixed.add(helix(dimensions.threadDiameter / 2, dimensions.threadLength, dimensions.threadPitch, .9, materials.thread, 2.8));
  const socket = cylinder(11.5, 31, materials.ceramic, 30);
  socket.position.z = 18;
  fixed.add(socket);
  const socketTop = cylinder(8.5, 13, materials.ceramic, 30);
  socketTop.position.z = 39;
  fixed.add(socketTop);
  const bulb = cylinder(8, 35, materials.bulb, 24);
  bulb.position.z = 62;
  fixed.add(bulb);

  const shade = new Group();
  root.add(shade);
  const collar = new Group();
  shade.add(collar);
  collar.add(annulus(collarRadius, dimensions.threadDiameter / 2 + 4, dimensions.collarDepth, materials.collar));
  const back = annulus(collarRadius - .4, dimensions.threadDiameter / 2 + 1, 1.8, materials.collar);
  back.position.z = .1;
  collar.add(back);
  const femaleBody = annulus(dimensions.threadDiameter / 2 + 3.5, dimensions.threadDiameter / 2 - 1.1, dimensions.threadLength + 1.5, materials.female);
  femaleBody.position.z = .8;
  collar.add(femaleBody);
  collar.add(helix(dimensions.threadDiameter / 2 - .2, dimensions.threadLength, dimensions.threadPitch, .72, materials.female, 1.5, Math.PI));

  for (let index = 0; index < 3; index += 1) {
    const clip = new Group();
    clip.rotation.z = index * Math.PI * 2 / 3;
    const leaf = new Mesh(new BoxGeometry(9, 1.5, 22), materials.spring);
    leaf.position.set(Math.max(31, collarRadius - 5), 0, dimensions.collarDepth + 7);
    leaf.rotation.y = -.18;
    clip.add(leaf);
    collar.add(clip);
  }

  const glassAssembly = new Group();
  shade.add(glassAssembly);
  const globe = new Mesh(new SphereGeometry(globeRadius, mobile ? 40 : 56, mobile ? 28 : 38), materials.glass);
  globe.position.z = globeCenterZ;
  globe.castShadow = !mobile;
  glassAssembly.add(globe);
  const neck = annulus(Math.min(collarRadius - 2, 39), Math.min(collarRadius - 6, 35), 8, materials.glass);
  neck.position.z = dimensions.collarDepth - 1;
  glassAssembly.add(neck);

  const collarWitness = new Mesh(new BoxGeometry(4.5, 9, 2.2), materials.thread);
  collarWitness.position.set(0, collarRadius - 4, Math.min(dimensions.collarDepth - 2, 12));
  shade.add(collarWitness);
  const globeWitness = new Mesh(new SphereGeometry(3, 14, 10), materials.thread);
  globeWitness.position.set(globeRadius * .7, globeRadius * .52, globeCenterZ + globeRadius * .42);
  shade.add(globeWitness);

  const contactPoints = new Group();
  const contactGeometry = new SphereGeometry(2.4, 14, 10);
  [[dimensions.threadDiameter / 2, 0, 6], [-dimensions.threadDiameter / 2, 0, 9], [0, dimensions.threadDiameter / 2, 7.5]].forEach(([x, y, z]) => {
    const point = new Mesh(contactGeometry, materials.contact);
    point.position.set(x, y, z);
    contactPoints.add(point);
  });
  root.add(contactPoints);
  const jamHalo = new Mesh(new TorusGeometry(dimensions.threadDiameter / 2 + 4.5, 2.1, 8, radialSegments), materials.contact);
  jamHalo.position.z = 8;
  root.add(jamHalo);

  const strapOnly = new Group();
  shade.add(strapOnly);
  const openStrap = new Mesh(new TorusGeometry(collarRadius + 2, 1.5, 6, radialSegments, Math.PI * 1.84), materials.band);
  openStrap.rotation.z = -.79;
  openStrap.position.z = jawCenterZ;
  strapOnly.add(openStrap);
  const strapBuckle = new Mesh(new BoxGeometry(12, 8, Math.min(8, jawWidth)), materials.band);
  strapBuckle.position.set(collarRadius + 3, 0, jawCenterZ);
  strapOnly.add(strapBuckle);
  const trappedHandle = new Mesh(new BoxGeometry(94, 8, 7), materials.danger);
  trappedHandle.position.set(15, collarRadius + 6, jawCenterZ);
  trappedHandle.rotation.z = -.18;
  strapOnly.add(trappedHandle);
  const sweepWarning = new Mesh(new TorusGeometry(collarRadius + 44, 1.8, 7, radialSegments, Math.PI * 1.25), materials.danger);
  sweepWarning.rotation.z = -.6;
  sweepWarning.position.z = Math.max(1.2, dimensions.wallClearance * .45);
  strapOnly.add(sweepWarning);

  function toolHalf(startAngle: number, material: Material) {
    const group = new Group();
    const arc = Math.PI * .94;
    const jawRadius = collarRadius + 1 + jawTube;
    const rearJaw = new Mesh(new TorusGeometry(jawRadius, jawTube, mobile ? 6 : 8, radialSegments, arc), material);
    rearJaw.rotation.z = startAngle;
    rearJaw.position.z = jawCenterZ;
    group.add(rearJaw);
    const liner = new Mesh(new TorusGeometry(collarRadius + .5, .55, 5, radialSegments, arc), materials.rubber);
    liner.rotation.z = startAngle;
    liner.position.z = jawCenterZ;
    group.add(liner);
    [startAngle, startAngle + arc].forEach((angle) => {
      group.add(bridge(jawRadius, cageRadius, angle, jawCenterZ, material));
      group.add(rail(cageRadius, angle, jawCenterZ, frontZ, material));
    });
    const front = new Mesh(new TorusGeometry(cageRadius, 3.8, 8, radialSegments, arc), material);
    front.rotation.z = startAngle;
    front.position.z = frontZ;
    group.add(front);
    const handleAngle = startAngle + arc / 2;
    const handle = new Mesh(new BoxGeometry(38, 9, 7), material);
    handle.position.set(Math.cos(handleAngle) * (cageRadius + 16), Math.sin(handleAngle) * (cageRadius + 16), frontZ);
    handle.rotation.z = handleAngle + Math.PI / 2;
    group.add(handle);
    return group;
  }

  const tool = new Group();
  shade.add(tool);
  const upperTool = toolHalf(.03, materials.tool);
  const lowerTool = toolHalf(Math.PI + .03, materials.toolAlt);
  tool.add(upperTool, lowerTool);
  const removableBand = new Mesh(new TorusGeometry(collarRadius + jawWidth + 1, 1.1, 6, radialSegments, Math.PI * 1.9), materials.band);
  removableBand.rotation.z = -.63;
  removableBand.position.z = jawCenterZ;
  tool.add(removableBand);
  const bandBuckle = new Mesh(new BoxGeometry(11, 7, Math.min(jawWidth, 8)), materials.band);
  bandBuckle.position.set(collarRadius + jawWidth + 1, 0, jawCenterZ);
  tool.add(bandBuckle);

  const bolts = new Group();
  [-1, 1].forEach((side) => {
    const bolt = new Mesh(new CylinderGeometry(2, 2, 19, 14), materials.band);
    bolt.position.set(side * cageRadius, 0, frontZ);
    bolts.add(bolt);
  });
  tool.add(bolts);

  const torqueArrow = new Group();
  const arrowRadius = cageRadius + 18;
  const arrowArc = new Mesh(new TorusGeometry(arrowRadius, 2, 7, radialSegments, Math.PI * 1.28), materials.thread);
  arrowArc.rotation.z = -.66;
  arrowArc.position.z = frontZ + 8;
  torqueArrow.add(arrowArc);
  const arrowEnd = -.66 + Math.PI * 1.28;
  const arrowHead = new Mesh(new ConeGeometry(5, 12, 18), materials.thread);
  arrowHead.position.set(Math.cos(arrowEnd) * arrowRadius, Math.sin(arrowEnd) * arrowRadius, frontZ + 8);
  arrowHead.rotation.z = arrowEnd;
  torqueArrow.add(arrowHead);
  tool.add(torqueArrow);

  const biasArrow = new ArrowHelper(new Vector3(0, 0, -1), new Vector3(collarRadius + 10, 0, 65), 44, 0x58daa0, 11, 6);
  tool.add(biasArrow);

  const guard = new Group();
  [0.04, Math.PI + .04].forEach((startAngle) => {
    const piece = new Mesh(new RingGeometry(collarRadius + 1, collarRadius + 23, radialSegments, 1, startAngle, Math.PI * .94), materials.guard);
    guard.add(piece);
  });
  guard.position.z = .65;
  root.add(guard);

  let currentMode: SceneMode = "jammed";
  let raf = 0;
  let animation: { kind: "failure" | "tool"; start: number; duration: number } | null = null;
  let lastReport = 0;
  let hideTimer = 0;

  const renderOnce = () => renderer.render(scene, camera);

  function cameraPreset(nextMode = currentMode) {
    const toolView = nextMode === "tool" || nextMode === "strap";
    camera.position.set(
      mobile ? (toolView ? 245 : 225) : (toolView ? 235 : 215),
      mobile ? 108 : 120,
      mobile ? (toolView ? 410 : 345) : (toolView ? 325 : 265),
    );
    controls.target.set(0, 0, toolView ? 70 : 55);
    controls.update();
    renderOnce();
  }

  function resetObjects() {
    shade.position.set(0, 0, dimensions.wallClearance);
    shade.rotation.set(0, 0, 0);
    glassAssembly.position.set(0, 0, 0);
    collar.position.set(0, 0, 0);
    contactPoints.visible = false;
    contactPoints.scale.setScalar(1);
    jamHalo.visible = false;
    jamHalo.scale.setScalar(1);
    strapOnly.visible = false;
    tool.visible = false;
    upperTool.position.set(0, 0, 0);
    lowerTool.position.set(0, 0, 0);
    bolts.scale.setScalar(1);
    removableBand.scale.setScalar(1);
    torqueArrow.visible = true;
    biasArrow.visible = true;
    guard.visible = false;
    guard.position.x = 0;
    globe.material.opacity = .36;
    neck.material.opacity = .36;
  }

  function setMode(nextMode: SceneMode, resetCamera = true) {
    currentMode = nextMode;
    animation = null;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    resetObjects();
    if (nextMode === "aligned") {
      shade.position.z = 1;
    } else if (nextMode === "jammed") {
      shade.rotation.x = dimensions.misalignment * Math.PI / 180 * .34;
      shade.rotation.y = dimensions.misalignment * Math.PI / 180;
      shade.rotation.z = -Math.PI * 7;
      contactPoints.visible = true;
      contactPoints.scale.setScalar(1.7);
      jamHalo.visible = true;
    } else if (nextMode === "exploded") {
      shade.position.z = 52;
      glassAssembly.position.z = 75;
      globe.material.opacity = .24;
      neck.material.opacity = .25;
    } else if (nextMode === "strap") {
      shade.rotation.y = dimensions.misalignment * Math.PI / 180;
      contactPoints.visible = true;
      jamHalo.visible = true;
      strapOnly.visible = true;
      guard.visible = true;
      globe.material.opacity = .27;
    } else if (nextMode === "tool") {
      shade.rotation.y = dimensions.misalignment * Math.PI / 180;
      contactPoints.visible = true;
      jamHalo.visible = true;
      tool.visible = true;
      guard.visible = true;
      globe.material.opacity = .25;
    }
    if (resetCamera) cameraPreset(nextMode);
    else renderOnce();
  }

  function reportAt(update: SequenceUpdate, now: number, force = false) {
    if (!force && now - lastReport < 90) return;
    lastReport = now;
    report(update);
  }

  function tick(now: number) {
    if (!animation) {
      raf = 0;
      renderOnce();
      return;
    }
    const progress = Math.min(1, (now - animation.start) / animation.duration);
    if (animation.kind === "failure") updateFailure(progress, now);
    else updateTool(progress, now);
    renderOnce();
    if (progress < 1) raf = requestAnimationFrame(tick);
    else {
      animation = null;
      raf = 0;
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => report({ visible: false, progress: 1, kicker: "", caption: "" }), 1800);
    }
  }

  function updateFailure(progress: number, now: number) {
    const tilt = dimensions.misalignment * Math.PI / 180 * 1.7;
    if (progress < .12) {
      reportAt({ visible: true, progress, kicker: "False start", caption: "One edge enters the wrong groove while the globe still looks nearly straight." }, now);
    } else if (progress < .58) {
      const t = phase(progress, .12, .58);
      shade.position.z = 1 + dimensions.wallClearance * t;
      shade.rotation.z = -Math.PI * 7 * t;
      shade.rotation.x = tilt * .32 * t;
      shade.rotation.y = tilt * t;
      contactPoints.visible = t > .3;
      contactPoints.scale.setScalar(1 + t * 2.7);
      jamHalo.visible = t > .4;
      reportAt({ visible: true, progress, kicker: "3½ reported rotations", caption: "It turns, but the tilted female thread rides a rough false path." }, now);
    } else if (progress < .83) {
      const t = phase(progress, .58, .83);
      const shake = Math.sin(t * Math.PI * 15) * (1 - t * .5);
      shade.position.z = 1 + dimensions.wallClearance + Math.abs(shake) * 1.5;
      shade.rotation.z = -Math.PI * 7 + shake * .16;
      contactPoints.scale.setScalar(3.7 + Math.abs(shake) * 1.2);
      jamHalo.scale.setScalar(1.08 + Math.abs(shake) * .28);
      reportAt({ visible: true, progress, kicker: "Progressive bind", caption: "Damaged thread crests wedge; more torque mostly raises contact force." }, now);
    } else {
      const t = phase(progress, .83, 1);
      shade.rotation.z = -Math.PI * 7 + Math.sin(t * Math.PI) * .42;
      reportAt({ visible: true, progress, kicker: "Small reverse remains possible", caption: "Backing up unloads one crest, but the collar returns to the same damaged path." }, now);
    }
  }

  function updateTool(progress: number, now: number) {
    const jamTilt = dimensions.misalignment * Math.PI / 180;
    if (progress < .14) {
      const t = phase(progress, 0, .14);
      guard.position.x = -145 * (1 - t);
      reportAt({ visible: true, progress, kicker: "1 · Protect the finish", caption: "A loose split PET shield enters without tape or leverage on the limewash." }, now);
    } else if (progress < .37) {
      const t = phase(progress, .14, .37);
      upperTool.position.set(0, 145 * (1 - t), 48 * (1 - t));
      lowerTool.position.set(0, -145 * (1 - t), 48 * (1 - t));
      reportAt({ visible: true, progress, kicker: "2 · Open components", caption: "The split shoes approach laterally. Nothing closed passes over the globe." }, now);
    } else if (progress < .53) {
      const t = phase(progress, .37, .53);
      removableBand.scale.setScalar(Math.max(.02, t));
      bolts.scale.setScalar(Math.max(.02, t));
      const squeeze = (1 - t) * 3;
      upperTool.position.y = squeeze;
      lowerTool.position.y = -squeeze;
      reportAt({ visible: true, progress, kicker: "3 · Close the removable band", caption: "The narrow band compresses rubber-lined shoes only on the metal collar." }, now);
    } else if (progress < .9) {
      const t = phase(progress, .53, .9);
      torqueArrow.visible = true;
      biasArrow.visible = true;
      torqueArrow.scale.setScalar(.9 + .1 * Math.sin(now * .011));
      shade.rotation.z = -Math.PI * 3.2 * t;
      shade.rotation.y = jamTilt * (1 - t);
      shade.position.z = dimensions.wallClearance + 22 * t;
      contactPoints.visible = t < .7;
      jamHalo.visible = t < .7;
      reportAt({ visible: true, progress, kicker: "4 · Operate in front of the globe", caption: "Both hands turn the forward ring while a small axial correction unloads the crossed thread." }, now);
    } else {
      const t = phase(progress, .9, 1);
      shade.position.z = dimensions.wallClearance + 22 + 38 * t;
      torqueArrow.visible = false;
      biasArrow.visible = false;
      contactPoints.visible = false;
      jamHalo.visible = false;
      reportAt({ visible: true, progress, kicker: "Released", caption: "The rods provided wall clearance; the tool never applied torque through the glass." }, now, true);
    }
  }

  function startSequence(kind: "failure" | "tool") {
    window.clearTimeout(hideTimer);
    setMode(kind === "failure" ? "aligned" : "tool");
    if (kind === "failure") {
      currentMode = "jammed";
      globe.material.opacity = .22;
      neck.material.opacity = .24;
    } else {
      upperTool.position.set(0, 145, 48);
      lowerTool.position.set(0, -145, 48);
      removableBand.scale.setScalar(.02);
      bolts.scale.setScalar(.02);
      torqueArrow.visible = false;
      biasArrow.visible = false;
      guard.position.x = -145;
      cameraPreset("tool");
    }
    if (reducedMotion) {
      if (kind === "failure") setMode("jammed");
      else setMode("tool");
      report({ visible: true, progress: 1, kicker: "Reduced motion", caption: kind === "failure" ? "The model is shown at the final jammed state." : "The model is shown with the complete forward tool fitted." });
      return;
    }
    animation = { kind, start: performance.now(), duration: kind === "failure" ? 7200 : 9300 };
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(tick);
  }

  function cancelAnimation() {
    animation = null;
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    report({ visible: false, progress: 0, kicker: "", caption: "" });
    renderOnce();
  }

  const resetView = () => cameraPreset(currentMode);
  controls.addEventListener("change", renderOnce);

  const resizeObserver = new ResizeObserver(() => {
    const width = Math.max(1, host.clientWidth);
    const height = Math.max(1, host.clientHeight);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.fov = mobile ? 43 : 36;
    camera.updateProjectionMatrix();
    renderOnce();
  });
  resizeObserver.observe(host);

  const onVisibility = () => {
    if (document.hidden && raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    } else if (!document.hidden && animation && !raf) {
      animation.start = performance.now();
      raf = requestAnimationFrame(tick);
    }
  };
  document.addEventListener("visibilitychange", onVisibility);
  cameraPreset("jammed");
  renderer.shadowMap.needsUpdate = !mobile;

  function disposeObject(object: Object3D) {
    const mesh = object as Mesh;
    if (mesh.geometry) mesh.geometry.dispose();
  }

  function dispose() {
    cancelAnimation();
    window.clearTimeout(hideTimer);
    resizeObserver.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    controls.removeEventListener("change", renderOnce);
    controls.dispose();
    root.traverse(disposeObject);
    const uniqueMaterials = new Set<Material>(Object.values(materials));
    uniqueMaterials.forEach((material) => material.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  }

  return { setMode, startSequence, cancelAnimation, resetView, dispose };
}
