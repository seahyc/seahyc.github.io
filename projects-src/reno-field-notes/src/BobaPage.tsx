import { useCallback, useMemo, useRef, useState } from "react";
import { BobaScene } from "./BobaScene";
import type { Dimensions, SceneMode, Sequence, SequenceUpdate } from "./BobaScene";

const INITIAL_DIMENSIONS: Dimensions = {
  globeDiameter: 130,
  collarDiameter: 85,
  collarDepth: 15,
  collarGripWidth: 10,
  wallClearance: 5,
  threadDiameter: 60,
  threadPitch: 2,
  threadLength: 11,
  misalignment: 3.5,
  pierClearWidth: 220,
  ledgeProjection: 12,
  toolClearance: 7,
};

const MODES: Array<{ id: SceneMode; label: string }> = [
  { id: "aligned", label: "Aligned" },
  { id: "jammed", label: "Jammed" },
  { id: "exploded", label: "Exploded" },
  { id: "strap", label: "Strap alone" },
  { id: "tool", label: "Forward tool" },
];

const MODE_COPY: Record<SceneMode, string> = {
  aligned: "The axes coincide, so rotation becomes smooth axial travel and the collar seats evenly.",
  jammed: "The female collar is tilted onto a false thread path. It can rotate through a rough middle range, then opposing crests wedge as removal continues.",
  exploded: "The glass and metal collar form one rotating assembly. The wall plate, male thread, socket and bulb remain fixed behind it.",
  strap: "A removable narrow strap can wrap around the collar, but its handle still has to sweep within roughly 5mm of the limewash. This is the ergonomic failure.",
  tool: "A removable band closes two rubber-lined split shoes. Four rods carry torque past the globe to a front ring where both hands have clearance.",
};

