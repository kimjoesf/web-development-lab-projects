class Task { 
  constructor(description, completed = false) { 
    this.description = description; 
    this.completed = completed; 
  } 
  toggle() { 
    this.completed = !this.completed; 
  } 
} 
 
let tasks = []; 
 
const taskInput = document.getElementById('taskInput'); 
const addBtn = document.getElementById('addBtn'); 
const taskList = document.getElementById('taskList'); 
const clearAllBtn = document.getElementById('clearAll'); 
 
window.addEventListener('DOMContentLoaded', () => { 
  const stored = localStorage.getItem('tasks'); 
  if (stored) { 
    const parsed = JSON.parse(stored); 
    tasks = parsed.map(t => new Task(t.description, t.completed)); 
    renderTasks(); 
  } 
}); 
 
const saveTasks = () => localStorage.setItem('tasks', JSON.stringify(tasks)); 
 
const renderTasks = () => { 
  taskList.innerHTML = ''; 
  tasks.forEach((task, index) => { 
    const li = document.createElement('li'); 
    li.textContent = task.description; 
    if (task.completed) li.classList.add('completed'); 
 
    li.addEventListener('click', () => { 
      task.toggle(); 
      saveTasks(); 
      renderTasks(); 
    }); 
 
    const delBtn = document.createElement('button'); 
    delBtn.textContent = '✖'; 
    delBtn.className = 'delete-btn'; 
    delBtn.addEventListener('click', e => { 
      e.stopPropagation(); 
      tasks.splice(index, 1); 
      saveTasks(); 
      renderTasks(); 
    }); 
 
    li.appendChild(delBtn); 
    taskList.appendChild(li); 
  }); 
}; 
 
addBtn.addEventListener('click', () => { 
  const description = taskInput.value.trim(); 
  if (description) { 
    tasks.push(new Task(description)); 
    taskInput.value = ''; 
    saveTasks(); 
    renderTasks(); 
} 
}); 
taskInput.addEventListener('keypress', e => { 
if (e.key === 'Enter') addBtn.click(); 
}); 
clearAllBtn.addEventListener('click', () => { 
if (tasks.length === 0) { 
alert('There are no tasks to clear!'); 
return; 
} 
if (confirm('Clear all tasks?')) { 
tasks = []; 
saveTasks(); 
renderTasks(); 
} 
}); 
