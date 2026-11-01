const menu=document.getElementById('mobileMenu');if(menu)menu.addEventListener('click',()=>document.getElementById('nav').classList.toggle('open'));
const editor=document.getElementById('editor'), nums=document.getElementById('lineNumbers'), output=document.getElementById('outputContent');
function updateLines(){if(editor&&nums)nums.textContent=Array.from({length:editor.value.split('\\n').length},(_,i)=>i+1).join('\\n')}
if(editor){editor.addEventListener('input',updateLines);editor.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();editor.setRangeText('  ',editor.selectionStart,editor.selectionEnd,'end');updateLines()}});updateLines()}
const execute=document.getElementById('executeBtn');if(execute)execute.addEventListener('click',()=>{if(output)output.textContent='Mode preview aja. Halaman ini nggak ngejalanin script di Roblox.'});
const clear=document.getElementById('clearBtn');if(clear)clear.addEventListener('click',()=>{editor.value='';updateLines();editor.focus()});
const clearOutput=document.getElementById('clearOutput');if(clearOutput)clearOutput.addEventListener('click',()=>output.innerHTML='<span class="output-muted">Belum ada output...</span>');
const size=document.getElementById('fontSize');if(size)size.addEventListener('change',e=>{if(editor)editor.style.fontSize=e.target.value+'px'});
const wrap=document.getElementById('wrapToggle');if(wrap)wrap.addEventListener('click',()=>{const on=wrap.getAttribute('aria-pressed')!=='true';wrap.setAttribute('aria-pressed',String(on));document.body.classList.toggle('wrap-on',on)});
const form=document.getElementById('whitelistForm');if(form)form.addEventListener('submit',e=>{e.preventDefault();const user=document.getElementById('robloxUser').value.trim();document.getElementById('whitelistMessage').textContent='Sip, '+user+'. Kirim request kamu lewat Discord, ya.';window.open('https://discord.gg/UqNqpXgM4D','_blank','noopener')});