type Panel = "mechanism" | "tool" | "evidence";

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit = "mm",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (value: number) => void;
}) {
  return (
    <div className="slider">
      <label><span>{label}</span><output>{value.toFixed(step < 1 ? 1 : 0)}{unit}</output></label>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-label={label}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

export function BobaPage() {
  const [mode, setMode] = useState<SceneMode>("jammed");
  const [panel, setPanel] = useState<Panel>("mechanism");
  const [dimensions, setDimensions] = useState(INITIAL_DIMENSIONS);
  const [sequence, setSequence] = useState<Sequence>({ kind: "none", id: 0 });
  const [hud, setHud] = useState<SequenceUpdate>({ visible: false, progress: 0, kicker: "", caption: "" });
  const resetRef = useRef<(() => void) | null>(null);

  const setDimension = useCallback((key: keyof Dimensions, value: number) => {
    setDimensions((current) => ({ ...current, [key]: value }));
  }, []);

  const runSequence = useCallback((kind: "failure" | "tool") => {
    setMode(kind === "failure" ? "jammed" : "tool");
    setPanel(kind === "failure" ? "mechanism" : "tool");
    setSequence((current) => ({ kind, id: current.id + 1 }));
  }, []);

  const onSequenceUpdate = useCallback((update: SequenceUpdate) => setHud(update), []);
  const registerReset = useCallback((reset: () => void) => {
    resetRef.current = reset;
  }, []);

  const specs = useMemo(() => {
    const jawWidth = Math.max(4, dimensions.collarGripWidth - 1.5);
    return {
      jawId: dimensions.collarDiameter + 2,
      jawWidth,
      frontId: dimensions.globeDiameter + dimensions.toolClearance * 2,
      rodLength: 118 - jawWidth / 2,
    };
  }, [dimensions]);

  const chooseMode = (nextMode: SceneMode) => {
    setMode(nextMode);
    setSequence((current) => ({ kind: "none", id: current.id + 1 }));
    setHud((current) => ({ ...current, visible: false }));
  };

  return (
    <main className="app-shell">
      <section className="visual-stage" aria-label="Interactive three-dimensional light mechanism">
        <div className="scene-host">
          <BobaScene
            mode={mode}
            dimensions={dimensions}
            sequence={sequence}
            onSequenceUpdate={onSequenceUpdate}
            registerReset={registerReset}
          />
        </div>

        <header className="stage-header">
          <nav className="scale-backlinks" aria-label="Model scale navigation">
            <a className="site-back" href="/reno/twin/?focus=boba">← Apartment twin</a>
            <a className="site-back secondary" href="/reno/orientation/?view=home">Neighbourhood globe</a>
          </nav>
          <div className="eyebrow">Field note 02 · mobile 3D reconstruction</div>
          <h1>Jammed Boba wall light</h1>
          <p>Drag to orbit. The glass and collar rotate together; the proposed tool grips the collar while moving your hands forward of the globe and ledges.</p>
          <div className="estimate-pills">
            <span>Globe <b>130mm</b></span>
            <span>Collar <b>≈{dimensions.collarDiameter}mm</b></span>
            <span>Grip band <b>≈{dimensions.collarGripWidth}mm</b></span>
            <span>Wall clearance <b>≈{dimensions.wallClearance}mm</b></span>
          </div>
        </header>

        <button className="plain-button view-reset" type="button" onClick={() => resetRef.current?.()}>Reset view</button>

        <div className={`animation-hud ${hud.visible ? "visible" : ""}`} aria-live="polite">
          <small>{hud.kicker}</small>
          <strong>{hud.caption}</strong>
          <div className="progress-track"><i style={{ width: `${Math.round(hud.progress * 100)}%` }} /></div>
        </div>

        <div className="primary-actions" aria-label="Guided animations">
          <button className="action-button" type="button" onClick={() => runSequence("failure")}><span className="action-number">1</span><span>Show the cross-thread bind</span></button>
          <button className="action-button accent" type="button" onClick={() => runSequence("tool")}><span className="action-number">2</span><span>Watch the ergonomic tool</span></button>
        </div>

        <div className="legend" aria-hidden="true">
          <span><i style={{ background: "#f4bd5f" }} />thread</span>
          <span><i style={{ background: "#ff6c65" }} />interference / poor clearance</span>
          <span><i style={{ background: "#63b9ff" }} />printed tool parts</span>
          <span><i style={{ background: "#58daa0" }} />alignment force</span>
        </div>
      </section>

      <aside className="control-panel">
        <nav className="mobile-tabs" aria-label="Model information">
          {(["mechanism", "tool", "evidence"] as Panel[]).map((item) => (
            <button key={item} className={`tab-button ${panel === item ? "active" : ""}`} type="button" onClick={() => setPanel(item)}>
              {item === "mechanism" ? "Why it jams" : item === "tool" ? "The tool" : "Evidence"}
            </button>
          ))}
        </nav>

        <section className={`panel-section ${panel === "mechanism" ? "mobile-active" : ""}`}>
          <h2>Inspect the mechanism</h2>
          <div className="mode-grid">
            {MODES.map((item) => (
              <button key={item.id} className={`mode-button ${mode === item.id ? "active" : ""}`} type="button" onClick={() => chooseMode(item.id)}>{item.label}</button>
            ))}
          </div>
          <p>{MODE_COPY[mode]}</p>
        </section>

        <section className={`panel-section ${panel === "mechanism" ? "mobile-active" : ""}`}>
          <h2>Current assessment</h2>
          <div className="assessment">Three to four outward turns followed by sharply rising friction—and a rough but reversible middle zone—fit a tilted, crossed or locally damaged thread path better than paint adhesion. More torque increases thread contact, so the tool must permit gentle alignment correction.</div>
          <p className="muted">The glass and narrow collar rotate together in use. The spring features visible inside the loose globe appear to retain glass to collar; they are not an accessible wall-side release.</p>
        </section>

        <section className={`panel-section ${panel === "tool" ? "mobile-active" : ""}`}>
          <h2>Why a normal strap is not enough</h2>
          <div className="comparison">
            <div className="comparison-card"><strong>Closed-loop strap <span className="verdict">Cannot install</span></strong><p>A retained loop smaller than the globe cannot pass over the 130mm sphere.</p></div>
            <div className="comparison-card"><strong>Removable narrow strap <span className="verdict">Poor sweep</span></strong><p>It can wrap around the ≈10mm neck, but the wrench body and hand remain almost against the limewash.</p></div>
            <div className="comparison-card"><strong>Open band + forward cage <span className="verdict good">Recommended concept</span></strong><p>The open band supplies compression; printed shoes and standard rods transfer torque to the room side.</p></div>
          </div>
        </section>

        <section className={`panel-section ${panel === "tool" ? "mobile-active" : ""}`}>
          <h2>How to make the modular tool</h2>
          <div className="build-steps">
            <div className="build-step"><b>1</b><div><strong>Print four flat half-rings</strong><p>Two small rubber-lined collar shoes and two larger front half-rings. No deep supported cage print is required.</p></div></div>
            <div className="build-step"><b>2</b><div><strong>Add a separable narrow band</strong><p>Wrap it around the rear shoes after they are placed on the collar. The band never has to pass over the globe.</p></div></div>
            <div className="build-step"><b>3</b><div><strong>Connect with four M5 rods</strong><p>The rods run outside the 65mm sphere radius and place the hand ring roughly 118mm in front of the collar.</p></div></div>
            <div className="build-step"><b>4</b><div><strong>Turn at the front ring</strong><p>One person supports the glass while the operator turns and applies a small corrective alignment force—without sweeping a handle along the wall.</p></div></div>
          </div>
          <div className="spec-grid" style={{ marginTop: 12 }}>
            <div className="spec"><span>Rear jaw ID</span><b>≈{specs.jawId.toFixed(1)}mm</b></div>
            <div className="spec"><span>Rear jaw width</span><b>≤{specs.jawWidth.toFixed(1)}mm</b></div>
            <div className="spec"><span>Front clear ID</span><b>{specs.frontId.toFixed(0)}mm</b></div>
            <div className="spec"><span>Rod centres</span><b>≈{specs.rodLength.toFixed(0)}mm</b></div>
          </div>
          <div className="download-links">
            <a href="/reno/field-notes/boba-light/downloads/deep-collar-socket.scad" download>Download OpenSCAD</a>
            <a href="/reno/field-notes/boba-light/downloads/tool-build-guide.md" target="_blank" rel="noreferrer">Open build guide</a>
          </div>
        </section>

        <section className={`panel-section ${panel === "evidence" ? "mobile-active" : ""}`}>
          <h2>Photographic evidence</h2>
          <div className="evidence-grid">
            <a href="/reno/field-notes/boba-light/installed.jpg" target="_blank"><img loading="lazy" decoding="async" src="/reno/field-notes/boba-light/installed.jpg" alt="Upper Boba globe installed close to the limewash wall" /></a>
            <a href="/reno/field-notes/boba-light/globe-back.jpg" target="_blank"><img loading="lazy" decoding="async" src="/reno/field-notes/boba-light/globe-back.jpg" alt="Rear of the loose Boba globe and collar" /></a>
            <a href="/reno/field-notes/boba-light/collar-detail.jpg" target="_blank"><img loading="lazy" decoding="async" src="/reno/field-notes/boba-light/collar-detail.jpg" alt="Close-up of the globe collar and internal thread" /></a>
            <a href="/reno/field-notes/boba-light/wall-thread.jpg" target="_blank"><img loading="lazy" decoding="async" src="/reno/field-notes/boba-light/wall-thread.jpg" alt="Fixed male thread and bulb socket on the wall" /></a>
          </div>
          <p className="muted"><b>Observed:</b> the lower globe removes easily; the upper globe stops short of the wall when tightened and binds progressively when unscrewed. <b>Inferred:</b> a crossed or misaligned thread is the leading explanation, not a confirmed internal inspection.</p>
        </section>

        <section className={`panel-section ${panel === "evidence" ? "mobile-active" : ""}`}>
          <h2>Owner-memory estimates <span className="confidence">not measured</span></h2>
          <Slider label="Collar outside diameter" value={dimensions.collarDiameter} min={75} max={100} step={1} onChange={(value) => setDimension("collarDiameter", value)} />
          <Slider label="Collar axial depth" value={dimensions.collarDepth} min={11} max={20} step={1} onChange={(value) => setDimension("collarDepth", value)} />
          <Slider label="Grippable metal band" value={dimensions.collarGripWidth} min={6} max={16} step={.5} onChange={(value) => setDimension("collarGripWidth", value)} />
          <Slider label="Clearance at wall" value={dimensions.wallClearance} min={2} max={12} step={.5} onChange={(value) => setDimension("wallClearance", value)} />
          <Slider label="Tool clearance around globe" value={dimensions.toolClearance} min={4} max={14} step={1} onChange={(value) => setDimension("toolClearance", value)} />
        </section>

        <section className={`panel-section ${panel === "evidence" ? "mobile-active" : ""}`}>
          <h2>Internal and site estimates</h2>
          <Slider label="Thread major diameter" value={dimensions.threadDiameter} min={52} max={66} step={.5} onChange={(value) => setDimension("threadDiameter", value)} />
          <Slider label="Cross-thread angle" value={dimensions.misalignment} min={0} max={8} step={.25} unit="°" onChange={(value) => setDimension("misalignment", value)} />
          <Slider label="Clear width between ledges" value={dimensions.pierClearWidth} min={160} max={300} step={2} onChange={(value) => setDimension("pierClearWidth", value)} />
          <Slider label="Ledge projection" value={dimensions.ledgeProjection} min={2} max={30} step={1} onChange={(value) => setDimension("ledgeProjection", value)} />
          <div className="safety">Provisional visualization only. Isolate the circuit, test on the removable lower fitting first, use hand torque only, and stop if the fixed wall base rotates, the collar deforms or the glass makes noise.</div>
        </section>
      </aside>
    </main>
  );
}
