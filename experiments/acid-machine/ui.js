function renderStepHeader() {
  $('stepHeader').innerHTML = Array.from({length:STEPS},(_,i)=>`<span class="step-num">${String(i+1).padStart(2,'0')}</span>`).join('');
}
function renderAcid() {
  const wrap=$('acidSequencer');
  wrap.innerHTML='';
  const labels=document.createElement('div'); labels.className='acid-labels'; labels.innerHTML='<span>NOTE</span><span>ON</span><span>ACCENT</span><span>SLIDE</span>';
  const grid=document.createElement('div'); grid.className='acid-grid';
  pattern.acid.forEach((s,i)=>{
    const col=document.createElement('div'); col.className='acid-step'; col.dataset.step=i;
    const select=document.createElement('select'); select.className='note-select'; select.setAttribute('aria-label',`Step ${i+1} note`);
    NOTE_NAMES.forEach(n=>{ const o=document.createElement('option'); o.value=n;o.textContent=n;o.selected=n===s.note;select.appendChild(o); });
    select.addEventListener('change',()=>{s.note=select.value;savePattern();});
    col.appendChild(select);
    [['on','note'],['accent','accent'],['slide','slide']].forEach(([key,cls])=>{
      const b=document.createElement('button'); b.type='button'; b.className=`toggle-cell ${s[key]?'active ':''}${cls}`; b.dataset.step=i;
      b.setAttribute('aria-label',`Step ${i+1} ${key}`); b.setAttribute('aria-pressed',String(s[key]));
      b.addEventListener('click',()=>{ s[key]=!s[key]; b.classList.toggle('active',s[key]); b.setAttribute('aria-pressed',String(s[key])); savePattern(); });
      col.appendChild(b);
    });
    grid.appendChild(col);
  });
  wrap.append(labels,grid);
}
function renderDrums() {
  const wrap=$('drumSequencer'); wrap.innerHTML='';
  const vols={KICK:.88,SNARE:.72,CH:.58,OH:.56};
  DRUMS.forEach(name=>{
    const row=document.createElement('div'); row.className='drum-row';
    const label=document.createElement('div'); label.className='drum-name';
    label.innerHTML=`<span>${name}</span><input class="drum-volume" data-volume="${name}" aria-label="${name} volume" type="range" min="0" max="1" step="0.01" value="${localStorage.getItem('pz-vol-'+name) ?? vols[name]}">`;
    label.querySelector('input').addEventListener('input',e=>localStorage.setItem('pz-vol-'+name,e.target.value));
    const grid=document.createElement('div');grid.className='drum-grid';
    pattern.drums[name].forEach((on,i)=>{
      const b=document.createElement('button'); b.type='button'; b.className=`drum-cell${on?' active':''}`; b.dataset.step=i; b.setAttribute('aria-label',`${name} step ${i+1}`); b.setAttribute('aria-pressed',String(on));
      b.addEventListener('click',()=>{pattern.drums[name][i]=!pattern.drums[name][i];b.classList.toggle('active',pattern.drums[name][i]);b.setAttribute('aria-pressed',String(pattern.drums[name][i]));savePattern();});
      grid.appendChild(b);
    });
    row.append(label,grid); wrap.appendChild(row);
  });
}

function randomize() {
  const tonal = SCALE;
  pattern.acid = Array.from({length:STEPS},(_,i)=>({
    on: Math.random() < ([0,4,8,12].includes(i) ? .72 : .42),
    note: tonal[Math.floor(Math.random()*tonal.length)],
    accent: Math.random()<.22,
    slide: Math.random()<.16
  }));
  pattern.drums.KICK = Array.from({length:STEPS},(_,i)=>Math.random()<([0,4,8,12].includes(i)?.72:.17));
  pattern.drums.SNARE = Array.from({length:STEPS},(_,i)=>[4,12].includes(i)?Math.random()<.92:Math.random()<.08);
  pattern.drums.CH = Array.from({length:STEPS},(_,i)=>Math.random()<(i%2===0?.82:.28));
  pattern.drums.OH = Array.from({length:STEPS},(_,i)=>Math.random()<.12);
  savePattern(); renderAcid(); renderDrums();
  $('status').textContent='New pattern generated.';
}
function clearPattern() {
  pattern.acid.forEach(s=>{s.on=false;s.accent=false;s.slide=false;});
  DRUMS.forEach(n=>pattern.drums[n].fill(false));
  savePattern(); renderAcid(); renderDrums();
  $('status').textContent='Pattern cleared.';
}

