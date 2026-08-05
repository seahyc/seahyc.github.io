import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { mergeGeometries } from "three/addons/utils/BufferGeometryUtils.js";
import "./style.css";

type ForecastPeriod = { time: string; forecast: string };
type OutlookDay = { day: string; forecast: string; low: number; high: number; wind: string };
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

type SupplementalWeather = {
  currentTemperature: number | null;
  currentHumidity: number | null;
  uv: number | null;
  wbgt: number | null;
  heatStress: string | null;
  lightningCount: number | null;
  outlook: OutlookDay[];
  updated: string | null;
};

type PrivateHomeMarker = {
  heightRatio: number;
  side: "east" | "west";
  bayIndex: number;
  buildingIndex: number;
};

type TowerObstacle = { x: number; z: number; radius: number; height: number };
type WindParticle = { position: THREE.Vector3; phase: number; age: number; maxAge: number };
type RainParticle = { position: THREE.Vector3; speed: number };
type MapPoint = [number, number];
type BuildingDatum = { footprint: MapPoint[]; height: number; levels: number; heightSource: "measured" | "levels" | "estimated"; kind: "tower" | "school" | "commercial" | "low-rise" };
type LinearDatum = { class: string; points: MapPoint[] };
type NeighbourhoodModel = {
  radius: number;
  unitsPerMetre: number;
  buildings: BuildingDatum[];
  roads: LinearDatum[];
  rails: LinearDatum[];
  waterLines: LinearDatum[];
  waterAreas: MapPoint[][];
  greenAreas: MapPoint[][];
  railAreas: MapPoint[][];
  trees: MapPoint[];
  landmarks: { depot: MapPoint; rainGauge: MapPoint };
};

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
const SUPPLEMENTAL_API = {
  airTemperature: `${API_ROOT}air-temperature`,
  relativeHumidity: `${API_ROOT}relative-humidity`,
  uv: `${API_ROOT}uv`,
  outlook: `${API_ROOT}four-day-outlook`,
  lightning: `${API_ROOT}weather?api=lightning`,
  wbgt: `${API_ROOT}weather?api=wbgt`,
};
const PRIVATE_HOME_ENDPOINT = "/reno/api/private-home-marker";
const NEIGHBOURHOOD_ENDPOINT = "/reno/orientation/neighbourhood-model.json";
const STATIONS = { weather: "S109", rain: "S217" };
const OPENINGS = [
  { bearing: 55, short: "NE", name: "bedroom / study window bank" },
  { bearing: 145, short: "SE", name: "bedroom side" },
  { bearing: 325, short: "NW", name: "living-room glazing" },
];
let neighbourhood: NeighbourhoodModel;
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
let forecastRain = false;
let windVisible = true;
let supplementalLoading = false;
let supplementalLoaded = false;
let lastPrimaryFetchAt = 0;
let supplemental: SupplementalWeather = {
  currentTemperature: null,
  currentHumidity: null,
  uv: null,
  wbgt: null,
  heatStress: null,
  lightningCount: null,
  outlook: [],
  updated: null,
};

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
  const rainActive = model.rain > 0 || forecastRain;

  $("wind-value").textContent = windName;
  $("wind-speed").textContent = `${fmt(model.speed, 1)} kn · ${fmt(model.speed * 1.852, 1)} km/h`;
  $("rain-value").textContent = `${fmt(model.rain, 1)} mm`;
  $("air-value").textContent = model.psi == null ? "—" : `PSI ${fmt(model.psi)}`;
  $("air-band").textContent = `${psiBand(model.psi)} · central region`;
  $("temp-value").textContent = model.temperature ?? "—";
  $("humidity-value").textContent = model.humidity ? `${model.humidity} humidity` : "24h range";
  $("home-label-detail").textContent = privateHomeMarker
    ? `Yingcong + Sopisa · ${inlet.short} windward`
    : `${inlet.short} side windward now`;
  $("weather-story").textContent = `${compass(model.windFrom)} wind reaches the ${inlet.name} first. The live model traces the likely path toward the ${outlet.short} side.`;

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
    reason = `${model.forecast} is forecast while the nearby gauge remains dry. The model highlights the facade most likely to receive it first.`;
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
  lastPrimaryFetchAt = Date.now();
  const updateTime = liveData.updated ? new Intl.DateTimeFormat("en-SG", { timeZone: "Asia/Singapore", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date(liveData.updated)) : "now";
  setLiveState(usable === keys.length ? `Live ${updateTime}` : `Partial · ${usable}/${keys.length}`, usable < keys.length);
  model = { ...liveData };
  renderHUD();
  if (scene) updateWeatherLook();
  renderIntelligence();
}

function renderIntelligence() {
  $("intel-pm25").textContent = liveData.pm25 == null ? "—" : `${fmt(liveData.pm25)} µg/m³`;
  $("intel-psi").textContent = liveData.psi == null ? "—" : `${fmt(liveData.psi)} · ${psiBand(liveData.psi)}`;
  $("intel-temperature").textContent = supplemental.currentTemperature == null ? (liveData.temperature ?? "—") : `${fmt(supplemental.currentTemperature, 1)}°C`;
  $("intel-humidity").textContent = supplemental.currentHumidity == null ? (liveData.humidity ?? "—") : `${fmt(supplemental.currentHumidity, 0)}%`;
  $("intel-uv").textContent = supplemental.uv == null ? "Load live detail" : `${fmt(supplemental.uv)} · ${supplemental.uv < 3 ? "low" : supplemental.uv < 6 ? "moderate" : supplemental.uv < 8 ? "high" : "very high"}`;
  $("intel-wbgt").textContent = supplemental.wbgt == null ? "Load live detail" : `${fmt(supplemental.wbgt, 1)}°C · ${supplemental.heatStress ?? "—"}`;
  $("intel-lightning").textContent = supplemental.lightningCount == null ? "Load live detail" : supplemental.lightningCount === 0 ? "No strokes in latest frame" : `${supplemental.lightningCount} in latest frame`;

  const timeline = $("intel-forecast");
  timeline.replaceChildren();
  const periods = [
    { time: liveData.twoHourLabel ?? "Next 2 hours", forecast: liveData.forecast },
    ...(liveData.centralPeriods ?? []).slice(0, 3),
  ];
  periods.forEach((period) => {
    const row = document.createElement("div");
    row.className = "intel-forecast-row";
    const time = document.createElement("span");
    time.textContent = period.time;
    const forecast = document.createElement("b");
    forecast.textContent = period.forecast;
    row.append(time, forecast);
    timeline.append(row);
  });

  const outlook = $("intel-outlook");
  outlook.replaceChildren();
  if (!supplemental.outlook.length) {
    const awaiting = document.createElement("p");
    awaiting.className = "intel-awaiting";
    awaiting.textContent = "Open this field note to retrieve the four-day outlook.";
    outlook.append(awaiting);
  } else {
    supplemental.outlook.forEach((day) => {
      const card = document.createElement("article");
      card.className = "outlook-day";
      const label = document.createElement("span");
      label.textContent = day.day;
      const temperature = document.createElement("b");
      temperature.textContent = `${day.low}–${day.high}°C`;
      const forecast = document.createElement("p");
      forecast.textContent = day.forecast;
      const wind = document.createElement("em");
      wind.textContent = day.wind;
      card.append(label, temperature, forecast, wind);
      outlook.append(card);
    });
  }
}

