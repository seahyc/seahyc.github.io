#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUTPUT = resolve(HERE, "../public/neighbourhood-model.json");
const PRIVATE_MARKER_ENV = resolve(HERE, "../.env.local");
const PROJECT_QUERY = "Bishan Ridges, Singapore";
const HOME_QUERY = process.env.RENO_PRIVATE_HOME_QUERY;
const HOME_LEVELS = Number(process.env.RENO_PRIVATE_HOME_LEVELS || 0);
const RADIUS_METRES = 1000;
const UNITS_PER_METRE = .01;
const OVERTURE_RELEASE = "2026-07-22.0";
const DATA_DATE = "2026-08-05";
const USER_AGENT = "seahyingcong-renovation-digital-twin/1.0";

if (!HOME_QUERY) throw new Error("Set RENO_PRIVATE_HOME_QUERY when rebuilding the private neighbourhood model.");

const temp = mkdtempSync(resolve(tmpdir(), "reno-neighbourhood-"));

const round = (value, precision = 1e3) => Math.round(value * precision) / precision;
const parseNumber = (value) => {
  if (value == null) return null;
  const match = String(value).replace(",", ".").match(/-?\d+(?:\.\d+)?/);
  return match ? Number(match[0]) : null;
};

async function fetchJSON(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: { "User-Agent": USER_AGENT, ...(options.headers || {}) },
  });
  if (!response.ok) throw new Error(`${response.status} from ${url}`);
  return response.json();
}

async function geocode(query) {
  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("format", "jsonv2");
  url.searchParams.set("limit", "1");
  url.searchParams.set("q", query);
  const rows = await fetchJSON(url);
  if (!rows.length) throw new Error(`No geocode result for ${query}`);
  return { lat: Number(rows[0].lat), lon: Number(rows[0].lon) };
}

function projector(center) {
  const metresPerLon = 111320 * Math.cos(center.lat * Math.PI / 180);
  const metresPerLat = 110574;
  return ({ lat, lon }) => [
    round((lon - center.lon) * metresPerLon * UNITS_PER_METRE),
    round(-(lat - center.lat) * metresPerLat * UNITS_PER_METRE),
  ];
}

