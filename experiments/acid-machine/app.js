const STEPS = 16;
const NOTE_NAMES = ['C2','C#2','D2','D#2','E2','F2','F#2','G2','G#2','A2','A#2','B2','C3','C#3','D3','D#3','E3','F3','F#3','G3','G#3','A3','A#3','B3','C4'];
const SCALE = ['C2','D#2','F2','G2','A#2','C3','D#3','F3','G3','A#3'];
const DRUMS = ['KICK','SNARE','CH','OH'];
const PCF_PATTERNS = [
  {name:'QUARTERS', values:[1,0,0,0, .85,0,0,0, 1,0,0,0, .72,0,0,0]},
  {name:'EIGHTHS', values:[1,0,.65,0, .9,0,.55,0, 1,0,.72,0, .86,0,.5,0]},
  {name:'SIXTEENTHS', values:[1,.42,.72,.32, .9,.48,.7,.36, 1,.38,.78,.28, .86,.52,.68,.34]},
  {name:'OFFBEAT', values:[0,.9,0,.55, 0,1,0,.48, 0,.82,0,.62, 0,1,0,.44]},
  {name:'PUMP', values:[1,.12,.22,.48, 1,.1,.3,.62, 1,.12,.2,.5, 1,.08,.36,.7]},
  {name:'SYNCOPATED', values:[1,0,.72,0, 0,.92,0,.38, .8,0,0,.62, 0,1,.28,0]},
  {name:'TRIPLET-ISH', values:[1,0,0,.74, 0,0,.52,0, 0,1,0,0, .68,0,0,.42]},
  {name:'RISE', values:[.08,.12,.18,.26, .36,.48,.62,.78, .96,.78,.6,.45, .32,.22,.14,.08]},
  {name:'UP / DOWN', values:[.18,.34,.52,.72, .94,.72,.52,.34, .18,.36,.58,.88, .66,.44,.28,.14]},
  {name:'BROKEN', values:[1,0,.18,.78, 0,.52,0,1, .26,0,.82,0, .46,.94,0,.3]},
  {name:'STUTTER', values:[1,.95,.82,0, 0,.8,.72,.64, 0,0,1,.9, .8,.7,.6,0]},
  {name:'CHAOS', values:[.92,.18,.7,0, .42,1,.12,.78, .25,.6,0,.88, .52,.08,.72,.34]}
];

const defaultPattern = {
  acid: Array.from({length: STEPS}, (_, i) => ({
    on: [0,2,3,6,8,10,12,15].includes(i),
    note: ['C2','C3','D#2','F2','G2','A#2','C3','G2','C2','D#2','F2','G2','A#2','C3','D#3','G2'][i],
    accent: [0,3,8,12].includes(i),
    slide: [2,10,15].includes(i)
  })),
  drums: {
    KICK: Array.from({length: STEPS}, (_, i) => [0,4,8,12,14].includes(i)),
    SNARE: Array.from({length: STEPS}, (_, i) => [4,12].includes(i)),
    CH: Array.from({length: STEPS}, (_, i) => i % 2 === 0),
    OH: Array.from({length: STEPS}, (_, i) => [6,14].includes(i))
  }
};

let pattern = loadPattern() || structuredClone(defaultPattern);
let audio = null;
let isPlaying = false;
let currentStep = 0;
let nextNoteTime = 0;
let schedulerTimer = null;
let waveform = localStorage.getItem('pz-acid-wave') || 'sawtooth';
let heldOsc = null;
let heldGain = null;
let heldFilter = null;
let pcfState = {
  on: localStorage.getItem('pz-pcf-on') === 'true',
  patternIndex: Math.max(0, Math.min(PCF_PATTERNS.length - 1, Number(localStorage.getItem('pz-pcf-pattern') || 0))),
  mode: localStorage.getItem('pz-pcf-mode') || 'lowpass',
  route: localStorage.getItem('pz-pcf-route') || 'acid'
};
let mediaRecorder = null;
let recordingChunks = [];
let recordingTimeout = null;
let recordingCountdown = null;
let recordingUrl = null;
let takeAudio = null;

const $ = (id) => document.getElementById(id);
const controls = {
  bpm: $('bpm'), cutoff: $('cutoff'), resonance: $('resonance'), envMod: $('envMod'), decay: $('decay'),
  accentAmount: $('accentAmount'), swing: $('swing'), distortion: $('distortion'), delayMix: $('delayMix'), master: $('master'),
  pcfFreq: $('pcfFreq'), pcfQ: $('pcfQ'), pcfAmount: $('pcfAmount'), pcfDecay: $('pcfDecay')
};

