/* Add task buttons */
const addTask = document.querySelectorAll('[data-modal-target]');
let taskForm = document.querySelector('aside')
let overlay = document.querySelector('.overlay');
let taskCloseButton = document.getElementById('form-close-button')

addTask.forEach(taskButton => {
    taskButton.addEventListener("click", () => {
        taskForm.classList.add('active');
        overlay.classList.add('active');
    })
})

taskCloseButton.addEventListener("click", () => {
    taskForm.classList.remove('active');
    overlay.classList.remove('active');
})