function renderPatternFilterUI() {
  const pattern = PCF_PATTERNS[pcfState.patternIndex];
  $('pcfToggle').setAttribute('aria-pressed', String(pcfState.on));
  $('pcfToggle').textContent = pcfState.on ? 'ON' : 'OFF';
  $('pcfPatternLabel').textContent = `${String(pcfState.patternIndex + 1).padStart(2,'0')} · ${pattern.name}`;
  document.querySelectorAll('.pcf-mode').forEach(btn => btn.classList.toggle('active', btn.dataset.pcfMode === pcfState.mode));
  document.querySelectorAll('.pcf-route').forEach(btn => btn.classList.toggle('active', btn.dataset.pcfRoute === pcfState.route));
  $('pcfPatternStrip').innerHTML = pattern.values.map((v,i) => `<i data-pcf-step="${i}" style="--level:${Math.max(.06,v)}"></i>`).join('');
}

function savePatternFilterState() {
  localStorage.setItem('pz-pcf-on', String(pcfState.on));
  localStorage.setItem('pz-pcf-pattern', String(pcfState.patternIndex));
  localStorage.setItem('pz-pcf-mode', pcfState.mode);
  localStorage.setItem('pz-pcf-route', pcfState.route);
}

function setupPatternFilterUI() {
  renderPatternFilterUI();
  $('pcfToggle').addEventListener('click', () => {
    pcfState.on = !pcfState.on;
    savePatternFilterState();
    renderPatternFilterUI();
    ensureAudio();
    updatePatternFilterBase();
    $('status').textContent = `Pattern Filter ${pcfState.on ? 'on' : 'off'}.`;
  });
  $('pcfPrev').addEventListener('click', () => {
    pcfState.patternIndex = (pcfState.patternIndex - 1 + PCF_PATTERNS.length) % PCF_PATTERNS.length;
    savePatternFilterState(); renderPatternFilterUI();
    $('status').textContent = `Filter pattern ${String(pcfState.patternIndex + 1).padStart(2,'0')}: ${PCF_PATTERNS[pcfState.patternIndex].name}.`;
  });
  $('pcfNext').addEventListener('click', () => {
    pcfState.patternIndex = (pcfState.patternIndex + 1) % PCF_PATTERNS.length;
    savePatternFilterState(); renderPatternFilterUI();
    $('status').textContent = `Filter pattern ${String(pcfState.patternIndex + 1).padStart(2,'0')}: ${PCF_PATTERNS[pcfState.patternIndex].name}.`;
  });
  document.querySelectorAll('.pcf-mode').forEach(btn => btn.addEventListener('click', () => {
    pcfState.mode = btn.dataset.pcfMode;
    savePatternFilterState(); renderPatternFilterUI(); ensureAudio(); updatePatternFilterBase();
    $('status').textContent = `Pattern Filter mode: ${pcfState.mode === 'lowpass' ? 'LP' : 'BP'}.`;
  }));
  document.querySelectorAll('.pcf-route').forEach(btn => btn.addEventListener('click', () => {
    pcfState.route = btn.dataset.pcfRoute;
    savePatternFilterState(); renderPatternFilterUI(); ensureAudio(); updatePatternFilterBase();
    $('status').textContent = `Pattern Filter routed to ${pcfState.route.toUpperCase()}.`;
  }));
}

function bestRecordingMimeType() {
  if (!window.MediaRecorder) return '';
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
  return candidates.find(type => MediaRecorder.isTypeSupported?.(type)) || '';
}

