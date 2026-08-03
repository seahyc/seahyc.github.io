import { useCallback, useRef, useState } from "react";
import { ShowerScene } from "./ShowerScene";
import type { ShowerConfig, ShowerHud, ShowerMode, ShowerSequence } from "./ShowerScene";

type Panel = "mechanism" | "evidence" | "checks";

const MODES: Array<{ id: ShowerMode; label: string; copy: string }> = [
  { id: "correct", label: "Correct", copy: "Both G½ outlet axes are parallel and perpendicular to a flat tile plane. Equal 52mm projections let the rigid mixer seat evenly." },
  { id: "outlet-tilt", label: "Outlet axes tilt", copy: "If the final concealed outlet elbows point downward together, the two connectors define a tilted mounting plane. One body edge reaches the tile before the other." },
  { id: "unequal-depth", label: "Unequal depth", copy: "Even straight outlets can yaw the mixer when one connector projects farther than the other. This is front-side setup, not proof of a crooked concealed pipe." },
  { id: "tile-plane", label: "Tile offset", copy: "A proud tile edge, grout ridge or uneven substrate can stop a broad 362mm body from meeting the wall even when the water connections are sound." },
  { id: "cutaway", label: "Cutaway", copy: "Pull the mixer forward and fade the PBU wall to inspect the last elbows, supplied connectors and levelling jig separately." },
];

function Slider({ label, value, min, max, step, unit, onChange }: { label: string; value: number; min: number; max: number; step: number; unit: string; onChange: (value: number) => void }) {
  return <div className="slider"><label><span>{label}</span><output>{value.toFixed(step < 1 ? 1 : 0)}{unit}</output></label><input type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /></div>;
}

