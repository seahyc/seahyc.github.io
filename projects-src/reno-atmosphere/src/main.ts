import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import "./style.css";

type ScenarioName = "live" | "ne" | "sw" | "storm" | "calm";
type ForecastPeriod = { time: string; forecast: string };
type WeatherModel = {
  windFrom: number;
  speed: number;
  rain: number;
  pm25: number | null;
  psi: number | null;
  temperature: string | null;
  humidity: string | null;
  forecast: string;
  title: string;
  updated: string | null;
  twoHourLabel?: string;
  centralPeriods?: ForecastPeriod[];
};

type TowerObstacle = { x: number; z: number; radius: number; height: number };
type WindParticle = { position: THREE.Vector3; phase: number; age: number; maxAge: number };
type RainParticle = { position: THREE.Vector3; speed: number };

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;
const compact = window.matchMedia("(max-width: 700px)").matches;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const API_ROOT = "https://api-open.data.gov.sg/v2/real-time/api/";
const API = {
  psi: `${API_ROOT}psi`,
  rain: `${API_ROOT}rainfall`,
  windDirection: `${API_ROOT}wind-direction`,
  windSpeed: `${API_ROOT}wind-speed`,
  twoHour: `${API_ROOT}two-hr-forecast`,
  day: `${API_ROOT}twenty-four-hr-forecast`,
};
const STATIONS = { weather: "S109", rain: "S217" };
const OPENINGS = [
  { bearing: 55, short: "NE", name: "bedroom / study window bank" },
  { bearing: 145, short: "SE", name: "bedroom side" },
  { bearing: 325, short: "NW", name: "living-room glazing" },
];
const SCENARIOS: Record<Exclude<ScenarioName, "live">, Partial<WeatherModel>> = {
  ne: { windFrom: 45, speed: 8, rain: 0, forecast: "Typical northeast-monsoon breeze", title: "Northeast breeze" },
  sw: { windFrom: 165, speed: 7, rain: 0, forecast: "Typical south–southeast monsoon flow", title: "Southwest-monsoon breeze" },
  storm: { windFrom: 195, speed: 18, rain: 8, forecast: "Wind-driven thundery showers", title: "Passing rain" },
  calm: { windFrom: 90, speed: 1, rain: 0, forecast: "Light and variable", title: "Still inter-monsoon air" },
};
const fallback: WeatherModel = {
  windFrom: 45,
  speed: 5,
  rain: 0,
  pm25: null,
  psi: null,
  temperature: null,
  humidity: null,
  forecast: "Awaiting Bishan forecast",
  title: "Bishan outdoor weather",
  updated: null,
};

let liveData = { ...fallback };
let model = { ...fallback };
let selected: ScenarioName = "live";
let forecastRain = false;
let windVisible = true;

const last = <T>(items: T[] | undefined): T | null => Array.isArray(items) && items.length ? items[items.length - 1] : null;
const fmt = (value: number | null, digits = 0) => value == null ? "—" : Number(value).toFixed(digits);
const rainyText = (text = "") => /rain|shower|thunder/i.test(text);
const angleDifference = (a: number, b: number) => Math.abs((((a - b) % 360) + 540) % 360 - 180);
const alignment = (windFrom: number, bearing: number) => Math.max(0, Math.cos(angleDifference(windFrom, bearing) * Math.PI / 180));
const compass = (degrees: number) => {
  const points = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
  return points[Math.round((((degrees % 360) + 360) % 360) / 22.5) % 16];
};
const psiBand = (value: number | null) => value == null ? "Awaiting regional reading" : value <= 50 ? "Good" : value <= 100 ? "Moderate" : value <= 200 ? "Unhealthy" : value <= 300 ? "Very unhealthy" : "Hazardous";
const bearingVector = (bearing: number) => new THREE.Vector3(Math.sin(THREE.MathUtils.degToRad(bearing)), 0, -Math.cos(THREE.MathUtils.degToRad(bearing)));

function stationValue(payload: any, stationId: string): number | null {
  const reading = last<any>(payload?.data?.readings);
  return reading?.data?.find((item: any) => item.stationId === stationId)?.value ?? null;
}

const pause = (milliseconds: number) => new Promise((resolve) => window.setTimeout(resolve, milliseconds));
async function getJSON(url: string, attempt = 0): Promise<any> {
  const response = await fetch(url, { mode: "cors", cache: "no-store" });
  if (response.status === 429 && attempt < 2) {
    const retryAfter = Number(response.headers.get("retry-after"));
    await pause(Number.isFinite(retryAfter) ? retryAfter * 1000 : 700 * (attempt + 1));
    return getJSON(url, attempt + 1);
  }
  if (!response.ok) throw new Error(`${response.status} from ${url}`);
  return response.json();
}

const liveState = $("live-state");
function setLiveState(label: string, stale: boolean) {
  liveState.querySelector("span")!.textContent = label;
  liveState.classList.toggle("stale", stale);
}

