let projects = JSON.parse(localStorage.getItem("projects")) || [];
let currentTask = null;

// Create Project
function createProject() {
    const name = document.getElementById("project-name").value.trim();
    if (!name) return;

    const project = {
        id: Date.now(),
        name: name,
        tasks: []
    };

    projects.push(project);
    saveData();
    document.getElementById("project-name").value = "";
    displayProjects();
}

// Display Projects
function displayProjects() {
    const container = document.getElementById("projects-container");
    container.innerHTML = "";

    projects.forEach(project => {
        const projectDiv = document.createElement("div");
        projectDiv.className = "project";

        projectDiv.innerHTML = `
            <h3>${project.name}</h3>
            <div id="tasks-${project.id}"></div>
            <div class="add-task">
                <input type="text" id="task-input-${project.id}" placeholder="New Task">
                <input type="text" id="assignee-${project.id}" placeholder="Assign To">
                <button onclick="addTask(${project.id})">Add Task</button>
            </div>
        `;

        container.appendChild(projectDiv);

        const taskContainer = document.getElementById(`tasks-${project.id}`);
        project.tasks.forEach(task => {
            taskContainer.innerHTML += `
                <div class="task" onclick="openTask(${project.id}, ${task.id})">
                    ${task.title}
                </div>
            `;
        });
    });
}

// Add Task
function addTask(projectId) {
    const project = projects.find(p => p.id === projectId);
    const title = document.getElementById(`task-input-${projectId}`).value.trim();
    const assignee = document.getElementById(`assignee-${projectId}`).value.trim();

    if (!title || !assignee) return;

    const task = {
        id: Date.now(),
        title: title,
        assignee: assignee,
        comments: []
    };

    project.tasks.push(task);
    saveData();
    displayProjects();
}

// Open Task Modal
function openTask(projectId, taskId) {
    const project = projects.find(p => p.id === projectId);
    const task = project.tasks.find(t => t.id === taskId);
    currentTask = task;

    document.getElementById("task-title").innerText = task.title;
    document.getElementById("task-assignee").innerText = task.assignee;

    displayComments();
    document.getElementById("task-modal").classList.remove("hidden");
}

// Display Comments
function displayComments() {
    const container = document.getElementById("task-comments");
    container.innerHTML = "";

    currentTask.comments.forEach(comment => {
        container.innerHTML += `<div class="comment">${comment}</div>`;
    });
}

// Add Comment
function addComment() {
    const input = document.getElementById("new-comment");
    const text = input.value.trim();
    if (!text) return;

    currentTask.comments.push(text);
    saveData();
    input.value = "";
    displayComments();
}

// Close Modal
function closeModal() {
    document.getElementById("task-modal").classList.add("hidden");
}

// Save Data
function saveData() {
    localStorage.setItem("projects", JSON.stringify(projects));
}

displayProjects();