export function ShowerPage() {
  const [mode, setMode] = useState<ShowerMode>("outlet-tilt");
  const [panel, setPanel] = useState<Panel>("mechanism");
  const [config, setConfig] = useState<ShowerConfig>({ outletTilt: 6, depthDelta: 6, tileOffset: 5 });
  const [sequence, setSequence] = useState<ShowerSequence>({ kind: "none", id: 0 });
  const [hud, setHud] = useState<ShowerHud>({ visible: false, progress: 0, kicker: "", caption: "" });
  const resetRef = useRef<(() => void) | null>(null);

  const registerReset = useCallback((reset: () => void) => { resetRef.current = reset; }, []);
  const run = (kind: "failure" | "checks") => {
    setMode(kind === "failure" ? "outlet-tilt" : "cutaway");
    setPanel(kind === "failure" ? "mechanism" : "checks");
    setSequence((current) => ({ kind, id: current.id + 1 }));
  };
  const chooseMode = (next: ShowerMode) => {
    setMode(next);
    setSequence((current) => ({ kind: "none", id: current.id + 1 }));
    setHud((current) => ({ ...current, visible: false }));
  };
  const modeCopy = MODES.find((item) => item.id === mode)!.copy;

  return <main className="shower-shell">
    <section className="shower-stage" aria-label="Interactive three-dimensional shower fitting mechanism">
      <div className="shower-scene"><ShowerScene mode={mode} config={config} sequence={sequence} onSequenceUpdate={setHud} registerReset={registerReset} /></div>
      <header className="shower-header">
        <a className="site-back" href="/reno/">← 532B renovation hub</a>
        <div className="eyebrow">Field note 01 · master bathroom · 3 Aug 2026</div>
        <h1>Why the shower mixer sits slanted</h1>
        <p>Drag to orbit. Fade the tiled wall to inspect the two rigid water connections that actually determine whether the 362mm mixer can sit flush.</p>
        <div className="fact-pills"><span>G½ inlets</span><span>150 ±12mm centres</span><span>52 ±1mm projection</span><span>362mm body</span></div>
      </header>
      <button className="plain-button view-reset" type="button" onClick={() => resetRef.current?.()}>Reset view</button>
      <div className={`animation-hud ${hud.visible ? "visible" : ""}`} aria-live="polite"><small>{hud.kicker}</small><strong>{hud.caption}</strong><div className="progress-track"><i style={{ width: `${Math.round(hud.progress * 100)}%` }} /></div></div>
      <div className="primary-actions"><button className="action-button" onClick={() => run("failure")}><span className="action-number">1</span><span>Animate the slanted outlet</span></button><button className="action-button accent" onClick={() => run("checks")}><span className="action-number">2</span><span>Show the check order</span></button></div>
      <div className="legend"><span><i className="hot" />hot · left</span><span><i className="cold" />cold · right</span><span><i className="gap" />visible gap</span><span><i className="jig" />levelling jig</span></div>
    </section>

    <aside className="shower-panel">
      <nav className="mobile-tabs">{(["mechanism", "evidence", "checks"] as Panel[]).map((item) => <button key={item} className={`tab-button ${panel === item ? "active" : ""}`} onClick={() => setPanel(item)}>{item === "mechanism" ? "Mechanism" : item === "evidence" ? "Evidence" : "What to check"}</button>)}</nav>

      <section className={`panel-section ${panel === "mechanism" ? "mobile-active" : ""}`}>
        <h2>Try each geometry</h2>
        <div className="mode-grid">{MODES.map((item) => <button key={item.id} className={`mode-button ${mode === item.id ? "active" : ""}`} onClick={() => chooseMode(item.id)}>{item.label}</button>)}</div>
        <p>{modeCopy}</p>
      </section>
      <section className={`panel-section ${panel === "mechanism" ? "mobile-active" : ""}`}>
        <h2>Leading interpretation</h2>
        <div className="assessment">CP’s explanation is mechanically plausible, but the photo cannot prove what is behind the tile. The important angle is the axis of each final threaded outlet—not whether the hidden pipe run itself happens to slope.</div>
        <p className="muted">A 6° outlet pitch creates roughly a 6.7mm edge-to-edge gap across the 64mm-tall mixer body. That is an illustration, not a measurement from the photograph.</p>
        <Slider label="Outlet-axis pitch" value={config.outletTilt} min={0} max={10} step={.5} unit="°" onChange={(outletTilt) => setConfig((current) => ({ ...current, outletTilt }))} />
        <Slider label="Connector depth difference" value={config.depthDelta} min={0} max={12} step={.5} unit="mm" onChange={(depthDelta) => setConfig((current) => ({ ...current, depthDelta }))} />
        <Slider label="Tile-plane offset" value={config.tileOffset} min={0} max={9} step={.5} unit="mm" onChange={(tileOffset) => setConfig((current) => ({ ...current, tileOffset }))} />
      </section>

      <section className={`panel-section ${panel === "evidence" ? "mobile-active" : ""}`}>
        <h2>What the chat and photos establish</h2>
        <div className="evidence-grid">
          <figure><a href="/reno/field-notes/shower-fitting/observed-master-bath.jpg" target="_blank"><img loading="lazy" decoding="async" src="/reno/field-notes/shower-fitting/observed-master-bath.jpg" alt="Low-angle photo of the master bathroom mixer body standing away from the tiled wall" /></a><figcaption><b>Your photo · 2 Aug.</b> The body is not uniformly flush to the wall.</figcaption></figure>
          <figure><a href="/reno/field-notes/shower-fitting/comparison-other-bto.jpg" target="_blank"><img loading="lazy" decoding="async" src="/reno/field-notes/shower-fitting/comparison-other-bto.jpg" alt="Comparison shower installation supplied by the contractor" /></a><figcaption><b>CP · 3 Aug.</b> Comparison from another BTO, described as a downward-pointing concealed outlet.</figcaption></figure>
          <figure><a href="/reno/field-notes/shower-fitting/product-scale-drawing.jpg" target="_blank"><img loading="lazy" decoding="async" src="/reno/field-notes/shower-fitting/product-scale-drawing.jpg" alt="Hansgrohe Activera S showerpipe scale drawing shared in the renovation chat" /></a><figcaption><b>Sopisa · 27 Apr.</b> Scale drawing matching Hansgrohe Activera S 28638000.</figcaption></figure>
        </div>
      </section>
      <section className={`panel-section ${panel === "evidence" ? "mobile-active" : ""}`}>
        <h2>Source chain</h2>
        <div className="source-list">
          <a href="https://www.hansgrohe.com/articledetail-activera-s-showerpipe-240-1jet-ecosmart-with-showertablet-select-360-varia-28638000" target="_blank" rel="noreferrer"><b>Hansgrohe product record</b><span>G½, 150 ±12mm, exposed mounting, S-connections.</span></a>
          <a href="https://assets.hansgrohe.com/mam/celum/celum_assets/16__hrgh2994_pdf.pdf" target="_blank" rel="noreferrer"><b>Hansgrohe assembly guide · Apr 2026</b><span>Flat wall requirement, 52 ±1mm projection, supplied alignment jig, 4Nm body screws.</span></a>
          <a href="https://www1.bca.gov.sg/growth-and-transformation/productivity/design-for-manufacturing-and-assembly-dfma/prefabricated-bathroom-unit--pbu-/" target="_blank" rel="noreferrer"><b>BCA · Prefabricated Bathroom Units</b><span>Conceptual basis for concealed services behind finished PBU walls.</span></a>
        </div>
      </section>

      <section className={`panel-section ${panel === "checks" ? "mobile-active" : ""}`}>
        <h2>Non-destructive checks first</h2>
        <div className="check-steps">
          <div><b>1</b><p><strong>Release external loads.</strong> Check that the upper riser bracket is not pulling the showerpipe outward or sideways.</p></div>
          <div><b>2</b><p><strong>Remove the mixer body correctly.</strong> A qualified installer can expose the two wall connectors without opening tile.</p></div>
          <div><b>3</b><p><strong>Use the manufacturer geometry.</strong> Verify 150 ±12mm centres, equal 52 ±1mm projections, parallel axes and the supplied levelling jig.</p></div>
          <div><b>4</b><p><strong>Check the tile plane.</strong> Hansgrohe requires an even, smooth fastening surface with no proud seams or tile offset.</p></div>
          <div><b>5</b><p><strong>Only then judge the concealed outlet.</strong> If the female G½ threads themselves point down, ask Hansgrohe and a PUB Licensed Plumber whether the listed ball S-unions or another approved remedial fitting can accommodate it.</p></div>
        </div>
      </section>
      <section className={`panel-section ${panel === "checks" ? "mobile-active" : ""}`}>
        <h2>What silicone does—and does not do</h2>
        <div className="silicone"><b>Useful:</b> closes a splash-water path and visually bridges a small verified gap.<br/><b>Not a geometry fix:</b> it does not realign threads, equalise connector depth, relieve pipe strain or prove the joints are leak-free.</div>
        <p className="muted">Before sealing, confirm the mixer is stable and both inlet joints are dry. Altering concealed potable-water pipework should be assessed by a <a href="https://www.pub.gov.sg/Professionals/Requirements/Licensed-Plumbers/Plumbing-Works" target="_blank" rel="noreferrer">PUB Licensed Plumber</a>; PUB distinguishes simple mixer replacement from regulated pipe alteration.</p>
        <div className="safety">Conceptual reconstruction, not an as-built survey. Do not loosen pressurised fittings or force the glass-topped mixer against tile.</div>
      </section>
    </aside>
  </main>;
}