async function recordTenSeconds() {
  if (mediaRecorder && mediaRecorder.state !== 'inactive') return;
  ensureAudio();
  if (audio.ctx.state === 'suspended') await audio.ctx.resume();
  if (!window.MediaRecorder) {
    $('status').textContent = 'This browser does not support in-browser recording.';
    return;
  }

  if (recordingUrl) URL.revokeObjectURL(recordingUrl);
  recordingUrl = null;
  $('takePlayBtn').hidden = true;
  $('downloadTake').hidden = true;
  if (takeAudio) { takeAudio.pause(); takeAudio = null; }

  const mimeType = bestRecordingMimeType();
  const options = mimeType ? {mimeType} : undefined;
  try {
    mediaRecorder = new MediaRecorder(audio.recordDest.stream, options);
  } catch {
    mediaRecorder = new MediaRecorder(audio.recordDest.stream);
  }
  recordingChunks = [];
  mediaRecorder.addEventListener('dataavailable', e => { if (e.data && e.data.size) recordingChunks.push(e.data); });
  mediaRecorder.addEventListener('stop', () => {
    clearInterval(recordingCountdown);
    recordingCountdown = null;
    const type = mediaRecorder.mimeType || mimeType || 'audio/webm';
    const blob = new Blob(recordingChunks, {type});
    recordingUrl = URL.createObjectURL(blob);
    const ext = type.includes('ogg') ? 'ogg' : type.includes('mp4') ? 'm4a' : 'webm';
    const download = $('downloadTake');
    download.href = recordingUrl;
    download.download = `palozebra-acid-take-${Date.now()}.${ext}`;
    download.hidden = false;
    $('takePlayBtn').hidden = false;
    const btn = $('recordBtn');
    btn.classList.remove('recording');
    btn.textContent = '● REC 10s';
    btn.disabled = false;
    $('status').textContent = '10-second take captured. Play it or download it.';
  }, {once:true});

  mediaRecorder.start();
  if (!isPlaying) await play();

  const started = performance.now();
  const btn = $('recordBtn');
  btn.disabled = true;
  btn.classList.add('recording');
  btn.textContent = 'REC 10.0';
  $('status').textContent = 'Recording the master output for 10 seconds…';
  recordingCountdown = setInterval(() => {
    const left = Math.max(0, 10 - (performance.now() - started) / 1000);
    btn.textContent = `REC ${left.toFixed(1)}`;
  }, 100);
  recordingTimeout = setTimeout(() => {
    if (mediaRecorder?.state === 'recording') mediaRecorder.stop();
  }, 10000);
}

function toggleTakePlayback() {
  if (!recordingUrl) return;
  const btn = $('takePlayBtn');
  if (!takeAudio) {
    takeAudio = new Audio(recordingUrl);
    takeAudio.addEventListener('ended', () => { btn.textContent = 'PLAY TAKE'; });
  }
  if (takeAudio.paused) {
    takeAudio.currentTime = 0;
    takeAudio.play();
    btn.textContent = 'STOP TAKE';
  } else {
    takeAudio.pause();
    btn.textContent = 'PLAY TAKE';
  }
}

function initControls() {
  const saved = JSON.parse(localStorage.getItem('pz-acid-controls') || '{}');
  Object.entries(controls).forEach(([key,el])=>{
    if (saved[key] != null) el.value=saved[key];
    const updateLabel=()=>{
      const out=el.parentElement?.querySelector('output');
      if (!out) return;
      const v=Number(el.value);
      out.value = ['cutoff','pcfFreq'].includes(key) ? `${Math.round(v)} Hz`
        : key === 'bpm' ? String(v)
        : key === 'pcfQ' ? v.toFixed(1)
        : key === 'pcfDecay' ? `${Math.round(v * 1000)} ms`
        : `${Math.round(v*100)}%`;
    };
    updateLabel();
    el.addEventListener('input',()=>{
      updateLabel();
      const state={};Object.entries(controls).forEach(([k,e])=>state[k]=e.value);localStorage.setItem('pz-acid-controls',JSON.stringify(state));
      updateAudioParams();
    });
  });
  document.querySelectorAll('.wave').forEach(btn=>{
    btn.classList.toggle('active',btn.dataset.wave===waveform);
    btn.addEventListener('click',()=>{
      waveform=btn.dataset.wave;localStorage.setItem('pz-acid-wave',waveform);
      document.querySelectorAll('.wave').forEach(b=>b.classList.toggle('active',b===btn));
    });
  });
}

$('playBtn').addEventListener('click',play);
$('stopBtn').addEventListener('click',stop);
$('randomBtn').addEventListener('click',randomize);
$('clearBtn').addEventListener('click',clearPattern);
$('recordBtn').addEventListener('click',recordTenSeconds);
$('takePlayBtn').addEventListener('click',toggleTakePlayback);
window.addEventListener('keydown',e=>{ if(e.code==='Space' && !['INPUT','SELECT','BUTTON'].includes(document.activeElement.tagName)){ e.preventDefault(); isPlaying?stop():play(); }});
window.addEventListener('beforeunload',stop);

renderStepHeader();renderAcid();renderDrums();initControls();
setupPatternFilterUI();