async function loadSupplemental() {
  if (supplementalLoaded || supplementalLoading) return;
  supplementalLoading = true;
  $("intel-load-state").textContent = "Gathering station detail…";
  const cooldown = Math.max(0, 10_200 - (Date.now() - lastPrimaryFetchAt));
  if (cooldown) await pause(cooldown);

  const keys = Object.keys(SUPPLEMENTAL_API) as (keyof typeof SUPPLEMENTAL_API)[];
  const results = await Promise.allSettled(keys.map((key) => getJSON(SUPPLEMENTAL_API[key])));
  const data: Record<string, any> = {};
  results.forEach((result, index) => { if (result.status === "fulfilled") data[keys[index]] = result.value; });

  const uvRecord = last<any>(data.uv?.data?.records);
  const outlookRecord = last<any>(data.outlook?.data?.records);
  const lightningRecord = last<any>(data.lightning?.data?.records);
  const wbgtRecord = last<any>(data.wbgt?.data?.records);
  const wbgtBishan = wbgtRecord?.item?.readings?.find((reading: any) => reading.station?.id === "S128");
  supplemental = {
    currentTemperature: stationValue(data.airTemperature, STATIONS.weather),
    currentHumidity: stationValue(data.relativeHumidity, STATIONS.weather),
    uv: uvRecord?.index?.[0]?.value ?? null,
    wbgt: wbgtBishan?.wbgt == null ? null : Number(wbgtBishan.wbgt),
    heatStress: wbgtBishan?.heatStress ?? null,
    lightningCount: Array.isArray(lightningRecord?.item?.readings) ? lightningRecord.item.readings.length : null,
    outlook: (outlookRecord?.forecasts ?? []).slice(0, 4).map((item: any) => ({
      day: item.day,
      forecast: item.forecast?.summary ?? item.forecast?.text ?? "—",
      low: item.temperature?.low,
      high: item.temperature?.high,
      wind: `${item.wind?.direction ?? "—"} ${item.wind?.speed?.low ?? "—"}–${item.wind?.speed?.high ?? "—"} km/h`,
    })),
    updated: wbgtRecord?.updatedTimestamp ?? uvRecord?.updatedTimestamp ?? outlookRecord?.updatedTimestamp ?? null,
  };
  supplementalLoaded = results.some((result) => result.status === "fulfilled");
  supplementalLoading = false;
  $("intel-load-state").textContent = supplementalLoaded ? "Live detail loaded" : "Some detail feeds are resting";
  renderIntelligence();
  if (scene) updateWeatherLook();
}

let renderer: THREE.WebGLRenderer;
let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let controls: OrbitControls;
let windMesh: THREE.InstancedMesh;
let rainMesh: THREE.InstancedMesh;
let sunLight: THREE.DirectionalLight;
let ambientLight: THREE.HemisphereLight;
let homeBlock: THREE.Group;
let homeMarker: THREE.Group | null = null;
let homePulseMaterial: THREE.MeshBasicMaterial | null = null;
let privateHomeMarker: PrivateHomeMarker | null = null;
const towerObstacles: TowerObstacle[] = [];
const windParticles: WindParticle[] = [];
const rainParticles: RainParticle[] = [];
const clouds: THREE.Group[] = [];
const residentGroups: THREE.Group[] = [];
const facadePanes: { bearing: number; mesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> }[] = [];
const HOME_BLOCK_HEIGHT = 8.2;
const HOME_BLOCK_ROTATION = THREE.MathUtils.degToRad(35);
const HOME_BAYS = {
  east: [-1.25, -.42, .42, 1.25],
  west: [-1.18, 0, 1.18],
};
const worldAnchors = {
  home: new THREE.Vector3(0, .8, 0),
  depot: new THREE.Vector3(0, .08, 0),
  station: new THREE.Vector3(0, .08, 0),
};
const homeFacadeNormal = new THREE.Vector3(0, 0, -1);

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

  scene.add(group);
  towerObstacles.push({ x, z, radius: Math.max(width, depth) * .68, height });
  registerWindows(x, z, width, depth, height, rotation, Boolean(options.highlighted));
  return group;
}

