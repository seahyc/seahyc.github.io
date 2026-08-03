import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import {
  DEFAULT_MATERIALS,
  LAYERS,
  MATERIAL_PRESETS,
  NODE_BY_PATH,
  SCENARIOS,
  TWIN_NODES,
  WAYPOINTS,
} from "./twinData";
import type { AssetOverride, InventoryRecord, PersistedTwinState, TwinLayer } from "./types";

type Panel = "explore" | "style" | "layers" | "inventory" | "provenance";
type Movement = "forward" | "back" | "left" | "right" | "turnLeft" | "turnRight";

const TwinScene = lazy(() => import("./TwinScene").then((module) => ({ default: module.TwinScene })));

const STORAGE_KEY = "reno_twin_state_v1";
const DEFAULT_OPEN: Record<string, boolean> = {};
const DEFAULT_LAYERS = Object.fromEntries(LAYERS.map(({ id }) => [id, true])) as Record<TwinLayer, boolean>;

const loadPersisted = (): PersistedTwinState => {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null") as Partial<PersistedTwinState> | null;
    if (parsed?.version === 1 && parsed.materials && parsed.scenario) {
      return {
        version: 1,
        materials: { ...DEFAULT_MATERIALS, ...parsed.materials },
        scenario: parsed.scenario,
        openObjects: parsed.openObjects ?? {},
        hiddenObjects: parsed.hiddenObjects ?? {},
        assetOverrides: parsed.assetOverrides ?? {},
      };
    }
  } catch {
    // An invalid local record should never prevent the public twin loading.
  }
  return { version: 1, materials: DEFAULT_MATERIALS, scenario: "installed", openObjects: DEFAULT_OPEN, hiddenObjects: {}, assetOverrides: {} };
};

const downloadText = (filename: string, content: string, type: string) => {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
};

const csvCell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;

