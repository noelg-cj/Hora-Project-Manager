const {readFile, writeFileSync} = require('fs');

/* export default class Kanban {

    static getProject(id) {
        const project = read().find(project => project.id === id);

        if (!project) {
            return [];
        }

        return project;
    }
} */

// At the beginning of starting the project, load project data into localstorage
function init() {
    console.log("Starting")
    let content = "[]";
    readFile('data', 'utf-8', (err, result) => {
        if (err) {
            writeFileSync('./data.json', '[]', (err) => {
                console.log('Failed to create file');
                return;
            })
            return;
        }
        content = JSON.parse(result);
        save(content);
    })
}

function getProjectList() {
    const data = read();
    let projectList = [];

    data.forEach(project => {
        projectList.push(project.name)
    });

    return projectList;
}

function getTaskList(projectID) {
    const data = read();
    let taskList = [];
    let project = data.find(project => project.id = projectID);

    if (project) {
        taskList = project.tasks;
    }

    return taskList;
}

function addTask(projectID, taskStatus, taskName, taskDescription, taskDate) {
    let data = read();
    const taskID = Math.floor(Math.random() * 100000);
    const project = data.find(project => project = project.id);

    // Checking if id is already assigned to a task
    project.tasks.forEach(task => {
        if (task.id == taskID) {
            taskID = Math.floor(Math.random() * 100000);
        }
    })

    const task = {
        id: taskID,
        status: taskStatus,
        name: taskName,
        description: taskDescription,
        date: taskDate
    }

    project.tasks.push(task);
    save(data);
    
    return task;
}

function deleteTask(projectID, taskID) {
    const data = read();
    const project = data.find(project => projectID = project.id) ;
    const task = project.tasks.find(task => task.id = taskID);

    project.tasks.splice(project.tasks.indexOf(task), 1);
    save(data);
}

// Read from localStorage;
function read() {
    const json = localStorage.getItem("data");

    if (!json) {
        return [
            {
                id: 1,
                items: [],
            }, 
            {
                id: 2,
                items: []
            },
            {
                id: 3,
                items: []
            }
        ];
    }

    return JSON.parse(json);
}

// Save data to localStorage
function save(data) {
    localStorage.setItem("data", JSON.stringify(data));
}

module.exports = {init, getProjectList, getTaskList, addTask, deleteTask};