function createHomeBlock() {
  homeBlock = new THREE.Group();
  homeBlock.position.set(0, 0, .2);
  homeBlock.rotation.y = HOME_BLOCK_ROTATION;
  homeBlock.name = "home-block-massing";

  const corridor = new THREE.Mesh(
    new RoundedBoxGeometry(.28, HOME_BLOCK_HEIGHT, 3.5, 3, .08),
    material(0xf4d9c7, .78),
  );
  corridor.position.y = HOME_BLOCK_HEIGHT / 2 + .22;
  corridor.castShadow = true;
  corridor.receiveShadow = true;
  homeBlock.add(corridor);

  const moduleGeometry = new RoundedBoxGeometry(.84, HOME_BLOCK_HEIGHT, .66, 3, .08);
  const moduleMaterial = material(0xffe8d5, .76);
  const windowTransforms: THREE.Matrix4[] = [];
  const windowColor = new THREE.Color();
  const windowColors: THREE.Color[] = [];
  const windowQuaternion = new THREE.Quaternion();
  const windowScale = new THREE.Vector3(1, 1, 1);

  (["east", "west"] as const).forEach((sideName) => {
    const side = sideName === "east" ? 1 : -1;
    HOME_BAYS[sideName].forEach((z, bayIndex) => {
      const module = new THREE.Mesh(moduleGeometry, moduleMaterial);
      module.position.set(side * .55, HOME_BLOCK_HEIGHT / 2 + .22, z);
      module.castShadow = true;
      module.receiveShadow = true;
      homeBlock.add(module);

      for (let storey = 3; storey <= 33; storey += 1) {
        const y = .22 + HOME_BLOCK_HEIGHT * ((storey - .5) / 33);
        for (const offset of [-.13, .13]) {
          const position = new THREE.Vector3(side * (.55 + .84 / 2 + .016), y, z + offset);
          windowTransforms.push(new THREE.Matrix4().compose(position, windowQuaternion, windowScale));
          const warmth = ((storey * 11 + bayIndex * 7 + (offset > 0 ? 3 : 0)) % 13) < 3;
          windowColors.push(windowColor.set(warmth ? 0xffd39b : 0x9bd7dc).clone());
        }
      }
    });
  });

  const windows = new THREE.InstancedMesh(
    new THREE.BoxGeometry(.026, .12, .17),
    new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0x315f68, emissiveIntensity: .22, roughness: .4 }),
    windowTransforms.length,
  );
  windowTransforms.forEach((matrix, index) => {
    windows.setMatrixAt(index, matrix);
    windows.setColorAt(index, windowColors[index]);
  });
  windows.instanceMatrix.needsUpdate = true;
  if (windows.instanceColor) windows.instanceColor.needsUpdate = true;
  homeBlock.add(windows);

  const ledges = new THREE.InstancedMesh(
    new THREE.BoxGeometry(1.6, .012, 3.48),
    material(0xf8eee1, .82),
    32,
  );
  const ledgeDummy = new THREE.Object3D();
  for (let storey = 1; storey <= 32; storey += 1) {
    ledgeDummy.position.set(0, .22 + HOME_BLOCK_HEIGHT * (storey / 33), 0);
    ledgeDummy.updateMatrix();
    ledges.setMatrixAt(storey - 1, ledgeDummy.matrix);
  }
  ledges.instanceMatrix.needsUpdate = true;
  homeBlock.add(ledges);

  const roof = new THREE.Mesh(new RoundedBoxGeometry(1.32, .18, 3.1, 2, .05), material(0x63bfae, .68));
  roof.position.y = HOME_BLOCK_HEIGHT + .34;
  roof.castShadow = true;
  homeBlock.add(roof);

  scene.add(homeBlock);
  towerObstacles.push({ x: 0, z: .2, radius: 2.05, height: HOME_BLOCK_HEIGHT });
}

function createResident(color: number, hair: number, z: number, scale = 1) {
  const person = new THREE.Group();
  // Sit the miniature portraits just proud of the glass so they remain legible
  // through the translucent facade at both desktop and phone pixel densities.
  person.position.set(.038, -.08, z);
  person.scale.setScalar(scale);
  const body = new THREE.Mesh(new THREE.CylinderGeometry(.027, .038, .09, 8), material(color, .78));
  body.position.y = .065;
  const head = new THREE.Mesh(new THREE.SphereGeometry(.034, 10, 8), material(0xd79a74, .88));
  head.position.set(.012, .132, 0);
  const hairCap = new THREE.Mesh(new THREE.SphereGeometry(.036, 10, 6, 0, Math.PI * 2, 0, Math.PI * .52), material(hair, .9));
  hairCap.position.set(.012, .142, 0);
  const arm = new THREE.Mesh(new THREE.CylinderGeometry(.009, .011, .075, 6), material(0xd79a74, .86));
  arm.position.set(.012, .088, -.04);
  arm.rotation.x = -.62;
  person.add(body, head, hairCap, arm);
  residentGroups.push(person);
  return person;
}

function createHomeVignette(marker: PrivateHomeMarker) {
  if (!homeBlock) return;
  if (homeMarker) homeBlock.remove(homeMarker);
  residentGroups.length = 0;
  const sideName = marker.side;
  const bays = HOME_BAYS[sideName];
  const bayIndex = THREE.MathUtils.clamp(Math.round(marker.bayIndex), 0, bays.length - 1);
  const side = sideName === "east" ? 1 : -1;
  const z = bays[bayIndex];
  const y = .22 + HOME_BLOCK_HEIGHT * THREE.MathUtils.clamp(marker.heightRatio, .1, .985);
  const facadeX = side * (.55 + .84 / 2 + .035);

  homeMarker = new THREE.Group();
  homeMarker.position.set(facadeX, y, z);
  homeMarker.name = "private-home-window";
  const room = new THREE.Mesh(
    new THREE.BoxGeometry(.018, .23, .48),
    new THREE.MeshStandardMaterial({ color: 0x35535c, emissive: 0xf4b77f, emissiveIntensity: .7, roughness: .45 }),
  );
  room.position.x = -side * .16;
  homeMarker.add(room);

  const glass = new THREE.Mesh(
    new THREE.BoxGeometry(.018, .22, .46),
    new THREE.MeshPhysicalMaterial({ color: 0xcff4f4, transparent: true, opacity: .5, transmission: .25, roughness: .08 }),
  );
  glass.position.x = side * .012;
  homeMarker.add(glass);

  const frameMaterial = material(0xfff8e9, .5);
  for (const frameZ of [-.23, 0, .23]) {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(.024, .24, .012), frameMaterial);
    frame.position.set(side * .026, 0, frameZ);
    homeMarker.add(frame);
  }
  for (const frameY of [-.12, .12]) {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(.024, .012, .47), frameMaterial);
    frame.position.set(side * .026, frameY, 0);
    homeMarker.add(frame);
  }

  const couple = new THREE.Group();
  couple.scale.x = side;
  couple.add(createResident(0x65c7b4, 0x304047, -.09, 1.03));
  couple.add(createResident(0xf2a68a, 0x3b2d34, .09, .96));
  homeMarker.add(couple);

  homePulseMaterial = new THREE.MeshBasicMaterial({ color: 0x70ead2, transparent: true, opacity: .72, depthWrite: false });
  const pulse = new THREE.Mesh(new THREE.TorusGeometry(.32, .018, 6, 48), homePulseMaterial);
  pulse.rotation.y = Math.PI / 2;
  pulse.position.x = side * .045;
  homeMarker.add(pulse);

  const heart = new THREE.Mesh(new THREE.SphereGeometry(.018, 8, 6), new THREE.MeshBasicMaterial({ color: 0xf38f96 }));
  heart.position.set(side * .055, .15, 0);
  homeMarker.add(heart);
  homeBlock.add(homeMarker);
  homeBlock.updateMatrixWorld(true);
  worldAnchors.home.copy(homeBlock.localToWorld(homeMarker.position.clone()));
  $("home-label").querySelector("b")!.textContent = "Our window";
  $("home-label-detail").textContent = "Yingcong + Sopisa · tap to visit";
  $("private-model-state").textContent = "Exact storey and window bank loaded";
}

