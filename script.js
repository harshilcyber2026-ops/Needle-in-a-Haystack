/* ═══════════════════════════════════════════════════
   FlagVault CTF — Needle in a Haystack
   Challenge: grep data.txt for FLAGLINE
   Flag: FlagVault{gr3p_1s_y0ur_fr13nd}
   ═══════════════════════════════════════════════════ */

'use strict';

/* ── Flag validation (djb2 hash — flag not stored plain) ── */
function djb2(s) {
  let h = 5381;
  for (let i = 0; i < s.length; i++) {
    h = (((h << 5) + h) + s.charCodeAt(i)) >>> 0;
  }
  return h;
}

const CORRECT_HASH = djb2("FlagVault{gr3p_1s_y0ur_fr13nd}");

/* ── Submit handler ── */
function checkFlag() {
  const inputEl  = document.getElementById('flagInput');
  const resultEl = document.getElementById('flagResult');
  if (!inputEl || !resultEl) return;

  let raw = inputEl.value.trim();

  // Accept full "FlagVault{...}" or just the inner part typed into the prefixed field
  let full;
  if (raw.startsWith('FlagVault{')) {
    full = raw.endsWith('}') ? raw : raw + '}';
  } else {
    const inner = raw.replace(/}$/, '');
    full = 'FlagVault{' + inner + '}';
  }

  resultEl.className   = 'submit-result';
  resultEl.style.display = 'none';
  inputEl.classList.remove('shake');

  if (djb2(full) === CORRECT_HASH) {
    inputEl.style.borderColor = 'var(--accent)';
    inputEl.style.boxShadow   = '0 0 0 2px rgba(0,232,200,0.18), 0 0 14px rgba(0,232,200,0.12)';
    resultEl.className = 'submit-result correct';
    resultEl.innerHTML =
      '✓ &nbsp;<strong>Flag accepted!</strong> — Nice grep skills. Challenge solved!<br>' +
      '<span style="font-size:0.72rem;color:var(--text-dim);display:block;margin-top:0.3rem">+150 points awarded</span>';
    resultEl.style.display = 'block';
    incrementSolves();
  } else {
    inputEl.style.borderColor = 'var(--accent2)';
    inputEl.style.boxShadow   = '0 0 0 2px rgba(255,45,107,0.18)';
    void inputEl.offsetWidth;
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 400);
    resultEl.className = 'submit-result incorrect';
    resultEl.innerHTML =
      '✗ &nbsp;<strong>Incorrect flag.</strong> — Re-run grep on data.txt and copy the exact flag from the FLAGLINE.';
    resultEl.style.display = 'block';
  }
}

/* ── Clear ── */
function clearInput() {
  const inputEl  = document.getElementById('flagInput');
  const resultEl = document.getElementById('flagResult');
  if (inputEl) {
    inputEl.value = '';
    inputEl.style.borderColor = '';
    inputEl.style.boxShadow   = '';
    inputEl.focus();
  }
  if (resultEl) { resultEl.style.display = 'none'; resultEl.className = 'submit-result'; }
}

/* ── Hint toggle ── */
function toggleHint(id) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('open');
}

/* ── Solve counter (cosmetic) ── */
let solves = 312;
function incrementSolves() {
  solves++;
  const sc = document.getElementById('solveCount');
  if (sc) sc.textContent = solves;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const fill = document.getElementById('progFill');
    if (fill) fill.style.width = '78%';
  }, 500);

  const inp = document.getElementById('flagInput');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') checkFlag(); });
});
