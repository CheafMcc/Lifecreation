const loginOverlay = document.getElementById('loginOverlay');
const scene = document.getElementById('scene');
const form = document.getElementById('loginForm');
const door = document.getElementById('door');
const character = document.getElementById('character');
const openDoorBtn = document.getElementById('openDoorBtn');
const resetBtn = document.getElementById('resetBtn');
const statusEl = document.getElementById('status');

function setStatus(msg){
  statusEl.textContent = msg;
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  loginOverlay.setAttribute('aria-hidden','true');
  scene.setAttribute('aria-hidden','false');
  setTimeout(()=>{
    setStatus('Открываем дверь…');
    door.classList.add('open');
    setTimeout(()=>{
      setStatus('Входит персонаж…');
      character.classList.add('visible');
      setTimeout(()=>{
        setStatus('Готово ✅');
      }, 3500);
    }, 800);
  }, 300);
});

openDoorBtn.addEventListener('click', ()=>{
  door.classList.toggle('open');
  setStatus(door.classList.contains('open') ? 'Дверь открыта' : 'Дверь закрыта');
});

resetBtn.addEventListener('click', ()=>{
  loginOverlay.setAttribute('aria-hidden','false');
  scene.setAttribute('aria-hidden','true');
  door.classList.remove('open');
  character.classList.remove('visible');
  setStatus('Сброшено');
});
