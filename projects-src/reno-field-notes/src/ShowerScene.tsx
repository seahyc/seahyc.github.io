import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type ShowerMode = "correct" | "outlet-tilt" | "unequal-depth" | "tile-plane" | "cutaway";
export type ShowerConfig = { outletTilt: number; depthDelta: number; tileOffset: number };
export type ShowerSequence = { kind: "none" | "failure" | "checks"; id: number };
export type ShowerHud = { visible: boolean; progress: number; kicker: string; caption: string };

type Props = {
  mode: ShowerMode;
  config: ShowerConfig;
  sequence: ShowerSequence;
  onSequenceUpdate: (update: ShowerHud) => void;
  registerReset: (reset: () => void) => void;
};

type SceneState = {
  pitch: number;
  yaw: number;
  leftProjection: number;
  rightProjection: number;
  wallOpacity: number;
  bodyOpacity: number;
  explode: number;
  jigOpacity: number;
  tileBump: number;
  pipeGlow: number;
};

const BASE_STATE: SceneState = {
  pitch: 0,
  yaw: 0,
  leftProjection: 52,
  rightProjection: 52,
  wallOpacity: 1,
  bodyOpacity: 1,
  explode: 0,
  jigOpacity: 0,
  tileBump: 0,
  pipeGlow: 0,
};

const clamp01 = (value: number) => Math.max(0, Math.min(1, value));
const smooth = (value: number) => {
  const t = clamp01(value);
  return t * t * (3 - 2 * t);
};
const mix = (a: number, b: number, t: number) => a + (b - a) * smooth(t);
const phase = (p: number, start: number, end: number) => smooth((p - start) / (end - start));
const interpolate = (from: SceneState, to: SceneState, t: number): SceneState => {
  const result = {} as SceneState;
  (Object.keys(from) as Array<keyof SceneState>).forEach((key) => { result[key] = mix(from[key], to[key], t); });
  return result;
};

export function ShowerScene({ mode, config, sequence, onSequenceUpdate, registerReset }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<ReturnType<typeof createEngine> | null>(null);
  const reportRef = useRef(onSequenceUpdate);
  reportRef.current = onSequenceUpdate;

  useEffect(() => {
    if (!hostRef.current) return;
    const engine = createEngine(hostRef.current, config, (value) => reportRef.current(value));
    engineRef.current = engine;
    engine.setMode(mode, true);
    registerReset(engine.resetView);
    return () => { engine.dispose(); engineRef.current = null; };
  }, [registerReset]);

  useEffect(() => { engineRef.current?.setConfig(config); }, [config.outletTilt, config.depthDelta, config.tileOffset]);
  useEffect(() => { engineRef.current?.setMode(mode); }, [mode]);
  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    if (sequence.kind === "none") engine.cancelAnimation();
    else engine.startSequence(sequence.kind);
  }, [sequence.id, sequence.kind]);

  return <div ref={hostRef} className="three-host" />;
}

