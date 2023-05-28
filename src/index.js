/* API */
var Kanban = require("./API/KanbanAPI.js");
Kanban.init();

/* Sidebar options */
const projectList = document.getElementById("project-list");

function listProjects() {
    const projects = Kanban.getProjectList();

    for (var i = 0; i < projects.length; i++) {
        let listItem = document.createElement("li");
        listItem.classList.add("project-list-item");
        listItem.innerHTML = `
                <i class="fa-solid fa-grip-vertical"></i>
                <div class="project-item">
                  <span class="project-list-item-color"></span>
                  <span class="project-list-name">${projects[i]}</span>
                </div>
                <i class="fa-solid fa-chevron-down"></i>`
        console.log(listItem);
        projectList.appendChild(listItem);
    }
}
listProjects();

/* Kanban board */
const addTask = document.querySelectorAll('[data-modal-target]');
let taskFormContainer = document.querySelector('aside')
let overlay = document.querySelector('.overlay');
let taskCloseButton = document.getElementById('form-close-button');

let taskForm = document.getElementById("task-form");

let todo = document.getElementById("to-do");
let progress = document.getElementById("in-progress");
let completed = document.getElementById("completed");

let counter = null;
let count = null;

let todoCounter = 0;
let progressCounter = 0;
let completedCounter = 0;

let activeTaskArea = todo;

addTask.forEach(taskButton => {
    taskButton.addEventListener("click", () => {
        taskFormContainer.classList.add('active');
        overlay.classList.add('active');

        if (taskButton.classList.contains("todo")) {
            activeTaskArea = todo;
            todoCounter++;
            counter = document.querySelector(".to-do .title .title-count");
            count = todoCounter;
        }

        else if (taskButton.classList.contains("progress")) {
            activeTaskArea = progress;
            progressCounter++;
            counter = document.querySelector(".in-progress .title .title-count");
            count = progressCounter;
        }

        else if (taskButton.classList.contains("completed")) {
            counter = document.querySelector(".completed .title .title-count")
            activeTaskArea = completed;
            completedCounter++;
            count = completedCounter;
        }

        console.log(count, counter);
    })
})

taskCloseButton.addEventListener("click", () => {
    taskFormContainer.classList.remove('active');
    overlay.classList.remove('active');
})

taskForm.addEventListener("submit", (e) => {
    e.preventDefault()

    let taskName = document.getElementById("task-name-input");
    let taskDescr = document.getElementById("task-desc-input");

    if (taskName.value === "") {
        taskName.value = "";
        taskDescr.value = "";
        taskFormContainer.classList.remove('active');
        overlay.classList.remove('active');
        return;
    }

    let task = document.createElement("div");
    task.classList.add("task");

    let taskNameContainer = document.createElement("div");
    taskNameContainer.classList.add("task-name");
    taskNameContainer.innerText = taskName.value;

    let taskDescrContainer = document.createElement("div");
    taskDescrContainer.classList.add("description");
    taskDescrContainer.innerText = taskDescr.value;

    task.appendChild(taskNameContainer);
    task.appendChild(taskDescrContainer);

    activeTaskArea.appendChild(task);
    counter.innerText = count;

    /* Remove form after submitting */
    taskName.value = "";
    taskDescr.value = "";
    taskFormContainer.classList.remove('active');
    overlay.classList.remove('active');
})

