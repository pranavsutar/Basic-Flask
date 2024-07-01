// app.js
document.addEventListener('DOMContentLoaded', function () {
    fetchTasks();

    document.getElementById('taskForm').addEventListener('submit', function (e) {
        e.preventDefault();
        createTask();
    });
});

function fetchTasks() {
    fetch('/api/tasks')
        .then(response => response.json())
        .then(data => {
            const tasks = data.tasks;
            const tasksDiv = document.getElementById('tasks');
            tasksDiv.innerHTML = '';
            tasks.forEach(task => {
                const taskDiv = document.createElement('div');
                taskDiv.classList.add('task');
                taskDiv.innerHTML = `
                    <h3>${task.title}</h3>
                    <p>Description: ${task.description}</p>
                    <p>Status: ${task.done ? 'Completed' : 'Pending'}</p>
                    <button onclick="deleteTask(${task.id})">Delete</button>
                    <button onclick="toggleStatus(${task.id}, ${task.done})">${task.done ? 'Mark as Pending' : 'Mark as Completed'}</button>
                `;
                tasksDiv.appendChild(taskDiv);
            });
        });
}

function createTask() {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    fetch('/api/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description })
    })
        .then(response => response.json())
        .then(data => {
            fetchTasks();
            document.getElementById('title').value = '';
            document.getElementById('description').value = '';
        });
}

function deleteTask(taskId) {
    fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            fetchTasks();
        });
}

function toggleStatus(taskId, currentStatus) {
    fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ done: !currentStatus })
    })
        .then(response => response.json())
        .then(data => {
            fetchTasks();
        });
}