export function TwinApp() {
  const initial = useMemo(loadPersisted, []);
  const [panel, setPanel] = useState<Panel>("explore");
  const [ready, setReady] = useState(false);
  const [navigationMode, setNavigationMode] = useState<"orbit" | "walk">("orbit");
  const [layers, setLayers] = useState(DEFAULT_LAYERS);
  const [materials, setMaterials] = useState(initial.materials);
  const [scenario, setScenario] = useState(initial.scenario);
  const [openObjects, setOpenObjects] = useState(initial.openObjects);
  const [hiddenObjects, setHiddenObjects] = useState(initial.hiddenObjects);
  const [assetOverrides, setAssetOverrides] = useState(initial.assetOverrides);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [movement, setMovement] = useState<Movement[]>([]);
  const [waypointRequest, setWaypointRequest] = useState({ id: "overview", sequence: 0 });
  const [query, setQuery] = useState("");
  const [roomFilter, setRoomFilter] = useState("All rooms");
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const state: PersistedTwinState = { version: 1, materials, scenario, openObjects, hiddenObjects, assetOverrides };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      setSavedNotice(true);
      window.setTimeout(() => setSavedNotice(false), 1200);
    }, 180);
    return () => window.clearTimeout(timer);
  }, [assetOverrides, hiddenObjects, materials, openObjects, scenario]);

  const selectedNode = selectedPath ? NODE_BY_PATH.get(selectedPath) : undefined;
  const inventory = useMemo(
    () =>
      TWIN_NODES.flatMap((node) => {
        if (!node.inventory) return [];
        return [{ ...node.inventory, ...assetOverrides[node.path] } as InventoryRecord];
      }),
    [assetOverrides],
  );
  const rooms = useMemo(() => ["All rooms", ...Array.from(new Set(inventory.map((item) => item.room))).sort()], [inventory]);
  const filteredInventory = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return inventory.filter((item) => {
      const matchesRoom = roomFilter === "All rooms" || item.room === roomFilter;
      const haystack = [item.semanticPath, item.room, item.category, item.sku, item.model, item.supplier, item.status, item.condition]
        .join(" ")
        .toLowerCase();
      return matchesRoom && (!needle || haystack.includes(needle));
    });
  }, [inventory, query, roomFilter]);

  const visitWaypoint = (id: string) => {
    setWaypointRequest((request) => ({ id, sequence: request.sequence + 1 }));
  };

  const selectAndLocate = (path: string) => {
    setSelectedPath(path);
    const node = NODE_BY_PATH.get(path);
    const waypoint = WAYPOINTS.find((candidate) => candidate.room === node?.room);
    if (waypoint) visitWaypoint(waypoint.id);
  };

  const toggleObject = (path: string) => {
    setOpenObjects((current) => ({ ...current, [path]: !current[path] }));
  };

  const setAssetOverride = (path: string, patch: AssetOverride) => {
    setAssetOverrides((current) => ({ ...current, [path]: { ...current[path], ...patch } }));
  };

  const exportInventory = (format: "json" | "csv") => {
    if (format === "json") {
      downloadText("532b-reno-twin-inventory.json", JSON.stringify({ schemaVersion: 1, exportedAt: new Date().toISOString(), assets: inventory }, null, 2), "application/json");
      return;
    }
    const fields: Array<keyof InventoryRecord> = [
      "semanticPath",
      "room",
      "category",
      "sku",
      "model",
      "supplier",
      "status",
      "quantity",
      "condition",
      "warrantyUntil",
      "maintenance",
    ];
    const rows = [fields.map(csvCell).join(","), ...inventory.map((item) => fields.map((field) => csvCell(item[field])).join(","))];
    downloadText("532b-reno-twin-inventory.csv", rows.join("\n"), "text/csv;charset=utf-8");
  };

  const beginMovement = (direction: Movement) => setMovement((current) => (current.includes(direction) ? current : [...current, direction]));
  const endMovement = (direction: Movement) => setMovement((current) => current.filter((candidate) => candidate !== direction));

  const activeInventory = selectedNode?.inventory
    ? ({ ...selectedNode.inventory, ...assetOverrides[selectedNode.path] } as InventoryRecord)
    : undefined;

  return (
    <main className="twin-app">
      <header className="topbar">
        <a className="back-link" href="/reno/" aria-label="Back to renovation fieldbook">← <span>Reno hub</span></a>
        <div className="topbar-title">
          <span className="eyebrow">532B · spatial operations model</span>
          <h1>Renovation twin <sup>MVP</sup></h1>
        </div>
        <div className="save-state" role="status"><i className={savedNotice ? "saved" : ""} />{savedNotice ? "Saved locally" : "Local workspace"}</div>
      </header>

      <section className="workspace">
        <div className="viewport-shell">
          <Suspense fallback={null}>
            <TwinScene
              layers={layers}
              materials={materials}
              scenario={scenario}
              navigationMode={navigationMode}
              selectedPath={selectedPath}
            openObjects={openObjects}
            hiddenObjects={hiddenObjects}
              movement={movement}
              waypointRequest={waypointRequest}
              onSelect={setSelectedPath}
              onToggleObject={toggleObject}
              onReady={() => setReady(true)}
            />
          </Suspense>
          {!ready && <div className="loading-card"><span />Building semantic scene…</div>}
          <div className="viewport-tools">
            <div className="segmented" aria-label="Navigation mode">
              <button className={navigationMode === "orbit" ? "active" : ""} onClick={() => setNavigationMode("orbit")}>Orbit</button>
              <button className={navigationMode === "walk" ? "active" : ""} onClick={() => {
                setNavigationMode("walk");
                if (waypointRequest.id === "overview") visitWaypoint("living");
              }}>Walk</button>
            </div>
            <button className="icon-button" onClick={() => visitWaypoint("overview")} aria-label="Reset to overview">⌂</button>
          </div>
          <div className="model-caveat"><span>Provisional shell</span> Diagrammatic geometry; object records carry their own provenance.</div>
          {navigationMode === "walk" && (
            <div className="walk-controls" aria-label="Walkthrough controls">
              <button className="turn" aria-label="Turn left" onPointerDown={() => beginMovement("turnLeft")} onPointerUp={() => endMovement("turnLeft")} onPointerCancel={() => endMovement("turnLeft")}>↶</button>
              <div className="move-pad">
                <button aria-label="Move forward" onPointerDown={() => beginMovement("forward")} onPointerUp={() => endMovement("forward")} onPointerCancel={() => endMovement("forward")}>↑</button>
                <button aria-label="Move left" onPointerDown={() => beginMovement("left")} onPointerUp={() => endMovement("left")} onPointerCancel={() => endMovement("left")}>←</button>
                <button aria-label="Move backward" onPointerDown={() => beginMovement("back")} onPointerUp={() => endMovement("back")} onPointerCancel={() => endMovement("back")}>↓</button>
                <button aria-label="Move right" onPointerDown={() => beginMovement("right")} onPointerUp={() => endMovement("right")} onPointerCancel={() => endMovement("right")}>→</button>
              </div>
              <button className="turn" aria-label="Turn right" onPointerDown={() => beginMovement("turnRight")} onPointerUp={() => endMovement("turnRight")} onPointerCancel={() => endMovement("turnRight")}>↷</button>
            </div>
          )}
        </div>

        <aside className="control-deck">
          <nav className="panel-tabs" aria-label="Twin tools">
            {(["explore", "style", "layers", "inventory", "provenance"] as Panel[]).map((id) => (
              <button key={id} className={panel === id ? "active" : ""} onClick={() => setPanel(id)}>
                <span>{id === "explore" ? "⌁" : id === "style" ? "◐" : id === "layers" ? "▱" : id === "inventory" ? "▦" : "ⓘ"}</span>
                {id === "inventory" ? "Assets" : id}
              </button>
            ))}
          </nav>

          <div className="panel-scroll">
            {panel === "explore" && (
              <div className="panel-content">
                <section className="control-section intro-section">
                  <span className="section-kicker">Navigate</span>
                  <h2>Move through the project record</h2>
                  <p>Orbit for the model overview. Walk uses WASD or the touch pad and blocks movement through major furniture volumes.</p>
                  <div className="waypoint-grid">
                    {WAYPOINTS.map((waypoint) => <button key={waypoint.id} className={waypointRequest.id === waypoint.id ? "active" : ""} onClick={() => visitWaypoint(waypoint.id)}>{waypoint.label}</button>)}
                  </div>
                </section>
                <section className="control-section">
                  <span className="section-kicker">Furniture variant</span>
                  <h3>Layout scenarios</h3>
                  <div className="option-stack">
                    {SCENARIOS.map((item) => (
                      <button key={item.id} className={`option-row ${scenario === item.id ? "active" : ""}`} onClick={() => setScenario(item.id)}>
                        <span><b>{item.label}</b><small>{item.description}</small></span><i />
                      </button>
                    ))}
                  </div>
                </section>
                <section className="control-section hint-card">
                  <b>Try the built-ins</b>
                  <p>Tap the kitchen cabinet or bedroom wardrobe in the model, then use the inspector to open or close it.</p>
                  <button onClick={() => selectAndLocate("/World/Carpentry/Kitchen/CabinetSet_A")}>Find kitchen cabinet →</button>
                </section>
              </div>
            )}

            {panel === "style" && (
              <div className="panel-content">
                <section className="control-section intro-section"><span className="section-kicker">Material variants</span><h2>Test the palette in context</h2><p>These are visualization presets, not recorded selections or supplier specifications.</p></section>
                {(Object.keys(MATERIAL_PRESETS) as Array<keyof typeof MATERIAL_PRESETS>).map((kind) => (
                  <section className="control-section" key={kind}>
                    <h3>{kind === "furniture" ? "Selected upholstery" : kind[0].toUpperCase() + kind.slice(1)}</h3>
                    <div className="swatch-grid">
                      {MATERIAL_PRESETS[kind].map((preset) => (
                        <button
                          key={preset.id}
                          className={materials[kind] === preset.id ? "active" : ""}
                          onClick={() => setMaterials((current) => ({ ...current, [kind]: preset.id }))}
                          aria-label={`${kind}: ${preset.label}`}
                        >
                          <i style={{ background: preset.color }} />
                          <span>{preset.label}</span>
                        </button>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            )}

            {panel === "layers" && (
              <div className="panel-content">
                <section className="control-section intro-section"><span className="section-kicker">Scene composition</span><h2>See one system at a time</h2><p>Layers mirror an OpenUSD-style scene graph while the runtime stays lightweight and web-native.</p></section>
                <section className="control-section layer-list">
                  {LAYERS.map((layer) => (
                    <label key={layer.id}>
                      <span><b>{layer.label}</b><small>{layer.short}</small></span>
                      <input type="checkbox" checked={layers[layer.id]} onChange={() => setLayers((current) => ({ ...current, [layer.id]: !current[layer.id] }))} />
                      <i />
                    </label>
                  ))}
                </section>
                <section className="control-section"><button className="secondary-button" onClick={() => setLayers(DEFAULT_LAYERS)}>Show all layers</button></section>
              </div>
            )}

            {panel === "inventory" && (
              <div className="panel-content inventory-panel">
                <section className="control-section intro-section">
                  <span className="section-kicker">Inventory & asset register</span>
                  <div className="inventory-heading"><h2>{filteredInventory.length} <small>of {inventory.length} assets</small></h2><span>Local MVP</span></div>
                  <p>Search, update public-safe status fields, and export. Changes stay in this browser only.</p>
                  <input className="search-input" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search model, SKU, supplier…" aria-label="Search inventory" />
                  <select value={roomFilter} onChange={(event) => setRoomFilter(event.target.value)} aria-label="Filter inventory by room">
                    {rooms.map((room) => <option key={room}>{room}</option>)}
                  </select>
                  <div className="export-row"><button onClick={() => exportInventory("json")}>Export JSON</button><button onClick={() => exportInventory("csv")}>Export CSV</button></div>
                </section>
                <section className="asset-list" aria-label="Assets">
                  {filteredInventory.map((item) => (
                    <button key={item.semanticPath} className={selectedPath === item.semanticPath ? "active" : ""} onClick={() => selectAndLocate(item.semanticPath)}>
                      <span className={`asset-status ${item.status}`} />
                      <span><b>{item.model}</b><small>{item.room} · {item.category}</small><code>{item.semanticPath}</code></span>
                      <em>{item.quantity}</em>
                    </button>
                  ))}
                  {!filteredInventory.length && <p className="empty-state">No assets match this filter.</p>}
                </section>
              </div>
            )}

            {panel === "provenance" && (
              <div className="panel-content">
                <section className="control-section intro-section"><span className="section-kicker">Trust & provenance</span><h2>What this twin knows—and what it does not</h2><p>Every semantic object carries a source and confidence. No budget, invoice, owner email, secret, or private source document is shipped here.</p></section>
                <section className="control-section provenance-key">
                  <div><i className="confirmed" /><span><b>Confirmed</b><small>Direct chat decision or explicit project fact</small></span></div>
                  <div><i className="reference" /><span><b>Reference</b><small>Current record or observed condition</small></span></div>
                  <div><i className="provisional" /><span><b>Provisional</b><small>Diagrammatic placement pending as-built measure</small></span></div>
                </section>
                <section className="control-section source-card">
                  <h3>Governing public attribution</h3>
                  <dl><div><dt>Interior / main contractor</dt><dd>Comfort Home Interior · CP</dd></div><div><dt>Electrical</dt><dd>Voltz Solution · Ah Wen</dd></div><div><dt>Lighting supplier</dt><dd>Focus de Lightings</dd></div></dl>
                </section>
                <section className="control-section source-card">
                  <h3>Spatial confidence</h3>
                  <p>The room topology and object placement are a provisional whole-home reconstruction for interaction design. Drawings inform intent but do not override chat-confirmed values. Only the study’s 3294 mm usable wall and 2036 mm depth-plus-walkway budget are presented numerically here, cited to CP on 11 and 18 Jun 2026.</p>
                </section>
              </div>
            )}
          </div>

          {selectedNode && (
            <section className="object-inspector" aria-label="Selected object inspector">
              <button className="inspector-close" onClick={() => setSelectedPath(null)} aria-label="Close object inspector">×</button>
              <span className="section-kicker">Object inspector · {selectedNode.recordState}</span>
              <h3>{selectedNode.name}</h3>
              <code>{selectedNode.path}</code>
              <div className="object-meta"><span>{selectedNode.room}</span><span>{selectedNode.category}</span><span>{selectedNode.layer}</span></div>
              {selectedNode.interactive === "cabinet" && <button className="primary-button" onClick={() => toggleObject(selectedNode.path)}>{openObjects[selectedNode.path] ? "Close doors & drawer" : "Open doors & drawer"}</button>}
              {selectedNode.layer === "furniture" && <button className="primary-button" onClick={() => setHiddenObjects((current) => ({ ...current, [selectedNode.path]: !current[selectedNode.path] }))}>{hiddenObjects[selectedNode.path] ? "Show in scene" : "Hide from scene"}</button>}
              {selectedNode.issue && <a className="issue-link" href={selectedNode.issue.href}><span>Field note</span><b>{selectedNode.issue.title} →</b><small>{selectedNode.issue.summary}</small></a>}
              {activeInventory && (
                <>
                  <dl className="asset-details"><div><dt>Model</dt><dd>{activeInventory.model}</dd></div><div><dt>SKU</dt><dd>{activeInventory.sku}</dd></div><div><dt>Supplier</dt><dd>{activeInventory.supplier}</dd></div><div><dt>Warranty</dt><dd>{activeInventory.warrantyUntil}</dd></div><div><dt>Reference</dt><dd>{selectedNode.reference}</dd></div></dl>
                  <div className="asset-editor">
                    <label>Status<select value={activeInventory.status} onChange={(event) => setAssetOverride(selectedNode.path, { status: event.target.value as InventoryRecord["status"] })}><option>planned</option><option>ordered</option><option>installed</option><option>attention</option></select></label>
                    <label>Condition<select value={activeInventory.condition} onChange={(event) => setAssetOverride(selectedNode.path, { condition: event.target.value as InventoryRecord["condition"] })}><option>new</option><option>good</option><option>inspect</option></select></label>
                    <label>Quantity<input type="number" min="0" max="999" value={activeInventory.quantity} onChange={(event) => setAssetOverride(selectedNode.path, { quantity: Number(event.target.value) })} /></label>
                    <label className="maintenance-field">Maintenance note<input value={activeInventory.maintenance} onChange={(event) => setAssetOverride(selectedNode.path, { maintenance: event.target.value })} /></label>
                  </div>
                </>
              )}
              <details><summary>Provenance ({selectedNode.provenance.length})</summary>{selectedNode.provenance.map((source) => <div className="provenance-row" key={`${source.label}-${source.detail}`}><i className={source.confidence} /><span><b>{source.label}</b><small>{source.detail}</small></span></div>)}</details>
            </section>
          )}
        </aside>
      </section>
    </main>
  );
}