const sqDistance = (a, b) => (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2;

function simplify(points, tolerance = .004) {
  if (points.length <= 3) return points;
  const squaredTolerance = tolerance ** 2;
  const keep = new Uint8Array(points.length);
  keep[0] = 1;
  keep[points.length - 1] = 1;
  const stack = [[0, points.length - 1]];
  while (stack.length) {
    const [start, end] = stack.pop();
    const a = points[start];
    const b = points[end];
    const dx = b[0] - a[0];
    const dy = b[1] - a[1];
    const lengthSquared = dx * dx + dy * dy;
    let furthest = -1;
    let maximum = squaredTolerance;
    for (let index = start + 1; index < end; index += 1) {
      const point = points[index];
      let t = lengthSquared ? ((point[0] - a[0]) * dx + (point[1] - a[1]) * dy) / lengthSquared : 0;
      t = Math.max(0, Math.min(1, t));
      const distance = sqDistance(point, [a[0] + t * dx, a[1] + t * dy]);
      if (distance > maximum) {
        maximum = distance;
        furthest = index;
      }
    }
    if (furthest > 0) {
      keep[furthest] = 1;
      stack.push([start, furthest], [furthest, end]);
    }
  }
  return points.filter((_, index) => keep[index]);
}

function polygonCentroid(points) {
  let area = 0;
  let x = 0;
  let y = 0;
  for (let index = 0; index < points.length; index += 1) {
    const current = points[index];
    const next = points[(index + 1) % points.length];
    const cross = current[0] * next[1] - next[0] * current[1];
    area += cross;
    x += (current[0] + next[0]) * cross;
    y += (current[1] + next[1]) * cross;
  }
  if (Math.abs(area) < 1e-8) return points.reduce((sum, point) => [sum[0] + point[0] / points.length, sum[1] + point[1] / points.length], [0, 0]);
  return [x / (3 * area), y / (3 * area)];
}

function polygonArea(points) {
  let area = 0;
  for (let index = 0; index < points.length; index += 1) {
    const next = points[(index + 1) % points.length];
    area += points[index][0] * next[1] - next[0] * points[index][1];
  }
  return Math.abs(area) / 2;
}

function pointInPolygon(point, polygon) {
  let inside = false;
  for (let index = 0, previous = polygon.length - 1; index < polygon.length; previous = index++) {
    const a = polygon[index];
    const b = polygon[previous];
    const intersects = ((a[1] > point[1]) !== (b[1] > point[1]))
      && point[0] < (b[0] - a[0]) * (point[1] - a[1]) / (b[1] - a[1] || 1e-9) + a[0];
    if (intersects) inside = !inside;
  }
  return inside;
}

function geometryPoints(element, project) {
  if (!Array.isArray(element.geometry)) return [];
  const points = element.geometry.map(({ lat, lon }) => project({ lat, lon }));
  if (points.length > 1 && sqDistance(points[0], points[points.length - 1]) < 1e-8) points.pop();
  return points;
}

function roadClass(tags) {
  if (tags.railway) return "rail";
  if (["motorway", "trunk", "primary"].includes(tags.highway)) return "arterial";
  if (["secondary", "tertiary"].includes(tags.highway)) return "collector";
  if (["footway", "path", "cycleway", "pedestrian", "steps"].includes(tags.highway)) return "path";
  return "local";
}

async function fetchOverpass(center) {
  const latDelta = (RADIUS_METRES + 100) / 110574;
  const lonDelta = (RADIUS_METRES + 100) / (111320 * Math.cos(center.lat * Math.PI / 180));
  const bbox = `${center.lat - latDelta},${center.lon - lonDelta},${center.lat + latDelta},${center.lon + lonDelta}`;
  const query = `[out:json][timeout:240];(
    way(${bbox})[building];
    way(${bbox})[highway];
    way(${bbox})[railway];
    way(${bbox})[waterway];
    way(${bbox})[natural~"^(water|wood)$"];
    node(${bbox})[natural=tree];
    way(${bbox})[landuse~"^(forest|grass|meadow|recreation_ground|village_green|railway)$"];
    way(${bbox})[leisure~"^(park|garden|playground)$"];
  );out tags geom;`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    body: new URLSearchParams({ data: query }),
  };
  const endpoints = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.nchc.org.tw/api/interpreter",
  ];
  let lastError;
  for (const endpoint of endpoints) {
    try {
      return await fetchJSON(endpoint, options);
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError;
}

function fetchOverture(center) {
  const latDelta = (RADIUS_METRES + 100) / 110574;
  const lonDelta = (RADIUS_METRES + 100) / (111320 * Math.cos(center.lat * Math.PI / 180));
  const output = resolve(temp, "overture-buildings.geojson");
  const bbox = [center.lon - lonDelta, center.lat - latDelta, center.lon + lonDelta, center.lat + latDelta].join(",");
  execFileSync("uvx", [
    "overturemaps", "download",
    "--bbox", bbox,
    "-f", "geojson",
    "-t", "building",
    "-r", OVERTURE_RELEASE,
    "-o", output,
  ], { stdio: ["ignore", "ignore", "inherit"], timeout: 240000 });
  return JSON.parse(readFileSync(output, "utf8"));
}

function overtureIndex(collection, project) {
  return collection.features.flatMap((feature) => {
    const geometry = feature.geometry;
    const ring = geometry?.type === "Polygon" ? geometry.coordinates?.[0] : geometry?.type === "MultiPolygon" ? geometry.coordinates?.[0]?.[0] : null;
    if (!ring?.length) return [];
    const footprint = ring.map(([lon, lat]) => project({ lon, lat }));
    if (sqDistance(footprint[0], footprint[footprint.length - 1]) < 1e-8) footprint.pop();
    if (footprint.length < 3) return [];
    return [{
      centroid: polygonCentroid(footprint),
      area: polygonArea(footprint),
      height: Number(feature.properties?.height) || null,
      levels: Number(feature.properties?.num_floors) || null,
    }];
  });
}

function matchOverture(footprint, candidates) {
  const centroid = polygonCentroid(footprint);
  const area = polygonArea(footprint);
  let best = null;
  let bestDistance = Infinity;
  for (const candidate of candidates) {
    const distance = sqDistance(centroid, candidate.centroid);
    const ratio = area / Math.max(candidate.area, 1e-6);
    if (distance < .12 ** 2 && ratio > .45 && ratio < 2.2 && distance < bestDistance) {
      best = candidate;
      bestDistance = distance;
    }
  }
  return best;
}

function estimatedLevels(tags, areaSquareUnits) {
  if (["garage", "garages", "shed", "roof", "carport", "service"].includes(tags.building)) return 1;
  if (["school", "kindergarten", "commercial", "retail", "civic"].includes(tags.building)) return 4;
  if (tags.landuse === "railway") return 2;
  const squareMetres = areaSquareUnits / (UNITS_PER_METRE ** 2);
  return squareMetres > 900 ? 8 : squareMetres > 350 ? 5 : 3;
}

function updatePrivateMarker(homeBuildingIndex) {
  const raw = readFileSync(PRIVATE_MARKER_ENV, "utf8").trim();
  const separator = raw.indexOf("=");
  const key = raw.slice(0, separator);
  const marker = JSON.parse(raw.slice(separator + 1));
  marker.buildingIndex = homeBuildingIndex;
  writeFileSync(PRIVATE_MARKER_ENV, `${key}=${JSON.stringify(marker)}\n`);
}

async function main() {
  const [center, home] = await Promise.all([geocode(PROJECT_QUERY), geocode(HOME_QUERY)]);
  const project = projector(center);
  const homePoint = project(home);
  const [overpass, rain] = await Promise.all([
    fetchOverpass(center),
    fetchJSON("https://api-open.data.gov.sg/v2/real-time/api/rainfall").catch(() => null),
  ]);
  const overture = fetchOverture(center);
  const overtureBuildings = overtureIndex(overture, project);

  const rawBuildings = [];
  const roads = [];
  const rails = [];
  const waterLines = [];
  const waterAreas = [];
  const greenAreas = [];
  const railAreas = [];
  const trees = [];

  for (const element of overpass.elements || []) {
    const tags = element.tags || {};
    if (element.type === "node" && tags.natural === "tree") {
      const point = project({ lat: element.lat, lon: element.lon });
      if (Math.hypot(...point) <= RADIUS_METRES * UNITS_PER_METRE) trees.push(point);
      continue;
    }
    const points = geometryPoints(element, project);
    if (points.length < 2) continue;
    const isClosed = points.length >= 3 && element.geometry?.length > points.length;
    if (tags.building && isClosed) {
      const footprint = simplify(points, .002);
      const centroid = polygonCentroid(footprint);
      if (Math.hypot(...centroid) <= RADIUS_METRES * UNITS_PER_METRE + .8) rawBuildings.push({ osmId: element.id, tags, footprint });
      continue;
    }
    if (tags.highway) roads.push({ class: roadClass(tags), points: simplify(points, .008) });
    if (tags.railway && tags.railway !== "abandoned") rails.push({ class: tags.railway, points: simplify(points, .006) });
    if (tags.waterway && !isClosed) waterLines.push({ class: tags.waterway, points: simplify(points, .008) });
    if (isClosed && (tags.natural === "water" || tags.water || tags.waterway === "riverbank")) waterAreas.push(simplify(points, .004));
    if (isClosed && (tags.natural === "wood" || ["forest", "grass", "meadow", "recreation_ground", "village_green"].includes(tags.landuse) || ["park", "garden", "playground"].includes(tags.leisure))) greenAreas.push(simplify(points, .006));
    if (isClosed && tags.landuse === "railway") railAreas.push(simplify(points, .006));
  }

  rawBuildings.sort((a, b) => a.osmId - b.osmId);
  const buildings = rawBuildings.map(({ tags, footprint }) => {
    const area = polygonArea(footprint);
    const matched = matchOverture(footprint, overtureBuildings);
    const osmHeight = parseNumber(tags.height);
    const osmLevels = parseNumber(tags["building:levels"]);
    const measuredHeight = osmHeight || matched?.height || null;
    const measuredLevels = osmLevels || matched?.levels || null;
    const levels = Math.max(1, Math.round(measuredLevels || (measuredHeight ? measuredHeight / 3 : estimatedLevels(tags, area))));
    const heightMetres = measuredHeight || levels * 3;
    return {
      footprint,
      height: round(heightMetres * UNITS_PER_METRE),
      levels,
      heightSource: osmHeight || matched?.height ? "measured" : osmLevels || matched?.levels ? "levels" : "estimated",
      kind: tags.building === "apartments" || levels >= 10 ? "tower" : tags.building === "school" ? "school" : tags.building === "commercial" || tags.building === "retail" ? "commercial" : "low-rise",
    };
  });

  let homeBuildingIndex = buildings.findIndex((building) => pointInPolygon(homePoint, building.footprint));
  if (homeBuildingIndex < 0) {
    homeBuildingIndex = buildings.reduce((best, building, index) => sqDistance(homePoint, polygonCentroid(building.footprint)) < sqDistance(homePoint, polygonCentroid(buildings[best].footprint)) ? index : best, 0);
  }
  if (HOME_LEVELS > 0) {
    buildings[homeBuildingIndex].levels = HOME_LEVELS;
    buildings[homeBuildingIndex].height = round(HOME_LEVELS * 3 * UNITS_PER_METRE);
    // Keep the source class non-identifying in the public model. The precise
    // footprint selection belongs only in the gated marker secret.
    buildings[homeBuildingIndex].heightSource = "levels";
  }

  const model = {
    schema: 1,
    radius: RADIUS_METRES * UNITS_PER_METRE,
    unitsPerMetre: UNITS_PER_METRE,
    generated: DATA_DATE,
    attribution: {
      footprints: "Overture Maps Foundation and OpenStreetMap contributors",
      projectGeometry: "HDB Bishan Ridges site plan (1 February 2021)",
      licence: "ODbL 1.0 / Singapore Open Data Licence 1.0",
    },
    buildings,
    roads,
    rails,
    waterLines,
    waterAreas,
    greenAreas,
    railAreas,
    trees,
    landmarks: {
      depot: railAreas.length ? polygonCentroid(railAreas.reduce((largest, area) => polygonArea(area) > polygonArea(largest) ? area : largest)) : [6.5, -5],
      rainGauge: (() => {
        const station = rain?.data?.stations?.find((item) => item.id === "S217");
        return station?.location ? project({ lat: station.location.latitude, lon: station.location.longitude }) : [0, 0];
      })(),
    },
  };

  writeFileSync(OUTPUT, `${JSON.stringify(model)}\n`);
  updatePrivateMarker(homeBuildingIndex);
  console.log(`Neighbourhood model: ${buildings.length} buildings, ${roads.length} roads, ${rails.length} rail lines, ${waterAreas.length + waterLines.length} water features, ${greenAreas.length} green areas.`);
  console.log(`Private home marker linked to one of ${buildings.length} anonymous building footprints.`);
}

try {
  await main();
} finally {
  rmSync(temp, { recursive: true, force: true });
}
