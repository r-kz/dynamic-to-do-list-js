document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create list item
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Remove task on click
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
        });

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        taskInput.value = ''; // Clear input field
    }

    // Add task when button clicked
    addButton.addEventListener('click', addTask);

    // Add task when Enter key pressed
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