async function loadPrivateHomeMarker() {
  try {
    const response = await fetch(PRIVATE_HOME_ENDPOINT, { credentials: "same-origin", cache: "no-store" });
    if (!response.ok) throw new Error(`Private marker ${response.status}`);
    const payload = await response.json();
    const marker = payload?.marker as PrivateHomeMarker;
    if (!marker || !Number.isFinite(marker.heightRatio) || !Number.isFinite(marker.bayIndex) || !Number.isFinite(marker.buildingIndex) || !["east", "west"].includes(marker.side)) throw new Error("Invalid private marker");
    privateHomeMarker = marker;
    $("private-model-state").textContent = "Protected building and stack geometry loaded";
  } catch {
    $("private-model-state").textContent = "Home is shown at block level in this preview";
  }
}

async function loadNeighbourhoodModel() {
  const response = await fetch(NEIGHBOURHOOD_ENDPOINT, { cache: "force-cache" });
  if (!response.ok) throw new Error(`Neighbourhood model ${response.status}`);
  neighbourhood = await response.json() as NeighbourhoodModel;
  if (!Array.isArray(neighbourhood.buildings) || !Array.isArray(neighbourhood.roads) || !neighbourhood.landmarks) throw new Error("Invalid neighbourhood model");
  worldAnchors.depot.set(neighbourhood.landmarks.depot[0], .08, neighbourhood.landmarks.depot[1]);
  worldAnchors.station.set(neighbourhood.landmarks.rainGauge[0], .08, neighbourhood.landmarks.rainGauge[1]);
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

  createHomeBlock();
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

function mapShape(points: MapPoint[]) {
  const shape = new THREE.Shape();
  points.forEach(([x, z], index) => index ? shape.lineTo(x, -z) : shape.moveTo(x, -z));
  shape.closePath();
  return shape;
}

function flatGeometry(points: MapPoint[]) {
  const geometry = new THREE.ShapeGeometry(mapShape(points));
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function buildingGeometry(building: BuildingDatum) {
  const geometry = new THREE.ExtrudeGeometry(mapShape(building.footprint), {
    depth: building.height,
    bevelEnabled: false,
    curveSegments: 1,
  });
  geometry.rotateX(-Math.PI / 2);
  return geometry;
}

function mergedGeometry(geometries: THREE.BufferGeometry[]) {
  if (!geometries.length) return null;
  const merged = mergeGeometries(geometries, false);
  geometries.forEach((geometry) => geometry.dispose());
  return merged;
}

function addAreaLayer(areas: MapPoint[][], color: number, y: number, opacity = 1) {
  const geometries = areas.filter((area) => area.length >= 3).map(flatGeometry);
  const geometry = mergedGeometry(geometries);
  if (!geometry) return;
  const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color, roughness: .92, transparent: opacity < 1, opacity, depthWrite: true }));
  mesh.position.y = y;
  mesh.receiveShadow = true;
  scene.add(mesh);
}

function clipSegmentToCircle(a: MapPoint, b: MapPoint, radius: number): [MapPoint, MapPoint] | null {
  const dx = b[0] - a[0];
  const dz = b[1] - a[1];
  const quadraticA = dx * dx + dz * dz;
  if (quadraticA < 1e-12) return Math.hypot(a[0], a[1]) <= radius ? [a, b] : null;
  const quadraticB = 2 * (a[0] * dx + a[1] * dz);
  const quadraticC = a[0] * a[0] + a[1] * a[1] - radius * radius;
  const discriminant = quadraticB * quadraticB - 4 * quadraticA * quadraticC;
  const aInside = quadraticC <= 0;
  const bInside = b[0] * b[0] + b[1] * b[1] <= radius * radius;
  if (aInside && bInside) return [a, b];
  if (discriminant < 0) return null;
  const root = Math.sqrt(discriminant);
  const first = (-quadraticB - root) / (2 * quadraticA);
  const second = (-quadraticB + root) / (2 * quadraticA);
  const start = Math.max(0, Math.min(first, second));
  const end = Math.min(1, Math.max(first, second));
  if (start > end) return null;
  return [
    [a[0] + dx * start, a[1] + dz * start],
    [a[0] + dx * end, a[1] + dz * end],
  ];
}

function addLineLayer(lines: LinearDatum[], colors: Record<string, number>, y: number, fallbackColor: number) {
  const positionsByClass = new Map<string, number[]>();
  const clipRadius = neighbourhood.radius - .035;
  lines.forEach((line) => {
    const positions = positionsByClass.get(line.class) ?? [];
    for (let index = 1; index < line.points.length; index += 1) {
      const clipped = clipSegmentToCircle(line.points[index - 1], line.points[index], clipRadius);
      if (!clipped) continue;
      const [[ax, az], [bx, bz]] = clipped;
      positions.push(ax, y, az, bx, y, bz);
    }
    positionsByClass.set(line.class, positions);
  });
  positionsByClass.forEach((positions, lineClass) => {
    if (!positions.length) return;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const line = new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: colors[lineClass] ?? fallbackColor, transparent: true, opacity: .68, depthWrite: false }));
    line.renderOrder = 2;
    scene.add(line);
  });
}

function polygonCentre(points: MapPoint[]) {
  const box = new THREE.Box2();
  points.forEach(([x, z]) => box.expandByPoint(new THREE.Vector2(x, z)));
  const centre = box.getCenter(new THREE.Vector2());
  return new THREE.Vector3(centre.x, 0, centre.y);
}

