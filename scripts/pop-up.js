let opacity;
let size;
let lastTimestamp;
let isAnimating = false;
const popupLayer = document.getElementsByClassName('pop-up')[0];
const popupForm = document.getElementsByClassName('sign')[0];
let header = document.getElementsByClassName('header')[0];

/**
 * @param {number} timestamp
 */
function animateOpen(timestamp) {
  if (lastTimestamp === 0) { 
    lastTimestamp = timestamp;
  }
  const dt = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;
  
  if (size < 1) {
    size += 1 * dt;
  }
  if (opacity < 1) {
    opacity += 2 * dt;
  }
  
  size = Math.min(size, 1);
  opacity = Math.min(opacity, 1);
  
  popupLayer.style.opacity = String(opacity);
  popupForm.style.transform = `scale('${opacity}')`;
  
  if (size < 1 || opacity < 1) {
    isAnimating = true;
    requestAnimationFrame(animateOpen);
  } else {
    isAnimating = false;
  }
}

/**
 * @param {number} timestamp
 */
function animateClose(timestamp) {
  if (lastTimestamp === 0) { 
    lastTimestamp = timestamp;
  }
  const dt = (timestamp - lastTimestamp) / 1000;
  lastTimestamp = timestamp;
  
  if (size > 0.5) {
    size -= 1 * dt;
  }
  if (opacity > 0) {
    opacity -= 2 * dt;
  }
  
  size = Math.max(size, 0.5);
  opacity = Math.max(opacity, 0);
  
  popupLayer.style.opacity = String(opacity);
  popupForm.style.transform = `scale('${opacity}')`;
  
  if (size > 0.5 || opacity > 0) {
    isAnimating = true;
    requestAnimationFrame(animateClose);
  } else {
    isAnimating = false;
    popupLayer.classList.add('invisible');
  }
}

function openForm() {
  if (isAnimating) {
    return;
  }
  popupLayer.classList.remove('invisible');
  
  opacity = 0;
  size = 0.5;
  lastTimestamp = 0;
  requestAnimationFrame(animateOpen);
}

function closeForm() {
  if (isAnimating) {
    return;
  }
  opacity = 1;
  size = 1;
  lastTimestamp = 0;
  requestAnimationFrame(animateClose);
}

const closeImg = document.getElementsByClassName('sign__close-img')[0];

document.addEventListener('keyup', (e) => {
  if (e.key === 'Escape') {
    closeForm(); 
  }
});

popupLayer.addEventListener('click', function(e) { 
  if (e.target === closeImg || e.target === popupLayer) {
    closeForm();
  }  
});
