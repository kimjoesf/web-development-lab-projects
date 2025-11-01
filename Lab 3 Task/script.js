// DOM selection 
const display = document.getElementById('display'); 
const buttons = document.querySelectorAll('.btn'); 
const equals = document.getElementById('equals'); 
const clear = document.getElementById('clear'); 
 
 
buttons.forEach(btn => { 
  btn.addEventListener('click', () => { 
    display.value += btn.textContent; 
  }); 
}); 
 
 
equals.addEventListener('click', () => { 
  try { 
    display.value = eval(display.value); 
  } catch { 
    display.value = 'Error'; 
  } 
}); 
 
 
clear.addEventListener('click', () => { 
  display.value = ''; 
}); 