function mapPointInside(point: THREE.Vector3, polygon: MapPoint[]) {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
    const [ax, az] = polygon[index];
    const [bx, bz] = polygon[previous];
    const intersects = ((az > point.z) !== (bz > point.z)) && point.x < (bx - ax) * (point.z - az) / (bz - az || 1e-9) + ax;
    if (intersects) inside = !inside;
  }
  return inside;
}

function facadeEdge(points: MapPoint[], targetBearing: number) {
  const targetNormal = bearingVector(targetBearing);
  let best: { a: THREE.Vector3; b: THREE.Vector3; normal: THREE.Vector3; score: number } | null = null;
  for (let index = 0; index < points.length; index += 1) {
    const [ax, az] = points[index];
    const [bx, bz] = points[(index + 1) % points.length];
    const a = new THREE.Vector3(ax, 0, az);
    const b = new THREE.Vector3(bx, 0, bz);
    const tangent = b.clone().sub(a).normalize();
    const normalA = new THREE.Vector3(-tangent.z, 0, tangent.x);
    const normalB = normalA.clone().multiplyScalar(-1);
    const normal = normalA.dot(targetNormal) >= normalB.dot(targetNormal) ? normalA : normalB;
    const edgeLength = a.distanceTo(b);
    const midpoint = a.clone().add(b).multiplyScalar(.5);
    if (edgeLength < .03 || mapPointInside(midpoint.clone().addScaledVector(normal, .012), points)) continue;
    const bearing = (THREE.MathUtils.radToDeg(Math.atan2(normal.x, -normal.z)) + 360) % 360;
    const bearingError = angleDifference(bearing, targetBearing);
    const lengthBonus = Math.min(.25, edgeLength) * 8;
    const outwardSupport = midpoint.dot(targetNormal);
    const score = bearingError * 10 - outwardSupport * 10 - lengthBonus;
    if (!best || score < best.score) best = { a, b, normal, score };
  }
  return best;
}

function limbBetween(start: THREE.Vector3, end: THREE.Vector3, radius: number, color: number) {
  const direction = end.clone().sub(start);
  const limb = new THREE.Mesh(new THREE.CylinderGeometry(radius * .88, radius, direction.length(), 8), material(color, .86));
  limb.position.copy(start).add(end).multiplyScalar(.5);
  limb.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  return limb;
}

function createGeoResident(color: number, hair: number, x: number, scale = 1, longHair = false, skin = 0xd79a74) {
  const person = new THREE.Group();
  person.position.set(x, -.0088, -.0033);
  person.scale.setScalar(scale);
  const torso = new THREE.Mesh(new RoundedBoxGeometry(.0055, .0064, .0028, 2, .0009), material(color, .78));
  torso.position.y = .0102;
  const pelvis = new THREE.Mesh(new RoundedBoxGeometry(.0045, .0025, .0026, 2, .0007), material(0x425668, .86));
  pelvis.position.y = .0063;
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(.00075, .00082, .0015, 8), material(skin, .87));
  neck.position.y = .014;
  const head = new THREE.Mesh(new THREE.SphereGeometry(.00275, 14, 10), material(skin, .88));
  head.scale.set(1, 1.08, .94);
  head.position.y = .0166;
  const hairCap = new THREE.Mesh(new THREE.SphereGeometry(.00288, 14, 9, 0, Math.PI * 2, 0, Math.PI * .56), material(hair, .92));
  hairCap.position.y = .01715;
  const leftLeg = limbBetween(new THREE.Vector3(-.00125, .0055, 0), new THREE.Vector3(-.00155, .0002, .0003), .00072, 0x354550);
  const rightLeg = limbBetween(new THREE.Vector3(.00125, .0055, 0), new THREE.Vector3(.00155, .0002, -.00015), .00072, 0x354550);
  const leftArm = limbBetween(new THREE.Vector3(-.0031, .0118, 0), new THREE.Vector3(-.00365, .0068, .00135), .00066, skin);
  const rightArm = limbBetween(new THREE.Vector3(.0031, .0118, 0), new THREE.Vector3(.00365, .0068, .00135), .00066, skin);
  const leftHand = new THREE.Mesh(new THREE.SphereGeometry(.00078, 8, 6), material(skin, .87));
  leftHand.position.set(-.00365, .0068, .00135);
  const rightHand = leftHand.clone();
  rightHand.position.x *= -1;
  const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0x30282a });
  [-.00078, .00078].forEach((eyeX) => {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(.00023, 6, 4), eyeMaterial);
    eye.position.set(eyeX, .0168, .00257);
    person.add(eye);
  });
  if (longHair) {
    const hairBack = new THREE.Mesh(new RoundedBoxGeometry(.0054, .0066, .0015, 2, .0007), material(hair, .92));
    hairBack.position.set(0, .0146, -.00145);
    person.add(hairBack);
  }
  person.add(torso, pelvis, neck, head, hairCap, leftLeg, rightLeg, leftArm, rightArm, leftHand, rightHand);
  residentGroups.push(person);
  return person;
}

