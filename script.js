const editor = document.getElementById('editor');
const lineNumbers = document.getElementById('lineNumbers');
const output = document.getElementById('outputContent');

function updateEditorInfo() {
  const lines = editor.value.split('\n').length;
  lineNumbers.textContent = Array.from({length: lines}, (_, i) => i + 1).join('\n');
}
editor.addEventListener('input', updateEditorInfo);
editor.addEventListener('click', updateEditorInfo);
editor.addEventListener('keyup', updateEditorInfo);
editor.addEventListener('scroll', () => { lineNumbers.scrollTop = editor.scrollTop; });
editor.addEventListener('keydown', (event) => {
  if (event.key === 'Tab') {
    event.preventDefault();
    const start = editor.selectionStart, end = editor.selectionEnd;
    editor.setRangeText('  ', start, end, 'end');
    updateEditorInfo();
  }
});
document.getElementById('clearBtn').addEventListener('click', () => {
  editor.value = '';
  updateEditorInfo();
  editor.focus();
});
document.getElementById('executeBtn').addEventListener('click', () => {
  output.textContent = 'Preview mode: this page does not execute Luau in Roblox.\nConnect a trusted runtime in your own Roblox experience to enable execution.';
});
document.getElementById('clearOutput').addEventListener('click', () => {
  output.innerHTML = '<span class="output-muted">Waiting for input...</span>';
});
document.getElementById('copyOutput').addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(output.innerText);
    const button = document.getElementById('copyOutput');
    button.title = 'Copied';
    setTimeout(() => button.title = 'Copy output', 1200);
  } catch {
    output.textContent += '\nClipboard access is unavailable in this browser.';
  }
});
document.getElementById('fontSize').addEventListener('change', event => {
  editor.style.fontSize = `${event.target.value}px`;
});
document.getElementById('wrapToggle').addEventListener('click', event => {
  const button = event.currentTarget;
  const enabled = button.getAttribute('aria-pressed') !== 'true';
  button.setAttribute('aria-pressed', String(enabled));
  document.body.classList.toggle('wrap-on', enabled);
});
document.getElementById('settingsShortcut').addEventListener('click', () => {
  document.getElementById('settings').scrollIntoView({behavior:'smooth', block:'center'});
});
document.getElementById('whitelistForm').addEventListener('submit', event => {
  event.preventDefault();
  const username = document.getElementById('robloxUser').value.trim();
  const message = document.getElementById('whitelistMessage');
  if (!username) return;
  message.innerHTML = `Request prepared for <strong></strong>. Open Discord to send your request to the FOLD team. <a href="https://discord.gg/UqNqpXgM4D" target="_blank" rel="noopener noreferrer">Join Discord ↗</a>`;
  message.querySelector('strong').textContent = username;
});
document.getElementById('mobileMenu').addEventListener('click', () => {
  document.querySelector('.nav').classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => {
  document.querySelector('.nav').classList.remove('open');
}));
updateEditorInfo();