function savePattern() {
  localStorage.setItem('pz-acid-pattern', JSON.stringify(pattern));
}
function loadPattern() {
  try { return JSON.parse(localStorage.getItem('pz-acid-pattern')); } catch { return null; }
}

function noteToHz(note) {
  const m = note.match(/^([A-G])(#?)(\d)$/);
  if (!m) return 130.81;
  const semis = {C:0,D:2,E:4,F:5,G:7,A:9,B:11};
  const midi = (Number(m[3]) + 1) * 12 + semis[m[1]] + (m[2] ? 1 : 0);
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function makeDistortionCurve(amount) {
  const n = 44100;
  const curve = new Float32Array(n);
  const k = amount * 240;
  for (let i = 0; i < n; i++) {
    const x = i * 2 / n - 1;
    curve[i] = (3 + k) * x * 20 * Math.PI / (Math.PI + k * Math.abs(x));
  }
  return curve;
}

function ensureAudio() {
  if (audio) return;
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -8;
  compressor.knee.value = 10;
  compressor.ratio.value = 6;
  compressor.attack.value = 0.005;
  compressor.release.value = 0.12;

  const acidBus = ctx.createGain();
  const drumBus = ctx.createGain();
  const acidPatternFilter = ctx.createBiquadFilter();
  const drumPatternFilter = ctx.createBiquadFilter();
  acidPatternFilter.type = 'lowpass';
  drumPatternFilter.type = 'lowpass';
  acidPatternFilter.frequency.value = 18000;
  drumPatternFilter.frequency.value = 18000;
  acidPatternFilter.Q.value = 0.2;
  drumPatternFilter.Q.value = 0.2;

  const drive = ctx.createWaveShaper();
  drive.oversample = '4x';
  const dry = ctx.createGain();
  const delay = ctx.createDelay(1.0);
  delay.delayTime.value = 0.22;
  const feedback = ctx.createGain();
  feedback.gain.value = 0.32;
  const wet = ctx.createGain();
  const recordDest = ctx.createMediaStreamDestination();

  acidBus.connect(acidPatternFilter).connect(drive);
  drumBus.connect(drumPatternFilter).connect(drive);
  drive.connect(dry);
  drive.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(wet);
  dry.connect(master);
  wet.connect(master);
  master.connect(compressor);
  compressor.connect(ctx.destination);
  compressor.connect(recordDest);

  audio = {ctx, master, compressor, acidBus, drumBus, acidPatternFilter, drumPatternFilter, drive, dry, delay, feedback, wet, recordDest};
  updateAudioParams();
}

function updateAudioParams() {
  if (!audio) return;
  audio.master.gain.setTargetAtTime(Number(controls.master.value), audio.ctx.currentTime, 0.01);
  audio.drive.curve = makeDistortionCurve(Number(controls.distortion.value));
  const mix = Number(controls.delayMix.value);
  audio.dry.gain.setTargetAtTime(1 - mix * 0.55, audio.ctx.currentTime, 0.01);
  audio.wet.gain.setTargetAtTime(mix, audio.ctx.currentTime, 0.01);
  audio.delay.delayTime.setTargetAtTime(60 / Number(controls.bpm.value) * 0.375, audio.ctx.currentTime, 0.01);
  updatePatternFilterBase();
}

function pcfRoutes(kind) {
  return pcfState.route === 'both' || pcfState.route === kind;
}

function configurePatternFilter(filter, routed, now) {
  const active = pcfState.on && routed;
  filter.type = active ? pcfState.mode : 'lowpass';
  const q = Number(controls.pcfQ.value);
  filter.Q.setTargetAtTime(active ? q : 0.2, now, 0.01);
  if (!active) {
    filter.frequency.cancelScheduledValues(now);
    filter.frequency.setTargetAtTime(18000, now, 0.012);
  } else {
    filter.frequency.setTargetAtTime(Number(controls.pcfFreq.value), now, 0.012);
  }
}

function updatePatternFilterBase() {
  if (!audio) return;
  const now = audio.ctx.currentTime;
  configurePatternFilter(audio.acidPatternFilter, pcfRoutes('acid'), now);
  configurePatternFilter(audio.drumPatternFilter, pcfRoutes('drums'), now);
}

function triggerPatternEnvelope(filter, intensity, time) {
  const base = Math.max(80, Number(controls.pcfFreq.value));
  const amount = Number(controls.pcfAmount.value);
  const decay = Number(controls.pcfDecay.value);
  const modeBoost = pcfState.mode === 'bandpass' ? 1.35 : 1;
  const peak = Math.min(18000, base * (1 + intensity * amount * 18 * modeBoost));

  filter.frequency.cancelScheduledValues(time);
  filter.frequency.setValueAtTime(base, time);
  if (intensity > 0.01) {
    filter.frequency.exponentialRampToValueAtTime(Math.max(base + 1, peak), time + 0.006);
    filter.frequency.exponentialRampToValueAtTime(base, time + Math.max(0.018, decay));
  }
}

function schedulePatternFilter(step, time) {
  if (!audio || !pcfState.on) return;
  const intensity = PCF_PATTERNS[pcfState.patternIndex].values[step] || 0;
  if (pcfRoutes('acid')) triggerPatternEnvelope(audio.acidPatternFilter, intensity, time);
  if (pcfRoutes('drums')) triggerPatternEnvelope(audio.drumPatternFilter, intensity, time);
}

function acidNote(step, time, duration) {
  const s = pattern.acid[step];
  if (!s.on) {
    if (heldOsc) releaseHeld(time);
    return;
  }
  const ctx = audio.ctx;
  const freq = noteToHz(s.note);
  const accent = s.accent ? Number(controls.accentAmount.value) : 0;
  const decay = Number(controls.decay.value);
  const cutoff = Number(controls.cutoff.value);
  const envMod = Number(controls.envMod.value);

  if (heldOsc && pattern.acid[(step + STEPS - 1) % STEPS].slide) {
    heldOsc.frequency.exponentialRampToValueAtTime(freq, time + Math.min(0.06, duration * 0.7));
    heldFilter.frequency.cancelScheduledValues(time);
    heldFilter.frequency.setValueAtTime(Math.max(70, heldFilter.frequency.value), time);
    heldFilter.frequency.exponentialRampToValueAtTime(Math.min(12000, cutoff * (1 + envMod * 4.5) * (1 + accent * .45)), time + 0.012);
    heldFilter.frequency.exponentialRampToValueAtTime(Math.max(90, cutoff * .55), time + decay);
    if (!s.slide) releaseHeld(time + duration * 0.88);
    return;
  }

  if (heldOsc) releaseHeld(time);

  const osc = ctx.createOscillator();
  const filter = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  osc.type = waveform;
  osc.frequency.setValueAtTime(freq, time);
  filter.type = 'lowpass';
  filter.Q.value = Number(controls.resonance.value);

  const peak = Math.min(14000, cutoff * (1 + envMod * 5) * (1 + accent * .5));
  filter.frequency.setValueAtTime(Math.max(90, cutoff * .6), time);
  filter.frequency.exponentialRampToValueAtTime(peak, time + 0.01);
  filter.frequency.exponentialRampToValueAtTime(Math.max(90, cutoff * .55), time + decay);

  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.14 + accent * 0.14, time + 0.008);
  if (!s.slide) gain.gain.exponentialRampToValueAtTime(0.0001, time + Math.min(decay + .08, duration * .95));

  osc.connect(filter).connect(gain).connect(audio.acidBus);
  osc.start(time);

  heldOsc = osc; heldGain = gain; heldFilter = filter;
  if (!s.slide) {
    osc.stop(time + Math.max(duration, decay + 0.12));
    setTimeout(() => {
      if (heldOsc === osc) { heldOsc = heldGain = heldFilter = null; }
    }, Math.max(80, (duration + .2) * 1000));
  }
}

function releaseHeld(time) {
  if (!heldOsc) return;
  try {
    heldGain.gain.cancelScheduledValues(time);
    heldGain.gain.setTargetAtTime(0.0001, time, 0.025);
    heldOsc.stop(time + 0.11);
  } catch {}
  heldOsc = heldGain = heldFilter = null;
}

function kick(time, volume) {
  const ctx = audio.ctx;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(145, time);
  osc.frequency.exponentialRampToValueAtTime(46, time + 0.13);
  gain.gain.setValueAtTime(0.55 * volume, time);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);
  osc.connect(gain).connect(audio.drumBus); osc.start(time); osc.stop(time + .24);
}
function noiseBuffer() {
  const ctx = audio.ctx;
  const b = ctx.createBuffer(1, ctx.sampleRate * .5, ctx.sampleRate);
  const data = b.getChannelData(0);
  for (let i=0;i<data.length;i++) data[i] = Math.random()*2-1;
  return b;
}
function snare(time, volume) {
  const ctx = audio.ctx;
  const noise = ctx.createBufferSource(); noise.buffer = noiseBuffer();
  const hp = ctx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=1200;
  const ng = ctx.createGain(); ng.gain.setValueAtTime(.22*volume,time); ng.gain.exponentialRampToValueAtTime(.0001,time+.15);
  noise.connect(hp).connect(ng).connect(audio.drumBus); noise.start(time); noise.stop(time+.18);
  const osc=ctx.createOscillator(), g=ctx.createGain(); osc.type='triangle'; osc.frequency.value=170;
  g.gain.setValueAtTime(.16*volume,time); g.gain.exponentialRampToValueAtTime(.0001,time+.11);
  osc.connect(g).connect(audio.drumBus); osc.start(time); osc.stop(time+.13);
}
function hat(time, volume, open=false) {
  const ctx=audio.ctx;
  const src=ctx.createBufferSource(); src.buffer=noiseBuffer();
  const hp=ctx.createBiquadFilter(); hp.type='highpass'; hp.frequency.value=6200;
  const bp=ctx.createBiquadFilter(); bp.type='bandpass'; bp.frequency.value=9200; bp.Q.value=.8;
  const g=ctx.createGain(); const dur=open?.25:.055;
  g.gain.setValueAtTime((open?.1:.075)*volume,time); g.gain.exponentialRampToValueAtTime(.0001,time+dur);
  src.connect(hp).connect(bp).connect(g).connect(audio.drumBus); src.start(time); src.stop(time+dur+.03);
}

function drumVolume(name) {
  const el = document.querySelector(`[data-volume="${name}"]`);
  return el ? Number(el.value) : 0.8;
}

function scheduleStep(step, time) {
  const sixteenth = 60 / Number(controls.bpm.value) / 4;
  schedulePatternFilter(step, time);
  acidNote(step, time, sixteenth * .96);
  if (pattern.drums.KICK[step]) kick(time, drumVolume('KICK'));
  if (pattern.drums.SNARE[step]) snare(time, drumVolume('SNARE'));
  if (pattern.drums.CH[step]) hat(time, drumVolume('CH'), false);
  if (pattern.drums.OH[step]) hat(time, drumVolume('OH'), true);
  const delayMs = Math.max(0, (time - audio.ctx.currentTime) * 1000);
  setTimeout(() => paintPlayhead(step), delayMs);
}

function nextStepAdvance() {
  const secondsPerBeat = 60 / Number(controls.bpm.value);
  const base = secondsPerBeat / 4;
  const swing = Number(controls.swing.value);
  const stepDuration = currentStep % 2 === 0 ? base * (1 + swing) : base * (1 - swing);
  nextNoteTime += stepDuration;
  currentStep = (currentStep + 1) % STEPS;
}

function scheduler() {
  if (!audio || !isPlaying) return;
  while (nextNoteTime < audio.ctx.currentTime + 0.1) {
    scheduleStep(currentStep, nextNoteTime);
    nextStepAdvance();
  }
}

async function play() {
  ensureAudio();
  if (audio.ctx.state === 'suspended') await audio.ctx.resume();
  if (isPlaying) return;
  isPlaying = true;
  currentStep = 0;
  nextNoteTime = audio.ctx.currentTime + .04;
  schedulerTimer = setInterval(scheduler, 25);
  $('playBtn').setAttribute('aria-pressed','true');
  $('playBtn').textContent='PLAYING';
  $('status').textContent='Running in your browser. Pattern auto-saves.';
}
function stop() {
  isPlaying = false;
  clearInterval(schedulerTimer);
  schedulerTimer = null;
  if (audio) releaseHeld(audio.ctx.currentTime);
  clearPlayhead();
  $('playBtn').setAttribute('aria-pressed','false');
  $('playBtn').textContent='PLAY';
  $('status').textContent='Stopped. Your pattern is saved locally.';
}

function paintPlayhead(step) {
  clearPlayhead();
  document.querySelectorAll(`[data-step="${step}"]`).forEach(el => el.classList.add('playing'));
  document.querySelector(`[data-pcf-step="${step}"]`)?.classList.add('playing');
}
function clearPlayhead() { document.querySelectorAll('.playing').forEach(el => el.classList.remove('playing')); }