function createGeoHomeVignette(marker: PrivateHomeMarker, building: BuildingDatum) {
  const targetBearing = marker.side === "east" ? 55 : 235;
  const edge = facadeEdge(building.footprint, targetBearing);
  if (!edge) return;
  const bayCount = marker.side === "east" ? 4 : 3;
  const ratio = THREE.MathUtils.clamp((Math.round(marker.bayIndex) + .5) / bayCount, .08, .92);
  const position = edge.a.clone().lerp(edge.b, ratio);
  position.y = building.height * THREE.MathUtils.clamp(marker.heightRatio, .1, .985);
  homeFacadeNormal.copy(edge.normal);

  homeMarker = new THREE.Group();
  homeMarker.name = "private-home-window";
  homeMarker.position.copy(position).addScaledVector(edge.normal, .004);
  homeMarker.rotation.y = Math.atan2(edge.normal.x, edge.normal.z);

  const room = new THREE.Mesh(new THREE.BoxGeometry(.022, .018, .0015), new THREE.MeshStandardMaterial({ color: 0x31515a, emissive: 0xf4b77f, emissiveIntensity: 1.4, roughness: .46 }));
  room.position.z = -.0115;
  homeMarker.add(room);
  const glass = new THREE.Mesh(new THREE.PlaneGeometry(.019, .016), new THREE.MeshPhysicalMaterial({ color: 0xcff4f4, transparent: true, opacity: .2, transmission: .1, roughness: .12, side: THREE.DoubleSide }));
  glass.position.z = .001;
  homeMarker.add(glass);

  const frameMaterial = material(0xfff8e9, .5);
  [-.0095, 0, .0095].forEach((x) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(.0008, .017, .0008), frameMaterial);
    frame.position.set(x, 0, .0015);
    homeMarker!.add(frame);
  });
  [-.0085, .0085].forEach((y) => {
    const frame = new THREE.Mesh(new THREE.BoxGeometry(.02, .0008, .0008), frameMaterial);
    frame.position.set(0, y, .0015);
    homeMarker!.add(frame);
  });

  homeMarker.add(createGeoResident(0x65c7b4, 0x304047, -.0044, .89, false, 0xd49a73));
  homeMarker.add(createGeoResident(0xf2a68a, 0x3b2d34, .0044, .84, true, 0xc98a65));
  homePulseMaterial = new THREE.MeshBasicMaterial({ color: 0x70ead2, transparent: true, opacity: .72, depthWrite: false });
  const pulse = new THREE.Mesh(new THREE.TorusGeometry(.028, .0014, 6, 48), homePulseMaterial);
  pulse.position.z = .003;
  homeMarker.add(pulse);
  const heart = new THREE.Mesh(new THREE.SphereGeometry(.0016, 8, 6), new THREE.MeshBasicMaterial({ color: 0xf38f96 }));
  heart.position.set(0, .011, .0035);
  homeMarker.add(heart);
  scene.add(homeMarker);
  worldAnchors.home.copy(homeMarker.position);
  $("home-label").querySelector("b")!.textContent = "Our window";
  $("home-label-detail").textContent = "Yingcong + Sopisa · tap to visit";
  $("private-model-state").textContent = "Exact storey and window bank loaded on the surveyed footprint";
}

function buildingFrame(building: BuildingDatum) {
  const centre = polygonCentre(building.footprint);
  let longest = new THREE.Vector2(1, 0);
  let longestLength = 0;
  for (let index = 0; index < building.footprint.length; index += 1) {
    const [ax, az] = building.footprint[index];
    const [bx, bz] = building.footprint[(index + 1) % building.footprint.length];
    const edge = new THREE.Vector2(bx - ax, bz - az);
    if (edge.lengthSq() > longestLength) {
      longestLength = edge.lengthSq();
      longest.copy(edge).normalize();
    }
  }
  const cross = new THREE.Vector2(-longest.y, longest.x);
  let minLong = Infinity;
  let maxLong = -Infinity;
  let minCross = Infinity;
  let maxCross = -Infinity;
  building.footprint.forEach(([x, z]) => {
    const relative = new THREE.Vector2(x - centre.x, z - centre.z);
    const along = relative.dot(longest);
    const across = relative.dot(cross);
    minLong = Math.min(minLong, along);
    maxLong = Math.max(maxLong, along);
    minCross = Math.min(minCross, across);
    maxCross = Math.max(maxCross, across);
  });
  return {
    centre,
    width: Math.max(.08, maxLong - minLong),
    depth: Math.max(.06, maxCross - minCross),
    rotation: -Math.atan2(longest.y, longest.x),
  };
}

function createBishanRidgesBuilding(building: BuildingDatum, highlighted: boolean) {
  const group = new THREE.Group();
  group.name = highlighted ? "bishan-ridges-home" : "bishan-ridges-block";
  const frame = buildingFrame(building);
  const base = new THREE.Mesh(buildingGeometry(building), new THREE.MeshStandardMaterial({
    color: highlighted ? 0xa2745d : 0x8d6757,
    roughness: .76,
    emissive: highlighted ? 0x6b3520 : 0x000000,
    emissiveIntensity: highlighted ? .08 : 0,
  }));
  base.castShadow = true;
  base.receiveShadow = true;
  group.add(base);

  const details = new THREE.Group();
  details.position.copy(frame.centre);
  details.rotation.y = frame.rotation;
  const cream = material(0xf0ddbd, .72);
  const mustard = material(0xd5a62e, .72);
  const deepBrown = material(0x60453d, .82);
  const gardenGreen = material(0x5f9771, .9);
  const floorsPerBand = 4;
  const bandCount = Math.max(5, Math.floor(building.levels / floorsPerBand));
  for (let index = 1; index <= bandCount; index += 1) {
    const band = new THREE.Mesh(new THREE.BoxGeometry(frame.width * .96, .009, frame.depth * .93), cream);
    band.position.y = index * building.height / (bandCount + 1);
    details.add(band);
  }

  [-1, 1].forEach((side, sideIndex) => {
    const facadeZ = side * (frame.depth * .5 + .004);
    const brownBay = new THREE.Mesh(new RoundedBoxGeometry(frame.width * .18, building.height * .79, .012, 2, .004), deepBrown);
    brownBay.position.set(frame.width * (sideIndex ? .2 : -.22), building.height * .49, facadeZ);
    const yellowBay = new THREE.Mesh(new RoundedBoxGeometry(Math.max(.025, frame.width * .1), building.height * .31, .014, 2, .004), mustard);
    yellowBay.position.set(frame.width * (sideIndex ? -.28 : .27), building.height * .33, facadeZ + side * .002);
    const fin = new THREE.Mesh(new RoundedBoxGeometry(.012, building.height * .66, .016, 2, .003), cream);
    fin.position.set(frame.width * (sideIndex ? .43 : -.43), building.height * .53, facadeZ + side * .003);
    details.add(brownBay, yellowBay, fin);
  });

  const terraceY = building.height * .58;
  const terrace = new THREE.Mesh(new RoundedBoxGeometry(frame.width * .58, .018, frame.depth * .64, 2, .004), cream);
  terrace.position.set(frame.width * .1, terraceY, 0);
  details.add(terrace);
  for (let index = -2; index <= 2; index += 1) {
    const planter = new THREE.Mesh(new THREE.IcosahedronGeometry(.012 + (index & 1) * .003, 1), gardenGreen);
    planter.position.set(frame.width * .1 + index * frame.width * .09, terraceY + .018, frame.depth * .27);
    details.add(planter);
  }

  const roof = new THREE.Mesh(new RoundedBoxGeometry(frame.width * .72, .02, frame.depth * .72, 2, .005), cream);
  roof.position.y = building.height + .012;
  details.add(roof);
  [-.24, 0, .24].forEach((offset, index) => {
    const roofFin = new THREE.Mesh(new RoundedBoxGeometry(.018, .075 + index * .018, frame.depth * .42, 2, .004), index === 1 ? mustard : deepBrown);
    roofFin.position.set(frame.width * offset, building.height + .047 + index * .009, 0);
    details.add(roofFin);
  });
  group.add(details);
  scene.add(group);
  return group;
}