function renderHUD() {
  const inlet = OPENINGS.reduce((best, opening) => alignment(model.windFrom, opening.bearing) > alignment(model.windFrom, best.bearing) ? opening : best);
  const outlet = OPENINGS.reduce((best, opening) => angleDifference((model.windFrom + 180) % 360, opening.bearing) < angleDifference((model.windFrom + 180) % 360, best.bearing) ? opening : best);
  const windName = `${compass(model.windFrom)} ${fmt(model.windFrom)}°`;
  const rainActive = model.rain > 0 || (selected === "live" && forecastRain);

  $("wind-value").textContent = windName;
  $("wind-speed").textContent = `${fmt(model.speed, 1)} kn · ${fmt(model.speed * 1.852, 1)} km/h`;
  $("rain-value").textContent = `${fmt(model.rain, 1)} mm`;
  $("air-value").textContent = model.psi == null ? "—" : `PSI ${fmt(model.psi)}`;
  $("air-band").textContent = `${psiBand(model.psi)} · central region`;
  $("temp-value").textContent = model.temperature ?? "—";
  $("humidity-value").textContent = model.humidity ? `${model.humidity} humidity` : "24h range";
  $("home-label-detail").textContent = `${inlet.short} side windward now`;
  $("weather-story").textContent = `${compass(model.windFrom)} wind reaches the ${inlet.name} first. The globe shows the likely path toward the ${outlet.short} side.`;

  let call = "A good moment to keep the windows open";
  let reason = `The nearby rain gauge is dry and central PSI is not unhealthy. The ${inlet.short} side is windward, with likely relief toward the ${outlet.short} opening.`;
  let kicker = `${inlet.short} facade is windward`;
  if (model.psi != null && model.psi > 100) {
    call = "Close up while outdoor pollution is elevated";
    reason = "Central-region 24-hour PSI is above 100. Close the occupied rooms first, then use air-conditioning or HEPA there.";
    kicker = "Air-quality exception";
  } else if (model.rain > 0) {
    call = `Close the ${inlet.short} side first`;
    reason = `S217 is recording rain and the wind reaches the ${inlet.name} most directly. A sheltered leeward opening may stay cracked if rain is not entering.`;
    kicker = "Wind-driven rain path";
  } else if (rainActive) {
    call = `Keep open, but watch the ${inlet.short} windows`;
    reason = `${model.forecast} is forecast while the nearby gauge remains dry. The globe highlights the facade most likely to receive it first.`;
    kicker = "Rain possible nearby";
  } else if (model.speed < 2) {
    call = "Open up and let the ceiling fans help";
    reason = "Outdoor conditions do not call for closure, but the wind is light. Cross-openings and fans matter more than facade direction right now.";
    kicker = "Very light outdoor wind";
  }
  $("insight-kicker").textContent = kicker;
  $("window-call").textContent = call;
  $("window-reason").textContent = reason;
  const forecast = $("forecast");
  forecast.replaceChildren();
  const label = document.createElement("span");
  label.textContent = liveData.twoHourLabel || "Next 2 hours";
  const value = document.createElement("b");
  value.textContent = model.forecast;
  forecast.append(label, value);
}