function createEngine(host: HTMLDivElement, initialConfig: ShowerConfig, report: (update: ShowerHud) => void) {
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let config = initialConfig;
  let currentMode: ShowerMode = "correct";
  let state = { ...BASE_STATE };
  let frame = 0;
  let disposed = false;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x09121a);
  scene.fog = new THREE.FogExp2(0x09121a, 0.00125);

  const camera = new THREE.PerspectiveCamera(mobile ? 43 : 36, 1, 1, 2400);
  const defaultCamera = mobile ? new THREE.Vector3(430, 230, 720) : new THREE.Vector3(520, 300, 690);
  camera.position.copy(defaultCamera);

  const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.06;
  renderer.shadowMap.enabled = !mobile;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  host.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.enablePan = false;
  controls.minDistance = 320;
  controls.maxDistance = 1250;
  controls.target.set(0, 45, 50);

  scene.add(new THREE.HemisphereLight(0xcfe7ff, 0x14202a, 2.5));
  const key = new THREE.DirectionalLight(0xffffff, 5.2);
  key.position.set(360, 500, 620);
  key.castShadow = !mobile;
  key.shadow.mapSize.set(1024, 1024);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x63b9ff, 2.7);
  fill.position.set(-420, 120, 280);
  scene.add(fill);
  const warm = new THREE.PointLight(0xffc978, 1100, 900, 2);
  warm.position.set(-220, -80, 380);
  scene.add(warm);

  const mats = {
    wall: new THREE.MeshStandardMaterial({ color: 0xb8aea0, roughness: .88, transparent: true }),
    grout: new THREE.MeshStandardMaterial({ color: 0x746d65, roughness: .96, transparent: true }),
    cavity: new THREE.MeshStandardMaterial({ color: 0x29313a, roughness: .92 }),
    hot: new THREE.MeshStandardMaterial({ color: 0xf2665d, roughness: .38, metalness: .15, emissive: 0x3a0804 }),
    cold: new THREE.MeshStandardMaterial({ color: 0x56aef2, roughness: .38, metalness: .15, emissive: 0x041b32 }),
    brass: new THREE.MeshStandardMaterial({ color: 0xd6a246, roughness: .31, metalness: .82 }),
    chrome: new THREE.MeshStandardMaterial({ color: 0xcbd5df, roughness: .14, metalness: .92, transparent: true }),
    chromeDark: new THREE.MeshStandardMaterial({ color: 0x6e7a87, roughness: .22, metalness: .9, transparent: true }),
    glass: new THREE.MeshPhongMaterial({ color: 0xeaf5ff, transparent: true, opacity: .25, shininess: 90, depthWrite: false }),
    jig: new THREE.MeshStandardMaterial({ color: 0xf2c35d, roughness: .42, transparent: true, opacity: 0, emissive: 0x49300a }),
    gap: new THREE.MeshStandardMaterial({ color: 0xff6c65, transparent: true, opacity: .78, emissive: 0x5c0d08, depthWrite: false }),
    bump: new THREE.MeshStandardMaterial({ color: 0xf09a57, roughness: .73, transparent: true, opacity: .84 }),
  };

  const wallGroup = new THREE.Group();
  const wall = new THREE.Mesh(new THREE.BoxGeometry(620, 420, 54), mats.wall);
  wall.position.z = -27;
  wall.receiveShadow = true;
  wallGroup.add(wall);
  for (const x of [-206, 0, 206]) {
    const line = new THREE.Mesh(new THREE.BoxGeometry(3.4, 420, 2), mats.grout);
    line.position.set(x, 0, 1);
    wallGroup.add(line);
  }
  for (const y of [-140, 0, 140]) {
    const line = new THREE.Mesh(new THREE.BoxGeometry(620, 3.4, 2), mats.grout);
    line.position.set(0, y, 1);
    wallGroup.add(line);
  }
  scene.add(wallGroup);

  const cavity = new THREE.Mesh(new THREE.BoxGeometry(460, 280, 45), mats.cavity);
  cavity.position.z = -40;
  scene.add(cavity);

  const makePipe = (x: number, material: THREE.MeshStandardMaterial) => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(x, -205, -44),
      new THREE.Vector3(x, -82, -44),
      new THREE.Vector3(x, -18, -42),
      new THREE.Vector3(x, 0, -31),
      new THREE.Vector3(x, 0, -17),
    ]);
    const pipe = new THREE.Mesh(new THREE.TubeGeometry(curve, 36, 8, mobile ? 10 : 16, false), material);
    pipe.castShadow = !mobile;
    scene.add(pipe);
    return pipe;
  };
  const hotPipe = makePipe(-75, mats.hot);
  const coldPipe = makePipe(75, mats.cold);

  type Connector = { group: THREE.Group; nipple: THREE.Mesh; arrow: THREE.ArrowHelper; index: number };
  const connectors: Connector[] = [];
  [-75, 75].forEach((x, index) => {
    const group = new THREE.Group();
    group.position.set(x, 0, 0);
    const socket = new THREE.Mesh(new THREE.CylinderGeometry(20, 20, 34, 32), mats.brass);
    socket.rotation.x = Math.PI / 2;
    socket.position.z = -15;
    group.add(socket);
    const hex = new THREE.Mesh(new THREE.CylinderGeometry(20, 20, 14, 6), mats.chromeDark);
    hex.rotation.x = Math.PI / 2;
    hex.position.z = 12;
    group.add(hex);
    const nipple = new THREE.Mesh(new THREE.CylinderGeometry(13.5, 13.5, 52, 32), mats.chrome);
    nipple.rotation.x = Math.PI / 2;
    nipple.position.z = 26;
    group.add(nipple);
    const ring = new THREE.Mesh(new THREE.TorusGeometry(14.5, 1.5, 8, 28), mats.brass);
    ring.position.z = 48;
    group.add(ring);
    const arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 2), 105, index === 0 ? 0xff8b78 : 0x67c0ff, 16, 8);
    group.add(arrow);
    scene.add(group);
    connectors.push({ group, nipple, arrow, index });
  });

  const bodyPivot = new THREE.Group();
  scene.add(bodyPivot);
  const bodyMesh = new THREE.Mesh(new RoundedBoxGeometry(362, 64, 133, 7, 5), mats.chrome);
  bodyMesh.position.z = 66.5;
  bodyMesh.castShadow = !mobile;
  bodyPivot.add(bodyMesh);
  const glassTop = new THREE.Mesh(new RoundedBoxGeometry(330, 4, 102, 5, 3), mats.glass);
  glassTop.position.set(-6, 33, 69);
  bodyPivot.add(glassTop);
  const frontStrip = new THREE.Mesh(new RoundedBoxGeometry(300, 31, 5, 4, 3), mats.chromeDark);
  frontStrip.position.set(-15, -4, 133.5);
  bodyPivot.add(frontStrip);
  for (const x of [-132, -78, -24]) {
    const button = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 6, 28), mats.chrome);
    button.rotation.x = Math.PI / 2;
    button.position.set(x, -4, 138);
    bodyPivot.add(button);
  }
  const knob = new THREE.Mesh(new THREE.CylinderGeometry(25, 25, 36, 36), mats.chrome);
  knob.rotation.z = Math.PI / 2;
  knob.position.set(-188, 0, 58);
  bodyPivot.add(knob);
  const riser = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 265, 28), mats.chrome);
  riser.position.set(128, 164, 78);
  riser.castShadow = !mobile;
  bodyPivot.add(riser);
  const elbow = new THREE.Mesh(new THREE.TorusGeometry(52, 11, 16, 40, Math.PI / 2), mats.chrome);
  elbow.rotation.y = Math.PI / 2;
  elbow.rotation.z = Math.PI;
  elbow.position.set(76, 296, 78);
  bodyPivot.add(elbow);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(11, 11, 128, 28), mats.chrome);
  arm.rotation.z = Math.PI / 2;
  arm.position.set(12, 348, 78);
  bodyPivot.add(arm);

  const jig = new THREE.Group();
  const jigBar = new THREE.Mesh(new RoundedBoxGeometry(202, 24, 13, 3, 3), mats.jig);
  jigBar.position.z = 70;
  jig.add(jigBar);
  [-75, 75].forEach((x) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(15, 3.2, 8, 28), mats.jig);
    ring.position.set(x, 0, 77);
    jig.add(ring);
  });
  const bubble = new THREE.Mesh(new RoundedBoxGeometry(46, 9, 4, 2, 2), mats.jig);
  bubble.position.set(0, 0, 78);
  jig.add(bubble);
  scene.add(jig);

  const tileBump = new THREE.Mesh(new THREE.BoxGeometry(150, 88, 1), mats.bump);
  tileBump.position.set(205, 0, .5);
  tileBump.visible = false;
  scene.add(tileBump);

  const pitchGap = new THREE.Mesh(new THREE.BoxGeometry(354, 5, 1), mats.gap);
  pitchGap.visible = false;
  scene.add(pitchGap);
  const yawGap = new THREE.Mesh(new THREE.BoxGeometry(5, 58, 1), mats.gap);
  yawGap.visible = false;
  scene.add(yawGap);

  const axesLabel = new THREE.Group();
  scene.add(axesLabel);

  function stateFor(mode: ShowerMode): SceneState {
    if (mode === "outlet-tilt") return { ...BASE_STATE, pitch: config.outletTilt };
    if (mode === "unequal-depth") {
      const yaw = THREE.MathUtils.radToDeg(Math.atan2(config.depthDelta, 150));
      return { ...BASE_STATE, yaw, leftProjection: 52 - config.depthDelta / 2, rightProjection: 52 + config.depthDelta / 2 };
    }
    if (mode === "tile-plane") {
      const yaw = -THREE.MathUtils.radToDeg(Math.atan2(config.tileOffset, 310));
      return { ...BASE_STATE, yaw, tileBump: config.tileOffset };
    }
    if (mode === "cutaway") return { ...BASE_STATE, wallOpacity: .16, bodyOpacity: .72, explode: 92, jigOpacity: .92, pipeGlow: 1 };
    return { ...BASE_STATE, jigOpacity: .28 };
  }

  function setMaterialOpacity(material: THREE.Material & { opacity?: number }, opacity: number) {
    if ("opacity" in material) material.opacity = opacity;
    material.transparent = opacity < .999;
    material.depthWrite = opacity > .65;
  }

  function apply(next: SceneState) {
    state = next;
    const pitch = THREE.MathUtils.degToRad(next.pitch);
    const yaw = THREE.MathUtils.degToRad(next.yaw);
    connectors.forEach((connector) => {
      connector.group.rotation.x = pitch;
      const projection = connector.index === 0 ? next.leftProjection : next.rightProjection;
      connector.nipple.scale.y = projection / 52;
      connector.nipple.position.z = projection / 2;
      connector.arrow.visible = next.wallOpacity < .7 || Math.abs(next.pitch) > .15 || Math.abs(next.yaw) > .15;
    });

    bodyPivot.rotation.set(pitch, yaw, 0, "XYZ");
    const pitchLift = Math.abs(32 * Math.sin(pitch));
    const yawLift = Math.abs(181 * Math.sin(yaw));
    bodyPivot.position.z = 1.4 + Math.max(pitchLift, yawLift) + next.explode;

    setMaterialOpacity(mats.wall, next.wallOpacity);
    setMaterialOpacity(mats.grout, next.wallOpacity);
    setMaterialOpacity(mats.chrome, next.bodyOpacity);
    setMaterialOpacity(mats.chromeDark, next.bodyOpacity);
    mats.jig.opacity = next.jigOpacity;
    jig.visible = next.jigOpacity > .01;

    tileBump.visible = next.tileBump > .05;
    tileBump.scale.z = Math.max(.01, next.tileBump);
    tileBump.position.z = next.tileBump / 2 + .8;

    const pitchSize = Math.abs(64 * Math.sin(pitch));
    pitchGap.visible = pitchSize > .35 && next.explode < 4;
    pitchGap.scale.z = Math.max(.01, pitchSize);
    pitchGap.position.set(0, pitch >= 0 ? 31 : -31, pitchSize / 2 + 1);

    const yawSize = Math.abs(362 * Math.sin(yaw));
    yawGap.visible = yawSize > .35 && next.explode < 4;
    yawGap.scale.z = Math.max(.01, yawSize);
    yawGap.position.set(yaw >= 0 ? -179 : 179, 0, yawSize / 2 + 1);

    mats.hot.emissiveIntensity = .15 + next.pipeGlow * 1.1;
    mats.cold.emissiveIntensity = .15 + next.pipeGlow * 1.1;
    hotPipe.scale.setScalar(1 + next.pipeGlow * .08);
    coldPipe.scale.setScalar(1 + next.pipeGlow * .08);
    render();
  }

  function render() { if (!disposed) renderer.render(scene, camera); }

  function cancelAnimation() {
    cancelAnimationFrame(frame);
    frame = 0;
    report({ visible: false, progress: 0, kicker: "", caption: "" });
  }

  function tweenTo(target: SceneState, duration = 620) {
    cancelAnimationFrame(frame);
    const from = { ...state };
    const start = performance.now();
    if (reducedMotion) { apply(target); return; }
    const tick = (now: number) => {
      const p = clamp01((now - start) / duration);
      apply(interpolate(from, target, p));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
  }

  function setMode(mode: ShowerMode, immediate = false) {
    currentMode = mode;
    cancelAnimation();
    const target = stateFor(mode);
    if (immediate || reducedMotion) apply(target); else tweenTo(target);
  }

  function setConfig(next: ShowerConfig) {
    config = next;
    tweenTo(stateFor(currentMode), 280);
  }

  function startSequence(kind: "failure" | "checks") {
    cancelAnimation();
    const start = performance.now();
    const duration = reducedMotion ? 500 : kind === "failure" ? 6500 : 7200;
    const tick = (now: number) => {
      const p = clamp01((now - start) / duration);
      if (kind === "failure") {
        const tilted = stateFor("outlet-tilt");
        let next = { ...BASE_STATE, jigOpacity: .3 };
        if (p > .16) next.wallOpacity = mix(1, .18, phase(p, .16, .33));
        if (p > .31) next = { ...next, ...interpolate(next, tilted, phase(p, .31, .68)), wallOpacity: .18, pipeGlow: phase(p, .31, .5) };
        if (p > .7) next = { ...tilted, wallOpacity: mix(.18, 1, phase(p, .7, .88)), pipeGlow: mix(1, 0, phase(p, .7, .88)) };
        apply(next);
        const caption = p < .18 ? "Start with two parallel, perpendicular G½ outlets." : p < .35 ? "Reveal the final concealed elbows—not the whole pipe run." : p < .7 ? "Tilt both outlet axes: the rigid mixer must follow their plane." : "The nearest edge touches first; the opposite edge becomes the visible gap.";
        report({ visible: true, progress: p, kicker: "How the gap opens", caption });
      } else {
        let next = { ...BASE_STATE };
        if (p < .2) next = { ...BASE_STATE, explode: mix(0, 100, phase(p, 0, .2)), wallOpacity: mix(1, .2, phase(p, 0, .2)), bodyOpacity: .7 };
        else if (p < .46) next = { ...BASE_STATE, explode: 100, wallOpacity: .15, bodyOpacity: .65, jigOpacity: phase(p, .2, .34), pipeGlow: phase(p, .3, .46) };
        else if (p < .72) {
          const depth = stateFor("unequal-depth");
          next = { ...interpolate({ ...BASE_STATE, explode: 100, wallOpacity: .15, bodyOpacity: .65, jigOpacity: 1, pipeGlow: 1 }, { ...depth, explode: 100, wallOpacity: .15, bodyOpacity: .65, jigOpacity: 1, pipeGlow: 1 }, phase(p, .46, .65)) };
        } else next = interpolate({ ...BASE_STATE, explode: 100, wallOpacity: .15, bodyOpacity: .65, jigOpacity: 1, pipeGlow: 1 }, stateFor("cutaway"), phase(p, .72, 1));
        apply(next);
        const caption = p < .2 ? "Remove the mixer body before judging the concealed pipe." : p < .46 ? "Use the supplied jig: centres 150±12mm; both axes must agree." : p < .72 ? "Measure each connector projection: Hansgrohe specifies 52±1mm." : "Only then decide whether the wall outlet itself is crooked or the front-side setup is adjustable.";
        report({ visible: true, progress: p, kicker: "Non-destructive check order", caption });
      }
      if (p < 1) frame = requestAnimationFrame(tick);
      else {
        currentMode = kind === "failure" ? "outlet-tilt" : "cutaway";
        report({ visible: false, progress: 1, kicker: "", caption: "" });
      }
    };
    frame = requestAnimationFrame(tick);
  }

  function resetView() {
    camera.position.copy(defaultCamera);
    controls.target.set(0, 45, 50);
    controls.update();
    render();
  }

  function resize() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    render();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  controls.addEventListener("change", render);
  resize();
  apply(BASE_STATE);

  function dispose() {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    controls.dispose();
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) object.geometry.dispose();
    });
    Object.values(mats).forEach((material) => material.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  }

  return { setMode, setConfig, startSequence, cancelAnimation, resetView, dispose };
}