function createGeoBuildings() {
  const homeIndex = privateHomeMarker?.buildingIndex;
  const ridgeBuildingIndices = new Set(neighbourhood.buildings
    .map((building, index) => ({ index, levels: building.levels, distance: polygonCentre(building.footprint).length() }))
    .filter(({ levels }) => levels >= 30)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 6)
    .map(({ index }) => index));
  const geometryGroups = new Map<string, THREE.BufferGeometry[]>();
  const palettes: Record<BuildingDatum["kind"], number[]> = {
    tower: [0xe9c9b5, 0xe8d6bf, 0xd9c9bb],
    school: [0xe5c787, 0xf0d9a5, 0xdab98b],
    commercial: [0xbfd3cc, 0xc8d8cf, 0xb9cdd3],
    "low-rise": [0xe9dfcf, 0xded7c7, 0xead2c5],
  };
  neighbourhood.buildings.forEach((building, index) => {
    const centre = polygonCentre(building.footprint);
    const box = new THREE.Box2();
    building.footprint.forEach(([x, z]) => box.expandByPoint(new THREE.Vector2(x, z)));
    const size = box.getSize(new THREE.Vector2());
    towerObstacles.push({ x: centre.x, z: centre.z, radius: Math.max(size.x, size.y) * .65, height: building.height });
    if (ridgeBuildingIndices.has(index)) {
      const isHome = index === homeIndex;
      const ridgeBlock = createBishanRidgesBuilding(building, isHome);
      if (isHome) {
        homeBlock = ridgeBlock;
        createGeoHomeVignette(privateHomeMarker!, building);
      }
    } else {
      const paletteIndex = Math.abs((index * 31 + building.levels * 7) % palettes[building.kind].length);
      const key = `${building.kind}-${paletteIndex}`;
      const group = geometryGroups.get(key) ?? [];
      group.push(buildingGeometry(building));
      geometryGroups.set(key, group);
    }
  });
  geometryGroups.forEach((geometries, key) => {
    const geometry = mergedGeometry(geometries);
    if (!geometry) return;
    const [kind, paletteIndex] = key.split(/-(?=\d+$)/) as [BuildingDatum["kind"], string];
    const mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: palettes[kind][Number(paletteIndex)], roughness: .8, flatShading: false }));
    mesh.castShadow = !compact;
    mesh.receiveShadow = true;
    scene.add(mesh);
  });
}

function createGeoTrees() {
  const count = neighbourhood.trees.length;
  if (!count) return;
  const trunks = new THREE.InstancedMesh(new THREE.CylinderGeometry(.0014, .0019, .016, 5), material(0x9a7658, .9), count);
  const crowns = new THREE.InstancedMesh(new THREE.IcosahedronGeometry(.009, 1), material(0x65aa7e, .88), count);
  const dummy = new THREE.Object3D();
  neighbourhood.trees.forEach(([x, z], index) => {
    const scale = .82 + ((index * 37) % 29) / 100;
    dummy.position.set(x, .008 * scale, z);
    dummy.scale.setScalar(scale);
    dummy.rotation.y = index * .71;
    dummy.updateMatrix();
    trunks.setMatrixAt(index, dummy.matrix);
    dummy.position.y = .021 * scale;
    dummy.updateMatrix();
    crowns.setMatrixAt(index, dummy.matrix);
  });
  trunks.instanceMatrix.needsUpdate = true;
  crowns.instanceMatrix.needsUpdate = true;
  scene.add(trunks, crowns);
}

function createGeoNeighbourhood() {
  const base = new THREE.Mesh(new THREE.CylinderGeometry(neighbourhood.radius + .14, neighbourhood.radius + .26, .11, 96), material(0x6f9f91, .96));
  base.position.y = -.07;
  base.receiveShadow = true;
  scene.add(base);
  const ground = new THREE.Mesh(new THREE.CircleGeometry(neighbourhood.radius, 96), material(0xb9d1aa, .9));
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -.01;
  ground.receiveShadow = true;
  scene.add(ground);

  addAreaLayer(neighbourhood.greenAreas, 0x83b986, .002, .82);
  addAreaLayer(neighbourhood.railAreas, 0xb7b5aa, .006, .95);
  addAreaLayer(neighbourhood.waterAreas, 0x67bfd6, .012, .9);
  addLineLayer(neighbourhood.roads, { arterial: 0x7d8381, collector: 0x929996, local: 0xabb0aa, path: 0xd2cdb9 }, .018, 0xa8ada8);
  addLineLayer(neighbourhood.rails, {}, .023, 0x535e5d);
  addLineLayer(neighbourhood.waterLines, {}, .02, 0x58b4d1);
  createGeoBuildings();
  createGeoTrees();

  const gauge = new THREE.Group();
  gauge.position.copy(worldAnchors.station);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(.0012, .0018, .028, 6), material(0x547f84, .6));
  pole.position.y = .014;
  const cup = new THREE.Mesh(new THREE.CylinderGeometry(.006, .003, .006, 10), material(0x6ec8df, .45));
  cup.position.y = .031;
  gauge.add(pole, cup);
  scene.add(gauge);
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
  const rainy = model.rain > 0 || forecastRain;
  const storm = model.rain > 2;
  const inlet = OPENINGS.reduce((best, opening) => alignment(model.windFrom, opening.bearing) > alignment(model.windFrom, best.bearing) ? opening : best);
  facadePanes.forEach(({ bearing, mesh }) => {
    const active = bearing === inlet.bearing;
    mesh.material.opacity = active ? .72 : .08;
    mesh.material.color.set(active ? (rainy ? 0x7bc9ed : 0xffc47b) : 0xbfece3);
  });
  rainMesh.visible = rainy;
  windMesh.visible = windVisible;
  scene.background = new THREE.Color(storm ? 0x9ebcc5 : rainy ? 0xc8dce2 : 0xdceff0);
  scene.fog = new THREE.Fog(storm ? 0x9ebcc5 : 0xdceff0, 16, storm ? 35 : 42);
  sunLight.color.set(storm ? 0xc4d4e2 : 0xffefcf);
  const uvLift = supplemental.uv == null ? 0 : Math.min(.65, supplemental.uv * .07);
  sunLight.intensity = storm ? 1.1 : rainy ? 1.7 : 2.45 + uvLift;
  ambientLight.intensity = storm ? 1.25 : 1.8;
  clouds.forEach((cloud, index) => {
    const cloudMaterial = (cloud.children[0] as THREE.Mesh).material as THREE.MeshStandardMaterial;
    cloudMaterial.color.set(storm ? 0x8ea6ad : rainy ? 0xd5e1e3 : 0xffffff);
    cloudMaterial.opacity = storm ? .92 : .82;
    cloud.scale.setScalar((index % 2 ? .92 : 1.1) * (storm ? 1.15 : 1));
  });
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
  homeLabel.classList.remove("focused");
  $("home-portal").classList.remove("visible");
  $("home-portal").hidden = true;
  $("app").classList.remove("home-focus");
  controls.minDistance = compact ? 15 : 13;
  const direction = camera.position.clone().sub(controls.target).normalize();
  controls.target.copy(anchor.clone().setY(Math.max(.6, anchor.y * .36)));
  camera.position.copy(controls.target).addScaledVector(direction, distance);
  controls.update();
  $("gesture-hint").classList.add("hidden");
}