async function loadLive() {
  setLiveState("Refreshing", true);
  const keys = Object.keys(API) as (keyof typeof API)[];
  const settled: PromiseSettledResult<any>[] = [];
  for (const key of keys) {
    try {
      settled.push({ status: "fulfilled", value: await getJSON(API[key]) });
    } catch (reason) {
      settled.push({ status: "rejected", reason });
    }
    await pause(120);
  }
  const data: Record<string, any> = {};
  settled.forEach((result, index) => { if (result.status === "fulfilled") data[keys[index]] = result.value; });
  const psiItem = last<any>(data.psi?.data?.items);
  const twoHour = last<any>(data.twoHour?.data?.items);
  const day = last<any>(data.day?.data?.records);
  const bishanForecast = twoHour?.forecasts?.find((item: any) => item.area === "Bishan")?.forecast ?? null;
  const centralPeriods = day?.periods?.map((period: any) => ({ time: period.timePeriod?.text, forecast: period.regions?.central?.text })).filter((item: ForecastPeriod) => item.time && item.forecast) ?? [];
  const windTimestamp = last<any>(data.windDirection?.data?.readings)?.timestamp;
  liveData = {
    ...fallback,
    windFrom: stationValue(data.windDirection, STATIONS.weather) ?? liveData.windFrom,
    speed: stationValue(data.windSpeed, STATIONS.weather) ?? liveData.speed,
    rain: stationValue(data.rain, STATIONS.rain) ?? liveData.rain,
    temperature: day?.general?.temperature ? `${day.general.temperature.low}–${day.general.temperature.high}°C` : liveData.temperature,
    humidity: day?.general?.relativeHumidity ? `${day.general.relativeHumidity.low}–${day.general.relativeHumidity.high}%` : liveData.humidity,
    pm25: psiItem?.readings?.pm25_twenty_four_hourly?.central ?? liveData.pm25,
    psi: psiItem?.readings?.psi_twenty_four_hourly?.central ?? liveData.psi,
    forecast: bishanForecast ?? day?.general?.forecast?.text ?? liveData.forecast,
    title: "Live Bishan weather",
    updated: windTimestamp || psiItem?.updatedTimestamp || twoHour?.update_timestamp || null,
    twoHourLabel: twoHour?.valid_period?.text ?? "Next 2 hours",
    centralPeriods,
  };
  forecastRain = rainyText(liveData.forecast);
  const usable = settled.filter((result) => result.status === "fulfilled").length;
  const updateTime = liveData.updated ? new Intl.DateTimeFormat("en-SG", { timeZone: "Asia/Singapore", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(liveData.updated)) : "now";
  setLiveState(usable === keys.length ? `Live ${updateTime}` : `Partial · ${usable}/${keys.length}`, usable < keys.length);
  if (selected === "live") setScenario("live");
}

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
let windMesh: THREE.InstancedMesh;
let rainMesh: THREE.InstancedMesh;
let globeMaterial: THREE.MeshPhysicalMaterial;
let sunLight: THREE.DirectionalLight;
let ambientLight: THREE.HemisphereLight;
let windRibbons: THREE.Group;
const towerObstacles: TowerObstacle[] = [];
const windParticles: WindParticle[] = [];
const rainParticles: RainParticle[] = [];
const clouds: THREE.Group[] = [];
const facadePanes: { bearing: number; mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> }[] = [];
const worldAnchors = {
  home: new THREE.Vector3(0, 8.9, .2),
  depot: new THREE.Vector3(6.9, 1.15, -5.4),
  station: new THREE.Vector3(7.4, 1.25, 3.5),
};

const homeLabel = $("home-label");
const depotLabel = $("depot-label");
const stationLabel = $("station-label");

function material(color: number, roughness = .72, metalness = 0) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

const windowTransforms: THREE.Matrix4[] = [];
function registerWindows(x: number, z: number, width: number, depth: number, height: number, rotation: number, highlighted: boolean) {
  const floors = Math.max(5, Math.floor(height / .48));
  const columns = Math.max(3, Math.floor(width / .38));
  const local = new THREE.Vector3();
  const world = new THREE.Vector3();
  const quaternion = new THREE.Quaternion();
  const scale = new THREE.Vector3(highlighted ? 1.12 : 1, 1, 1);
  for (let floor = 1; floor < floors; floor += 1) {
    const y = .38 + floor * (height - .65) / floors;
    for (let col = 0; col < columns; col += 1) {
      const localX = -width * .39 + (col / Math.max(1, columns - 1)) * width * .78;
      for (const face of [1, -1]) {
        local.set(localX, y, face * (depth / 2 + .016)).applyAxisAngle(new THREE.Vector3(0, 1, 0), rotation);
        world.set(x + local.x, local.y, z + local.z);
        quaternion.setFromEuler(new THREE.Euler(0, rotation + (face < 0 ? Math.PI : 0), 0));
        windowTransforms.push(new THREE.Matrix4().compose(world, quaternion, scale));
      }
    }
  }
}

function addTower(options: { x: number; z: number; width: number; depth: number; height: number; rotation?: number; color: number; highlighted?: boolean }) {
  const { x, z, width, depth, height, color } = options;
  const rotation = options.rotation ?? 0;
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  group.rotation.y = rotation;
  const body = new THREE.Mesh(new RoundedBoxGeometry(width, height, depth, 3, .12), material(color, .76));
  body.position.y = height / 2 + .22;
  body.castShadow = true;
  body.receiveShadow = true;
  group.add(body);

  const roof = new THREE.Mesh(new RoundedBoxGeometry(width * .78, .18, depth * .72, 2, .05), material(options.highlighted ? 0x63bfae : 0xe8d5b9, .68));
  roof.position.y = height + .34;
  roof.castShadow = true;
  group.add(roof);

  const rooftop = new THREE.Mesh(new RoundedBoxGeometry(width * .28, .3, depth * .28, 2, .04), material(0xf4ead9, .8));
  rooftop.position.set(width * .2, height + .55, -depth * .1);
  group.add(rooftop);

  if (options.highlighted) {
    const homeBand = new THREE.Mesh(new THREE.BoxGeometry(width + .08, .34, depth + .08), new THREE.MeshStandardMaterial({ color: 0x59d8c1, emissive: 0x2d8f80, emissiveIntensity: .5, transparent: true, opacity: .92 }));
    homeBand.position.y = height * .76;
    group.add(homeBand);
    const halo = new THREE.Mesh(new THREE.TorusGeometry(Math.max(width, depth) * .62, .035, 6, 48), new THREE.MeshBasicMaterial({ color: 0x63d8c3, transparent: true, opacity: .65 }));
    halo.rotation.x = Math.PI / 2;
    halo.position.y = height * .76;
    group.add(halo);
  }

  scene.add(group);
  towerObstacles.push({ x, z, radius: Math.max(width, depth) * .68, height });
  registerWindows(x, z, width, depth, height, rotation, Boolean(options.highlighted));
  return group;
}

function createFacadePane(bearing: number, width: number, height: number, towerHeight: number) {
  const normal = bearingVector(bearing);
  const pane = new THREE.Mesh(new THREE.PlaneGeometry(width, height), new THREE.MeshBasicMaterial({ color: 0xffcf91, transparent: true, opacity: .12, side: THREE.DoubleSide, depthWrite: false }));
  pane.position.copy(normal.multiplyScalar(.96));
  pane.position.y = towerHeight * .76;
  pane.rotation.y = Math.PI - THREE.MathUtils.degToRad(bearing);
  pane.renderOrder = 4;
  scene.add(pane);
  facadePanes.push({ bearing, mesh: pane });
}

function createTrees() {
  const count = compact ? 24 : 44;
  const trunk = new THREE.InstancedMesh(new THREE.CylinderGeometry(.035, .055, .34, 5), material(0xa57b59, .9), count);
  const crown = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.22, 1), material(0x72b98e, .88), count);
  const dummy = new THREE.Object3D();
  let seed = 741;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  for (let index = 0; index < count; index += 1) {
    let x = 0;
    let z = 0;
    for (let tries = 0; tries < 20; tries += 1) {
      const radius = 3.4 + random() * 6.2;
      const angle = random() * Math.PI * 2;
      x = Math.cos(angle) * radius;
      z = Math.sin(angle) * radius;
      if (!towerObstacles.some((tower) => Math.hypot(x - tower.x, z - tower.z) < tower.radius + .55) && !(x > 3.2 && z < -2.4)) break;
    }
    const treeScale = .72 + random() * .65;
    dummy.position.set(x, .39 * treeScale, z);
    dummy.scale.set(treeScale, treeScale, treeScale);
    dummy.rotation.y = random() * Math.PI;
    dummy.updateMatrix();
    trunk.setMatrixAt(index, dummy.matrix);
    dummy.position.y = .66 * treeScale;
    dummy.updateMatrix();
    crown.setMatrixAt(index, dummy.matrix);
  }
  trunk.castShadow = true;
  crown.castShadow = true;
  scene.add(trunk, crown);
}

