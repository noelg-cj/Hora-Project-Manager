/* Add task buttons */
const addTask = document.querySelectorAll('[data-modal-target]');
let taskFormContainer = document.querySelector('aside')
let overlay = document.querySelector('.overlay');
let taskCloseButton = document.getElementById('form-close-button');

let taskForm = document.getElementById("task-form");

let todo = document.getElementById("to-do");
let progress = document.getElementById("in-progress");
let completed = document.getElementById("completed");

let activeTaskArea = todo;

addTask.forEach(taskButton => {
    taskButton.addEventListener("click", () => {
        taskFormContainer.classList.add('active');
        overlay.classList.add('active');

        if (taskButton.classList.contains("todo")) {
            activeTaskArea = todo;
        }

        else if (taskButton.classList.contains("progress")) {
            activeTaskArea = progress;
        }

        else if (taskButton.classList.contains("completed")) {
            activeTaskArea = completed;
        }
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

    let task = document.createElement("div");
    task.classList.add("task");

    console.log(taskName, taskDescr);
    
    let taskNameContainer = document.createElement("div");
    taskNameContainer.classList.add("task-name");
    taskNameContainer.innerText = taskName.value;

    let taskDescrContainer = document.createElement("div");
    taskDescrContainer.classList.add("description");
    taskDescrContainer.innerText = taskDescr.value;

    task.appendChild(taskNameContainer);
    task.appendChild(taskDescrContainer);

    activeTaskArea.appendChild(task);

    /* Remove form after submitting */
    taskName.value = "";
    taskDescr.value = "";
    taskFormContainer.classList.remove('active');
    overlay.classList.remove('active');
})

