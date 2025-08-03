document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function createTaskElement(taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        removeBtn.addEventListener('click', () => {
            taskList.removeChild(li);
            const index = tasks.indexOf(taskText);
            if (index !== -1) {
                tasks.splice(index, 1);
                saveTasks();
            }
        });

        li.appendChild(removeBtn);
        return li;
    }

    function addTask(taskText, save = true) {
        const trimmed = taskText.trim();
        if (trimmed === '') {
            alert('Please enter a task.');
            return;
        }
        if (save) {
            tasks.push(trimmed);
            saveTasks();
        }
        const li = createTaskElement(trimmed);
        taskList.appendChild(li);
    }

    function loadTasks() {
        const stored = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = Array.isArray(stored) ? stored : [];
        tasks.forEach(taskText => {
            const li = createTaskElement(taskText);
            taskList.appendChild(li);
        });
    }

    loadTasks();

    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
        taskInput.value = '';
    });

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
            taskInput.value = '';
        }
    });
});
