let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');
let clearAllButton = document.getElementById('clearAll');

// Load tasks from local storage
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task
addToDoButton.addEventListener('click', function() {
    let taskText = inputField.value.trim();
    if (taskText === "") return; // Don't add empty tasks

    // Create new task
    createTask(taskText);

    // Save to local storage
    saveTaskToLocalStorage(taskText);

    // Clear input field
    inputField.value = "";
});

// Create a new task element
function createTask(taskText) {
    let paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerHTML = taskText + `<button class="remove-btn">X</button>`;

    // Mark task as completed when clicked
    paragraph.addEventListener('click', function() {
        paragraph.classList.toggle('completed');
        saveTasksToLocalStorage(); // Save changes to local storage
    });

    // Remove task on double-click
    paragraph.querySelector('.remove-btn').addEventListener('click', function(event) {
        event.stopPropagation();
        toDoContainer.removeChild(paragraph);
        saveTasksToLocalStorage(); // Save changes to local storage
    });

    // Append task to container
    toDoContainer.appendChild(paragraph);
}

// Save task to local storage
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

// Load tasks from local storage
function loadTasks() {
    let tasks = getTasksFromLocalStorage();
    tasks.forEach(task => {
        createTask(task);
    });
}

// Save all tasks to local storage (after any changes)
function saveTasksToLocalStorage() {
    let tasks = [];
    document.querySelectorAll('.paragraph-styling').forEach(function(taskElement) {
        if (!taskElement.classList.contains('completed')) {
            tasks.push(taskElement.innerText.replace('X', '').trim());
        }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear all tasks
clearAllButton.addEventListener('click', function() {
    toDoContainer.innerHTML = "";
    localStorage.removeItem('tasks'); // Clear from local storage
});