function createNeighbourhood() {
  const base = new THREE.Mesh(new THREE.CylinderGeometry(11.15, 11.45, .8, 64), material(0x7ab6a3, .95));
  base.position.y = -.25;
  base.receiveShadow = true;
  scene.add(base);
  const earth = new THREE.Mesh(new THREE.CylinderGeometry(10.75, 10.85, .32, 64), material(0xbad9b1, .88));
  earth.position.y = .23;
  earth.receiveShadow = true;
  scene.add(earth);

  const riverCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-10.1, .38, -5.8),
    new THREE.Vector3(-5.7, .32, -3.1),
    new THREE.Vector3(-1.8, .35, -4.4),
    new THREE.Vector3(3.2, .34, -3.2),
    new THREE.Vector3(9.6, .37, -5.2),
  ]);
  const river = new THREE.Mesh(new THREE.TubeGeometry(riverCurve, 96, .42, 8, false), new THREE.MeshPhysicalMaterial({ color: 0x70c9df, roughness: .25, metalness: 0, transparent: true, opacity: .82 }));
  river.scale.y = .25;
  river.receiveShadow = true;
  scene.add(river);

  const roadMat = material(0xa5aaa5, .94);
  const road = new THREE.Mesh(new THREE.TorusGeometry(5.2, .34, 6, 64, Math.PI * 1.4), roadMat);
  road.rotation.x = -Math.PI / 2;
  road.rotation.z = -.3;
  road.position.y = .42;
  road.receiveShadow = true;
  scene.add(road);

  addTower({ x: 0, z: .2, width: 1.7, depth: 1.35, height: 8.2, rotation: -.17, color: 0xffe8d5, highlighted: true });
  addTower({ x: -3.4, z: 1.8, width: 1.6, depth: 1.25, height: 6.7, rotation: .28, color: 0xe8d8ef });
  addTower({ x: 3.0, z: 2.2, width: 1.55, depth: 1.25, height: 7.25, rotation: -.22, color: 0xd5e8f0 });
  addTower({ x: -2.4, z: -2.4, width: 1.45, depth: 1.15, height: 5.8, rotation: -.36, color: 0xf3dfbd });
  addTower({ x: 2.7, z: -1.9, width: 1.7, depth: 1.2, height: 6.3, rotation: .34, color: 0xd8ebd6 });
  addTower({ x: -5.6, z: -1.1, width: 1.4, depth: 1.1, height: 5.2, rotation: .18, color: 0xf0d5d0 });

  createFacadePane(55, 1.35, .72, 8.2);
  createFacadePane(145, 1.1, .72, 8.2);
  createFacadePane(325, 1.1, .72, 8.2);

  const windowGeometry = new THREE.BoxGeometry(.12, .16, .026);
  const windows = new THREE.InstancedMesh(windowGeometry, new THREE.MeshStandardMaterial({ color: 0x9bd7dc, emissive: 0x356b70, emissiveIntensity: .26, roughness: .42 }), windowTransforms.length);
  windowTransforms.forEach((matrix, index) => windows.setMatrixAt(index, matrix));
  windows.instanceMatrix.needsUpdate = true;
  scene.add(windows);

  const depot = new THREE.Group();
  depot.position.set(6.2, .42, -5.3);
  depot.rotation.y = -.42;
  const depotPad = new THREE.Mesh(new RoundedBoxGeometry(6.2, .18, 2.8, 3, .2), material(0xc9c9bc, .95));
  depot.add(depotPad);
  const trackGeometry = new THREE.BoxGeometry(5.5, .035, .035);
  const railMaterial = material(0x6f7c7a, .5, .45);
  for (let index = 0; index < 5; index += 1) {
    const railA = new THREE.Mesh(trackGeometry, railMaterial);
    const railB = new THREE.Mesh(trackGeometry, railMaterial);
    railA.position.set(0, .14, -1.05 + index * .5);
    railB.position.set(0, .14, -.88 + index * .5);
    depot.add(railA, railB);
  }
  const sleeperCount = 60;
  const sleepers = new THREE.InstancedMesh(new THREE.BoxGeometry(.045, .03, .32), material(0x8e765e, .9), sleeperCount);
  const dummy = new THREE.Object3D();
  for (let index = 0; index < sleeperCount; index += 1) {
    const track = index % 5;
    const step = Math.floor(index / 5);
    dummy.position.set(-2.5 + step * .45, .12, -.965 + track * .5);
    dummy.updateMatrix();
    sleepers.setMatrixAt(index, dummy.matrix);
  }
  depot.add(sleepers);
  const train = new THREE.Mesh(new RoundedBoxGeometry(1.35, .32, .3, 3, .08), material(0xf4b68f, .5));
  train.position.set(.8, .35, -.46);
  depot.add(train);
  scene.add(depot);

  const gauge = new THREE.Group();
  gauge.position.copy(worldAnchors.station);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(.025, .035, .7, 6), material(0x547f84, .6));
  pole.position.y = .35;
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(.15, .08, .14, 10), material(0x6ec8df, .45));
  cup.position.y = .76;
  gauge.add(pole, cup);
  scene.add(gauge);

  createTrees();
}

