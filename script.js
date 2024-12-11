let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
let clearAllButton = document.getElementById('clearAll');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addToDoButton.addEventListener('click', function() {
    let taskText = inputField.value.trim();
    if (taskText === "") return; 
    createTask(taskText);
    saveTaskToLocalStorage(taskText);
    inputField.value = "";
});


function createTask(taskText) {
    let paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerHTML = taskText + `<button class="remove-btn">X</button>`;

    
    paragraph.addEventListener('click', function() {
        paragraph.classList.toggle('completed');
        saveTasksToLocalStorage(); 
    });

    
    paragraph.querySelector('.remove-btn').addEventListener('click', function(event) {
        event.stopPropagation();
        toDoContainer.removeChild(paragraph);
        saveTasksToLocalStorage(); 
    });

    
    toDoContainer.appendChild(paragraph);
}


function saveTaskToLocalStorage(taskText) {
    let tasks = getTasksFromLocalStorage();
    tasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromLocalStorage() {
    let tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}


function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        createTask(task);
    });
}


function saveTasksToLocalStorage() {
    let tasks = [];
    document.querySelectorAll('.paragraph-styling').forEach(function(taskElement) {
        if (!taskElement.classList.contains('completed')) {
            tasks.push(taskElement.innerText.replace('X', '').trim());
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}


clearAllButton.addEventListener('click', function() {
    toDoContainer.innerHTML = "";
    localStorage.removeItem('tasks'); // Clear from local storage
});
