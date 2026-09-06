const STORAGE_KEY = 'coding-practice-sound';
const TOGGLE_ID = 'sound-toggle';
const MIN_GAP_MS = 45;
let audioContext = null;
let lastSoundAt = 0;
let enabled = readEnabled();

function readEnabled() {
  try { return localStorage.getItem(STORAGE_KEY) !== 'off'; }
  catch (_) { return true; }
}

function writeEnabled(value) {
  enabled = value;
  try { localStorage.setItem(STORAGE_KEY, value ? 'on' : 'off'); } catch (_) {}
  syncToggle();
}

function syncToggle() {
  const button = document.getElementById(TOGGLE_ID);
  if (!button) return;
  button.setAttribute('aria-pressed', String(enabled));
  button.textContent = enabled ? 'Sound on' : 'Sound off';
  button.title = enabled ? 'Turn practice sounds off' : 'Turn practice sounds on';
}

function ensureContext() {
  if (!enabled || document.hidden) return null;
  if (!audioContext) {
    try { audioContext = new AudioContext(); } catch (_) { return null; }
  }
  if (audioContext.state === 'suspended') audioContext.resume().catch(() => {});
  return audioContext;
}

function tone(context, frequency, start, duration, volume, type = 'sine') {
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(volume, start + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
  oscillator.connect(gain).connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + duration + 0.02);
}

function play(kind) {
  const context = ensureContext();
  if (!context) return;
  const now = performance.now();
  if (now - lastSoundAt < MIN_GAP_MS) return;
  lastSoundAt = now;
  const start = context.currentTime + 0.003;
  if (kind === 'click') tone(context, 440, start, 0.035, 0.025, 'triangle');
  else if (kind === 'run') {
    tone(context, 330, start, 0.07, 0.022);
    tone(context, 495, start + 0.075, 0.08, 0.018);
  } else if (kind === 'pass') {
    tone(context, 523.25, start, 0.09, 0.025);
    tone(context, 659.25, start + 0.075, 0.09, 0.025);
    tone(context, 783.99, start + 0.15, 0.13, 0.028);
  } else if (kind === 'fail') tone(context, 185, start, 0.075, 0.018, 'triangle');
}

export function feedback(kind) {
  if (kind === 'click') play('click');
  else if (kind === 'run' || kind === 'pass' || kind === 'fail') {
    if (audioContext || (kind === 'run' && navigator.userActivation?.isActive)) play(kind);
  }
}

function install() {
  if (!document.querySelector('header')) return;
  if (!document.getElementById(TOGGLE_ID)) {
    const button = document.createElement('button');
    button.id = TOGGLE_ID;
    button.type = 'button';
    button.className = 'sound-toggle';
    button.setAttribute('aria-pressed', String(enabled));
    button.addEventListener('click', () => {
      const next = !enabled;
      writeEnabled(next);
      if (next) play('click');
    });
    document.querySelector('header').append(button);
  }
  syncToggle();
  document.addEventListener('click', (event) => {
    const element = event.target;
    const target = element && element.closest ? element.closest('button:not(:disabled), .button:not([aria-disabled="true"])') : null;
    if (target && target.id !== TOGGLE_ID && !['run','syntax','main','example-run'].includes(target.id)) feedback('click');
  });
  window.addEventListener('storage', (event) => {
    if (event.key === STORAGE_KEY) { enabled = event.newValue !== 'off'; syncToggle(); }
  });
}

if (typeof document !== 'undefined') install();