function createCloud(x: number, y: number, z: number, scale: number) {
  const group = new THREE.Group();
  group.position.set(x, y, z);
  group.scale.setScalar(scale);
  const cloudMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: .95, transparent: true, opacity: .82, depthWrite: false });
  [[0,0,0,.46], [.42,.06,0,.34], [-.38,.02,.03,.31], [.12,.19,-.03,.38]].forEach(([px, py, pz, radius]) => {
    const puff = new THREE.Mesh(new THREE.SphereGeometry(radius, 14, 10), cloudMaterial);
    puff.position.set(px, py, pz);
    group.add(puff);
  });
  clouds.push(group);
  scene.add(group);
  return group;
}

function createAtmosphere() {
  createCloud(-5.8, 8.8, -2.7, 1.25);
  createCloud(5.4, 7.3, -4.2, .9);
  createCloud(6.7, 9.5, 1.6, 1.1);
  createCloud(-6.8, 6.9, 3.2, .82);
  const sun = new THREE.Mesh(new THREE.SphereGeometry(.72, 24, 18), new THREE.MeshBasicMaterial({ color: 0xffdc88, transparent: true, opacity: .9 }));
  sun.position.set(-7.4, 8.9, -6.7);
  scene.add(sun);

  globeMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xeaffff,
    roughness: .04,
    metalness: 0,
    transparent: true,
    opacity: .12,
    transmission: .28,
    thickness: .16,
    ior: 1.28,
    side: THREE.DoubleSide,
    depthWrite: false,
  });
  const globe = new THREE.Mesh(new THREE.SphereGeometry(11.2, compact ? 32 : 48, compact ? 20 : 32), globeMaterial);
  globe.position.y = .3;
  globe.renderOrder = 20;
  scene.add(globe);
  const rim = new THREE.Mesh(new THREE.TorusGeometry(10.78, .095, 8, 80), new THREE.MeshStandardMaterial({ color: 0xeefcf9, metalness: .12, roughness: .35, transparent: true, opacity: .8 }));
  rim.rotation.x = Math.PI / 2;
  rim.position.y = .45;
  scene.add(rim);
}

function resetWindParticle(particle: WindParticle, initial = false) {
  const windTo = bearingVector((model.windFrom + 180) % 360);
  const cross = new THREE.Vector3(-windTo.z, 0, windTo.x);
  const across = (Math.random() - .5) * 19;
  const upstream = initial ? (Math.random() - .5) * 20 : -11.5;
  particle.position.copy(windTo).multiplyScalar(upstream).addScaledVector(cross, across);
  particle.position.y = .65 + Math.random() * 8.8;
  particle.phase = Math.random() * Math.PI * 2;
  particle.age = 0;
  particle.maxAge = 6 + Math.random() * 6;
}