function focusHome() {
  if (!privateHomeMarker || !homeMarker) {
    focusOn(worldAnchors.home, 12);
    return;
  }
  controls.autoRotate = false;
  homeLabel.classList.add("focused");
  $("home-portal").hidden = false;
  $("home-portal").classList.add("visible");
  $("app").classList.add("home-focus");
  controls.minDistance = .035;
  controls.target.copy(worldAnchors.home);
  camera.position.copy(worldAnchors.home).addScaledVector(homeFacadeNormal, compact ? .13 : .105);
  camera.position.y += compact ? .018 : .012;
  controls.update();
  $("gesture-hint").classList.add("hidden");
}

function focusNeighbourhood() {
  controls.autoRotate = !reducedMotion;
  controls.minDistance = compact ? 15 : 13;
  controls.target.set(0, .32, 0);
  camera.position.set(compact ? 16 : 17, compact ? 8.8 : 8.2, compact ? 18 : 19);
  controls.update();
  homeLabel.classList.remove("focused");
  $("home-portal").classList.remove("visible");
  $("home-portal").hidden = true;
  $("app").classList.remove("home-focus");
  const url = new URL(window.location.href);
  url.searchParams.delete("view");
  window.history.replaceState({}, "", url);
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
  camera = new THREE.PerspectiveCamera(compact ? 45 : 39, 1, .01, 70);
  camera.position.set(compact ? 16 : 17, compact ? 8.8 : 8.2, compact ? 18 : 19);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, .32, 0);
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

  createGeoNeighbourhood();
  createAtmosphere();
  createWind();
  createRain();
  updateWeatherLook();
  if (new URLSearchParams(window.location.search).get("view") === "home" && privateHomeMarker && homeMarker) {
    window.setTimeout(focusHome, reducedMotion ? 0 : 380);
  }

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
    residentGroups.forEach((resident, index) => {
      resident.rotation.z = reducedMotion ? 0 : Math.sin(elapsed * 1.25 + index * .9) * .055;
      resident.rotation.y = reducedMotion ? 0 : Math.sin(elapsed * .72 + index) * .04;
    });
    if (homePulseMaterial) homePulseMaterial.opacity = reducedMotion ? .62 : .46 + Math.sin(elapsed * 2.1) * .22;
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

$("wind-toggle").addEventListener("click", () => {
  windVisible = !windVisible;
  $("wind-toggle").classList.toggle("active", windVisible);
  $("wind-toggle").setAttribute("aria-pressed", String(windVisible));
  if (windMesh) windMesh.visible = windVisible;
});

homeLabel.addEventListener("click", focusHome);
depotLabel.addEventListener("click", () => focusOn(worldAnchors.depot, 13));
stationLabel.addEventListener("click", () => focusOn(worldAnchors.station, 11));
$("zoom-neighbourhood").addEventListener("click", focusNeighbourhood);

const intelSheet = $("intel-sheet");
const intelScrim = $("intel-scrim");
function setIntelOpen(open: boolean) {
  intelSheet.classList.toggle("open", open);
  intelSheet.setAttribute("aria-hidden", String(!open));
  intelScrim.classList.toggle("open", open);
  $("intel-toggle").setAttribute("aria-expanded", String(open));
  if (open) loadSupplemental().catch(() => {
    supplementalLoading = false;
    $("intel-load-state").textContent = "Some detail feeds are resting";
  });
}
$("intel-toggle").addEventListener("click", () => setIntelOpen(true));
$("intel-close").addEventListener("click", () => setIntelOpen(false));
intelScrim.addEventListener("click", () => setIntelOpen(false));
window.addEventListener("keydown", (event) => { if (event.key === "Escape") setIntelOpen(false); });

renderIntelligence();
async function boot() {
  try {
    await Promise.all([loadPrivateHomeMarker(), loadNeighbourhoodModel()]);
    initialiseWorld();
    renderHUD();
    loadLive().catch(() => {
      setLiveState("Live feed unavailable", true);
      $("weather-story").textContent = "The live weather feed is resting; the anchored neighbourhood geometry remains available.";
    });
  } catch {
    setLiveState("Model unavailable", true);
    $("loading").classList.add("dismissed");
    $("webgl-fallback").hidden = false;
    $("webgl-fallback").querySelector("b")!.textContent = "The neighbourhood model could not load.";
  }
}

boot();
window.setInterval(() => { if (!document.hidden) loadLive().catch(() => setLiveState("Feed unavailable", true)); }, 600000);
