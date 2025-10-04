// Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', function() {
    // Select DOM Elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Initialize and Load Tasks from Local Storage
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => {
            addTaskToDOM(taskText, false); // 'false' indicates not to save again to Local Storage
        });
    }

    // Function to add task to DOM
    function addTaskToDOM(taskText, saveToStorage = true) {
        // Create a new li element
        const listItem = document.createElement('li');
        
        // Set its textContent to taskText
        listItem.textContent = taskText;
        
        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        
        // Set its textContent to "Remove"
        removeButton.textContent = "Remove";
        
        // Give it a class name of 'remove-btn'
        removeButton.className = 'remove-btn';
        
        // Assign an onclick event to the remove button that removes the li element from taskList
        removeButton.onclick = function() {
            // Remove from DOM
            taskList.removeChild(listItem);
            // Remove from Local Storage
            removeTaskFromStorage(taskText);
        };
        
        // Append the remove button to the li element
        listItem.appendChild(removeButton);
        
        // Append the li to taskList
        taskList.appendChild(listItem);

        // Save to Local Storage if needed
        if (saveToStorage) {
            saveTaskToStorage(taskText);
        }
    }

    // Function to save task to Local Storage
    function saveTaskToStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Function to remove task from Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();
        
        // Check if taskText is not empty ("")
        if (taskText === "") {
            // If it is empty, use alert to prompt the user to enter a task
            alert("Please enter a task!");
            return;
        }
        
        // Add task to DOM and save to Local Storage
        addTaskToDOM(taskText, true);
        
        // Clear the task input field by setting taskInput.value to an empty string
        taskInput.value = '';
        
        // Focus back on input field for better UX
        taskInput.focus();
    }

    // Attach Event Listeners
    
    // Add an event listener to addButton that calls addTask when the button is clicked
    addButton.addEventListener('click', addTask);
    
    // Add an event listener to taskInput for the 'keypress' event
    taskInput.addEventListener('keypress', function(event) {
        // Check if event.key is equal to 'Enter' before calling addTask
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