function flowAt(position: THREE.Vector3, elapsed: number) {
  const windTo = bearingVector((model.windFrom + 180) % 360);
  const speed = .7 + Math.min(3.8, Math.max(.12, model.speed / 3.8));
  const velocity = windTo.multiplyScalar(speed);
  for (const tower of towerObstacles) {
    const dx = position.x - tower.x;
    const dz = position.z - tower.z;
    const distance = Math.hypot(dx, dz);
    const range = tower.radius * 3.2;
    if (distance > range || position.y > tower.height + 1.5) continue;
    const strength = Math.pow(1 - Math.max(.08, distance / range), 2);
    const radial = new THREE.Vector3(dx / Math.max(.12, distance), 0, dz / Math.max(.12, distance));
    const side = new THREE.Vector3(-radial.z, 0, radial.x);
    const handedness = Math.sign(side.dot(velocity)) || 1;
    velocity.addScaledVector(radial, strength * speed * 1.3);
    velocity.addScaledVector(side, handedness * strength * speed * .65);
    velocity.y += strength * speed * .34 * Math.max(0, 1 - position.y / (tower.height + 1));
  }
  const wake = Math.sin(elapsed * 1.8 + position.x * .7 + position.z * .55) * .11;
  velocity.x += -velocity.z * wake;
  velocity.z += velocity.x * wake;
  return velocity;
}

function createWind() {
  const count = compact ? 145 : 310;
  const geometry = new THREE.CylinderGeometry(.018, .04, .58, 5);
  geometry.translate(0, .29, 0);
  windMesh = new THREE.InstancedMesh(geometry, new THREE.MeshBasicMaterial({ color: 0x7ee6d5, transparent: true, opacity: .7, depthWrite: false }), count);
  windMesh.frustumCulled = false;
  for (let index = 0; index < count; index += 1) {
    const particle = { position: new THREE.Vector3(), phase: 0, age: 0, maxAge: 8 };
    resetWindParticle(particle, true);
    windParticles.push(particle);
  }
  scene.add(windMesh);
  windRibbons = new THREE.Group();
  scene.add(windRibbons);
  rebuildWindRibbons();
}

function rebuildWindRibbons() {
  windRibbons.children.forEach((child) => {
    const mesh = child as THREE.Mesh;
    mesh.geometry.dispose();
    (mesh.material as THREE.Material).dispose();
  });
  windRibbons.clear();
  const direction = bearingVector((model.windFrom + 180) % 360);
  const cross = new THREE.Vector3(-direction.z, 0, direction.x);
  for (let index = -3; index <= 3; index += 1) {
    const offset = index * .72;
    const points: THREE.Vector3[] = [];
    for (let step = -8; step <= 8; step += 2) {
      const point = direction.clone().multiplyScalar(step * 1.25).addScaledVector(cross, offset + Math.sin(step * .45 + index) * .18);
      point.y = 5.5 + index * .2 + Math.sin(step * .3 + index) * .3;
      points.push(point);
    }
    const curve = new THREE.CatmullRomCurve3(points);
    const ribbon = new THREE.Mesh(new THREE.TubeGeometry(curve, 42, .018 + Math.abs(index) * .002, 5, false), new THREE.MeshBasicMaterial({ color: 0x8ce9da, transparent: true, opacity: .17, depthWrite: false }));
    windRibbons.add(ribbon);
  }
}

function resetRainParticle(particle: RainParticle, initial = false) {
  particle.position.set((Math.random() - .5) * 20, initial ? Math.random() * 11 : 11.5, (Math.random() - .5) * 20);
  particle.speed = 4.5 + Math.random() * 4;
}

function createRain() {
  const count = compact ? 170 : 360;
  const geometry = new THREE.CylinderGeometry(.012, .012, .48, 4);
  geometry.translate(0, -.24, 0);
  rainMesh = new THREE.InstancedMesh(geometry, new THREE.MeshBasicMaterial({ color: 0x84ccea, transparent: true, opacity: .56, depthWrite: false }), count);
  rainMesh.frustumCulled = false;
  rainMesh.visible = false;
  for (let index = 0; index < count; index += 1) {
    const particle = { position: new THREE.Vector3(), speed: 5 };
    resetRainParticle(particle, true);
    rainParticles.push(particle);
  }
  scene.add(rainMesh);
}

function updateWeatherLook() {
  const rainy = model.rain > 0 || (selected === "live" && forecastRain);
  const storm = model.rain > 2;
  const inlet = OPENINGS.reduce((best, opening) => alignment(model.windFrom, opening.bearing) > alignment(model.windFrom, best.bearing) ? opening : best);
  facadePanes.forEach(({ bearing, mesh }) => {
    const active = bearing === inlet.bearing;
    mesh.material.opacity = active ? .72 : .08;
    mesh.material.color.set(active ? (rainy ? 0x7bc9ed : 0xffc47b) : 0xbfece3);
  });
  rainMesh.visible = rainy;
  windMesh.visible = windVisible;
  windRibbons.visible = windVisible;
  scene.background = new THREE.Color(storm ? 0x9ebcc5 : rainy ? 0xc8dce2 : 0xdceff0);
  scene.fog = new THREE.Fog(storm ? 0x9ebcc5 : 0xdceff0, 16, storm ? 35 : 42);
  sunLight.color.set(storm ? 0xc4d4e2 : 0xffefcf);
  sunLight.intensity = storm ? 1.1 : rainy ? 1.7 : 2.7;
  ambientLight.intensity = storm ? 1.25 : 1.8;
  globeMaterial.opacity = storm ? .16 : .11;
  clouds.forEach((cloud, index) => {
    const cloudMaterial = (cloud.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
    cloudMaterial.color.set(storm ? 0x8ea6ad : rainy ? 0xd5e1e3 : 0xffffff);
    cloudMaterial.opacity = storm ? .92 : .82;
    cloud.scale.setScalar((index % 2 ? .92 : 1.1) * (storm ? 1.15 : 1));
  });
  rebuildWindRibbons();
}

function updateWind(delta: number, elapsed: number) {
  const dummy = new THREE.Object3D();
  const yAxis = new THREE.Vector3(0, 1, 0);
  windParticles.forEach((particle, index) => {
    const velocity = flowAt(particle.position, elapsed);
    particle.position.addScaledVector(velocity, delta);
    particle.age += delta;
    const escaped = Math.abs(particle.position.x) > 12 || Math.abs(particle.position.z) > 12 || particle.position.y > 11.2 || particle.position.y < .35;
    if (escaped || particle.age > particle.maxAge) resetWindParticle(particle);
    dummy.position.copy(particle.position);
    dummy.quaternion.setFromUnitVectors(yAxis, velocity.clone().normalize());
    const energy = .75 + Math.min(.8, velocity.length() / 5);
    dummy.scale.set(energy, energy, energy);
    dummy.updateMatrix();
    windMesh.setMatrixAt(index, dummy.matrix);
  });
  windMesh.instanceMatrix.needsUpdate = true;
}

function updateRain(delta: number) {
  if (!rainMesh.visible) return;
  const dummy = new THREE.Object3D();
  const yAxis = new THREE.Vector3(0, 1, 0);
  const windTo = bearingVector((model.windFrom + 180) % 360);
  const rainDirection = new THREE.Vector3(windTo.x * .28, -1, windTo.z * .28).normalize();
  rainParticles.forEach((particle, index) => {
    particle.position.addScaledVector(rainDirection, particle.speed * delta);
    if (particle.position.y < .25 || Math.abs(particle.position.x) > 11 || Math.abs(particle.position.z) > 11) resetRainParticle(particle);
    dummy.position.copy(particle.position);
    dummy.quaternion.setFromUnitVectors(yAxis, rainDirection);
    dummy.scale.setScalar(.72 + Math.min(.7, model.rain / 10));
    dummy.updateMatrix();
    rainMesh.setMatrixAt(index, dummy.matrix);
  });
  rainMesh.instanceMatrix.needsUpdate = true;
}

function projectLabel(element: HTMLElement, anchor: THREE.Vector3) {
  const projected = anchor.clone().project(camera);
  const visible = projected.z > -1 && projected.z < 1;
  element.classList.toggle("visible", visible);
  if (!visible) return;
  const rawX = (projected.x * .5 + .5) * window.innerWidth;
  const rawY = (-projected.y * .5 + .5) * window.innerHeight;
  const halfWidth = element.offsetWidth / 2;
  const x = THREE.MathUtils.clamp(rawX, halfWidth + 9, window.innerWidth - halfWidth - 9);
  const y = compact ? THREE.MathUtils.clamp(rawY, 212, window.innerHeight - 205) : rawY;
  element.style.left = `${x}px`;
  element.style.top = `${y}px`;
}

function updateLabels() {
  projectLabel(homeLabel, worldAnchors.home);
  projectLabel(depotLabel, worldAnchors.depot);
  projectLabel(stationLabel, worldAnchors.station);
}

function focusOn(anchor: THREE.Vector3, distance = 14) {
  const direction = camera.position.clone().sub(controls.target).normalize();
  controls.target.copy(anchor.clone().setY(Math.max(.6, anchor.y * .36)));
  camera.position.copy(controls.target).addScaledVector(direction, distance);
  controls.update();
  $("gesture-hint").classList.add("hidden");
}

function initialiseWorld() {
  const container = $("scene");
  try {
    renderer = new THREE.WebGLRenderer({ antialias: !compact, alpha: true, powerPreference: "high-performance" });
  } catch {
    $("webgl-fallback").hidden = false;
    $("loading").classList.add("dismissed");
    return;
  }
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, compact ? 1.35 : 1.8));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xdceff0);
  scene.fog = new THREE.Fog(0xdceff0, 16, 42);
  camera = new THREE.PerspectiveCamera(compact ? 45 : 39, 1, .1, 70);
  camera.position.set(compact ? 16 : 17, compact ? 11.5 : 10.8, compact ? 18 : 19);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 3.1, 0);
  controls.enableDamping = true;
  controls.dampingFactor = .055;
  controls.enablePan = false;
  controls.minDistance = compact ? 15 : 13;
  controls.maxDistance = 32;
  controls.maxPolarAngle = Math.PI * .48;
  controls.minPolarAngle = Math.PI * .18;
  controls.autoRotate = !reducedMotion;
  controls.autoRotateSpeed = .24;
  controls.addEventListener("start", () => {
    controls.autoRotate = false;
    $("gesture-hint").classList.add("hidden");
  });

  ambientLight = new THREE.HemisphereLight(0xf4ffff, 0x6f8d7f, 1.8);
  scene.add(ambientLight);
  sunLight = new THREE.DirectionalLight(0xffefcf, 2.7);
  sunLight.position.set(-9, 15, 7);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(compact ? 512 : 1024, compact ? 512 : 1024);
  sunLight.shadow.camera.left = -12;
  sunLight.shadow.camera.right = 12;
  sunLight.shadow.camera.top = 12;
  sunLight.shadow.camera.bottom = -12;
  sunLight.shadow.camera.near = 2;
  sunLight.shadow.camera.far = 40;
  scene.add(sunLight);
  const fill = new THREE.DirectionalLight(0xbcecff, 1.1);
  fill.position.set(10, 7, -9);
  scene.add(fill);

  createNeighbourhood();
  createAtmosphere();
  createWind();
  createRain();
  updateWeatherLook();

  const resize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    renderer.setSize(width, height, false);
    camera.aspect = width / Math.max(1, height);
    camera.updateProjectionMatrix();
  };
  new ResizeObserver(resize).observe(container);
  resize();

  const clock = new THREE.Clock();
  let elapsed = 0;
  renderer.setAnimationLoop(() => {
    const delta = Math.min(.04, clock.getDelta());
    elapsed += delta;
    if (!reducedMotion) {
      if (windVisible) updateWind(delta, elapsed);
      updateRain(delta);
      clouds.forEach((cloud, index) => {
        cloud.position.x += delta * (.055 + index * .01) * Math.sign(bearingVector((model.windFrom + 180) % 360).x || 1);
        if (cloud.position.x > 9) cloud.position.x = -9;
        if (cloud.position.x < -9) cloud.position.x = 9;
        cloud.position.y += Math.sin(elapsed * .45 + index) * .0008;
      });
    } else if (windVisible) {
      updateWind(0, elapsed);
    }
    controls.update();
    updateLabels();
    renderer.render(scene, camera);
  });

  window.addEventListener("visibilitychange", () => {
    if (document.hidden) clock.stop(); else clock.start();
  });
  window.addEventListener("pagehide", () => renderer.setAnimationLoop(null), { once: true });

  window.setTimeout(() => $("loading").classList.add("dismissed"), 420);
}

function setScenario(name: ScenarioName) {
  selected = name;
  document.querySelectorAll<HTMLButtonElement>(".scene-button").forEach((button) => button.classList.toggle("active", button.dataset.scenario === name));
  if (name === "live") {
    model = { ...liveData };
  } else {
    model = { ...liveData, ...SCENARIOS[name] };
    setLiveState("Illustrative scene", true);
  }
  renderHUD();
  if (scene) updateWeatherLook();
}

document.querySelectorAll<HTMLButtonElement>(".scene-button").forEach((button) => button.addEventListener("click", () => {
  setScenario(button.dataset.scenario as ScenarioName);
  if (button.dataset.scenario === "live") loadLive().catch(() => setLiveState("Feed unavailable", true));
}));

$("wind-toggle").addEventListener("click", () => {
  windVisible = !windVisible;
  $("wind-toggle").classList.toggle("active", windVisible);
  $("wind-toggle").setAttribute("aria-pressed", String(windVisible));
  if (windMesh) windMesh.visible = windVisible;
  if (windRibbons) windRibbons.visible = windVisible;
});

homeLabel.addEventListener("click", () => focusOn(worldAnchors.home, 12));
depotLabel.addEventListener("click", () => focusOn(worldAnchors.depot, 13));
stationLabel.addEventListener("click", () => focusOn(worldAnchors.station, 11));

setScenario("live");
initialiseWorld();
loadLive().catch(() => {
  setLiveState("Live feed unavailable", true);
  $("weather-story").textContent = "The live feed is resting. Try a weather scene while we reconnect.";
});
window.setInterval(() => { if (!document.hidden && selected === "live") loadLive().catch(() => setLiveState("Feed unavailable", true)); }, 600000);
